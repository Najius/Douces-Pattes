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

    // Protection honeypot anti-spam
    const honeypot = $("website")?.value;
    if (honeypot) {
      console.log("Spam détecté via honeypot");
      return; // Bloque silencieusement
    }

    const ownerName = $("owner-name")?.value?.trim();
    const petName = $("pet-name")?.value?.trim();
    const email = $("email")?.value?.trim();
    const phone = $("phone")?.value?.trim();
    const city = $("city")?.value?.trim();
    const dates = $("dates")?.value?.trim();
    const frequency = $("frequency")?.value;
    const petType = $("pet-type")?.value;
    const message = $("message")?.value?.trim();

    // Validation des champs obligatoires
    const missing = [];
    if (!ownerName) missing.push("votre nom");
    if (!petName) missing.push("nom de l'animal");
    if (!email) missing.push("email");
    if (!city) missing.push("ville/quartier");
    if (!dates) missing.push("dates d'absence");
    if (!frequency) missing.push("fréquence des visites");
    if (!petType) missing.push("type d'animal");
    if (!message) missing.push("message");

    if (missing.length) {
      if (status) status.textContent = `Merci de compléter : ${missing.join(", ")}.`;
      return;
    }

    // Validation email avec regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (status) status.textContent = "L'adresse email n'est pas valide.";
      return;
    }

    // Construction du sujet et du corps de l'email
    const subject = `Demande de pet sitting à Bordeaux — ${ownerName}`;
    const bodyLines = [
      `Propriétaire : ${ownerName}`,
      `Animal : ${petName} (${petType})`,
      `Email : ${email}`,
      `Téléphone : ${phone || "(non renseigné)"}`,
      `Ville / quartier : ${city}`,
      `Dates d'absence : ${dates}`,
      `Fréquence : ${frequency}`,
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

function initBurgerMenu() {
  const burger = $("burger-toggle");
  const nav = $("main-nav");
  
  if (!burger || !nav) return;
  
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.classList.toggle("active");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });
  
  // Fermer le menu quand on clique sur un lien
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu");
    });
  });
  
  // Fermer le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target) && nav.classList.contains("open")) {
      nav.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu");
    }
  });
}

function initFloatingCTA() {
  const floatingCTA = $("floating-cta");
  if (!floatingCTA) return;

  let lastScrollY = 0;
  const showThreshold = 500; // Afficher après 500px de scroll

  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Afficher le bouton après avoir scrollé un peu
    if (scrollY > showThreshold) {
      floatingCTA.classList.add("visible");
    } else {
      floatingCTA.classList.remove("visible");
    }
    
    lastScrollY = scrollY;
  }

  // Throttle pour optimiser les performances
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Vérifier au chargement
  handleScroll();
}

function initGalleryFilters() {
  const filterBtns = Array.from($$(".filter-btn"));
  const photos = Array.from($$(".gallery-photo"));
  
  if (!filterBtns.length || !photos.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Filter photos
      photos.forEach(photo => {
        if (filter === "all") {
          photo.classList.remove("hidden");
        } else {
          if (photo.dataset.category === filter) {
            photo.classList.remove("hidden");
          } else {
            photo.classList.add("hidden");
          }
        }
      });
    });
  });
}

function initLightbox() {
  const lightbox = $("lightbox");
  const lightboxImg = $("lightbox-img");
  const lightboxCaption = $("lightbox-caption");
  const closeBtn = $("lightbox-close");
  const prevBtn = $("lightbox-prev");
  const nextBtn = $("lightbox-next");
  const photos = Array.from($$("[data-lightbox]"));
  
  if (!lightbox || !photos.length) return;
  
  let currentIndex = 0;
  
  function openLightbox(index) {
    currentIndex = index;
    const photo = photos[index];
    const img = photo.querySelector("img");
    const caption = photo.querySelector(".photo-caption");
    
    // Use higher resolution image for lightbox
    const highResUrl = img.src.replace("w=400", "w=1200");
    lightboxImg.src = highResUrl;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : img.alt;
    
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  
  function showNext() {
    currentIndex = (currentIndex + 1) % photos.length;
    openLightbox(currentIndex);
  }
  
  function showPrev() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    openLightbox(currentIndex);
  }
  
  // Click on photo to open
  photos.forEach((photo, index) => {
    photo.addEventListener("click", () => openLightbox(index));
  });
  
  // Close button
  closeBtn?.addEventListener("click", closeLightbox);
  
  // Navigation
  nextBtn?.addEventListener("click", showNext);
  prevBtn?.addEventListener("click", showPrev);
  
  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
}

function initLazyLoading() {
  const images = Array.from($$("img[loading='lazy']"));
  
  // Fallback pour les images déjà chargées
  images.forEach(img => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });
  
  // Lazy loading avancé avec Intersection Observer
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Si l'image a un data-src, le charger
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Marquer comme loaded
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          
          lazyImageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px' // Charger 50px avant d'entrer dans le viewport
    });
    
    images.forEach(img => lazyImageObserver.observe(img));
  }
}

// Service Worker pour cache offline
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('[SW] Enregistré avec succès:', registration.scope);
        })
        .catch(error => {
          console.log('[SW] Échec de l\'enregistrement:', error);
        });
    });
  }
}

setYear();
initSmoothScroll();
initContactForm();
initReveal();
initLogos();
initBurgerMenu();
initFloatingCTA();
initGalleryFilters();
initLightbox();
initLazyLoading();
initServiceWorker();
