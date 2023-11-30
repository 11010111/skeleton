const blockIframes = () => {
  window.addEventListener('DOMContentLoaded', () => {
    const iframes = document.querySelectorAll('iframe')

    if (!iframes) return

    iframes.forEach(iframe => {
      const parent = iframe.parentElement
      parent.classList.add('blocked-media')

      iframe.setAttribute('data-src', iframe.src)
      iframe.src = ''

      parent.addEventListener('click', () => {
        iframe.src = iframe.getAttribute('data-src')
        parent.classList.remove('blocked-media')
      }, { once: true })
    })
  })
}

export default blockIframes
