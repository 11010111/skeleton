import anime from 'animejs'

const header = () => {
  const containers = document.querySelectorAll('.header')

  if (!containers) return

  containers.forEach(container => {
    const imageWrapper = container.querySelector('.header-image img')
    const scrollDown = container.querySelector('.header-scroll-down')

    if (imageWrapper) {
      const animation = anime({
        targets: imageWrapper,
        scale: [1.5, 1],
        duration: 800,
        elasticity: 200,
        easing: 'easeInOutSine',
        autoplay: false
      })

      const seek = () => {
        if (window.scrollY < imageWrapper.offsetTop) {
          const imageY = (imageWrapper.offsetTop - window.scrollY) / 3.49
          animation.seek(animation.duration * (imageY / 100))
        }
      }
    
      seek()
      window.addEventListener('scroll', seek)
      window.addEventListener('resize', () => {
        animation.restart()
        seek()
      })
    }

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
}

header()
