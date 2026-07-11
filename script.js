/* ═══════════════════════════════════════════════════════════
   JAHANA SHERIN K.J — PORTFOLIO SCRIPT
   Clean Minimal Edition · Web Speech API · Scroll Reveal
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. SCROLL PROGRESS BAR ─────────────────────────────── */
(function initProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ── 2. NAVBAR SCROLL STATE ─────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

/* ── 3. HAMBURGER MENU ──────────────────────────────────── */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close on nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── 4. ACTIVE NAV LINK ─────────────────────────────────── */
(function initActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  const sectionIds = ['hero', 'internship', 'projects', 'skills', 'education', 'contact-section'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ── 5. SCROLL REVEAL ───────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── 6. TRAIT BAR ANIMATION ─────────────────────────────── */
(function initTraitBars() {
  const fills = document.querySelectorAll('.ti-fill[data-width]');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(el => observer.observe(el));
})();

/* ── 7. IFRAME LOAD DETECTION ───────────────────────────── */
(function initIframeLoaders() {
  [
    { iframeId: 'iframe-cookie',   overlayId: 'overlay-cookie' },
    { iframeId: 'iframe-exhaust',  overlayId: 'overlay-exhaust' },
  ].forEach(({ iframeId, overlayId }) => {
    const iframe  = document.getElementById(iframeId);
    const overlay = document.getElementById(overlayId);
    if (!iframe || !overlay) return;

    // Give iframe 8 seconds; if it loads → hide overlay
    const timeout = setTimeout(() => {
      // Don't hide on timeout — just update fallback text
    }, 8000);

    iframe.addEventListener('load', () => {
      clearTimeout(timeout);
      // Check if iframe actually has content (CORS may block)
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc && doc.body && doc.body.innerHTML.trim().length > 0) {
          overlay.classList.add('loaded');
        }
      } catch (e) {
        // Cross-origin — the iframe DID load (just blocked by CORS)
        // Hide overlay since site loaded externally
        overlay.classList.add('loaded');
      }
    });

    iframe.addEventListener('error', () => {
      clearTimeout(timeout);
      // Keep overlay with fallback
    });
  });
})();

/* ── 8. AI VOICE SPEAKER ────────────────────────────────── */
(function initVoiceSpeaker() {
  const speakerBadge = document.getElementById('orb-speaker-badge');
  if (!speakerBadge) return;

  const speakerText = speakerBadge.querySelector('.orb-speaker-text');

  const PROFILE_TEXT = `
    Hello! My name is Jahana Sherin K.J. I'm a Software Testing and Software Engineering professional
    based in Thrissur, Kerala, India.

    I'm currently completing my Master of Computer Applications degree at Nehru College of Engineering
    and Research Centre, graduating in May 2026. I also hold a Bachelor of Computer Applications from
    Elims College.

    My technical expertise covers Python, JavaScript, TypeScript, Next.js, FastAPI, Django, Flask,
    MySQL, and SQL — along with DevOps tools including Git, Docker, and Azure Container Apps.

    In the Quality Assurance domain, I specialize in Manual Testing, Selenium Automation, Test Case Design,
    Defect Reporting, Regression Testing, and the full Software Development and Testing Lifecycle.

    I recently completed the Real Rails Internship Program at Infocreon Solutions, where I built two
    production Proof-of-Concept dashboards: the Cookie Tracker Graph, which is live at
    cookie-tracker-frontend.onrender.com, and the Data Exhaust Dashboard, live at 12-nu-lovat.vercel.app.
    These projects were built using Next.js, TypeScript, FastAPI, Tailwind CSS, Docker, and Azure Container Apps.

    My other projects include a Full-Stack Edge-Based DoS Mitigation System using Python, SVM classifiers,
    and Flask — available on GitHub — and an AI Copilot Chrome Extension built with React.js and REST APIs,
    also on GitHub.

    I'm currently open to new opportunities and excited to contribute my skills in Software Testing,
    Full-Stack Development, and Cloud Deployment to your team.

    Please feel free to reach out to me at Jsherin799 at gmail dot com, or connect with me on LinkedIn.
    Thank you for listening!
  `.trim().replace(/\s+/g, ' ');

  if (!window.speechSynthesis) {
    if (speakerText) speakerText.textContent = 'UNSUPPORTED';
    speakerBadge.style.opacity = '0.5';
    speakerBadge.style.pointerEvents = 'none';
    return;
  }

  let utterance = null;
  let speaking = false;

  const setPlaying = (active) => {
    speaking = active;
    speakerBadge.classList.toggle('speaking', active);
    if (speakerText) {
      speakerText.textContent = active ? 'SPEAKER ON' : 'SPEAKER OFF';
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  speakerBadge.addEventListener('click', () => {
    if (speaking) {
      stop();
      return;
    }

    // Build utterance
    utterance = new SpeechSynthesisUtterance(PROFILE_TEXT);
    utterance.rate   = 0.92;
    utterance.pitch  = 1.0;
    utterance.volume = 1.0;
    utterance.lang   = 'en-US';

    // Prefer a natural-sounding voice
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = [
        // Natural online voices (prefer female)
        'Microsoft Aria Online (Natural) - English (United States)',
        'Microsoft Jenny Online (Natural) - English (United States)',
        'Google US English',
        'Google UK English Female',
        // macOS / iOS female voices
        'Samantha',
        'Tessa',
        'Victoria',
        'Karen',
        // Windows built-in female voices
        'Microsoft Zira Desktop - English (United States)',
        'Microsoft Zira - English (United States)',
        'Hazel',
        'Susan'
      ];

      // 1. Try matching exact preferred female voices
      for (const name of preferred) {
        const v = voices.find(v => v.name === name);
        if (v) { utterance.voice = v; return; }
      }

      // 2. Try matching preferred names case-insensitively / partially
      for (const name of preferred) {
        const lowerName = name.toLowerCase();
        const v = voices.find(v => v.name.toLowerCase().includes(lowerName) || v.voiceURI.toLowerCase().includes(lowerName));
        if (v) { utterance.voice = v; return; }
      }

      // 3. Match any English female voice name keywords, avoiding male voice names
      const femaleKeywords = ['female', 'zira', 'aria', 'jenny', 'samantha', 'karen', 'hazel', 'susan', 'tessa', 'victoria', 'google us english'];
      const maleKeywords = ['male', 'david', 'mark', 'george', 'ravi', 'richard', 'sean', 'heera'];

      const candidate = voices.find(v => {
        if (!v.lang.startsWith('en')) return false;
        const nameLower = v.name.toLowerCase();
        const matchesFemale = femaleKeywords.some(kw => nameLower.includes(kw));
        const matchesMale = maleKeywords.some(kw => nameLower.includes(kw));
        return matchesFemale && !matchesMale;
      });
      if (candidate) { utterance.voice = candidate; return; }

      // 4. Fallback to any English voice that is not explicitly male
      const finalFallback = voices.find(v => {
        if (!v.lang.startsWith('en')) return false;
        const nameLower = v.name.toLowerCase();
        return !maleKeywords.some(kw => nameLower.includes(kw));
      });

      utterance.voice = finalFallback || voices[0];
    };

    if (window.speechSynthesis.getVoices().length) {
      pickVoice();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', pickVoice, { once: true });
    }

    utterance.onstart  = () => setPlaying(true);
    utterance.onend    = () => setPlaying(false);
    utterance.onerror  = () => setPlaying(false);

    window.speechSynthesis.speak(utterance);
  });

  // Stop on page hide (avoid zombie speech)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && speaking) stop();
  });
})();

/* ── 9. CONSOLE EASTER EGG ──────────────────────────────── */
(function consoleEgg() {
  const s1 = 'font-size:2rem;font-weight:900;color:#00F5FF;text-shadow:0 0 12px #00F5FF';
  const s2 = 'font-size:.95rem;font-weight:600;color:#F0F4FF';
  const s3 = 'font-size:.82rem;color:#8892A4';
  console.log('%cJahana Sherin K.J', s1);
  console.log('%cSoftware Engineer · QA Professional · Infocreon Intern', s2);
  console.log('%c📧 Jsherin799@gmail.com  |  📍 Thrissur, Kerala', s3);
  console.log('%c💼 Open to opportunities — let\'s connect!', s3);
  console.log('%c🚀 Projects: DoS Mitigation · AI Copilot · Cookie Tracker · Data Exhaust', s3);
})();

/* ── 10. BACKGROUND DOT-GRID / BINARY CANVAS ───────────── */
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Dot grid config
  const SPACING = 34;
  const CHARS = ['0', '1', '·'];
  let W, H, cols, rows, dots;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.ceil(W / SPACING) + 1;
    rows = Math.ceil(H / SPACING) + 1;
    buildDots();
  }

  function buildDots() {
    dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * SPACING,
          y: r * SPACING,
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          opacity: Math.random() * 0.18 + 0.04,
          speed: Math.random() * 0.003 + 0.001,
          phase: Math.random() * Math.PI * 2,
          flipTimer: Math.random() * 400 + 200,
          flipCounter: 0,
        });
      }
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.font = '10px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const t = frame * 0.012;
    dots.forEach(d => {
      // Slowly shimmer opacity
      const o = d.opacity + Math.sin(t + d.phase) * 0.06;
      ctx.fillStyle = `rgba(0,245,255,${Math.max(0, Math.min(0.28, o))})`;
      ctx.fillText(d.char, d.x, d.y);

      // Occasionally flip character
      d.flipCounter++;
      if (d.flipCounter > d.flipTimer) {
        d.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        d.flipCounter = 0;
        d.flipTimer = Math.random() * 400 + 200;
      }
    });

    frame++;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
})();

/* ── 11. PARTICLE ORB CANVAS ────────────────────────────── */
(function initOrbCanvas() {
  const wrap = document.getElementById('orb-glass-wrap');
  const canvas = document.getElementById('orb-canvas');
  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d');
  const SIZE = 280;
  canvas.width  = SIZE;
  canvas.height = SIZE;
  canvas.style.width  = SIZE + 'px';
  canvas.style.height = SIZE + 'px';

  const CX = SIZE / 2;
  const CY = SIZE / 2;

  // Mouse tracking (relative to wrap center)
  let mx = 0, my = 0;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    mx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    my = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
  });
  wrap.addEventListener('mouseleave', () => { mx = 0; my = 0; });

  // Particles
  const N = 90;
  const particles = Array.from({ length: N }, (_, i) => ({
    angle:  (i / N) * Math.PI * 2 + Math.random() * 0.4,
    r:      Math.random() * 100 + 30,
    speed:  (Math.random() * 0.004 + 0.002) * (Math.random() < .5 ? 1 : -1),
    size:   Math.random() * 2.2 + 0.4,
    // hue cycles: cyan (180) → violet (270) → pink (330)
    hue:    Math.random() * 160 + 170,
    alpha:  Math.random() * 0.7 + 0.2,
    phase:  Math.random() * Math.PI * 2,
    drift:  Math.random() * 0.005 + 0.001,
  }));

  // Core orb pulse
  let pulse = 0;

  function draw() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    pulse += 0.025;

    // — Outer ambient glow layers —
    const glows = [
      { r: 130, color: [0, 245, 255], a: 0.055 + Math.sin(pulse) * 0.02 },
      { r: 105, color: [124, 58, 237], a: 0.07  + Math.sin(pulse * 0.7) * 0.025 },
      { r:  78, color: [255, 100, 180], a: 0.06 + Math.sin(pulse * 1.3) * 0.02 },
    ];
    glows.forEach(g => {
      const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, g.r);
      grad.addColorStop(0, `rgba(${g.color},${g.a})`);
      grad.addColorStop(1, `rgba(${g.color},0)`);
      ctx.beginPath();
      ctx.arc(CX, CY, g.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // — Core bright nucleus —
    const coreR = 18 + Math.sin(pulse * 1.2) * 3;
    const coreG = ctx.createRadialGradient(CX, CY, 0, CX, CY, coreR);
    coreG.addColorStop(0,   `rgba(220,255,255,0.9)`);
    coreG.addColorStop(0.4, `rgba(0,245,255,0.55)`);
    coreG.addColorStop(1,   `rgba(0,245,255,0)`);
    ctx.beginPath();
    ctx.arc(CX, CY, coreR, 0, Math.PI * 2);
    ctx.fillStyle = coreG;
    ctx.fill();

    // — Orbit ring —
    ctx.beginPath();
    ctx.arc(CX, CY, 95, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,245,255,${0.06 + Math.sin(pulse) * 0.03})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // — Particles —
    particles.forEach(p => {
      p.angle += p.speed + mx * 0.001;
      // Subtle mouse attraction
      const tx = CX + Math.cos(p.angle) * (p.r + mx * 12);
      const ty = CY + Math.sin(p.angle) * (p.r + my * 12);
      // Alpha breathe
      const a = p.alpha * (0.6 + Math.sin(pulse * 0.8 + p.phase) * 0.4);
      ctx.beginPath();
      ctx.arc(tx, ty, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},100%,72%,${a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
