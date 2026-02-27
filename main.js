/* ============================================================
   FAIZAN AHMAD PORTFOLIO v2 — main.js
   ============================================================ */

/* ── CURSOR ─────────────────────────────────────────────── */
const $dot  = document.querySelector('.cur-dot');
const $ring = document.querySelector('.cur-ring');

document.addEventListener('mousemove', e => {
  $dot.style.cssText  = `left:${e.clientX}px;top:${e.clientY}px`;
  $ring.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
});
document.querySelectorAll('a,button,.proj-card,.ti,.sk-chip,.btn,.hint-pill').forEach(el => {
  el.addEventListener('mouseenter', () => $ring.classList.add('big'));
  el.addEventListener('mouseleave', () => $ring.classList.remove('big'));
});

/* ================================================================
   BOOT SEQUENCE
================================================================ */
const PACKAGES = [
  { name: 'gsap@3.12.5',            color: '#88c0d0' },
  { name: 'particles.js@2.0.0',     color: '#a3be8c' },
  { name: 'typed.js@2.1.0',         color: '#b48ead' },
  { name: 'font-awesome@6.5.0',     color: '#ebcb8b' },
  { name: 'ibm-plex-mono@6.4',      color: '#81a1c1' },
  { name: 'bricolage-grotesque@2',  color: '#d08770' },
  { name: 'devicons@latest',        color: '#8fbcbb' },
];

function addLine(parent, text, cls = '') {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  d.style.opacity = '0';
  parent.appendChild(d);
  requestAnimationFrame(() => { d.style.transition = 'opacity .25s'; d.style.opacity = '1'; });
  return d;
}

function runBoot() {
  const body = document.querySelector('.boot-body');
  let t = 0;

  const q = (fn, delay) => { t += delay; setTimeout(fn, t); };

  q(() => addLine(body, 'Last login: ' + new Date().toLocaleString() + ' on ttys001', 'tl-sys'), 0);
  q(() => addLine(body, 'faizan@portfolio ~ % npm install', 'tl-ok'), 200);
  q(() => addLine(body, '', ''), 100);
  q(() => addLine(body, 'npm warn deprecated', 'tl-sys'), 0);
  q(() => addLine(body, 'Resolving packages from registry...', 'tl-sys'), 0);
  q(() => addLine(body, '', ''), 100);

  PACKAGES.forEach((pkg, i) => {
    q(() => {
      const row = document.createElement('div');
      row.className = 'boot-pkg-row';
      row.innerHTML = `
        <span class="boot-pkg-name" style="color:${pkg.color}">  + ${pkg.name}</span>
        <div class="boot-bar"><div class="boot-bar-fill" style="background:${pkg.color}"></div></div>
        <span class="boot-pct">0%</span>`;
      body.appendChild(row);
      requestAnimationFrame(() => { row.style.transition='opacity .2s'; row.style.opacity='1'; });

      const fill = row.querySelector('.boot-bar-fill');
      const pct  = row.querySelector('.boot-pct');
      let p = 0;
      const iv = setInterval(() => {
        p = Math.min(100, p + Math.random()*20 + 6);
        fill.style.width = p + '%';
        pct.textContent  = Math.round(p) + '%';
        if (p >= 100) clearInterval(iv);
      }, 55);
    }, i * 160);
  });

  q(() => { addLine(body, '', ''); }, PACKAGES.length * 160 + 600);
  q(() => addLine(body, '✔  added 127 packages  |  0 vulnerabilities', 'tl-ok'), 200);
  q(() => addLine(body, '', ''), 100);
  q(() => addLine(body, '> vite build...', 'tl-sys'), 0);
  q(() => addLine(body, '  ✓ 142 modules transformed.', 'tl-ok'), 500);
  q(() => addLine(body, '  ✓ Built in 1.24s', 'tl-ok'), 300);
  q(() => addLine(body, '', ''), 100);
  q(() => addLine(body, '  Portfolio ready  ─  press [ENTER] ↵', 'tl-info'), 200);
  q(() => {
    const btn = document.querySelector('.boot-enter');
    gsap.to(btn, { opacity: 1, duration: .4 });
  }, 400);
}

function launchPortfolio() {
  gsap.to('#boot', {
    opacity: 0, duration: .55, onComplete: () => {
      document.getElementById('boot').style.display = 'none';
      document.body.style.overflow = '';
      document.getElementById('nav').classList.add('in');
      initParticles();
      initTyped();
      gsap.from('.hero-content > *', { opacity: 0, y: 24, stagger: .1, duration: .65, ease: 'power2.out' });
      gsap.from('.av-wrap', { opacity: 0, scale: .88, duration: .75, delay: .25, ease: 'back.out(1.4)' });
    }
  });
}

document.querySelector('.boot-enter').addEventListener('click', launchPortfolio);
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const btn = document.querySelector('.boot-enter');
    if (parseFloat(getComputedStyle(btn).opacity) > .5) launchPortfolio();
  }
});

/* ================================================================
   PARTICLES
================================================================ */
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 45, density: { enable: true, value_area: 900 } },
      color:  { value: '#5b8dee' },
      shape:  { type: 'circle' },
      opacity: { value: 0.18, random: true },
      size:   { value: 1.8, random: true },
      line_linked: {
        enable: true, distance: 150, color: '#5b8dee',
        opacity: 0.06, width: 1
      },
      move: { enable: true, speed: .55, random: true, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' } },
      modes:  { grab: { distance: 180, line_linked: { opacity: .2 } } }
    },
    retina_detect: true
  });
}

/* ================================================================
   TYPED.JS
================================================================ */
function initTyped() {
  new Typed('#typed-text', {
    strings: [
      'Frontend Developer',
      'WordPress Expert',
      'Shopify Developer',
      'AI / ML Enthusiast',
      'CS Graduate 2025',
    ],
    typeSpeed: 52, backSpeed: 32, backDelay: 1800,
    loop: true, cursorChar: '▌',
  });
}

/* ================================================================
   AVATAR SCROLL TILT
================================================================ */
const avWrap = document.querySelector('.av-wrap');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const delta = window.scrollY - lastY;
  const tilt  = Math.max(-10, Math.min(10, delta * .5));
  avWrap.style.transform = `perspective(900px) rotateY(${tilt}deg) rotateX(${-tilt*.25}deg)`;
  lastY = window.scrollY;
  clearTimeout(avWrap._t);
  avWrap._t = setTimeout(() => { avWrap.style.transform = ''; }, 350);

  // scroll-top
  const sb = document.getElementById('stb');
  sb.classList.toggle('on', window.scrollY > 450);
});

/* ================================================================
   SECTION COMMANDS — typed on scroll
================================================================ */
const CMD_MAP = {
  'skills':       '$ cat skills.json | jq',
  'about':        '$ open about.md',
  'projects':     '$ ls -la ./projects/',
  'terminal-sec': '$ ./run --interactive',
  'education':    '$ cat education.json',
  'contact':      '$ curl -X POST /api/contact',
};

function typeCmd(el, str, speed = 42) {
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += str[i++];
    if (i >= str.length) clearInterval(iv);
  }, speed);
}

const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id  = e.target.id;
    const cmd = e.target.querySelector('.cmd');
    if (cmd && !cmd.dataset.done) {
      cmd.dataset.done = '1';
      typeCmd(cmd, CMD_MAP[id] || '');
    }
    e.target.querySelectorAll('.fu').forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), i * 70);
    });
    e.target.querySelectorAll('.edu-item, .cert-item').forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), i * 110);
    });
  });
}, { threshold: .1 });

document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

/* ================================================================
   SKILLS MARQUEE — duplicate rows for seamless loop
================================================================ */
document.querySelectorAll('.marquee-row').forEach(row => {
  row.innerHTML += row.innerHTML;
});

/* ================================================================
   PROJECTS DATA + RENDERING
================================================================ */
const PROJECTS = [
  {
    name: 'Image Classification CNN',
    thumb: 'th-b', emoji: '🧠', lang: 'Python', lc: '#3776ab',
    purpose: 'AI / Machine Learning',
    desc: 'Implemented a CNN for image classification using TensorFlow on Google Colab. Prepared dataset, trained model, and evaluated with confusion matrix. Applied data augmentation to improve accuracy.',
    tags: ['TensorFlow', 'CNN', 'Python', 'Google Colab', 'NumPy', 'Matplotlib'],
    gh: 'https://github.com/faizandev1', live: null,
  },
  {
    name: 'U-Tweet Social App',
    thumb: 'th-g', emoji: '📱', lang: 'Flutter', lc: '#54c5f8',
    purpose: 'Mobile App — Final Year Project',
    desc: 'Real-time social networking app built with Flutter and Firebase. Features include live activity feed, user authentication, push notifications, media uploads, and profile system.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Real-time DB', 'Push Notifications'],
    gh: 'https://github.com/faizandev1/Utweet-FYP-Project-in-Flutter', live: null,
  },
  {
    name: 'Doctor Appointment CRUD',
    thumb: 'th-p', emoji: '🏥', lang: 'PHP', lc: '#777bb4',
    purpose: 'Backend / Database System',
    desc: 'PHP application with full CRUD operations for managing doctor appointments. Includes patient registration, scheduling, doctor management, and MySQL integration with admin dashboard.',
    tags: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
    gh: 'https://github.com/faizandev1', live: null,
  },
  {
    name: 'WooCommerce E-Commerce',
    thumb: 'th-o', emoji: '🛍️', lang: 'WordPress', lc: '#21759b',
    purpose: 'Freelance E-Commerce',
    desc: 'Built and launched multiple live WooCommerce stores for clients. Theme customization, product filtering, cart & payment gateway integration (Stripe/PayPal), and performance optimization.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'Responsive', 'Payment Gateway'],
    gh: null, live: 'https://best4juniors.nl',
  },
  {
    name: 'PM Complaint Portal',
    thumb: 'th-r', emoji: '🏛️', lang: 'PHP', lc: '#777bb4',
    purpose: 'Government Web Portal',
    desc: 'Public grievance submission portal in PHP with CSRF protection, secure form handling, and MySQL storage. Focused on usability and accessibility for public users.',
    tags: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Security'],
    gh: 'https://github.com/faizandev1/Prime-Minsiter-Portal-website-php-', live: null,
  },
  {
    name: 'Invoice Management System',
    thumb: 'th-t', emoji: '🧾', lang: 'Python', lc: '#3776ab',
    purpose: 'Desktop Application',
    desc: 'Offline desktop invoice management app. Create, manage, and export invoices as PDF or CSV. No internet or server required — perfect for small businesses.',
    tags: ['Python', 'Tkinter', 'PDF Export', 'CSV', 'Desktop App'],
    gh: 'https://github.com/faizandev1/Invoice-Management-System-in-Python', live: null,
  },
  {
    name: 'COVID-19 Data Analysis',
    thumb: 'th-k', emoji: '📊', lang: 'Jupyter', lc: '#f37626',
    purpose: 'Data Science',
    desc: 'Cleaning and preprocessing global COVID-19 dataset using Python and Pandas. Includes data transformation, missing value handling, and trend visualization with Matplotlib/Seaborn.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter', 'Data Cleaning'],
    gh: 'https://github.com/faizandev1/covid19-data-cleaning', live: null,
  },
];

const grid = document.getElementById('proj-grid');
PROJECTS.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'proj-card fu';
  card.innerHTML = `
    <div class="proj-thumb ${p.thumb}">
      <span class="proj-emoji">${p.emoji}</span>
      <span class="proj-lang" style="background:${p.lc}22;color:${p.lc};border:1px solid ${p.lc}44">${p.lang}</span>
      <span class="proj-num">// project_${String(i+1).padStart(2,'0')}</span>
    </div>
    <div class="proj-body">
      <h3 class="proj-name">${p.name}</h3>
      <p class="proj-desc">${p.desc.slice(0, 90)}...</p>
      <div class="proj-tags">${p.tags.slice(0,4).map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
      <div class="proj-footer">
        ${p.gh   ? `<a href="${p.gh}"   class="proj-lnk" target="_blank" rel="noopener">⬡ GitHub</a>` : ''}
        ${p.live ? `<a href="${p.live}" class="proj-lnk" target="_blank" rel="noopener">↗ Live</a>` : ''}
        <span class="proj-detail" onclick="openModal(${i})">Details →</span>
      </div>
    </div>`;
  card.addEventListener('click', ev => {
    if (!ev.target.classList.contains('proj-lnk')) openModal(i);
  });
  grid.appendChild(card);
});

window.openModal = i => {
  const p = PROJECTS[i];
  const ov = document.getElementById('modal-ov');
  ov.innerHTML = `
    <div class="modal-box">
      <div class="modal-top">
        <span class="proj-lang" style="background:${p.lc}22;color:${p.lc};border:1px solid ${p.lc}44;font-family:var(--mono);font-size:11px;padding:4px 12px;border-radius:4px;">${p.lang}</span>
        <button class="modal-cls" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-purpose">${p.emoji} ${p.purpose}</div>
        <h2 class="modal-title">${p.name}</h2>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-sec">// Technologies Used</div>
        <div class="modal-tags">${p.tags.map(t=>`<span class="modal-tag">${t}</span>`).join('')}</div>
        <div class="modal-links">
          ${p.gh   ? `<a href="${p.gh}"   class="btn btn-o" target="_blank" rel="noopener" style="font-size:12px;padding:9px 18px;">⬡ GitHub</a>` : ''}
          ${p.live ? `<a href="${p.live}" class="btn btn-p" target="_blank" rel="noopener" style="font-size:12px;padding:9px 18px;">↗ Live Site</a>` : ''}
        </div>
      </div>
    </div>`;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeModal = () => {
  document.getElementById('modal-ov').classList.remove('open');
  document.body.style.overflow = '';
};
document.getElementById('modal-ov').addEventListener('click', e => { if (e.target.id === 'modal-ov') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ================================================================
   INTERACTIVE TERMINAL
================================================================ */
const macBody  = document.getElementById('mac-body');
const macInput = document.getElementById('mac-input');

// Hint pills auto-fill input
document.querySelectorAll('.hint-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    macInput.value = pill.dataset.cmd;
    macInput.focus();
    macInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
});

function termPrint(text, cls = '') {
  const d = document.createElement('div');
  d.className = cls;
  d.innerHTML = text;
  macBody.appendChild(d);
  macBody.scrollTop = macBody.scrollHeight;
  return d;
}
function termPrintLine(text = '') { termPrint(text); }

function showWelcome() {
  termPrint('Last login: ' + new Date().toLocaleString(), 'tl-sys');
  termPrint('faizan@portfolio ~ %  type a command or click a hint above.', 'tl-sys');
  termPrint('', '');
  termPrint('  Available commands:', 'tl-info');
  termPrint('  <span style="color:#c3e88d">snake</span>   —  play the classic Snake game', 'tl-sys');
  termPrint('  <span style="color:#c3e88d">quiz</span>    —  take the dev knowledge quiz', 'tl-sys');
  termPrint('  <span style="color:#c3e88d">matrix</span>  —  run the Matrix rain effect', 'tl-sys');
  termPrint('  <span style="color:#c3e88d">clear</span>   —  clear the terminal', 'tl-sys');
  termPrint('', '');
}
showWelcome();

macInput.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const val = macInput.value.trim().toLowerCase();
  macInput.value = '';
  if (!val) return;

  // Echo command
  termPrint(`faizan@portfolio ~ % ${val}`, 'tl-ok');

  if (val === 'clear') {
    macBody.innerHTML = '';
    return;
  }
  if (val === 'snake')  { runSnake();  return; }
  if (val === 'quiz')   { runQuiz();   return; }
  if (val === 'matrix') { runMatrix(); return; }

  termPrint(`zsh: command not found: ${val}`, 'tl-err');
  termPrint('Tip: try  snake  /  quiz  /  matrix  /  clear', 'tl-sys');
  termPrint('', '');
});

/* ── SNAKE GAME ──────────────────────────────────────────── */
let snakeInterval = null;

function runSnake() {
  // Clear any previous game
  if (snakeInterval) clearInterval(snakeInterval);
  termPrint('', '');
  termPrint('  ◆ Snake Game — use arrow keys or WASD', 'tl-info');
  termPrint('<span class="game-hint">  Press any arrow key to start · Score counts every apple eaten</span>', '');

  const wrap = document.createElement('div');
  macBody.appendChild(wrap);

  const scoreEl = document.createElement('div');
  scoreEl.className = 'snake-score';
  scoreEl.textContent = 'Score: 0';
  wrap.appendChild(scoreEl);

  const cv = document.createElement('canvas');
  cv.id = 'snake-canvas';
  const W = 300, H = 200, CELL = 10;
  cv.width = W; cv.height = H;
  wrap.appendChild(cv);

  const ctx = cv.getContext('2d');

  let snake = [{x:15, y:10}, {x:14,y:10}, {x:13,y:10}];
  let dir = {x:1,y:0}, nextDir = {x:1,y:0};
  let food = spawnFood();
  let score = 0;
  let running = false;

  function spawnFood() {
    let pos;
    do { pos = { x: Math.floor(Math.random()*(W/CELL)), y: Math.floor(Math.random()*(H/CELL)) }; }
    while (snake.some(s => s.x===pos.x && s.y===pos.y));
    return pos;
  }

  function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0,0,W,H);

    // Grid dots
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (let x=0; x<W; x+=CELL) for (let y=0; y<H; y+=CELL) {
      ctx.fillRect(x+4, y+4, 2, 2);
    }

    // Food
    ctx.fillStyle = '#e06c75';
    ctx.fillRect(food.x*CELL+1, food.y*CELL+1, CELL-2, CELL-2);

    // Snake
    snake.forEach((seg, i) => {
      const t = i / snake.length;
      ctx.fillStyle = `hsl(${130 + t*40}, 55%, ${45 - t*10}%)`;
      ctx.fillRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2);
    });
  }

  function tick() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= W/CELL || head.y < 0 || head.y >= H/CELL) { gameOver(); return; }
    // Self collision
    if (snake.some(s => s.x===head.x && s.y===head.y)) { gameOver(); return; }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = 'Score: ' + score;
      food = spawnFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function gameOver() {
    clearInterval(snakeInterval); snakeInterval = null;
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(0, H/2-24, W, 48);
    ctx.fillStyle = '#e06c75';
    ctx.font = '600 15px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Game Over — Score: ${score}`, W/2, H/2+5);
    termPrint(`  Game over. Final score: ${score}`, 'tl-err');
    termPrint('  Type <span style="color:#c3e88d">snake</span> to play again', 'tl-sys');
    termPrint('', '');
    macBody.scrollTop = macBody.scrollHeight;
  }

  document.addEventListener('keydown', onKey);

  function onKey(e) {
    if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)) return;
    e.preventDefault();
    if (!running) {
      running = true;
      snakeInterval = setInterval(tick, 100);
    }
    const map = { ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1}, ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0},
                  w:{x:0,y:-1}, s:{x:0,y:1}, a:{x:-1,y:0}, d:{x:1,y:0} };
    const nd = map[e.key];
    if (nd.x !== -dir.x || nd.y !== -dir.y) nextDir = nd; // no 180
    if (!snakeInterval) { document.removeEventListener('keydown', onKey); }
  }

  draw();
  macBody.scrollTop = macBody.scrollHeight;
}

/* ── QUIZ ────────────────────────────────────────────────── */
const QUIZ_QS = [
  {
    q: 'Which CSS property creates a grid container?',
    opts: ['display: flex', 'display: grid', 'display: block', 'grid-template'],
    ans: 1,
  },
  {
    q: 'What does CNN stand for in machine learning?',
    opts: ['Computer Node Network', 'Convolutional Neural Network', 'Connected Node Net', 'Core Neural Node'],
    ans: 1,
  },
  {
    q: 'Which PHP superglobal handles form POST data?',
    opts: ['$_GET', '$_SESSION', '$_POST', '$_REQUEST'],
    ans: 2,
  },
  {
    q: 'In Flutter, what widget builds lists efficiently?',
    opts: ['Column()', 'Stack()', 'ListView.builder()', 'Container()'],
    ans: 2,
  },
  {
    q: 'Which HTML tag makes text bold by default?',
    opts: ['<i>', '<em>', '<strong>', '<mark>'],
    ans: 2,
  },
  {
    q: 'What does API stand for?',
    opts: ['App Programming Interface', 'Application Protocol Interface', 'Application Programming Interface', 'Automated Program Interaction'],
    ans: 2,
  },
];

function runQuiz() {
  termPrint('', '');
  termPrint('  ◆ Developer Quiz — 6 questions', 'tl-info');
  termPrint('  Click an answer option to respond.', 'tl-sys');
  termPrint('', '');

  let qi = 0, correct = 0;

  function askQ() {
    if (qi >= QUIZ_QS.length) {
      termPrint('  ─────────────────────────────────', 'tl-sys');
      const pct = Math.round((correct / QUIZ_QS.length) * 100);
      const grade = pct === 100 ? '🏆 Perfect!' : pct >= 80 ? '✨ Great!' : pct >= 60 ? '👍 Not bad!' : '📚 Keep learning!';
      termPrint(`  Result: ${correct}/${QUIZ_QS.length}  (${pct}%)  ${grade}`, correct >= 4 ? 'tl-ok' : 'tl-warn');
      termPrint('  Type <span style="color:#c3e88d">quiz</span> to retry', 'tl-sys');
      termPrint('', '');
      macBody.scrollTop = macBody.scrollHeight;
      return;
    }
    const q = QUIZ_QS[qi];
    termPrint(`  Q${qi+1}. ${q.q}`, 'quiz-q');
    const optsWrap = document.createElement('div');
    optsWrap.className = 'quiz-opts';
    const letters = ['a','b','c','d'];
    q.opts.forEach((opt, oi) => {
      const el = document.createElement('div');
      el.className = 'quiz-opt';
      el.innerHTML = `  <span style="color:var(--term-dim)">${letters[oi]})</span> ${opt}`;
      el.addEventListener('click', () => {
        optsWrap.querySelectorAll('.quiz-opt').forEach(o => o.style.pointerEvents='none');
        if (oi === q.ans) {
          el.style.color = 'var(--term-green)';
          termPrint(`  ✔ Correct! — ${opt}`, 'tl-ok');
          correct++;
        } else {
          el.style.color = 'var(--term-error)';
          termPrint(`  ✗ Wrong — correct: ${q.opts[q.ans]}`, 'tl-err');
        }
        qi++;
        termPrint('', '');
        macBody.scrollTop = macBody.scrollHeight;
        setTimeout(askQ, 500);
      });
      optsWrap.appendChild(el);
    });
    macBody.appendChild(optsWrap);
    macBody.scrollTop = macBody.scrollHeight;
  }
  askQ();
}

/* ── MATRIX RAIN ─────────────────────────────────────────── */
function runMatrix() {
  if (snakeInterval) clearInterval(snakeInterval);
  termPrint('', '');
  termPrint('  ◆ Matrix Rain — type <span style="color:#c3e88d">clear</span> to stop', 'tl-info');

  const cv = document.createElement('canvas');
  cv.width = 700; cv.height = 180;
  cv.style.cssText = 'display:block;margin:8px auto;border-radius:4px;';
  macBody.appendChild(cv);

  const ctx = cv.getContext('2d');
  const cols = Math.floor(cv.width / 14);
  const drops = Array(cols).fill(1);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJ0123456789@#$%';

  const matIv = setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.font = '13px "IBM Plex Mono", monospace';

    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.97;
      ctx.fillStyle = bright ? '#ffffff' : '#3dd68c';
      ctx.fillText(ch, i * 14, y * 14);
      if (y * 14 > cv.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);

  // Auto stop after 8s
  setTimeout(() => {
    clearInterval(matIv);
    termPrint('  Matrix stopped. Type <span style="color:#c3e88d">matrix</span> to restart.', 'tl-sys');
    termPrint('', '');
    macBody.scrollTop = macBody.scrollHeight;
  }, 8000);

  macBody.scrollTop = macBody.scrollHeight;
}

/* ================================================================
   MOBILE NAV
================================================================ */
const ham = document.getElementById('ham');
const mob = document.getElementById('mob-nav');
ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));

/* ================================================================
   CONTACT FORM
================================================================ */
document.getElementById('cf')?.addEventListener('submit', () => {
  const btn = document.querySelector('.cf-submit');
  btn.textContent = '> Sending...'; btn.disabled = true;
});

/* ================================================================
   INIT
================================================================ */
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => setTimeout(runBoot, 280));
