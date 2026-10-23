(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  // Theme toggle: remembers the user's choice in this browser.
  function setTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle?.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    themeToggle?.setAttribute(
      "title",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme)
      metaTheme.setAttribute("content", isDark ? "#202327" : "#F3F5F7");
    try {
      localStorage.setItem("salman-portfolio-theme", theme);
    } catch (_) {}
  }

  // setTheme(root.dataset.theme || "light");
  themeToggle?.addEventListener("click", () => {
    // setTheme(root.dataset.theme === "dark" ? "light" : "dark");

    alert("Dark mode is coming Soon , Stay tuned");
  });

  // Mobile navigation.
  function closeMenu() {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    navLinks.classList.toggle("is-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu",
    );
  });
  navItems.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (
      navLinks?.classList.contains("is-open") &&
      !navLinks.contains(event.target) &&
      !menuToggle?.contains(event.target)
    )
      closeMenu();
  });

  // Update active navbar link while scrolling.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navItems.forEach((link) => {
              const active =
                link.getAttribute("href") === `#${entry.target.id}`;
              link.classList.toggle("active", active);
              if (active) link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
  }

  // Avoid showing the photo placeholder when no profile image exists.
  const profilePhoto = document.querySelector(".profile-photo");
  const placeholder = document.getElementById("portraitPlaceholder");
  if (profilePhoto && placeholder) {
    const showPhoto = () => {
      placeholder.hidden = true;
    };
    profilePhoto.addEventListener("load", showPhoto);
    if (profilePhoto.complete && profilePhoto.naturalWidth > 0) showPhoto();
  }

  // Contact form opens the visitor's email app. It does not submit to a server.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    );
    status.textContent = "Opening your email app…";
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Typewriter animation
  const typingText = document.getElementById("typingText");

  const words = [
    "Aspiring Web Developer",
    "Frontend Developer",
    "React.js Learner",
    "Creative Coder",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    typingText.textContent = isDeleting
      ? currentWord.substring(0, charIndex - 1)
      : currentWord.substring(0, charIndex + 1);

    charIndex += isDeleting ? -1 : 1;

    let delay = isDeleting ? 45 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // const btn = document.querySelector(".skills");
  // const trans = document.querySelector(".transcript");
  // trans.addEventListener("click", function () {
  //   trans.style.display = "block";
  // });
})();
