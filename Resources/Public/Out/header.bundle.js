(() => {
  const o = document.querySelectorAll(".header");
  o && o.forEach((e) => {
    const t = e.querySelector(".header-scroll-down");
    t && t.addEventListener("click", () => {
      const r = e.parentElement.childNodes;
      r.forEach((n, c) => {
        if (n === e && r.length - 1 > c) {
          const l = r[c + 1];
          if (!l)
            return;
          l.scrollIntoView();
        }
      });
    });
  });
})();
