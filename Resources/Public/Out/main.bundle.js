const n = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const e = document.querySelectorAll("iframe");
    e && e.forEach((t) => {
      const o = t.parentElement;
      o.classList.add("blocked-media"), t.setAttribute("data-src", t.src), t.src = "", o.addEventListener("click", () => {
        t.src = t.getAttribute("data-src"), o.classList.remove("blocked-media");
      }, { once: !0 });
    });
  });
}, r = () => {
  const e = document.querySelector(".navigation-list"), t = document.querySelector(".level1-more-btn"), o = document.querySelector(".level1-more-wrapper");
  if (!t || !o || !e)
    return;
  t.addEventListener("click", () => {
    o.style.bottom = e.clientHeight + "px", o.classList.toggle("level1-more-open");
  });
  const s = () => {
    o.style.bottom = e.clientHeight + "px";
  };
  s(), window.addEventListener("resize", s);
}, c = () => {
  const e = document.querySelector(".scroll-top");
  if (!e)
    return;
  e.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  const t = () => {
    window.scrollY > window.innerHeight ? e.classList.add("scroll-top-show") : e.classList.remove("scroll-top-show");
  };
  window.addEventListener("scroll", t);
};
n();
r();
c();
console.log("WE LOVE TYPO3");
