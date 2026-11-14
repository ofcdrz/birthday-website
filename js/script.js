// ============================================
// LOADER (har page pe first load par)
// ============================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hide'), 1200);
  }
});

// ============================================
// FLOATING HEARTS (har page pe)
// ============================================
(function floatingHearts() {
  const container = document.getElementById('hearts');
  if (!container) return;
  const glyphs = ['❤','♥','✦','✧','❥'];
  for (let i = 0; i < 20; i++) {
    const h = document.createElement('span');
    h.className = 'fh';
    h.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = (10 + Math.random() * 22) + 'px';
    h.style.color = Math.random() < 0.6
      ? 'rgba(225,124,154,0.55)'
      : 'rgba(212,175,97,0.5)';
    h.style.animationDuration = (15 + Math.random() * 18) + 's';
    h.style.animationDelay = '-' + (Math.random() * 20) + 's';
    container.appendChild(h);
  }
})();

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ============================================
// COUNTDOWN (sirf index.html pe)
// ============================================
function initCountdown() {
  const grid = document.getElementById('countdownGrid');
  if (!grid) return;

  // ✏️ BIRTHDAY CONFIG
  const BIRTH_MONTH = 12;   // December
  const BIRTH_DAY = 11;
  const IST_OFFSET = 330 * 60000;

  const getNowIST = () => Date.now() + IST_OFFSET;

  function compute() {
    const now = getNowIST();
    const year = new Date(now).getUTCFullYear();
    const target = Date.UTC(year, BIRTH_MONTH - 1, BIRTH_DAY, 0, 0, 0, 0);
    const dayEnd = target + 86400000;

    if (now >= dayEnd) {
      const next = Date.UTC(year + 1, BIRTH_MONTH - 1, BIRTH_DAY, 0, 0, 0, 0);
      return { diff: next - now, isToday: false };
    }
    if (now >= target) return { diff: 0, isToday: true };
    return { diff: target - now, isToday: false };
  }

  function render() {
    const s = compute();
    if (s.isToday) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center">
        <p class="gold-text" style="font-family:'Great Vibes',cursive;font-size:2.4rem">🎉 Today is the day! 🎉</p>
      </div>`;
      return;
    }
    const t = Math.max(0, Math.floor(s.diff / 1000));
    const cells = [
      { v: Math.floor(t / 86400), l: 'Days' },
      { v: Math.floor((t % 86400) / 3600), l: 'Hours' },
      { v: Math.floor((t % 3600) / 60), l: 'Mins' },
      { v: t % 60, l: 'Secs' },
    ];
    grid.innerHTML = cells.map(c => `
      <div class="cd-cell glass">
        <div class="cd-num">${String(c.v).padStart(2, '0')}</div>
        <div class="cd-lbl">${c.l}</div>
      </div>
    `).join('');
  }

  render();
  setInterval(render, 1000);
}
initCountdown();

// ============================================
// PHOTO LIGHTBOX (memories.html)
// ============================================
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
}
initLightbox();

// ============================================
// VIDEO PLAYER (video.html)
// ============================================
function initVideo() {
  const video = document.getElementById('memoryVideo');
  const overlay = document.getElementById('playOverlay');
  if (!video || !overlay) return;
  overlay.addEventListener('click', () => {
    video.play();
    overlay.classList.add('hidden');
  });
  video.addEventListener('pause', () => overlay.classList.remove('hidden'));
}
initVideo();

// ============================================
// ENVELOPE OPEN (final.html)
// ============================================
function initEnvelope() {
  const env = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const hint = document.getElementById('envHint');
  if (!env) return;
  env.addEventListener('click', () => {
    env.classList.add('open');
    letter.classList.add('show');
    if (hint) hint.style.display = 'none';
    celebrateConfetti();
  });
}
initEnvelope();

// ============================================
// CONFETTI (lightweight, no library)
// ============================================
function celebrateConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:100';
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const colors = ['#F0D9A8','#D4AF61','#E17C9A','#FBE8EE','#C9A45C'];
  const parts = [];
  for (let i = 0; i < 150; i++) {
    parts.push({
      x: Math.random() * innerWidth,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: 1.5 + Math.random() * 3,
      w: 5 + Math.random() * 8,
      h: 8 + Math.random() * 12,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  const start = Date.now();
  function frame() {
    if (Date.now() - start > 4000) {
      canvas.remove();
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    requestAnimationFrame(frame);
  }
  frame();
}

// ============================================
// MUSIC PLAYER (Web Audio melody — no file needed)
// ============================================
(function musicPlayer() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;

  let actx = null, master = null, timer = null;
  let playing = false, idx = 0, nextTime = 0;
  const BEAT = 0.42;
  const MELODY = [
    [392,1],[392,.5],[440,1.5],[392,1.5],[523.25,1.5],[493.88,3],
    [392,1],[392,.5],[440,1.5],[392,1.5],[587.33,1.5],[523.25,3],
    [392,1],[392,.5],[783.99,1.5],[659.25,1.5],[523.25,1.5],[493.88,1.5],[440,3],
    [698.46,1],[698.46,.5],[659.25,1.5],[523.25,1.5],[587.33,1.5],[523.25,3.5],
  ];

  function ensureCtx() {
    if (actx) return actx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    actx = new AC();
    master = actx.createGain();
    master.gain.value = 0.22;
    master.connect(actx.destination);
    return actx;
  }

  function playNote(freq, when, dur) {
    const o1 = actx.createOscillator(), g1 = actx.createGain();
    const o2 = actx.createOscillator(), g2 = actx.createGain();
    o1.type = 'triangle'; o1.frequency.value = freq;
    o2.type = 'sine'; o2.frequency.value = freq * 2;
    g1.gain.setValueAtTime(0.0001, when);
    g1.gain.exponentialRampToValueAtTime(0.6, when + 0.025);
    g1.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    g2.gain.setValueAtTime(0.0001, when);
    g2.gain.exponentialRampToValueAtTime(0.13, when + 0.025);
    g2.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.65);
    o1.connect(g1).connect(master);
    o2.connect(g2).connect(master);
    o1.start(when); o1.stop(when + dur + 0.06);
    o2.start(when); o2.stop(when + dur + 0.06);
  }

  function scheduler() {
    if (!playing || !actx) return;
    const now = actx.currentTime;
    if (nextTime < now) nextTime = now + 0.06;
    const [f, u] = MELODY[idx % MELODY.length];
    const dur = u * BEAT;
    playNote(f, nextTime, dur * 0.92);
    idx++; nextTime += dur;
    timer = setTimeout(scheduler, Math.max(25, (nextTime - actx.currentTime - 0.12) * 1000));
  }

  btn.addEventListener('click', async () => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') await ctx.resume();

    if (playing) {
      playing = false;
      clearTimeout(timer);
      btn.classList.remove('playing');
      btn.querySelector('.music-label').textContent = 'Music';
      btn.querySelector('.music-icon').textContent = '♪';
    } else {
      playing = true;
      idx = 0;
      nextTime = ctx.currentTime + 0.12;
      scheduler();
      btn.classList.add('playing');
      btn.querySelector('.music-label').textContent = 'Pause';
      btn.querySelector('.music-icon').textContent = '❚❚';
    }
  });
})();

// ============================================
// BACK TO TOP
// ============================================
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  });
  backTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}
