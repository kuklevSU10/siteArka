// book.js - сборка и поведение книги-каталога.
(function () {
  "use strict";

  function pic(base, alt) {
    return (
      '<img class="book-img" alt="' + alt + '" width="1254" height="1254" loading="lazy"' +
      ' src="" data-src="' + base + '-1254.webp"' +
      ' data-srcset="' + base + "-800.webp 800w, " + base + '-1254.webp 1254w"' +
      ' sizes="(max-width: 767px) 92vw, 460px">'
    );
  }

  function runner(left, right) {
    return '<span class="book-runner"><span>' + left + '</span><span>' + right + '</span></span>';
  }
  function folio(n) { return '<span class="book-folio">' + n + "</span>"; }

  function page(cls, density, inner, style) {
    return '<div class="book-page ' + cls + '"' +
      (density ? ' data-density="' + density + '"' : "") +
      (style ? ' style="' + style + '"' : "") + ">" +
      '<div class="book-page-inner">' + inner + "</div></div>";
  }

  function buildPagesHTML(projects) {
    var html = "";
    var folioN = 0;
    function nextFolio() { folioN += 1; return ("0" + folioN).slice(-2); }

    // 1. Обложка (hard)
    html += page("book-page-cover", "hard",
      '<span class="book-cover-mark2">АРКА</span>' +
      '<span class="book-cover-sub2">Избранные интерьеры</span>' +
      '<span class="book-cover-line2"></span>' +
      '<span class="book-cover-foot2">Каталог</span>');

    // 2-3. Содержание (разворот)
    html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
      '<p class="book-intro-k">Каталог - 2026</p>' +
      '<p class="book-intro">Три интерьерных проекта. Форма, свет и материал, собранные в спокойную среду.</p>' +
      folio(nextFolio()));
    var toc = "";
    projects.forEach(function (p) {
      toc += "<li><b>" + p.number + "</b> <span>" + p.name + "</span><i>" + p.subtitle + "</i></li>";
    });
    html += page("book-page-paper", "", runner("", "Содержание") +
      '<ul class="book-toc">' + toc + "</ul>" + folio(nextFolio()));

    // Главы
    projects.forEach(function (p) {
      var label = p.number + " " + p.name;
      var chapterStyle = "--page-bg:" + p.pageBg + ";--page-color:" + p.text + ";--page-accent:" + p.accent;

      // опенер: лево = идентичность главы
      html += page("book-page-chapter", "", runner("АРКА \\\\ Каталог", "") +
        '<span class="book-ghost">' + p.number + "</span>" +
        '<div class="book-chapter-copy">' +
          "<h3>" + p.name + "</h3>" +
          '<p class="book-chapter-sub">' + p.subtitle + "</p>" +
          "<p>" + p.description + "</p>" +
          '<span class="book-swatches">' +
            p.palette.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") +
          "</span>" +
        "</div>" + folio(nextFolio()), chapterStyle);

      // право: герой в арке-вырубке
      html += page("book-page-paper book-hero-page", "", runner("", "Избранные работы \\\\ " + label) +
        '<figure class="book-arch arch-top arch-top-frame">' + pic(p.hero.src, p.name + ". " + p.hero.caption) +
        '</figure><figcaption class="book-cap">' + p.hero.caption + "</figcaption>" + folio(nextFolio()));

      if (p.layout === "climax") {
        var d = p.photos[0];
        html += page("book-page-paper book-spread-l", "",
          '<span class="book-spread-img" style="background-image:url(' + d.src + '-1254.webp)"></span>' +
          folio(nextFolio()));
        html += page("book-page-paper book-spread-r", "",
          '<span class="book-spread-img" style="background-image:url(' + d.src + '-1254.webp)"></span>' +
          folio(nextFolio()));
        html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
          '<figure class="book-tall">' + pic(p.photos[1].src, p.name + ". " + p.photos[1].caption) +
          '</figure><figcaption class="book-cap">' + p.photos[1].caption + "</figcaption>" + folio(nextFolio()));
        html += page("book-page-paper", "", runner("", label) +
          '<figure class="book-tall">' + pic(p.photos[2].src, p.name + ". " + p.photos[2].caption) +
          '</figure><figcaption class="book-cap">' + p.photos[2].caption + "</figcaption>" + folio(nextFolio()));
      } else {
        html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
          '<figure class="book-gal-big">' + pic(p.photos[0].src, p.name + ". " + p.photos[0].caption) +
          '<figcaption class="book-cap">' + p.photos[0].caption + "</figcaption></figure>" + folio(nextFolio()));
        html += page("book-page-paper", "", runner("", label) +
          '<figure class="book-gal-sm">' + pic(p.photos[1].src, p.name + ". " + p.photos[1].caption) +
          '<figcaption class="book-cap">' + p.photos[1].caption + "</figcaption></figure>" +
          '<figure class="book-gal-sm">' + pic(p.photos[2].src, p.name + ". " + p.photos[2].caption) +
          '<figcaption class="book-cap">' + p.photos[2].caption + "</figcaption></figure>" + folio(nextFolio()));
      }
    });

    // Финал (разворот)
    html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
      '<p class="book-quote">Пространства, которые переживут тренды.</p>' + folio(nextFolio()));
    html += page("book-page-paper book-cta-page", "", runner("", "Контакт") +
      '<div class="book-cta"><p>Расскажите о пространстве, которое хотите создать.</p>' +
      '<a class="button button-primary" href="#contact">Обсудить проект</a></div>' + folio(nextFolio()));

    // Задняя обложка (hard)
    html += page("book-page-cover book-page-back", "hard",
      '<span class="book-cover-mark2">АРКА</span>' +
      '<span class="book-cover-foot2">Архитектура и дизайн интерьеров</span>');

    // выровнять до чётного числа страниц (StPageFlip)
    var pageCount = (html.match(/class="book-page /g) || []).length;
    if (pageCount % 2 !== 0) html += page("book-page-paper book-page-blank", "", "");

    return html;
  }

  // экспорт для node-тестов
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { buildPagesHTML: buildPagesHTML };
  }

  // браузер: монтирование
  if (typeof window === "undefined" || typeof document === "undefined") return;

  var SRC = window.ARKA_PROJECTS || [];
  var mount = document.querySelector(".book-mount");
  var stage = document.querySelector(".book-stage");
  if (!mount || !stage || !SRC.length) return;

  mount.innerHTML = buildPagesHTML(SRC);

  var Flip = (window.St && window.St.PageFlip) || window.PageFlip || null;
  var pageFlip = null;

  function initFlip() {
    if (pageFlip || !Flip) return;
    // спрятать закрытую книгу из потока и раскрыть mount ДО измерения ширины
    var closed = document.querySelector(".book-closed");
    if (closed) closed.classList.add("is-gone");
    stage.classList.add("is-open");
    mount.style.display = "block";

    pageFlip = new Flip(mount, {
      width: 460, height: 530,
      size: "stretch",
      minWidth: 280, maxWidth: 720,
      minHeight: 320, maxHeight: 820,
      maxShadowOpacity: 0.22,
      drawShadow: true,
      flippingTime: 720,
      usePortrait: true,
      showCover: true,
      mobileScrollSupport: false,
      useMouseEvents: true,
      clickEventForward: false,
      disableFlipByClick: true,
      showPageCorners: true
    });
    pageFlip.loadFromHTML(mount.querySelectorAll(".book-page"));

    var controls = document.querySelector(".book-controls");
    if (controls) controls.hidden = false;
    if (window.ARKA_BOOK.onFlipReady) window.ARKA_BOOK.onFlipReady(pageFlip);
  }

  function openBook() { initFlip(); }

  var closedEl = document.querySelector(".book-closed");
  if (closedEl) {
    closedEl.addEventListener("click", openBook);
    closedEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBook(); }
    });
  }

  window.ARKA_BOOK = { mount: mount, stage: stage, initFlip: initFlip, getFlip: function () { return pageFlip; } };
})();
