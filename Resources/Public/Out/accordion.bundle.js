(() => {
  const e = document.querySelectorAll(".accordion");
  e && e.forEach((n) => {
    const c = n.querySelectorAll(".accordion-item");
    c && c.forEach((o) => {
      const r = o.querySelector(".accordion-headline");
      r && r.addEventListener("click", () => {
        o.classList.toggle("accordion-item-show");
      });
    });
  });
})();
