```javascript
"use strict";

document.addEventListener("DOMContentLoaded", function () {

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const langBtn = $(".lang");
  const menuBtn = $(".menu");
  const links = $(".links");

  let lang = "fa";

  try {
    lang = localStorage.getItem("firoze-lang") || "fa";
  } catch (error) {
    lang = "fa";
  }

  function applyLang() {

    document.documentElement.lang =
      lang === "fa" ? "fa" : "en";

    document.body.classList.toggle(
      "rtl",
      lang === "fa"
    );

    document.body.classList.toggle(
      "ltr",
      lang === "en"
    );

    $$("[data-fa]").forEach((element) => {

      const text =
        lang === "fa"
          ? element.dataset.fa
          : element.dataset.en;

      if (text) {
        element.textContent = text;
      }

    });

    if (langBtn) {
      langBtn.textContent =
        lang === "fa" ? "EN" : "FA";
    }

  }

  if (langBtn) {

    langBtn.addEventListener("click", function () {

      lang =
        lang === "fa"
          ? "en"
          : "fa";

      try {
        localStorage.setItem(
          "firoze-lang",
          lang
        );
      } catch (error) {
        // Ignore storage errors.
      }

      applyLang();

    });

  }

  if (menuBtn && links) {

    menuBtn.addEventListener("click", function () {

      links.classList.toggle("open");

    });

  }

  /*
    Reveal animation.
    If IntersectionObserver is unavailable,
    elements remain visible.
  */

  const revealElements = $$(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(function (element) {
      element.classList.add("show");
    });

  }

  /*
    Active navigation item.
  */

  const current =
    location.pathname
      .split("/")
      .pop() || "index.html";

  $$(".links a").forEach(function (link) {

    const href = link.getAttribute("href");

    if (href === current) {
      link.classList.add("active");
    }

  });

  /*
    Current year.
  */

  $$(".year").forEach(function (element) {

    element.textContent =
      new Date().getFullYear();

  });

  /*
    Apply language immediately.
  */

  applyLang();

});
```
