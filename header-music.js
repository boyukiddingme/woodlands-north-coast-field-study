(() => {
  'use strict';
  const root = document.getElementById('headerMusic');
  if (!root) return;
  const audio = document.getElementById('backgroundMusic');
  const choice = document.getElementById('musicChoice');
  const title = document.getElementById('musicTitle');
  const play = document.getElementById('musicPlay');
  const panelPlay = document.getElementById('musicPanelPlay');
  const panel = document.getElementById('musicPanel');
  const list = document.getElementById('musicList');
  const status = document.getElementById('musicStatus');
  const volume = document.getElementById('musicVolume');
  let tracks = [], index = 0, wanted = false, operation = 0, switching = false;

  /*
    Louder default than the original player.
    BOOST applies through Web Audio after first interaction.
  */
  const BOOST = 2.2;

  let level = .80, envelope = 1, fadeTimer, context, gain, compressor;
  try { const saved = sessionStorage.getItem('wnc-music-volume-v3'); if (saved !== null && Number.isFinite(+saved)) level = Math.max(0, Math.min(1, +saved)); } catch {}
  volume.value = String(Math.round(level * 100));
  audio.volume = level;
  function setVolume() {
    const value = Math.max(
      0,
      Math.min(1, level * envelope)
    );

    /*
      HTMLMediaElement volume stops at 1.0.
      Web Audio gain can go beyond that.
    */
    if (gain) {
      gain.gain.value = value * BOOST;
    } else {
      audio.volume = value;
    }
  }
  function unlockAudio() {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!context && AudioContext) {

      try {

        context =
          new AudioContext();

        gain =
          context.createGain();

        compressor =
          context.createDynamicsCompressor();

        /*
          Control only the strongest peaks.
          The overall signal can still be substantially louder.
        */
        compressor.threshold.value = -4;
        compressor.knee.value = 4;
        compressor.ratio.value = 10;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.22;

        const source =
          context.createMediaElementSource(audio);

        source.connect(gain);
        gain.connect(compressor);
        compressor.connect(context.destination);

        /*
          Media element itself stays at full scale once
          Web Audio owns loudness.
        */
        audio.volume = 1;

        setVolume();

        console.log(
          "✓ enhanced music audio path active"
        );

      }

      catch (error) {

        console.warn(
          "Enhanced audio path unavailable:",
          error
        );

        gain = null;
        compressor = null;

      }

    }

    if (context?.state === "suspended") {
      context.resume().catch(() => {});
    }

  }
  function fadeTo(target, seconds, token, done = () => {}) {
    clearInterval(fadeTimer);
    const from = envelope, started = performance.now();
    fadeTimer = setInterval(() => {
      if (token !== operation) { clearInterval(fadeTimer); return; }
      const progress = Math.min(1, (performance.now() - started) / (seconds * 1000));
      envelope = from + (target - from) * progress; setVolume();
      if (progress === 1) { clearInterval(fadeTimer); done(); }
    }, 40);
  }
  function render() {
    const track = tracks[index]; if (!track) return;
    title.replaceChildren(document.createTextNode(track.title + ' '));
    const composer = document.createElement('span'); composer.className = 'music-composer'; composer.textContent = '— ' + track.composer; title.append(composer);
    choice.setAttribute('aria-label', 'Choose music: ' + track.title + ' — ' + track.composer);
    play.setAttribute('aria-label', wanted ? 'Pause background music' : 'Play background music');
    panelPlay.setAttribute('aria-label', wanted ? 'Pause background music' : 'Play background music'); panelPlay.textContent = wanted ? 'Pause' : 'Play';
    play.innerHTML = wanted ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h3v12H3zM10 2h3v12h-3z"/></svg>' : '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2 14 8 4 14Z"/></svg>';
    Array.from(list.children).forEach((li, i) => li.firstElementChild.setAttribute('aria-current', String(i === index)));
  }
  function fail(message) { wanted = false; switching = false; ++operation; clearInterval(fadeTimer); audio.pause(); envelope = 1; setVolume(); render(); status.textContent = message; }
  function loadTrack() { audio.src = tracks[index].src; audio.load(); }
  function start(token) {
    envelope = 0; setVolume(); status.textContent = 'Loading · ' + tracks[index].title;
    audio.play().then(() => {
      if (token !== operation || !wanted) return;
      status.textContent = 'Playing · ' + tracks[index].title;
      fadeTo(1, 1.5, token);
    }).catch(error => { if (token === operation && error.name !== 'AbortError') fail('Unable to play · try Play again or choose another track'); });
  }
  function select(next) {
    if (!tracks.length) return;
    const token = ++operation;
    clearInterval(fadeTimer); switching = true;
    const proceed = () => {
      if (token !== operation) return;
      audio.pause(); index = (next + tracks.length) % tracks.length; loadTrack(); render();
      if (wanted) start(token); else { envelope = 1; setVolume(); status.textContent = 'Paused · press Play to listen'; }
      switching = false;
    };
    if (wanted && !audio.paused) fadeTo(0, 1.2, token, proceed); else proceed();
  }
  function toggle() {
    if (!tracks.length) return;
    if (wanted) {
      wanted = false; ++operation; switching = false; clearInterval(fadeTimer); audio.pause(); envelope = 1; setVolume(); status.textContent = 'Paused · ' + tracks[index].title; render();
    } else {
      wanted = true; const token = ++operation; unlockAudio();
      if (!audio.getAttribute('src')) loadTrack();
      if (audio.ended || (tracks[index].endTime !== null && audio.currentTime >= tracks[index].endTime)) audio.currentTime = tracks[index].startTime;
      render(); start(token);
    }
  }
  /*
    ----------------------------------------------------------
    FIRST-INTERACTION AUTOPLAY FALLBACK

    If Chromium rejects audible autoplay, the visitor's first
    click/tap/key press anywhere on the page invokes the SAME
    toggle() function used by the real Play button.

    This is deliberately inside header-music.js so it has direct
    access to wanted, tracks, toggle(), loadTrack(), etc.
    ----------------------------------------------------------
  */

  let firstInteractionComplete = false;


  function removeFirstInteractionListeners() {

    document.removeEventListener(
      'pointerdown',
      startFromFirstInteraction,
      true
    );

    document.removeEventListener(
      'keydown',
      startFromFirstInteraction,
      true
    );

  }


  function startFromFirstInteraction(event) {

    if (
      firstInteractionComplete ||
      !tracks.length
    ) {
      return;
    }


    const target =
      event.target instanceof Element
        ? event.target
        : null;


    /*
      If the visitor actually presses one of the player's
      own Play buttons, let the existing click handler call
      toggle() normally.

      We only unlock the AudioContext here.
    */
    if (
      target?.closest(
        '#musicPlay, #musicPanelPlay'
      )
    ) {

      firstInteractionComplete = true;
      removeFirstInteractionListeners();

      unlockAudio();

      return;
    }


    /*
      IMPORTANT:

      Cancel ANY pending zero-click autoplay operation.

      That attempt may have set wanted=true while Chromium was
      still deciding whether to reject it. That was causing the
      first click to inherit the wrong player state.
    */

    const token = ++operation;

    clearInterval(fadeTimer);

    switching = false;
    wanted = true;


    /*
      Unlock Web Audio during the genuine pointer event.
    */

    unlockAudio();


    /*
      The playlist already exists at this point, but the actual
      MP3 may not yet have been assigned.
    */

    if (!audio.getAttribute('src')) {
      loadTrack();
    }


    if (
      audio.ended ||
      (
        tracks[index].endTime !== null &&
        audio.currentTime >= tracks[index].endTime
      )
    ) {
      audio.currentTime =
        tracks[index].startTime;
    }


    /*
      Update UI FIRST.

      ▶ becomes ❚❚ on this exact same interaction.
    */

    render();


    /*
      Start quietly then fade to the selected volume.
    */

    envelope = 0;
    setVolume();


    /*
      DIRECT audio.play() while browser user activation is
      definitely still active.

      This is the exact mechanism your Console test proved works.
    */

    audio.play().then(() => {

      if (
        token !== operation ||
        !wanted
      ) {
        return;
      }


      status.textContent =
        'Playing · ' +
        tracks[index].title;


      fadeTo(
        1,
        0.8,
        token
      );


      firstInteractionComplete = true;
      removeFirstInteractionListeners();


      console.log(
        '✓ DIRECT FIRST CLICK: audio + UI synchronised'
      );

    }).catch(error => {

      if (token !== operation) {
        return;
      }


      wanted = false;

      envelope = 1;
      setVolume();

      render();


      status.textContent =
        'Unable to start · press Play';


      console.warn(
        'Direct first-click playback failed:',
        error
      );

    });

  }


  document.addEventListener(
    'pointerdown',
    startFromFirstInteraction,
    true
  );


  document.addEventListener(
    'keydown',
    startFromFirstInteraction,
    true
  );


  audio.addEventListener('loadedmetadata', () => { if (tracks[index]) audio.currentTime = tracks[index].startTime; });
  audio.addEventListener('timeupdate', () => {
    if (!wanted || switching || !tracks.length) return;
    const end = tracks[index].endTime ?? audio.duration;
    if (Number.isFinite(end) && audio.currentTime >= end - 1.2) select(index + 1);
  });
  audio.addEventListener('ended', () => { if (wanted && !switching) select(index + 1); });
  audio.addEventListener('error', () => fail('Recording unavailable · choose another track'));
  choice.addEventListener('click', () => { panel.hidden = !panel.hidden; choice.setAttribute('aria-expanded', String(!panel.hidden)); });
  document.addEventListener('click', event => { if (!root.contains(event.target)) { panel.hidden = true; choice.setAttribute('aria-expanded', 'false'); } });
  root.addEventListener('keydown', event => { if (event.key === 'Escape') { panel.hidden = true; choice.setAttribute('aria-expanded', 'false'); choice.focus(); } });
  play.addEventListener('click', toggle); panelPlay.addEventListener('click', toggle);
  document.getElementById('musicPrevious').addEventListener('click', () => select(index - 1));
  document.getElementById('musicNext').addEventListener('click', () => select(index + 1));
  volume.addEventListener('input', () => { level = Number(volume.value) / 100; setVolume(); try { sessionStorage.setItem('wnc-music-volume-v3', String(level)); } catch {} });
  window.addEventListener('pagehide', () => { wanted = false; ++operation; clearInterval(fadeTimer); audio.pause(); render(); });
  fetch('/audio/playlist.json').then(response => { if (!response.ok) throw Error('Playlist unavailable'); return response.json(); }).then(data => {
    tracks = data;
    tracks.forEach((track, i) => {
      const li = document.createElement('li'), button = document.createElement('button'), number = document.createElement('span'), text = document.createElement('span'), composer = document.createElement('small');
      button.type = 'button'; number.className = 'music-number'; number.textContent = String(i + 1).padStart(2, '0'); text.textContent = track.title; composer.textContent = track.composer; text.append(composer); button.append(number, text); li.append(button); list.append(li);
      button.addEventListener('click', () => select(i));
    });
    render();


    /*
      --------------------------------------------------------
      AUDIBLE AUTOPLAY ATTEMPT

      Browsers may reject this. If they do, reset cleanly and
      leave the first-interaction fallback armed.
      --------------------------------------------------------
    */

    const autoplayToken =
      ++operation;

    wanted = true;

    if (!audio.getAttribute('src')) {
      loadTrack();
    }

    envelope = 1;
    setVolume();
    render();


    audio.play().then(() => {

      if (
        autoplayToken !== operation ||
        !wanted
      ) {
        return;
      }

      status.textContent =
        'Playing · ' +
        tracks[index].title;

      console.log(
        '✓ browser allowed audible autoplay'
      );

    }).catch(() => {

      if (autoplayToken !== operation) {
        return;
      }

      wanted = false;

      audio.pause();

      envelope = 1;
      setVolume();

      render();

      status.textContent =
        'Paused · starts on first interaction';

      console.log(
        'Autoplay blocked — first-interaction start armed'
      );

    });


  }).catch(() => { play.disabled = true; panelPlay.disabled = true; status.textContent = 'Music is currently unavailable'; });
})();
