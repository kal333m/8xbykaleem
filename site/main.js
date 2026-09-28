// Life at 8x — concept. No framework: the hand-drawn marks are SVG strokes
// revealed with stroke-dashoffset, everything else is CSS transitions.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- data (all sourced from 8x.careers, transcribed clips lightly cleaned) ----------
  const CDN = 'https://cdn-hiring.8x.social/testimonials/';
  const TEAM = [
    { id: 'hussain-8x', name: 'Hussain', role: 'Engineering lead', dur: 46, quote: 'In your first week, you get a product. Not a ticket, but an entire product with a market and a deadline.' },
    { id: 'nil-maden', name: 'Nil', role: 'Intern to team lead', dur: 59, quote: "It's intense, the hours can be a bit high, but the growth is real." },
    { id: 'zoja', name: 'Zoja', role: 'Leads B2B go-to-market', dur: 74, quote: "I joined sales a little over a month ago. Now I'm leading the sales team for six of our verticals." },
    { id: 'jaka', name: 'Jaka', role: 'Co-founder, CEO', dur: 38, quote: 'We mainly care about your level of ambition, your ability to take ownership, and your ability to learn faster than anyone else.' },
    { id: 'maham', name: 'Maham', role: 'Software engineer', dur: 58, quote: "I joined 8x two months ago, and I have built and shipped four products." },
    { id: 'theo', name: 'Theo', role: 'Co-founder, CTO', dur: 43, src: 'https://cdn-hiring.8x.social/theo_testimonial_720.mp4', quote: "The amount of ownership that you'll get from day one is insane, and you'll be forced to be AI native." },
    { id: 'sami', name: 'Sami', role: 'Product engineer', dur: 59, quote: "You can make whatever you want, as long as it's backed by research." },
    { id: 'join-saloni', name: 'Saloni', role: 'Product manager', dur: 36, quote: 'My ideas are listened to, treated as plans, and I get to act on them.' },
    { id: 'ananda', name: 'Ananda', role: 'Product manager', dur: 55, quote: 'You actually get to own real products and ship them online. Your friends or family can actually discover them.' },
    { id: 'lu-min', name: 'Lu Min', role: 'Founding engineer', dur: 53, quote: "You'll get so much more done in a shorter time frame than you'd be able to anywhere else." },
    { id: 'vania', name: 'Vania', role: 'Engineer', dur: 53, quote: "I can work from my house, while I'm travelling, or even at my university, like right now." },
  ];
  const TILT = [-2.2, 1.4, -0.8, 2, -1.6, 1, -1.2, 1.8, -2, 0.8, -1.4];
  const LIFT = [18, -4, 26, 6, 30, 10, 22, -2, 14, 28, 4];

  const FIT = [
    { s: "You're fine with intense weeks and high hours.", src: 'Nil, intern to team lead' },
    { s: 'You ship with AI. A lot of it, and none of it slop.', src: 'Software Engineer post' },
    { s: "You'd rather get a whole product than a ticket.", src: 'Hussain, engineering lead' },
    { s: 'Nobody hands you a playbook. You write it.', src: 'Builder in Residence post' },
    { s: 'You say what you think, and you can take it when people push back.', src: 'Builder in Residence post' },
    { s: "You'd rather be judged on what you've shipped than where you've been.", src: 'Jaka, CEO' },
  ];

  const J = 'https://www.8x.careers/join/';
  const ROLES = [
    { t: 'Software Engineer', d: 'Own a full product end to end.', c: 'Engineering', l: 'San Francisco or remote', y: 'Full-time', u: 'software-engineer' },
    { t: 'Product Designer', d: 'Design every product we ship.', c: 'Design', l: 'San Francisco or remote', y: 'Full-time', u: 'product-designer' },
    { t: 'Graphic Designer', d: 'Merch, launches and paid creative across four products and ten markets. The first dedicated designer.', c: 'Design', l: 'Remote', y: 'Full-time', u: 'merch-graphic-designer' },
    { t: 'Video Editor', d: 'Turn footage into videos people actually watch.', c: 'Marketing and creative', l: 'San Francisco or remote', y: 'Full-time', u: 'video-editor' },
    { t: 'Paid Ads Manager', d: 'Own every paid channel, on small budgets on purpose. Hands in the account, not managing an agency.', c: 'Marketing and creative', l: 'Remote', y: 'Full-time', u: 'paid-ads-manager' },
    { t: '8x Brand', d: 'Elevate the 8x brand, on social and in the room.', c: 'Marketing and creative', l: 'San Francisco or remote', y: 'Full-time', u: 'branding' },
    { t: 'Growth Engineer (LATAM)', d: 'Own UGC and influencer campaigns start to finish: creators, production, performance.', c: 'Marketing and creative', l: 'LATAM', y: '', u: 'growth-engineer' },
    { t: 'Creator Partnerships and Campaigns Manager', d: 'Own LinkedIn creator campaigns end to end, from brief to post.', c: 'Marketing and creative', l: '', y: '', u: 'creator-partnership-campaign-manager' },
    { t: 'Builder in Residence', d: 'One role. One person. A blank page and the biggest brands in the world.', c: 'Go-to-market', l: 'Remote', y: '', u: 'builder-in-residence-at-8x' },
    { t: 'Global Sales Intern, 8x LinkedIn', d: "Lead 8x LinkedIn's sales in the US and EU, from playbook to first clients.", c: 'Go-to-market', l: 'Remote, US and EU', y: 'Internship, 2-week trial', u: 'global-sales-intern-8x-linkedin' },
    { t: 'Market Lead Intern, Southeast Asia', d: "Lead 8x's launch in Singapore, Malaysia, Thailand, the Philippines or Indonesia.", c: 'Go-to-market', l: 'Remote, Southeast Asia', y: 'Internship, 2-week trial', u: 'market-lead-southeast-asia' },
    { t: 'Market Lead Intern, Portugal and Brazil', d: "Lead 8x's launch in your market. Native Portuguese.", c: 'Go-to-market', l: 'Remote, Portugal or Brazil', y: 'Internship, 2-week trial', u: 'market-lead-intern-portugal-brazil' },
    { t: 'Market Lead Intern, Japan', d: "Lead 8x's launch in the Japanese market. Native Japanese.", c: 'Go-to-market', l: 'Remote, Japan', y: 'Internship, 2-week trial', u: 'market-lead-intern-japan' },
    { t: 'Market Lead Intern, Poland', d: "Lead 8x's launch in the Polish market. Native Polish.", c: 'Go-to-market', l: 'Remote, Poland', y: 'Internship, 2-week trial', u: 'market-lead-intern-poland' },
    { t: 'Intrapreneur', d: 'Lead a project from research to revenue.', c: 'Operations', l: 'San Francisco or remote', y: 'Full-time', u: 'intrapreneur' },
    { t: 'Hiring Manager', d: 'Manage the hiring process at 8x.careers.', c: 'Operations', l: 'Remote', y: '', u: 'hiring-manager' },
  ];

  const CLOCKS = [
    { c: 'San Francisco', tz: 'America/Los_Angeles', r: 'Where it’s built from' },
    { c: 'São Paulo', tz: 'America/Sao_Paulo', r: 'Hiring: LATAM, Brazil' },
    { c: 'Lisbon', tz: 'Europe/Lisbon', r: 'Hiring: Portugal' },
    { c: 'Warsaw', tz: 'Europe/Warsaw', r: 'Hiring: Poland' },
    { c: 'Lahore', tz: 'Asia/Karachi', r: 'Hussain’s team' },
    { c: 'Singapore', tz: 'Asia/Singapore', r: 'Hiring: Southeast Asia' },
    { c: 'Tokyo', tz: 'Asia/Tokyo', r: 'Hiring: Japan' },
  ];

  // ---------- hand-drawn paths ----------
  // Strokes use vector-effect: non-scaling-stroke, so dashes are measured in screen
  // pixels. Scale the path's own length by its on-screen transform to match.
  const screenLen = (p) => {
    const m = p.getScreenCTM();
    const k = m ? Math.max(Math.hypot(m.a, m.b), Math.hypot(m.c, m.d)) : 1;
    return Math.ceil(p.getTotalLength() * k + 4);
  };
  const primeDraw = (root = document) => $$('.draw', root).forEach((p) => p.style.setProperty('--len', screenLen(p)));

  // ---------- team strip ----------
  const strip = $('#strip');
  const quote = $('#quote');
  const playSvg = '<svg class="tri" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z"/></svg><svg class="pause" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z"/></svg>';
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

  strip.innerHTML = TEAM.map((p, i) => `
    <figure class="print" role="listitem" style="--r:${TILT[i]}deg;--y:${LIFT[i]}px">
      <button class="frame" type="button" data-i="${i}" aria-label="Play ${esc(p.name)}, ${esc(p.role)}, ${mmss(p.dur)}">
        <img src="assets/team/${p.id}.webp" alt="" width="720" height="1090" ${i > 5 ? 'loading="lazy"' : ''} draggable="false">
        <span class="play">${playSvg}</span><span class="progress"></span>
      </button>
      <figcaption><span>${esc(p.name)}</span><em>${mmss(p.dur)}</em></figcaption>
    </figure>`).join('');

  let current = null;
  const setQuote = (p) => {
    quote.classList.add('fade');
    setTimeout(() => {
      quote.innerHTML = p ? `“${esc(p.quote)}”<span class="who">${esc(p.name)} · ${esc(p.role)}</span>` : '';
      quote.classList.remove('fade');
    }, 180);
  };
  const stop = (fig) => {
    const v = $('video', fig);
    if (v) v.pause();
    fig.classList.remove('playing');
  };
  const play = (btn) => {
    const i = +btn.dataset.i, p = TEAM[i], fig = btn.closest('.print');
    if (current && current !== fig) stop(current);
    let v = $('video', fig);
    if (!v) {
      v = document.createElement('video');
      v.src = p.src || `${CDN}${p.id}_testimonial_720.mp4`;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('aria-hidden', 'true');
      btn.prepend(v);
      v.addEventListener('timeupdate', () => btn.style.setProperty('--p', (v.currentTime / (v.duration || p.dur)).toFixed(3)));
      v.addEventListener('ended', () => { stop(fig); btn.style.setProperty('--p', 0); v.currentTime = 0; });
    }
    if (fig.classList.contains('playing')) { stop(fig); return; }
    fig.classList.add('playing');
    current = fig;
    v.muted = false;
    v.play().catch(() => stop(fig));
    setQuote(p);
  };

  // drag to scroll on desktop, without eating clicks
  let down = null, moved = false;
  strip.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = { x: e.clientX, left: strip.scrollLeft };
    moved = false;
  });
  addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - down.x;
    if (Math.abs(dx) > 6) { moved = true; strip.classList.add('dragging'); }
    if (moved) strip.scrollLeft = down.left - dx;
  });
  addEventListener('pointerup', () => { down = null; strip.classList.remove('dragging'); });
  strip.addEventListener('click', (e) => {
    const btn = e.target.closest('.frame');
    if (!btn) return;
    if (moved) { e.preventDefault(); moved = false; return; }
    play(btn);
  });
  // Default caption: the line that best answers "why here", before anyone taps
  quote.innerHTML = `“${esc(TEAM[0].quote)}”<span class="who">${esc(TEAM[0].name)} · ${esc(TEAM[0].role)}</span>`;

  // ---------- hero sequence ----------
  const draftText = 'ai can build almost anything now.';
  const typed = $('#typed');
  const heroIn = () => {
    $('#caret').classList.add('done');
    $('#hero-title').classList.add('in');
    $('#hero-side').classList.add('in');
    setTimeout(() => $('#ring').classList.add('go'), reduce ? 0 : 700);
    setTimeout(() => { $('#strip-note').classList.add('go'); $('#strip-arrow').classList.add('go'); }, reduce ? 0 : 1500);
  };
  primeDraw();
  if (reduce) { typed.textContent = draftText; heroIn(); }
  else {
    let n = 0;
    const tick = () => {
      typed.textContent = draftText.slice(0, ++n);
      if (n < draftText.length) setTimeout(tick, 30 + Math.random() * 38);
      else setTimeout(heroIn, 380);
    };
    setTimeout(tick, 450);
  }

  // ---------- reveal on scroll ----------
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add(el.classList.contains('draw') || el.classList.contains('hl') ? 'go' : 'in');
    io.unobserve(el);
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  $$('.reveal, .velocity').forEach((el) => io.observe(el));
  ['#u-pull', '#u-man', '#else-arrow'].forEach((s) => io.observe($(s)));

  // ---------- the 8-shaped hiring loop, drawn by scroll ----------
  const loop = $('#loop-path');
  const L = loop.getTotalLength();
  let LS = screenLen(loop);
  loop.style.strokeDasharray = LS;
  loop.style.strokeDashoffset = LS;
  const STOPS = [0.1, 0.36, 0.6, 0.86];
  const stationsG = $('#stations');
  stationsG.innerHTML = STOPS.map((f, i) => {
    const pt = loop.getPointAtLength(f * L);
    const dx = pt.x > 200 ? 18 : -30;
    return `<g class="station"><circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="8"/><text x="${(pt.x + dx).toFixed(1)}" y="${(pt.y + 4).toFixed(1)}">0${i + 1}</text></g>`;
  }).join('');
  const stations = $$('.station', stationsG);
  const steps = $$('#steps li');
  const hire = $('.hire');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const r = hire.getBoundingClientRect();
    const vh = innerHeight;
    const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.72 - r.top) / (r.height * 0.78)));
    loop.style.strokeDashoffset = (LS * (1 - p)).toFixed(1);
    STOPS.forEach((f, i) => {
      const on = p >= f - 0.02;
      stations[i].classList.toggle('on', on);
      steps[i].classList.toggle('on', on);
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { LS = screenLen(loop); loop.style.strokeDasharray = LS; primeDraw(); onScroll(); });
  onScroll();

  // ---------- is it for you ----------
  const box = 'M6 7 C 14 5, 26 6, 34 7 C 35 15, 35 25, 34 33 C 25 35, 15 34, 6 33 C 5 25, 5 15, 6 7';
  const TICK = 'M9 21 C 12 24, 15 27, 17 31 C 21 21, 28 11, 38 2';
  const CROSS = 'M9 9 C 17 16, 24 24, 32 31 M 32 8 C 24 16, 17 24, 9 32';
  const list = $('#fit-list');
  const answers = FIT.map(() => null);
  list.innerHTML = FIT.map((f, i) => `
    <li class="fit reveal" style="--d:${i * 0.05}s" data-i="${i}">
      <span class="mark"><svg viewBox="0 0 40 40" aria-hidden="true"><path class="box" d="${box}"/><path class="ink mk" d=""/></svg></span>
      <p class="stmt"><span class="hs" style="--dur:.5s">${esc(f.s)}</span><span class="src">${esc(f.src)}</span></p>
      <span class="choices" role="group" aria-label="Your answer">
        <button class="choice" type="button" data-v="yes" aria-pressed="false">That's me</button>
        <button class="choice" type="button" data-v="no" aria-pressed="false">Not me</button>
      </span>
    </li>`).join('');
  $$('.fit', list).forEach((li) => io.observe(li));

  const drawIn = (path, d) => {
    path.setAttribute('d', d);
    const len = screenLen(path);
    path.style.transition = 'none';
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect();
    path.style.transition = `stroke-dashoffset ${reduce ? 0.01 : 0.45}s cubic-bezier(.6,.05,.3,1)`;
    path.style.strokeDashoffset = 0;
  };
  const hide = (path) => {
    const len = path.style.strokeDasharray || 999;
    path.style.transition = 'stroke-dashoffset .25s ease';
    path.style.strokeDashoffset = len;
  };

  const verdict = () => {
    const done = answers.filter((a) => a !== null).length;
    const yes = answers.filter((a) => a === 'yes').length;
    $('#tally').textContent = `${done} / ${FIT.length}`;
    const h = $('#verdict-h'), p = $('#verdict-p'), cta = $('#verdict-cta');
    cta.hidden = true;
    if (done === 0) { h.textContent = 'Start marking. It takes a minute.'; p.textContent = 'The point is to find out now, not in week two of a trial.'; return; }
    if (done < FIT.length) { h.textContent = 'Keep going.'; p.textContent = `${FIT.length - done} left. Be honest; nobody's watching.`; return; }
    if (yes >= 5) {
      h.textContent = 'Sounds like you. Pick a role.';
      p.textContent = 'Every role below is the real post, with the real assignment behind it.';
      cta.hidden = false;
    } else if (yes >= 3) {
      h.textContent = "Some of this will chafe. Better to know now.";
      p.textContent = 'Read one role end to end before you apply. If it still sounds right, it probably is.';
      cta.hidden = false;
    } else {
      h.textContent = "Probably not for you. That's a good answer.";
      p.textContent = 'Better to find out in a minute than in week two of a trial. 8x also hires for partner companies, and one of those might suit you better.';
    }
  };

  list.addEventListener('click', (e) => {
    const b = e.target.closest('.choice');
    if (!b) return;
    const li = b.closest('.fit'), i = +li.dataset.i, v = b.dataset.v;
    const next = answers[i] === v ? null : v;
    answers[i] = next;
    $$('.choice', li).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.v === next)));
    li.classList.toggle('no', next === 'no');
    const mk = $('.mk', li), st = $('.hs', li);
    st.classList.toggle('go', next === 'no');
    if (next) drawIn(mk, next === 'yes' ? TICK : CROSS); else hide(mk);
    verdict();
  });

  // ---------- roles ----------
  const cats = ['All', ...new Set(ROLES.map((r) => r.c))];
  const filters = $('#filters');
  const rolesList = $('#roles-list');
  filters.innerHTML = cats.map((c, i) => {
    const n = c === 'All' ? ROLES.length : ROLES.filter((r) => r.c === c).length;
    return `<button class="chip" type="button" data-c="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}<sup>${n}</sup></button>`;
  }).join('');
  const arrow = '<svg class="arrow" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5"/></svg>';
  rolesList.innerHTML = ROLES.map((r) => `
    <a class="role" href="${J}${r.u}" target="_blank" rel="noopener" data-c="${esc(r.c)}">
      <h3>${esc(r.t)}</h3>
      <p>${esc(r.d)}</p>
      <span class="meta loc${r.l ? '' : ' unknown'}">${r.l ? esc(r.l) : '—'}</span>
      <span class="meta type${r.y ? '' : ' unknown'}">${r.y ? esc(r.y) : '—'}</span>
      ${arrow}
    </a>`).join('');
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    $$('.chip', filters).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    $$('.role', rolesList).forEach((r) => { r.hidden = !(b.dataset.c === 'All' || r.dataset.c === b.dataset.c); });
  });

  // ---------- clocks ----------
  const clocks = $('#clocks');
  const fmt = CLOCKS.map((c) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: c.tz }));
  clocks.innerHTML = CLOCKS.map((c) => `<div><span class="t">--:--</span><span class="label c">${esc(c.c)}</span><span class="r">${esc(c.r)}</span></div>`).join('');
  const tickClocks = () => $$('.t', clocks).forEach((el, i) => { el.textContent = fmt[i].format(new Date()); });
  tickClocks();
  setInterval(tickClocks, 15000);

})();
