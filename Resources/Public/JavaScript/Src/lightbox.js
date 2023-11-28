; (() => {
  let currentIndex = 0
  let currentGroup = []

  const elements = document.querySelectorAll('.lightbox')

  if (!elements) return

  const prevent = (e) => {
    e.preventDefault()
  }

  const action = (type) => {
    switch(type) {
      case 'prev':
        currentIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
        wrapper.style.left = currentIndex * -100 + 'vw'
        break
      case 'next':
        currentIndex = currentIndex < currentGroup.length - 1 ? currentIndex + 1 : currentIndex
        wrapper.style.left = currentIndex * -100 + 'vw'
        break
      case 'close':
        container.classList.remove('lightbox-show')
        prev.classList.remove('lightbox-action-disabled')
        next.classList.remove('lightbox-action-disabled')

        wrapper.childNodes.forEach(item => {
          const link = item.querySelector('.lightbox')
          link.removeEventListener('click', prevent)
          item.remove()
        })

        wrapper.innerHTML = ''
        currentIndex = 0
        currentGroup = null
        break
      case 'show':
        container.classList.add('lightbox-show')
        break
      case 'btn':
        prev.classList.remove('lightbox-action-disabled')
        next.classList.remove('lightbox-action-disabled')

        if (currentIndex === 0 && currentGroup.length > 1) {
          prev.classList.add('lightbox-action-disabled')
        }

        if (currentIndex === currentGroup.length - 1 && currentGroup.length > 1) {
          next.classList.add('lightbox-action-disabled')
        }

        if (currentIndex === 0 && currentIndex === currentGroup.length - 1) {
          prev.classList.add('lightbox-action-disabled')
          next.classList.add('lightbox-action-disabled')
        }
      default:
        break
    }
  }

  const container = document.createElement('div')
  container.className = 'lightbox-container'

  const close = document.createElement('div')
  close.className = 'primary-btn lightbox-close'

  close.addEventListener('click', () => {
    action('close')
  })

  const wrapper = document.createElement('div')
  wrapper.className = 'lightbox-wrapper'

  const prev = document.createElement('div')
  prev.className = 'primary-btn lightbox-prev'

  prev.addEventListener('click', () => {
    action('prev')
    action('btn')
  })

  const next = document.createElement('div')
  next.className = 'primary-btn lightbox-next'

  next.addEventListener('click', () => {
    action('next')
    action('btn')
  })

  container.appendChild(close)
  container.appendChild(wrapper)
  container.appendChild(prev)
  container.appendChild(next)
  document.body.appendChild(container)

  elements.forEach(element => {
    const load = (e) => {
      e.preventDefault()
      const rel = element.getAttribute('rel')
      currentGroup = document.querySelectorAll(`[rel="${rel}"]`)

      currentGroup.forEach((el, index) => {
        const clone = el.cloneNode(true)
        clone.addEventListener('click', prevent)

        const item = document.createElement('div')
        item.className = 'lightbox-item'
        item.appendChild(clone)
        wrapper.appendChild(item)

        if (element === el) {
          currentIndex = index
          wrapper.style.left = currentIndex * -100 + 'vw'
        }
      })

      action('show')
      action('btn')

      if (currentGroup.length === 0) {
        prev.classList.add('lightbox-action-disabled')
        next.classList.add('lightbox-action-disabled')
      }
    }

    element.addEventListener('click', load)
  })
})();
