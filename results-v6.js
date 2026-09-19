(() => {
  "use strict";

  if (window.__RESULTS_V6_ACTIVE__) {
    return;
  }

  window.__RESULTS_V6_ACTIVE__ = true;

  console.log("✓ Results V6 execution started");


  const cursor =
    document.getElementById(
      "cursorLabel"
    );


  /* ==========================================================
     HELPERS
     ========================================================== */

  function sourceVault() {

    let vault =
      document.getElementById(
        "v6-source-vault"
      );


    if (!vault) {

      vault =
        document.createElement(
          "div"
        );


      vault.id =
        "v6-source-vault";


      /*
         Inline !important deliberately prevents ANY old
         stylesheet from making source material visible.
      */

      vault.style.setProperty(
        "display",
        "none",
        "important"
      );


      vault.setAttribute(
        "aria-hidden",
        "true"
      );


      document.body.appendChild(
        vault
      );

    }


    return vault;
  }


  function archiveSource(
    element
  ) {

    if (!element) {
      return;
    }


    sourceVault().appendChild(
      element
    );
  }


  function directText(
    node
  ) {

    return (
      node?.textContent?.trim()
      || ""
    );

  }


  function captionData(
    figure
  ) {

    const caption =
      figure.querySelector(
        "figcaption"
      );


    const strong =
      caption?.querySelector(
        "strong"
      );


    const title =
      directText(strong)
      || "Field evidence";


    let description = "";


    if (caption) {

      const clone =
        caption.cloneNode(true);


      clone
        .querySelector(
          "strong"
        )
        ?.remove();


      description =
        directText(clone);

    }


    return {
      title,
      description
    };

  }


  function originalVisual(
    figure
  ) {

    return figure.querySelector(
      ":scope > .evidence-visual"
    );

  }



  function showCursor(
    event,
    title
  ) {

    if (!cursor) {
      return;
    }


    cursor.style.left =
      `${event.clientX}px`;


    cursor.style.top =
      `${event.clientY}px`;


    cursor.innerHTML =
      `${title}<br><span>Open evidence</span>`;


    cursor.classList.add(
      "visible"
    );

  }


  function hideCursor() {

    cursor
      ?.classList
      .remove(
        "visible"
      );

  }



  function mediaFrom(
    figure,
    extraClass = ""
  ) {

    const image =
      figure.querySelector(
        "img"
      );


    if (!image) {
      return null;
    }


    const {
      title,
      description
    } =
      captionData(
        figure
      );


    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      `v6-media ${extraClass}`.trim();


    button.setAttribute(
      "aria-label",
      `${title} — Open evidence`
    );


    const clone =
      document.createElement(
        "img"
      );


    clone.src =
      image.getAttribute(
        "src"
      );


    clone.alt =
      image.alt || title;


    clone.loading =
      "lazy";


    clone.decoding =
      "async";


    const open =
      document.createElement(
        "span"
      );


    open.className =
      "v6-open";


    open.textContent =
      "View evidence ↗";


    const caption =
      document.createElement(
        "span"
      );


    caption.className =
      "v6-media-caption";


    const strong =
      document.createElement(
        "strong"
      );


    strong.textContent =
      title;


    const desc =
      document.createElement(
        "span"
      );


    desc.textContent =
      description;


    caption.append(
      strong,
      desc
    );


    button.append(
      clone,
      open,
      caption
    );


    const openOriginal =
      () => {

        hideCursor();


        const visual =
          originalVisual(
            figure
          );


        if (visual) {
          visual.click();
        }

      };


    button.addEventListener(
      "click",
      openOriginal
    );


    button.addEventListener(
      "pointermove",
      event =>
        showCursor(
          event,
          title
        ),
      {
        passive: true
      }
    );


    button.addEventListener(
      "pointerleave",
      hideCursor
    );


    return button;
  }



  function copyWithoutIds(
    node
  ) {

    const clone =
      node.cloneNode(true);


    clone
      .querySelectorAll(
        "[id]"
      )
      .forEach(
        element =>
          element.removeAttribute(
            "id"
          )
      );


    clone
      .querySelectorAll(
        "[data-edit-text]"
      )
      .forEach(
        element =>
          element.removeAttribute(
            "data-edit-text"
          )
      );


    return clone;
  }



  /* ==========================================================
     GREENERY
     ========================================================== */

  function renderGreenery() {

    const chapter =
      document.getElementById(
        "greenery"
      );


    const source =
      chapter?.querySelector(
        ":scope > .photo-grid"
      )
      ||
      document.querySelector(
        "#v6-source-vault #greenery > .photo-grid"
      )
      ||
      document.querySelector(
        "#v6-source-vault .photo-grid"
      );


    if (
      !chapter ||
      !source
    ) {
      return;
    }


    const figures =
      Array.from(
        source.querySelectorAll(
          ":scope > .evidence-photo[data-photo]"
        )
      );


    if (!figures.length) {
      return;
    }


    const gallery =
      document.createElement(
        "div"
      );


    gallery.className =
      "v6-results v6-greenery";


    figures.forEach(
      figure => {

        const media =
          mediaFrom(
            figure
          );


        if (media) {
          gallery.appendChild(
            media
          );
        }

      }
    );


    source.insertAdjacentElement(
      "afterend",
      gallery
    );


    archiveSource(
      source
    );

  }



  /* ==========================================================
     DAILY SYSTEMS
     ========================================================== */

  function systemContent(
    card
  ) {

    return {

      label:
        directText(
          card.querySelector(
            ":scope > .evidence-label"
          )
        ),

      heading:
        directText(
          card.querySelector(
            ":scope > h3"
          )
        ),

      body:
        directText(
          card.querySelector(
            ":scope > p"
          )
        ),

      figures:
        Array.from(
          card.querySelectorAll(
            ":scope > .photo-grid > .evidence-photo[data-photo]"
          )
        )

    };

  }



  function makeHead(
    data
  ) {

    const head =
      document.createElement(
        "div"
      );


    head.className =
      "v6-system-head";


    const eyebrow =
      document.createElement(
        "span"
      );


    eyebrow.className =
      "v6-eyebrow";


    eyebrow.textContent =
      data.label;


    const title =
      document.createElement(
        "h3"
      );


    title.className =
      "v6-title";


    title.textContent =
      data.heading;


    const body =
      document.createElement(
        "p"
      );


    body.className =
      "v6-body";


    body.textContent =
      data.body;


    head.append(
      eyebrow,
      title,
      body
    );


    return head;
  }



  function renderCycling(
    card,
    data
  ) {

    const section =
      document.createElement(
        "section"
      );


    section.className =
      "v6-system v6-cycle";


    section.appendChild(
      makeHead(
        data
      )
    );


    if (
      data.figures[0]
    ) {

      const main =
        mediaFrom(
          data.figures[0],
          "v6-cycle-main"
        );


      if (main) {
        section.appendChild(
          main
        );
      }

    }


    const support =
      document.createElement(
        "div"
      );


    support.className =
      "v6-cycle-support";


    data.figures
      .slice(1)
      .forEach(
        figure => {

          const media =
            mediaFrom(
              figure
            );


          if (media) {
            support.appendChild(
              media
            );
          }

        }
      );


    section.appendChild(
      support
    );


    return section;
  }



  function renderRow(
    card,
    data,
    reverse = false
  ) {

    const section =
      document.createElement(
        "section"
      );


    section.className =
      `v6-system v6-system-row${reverse ? " reverse" : ""}`;


    const copy =
      makeHead(
        data
      );


    copy.classList.add(
      "v6-system-row-copy"
    );


    const mediaWrap =
      document.createElement(
        "div"
      );


    mediaWrap.className =
      "v6-system-row-media";


    if (
      data.figures[0]
    ) {

      const media =
        mediaFrom(
          data.figures[0]
        );


      if (media) {
        mediaWrap.appendChild(
          media
        );
      }

    }


    if (reverse) {

      section.append(
        copy,
        mediaWrap
      );

    }
    else {

      section.append(
        mediaWrap,
        copy
      );

    }


    return section;
  }



  function renderLogistics(
    card,
    data
  ) {

    const section =
      document.createElement(
        "section"
      );


    section.className =
      "v6-system v6-logistics";


    section.appendChild(
      makeHead(
        data
      )
    );


    const grid =
      document.createElement(
        "div"
      );


    grid.className =
      "v6-logistics-grid";


    data.figures.forEach(
      figure => {

        const media =
          mediaFrom(
            figure
          );


        if (media) {
          grid.appendChild(
            media
          );
        }

      }
    );


    section.appendChild(
      grid
    );


    return section;
  }



  function renderSystems() {

    const chapter =
      document.getElementById(
        "daily-systems"
      );


    const source =
      chapter?.querySelector(
        ":scope > .systems-grid"
      )
      ||
      document.querySelector(
        "#v6-source-vault .systems-grid"
      );


    if (
      !chapter ||
      !source
    ) {
      return;
    }


    const cards =
      Array.from(
        source.querySelectorAll(
          ":scope > .system-card"
        )
      );


    const result =
      document.createElement(
        "div"
      );


    result.className =
      "v6-results v6-systems";


    cards.forEach(
      (
        card,
        index
      ) => {

        const data =
          systemContent(
            card
          );


        let section;


        /*
           Original order:
           1 Cycling
           2 Food
           3 Energy
           4 Underground logistics
        */

        if (index === 0) {

          section =
            renderCycling(
              card,
              data
            );

        }
        else if (
          index === 1
        ) {

          section =
            renderRow(
              card,
              data,
              false
            );

        }
        else if (
          index === 2
        ) {

          section =
            renderRow(
              card,
              data,
              true
            );

        }
        else {

          section =
            renderLogistics(
              card,
              data
            );

        }


        result.appendChild(
          section
        );

      }
    );


    source.insertAdjacentElement(
      "afterend",
      result
    );


    archiveSource(
      source
    );

  }



  /* ==========================================================
     TENANT STUDIES
     ========================================================== */

  function tenantMedia(
    sourceStudy
  ) {

    const originalFigure =
      sourceStudy.querySelector(
        ":scope > .tenant-photo[data-photo]"
      );


    if (!originalFigure) {
      return null;
    }


    return mediaFrom(
      originalFigure,
      "v6-tenant-media"
    );

  }



  function renderTenant(
    source,
    reverse
  ) {

    const section =
      document.createElement(
        "section"
      );


    section.className =
      `v6-tenant${reverse ? " reverse" : ""}`;


    const mediaWrap =
      document.createElement(
        "div"
      );


    mediaWrap.className =
      "v6-tenant-media-wrap";


    const media =
      tenantMedia(
        source
      );


    if (media) {

      mediaWrap.appendChild(
        media
      );

    }


    const sourceCopy =
      source.querySelector(
        ":scope > .tenant-copy"
      );


    const copy =
      sourceCopy
      ?
      copyWithoutIds(
        sourceCopy
      )
      :
      document.createElement(
        "div"
      );


    copy.classList.remove(
      "tenant-copy"
    );


    copy.classList.add(
      "v6-tenant-copy"
    );


    if (reverse) {

      section.append(
        copy,
        mediaWrap
      );

    }
    else {

      section.append(
        mediaWrap,
        copy
      );

    }


    return section;
  }



  function renderTenants() {

    /*
      Defensive cleanup:
      only one V6 tenant pair should ever exist.
    */
    document
      .querySelectorAll(
        ".v6-tenants"
      )
      .forEach(
        element =>
          element.remove()
      );


    const first =
      document.getElementById(
        "tenant-one"
      );


    const second =
      document.getElementById(
        "tenant-evidence"
      );


    if (
      !first ||
      !second
    ) {
      return;
    }


    const holder =
      document.createElement(
        "div"
      );


    holder.className =
      "v6-results v6-tenants";


    holder.append(
      renderTenant(
        first,
        false
      ),

      renderTenant(
        second,
        true
      )
    );


    second.insertAdjacentElement(
      "afterend",
      holder
    );


    archiveSource(
      first
    );


    archiveSource(
      second
    );

  }



  /* ==========================================================
     WAIT UNTIL ORIGINAL LIGHTBOX SYSTEM HAS INITIALISED
     ========================================================== */

  function ready() {

    return !!document.querySelector(
      "#daily-systems .evidence-photo[data-photo] > .evidence-visual"
    );

  }


  function boot(
    tries = 0
  ) {

    /*
       Defensive de-duplication:
       never permit two rendered V6 result sets.
    */

    document
      .querySelectorAll(
        ".v6-results"
      )
      .forEach(
        element =>
          element.remove()
      );

    if (
      !ready() &&
      tries < 90
    ) {

      requestAnimationFrame(
        () =>
          boot(
            tries + 1
          )
      );


      return;
    }


    renderGreenery();

    renderSystems();

    renderTenants();

    document.documentElement.classList.add(
      "results-v6-ready"
    );

    document.documentElement.setAttribute(
      "data-results-v6",
      "ready"
    );

    console.log(
      "✓ Results V6 isolated renderer active"
    );

    console.log(
      "✓ V6 elements:",
      document.querySelectorAll(".v6-results").length
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () =>
        boot(),
      {
        once: true
      }
    );

  }
  else {

    boot();

  }

})();
