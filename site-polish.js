(() => {
  "use strict";


  const clamp = (
    value,
    min = 0,
    max = 1
  ) =>
    Math.min(
      max,
      Math.max(
        min,
        value
      )
    );


  const smooth = value =>
    value *
    value *
    (
      3 -
      2 * value
    );


  const invLerp = (
    a,
    b,
    x
  ) =>
    clamp(
      (
        x - a
      ) /
      (
        b - a
      )
    );


  /* ==========================================================
     COMMON EVIDENCE HELPER
     ========================================================== */

  function ensureVisual(
    figure
  ) {

    let visual =
      figure.querySelector(
        ":scope > .evidence-visual"
      );


    if (visual) {
      return visual;
    }


    const image =
      figure.querySelector(
        ":scope > img"
      );


    if (!image) {
      return null;
    }


    visual =
      document.createElement(
        "div"
      );


    visual.className =
      "evidence-visual";


    figure.insertBefore(
      visual,
      image
    );


    visual.appendChild(
      image
    );


    return visual;
  }



  function ensureReading(
    figure,
    fallbackText
  ) {

    let reading =
      figure.querySelector(
        ":scope > .evidence-reading"
      );


    if (reading) {
      return reading;
    }


    reading =
      document.createElement(
        "div"
      );


    reading.className =
      "evidence-reading";


    const p =
      document.createElement(
        "p"
      );


    p.textContent =
      fallbackText || "";


    reading.appendChild(p);

    figure.appendChild(
      reading
    );


    return reading;
  }



  /* ==========================================================
     SHADE / EXPOSED CINEMATIC LOCK
     ========================================================== */

  function setupShade() {

    const cards =
      Array.from(
        document.querySelectorAll(
          "#shade .comparison-card"
        )
      );


    const scenes = [];


    const fallbackText = [
      "During the ten-minute observation, about 30 people passed through and about 15 sat, waited or remained in the shaded area. This is consistent with greater willingness to stay in a sheltered space, although nearby amenities and the different observation time may also have influenced use.",

      "During the ten-minute observation, only about 10–12 people passed through and about two sat or stayed in exposed area A. Stone seating was available, but direct afternoon sun reduced comfort. Because the observations were consecutive rather than simultaneous, shade cannot be isolated as the only cause."
    ];


    cards.forEach(
      (
        card,
        index
      ) => {

        const figure =
          card.querySelector(
            ":scope > .evidence-photo[data-photo]"
          );


        if (!figure) {
          return;
        }


        const visual =
          ensureVisual(
            figure
          );


        if (!visual) {
          return;
        }


        const caption =
          figure.querySelector(
            ":scope > figcaption"
          );


        const reading =
          ensureReading(
            figure,
            fallbackText[index] || ""
          );


        const copy =
          document.createElement(
            "div"
          );


        copy.className =
          "evidence-copy";


        if (caption) {
          copy.appendChild(
            caption
          );
        }


        copy.appendChild(
          reading
        );


        const stage =
          document.createElement(
            "div"
          );


        stage.className =
          "shade-stage";


        figure.insertBefore(
          stage,
          visual
        );


        stage.append(
          visual,
          copy
        );


        figure.classList.add(
          "shade-scrolly"
        );


        if (
          index % 2 === 1
        ) {
          figure.classList.add(
            "shade-alt"
          );
        }


        scenes.push(
          figure
        );
      }
    );


    if (!scenes.length) {
      return;
    }


    function updateShadeScene(
      figure
    ) {

      const rect =
        figure.getBoundingClientRect();


      const vh =
        window.innerHeight;


      /*
         Progress begins slightly before
         the scene reaches the sticky position
         and ends as the scene scrolls away.
      */

      const start =
        window.scrollY +
        rect.top -
        (
          vh * .80
        );


      const end =
        window.scrollY +
        rect.bottom -
        (
          vh * .18
        );


      const p =
        clamp(
          (
            window.scrollY -
            start
          ) /
          (
            end -
            start
          )
        );


      /*
         TIMELINE

         00–12 rise
         12–34 full-photo hold
         34–46 split
         46–78 split hold
         78–91 reopen
         91–100 leave
      */


      let split = 0;


      if (
        p >= .34 &&
        p < .46
      ) {

        split =
          smooth(
            invLerp(
              .34,
              .46,
              p
            )
          );

      }
      else if (
        p >= .46 &&
        p <= .78
      ) {

        split = 1;

      }
      else if (
        p > .78 &&
        p < .91
      ) {

        split =
          1 -
          smooth(
            invLerp(
              .78,
              .91,
              p
            )
          );

      }


      let copyOpacity = 0;


      if (
        p >= .36 &&
        p < .46
      ) {

        copyOpacity =
          smooth(
            invLerp(
              .36,
              .46,
              p
            )
          );

      }
      else if (
        p >= .46 &&
        p <= .78
      ) {

        copyOpacity = 1;

      }
      else if (
        p > .78 &&
        p < .87
      ) {

        copyOpacity =
          1 -
          smooth(
            invLerp(
              .78,
              .87,
              p
            )
          );

      }


      const entrance =
        smooth(
          invLerp(
            0,
            .12,
            p
          )
        );


      const leave =
        smooth(
          invLerp(
            .91,
            1,
            p
          )
        );


      const width =
        100 -
        (
          44 *
          split
        );


      const imageY =
        (
          1 -
          entrance
        ) *
        14
        -
        (
          leave *
          12
        );


      const imageOpacity =
        1 -
        (
          leave *
          .12
        );


      const copyX =
        (
          1 -
          copyOpacity
        ) *
        2;


      const scale =
        1.035 -
        (
          .02 *
          split
        );


      figure.style.setProperty(
        "--shade-image-width",
        `${width}%`
      );


      figure.style.setProperty(
        "--shade-image-y",
        `${imageY.toFixed(2)}vh`
      );


      figure.style.setProperty(
        "--shade-image-opacity",
        imageOpacity.toFixed(3)
      );


      figure.style.setProperty(
        "--shade-image-scale",
        scale.toFixed(4)
      );


      figure.style.setProperty(
        "--shade-copy-opacity",
        copyOpacity.toFixed(3)
      );


      figure.style.setProperty(
        "--shade-copy-x",
        `${copyX.toFixed(2)}rem`
      );


      figure.style.setProperty(
        "--shade-copy-pointer",
        copyOpacity > .7
          ? "auto"
          : "none"
      );
    }


    scenes.forEach(
      scene => {

        scene._updateShade =
          () =>
            updateShadeScene(
              scene
            );

      }
    );


    window.__shadeScenes =
      scenes;
  }



  /* ==========================================================
     RAIN-GARDEN PROCESS STORY
     ========================================================== */

  function setupRainProcess() {

    const chapter =
      document.querySelector(
        "#rain-gardens"
      );


    const sequence =
      chapter?.querySelector(
        ":scope > .sequence"
      );


    if (
      !chapter ||
      !sequence
    ) {
      return null;
    }


    const sourceFigures =
      Array.from(
        sequence.querySelectorAll(
          ".evidence-photo[data-photo]"
        )
      );


    const steps = [

      {
        file:
          "IMG20260914183646.webp",

        kicker:
          "01 / Inlet",

        title:
          "Runoff enters the rain garden.",

        body:
          "During rainfall, water was visibly leaving the outlet and entering the stone-covered planted bed. This verifies active inflow at the visible surface, but not how much water was retained or infiltrated."
      },

      {
        file:
          "IMG20260914183547.webp",

        kicker:
          "02 / Stones",

        title:
          "The incoming stream meets stone first.",

        body:
          "Water visibly struck the stone-covered area rather than exposed soil. The stones plausibly disperse concentrated flow and reduce local scouring risk, but velocity and erosion were not measured."
      },

      {
        file:
          "IMG20260904160124.webp",

        kicker:
          "03 / Planted bed",

        title:
          "Water management is integrated with landscape.",

        body:
          "The depressed planted courtyard forms part of the visible stormwater route while also functioning as public landscape. Healthy planting demonstrates maintenance, not a quantified infiltration or treatment rate."
      },

      {
        file:
          "IMG20260914183734_01-landscape.webp",

        kicker:
          "04 / Drain",

        title:
          "Conventional drainage still forms part of the system.",

        body:
          "Water also entered the grated drainage channel beside the planting. This shows that rain-garden infrastructure and conventional drainage operate together; water entering the grate is not evidence of infiltration."
      }

    ];


    const resolved =
      steps.map(step => {

        const original =
          sourceFigures.find(
            figure => {

              const image =
                figure.querySelector(
                  "img"
                );


              return (
                image &&
                image.src.includes(
                  step.file
                )
              );

            }
          );


        if (!original) {
          return null;
        }


        const image =
          original.querySelector(
            "img"
          );


        return {
          ...step,
          original,
          src:
            image.getAttribute(
              "src"
            ),
          alt:
            image.alt || step.title
        };
      })
      .filter(Boolean);


    if (
      resolved.length !==
      steps.length
    ) {

      console.warn(
        "Rain process skipped: one or more required images were not found."
      );

      return null;
    }


    const story =
      document.createElement(
        "div"
      );


    story.className =
      "rain-process-story";


    const stage =
      document.createElement(
        "div"
      );


    stage.className =
      "rain-process-stage";


    const track =
      document.createElement(
        "div"
      );


    track.className =
      "rain-process-track";


    const body =
      document.createElement(
        "div"
      );


    body.className =
      "rain-process-body";


    const images =
      document.createElement(
        "div"
      );


    images.className =
      "rain-process-images";


    const copy =
      document.createElement(
        "div"
      );


    copy.className =
      "rain-process-copy";


    const beats =
      document.createElement(
        "div"
      );


    beats.className =
      "rain-process-beats";


    resolved.forEach(
      (
        item,
        index
      ) => {

        const label =
          document.createElement(
            "span"
          );


        label.textContent =
          item.kicker.replace(
            " / ",
            " · "
          );


        label.dataset.step =
          index;


        track.appendChild(
          label
        );


        const visual =
          document.createElement(
            "div"
          );


        visual.className =
          "rain-process-image";


        visual.dataset.step =
          index;


        visual.innerHTML = `
          <img
            src="${item.src}"
            alt="${item.alt.replaceAll('"',"&quot;")}"
          >
          <button
            type="button"
            class="rain-process-view"
          >
            View evidence ↗
          </button>
        `;


        visual
          .querySelector(
            ".rain-process-view"
          )
          .addEventListener(
            "click",
            event => {

              event.stopPropagation();

              item.original.click();

            }
          );


        visual.addEventListener(
          "click",
          event => {

            if (
              event.target.closest(
                "button"
              )
            ) {
              return;
            }

            item.original.click();

          }
        );


        images.appendChild(
          visual
        );


        const panel =
          document.createElement(
            "div"
          );


        panel.className =
          "rain-process-copy-panel";


        panel.dataset.step =
          index;


        panel.innerHTML = `
          <span class="mono">
            ${item.kicker}
          </span>

          <h3>
            ${item.title}
          </h3>

          <p>
            ${item.body}
          </p>
        `;


        copy.appendChild(
          panel
        );


        const beat =
          document.createElement(
            "div"
          );


        beat.className =
          "rain-process-beat";


        beat.dataset.step =
          index;


        beats.appendChild(
          beat
        );

      }
    );


    body.append(
      images,
      copy
    );


    stage.append(
      track,
      body
    );


    story.append(
      stage,
      beats
    );


    sequence.parentNode.insertBefore(
      story,
      sequence
    );


    chapter.classList.add(
      "rain-process-ready"
    );


    let active = -1;


    function setActive(
      next
    ) {

      if (
        next === active
      ) {
        return;
      }


      active = next;


      story
        .querySelectorAll(
          "[data-step]"
        )
        .forEach(
          element => {

            element.classList.toggle(
              "active",
              Number(
                element.dataset.step
              ) === active
            );

          }
        );
    }


    function update() {

      const rect =
        story.getBoundingClientRect();


      const vh =
        window.innerHeight;


      const total =
        Math.max(
          1,
          rect.height -
          vh
        );


      const progressed =
        clamp(
          (
            -rect.top +
            vh * .18
          ) /
          total
        );


      const next =
        Math.min(
          resolved.length - 1,
          Math.floor(
            progressed *
            resolved.length
          )
        );


      setActive(
        next
      );
    }


    setActive(0);


    return update;
  }



  /* ==========================================================
     DAILY SYSTEMS — SUBTLE EDITORIAL REVEAL
     ========================================================== */

  function setupEditorialRows() {

    const cards =
      Array.from(
        document.querySelectorAll(
          "#daily-systems .system-card"
        )
      );


    cards.forEach(
      card =>
        card.classList.add(
          "editorial-card"
        )
    );


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              entry.target
                .classList.toggle(
                  "is-visible",
                  entry.isIntersecting
                );

            }
          );

        },
        {
          threshold: .18,
          rootMargin:
            "0px 0px -8% 0px"
        }
      );


    cards.forEach(
      card =>
        observer.observe(
          card
        )
    );
  }



  /* ==========================================================
     GREEN MARK CHART — STICKY SPOTLIGHT
     ========================================================== */

  function setupChart() {

    const chart =
      document.querySelector(
        ".secondary-chart"
      );


    if (!chart) {
      return null;
    }


    let wrapper =
      chart.parentElement
        ?.classList
        .contains(
          "chart-story"
        )
        ?
        chart.parentElement
        :
        null;


    if (!wrapper) {

      wrapper =
        document.createElement(
          "div"
        );


      wrapper.className =
        "chart-story";


      chart.parentNode.insertBefore(
        wrapper,
        chart
      );


      wrapper.appendChild(
        chart
      );
    }


    const meters =
      Array.from(
        chart.querySelectorAll(
          "meter"
        )
      );


    meters.forEach(
      meter => {

        if (
          !meter.dataset.finalValue
        ) {

          meter.dataset.finalValue =
            meter.value;

        }

      }
    );


    function update() {

      const rect =
        wrapper.getBoundingClientRect();


      const vh =
        window.innerHeight;


      const total =
        Math.max(
          1,
          rect.height -
          vh
        );


      const p =
        clamp(
          (
            -rect.top +
            vh * .08
          ) /
          total
        );


      /*
         00–18 pop out
         18–76 locked
         76–100 pop back in
      */


      let scale;


      if (p < .18) {

        scale =
          .94 +
          (
            .06 *
            smooth(
              invLerp(
                0,
                .18,
                p
              )
            )
          );

      }
      else if (
        p <= .76
      ) {

        scale = 1;

      }
      else {

        scale =
          1 -
          (
            .055 *
            smooth(
              invLerp(
                .76,
                1,
                p
              )
            )
          );

      }


      const barProgress =
        smooth(
          invLerp(
            .18,
            .46,
            p
          )
        );


      meters.forEach(
        meter => {

          const target =
            Number(
              meter.dataset
                .finalValue
            );


          meter.value =
            target *
            barProgress;

        }
      );


      const opacity =
        .72 +
        (
          .28 *
          Math.min(
            1,
            scale / .99
          )
        );


      const shadow =
        smooth(
          invLerp(
            .08,
            .25,
            p
          )
        ) *
        (
          1 -
          smooth(
            invLerp(
              .76,
              1,
              p
            )
          )
        );


      chart.style.setProperty(
        "--chart-scale",
        scale.toFixed(4)
      );


      chart.style.setProperty(
        "--chart-opacity",
        opacity.toFixed(3)
      );


      chart.style.setProperty(
        "--chart-shadow",
        shadow.toFixed(3)
      );
    }


    return update;
  }



  /* ==========================================================
     MASTER SCROLL LOOP
     ========================================================== */

  function init() {

    /*
       field-effects.js executes before this file,
       but two frames give its generated wrappers
       time to settle before restructuring.
    */

    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          () => {

            setupShade();

            const updateRain =
              setupRainProcess();

            /*
               Daily Systems are rendered by Results V6.
               The old editorial-row transformer is deliberately
               no longer executed.
            */

            const updateChart =
              setupChart();


            let queued =
              false;


            function update() {

              queued = false;


              if (
                window.__shadeScenes
              ) {

                window
                  .__shadeScenes
                  .forEach(
                    scene =>
                      scene
                        ._updateShade
                        ?.()
                  );

              }


              updateRain?.();

              updateChart?.();
            }


            function queue() {

              if (queued) {
                return;
              }


              queued = true;

              requestAnimationFrame(
                update
              );
            }


            window.addEventListener(
              "scroll",
              queue,
              {
                passive: true
              }
            );


            window.addEventListener(
              "resize",
              queue,
              {
                passive: true
              }
            );


            update();

          }
        );

      }
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  }
  else {

    init();

  }

})();


/* ============================================================
   LAYOUT / EVIDENCE REPAIR V3
   Runs AFTER the balanced presentation setup.
   ============================================================ */

(() => {
  "use strict";


  function afterFrames(
    callback
  ) {

    requestAnimationFrame(
      () =>
        requestAnimationFrame(
          () =>
            requestAnimationFrame(
              callback
            )
        )
    );

  }



  /* ==========================================================
     CLASSIFY DAILY SYSTEM CARDS BY NUMBER OF PHOTOS
     ========================================================== */

  function classifySystemCards() {

    document
      .querySelectorAll(
        "#daily-systems .system-card"
      )
      .forEach(
        card => {

          card.classList.add(
            "editorial-card"
          );


          card.classList.remove(
            "system-one",
            "system-two",
            "system-many"
          );


          const count =
            card.querySelectorAll(
              ":scope > .photo-grid > .evidence-photo[data-photo]"
            ).length;


          if (count === 1) {

            card.classList.add(
              "system-one"
            );

          }
          else if (
            count === 2
          ) {

            card.classList.add(
              "system-two"
            );

          }
          else if (
            count > 2
          ) {

            card.classList.add(
              "system-many"
            );

          }

        }
      );

  }



  /* ==========================================================
     RAIN PROCESS:
     OPEN ORIGINAL LIGHTBOX, NOT THE CLONED FIGURE
     ========================================================== */

  function originalRainVisualFor(
    processImage
  ) {

    const image =
      processImage.querySelector(
        "img"
      );


    if (!image) {
      return null;
    }


    const filename =
      (
        image.getAttribute(
          "src"
        ) || ""
      )
      .split("/")
      .pop();


    if (!filename) {
      return null;
    }


    const originals =
      Array.from(
        document.querySelectorAll(
          "#rain-gardens > .sequence .evidence-photo[data-photo]"
        )
      );


    const original =
      originals.find(
        figure =>
          (
            figure.dataset.photo ||
            ""
          )
          .split("/")
          .pop() === filename
      );


    return original
      ?.querySelector(
        ":scope > .evidence-visual"
      ) || null;
  }



  /*
     Capture phase intentionally intercepts the old
     rain-process cloned click handler.
  */

  document.addEventListener(
    "click",
    event => {

      const processImage =
        event.target.closest(
          ".rain-process-image"
        );


      if (!processImage) {
        return;
      }


      const originalVisual =
        originalRainVisualFor(
          processImage
        );


      if (!originalVisual) {
        return;
      }


      event.preventDefault();

      event.stopPropagation();


      originalVisual.click();

    },
    true
  );



  /* ==========================================================
     CUSTOM EVIDENCE CURSOR FOR CLONED RAIN PROCESS

     Ordinary photographs already use the original site's
     evidence cursor.
     ========================================================== */

  function processTitle(
    processImage
  ) {

    const step =
      processImage.dataset.step;


    const panel =
      processImage
        .closest(
          ".rain-process-stage"
        )
        ?.querySelector(
          `.rain-process-copy-panel[data-step="${step}"] h3`
        );


    return (
      panel?.textContent?.trim()
      ||
      "Field evidence"
    );

  }



  document.addEventListener(
    "pointermove",
    event => {

      const processImage =
        event.target.closest(
          ".rain-process-image"
        );


      if (!processImage) {
        return;
      }


      const cursor =
        document.getElementById(
          "cursorLabel"
        );


      if (!cursor) {
        return;
      }


      cursor.style.left =
        `${event.clientX}px`;


      cursor.style.top =
        `${event.clientY}px`;


      cursor.innerHTML =
        `${processTitle(processImage)}<br><span>Open evidence</span>`;


      cursor.classList.add(
        "visible"
      );

    },
    {
      passive: true
    }
  );



  document.addEventListener(
    "pointerout",
    event => {

      const processImage =
        event.target.closest(
          ".rain-process-image"
        );


      if (!processImage) {
        return;
      }


      if (
        processImage.contains(
          event.relatedTarget
        )
      ) {
        return;
      }


      document
        .getElementById(
          "cursorLabel"
        )
        ?.classList
        .remove(
          "visible"
        );

    }
  );



  /* ==========================================================
     INITIALISE
     ========================================================== */

  function repair() {

    classifySystemCards();


    document
      .querySelector(
        "#greenery"
      )
      ?.classList
      .add(
        "greenery-gallery-ready"
      );


    console.log(
      "✓ Layout repair V3 active"
    );

    console.log(
      "✓ Rain process evidence modal repaired"
    );

    console.log(
      "✓ Daily-system cards reclassified"
    );

    console.log(
      "✓ Greenery converted to editorial gallery"
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () =>
        afterFrames(
          repair
        ),
      {
        once: true
      }
    );

  }
  else {

    afterFrames(
      repair
    );

  }

})();

