/**
 * Set Full Width Container Colors
 * @type {{init: containerColors.init}}
 */
let containerColors = {
    init: function() {
        let backgrounds = document.querySelectorAll('[data-background]')
        let foregrounds = document.querySelectorAll('[data-foreground]')

        backgrounds.forEach(function (bg) {
            bg.style.backgroundColor = bg.getAttribute('data-background')
        })

        foregrounds.forEach(function (fg) {
            fg.style.color = fg.getAttribute('data-foreground')
        })
    }
}

/**
 * Mobile Menu
 * @type {{init: mobileMenu.init}}
 */
let mobileMenu = {
    init: function () {
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn')
        let navMobile = document.querySelector('nav.mobile')

        if (!mobileMenuBtn || !navMobile) return

        mobileMenuBtn.addEventListener('click', function () {
            mobileMenuBtn.classList.toggle('mobile-btn-active')
            navMobile.classList.toggle('mobile-open')
        })
    }
}

/**
 * Navigation Fixed
 */
let navigationFixed = {
    init: function () {
        let navigation = document.querySelector('.navigation')

        if (!navigation) return

        window.addEventListener('scroll', function () {
            if (window.scrollY > 0 && !navigation.classList.contains('fixed')) {
                navigation.classList.add('fixed')
            } else if (window.scrollY === 0) {
                navigation.classList.remove('fixed')
            }
        })
    }
}

/**
 * END
 * Export Module (Functions, Variables)
 */
export { containerColors, mobileMenu, navigationFixed };
