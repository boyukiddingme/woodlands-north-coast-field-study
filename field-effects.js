/* Independent, optional Canvas2D enhancement. No access to map/editor state.
 * Contours are decorative, not surveyed terrain; photographs are never sampled
 * or redrawn. Failure leaves the original DOM and evidence fully usable. */
(() => {
  'use strict';
  if (!('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(hover: none), (pointer: coarse)');
  const layers = [];
  let timer = 0;
  let suspended = false;
  let time = 0;
  let last = performance.now();
  const enabled = () => !document.hidden && !suspended &&
    !document.body.classList.contains('texture-off') &&
    !document.body.classList.contains('owner-editing');
  const gpuActive = layer => layer.host.dataset.fieldGpu === 'active';
  function remove(layer) {
    layer.failed = true;
    layer.canvas.remove();
    layer.host.classList.remove('field-fx-ready');
    observer.unobserve(layer.host);
    layer.resize.disconnect();
  }
  function render(layer) {
    if (layer.failed || gpuActive(layer)) return;
    try { layer.draw(layer.ctx, layer.canvas.width, layer.canvas.height, time); }
    catch { remove(layer); }
  }
  function tick(now) {
    timer = 0;
    if (!enabled() || reduced.matches) return;
    if (now - last < (coarse.matches ? 125 : 100)) { schedule(); return; }
    time += Math.min(.25, (now - last) / 1000);
    last = now;
    layers.filter(layer => layer.visible && !layer.failed && !gpuActive(layer) && layer.animated).forEach(render);
    schedule();
  }
  function schedule() {
    const active = enabled() && !reduced.matches &&
      layers.some(layer => layer.visible && !layer.failed && !gpuActive(layer) && layer.animated);
    if (!active) { cancelAnimationFrame(timer); timer = 0; last = performance.now(); return; }
    // Preserve the queued frame when cursor or scroll classes change.
    if (!timer) timer = requestAnimationFrame(tick);
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const layer = layers.find(item => item.host === entry.target);
      if (!layer) continue;
      layer.visible = entry.isIntersecting;
      if (layer.visible && layer.animated) render(layer);
    }
    schedule();
  });
  function add(host, draw, animated = true, reveal = false) {
    if (!host) return;
    const canvas = document.createElement('canvas');
    let ctx;
    try { ctx = canvas.getContext('2d', { alpha: true }); } catch { return; }
    if (!ctx) return;
    canvas.className = 'field-fx-canvas' + (reveal ? ' field-fx-reveal' : '');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');
    const layer = {host, canvas, ctx, draw, animated, visible: false, failed: false};
    layer.resize = new ResizeObserver(() => {
      if (layer.failed) return;
      // Decorative resolution is capped independently of display DPR.
      const bounds = host.getBoundingClientRect();
      const scale = Math.min(.65, 900 / Math.max(1, bounds.width), 600 / Math.max(1, bounds.height));
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      render(layer);
    });
    host.append(canvas);
    if (!reveal) host.classList.add('field-fx-background', 'field-fx-ready');
    layers.push(layer);
    layer.resize.observe(host);
    observer.observe(host);
    return layer;
  }
  // Hero retains its established static treatment.
  // A single paper area gets non-tiling grain. Generate once per resize,
  // gently vary opacity rather than replacing random pixels every frame.
  let grain;
  add(document.querySelector('.manifesto'), (ctx, width, height, t) => {
    if (!grain || grain.width !== width || grain.height !== height) {
      grain = document.createElement('canvas'); grain.width = width; grain.height = height;
      const noise = grain.getContext('2d');
      if (!noise) throw Error('Canvas unavailable');
      const pixels = noise.createImageData(width, height);
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = 17; pixels.data[i + 1] = 19; pixels.data[i + 2] = 15;
        pixels.data[i + 3] = Math.random() * 9;
      }
      noise.putImageData(pixels, 0, 0);
    }
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = .72 + Math.sin(t * .55) * .08;
    ctx.drawImage(grain, Math.sin(t * .23) * 2 - 2, Math.cos(t * .19) * 2 - 2, width + 4, height + 4);
    ctx.globalAlpha = 1;
  });
  // One inlet photograph, with a barely visible veil. Events remain on the
  // existing figure: its click, keyboard dialog and touch scrolling all survive.
  const figure = document.querySelector('.evidence-photo[data-photo="fieldwork/IMG20260904160033.webp"]');
  const reveal = add(figure, (ctx, width, height) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(241,239,231,0.14)';
    ctx.fillRect(0, 0, width, height);
  }, false, true);
  if (reveal) {
    figure.addEventListener('pointermove', event => {
      if (!enabled() || !reveal.visible || reduced.matches || reveal.failed) return;
      try {
        const bounds = reveal.canvas.getBoundingClientRect();
        const scale = reveal.canvas.width / Math.max(1, bounds.width);
        const x = (event.clientX - bounds.left) * scale;
        const y = (event.clientY - bounds.top) * scale;
        const radius = 85 * scale;
        const brush = reveal.ctx.createRadialGradient(x, y, 0, x, y, radius);
        brush.addColorStop(0, 'rgba(0,0,0,1)');
        brush.addColorStop(.5, 'rgba(0,0,0,.9)');
        brush.addColorStop(1, 'rgba(0,0,0,0)');
        reveal.ctx.globalCompositeOperation = 'destination-out';
        reveal.ctx.fillStyle = brush;
        reveal.ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      } catch { remove(reveal); }
    }, {passive: true});
    // An owner replacement must never inherit an effect chosen for this image.
    const image = figure.querySelector('img');
    const replacement = new MutationObserver(() => {
      if (!image.getAttribute('src')?.endsWith('/IMG20260904160033.webp')) {
        remove(reveal); replacement.disconnect();
      }
    });
    replacement.observe(image, {attributes: true, attributeFilter: ['src']});
  }
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  coarse.addEventListener('change', schedule);
  new MutationObserver(schedule).observe(document.body, {attributes: true, attributeFilter: ['class']});
  window.addEventListener('pagehide', () => { suspended = true; schedule(); });
  window.addEventListener('pageshow', () => { suspended = false; schedule(); });
  document.addEventListener('field-gpu-change', () => {
    layers.filter(layer => layer.visible && layer.animated).forEach(render);
    schedule();
  });
  // Real WGSL/vgpu module, built by the existing Vite config into public/effects.
  // Keep the 2D layers visible until a validated GPU frame replaces each one.
  if (navigator.gpu && isSecureContext) {
    const load = () => import('/effects/field-gpu.js').then(module => module.mount()).catch(error => {
      document.body.dataset.fieldGpuStatus = 'FALLBACK';
      document.body.dataset.fieldGpuReason = error.message;
    });
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, {timeout: 1500});
    else setTimeout(load, 150);
  } else {
    document.body.dataset.fieldGpuStatus = 'FALLBACK';
    document.body.dataset.fieldGpuReason = 'WebGPU unavailable';
  }
})();
