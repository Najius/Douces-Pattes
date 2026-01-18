// ==============================================
// Script principal - Douces Pattes
// ==============================================

const CONFIG = {
  emailTo: "contact@doucevisite.fr",
  revealThreshold: 0.12,
  revealMargin: "0px 0px -10% 0px"
};

// Utilitaires
const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

function setYear() {
  const yearElement = $("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function initSmoothScroll() {
  const links = Array.from(document.querySelectorAll('a[href^="#"]'));
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });
}

function initReveal() {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const nodes = Array.from($$("[data-reveal]"));
  
  if (!nodes.length) return;

  nodes.forEach((el) => el.classList.add("reveal"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { 
      root: null, 
      threshold: CONFIG.revealThreshold, 
      rootMargin: CONFIG.revealMargin 
    }
  );

  nodes.forEach((el) => observer.observe(el));
}

function initLogos() {
  const logoImgs = Array.from(document.querySelectorAll("img[data-logo]"));
  if (!logoImgs.length) return;

  logoImgs.forEach((img) => {
    const badge = img.closest(".logo-badge");
    const candidates = [
      "assets/images/logos/logo.jpg", 
      "assets/images/logos/logo.jpeg", 
      "assets/images/logos/logo.png"
    ];

    const tryLoad = (i) => {
      if (i >= candidates.length) {
        if (badge) badge.classList.remove("has-image");
        return;
      }

      const src = candidates[i];
      const test = new Image();
      test.onload = () => {
        img.src = src;
        if (badge) badge.classList.add("has-image");
      };
      test.onerror = () => {
        tryLoad(i + 1);
      };
      test.src = src;
    };

    tryLoad(0);
  });
}

function initContactForm() {
  const form = $("contact-form");
  const status = $("form-status");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("name")?.value?.trim();
    const email = $("email")?.value?.trim();
    const phone = $("phone")?.value?.trim();
    const city = $("city")?.value?.trim();
    const dates = $("dates")?.value?.trim();
    const message = $("message")?.value?.trim();

    const missing = [];
    if (!name) missing.push("nom");
    if (!email) missing.push("email");
    if (!city) missing.push("ville/quartier");
    if (!dates) missing.push("dates");
    if (!message) missing.push("message");

    if (missing.length) {
      if (status) status.textContent = `Merci de compléter : ${missing.join(", ")}.`;
      return;
    }

    const subject = `Demande de cat sitting à Bordeaux — ${name}`;
    const bodyLines = [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone || "(non renseigné)"}`,
      `Ville / quartier : ${city}`,
      `Dates et fréquence : ${dates}`,
      "",
      "Message :",
      message,
    ];

    const mailto = `mailto:${encodeURIComponent(CONFIG.emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    if (status) status.textContent = "Ouverture de votre email…";
    window.location.href = mailto;

    setTimeout(() => {
      if (status) status.textContent = `Si rien ne s'est ouvert, écrivez directement à ${CONFIG.emailTo}.`;
    }, 1200);
  });
}

setYear();
initSmoothScroll();
initContactForm();
initReveal();
initLogos();
