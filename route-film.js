/* GOOGLE ROUTE VERIFIED V2 */
/* SATELLITE ROUTE FINAL V1 */
(() => {

  const story =
    document.getElementById(
      "routeFilm"
    );

  if (!story)
    return;


  /* ==========================================================
     EXACT GOOGLE WALKING ROUTE — MANUALLY TRACED

     Based on the blue dotted walking route supplied by Boyu.

     Automatic routing is intentionally NOT used.
     ========================================================== */

  let ROUTE = [
    [103.7850700, 1.4479600],
    [103.7850300, 1.4479200],
    [103.7849900, 1.4479000],
    [103.7849800, 1.4478600],
    [103.7849700, 1.4478300],
    [103.7849500, 1.4477900],
    [103.7849500, 1.4477800],
    [103.7849200, 1.4477500],
    [103.7848900, 1.4477000],
    [103.7848500, 1.4476600],
    [103.7848300, 1.4476400],
    [103.7848200, 1.4476400],
    [103.7848100, 1.4476200],
    [103.7847700, 1.4475800],
    [103.7847700, 1.4475000],
    [103.7847700, 1.4474700],
    [103.7848100, 1.4471300],
    [103.7848500, 1.4469000],
    [103.7848600, 1.4467400],
    [103.7849000, 1.4463800],
    [103.7849100, 1.4462900],
    [103.7849300, 1.4460800],
    [103.7849800, 1.4460800],
    [103.7850500, 1.4460600],
    [103.7851200, 1.4460400],
    [103.7852600, 1.4460100],
    [103.7853400, 1.4459700],
    [103.7854100, 1.4459400],
    [103.7854700, 1.4459100],
    [103.7855600, 1.4458700],
    [103.7856600, 1.4458100],
    [103.7858000, 1.4457200],
    [103.7858800, 1.4456700],
    [103.7859600, 1.4456200],
    [103.7859800, 1.4456000],
    [103.7860300, 1.4455600],
    [103.7860900, 1.4454900],
    [103.7861500, 1.4454000],
    [103.7861900, 1.4453200],
    [103.7862300, 1.4452400],
    [103.7862500, 1.4451800],
    [103.7862600, 1.4451400],
    [103.7862800, 1.4450800],
    [103.7862900, 1.4450200],
    [103.7863000, 1.4449700],
    [103.7863000, 1.4449500],
    [103.7863200, 1.4448000],
    [103.7863400, 1.4445800],
    [103.7863500, 1.4445300],
    [103.7863600, 1.4444500],
    [103.7863600, 1.4444200],
    [103.7863700, 1.4443600],
    [103.7863800, 1.4443100],
    [103.7864000, 1.4442800],
    [103.7864200, 1.4442500],
    [103.7864400, 1.4442200],
    [103.7864600, 1.4442000],
    [103.7864800, 1.4441900],
    [103.7865100, 1.4441700],
    [103.7865300, 1.4441600],
    [103.7865500, 1.4441500],
    [103.7865800, 1.4441400],
    [103.7866200, 1.4441500],
    [103.7866500, 1.4441500],
    [103.7867000, 1.4441600],
    [103.7867700, 1.4441800],
    [103.7869100, 1.4442100],
    [103.7869300, 1.4442600],
    [103.7869600, 1.4442800],
    [103.7869800, 1.4443000],
    [103.7870100, 1.4443200],
    [103.7870200, 1.4443200],
    [103.7876000, 1.4447000],
    [103.7876300, 1.4447100],
    [103.7876500, 1.4447200],
    [103.7876900, 1.4447000],
    [103.7877200, 1.4446800],
    [103.7877400, 1.4446500],
    [103.7877700, 1.4445900],
    [103.7879900, 1.4441500],
    [103.7880300, 1.4440800],
    [103.7880400, 1.4440600],
    [103.7880700, 1.4440000],
    [103.7881000, 1.4439200],
    [103.7882000, 1.4438900],
    [103.7882500, 1.4438800],
    [103.7883200, 1.4438700],
    [103.7883400, 1.4438800],
    [103.7886000, 1.4440700],
    [103.7886800, 1.4441800],
    [103.7887100, 1.4442000],
    [103.7889500, 1.4444000],
    [103.7890900, 1.4444400],
    [103.7891500, 1.4444800],
    [103.7891800, 1.4445000],
    [103.7892400, 1.4445500],
    [103.7893300, 1.4446100],
    [103.7894200, 1.4446600],
    [103.7895200, 1.4447200],
    [103.7897600, 1.4448700],
    [103.7898500, 1.4449900],
    [103.7901600, 1.4451800],
    [103.7902500, 1.4452300],
    [103.7905400, 1.4454100],
    [103.7906500, 1.4454500],
    [103.7906700, 1.4454600],
    [103.7908100, 1.4455600],
    [103.7909500, 1.4456500],
    [103.7910200, 1.4456900],
    [103.7910900, 1.4457300],
    [103.7911200, 1.4457500],
    [103.7911600, 1.4457700],
    [103.7912000, 1.4458000],
    [103.7912400, 1.4458200],
    [103.7912900, 1.4458400],
    [103.7913300, 1.4458600],
    [103.7913800, 1.4458800],
    [103.7914200, 1.4459000],
    [103.7914700, 1.4459100],
    [103.7915500, 1.4459400],
    [103.7916500, 1.4459600],
    [103.7916700, 1.4459700],
    [103.7917300, 1.4459900],
    [103.7917700, 1.4460100],
    [103.7918700, 1.4460700],
    [103.7920300, 1.4461200],
    [103.7921200, 1.4461400],
    [103.7921400, 1.4461600],
    [103.7921600, 1.4462000],
    [103.7921800, 1.4462400],
    [103.7921900, 1.4462600],
    [103.7922100, 1.4462900],
    [103.7922200, 1.4463300],
    [103.7922000, 1.4463900],
    [103.7921300, 1.4465700],
    [103.7920800, 1.4466800],
    [103.7920200, 1.4468200],
    [103.7920000, 1.4469700],
    [103.7919300, 1.4471500],
    [103.7918500, 1.4473100],
    [103.7918000, 1.4472200],
    [103.7917600, 1.4471800],
    [103.7916800, 1.4471300],
    [103.7915700, 1.4471000],
    [103.7912700, 1.4469900],
  ];


  /* ==========================================================
     FIELD EVIDENCE

     Each photograph is anchored to a real point on the route.

     The camera reaches the point FIRST.

     Only THEN can the photo appear.
     ========================================================== */

  const STAGES = [

    /* --------------------------------------------------------
       01 — STATION MAP
       Starting location.
       -------------------------------------------------------- */

    {
      at:
        [103.7850351,1.4480029],

      startEvidence:
        true,

      place:
        "Woodlands North MRT · Exit 1",

      time:
        "15:26",

      label:
        "01 / Orientation",

      photo:
        "fieldwork/IMG20260904152602.webp",

      alt:
        "Locality map at Woodlands North MRT",

      title:
        "Station map · 15:26",

      caption:
        "The station map gave a broad direction towards North Coast, but I found little dedicated North Coast wayfinding outside.",

      analysis:
        "The map established the general direction of North Coast, but it did not provide a clear door-to-door pedestrian route. This became the starting point for testing the published walking-time claim.",

      fit:
        "cover"
    },


    /* --------------------------------------------------------
       02 — BICYCLE RACKS
       SAME physical starting location.
       -------------------------------------------------------- */

    {
      at:
        [103.7850351,1.4480029],

      startEvidence:
        true,

      place:
        "Woodlands North MRT · bicycle parking",

      time:
        "15:31",

      label:
        "02 / Bicycle parking",

      photo:
        "fieldwork/IMG20260904153138.webp",

      alt:
        "Bicycle parking immediately outside Woodlands North MRT Exit 1",

      title:
        "Exit 1 bicycle parking · 15:31",

      caption:
        "Bicycle parking was present immediately outside the station.",

      analysis:
        "Covered bicycle parking was available immediately outside Exit 1. It supports cycling access to the station, although I did not find a dedicated cycle route continuing from the MRT to Woodlands North Coast.",

      fit:
        "cover"
    },


    /* --------------------------------------------------------
       03 — WALKWAY DIRECTLY AHEAD
       Only a very short camera movement from the bicycle racks.
       -------------------------------------------------------- */

    {
      at:
        [103.7849000,1.4479900],

      place:
        "Walkway ahead of Exit 1",

      time:
        "15:31",

      label:
        "03 / Walkway",

      photo:
        "fieldwork/IMG20260904153151.webp",

      alt:
        "Walkway directly ahead of the bicycle parking outside Woodlands North MRT Exit 1",

      title:
        "Walkway outside Exit 1",

      caption:
        "The route continued directly ahead from the bicycle-parking area towards Republic Polytechnic.",

      analysis:
        "The walkway was passable and wide enough for normal pedestrian movement. However, I found no obvious North Coast marker directing pedestrians along the complete route.",

      fit:
        "contain"
    },


    /* --------------------------------------------------------
       04 — RP ENTRANCE
       Happens AFTER the walkway.
       -------------------------------------------------------- */

    {
      at:
        [103.7847900,1.4478000],

      place:
        "Republic Polytechnic entrance",

      time:
        "15:32",

      label:
        "04 / Entering RP",

      photo:
        "fieldwork/IMG20260904153210.webp",

      alt:
        "Entrance point on the observed route into Republic Polytechnic",

      title:
        "Entering Republic Polytechnic",

      caption:
        "The entrance was open and I remained on the publicly accessible route.",

      analysis:
        "This point marked the transition from the MRT-side walkway into the Republic Polytechnic section of my observed route. From here, I continued along the internal road towards the main-road connection.",

      fit:
        "contain"
    },


    /* --------------------------------------------------------
       05 — NOW ACTUALLY TRAVELLING THROUGH RP
       -------------------------------------------------------- */

    {
      at:
        [103.7876014,1.4447005],

      place:
        "Republic Polytechnic road",

      time:
        "15:34",

      label:
        "05 / Roadside exposure",

      photo:
        "fieldwork/IMG20260904153451.webp",

      alt:
        "Tree-shaded part of the route through and beyond Republic Polytechnic",

      title:
        "Partial tree shade",

      caption:
        "Trees provided intermittent shade, but the overall approach remained mostly unsheltered.",

      analysis:
        "Trees created intermittent shade beside the route, but there was no continuous shelter. In bright, sunny conditions, the approach was less comfortable than the shaded public spaces inside North Coast.",

      fit:
        "cover"
    },


    /* --------------------------------------------------------
       06 — MAIN CROSSING
       -------------------------------------------------------- */

    {
      at:
        [103.7879477,1.4439364],

      place:
        "Main crossing",

      time:
        "15:35",

      label:
        "06 / Crossing",

      photo:
        "fieldwork/IMG20260904153534.webp",

      alt:
        "Traffic crossing on the observed route",

      title:
        "Main crossing",

      caption:
        "Ramps and tactile paving were visible; the wait was about 30 seconds.",

      analysis:
        "This was the only major signalised crossing on my observed route. Ramps and tactile paving supported accessibility, and the approximately 30-second wait was not the main reason the whole journey took longer than seven minutes.",

      fit:
        "cover"
    },


    /* --------------------------------------------------------
       07 — WOODLANDS AVENUE 9
       -------------------------------------------------------- */

    {
      at:
        [103.7892835,1.4446154],

      place:
        "Woodlands Avenue 9",

      time:
        "15:36",

      label:
        "07 / Construction",

      photo:
        "fieldwork/IMG20260904153604.webp",

      alt:
        "RTS Link construction beside Woodlands Avenue 9",

      title:
        "RTS Link works",

      caption:
        "Construction made the route less legible, although the pedestrian route remained passable.",

      analysis:
        "RTS Link works altered the visual character and legibility of Woodlands Avenue 9. Construction is therefore a plausible temporary reason why this route may differ from the intended long-term pedestrian connection.",

      fit:
        "cover"
    },


    /* --------------------------------------------------------
       08 — FIRST CLEAR VIEW
       -------------------------------------------------------- */

    {
      at:
        [103.7911192,1.4457529],

      place:
        "North Coast comes into view",

      time:
        "15:37",

      label:
        "08 / Landmark",

      photo:
        "fieldwork/IMG20260904153717.webp",

      alt:
        "First approach view of Woodlands North Coast",

      title:
        "First clear view",

      caption:
        "The buildings' scale helped with navigation once they became visible.",

      analysis:
        "The buildings themselves became the most useful landmark once visible from a distance. Their scale partly compensated for limited pedestrian wayfinding, although visibility is not the same as clear route guidance.",

      fit:
        "cover"
    },


    /* --------------------------------------------------------
       09 — ARRIVAL
       -------------------------------------------------------- */

    {
      at:
        [103.7912491,1.4470630],

      place:
        "Woodlands North Coast",

      time:
        "15:47",

      label:
        "09 / Arrival",

      photo:
        "fieldwork/IMG20260904154750.webp",

      alt:
        "1 and 7 North Coast seen together at arrival",

      title:
        "Arrival and built form · 15:47",

      caption:
        "At ground level, the difference between the two buildings was harder to read than in the 3D spatial-context map.",

      analysis:
        "This frame records arrival at Woodlands North Coast. Under the route and conditions I encountered, the observed journey from Exit 1 had taken about 16 minutes.",

      fit:
        "cover"
    }

  ];


  /* ==========================================================
     DOM
     ========================================================== */

  /*
     Keep the scroll track automatically synchronised with the
     number of evidence stages.
  */

  const beatTrack =
    story.querySelector(
      ".route-film-track"
    );


  const beatNodes =
    [...story.querySelectorAll(
      ".route-film-beat"
    )];


  while (
    beatNodes.length <
    STAGES.length
  ) {

    const beat =
      document.createElement(
        "div"
      );


    beat.className =
      "route-film-beat";


    beatTrack.appendChild(
      beat
    );


    beatNodes.push(
      beat
    );
  }


  while (
    beatNodes.length >
    STAGES.length
  ) {

    const beat =
      beatNodes.pop();


    beat.remove();
  }


  const beats =
    beatNodes;


  const sceneNode =
    document.getElementById(
      "routeFilmScene"
    );


  const loader =
    document.getElementById(
      "routeFilmLoader"
    );


  const dim =
    document.getElementById(
      "routeFilmDim"
    );


  const sheet =
    document.getElementById(
      "routeFilmSheet"
    );


  const photoButton =
    document.getElementById(
      "routeFilmPhoto"
    );


  const photo =
    document.getElementById(
      "routeFilmPhotoImage"
    );


  const copy =
    document.getElementById(
      "routeFilmCopy"
    );


  const copyIndex =
    document.getElementById(
      "routeFilmCopyIndex"
    );


  const copyTitle =
    document.getElementById(
      "routeFilmCopyTitle"
    );


  const copyCaption =
    document.getElementById(
      "routeFilmCopyCaption"
    );


  const copyAnalysis =
    document.getElementById(
      "routeFilmCopyAnalysis"
    );


  const hudIndex =
    document.getElementById(
      "routeFilmHudIndex"
    );


  const hudPlace =
    document.getElementById(
      "routeFilmHudPlace"
    );


  const hudTime =
    document.getElementById(
      "routeFilmHudTime"
    );


  const progressBar =
    document.getElementById(
      "routeFilmProgress"
    );


  /* ==========================================================
     MATH
     ========================================================== */

  const clamp =
    (value,min=0,max=1) =>
      Math.min(
        max,
        Math.max(
          min,
          value
        )
      );


  const mix =
    (a,b,t) =>
      a + (b-a)*t;


  const smooth =
    value => {

      const t =
        clamp(value);

      return (
        t*t*(3-2*t)
      );
    };


  function metres(
    a,
    b
  ) {

    const m =
      111320;


    const meanLat =
      (
        (
          a[1] +
          b[1]
        ) / 2
      ) *
      Math.PI/180;


    const dx =
      (
        b[0] -
        a[0]
      ) *
      m *
      Math.cos(
        meanLat
      );


    const dy =
      (
        b[1] -
        a[1]
      ) *
      m;


    return Math.hypot(
      dx,
      dy
    );
  }


  async function loadRoadSnappedRoute() {

    /*
       OSRM returns the actual mapped road geometry between our
       control points.

       This is used only to reconstruct the route visually.
    */

    const coordinates =
      ROUTE_CONTROL_POINTS
        .map(
          point =>
            `${point[0]},${point[1]}`
        )
        .join(";");


    const url =
      "https://router.project-osrm.org/route/v1/driving/" +
      coordinates +
      "?overview=full&geometries=geojson&steps=false";


    try {

      const response =
        await fetch(url);


      if (!response.ok)
        throw new Error(
          `OSRM ${response.status}`
        );


      const data =
        await response.json();


      const coordinates =
        data
          ?.routes
          ?.[0]
          ?.geometry
          ?.coordinates;


      if (
        !Array.isArray(coordinates) ||
        coordinates.length < 20
      ) {

        throw new Error(
          "Road router returned insufficient geometry."
        );
      }


      /*
         The router may return lots of very closely spaced points.
         Keep them — that is useful for the smooth video-like
         camera.
      */

      ROUTE =
        coordinates.map(
          point => [
            Number(point[0]),
            Number(point[1])
          ]
        );


      console.log(
        `✓ Road-snapped route loaded: ${ROUTE.length} points`
      );


      return true;


    } catch (error) {

      console.warn(
        "Road snapping unavailable; using smooth fallback route.",
        error
      );


      return false;
    }
  }


  function densify(
    route,
    spacing=3.2
  ) {

    const output = [];


    for (
      let i=0;
      i<route.length-1;
      i++
    ) {

      const a =
        route[i];


      const b =
        route[i+1];


      const d =
        metres(
          a,
          b
        );


      const count =
        Math.max(
          1,
          Math.ceil(
            d /
            spacing
          )
        );


      for (
        let j=0;
        j<count;
        j++
      ) {

        const t =
          j/count;


        output.push([
          mix(
            a[0],
            b[0],
            t
          ),

          mix(
            a[1],
            b[1],
            t
          )
        ]);
      }
    }


    output.push(
      route[
        route.length-1
      ]
    );


    return output;
  }


  let dense2D =
    densify(
      ROUTE
    );


  let route3D =
    dense2D.map(
      point => [
        point[0],
        point[1],
        18
      ]
    );


  let cumulative = [];

  let totalDistance = 1;


  function rebuildMetrics() {

    cumulative =
      [0];


    let total =
      0;


    for (
      let i=1;
      i<route3D.length;
      i++
    ) {

      total +=
        metres(
          route3D[i-1],
          route3D[i]
        );


      cumulative.push(
        total
      );
    }


    totalDistance =
      Math.max(
        total,
        1
      );
  }


  rebuildMetrics();


  function rebuildRouteGeometry() {

    dense2D =
      densify(
        ROUTE,
        2.6
      );


    route3D =
      dense2D.map(
        point => [
          point[0],
          point[1],
          18
        ]
      );


    rebuildMetrics();


    STAGES.forEach(
      stage => {

        stage.progress =
          nearestProgress(
            stage.at
          );
      }
    );
  }


  function pointAt(
    progress
  ) {

    const target =
      clamp(progress) *
      totalDistance;


    let i =
      1;


    while (
      i <
        cumulative.length-1 &&
      cumulative[i] <
        target
    ) {

      i++;
    }


    const before =
      cumulative[i-1];


    const after =
      cumulative[i];


    const t =
      clamp(
        (
          target -
          before
        ) /
        Math.max(
          .0001,
          after-before
        )
      );


    const a =
      route3D[i-1];


    const b =
      route3D[i];


    return [
      mix(a[0],b[0],t),
      mix(a[1],b[1],t),
      mix(a[2],b[2],t)
    ];
  }


  function bearing(
    a,
    b
  ) {

    const φ1 =
      a[1] *
      Math.PI/180;


    const φ2 =
      b[1] *
      Math.PI/180;


    const λ =
      (
        b[0] -
        a[0]
      ) *
      Math.PI/180;


    const y =
      Math.sin(λ) *
      Math.cos(φ2);


    const x =
      Math.cos(φ1) *
      Math.sin(φ2) -
      Math.sin(φ1) *
      Math.cos(φ2) *
      Math.cos(λ);


    return (
      Math.atan2(
        y,
        x
      ) *
      180/Math.PI +
      360
    ) % 360;
  }


  function nearestProgress(
    coordinate
  ) {

    let nearestIndex =
      0;


    let nearestDistance =
      Infinity;


    for (
      let i=0;
      i<dense2D.length;
      i++
    ) {

      const d =
        metres(
          dense2D[i],
          coordinate
        );


      if (
        d <
        nearestDistance
      ) {

        nearestDistance =
          d;


        nearestIndex =
          i;
      }
    }


    return (
      cumulative[
        nearestIndex
      ] /
      totalDistance
    );
  }


  /* stage points become exact route progress */

  STAGES.forEach(
    stage => {

      stage.progress =
        nearestProgress(
          stage.at
        );
    }
  );


  /* ==========================================================
     STORY STATE
     ========================================================== */

  let activeStage =
    -1;


  let targetRouteProgress =
    0;


  let renderedRouteProgress =
    0;


  let smoothedHeading =
    null;


  let sceneView =
    null;


  let sceneReady =
    false;


  let scheduled =
    false;


  let lastCameraFrame =
    0;


  function lerpAngle(
    from,
    to,
    amount
  ) {

    if (
      from === null
    ) {
      return to;
    }


    let delta =
      (
        (
          to -
          from +
          540
        ) % 360
      ) -
      180;


    return (
      from +
      delta *
      amount +
      360
    ) % 360;
  }


  /* ==========================================================
     SCROLL POSITION
     ========================================================== */

  function stageAtViewport() {

    const marker =
      innerHeight *
      .5;


    for (
      let i=0;
      i<beats.length;
      i++
    ) {

      const rect =
        beats[i]
          .getBoundingClientRect();


      if (
        rect.top <= marker &&
        rect.bottom > marker
      ) {

        return i;
      }
    }


    return (
      story
        .getBoundingClientRect()
        .top >
      marker
    )
      ? 0
      : STAGES.length-1;
  }


  function localProgress(
    index
  ) {

    const marker =
      innerHeight *
      .5;


    const rect =
      beats[index]
        .getBoundingClientRect();


    return clamp(
      (
        marker -
        rect.top
      ) /
      Math.max(
        1,
        rect.height
      )
    );
  }


  function setStage(
    index
  ) {

    if (
      activeStage === index
    ) {
      return;
    }


    activeStage =
      index;


    const stage =
      STAGES[index];


    photo.src =
      stage.photo;


    photo.alt =
      stage.alt;


    photoButton
      .classList
      .toggle(
        "contain",
        stage.fit ===
          "contain"
      );


    copyIndex.textContent =
      stage.label;


    copyTitle.textContent =
      stage.title;


    copyCaption.textContent =
      stage.caption;


    copyAnalysis.textContent =
      stage.analysis;


    hudIndex.textContent =
      `${String(index+1).padStart(2,"0")} / ${String(STAGES.length).padStart(2,"0")}`;


    hudTime.textContent =
      stage.time;
  }


  /* ==========================================================
     EVIDENCE

     00–68%:
       camera walks

     68–76%:
       photo rises from below

     76–92%:
       photo LOCKS in middle
       text slowly scrolls underneath

     92–100%:
       whole evidence sheet exits upwards
     ========================================================== */

  function renderEvidence(
    local
  ) {

    /*
       VERIFIED ROUTE / SLOW EVIDENCE TIMING

       00–53%  hidden
               camera walking + settle period

       53–61%  photograph rises

       61–71%  full-screen photograph holds

       71–80%  photo retreats LEFT;
               explanation appears RIGHT

       80–95%  split composition LOCKS for reading

       95–100% entire composition exits upward
    */


    if (
      local < .53
    ) {

      sheet.style.opacity =
        "0";


      sheet.style.transform =
        "translate3d(-50%,110vh,0)";


      sheet.style.setProperty(
        "--evidence-photo-width",
        "100%"
      );


      sheet.style.setProperty(
        "--evidence-photo-height",
        "86vh"
      );


      sheet.style.setProperty(
        "--evidence-copy-opacity",
        "0"
      );


      sheet.style.setProperty(
        "--evidence-copy-x",
        "5vw"
      );


      sheet.classList.remove(
        "split",
        "is-live"
      );


      dim.style.opacity =
        "0";


      return;
    }


    /*
       PHOTO RISES
    */

    if (
      local < .61
    ) {

      const p =
        smooth(
          (
            local -
            .53
          ) /
          .08
        );


      sheet.style.opacity =
        p.toFixed(3);


      sheet.style.transform =
        `translate3d(-50%,${mix(
          110,
          7,
          p
        ).toFixed(2)}vh,0)`;


      sheet.style.setProperty(
        "--evidence-photo-width",
        "100%"
      );


      sheet.style.setProperty(
        "--evidence-photo-height",
        "86vh"
      );


      sheet.style.setProperty(
        "--evidence-copy-opacity",
        "0"
      );


      sheet.classList.remove(
        "split"
      );


      dim.style.opacity =
        (
          p *
          .50
        ).toFixed(3);


      return;
    }


    /*
       LARGE PHOTO HOLDS
    */

    if (
      local < .71
    ) {

      sheet.style.opacity =
        "1";


      sheet.style.transform =
        "translate3d(-50%,7vh,0)";


      sheet.style.setProperty(
        "--evidence-photo-width",
        "100%"
      );


      sheet.style.setProperty(
        "--evidence-photo-height",
        "86vh"
      );


      sheet.style.setProperty(
        "--evidence-copy-opacity",
        "0"
      );


      sheet.classList.remove(
        "split"
      );


      sheet.classList.add(
        "is-live"
      );


      dim.style.opacity =
        ".50";


      return;
    }


    /*
       PHOTO SHRINKS HORIZONTALLY ONLY.
       HEIGHT / VERTICAL POSITION DO NOT CHANGE.
    */

    if (
      local < .80
    ) {

      const p =
        smooth(
          (
            local -
            .71
          ) /
          .09
        );


      sheet.style.opacity =
        "1";


      sheet.style.transform =
        "translate3d(-50%,7vh,0)";


      sheet.style.setProperty(
        "--evidence-photo-width",
        `${mix(
          100,
          57,
          p
        ).toFixed(2)}%`
      );


      sheet.style.setProperty(
        "--evidence-photo-height",
        "86vh"
      );


      const text =
        smooth(
          clamp(
            (
              p -
              .10
            ) /
            .72
          )
        );


      sheet.style.setProperty(
        "--evidence-copy-opacity",
        text.toFixed(3)
      );


      sheet.style.setProperty(
        "--evidence-copy-x",
        `${mix(
          5,
          0,
          text
        ).toFixed(2)}vw`
      );


      sheet.classList.add(
        "split",
        "is-live"
      );


      dim.style.opacity =
        ".50";


      return;
    }


    /*
       LONG LOCK.

       Scroll does NOT move the photo or text during this
       entire interval.
    */

    if (
      local < .95
    ) {

      sheet.style.opacity =
        "1";


      sheet.style.transform =
        "translate3d(-50%,7vh,0)";


      sheet.style.setProperty(
        "--evidence-photo-width",
        "57%"
      );


      sheet.style.setProperty(
        "--evidence-photo-height",
        "86vh"
      );


      sheet.style.setProperty(
        "--evidence-copy-opacity",
        "1"
      );


      sheet.style.setProperty(
        "--evidence-copy-x",
        "0vw"
      );


      sheet.classList.add(
        "split",
        "is-live"
      );


      dim.style.opacity =
        ".50";


      return;
    }


    /*
       BOTH EXIT UPWARD TOGETHER.
    */

    const exit =
      smooth(
        (
          local -
          .95
        ) /
        .05
      );


    sheet.style.opacity =
      (
        1 -
        exit *
        .12
      ).toFixed(3);


    sheet.style.transform =
      `translate3d(-50%,${mix(
        7,
        -130,
        exit
      ).toFixed(2)}vh,0)`;


    sheet.style.setProperty(
      "--evidence-photo-width",
      "57%"
    );


    sheet.style.setProperty(
      "--evidence-photo-height",
      "86vh"
    );


    sheet.style.setProperty(
      "--evidence-copy-opacity",
      "1"
    );


    sheet.style.setProperty(
      "--evidence-copy-x",
      "0vw"
    );


    sheet.classList.add(
      "split"
    );


    dim.style.opacity =
      (
        .50 *
        (
          1 -
          exit
        )
      ).toFixed(3);
  }

  function renderScroll() {

    scheduled =
      false;


    const index =
      stageAtViewport();


    setStage(
      index
    );


    const local =
      localProgress(
        index
      );


    const stage =
      STAGES[
        index
      ];


    const previousProgress =
      index === 0
        ? stage.progress
        : STAGES[
            index - 1
          ].progress;


    /*
       First two evidence items are at the SAME MRT position.
    */

    if (
      stage.startEvidence
    ) {

      targetRouteProgress =
        stage.progress;


    } else {

      /*
         Camera TARGET reaches the evidence location at 45%.

         Evidence itself doesn't begin until 53%.

         The difference is an intentional camera-settle buffer.
      */

      const walking =
        smooth(
          clamp(
            local /
            .45
          )
        );


      targetRouteProgress =
        mix(
          previousProgress,
          stage.progress,
          walking
        );
    }


    /*
       HUD
    */

    if (
      stage.startEvidence
    ) {

      hudPlace.textContent =
        stage.place;


    } else if (
      local < .53
    ) {

      hudPlace.textContent =
        `Walking → ${stage.place}`;


    } else {

      hudPlace.textContent =
        stage.place;
    }


    /*
       Starting station-map / bicycle stages have no journey
       between them, so use their full section for evidence.

       All later evidence follows normal timing.
    */

    const evidenceLocal =
      stage.startEvidence
        ? .53 + local * .47
        : local;


    renderEvidence(
      evidenceLocal
    );


    progressBar.style.width =
      `${(
        targetRouteProgress *
        100
      ).toFixed(2)}%`;
  }

  function scheduleScroll() {

    if (scheduled)
      return;


    scheduled =
      true;


    requestAnimationFrame(
      renderScroll
    );
  }


  addEventListener(
    "scroll",
    scheduleScroll,
    {
      passive:true
    }
  );


  addEventListener(
    "resize",
    scheduleScroll,
    {
      passive:true
    }
  );


  /* ==========================================================
     CONTINUOUS CAMERA LOOP

     This is what makes it feel like scrubbed VIDEO instead of
     changing slides.

     Scroll only changes TARGET progress.

     Camera continuously eases towards it.
     ========================================================== */

  function cameraLoop(
    timestamp
  ) {

    requestAnimationFrame(
      cameraLoop
    );


    if (
      !sceneReady ||
      !sceneView
    ) {
      return;
    }


    /*
       ~30fps camera update is much lighter on ArcGIS than
       rebuilding the camera on every browser scroll event.
    */

    if (
      timestamp -
      lastCameraFrame <
      32
    ) {
      return;
    }


    lastCameraFrame =
      timestamp;


    const delta =
      targetRouteProgress -
      renderedRouteProgress;


    renderedRouteProgress +=
      delta *
      .16;


    if (
      Math.abs(delta) <
      .00001
    ) {

      renderedRouteProgress =
        targetRouteProgress;
    }


    const position =
      pointAt(
        renderedRouteProgress
      );


    /*
       Look well ahead along the road.

       This smooths the turn rather than snapping the camera
       left/right at every raw route vertex.
    */

    const aheadDistance =
      14 /
      totalDistance;


    const ahead =
      pointAt(
        Math.min(
          1,
          renderedRouteProgress +
          aheadDistance
        )
      );


    const targetHeading =
      bearing(
        position,
        ahead
      );


    smoothedHeading =
      lerpAngle(
        smoothedHeading,
        targetHeading,
        .16
      );


    /*
       Extremely small head movement.
       Enough to make the camera feel alive, not enough to make
       it nauseating.
    */

    const travelled =
      renderedRouteProgress *
      totalDistance;


    const headBob =
      Math.sin(
        travelled *
        Math.PI *
        2 /
        1.45
      ) *
      .025;


    sceneView.camera = {

      position: {

        x:
          position[0],

        y:
          position[1],

        z:
          position[2] +
          1.78 +
          headBob,

        spatialReference: {
          wkid:4326
        }
      },


      heading:
        smoothedHeading,


      /*
         ~90 = horizontal.
         Slight downward angle makes the route visible.
      */

      tilt:
        87.8,


      fov:
        74
    };
  }


  requestAnimationFrame(
    cameraLoop
  );


  /* ==========================================================
     LIGHTBOX
     ========================================================== */

  photoButton.addEventListener(
    "click",
    () => {

      const stage =
        STAGES[
          activeStage
        ];


      const dialog =
        document.getElementById(
          "photoDialog"
        );


      if (
        !stage ||
        !dialog
      ) {
        return;
      }


      const image =
        document.getElementById(
          "photoDialogImage"
        );


      image.src =
        stage.photo;


      image.alt =
        stage.alt;


      document.getElementById(
        "photoDialogTitle"
      ).textContent =
        stage.title;


      document.getElementById(
        "photoDialogCaption"
      ).textContent =
        stage.caption;


      document.getElementById(
        "photoDialogType"
      ).textContent =
        "Accessibility · Primary field evidence";


      document.getElementById(
        "photoDialogContext"
      ).textContent =
        stage.analysis;


      const annotations =
        document.getElementById(
          "photoAnnotations"
        );


      const annotationKey =
        document.getElementById(
          "photoAnnotationKey"
        );


      const toggle =
        document.getElementById(
          "annotationToggle"
        );


      if (annotations)
        annotations.innerHTML = "";


      if (annotationKey)
        annotationKey.innerHTML = "";


      if (toggle)
        toggle.hidden = true;


      document.body
        .classList
        .add(
          "modal-open"
        );


      dialog.showModal();
    }
  );


  /* ==========================================================
     ARCGIS 3D
     ========================================================== */

  async function initialiseScene() {

    if (
      typeof window.require !==
      "function"
    ) {
      return;
    }


    /*
       First obtain the road centreline.
       Only after that do we create the visible 3D path.
    */

    rebuildRouteGeometry();


    window.require(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/SceneLayer",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/geometry/Polyline"
      ],

      (
        Map,
        SceneView,
        SceneLayer,
        GraphicsLayer,
        Graphic,
        Polyline
      ) => {

        const buildings =
          new SceneLayer({

            url:
              "https://basemaps3d.arcgis.com/arcgis/rest/services/Open3D_Buildings_v1/SceneServer",

            opacity:
              .58,

            renderer: {

              type:
                "simple",

              symbol: {

                type:
                  "mesh-3d",

                symbolLayers: [{

                  type:
                    "fill",

                  material: {
                    color:
                      "#e8e9e4",
                    colorMixMode:
                      "replace"
                  },

                  edges: {
                    type:
                      "solid",
                    color:
                      "#adb4aa",
                    size:
                      .35
                  }
                }]
              }
            }
          });


        const northCoast =
          new SceneLayer({

            url:
              "https://tiles-ap1.arcgis.com/WgaYJgqkRJkZ2L7E/arcgis/rest/services/SIN_07598001_BUA_WoodlandsNorthCoast_V2/SceneServer",

            opacity:
              .76,

            renderer: {

              type:
                "simple",

              symbol: {

                type:
                  "mesh-3d",

                symbolLayers: [{

                  type:
                    "fill",

                  material: {
                    color:
                      "#d8efa0",
                    colorMixMode:
                      "tint"
                  },

                  edges: {
                    type:
                      "solid",
                    color:
                      "#a6d246",
                    size:
                      .45
                  }
                }]
              }
            }
          });


        const routeLayer =
          new GraphicsLayer({

            elevationInfo: {
              mode:
                "relative-to-ground",

              offset:
                .10
            }
          });


        routeLayer.add(
          new Graphic({

            geometry:
              new Polyline({

                paths:
                  [ROUTE],

                spatialReference: {
                  wkid:4326
                }
              }),

            symbol: {

              type:
                "simple-line",

              color:
                [187,244,53,.90],

              width:
                1.8
            }
          })
        );


        const map =
          new Map({

            basemap:
              "satellite",

            ground:
              "world-elevation",

            layers: [
              buildings,
              northCoast,
              routeLayer
            ]
          });


        const start =
          route3D[0];


        sceneView =
          new SceneView({

            container:
              sceneNode,

            map,

            viewingMode:
              "global",

            qualityProfile:
              "low",

            popupEnabled:
              false,

            camera: {

              position: {
                x:start[0],
                y:start[1],
                z:start[2]+1.78,
                spatialReference:{
                  wkid:4326
                }
              },

              heading:
                180,

              tilt:
                87.8,

              fov:
                74
            },

            constraints: {

              collision: {
                enabled:false
              }
            },

            environment: {

              background: {
                type:"color",
                color:[
                  221,
                  225,
                  216,
                  1
                ]
              },

              starsEnabled:
                false,

              atmosphereEnabled:
                false,

              lighting: {

                type:
                  "sun",

                date:
                  new Date(
                    Date.UTC(
                      2026,
                      8,
                      4,
                      8,
                      0
                    )
                  ),

                directShadowsEnabled:
                  false,

                ambientOcclusionEnabled:
                  false,

                cameraTrackingEnabled:
                  false
              }
            }
          });


        sceneView.ui.components =
          ["attribution"];


        sceneView
          .when()
          .then(
            async () => {

              /*
                 Query terrain ONCE.

                 After this, camera movement is just interpolation
                 through cached coordinates.
              */

              try {

                await map.ground.load();


                const geometry =
                  new Polyline({

                    paths:
                      [dense2D],

                    spatialReference: {
                      wkid:4326
                    }
                  });


                const result =
                  await map.ground
                    .queryElevation(
                      geometry,
                      {
                        demResolution:
                          "finest-contiguous"
                      }
                    );


                const path =
                  result
                    ?.geometry
                    ?.paths
                    ?.[0];


                if (
                  path &&
                  path.length ===
                    dense2D.length
                ) {

                  route3D =
                    path.map(
                      point => [
                        point[0],
                        point[1],
                        Number.isFinite(
                          point[2]
                        )
                          ? point[2]
                          : 18
                      ]
                    );


                  rebuildMetrics();


                  /*
                     Recalculate photo anchors now that route
                     metrics are final.
                  */

                  STAGES.forEach(
                    stage => {

                      stage.progress =
                        nearestProgress(
                          stage.at
                        );
                    }
                  );
                }


              } catch (
                error
              ) {

                console.warn(
                  "Terrain sampling failed:",
                  error
                );
              }


              sceneReady =
                true;


              renderedRouteProgress =
                STAGES[0]
                  .progress;


              targetRouteProgress =
                STAGES[0]
                  .progress;


              sceneNode
                .classList
                .add(
                  "ready"
                );


              loader
                .classList
                .add(
                  "hidden"
                );


              renderScroll();
            }
          )
          .catch(
            error => {

              console.error(
                error
              );


              loader.innerHTML =
                "<span>3D route could not load</span>";
            }
          );
      }
    );
  }


  function loadArcGIS() {

    if (
      typeof window.require ===
      "function"
    ) {

      initialiseScene();

      return;
    }


    if (
      !document.getElementById(
        "routeFilmArcgisTheme"
      )
    ) {

      const css =
        document.createElement(
          "link"
        );


      css.id =
        "routeFilmArcgisTheme";


      css.rel =
        "stylesheet";


      css.href =
        "https://js.arcgis.com/4.33/esri/themes/light/main.css";


      document.head
        .appendChild(
          css
        );
    }


    const existing =
      document.getElementById(
        "routeFilmArcgisSDK"
      );


    if (existing) {

      existing.addEventListener(
        "load",
        initialiseScene,
        {
          once:true
        }
      );


      return;
    }


    const script =
      document.createElement(
        "script"
      );


    script.id =
      "routeFilmArcgisSDK";


    script.src =
      "https://js.arcgis.com/4.33/";


    script.async =
      true;


    script.onload =
      initialiseScene;


    script.onerror =
      () => {

        loader.innerHTML =
          "<span>ArcGIS 3D could not load</span>";
      };


    document.head
      .appendChild(
        script
      );
  }


  /* Only initialise as Accessibility approaches */

  const observer =
    new IntersectionObserver(
      entries => {

        if (
          !entries.some(
            item =>
              item.isIntersecting
          )
        ) {
          return;
        }


        observer.disconnect();


        loadArcGIS();

      },
      {
        rootMargin:
          "100% 0px"
      }
    );


  observer.observe(
    story
  );


  /* Preload own evidence photographs */

  STAGES.forEach(
    stage => {

      const image =
        new Image();


      image.src =
        stage.photo;
    }
  );


  setStage(0);

  renderScroll();


  /* ==========================================================
     ROUTE EVIDENCE FILMSTRIP V1

     Secondary evidence index for quick teacher access.

     The 3D journey remains the PRIMARY Accessibility section.
     ========================================================== */

  function buildRouteEvidenceIndex() {

    if (
      document.querySelector(
        ".route-evidence-index"
      )
    ) {
      return;
    }


    const chapter =
      story.closest(
        ".route-film-chapter"
      );


    const ending =
      chapter?.querySelector(
        ".route-film-end"
      );


    if (
      !chapter ||
      !ending
    ) {
      return;
    }


    const section =
      document.createElement(
        "section"
      );


    section.className =
      "route-evidence-index";


    section.setAttribute(
      "aria-label",
      "Route evidence index"
    );


    const inner =
      document.createElement(
        "div"
      );


    inner.className =
      "route-evidence-index-inner";


    inner.innerHTML = `
      <div class="route-evidence-index-head">

        <div class="route-evidence-index-title">

          <span>
            ROUTE EVIDENCE INDEX
          </span>

          <strong>
            Field journey · 15:26–15:47
          </strong>

        </div>


        <div class="route-evidence-controls">

          <button
            type="button"
            class="route-evidence-arrow route-evidence-prev"
            aria-label="Previous evidence">
            ←
          </button>

          <button
            type="button"
            class="route-evidence-arrow route-evidence-next"
            aria-label="Next evidence">
            →
          </button>

        </div>

      </div>


      <div class="route-evidence-window">

        <div
          class="route-evidence-track"
          role="list">
        </div>

      </div>


      <p class="route-evidence-index-note">
        Quick reference only — the evidence and analysis above
        remain visible in the main scroll journey. Select a frame
        to inspect it again.
      </p>
    `;


    section.appendChild(
      inner
    );


    ending.insertAdjacentElement(
      "afterend",
      section
    );


    const track =
      section.querySelector(
        ".route-evidence-track"
      );


    STAGES.forEach(
      (
        stage,
        index
      ) => {

        const frame =
          document.createElement(
            "button"
          );


        frame.type =
          "button";


        frame.className =
          "route-evidence-frame";


        frame.setAttribute(
          "role",
          "listitem"
        );


        frame.setAttribute(
          "aria-label",
          `Open evidence ${index+1}: ${stage.title}`
        );


        frame.innerHTML = `
          <div class="route-evidence-frame-image">

            <img
              src="${stage.photo}"
              alt="">

            <span class="route-evidence-frame-number">
              ${String(index+1).padStart(2,"0")}
            </span>

          </div>

          <div class="route-evidence-frame-copy">

            <strong>
              ${stage.title}
            </strong>

            <span>
              ${stage.time}
            </span>

          </div>
        `;


        frame.addEventListener(
          "click",
          () => {

            const dialog =
              document.getElementById(
                "photoDialog"
              );


            if (!dialog)
              return;


            const image =
              document.getElementById(
                "photoDialogImage"
              );


            image.src =
              stage.photo;


            image.alt =
              stage.alt;


            document.getElementById(
              "photoDialogTitle"
            ).textContent =
              stage.title;


            document.getElementById(
              "photoDialogCaption"
            ).textContent =
              stage.caption;


            document.getElementById(
              "photoDialogType"
            ).textContent =
              "Accessibility · Primary field evidence";


            document.getElementById(
              "photoDialogContext"
            ).textContent =
              stage.analysis;


            /*
               Filmstrip is a clean evidence index rather than
               an annotation view.
            */

            const annotations =
              document.getElementById(
                "photoAnnotations"
              );


            const annotationKey =
              document.getElementById(
                "photoAnnotationKey"
              );


            const toggle =
              document.getElementById(
                "annotationToggle"
              );


            if (annotations)
              annotations.innerHTML = "";


            if (annotationKey)
              annotationKey.innerHTML = "";


            if (toggle)
              toggle.hidden = true;


            document.body
              .classList
              .add(
                "modal-open"
              );


            dialog.showModal();
          }
        );


        track.appendChild(
          frame
        );
      }
    );


    const amount =
      () =>
        Math.max(
          220,
          track.clientWidth *
          .72
        );


    section
      .querySelector(
        ".route-evidence-prev"
      )
      .addEventListener(
        "click",
        () => {

          track.scrollBy({
            left:
              -amount(),

            behavior:
              "smooth"
          });
        }
      );


    section
      .querySelector(
        ".route-evidence-next"
      )
      .addEventListener(
        "click",
        () => {

          track.scrollBy({
            left:
              amount(),

            behavior:
              "smooth"
          });
        }
      );
  }


  buildRouteEvidenceIndex();


})();
