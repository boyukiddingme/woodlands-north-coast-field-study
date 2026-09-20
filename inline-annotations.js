(() => {
  "use strict";


  /*
     ==========================================================
     VISIBLE FIELD-EVIDENCE ANNOTATIONS

     Exact x/y points below are used only where the feature
     position was already established in the existing
     annotation system.

     Other photographs receive a compact analytical note
     rather than an invented pointer location.
     ==========================================================
  */

  const annotations = {

    /* --------------------------------------------------------
       SHADE / PUBLIC REALM
       -------------------------------------------------------- */

    "IMG20260904155708.webp": {
      points: [
        {
          x: 48,
          y: 65,
          label:
            "Shaded observation area"
        }
      ]
    },


    "IMG20260904155247.webp": {
      note:
        "Exposed area A · seating was available, but direct afternoon sun coincided with much lower staying activity."
    },


    "IMG20260904160411.webp": {
      note:
        "Exposed space was not automatically unused · this separate field was being used for frisbee."
    },



    /* --------------------------------------------------------
       RAIN GARDENS
       -------------------------------------------------------- */

    "IMG20260904160046.webp": {
      note:
        "On-site signage identifies the feature as a rain garden · design intent is visible, but performance still requires observation."
    },


    "IMG20260904160033.webp": {
      points: [
        {
          x: 33,
          y: 53,
          label:
            "Roof-runoff inlet"
        }
      ]
    },


    "IMG20260914183646.webp": {
      note:
        "Rainfall visit · water is visibly leaving the outlet and entering the stone-covered planted bed."
    },


    "IMG20260914183547.webp": {
      note:
        "Incoming water meets stone before moving through the planted area · velocity and erosion reduction were not measured."
    },


    "IMG20260904160124.webp": {
      points: [
        {
          x: 83,
          y: 44,
          label:
            "Visible pipework"
        }
      ],

      note:
        "Depressed planting forms part of the visible stormwater route while also functioning as public landscape."
    },


    "IMG20260904161531.webp": {
      points: [
        {
          x: 43,
          y: 65,
          label:
            "Pedestrian route through rain garden"
        }
      ]
    },


    "IMG20260904161725.webp": {
      note:
        "A second rain-garden sign at 7 North Coast supports precinct-wide provision rather than a single decorative planter."
    },


    "IMG20260904161916_01.webp": {
      points: [
        {
          x: 68,
          y: 68,
          label:
            "Outlet above grating"
        },

        {
          x: 30,
          y: 80,
          label:
            "Stone-covered planted edge"
        }
      ]
    },


    "IMG20260904161944.webp": {
      points: [
        {
          x: 26,
          y: 66,
          label:
            "Clear perimeter drain"
        }
      ]
    },


    "IMG20260914183734_01-landscape.webp": {
      note:
        "During rainfall, water also entered the grated drainage route · this is not evidence of infiltration into the planted bed."
    },



    /* --------------------------------------------------------
       GREEN INFRASTRUCTURE
       -------------------------------------------------------- */

    "IMG20260904155839.webp": {
      note:
        "Courtyard planting sits inside the public route rather than only around the site boundary."
    },


    "IMG20260904160150.webp": {
      note:
        "Tall open courtyard · the spatial opening provides a visible route for air movement, although airflow was not instrument-measured."
    },


    "IMG20260904163349.webp": {
      note:
        "Planting, seating edges and circulation overlap · greenery also functions as usable public space."
    },



    /* --------------------------------------------------------
       CYCLING / DAILY SYSTEMS
       -------------------------------------------------------- */

    "IMG20260904154308.webp": {
      note:
        "Covered, semi-enclosed bicycle parking is separated from the main pedestrian route."
    },


    "IMG20260904154440.webp": {
      note:
        "Occupied racks show actual use · screened openings provide daylight and outside-air connection."
    },


    "IMG20260904154449.webp": {
      note:
        "Dedicated bicycle-parking signage improves wayfinding inside the precinct."
    },


    "IMG20260904155726.webp": {
      note:
        "Site map identifies an End of Trip Facility · its interior fittings were not inspected."
    },


    "IMG20260904154454.webp": {
      note:
        "Facility room directly beside the bicycle racks · interior condition and use were not inspected."
    },


    "IMG20260904155938.webp": {
      note:
        "Public-facing food outlet · workers used the precinct for eating, resting and collection as well as work."
    },



    /* --------------------------------------------------------
       ENERGY / LOGISTICS / WASTE
       -------------------------------------------------------- */

    "IMG20260904160259.webp": {
      points: [
        {
          x: 18,
          y: 47,
          label:
            "July 580,000 kWh · August shown as 0"
        },

        {
          x: 62,
          y: 70,
          label:
            "Chiller efficiency · 0.553 kW/RT"
        }
      ],

      note:
        "The dashboard confirms performance information is displayed, but the zero reading and savings baseline were not independently verified."
    },


    "IMG20260904162905.webp": {
      note:
        "Service entrance indicates below-ground operations · the loading docks themselves were not entered."
    },


    "IMG20260904161147.webp": {
      note:
        "Recycling and general-waste bins are both provided · provision does not establish actual recycling performance."
    },



    /* --------------------------------------------------------
       TENANT DIRECTORIES
       -------------------------------------------------------- */

    "IMG20260904160506.webp": {
      points: [
        {
          x: 29,
          y: 47,
          label:
            "Applied Materials"
        },

        {
          x: 65,
          y: 55,
          label:
            "SICK"
        }
      ],

      note:
        "Directory evidence establishes listed tenant presence · company sources are needed to interpret sectors."
    },


    "IMG20260904161250.webp": {
      points: [
        {
          x: 66,
          y: 39,
          label:
            "Illumina · manufacturing listed"
        },

        {
          x: 66,
          y: 51,
          label:
            "Ascential Medical & Life Sciences"
        }
      ],

      note:
        "The board records specialised firms and industrial uses, but co-location alone does not prove collaboration or productivity."
    }

  };



  /* ==========================================================
     HELPERS
     ========================================================== */

  function filenameFrom(
    element
  ) {

    const figure =
      element.closest(
        ".evidence-photo[data-photo]"
      );


    if (
      figure?.dataset.photo
    ) {

      return figure
        .dataset
        .photo
        .split("/")
        .pop();

    }


    const image =
      element.querySelector(
        "img"
      );


    if (!image) {
      return "";
    }


    const src =
      image.getAttribute(
        "src"
      )
      || "";


    return src
      .split("?")[0]
      .split("/")
      .pop();

  }



  function makeLayer(
    container,
    data
  ) {

    if (
      container.querySelector(
        ":scope > .inline-evidence-annotations"
      )
    ) {
      return;
    }


    const layer =
      document.createElement(
        "div"
      );


    layer.className =
      "inline-evidence-annotations";


    layer.setAttribute(
      "aria-hidden",
      "true"
    );



    if (
      Array.isArray(
        data.points
      )
    ) {

      data.points.forEach(
        point => {

          const marker =
            document.createElement(
              "div"
            );


          marker.className =
            "inline-evidence-point "
            +
            (
              point.x > 62
                ? "to-left"
                : "to-right"
            );


          marker.style.setProperty(
            "--x",
            point.x
          );


          marker.style.setProperty(
            "--y",
            point.y
          );


          const dot =
            document.createElement(
              "span"
            );


          dot.className =
            "inline-evidence-dot";


          const label =
            document.createElement(
              "span"
            );


          label.className =
            "inline-evidence-label";


          label.textContent =
            point.label;


          marker.append(
            dot,
            label
          );


          layer.appendChild(
            marker
          );

        }
      );

    }



    if (
      data.note
    ) {

      const note =
        document.createElement(
          "div"
        );


      note.className =
        "inline-evidence-note";


      note.textContent =
        data.note;


      layer.appendChild(
        note
      );

    }


    container.appendChild(
      layer
    );

  }



  function annotateOriginals() {

    document
      .querySelectorAll(
        [
          "#shade .evidence-photo[data-photo]",
          "#rain-gardens .evidence-photo[data-photo]",
          "#greenery .evidence-photo[data-photo]",
          "#daily-systems .evidence-photo[data-photo]",
          "#tenant-one .evidence-photo[data-photo]",
          "#tenant-evidence .evidence-photo[data-photo]"
        ].join(",")
      )
      .forEach(
        figure => {

          const visual =
            figure.querySelector(
              ":scope > .evidence-visual"
            );


          if (!visual) {
            return;
          }


          const filename =
            filenameFrom(
              figure
            );


          const data =
            annotations[
              filename
            ];


          if (!data) {
            return;
          }


          makeLayer(
            visual,
            data
          );

        }
      );

  }



  function annotateDynamicCopies() {

    document
      .querySelectorAll(
        ".rain-process-image, .v6-media"
      )
      .forEach(
        container => {

          /*
             Do not interfere with the approved
             Accessibility route film.
          */

          if (
            container.closest(
              "#route"
            )
          ) {
            return;
          }


          const filename =
            filenameFrom(
              container
            );


          const data =
            annotations[
              filename
            ];


          if (!data) {
            return;
          }


          makeLayer(
            container,
            data
          );

        }
      );

  }



  function scan() {

    annotateOriginals();

    annotateDynamicCopies();

  }



  /* ==========================================================
     INITIALISE + WATCH DYNAMIC V6 / RAIN RENDERING
     ========================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      scan,
      {
        once: true
      }
    );

  }
  else {

    scan();

  }


  window.addEventListener(
    "load",
    scan,
    {
      once: true
    }
  );


  /*
     Results V6 and the rain-process story are built dynamically,
     so watch for those nodes appearing.
  */

  const observer =
    new MutationObserver(
      mutations => {

        if (
          mutations.some(
            mutation =>
              mutation.addedNodes.length
          )
        ) {

          requestAnimationFrame(
            scan
          );

        }

      }
    );


  observer.observe(
    document.documentElement,
    {
      childList: true,
      subtree: true
    }
  );


  /*
     A few delayed scans catch scripts that initialise after load
     without requiring permanent heavy work.
  */

  setTimeout(
    scan,
    250
  );

  setTimeout(
    scan,
    900
  );

  setTimeout(
    scan,
    1800
  );


  console.log(
    "✓ Visible inline evidence annotations active"
  );

})();
