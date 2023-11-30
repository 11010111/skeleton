const t = () => {
  const c = document.querySelectorAll(".accordion");
  c && c.forEach((n) => {
    const e = n.querySelectorAll(".accordion-item");
    e && e.forEach((o) => {
      const r = o.querySelector(".accordion-headline");
      r && r.addEventListener("click", () => {
        o.classList.toggle("accordion-item-show");
      });
    });
  });
};
t();
