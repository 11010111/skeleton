;(() => {
  const containers = document.querySelectorAll('.header')

  if (!containers) return

  containers.forEach(container => {
    const scrollDown = container.querySelector('.header-scroll-down')

    if (!scrollDown) return

    scrollDown.addEventListener('click', () => {
      const children = container.parentElement.childNodes

      children.forEach((child, index) => {
        if (child === container && children.length - 1 > index) {
          const nextNode = children[index + 1]
          if (!nextNode) return
          nextNode.scrollIntoView()
        }
      })
    })
  })
})();
