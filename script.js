const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");

function revealElement(element) {
  element.classList.add("is-visible");
}

function revealItemsInViewport() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.96 && rect.bottom > 0;
    if (visible) revealElement(item);
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.04, rootMargin: "0px 0px -2% 0px" },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

  requestAnimationFrame(revealItemsInViewport);
  window.setTimeout(revealItemsInViewport, 180);
  window.addEventListener("hashchange", () => {
    window.setTimeout(revealItemsInViewport, 180);
  });
} else {
  revealItems.forEach(revealElement);
}

const previewRoot = document.querySelector("[data-preview-root]");
const previewImage = document.querySelector(".expertise-preview img");

if (previewRoot && previewImage) {
  const rows = Array.from(previewRoot.querySelectorAll(".expertise-row"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let previewTimer;

  function activateExpertiseRow(row, immediate = reduceMotion) {
    const nextSource = row.getAttribute("data-preview");
    if (!nextSource || previewImage.getAttribute("src") === nextSource) return;

    rows.forEach((item) => item.classList.remove("is-active"));
    row.classList.add("is-active");

    window.clearTimeout(previewTimer);
    previewImage.style.opacity = immediate ? "1" : "0";
    previewTimer = window.setTimeout(
      () => {
        previewImage.setAttribute("src", nextSource);
        previewImage.style.opacity = "1";
      },
      immediate ? 0 : 120,
    );
  }

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      activateExpertiseRow(row);
    });

    row.addEventListener("focusin", () => {
      activateExpertiseRow(row);
    });
  });

  if ("IntersectionObserver" in window) {
    const rowObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aCenter = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2);
            const bCenter = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2);
            return aCenter - bCenter;
          })[0];

        if (activeEntry) activateExpertiseRow(activeEntry.target);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    rows.forEach((row) => rowObserver.observe(row));
  }
}

const form = document.querySelector(".contact-form");

if (form) {
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      const empty = !field.value.trim();
      field.classList.toggle("is-invalid", empty);
      if (empty) isValid = false;
    });

    if (!status) return;

    status.classList.remove("is-success", "is-error");

    if (!isValid) {
      status.textContent = "Не удалось отправить запрос. Проверьте данные или напишите нам напрямую.";
      status.classList.add("is-error");
      return;
    }

    status.textContent = "Запрос получен. Мы свяжемся с вами в ближайшее рабочее время.";
    status.classList.add("is-success");
    form.reset();
  });

  form.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      event.target.classList.remove("is-invalid");
    }
  });
}
