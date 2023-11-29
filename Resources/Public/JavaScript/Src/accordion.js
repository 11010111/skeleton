;(() => {
  const containers = document.querySelectorAll('.accordion')

  if (!containers) return

  containers.forEach(container => {
    const accordions = container.querySelectorAll('.accordion-item')

    if (!accordions) return

    accordions.forEach(accordion => {
      const headline = accordion.querySelector('.accordion-headline')

      if (!headline) return
      
      headline.addEventListener('click', () => {
        accordion.classList.toggle('accordion-item-show')
      })
    })
  });
})();
