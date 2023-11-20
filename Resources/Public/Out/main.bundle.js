const l = () => {
  const e = document.querySelector(".navigation-list"), o = document.querySelector(".level1-more-btn"), t = document.querySelector(".level1-more-wrapper");
  if (!o || !t || !e)
    return;
  o.addEventListener("click", () => {
    t.style.bottom = e.clientHeight + "px", t.classList.toggle("level1-more-open");
  });
  const n = () => {
    t.style.bottom = e.clientHeight + "px";
  };
  n(), window.addEventListener("resize", n);
}, r = () => {
  const e = document.querySelector(".scroll-top");
  if (!e)
    return;
  e.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  const o = () => {
    window.scrollY > window.innerHeight ? e.classList.add("scroll-top-show") : e.classList.remove("scroll-top-show");
  };
  window.addEventListener("scroll", o);
};
l();
r();
console.log("WE LOVE TYPO3");
