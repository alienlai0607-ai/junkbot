/* ===================================================================
   廢材機器人 Junkbot — 共用互動腳本
   注入 header / footer、導覽 active、手機選單、捲動動畫
   =================================================================== */
(function () {
  const BASE = document.body.dataset.base || '';
  const PAGE = document.body.dataset.page || 'home';

  const FB = 'https://www.facebook.com/blockplanet';
  const IG = 'https://www.instagram.com/blockplanet_2021';
  const LINE = 'https://lin.ee/zFqqFzQ';
  const MAIL = 'junkbot.taiwan@gmail.com';

  const ICONS = {
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14H10v7h3.5z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    line: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5c-5 0-9 3.2-9 7.2 0 3.6 3.2 6.6 7.5 7.1.3 0 .7.2.8.5.07.2.04.5 0 .7l-.13.8c-.04.24-.2.93.82.51 1.02-.43 5.46-3.21 7.45-5.5C20.93 13.9 21 12.6 21 10.7c0-4-4-7.2-9-7.2zM8.1 13.1H6.3c-.27 0-.48-.22-.48-.48V9.06c0-.27.21-.48.48-.48.26 0 .48.21.48.48v3.08h1.32c.27 0 .48.21.48.48 0 .26-.21.47-.48.47zm1.86-.48c0 .26-.21.48-.48.48-.26 0-.47-.22-.47-.48V9.06c0-.27.21-.48.47-.48.27 0 .48.21.48.48v3.56zm4.3 0c0 .2-.13.39-.33.45-.05.02-.1.03-.15.03-.15 0-.3-.07-.39-.2l-1.46-1.99v1.71c0 .26-.22.48-.48.48s-.48-.22-.48-.48V9.06c0-.2.13-.39.33-.45.05-.02.1-.02.15-.02.15 0 .3.07.39.19l1.46 1.99V9.06c0-.27.21-.48.48-.48.26 0 .48.21.48.48v3.56zm3.17-2.26c.27 0 .48.21.48.48 0 .26-.21.48-.48.48h-1.32v.84h1.32c.27 0 .48.21.48.48 0 .26-.21.47-.48.47h-1.8c-.26 0-.47-.21-.47-.47V9.06c0-.27.21-.48.47-.48h1.8c.27 0 .48.21.48.48 0 .26-.21.48-.48.48h-1.32v.84h1.32z"/></svg>'
  };

  const NAV = [
    { key: 'about',   zh: '關於我們', en: 'ABOUT',   href: 'pages/about.html' },
    { key: 'rules',   zh: '賽事辦法', en: 'RULES',   href: 'pages/rules.html' },
    { key: 'news',    zh: '最新消息', en: 'NEWS',    href: 'pages/news.html' },
    { key: 'gallery', zh: '賽事相簿', en: 'GALLERY', href: 'pages/gallery.html' },
    { key: 'rules2',  zh: '賽事規則', en: 'RULES',   href: 'pages/rules.html' },
    { key: 'contact', zh: '聯絡我們', en: 'CONTACT', href: 'pages/contact.html' }
  ];

  function socials(cls) {
    return `<div class="${cls}">
      <a class="social" href="${FB}" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.fb}</a>
      <a class="social" href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>
      <a class="social" href="${LINE}" target="_blank" rel="noopener" aria-label="LINE 官方帳號">${ICONS.line}</a>
    </div>`;
  }

  /* ---- Header ---- */
  function header() {
    const links = NAV.map(n =>
      `<a class="nav__link ${PAGE === n.key ? 'is-active' : ''}" href="${BASE}${n.href}">
        ${n.zh}<span class="en">${n.en}</span>
      </a>`).join('');

    return `<header class="site-header">
      <div class="wrap nav">
        <a class="nav__logo" href="${BASE}index.html"><img src="${BASE}assets/img/logo.png" alt="廢材機器人 Junkbot"></a>
        <nav class="nav__menu" id="navMenu">${links}</nav>
        <div class="nav__right">
          ${socials('socials')}
          <a class="btn btn--red btn--sm" href="${BASE}pages/enroll.html">我要報名 <span class="ico">➜</span></a>
          <button class="nav__toggle" id="navToggle" aria-label="選單"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>`;
  }

  /* ---- Footer ---- */
  function footer() {
    const col = (title, items) =>
      `<div class="footer"><h4>${title}</h4><ul>${items.map(i => `<li><a href="${i[1]}">${i[0]}</a></li>`).join('')}</ul></div>`;
    return `<div class="hazard"></div>
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div>
          <div class="footer__logo"><img src="${BASE}assets/img/logo.png" alt="廢材機器人 Junkbot"></div>
          <p class="footer__about">廢材機器人用想像力和雙手，賦予廢棄物新生命，一起打造永續又好玩的未來！</p>
          ${socials('footer__socials')}
        </div>
        ${col('網站導覽', NAV.map(n => [n.zh, BASE + n.href]))}
        ${col('聯絡資訊', [['✉️ ' + MAIL, 'mailto:' + MAIL], ['💬 官方 LINE（@183dxhcw）', LINE], ['👍 Facebook 粉專', FB], ['📷 Instagram', IG]])}
      </div>
      <div class="wrap"><div class="copy">© <span id="yr"></span> 廢材機器人 Junkbot ・ 把廢材變有趣，讓創意動起來！</div></div>
    </footer>`;
  }

  /* ---- 注入 ---- */
  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.innerHTML = header();
  if (f) f.innerHTML = footer();
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- 手機選單 ---- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

  /* ---- 捲動顯現動畫 ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---- 燈箱 Lightbox（相簿 / 回顧 / 作品 / 消息照片） ---- */
  const lbGroups = document.querySelectorAll('[data-lightbox]');
  if (lbGroups.length) {
    const lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML =
      '<button class="lb__close" aria-label="關閉">✕</button>' +
      '<button class="lb__btn lb__prev" aria-label="上一張">‹</button>' +
      '<img class="lb__img" alt="放大檢視">' +
      '<button class="lb__btn lb__next" aria-label="下一張">›</button>' +
      '<div class="lb__count"></div>';
    document.body.appendChild(lb);

    const imgEl = lb.querySelector('.lb__img');
    const countEl = lb.querySelector('.lb__count');
    const isImg = href => /\.(jpe?g|png|webp|gif)$/i.test(href || '');
    let list = [], idx = 0;

    function show(i) {
      idx = (i + list.length) % list.length;
      imgEl.src = list[idx];
      countEl.textContent = (idx + 1) + ' / ' + list.length;
    }
    function open(group, start) {
      list = Array.from(group.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href')).filter(isImg);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      show(start);
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      imgEl.src = '';
    }

    lbGroups.forEach(group => {
      const anchors = Array.from(group.querySelectorAll('a[href]')).filter(a => isImg(a.getAttribute('href')));
      anchors.forEach((a, i) => {
        a.addEventListener('click', (ev) => { ev.preventDefault(); open(group, i); });
      });
    });

    lb.querySelector('.lb__next').addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
    lb.querySelector('.lb__prev').addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb__close').addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

})();
