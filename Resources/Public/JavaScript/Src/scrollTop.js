const scrollTop = () => {
  const container = document.querySelector('.scroll-top')

  if (!container) return

  container.addEventListener('click', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  })

  const scroll = () => {
    if (window.scrollY > window.innerHeight) {
      container.classList.add('scroll-top-show')
    } else {
      container.classList.remove('scroll-top-show')
    }
  }

  window.addEventListener('scroll', scroll)
}

export default scrollTop
