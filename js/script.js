// assets/js/script.js  —  FINAL

(function () {
  "use strict";

  // Basit yardımcılar
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener("DOMContentLoaded", () => {
    // 1) Portfolyo bölümünde hover efektlerini tamamen devre dışı bırak
    injectNoHoverCSS();

    // 2) Filtreyi animasyonsuz çalıştır
    initPortfolioFilter();

    // 3) İlk açılışta iFrame ve kart stillerini sabitle
    normalizePortfolioItems();
  });

  function injectNoHoverCSS() {
    // Tek sefer enjekte et
    if (qs("#portfolio-nohover-style")) return;

    const css = `
      /* === Injected by script.js: Portfolio hover OFF === */
      #portfolio-grid .portfolio-card,
      #portfolio-grid .portfolio-card * {
        transition: none !important;
      }
      #portfolio-grid .portfolio-card:hover,
      #portfolio-grid .portfolio-card:hover * {
        transform: none !important;
        opacity: 1 !important;
        filter: none !important;
        box-shadow: inherit !important;
      }
      #portfolio-grid .portfolio-card::before,
      #portfolio-grid .portfolio-card:hover::before,
      #portfolio-grid .iframe-container::before,
      #portfolio-grid .iframe-container::after {
        display: none !important;
        opacity: 0 !important;
        transform: none !important;
        pointer-events: none !important;
      }
      #portfolio-grid .iframe-container iframe {
        pointer-events: auto !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        backface-visibility: hidden !important;
      }
    `.trim();

    const style = document.createElement("style");
    style.id = "portfolio-nohover-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function normalizePortfolioItems() {
    // Kart/iFrame başlangıç hâlini sabitle
    qsa("#portfolio-grid .portfolio-item").forEach((item) => {
      item.style.display = "block";
      item.classList.remove("hidden");
      item.style.opacity = "1";
      item.style.transform = "none";

      const card = qs(".portfolio-card", item);
      if (card) {
        card.style.transition = "none";
        card.style.transform = "none";
        card.style.opacity = "1";
        card.classList.add("no-hover");
      }

      const iframe = qs(".iframe-container iframe", item);
      if (iframe) {
        iframe.style.pointerEvents = "auto";
        iframe.style.opacity = "1";
        iframe.style.visibility = "visible";
        iframe.style.transform = "none";
      }
    });
  }

  function initPortfolioFilter() {
    const filterButtons  = qsa(".filter-btn");
    const portfolioItems = qsa(".portfolio-item");

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // Aktif buton görünümü
        filterButtons.forEach((btn) => {
          btn.classList.remove("active", "btn-pri
