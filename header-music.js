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
  let level = .25, envelope = 1, fadeTimer, context, gain;
  try { const saved = sessionStorage.getItem('wnc-music-volume'); if (saved !== null && Number.isFinite(+saved)) level = Math.max(0, Math.min(1, +saved)); } catch {}
  volume.value = String(Math.round(level * 100));
  audio.volume = level;
  function setVolume() { const value = Math.max(0, Math.min(1, level * envelope)); if (gain) gain.gain.value = value; else audio.volume = value; }
  function unlockAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!context && AudioContext) {
      try { context = new AudioContext(); gain = context.createGain(); gain.gain.value = 0; context.createMediaElementSource(audio).connect(gain); gain.connect(context.destination); audio.volume = 1; setVolume(); } catch { gain = null; }
    }
    if (context?.state === 'suspended') context.resume().catch(() => {});
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
  volume.addEventListener('input', () => { level = Number(volume.value) / 100; setVolume(); try { sessionStorage.setItem('wnc-music-volume', String(level)); } catch {} });
  window.addEventListener('pagehide', () => { wanted = false; ++operation; clearInterval(fadeTimer); audio.pause(); render(); });
  fetch('/audio/playlist.json').then(response => { if (!response.ok) throw Error('Playlist unavailable'); return response.json(); }).then(data => {
    tracks = data;
    tracks.forEach((track, i) => {
      const li = document.createElement('li'), button = document.createElement('button'), number = document.createElement('span'), text = document.createElement('span'), composer = document.createElement('small');
      button.type = 'button'; number.className = 'music-number'; number.textContent = String(i + 1).padStart(2, '0'); text.textContent = track.title; composer.textContent = track.composer; text.append(composer); button.append(number, text); li.append(button); list.append(li);
      button.addEventListener('click', () => select(i));
    });
    render();
  }).catch(() => { play.disabled = true; panelPlay.disabled = true; status.textContent = 'Music is currently unavailable'; });
})();
