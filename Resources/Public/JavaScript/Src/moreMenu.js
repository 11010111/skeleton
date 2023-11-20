const moreMenu = () => {
  const navigationList = document.querySelector('.navigation-list')
  const moreBtn = document.querySelector('.level1-more-btn')
  const moreWrapper = document.querySelector('.level1-more-wrapper')
  
  if (!moreBtn || !moreWrapper || !navigationList) return

  moreBtn.addEventListener('click', () => {
    moreWrapper.style.bottom = navigationList.clientHeight + 'px'
    moreWrapper.classList.toggle('level1-more-open')
  })

  const resize = () => {
    moreWrapper.style.bottom = navigationList.clientHeight + 'px'
  }

  resize()
  window.addEventListener('resize', resize)
}

export default moreMenu
