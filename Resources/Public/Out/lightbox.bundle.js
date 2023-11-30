const u = () => {
  let e = 0, t = [];
  const b = document.querySelectorAll(".lightbox");
  if (!b)
    return;
  const h = (a) => {
    a.preventDefault();
  }, n = (a) => {
    switch (a) {
      case "prev":
        e = e > 0 ? e - 1 : e, i.style.left = e * -100 + "vw";
        break;
      case "next":
        e = e < t.length - 1 ? e + 1 : e, i.style.left = e * -100 + "vw";
        break;
      case "close":
        l.classList.remove("lightbox-show"), s.classList.remove("lightbox-action-disabled"), c.classList.remove("lightbox-action-disabled"), i.childNodes.forEach((o) => {
          o.querySelector(".lightbox").removeEventListener("click", h), o.remove();
        }), i.innerHTML = "", e = 0, t = null;
        break;
      case "show":
        l.classList.add("lightbox-show");
        break;
      case "btn":
        s.classList.remove("lightbox-action-disabled"), c.classList.remove("lightbox-action-disabled"), e === 0 && t.length > 1 && s.classList.add("lightbox-action-disabled"), e === t.length - 1 && t.length > 1 && c.classList.add("lightbox-action-disabled"), e === 0 && e === t.length - 1 && (s.classList.add("lightbox-action-disabled"), c.classList.add("lightbox-action-disabled"));
    }
  }, l = document.createElement("div");
  l.className = "lightbox-container";
  const d = document.createElement("div");
  d.className = "primary-btn lightbox-close", d.addEventListener("click", () => {
    n("close");
  });
  const i = document.createElement("div");
  i.className = "lightbox-wrapper";
  const s = document.createElement("div");
  s.className = "primary-btn lightbox-prev", s.addEventListener("click", () => {
    n("prev"), n("btn");
  });
  const c = document.createElement("div");
  c.className = "primary-btn lightbox-next", c.addEventListener("click", () => {
    n("next"), n("btn");
  }), l.appendChild(d), l.appendChild(i), l.appendChild(s), l.appendChild(c), document.body.appendChild(l), b.forEach((a) => {
    const o = (m) => {
      m.preventDefault();
      const g = a.getAttribute("rel");
      t = document.querySelectorAll(`[rel="${g}"]`), t.forEach((p, x) => {
        const v = p.cloneNode(!0);
        v.addEventListener("click", h);
        const r = document.createElement("div");
        r.className = "lightbox-item", r.appendChild(v), i.appendChild(r), a === p && (e = x, i.style.left = e * -100 + "vw");
      }), n("show"), n("btn"), t.length === 0 && (s.classList.add("lightbox-action-disabled"), c.classList.add("lightbox-action-disabled"));
    };
    a.addEventListener("click", o);
  });
};
u();
