const blockIframes = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const iframes = document.querySelectorAll("iframe");
    iframes && iframes.forEach((iframe) => {
      const parent = iframe.parentElement;
      parent.classList.add("blocked-media"), iframe.setAttribute("data-src", iframe.src), iframe.src = "", parent.addEventListener("click", () => {
        iframe.src = iframe.getAttribute("data-src"), parent.classList.remove("blocked-media");
      }, { once: !0 });
    });
  });
}, moreMenu = () => {
  const navigationList = document.querySelector(".navigation-list"), moreBtn = document.querySelector(".level1-more-btn"), moreWrapper = document.querySelector(".level1-more-wrapper");
  if (!moreBtn || !moreWrapper || !navigationList)
    return;
  moreBtn.addEventListener("click", () => {
    moreWrapper.style.bottom = navigationList.clientHeight + "px", moreWrapper.classList.toggle("level1-more-open");
  });
  const resize = () => {
    moreWrapper.style.bottom = navigationList.clientHeight + "px";
  };
  resize(), window.addEventListener("resize", resize);
}, scrollTop = () => {
  const container = document.querySelector(".scroll-top");
  if (!container)
    return;
  container.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  const scroll = () => {
    window.scrollY > window.innerHeight ? container.classList.add("scroll-top-show") : container.classList.remove("scroll-top-show");
  };
  window.addEventListener("scroll", scroll);
};
blockIframes();
moreMenu();
scrollTop();
console.log("WE LOVE TYPO3");
