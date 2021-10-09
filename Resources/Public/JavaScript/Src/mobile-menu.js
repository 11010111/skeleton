let mobileMenu = {
    init: function () {
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn')
        let navMobile = document.querySelector('nav.mobile')

        if (!mobileMenuBtn || !navMobile) return

        mobileMenuBtn.addEventListener('touchend', function () {
            mobileMenuBtn.classList.toggle('mobile-btn-active')
            navMobile.classList.toggle('mobile-open')
        })
    }
}

export { mobileMenu };
