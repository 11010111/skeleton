/**
 * Full Width Container
 * Background und Foreground Farbe
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
 * Mobiles Menü und Button
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
 * Navigation
 * Fixed Klasse beim Scrollen zum Body hinzufügen
 * @type {{init: navigationFixed.init}}
 */
let navigationFixed = {
    init: function () {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 0 && !document.body.classList.contains('fixed')) {
                document.body.classList.add('fixed')
            } else if (window.scrollY === 0) {
                document.body.classList.remove('fixed')
            }
        })
    }
}

/**
 * ENDE
 * Export Module (Functions, Variables)
 */
export {
    containerColors,
    mobileMenu,
    navigationFixed
};
