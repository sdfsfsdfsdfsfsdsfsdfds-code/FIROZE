```javascript
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const langBtn = $(".lang");
const menuBtn = $(".menu");
const links = $(".links");

let lang = localStorage.getItem("firoze-lang") || "fa";

function applyLang(){

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

  $$("[data-fa]").forEach(el => {

    el.textContent =
      lang === "fa"
        ? el.dataset.fa
        : el.dataset.en;

  });

  if(langBtn){
    langBtn.textContent =
      lang === "fa" ? "EN" : "FA";
  }

}

langBtn?.addEventListener("click", () => {

  lang =
    lang === "fa"
      ? "en"
      : "fa";

  localStorage.setItem(
    "firoze-lang",
    lang
  );

  applyLang();

});


menuBtn?.addEventListener("click", () => {

  links?.classList.toggle("open");

});


const obs = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("show");

      }

    });

  },

  {
    threshold:.12
  }

);


$$(".reveal").forEach(element => {

  obs.observe(element);

});


const current =
  location.pathname
    .split("/")
    .pop() || "index.html";


$$(".links a").forEach(link => {

  if(
    link.getAttribute("href")
    === current
  ){

    link.classList.add("active");

  }

});


$$(".year").forEach(element => {

  element.textContent =
    new Date().getFullYear();

});


applyLang();
```
