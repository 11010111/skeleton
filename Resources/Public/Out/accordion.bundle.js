const accordion = () => {
  const containers = document.querySelectorAll(".accordion");
  containers && containers.forEach((container) => {
    const accordions = container.querySelectorAll(".accordion-item");
    accordions && accordions.forEach((accordion2) => {
      const headline = accordion2.querySelector(".accordion-headline");
      headline && headline.addEventListener("click", () => {
        accordion2.classList.toggle("accordion-item-show");
      });
    });
  });
};
accordion();
