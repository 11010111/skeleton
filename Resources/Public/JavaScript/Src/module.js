/**
 * Full Width Container
 * Background und Foreground Farbe
 * @type {{init: containerColors.init}}
 */
let containerColors = {
    init: function () {
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
 * Convert Img to SVG
 * @type {{init: convertImgSvg.init}}
 */
let convertImgSvg = {
    init: function () {
        let images = document.querySelectorAll('.svg')

        if (!images) return

        for (let i = 0; i < images.length; i += 1) {
            let extSplit = images[i].src.split('.')
            let extension = extSplit[extSplit.length - 1].toLowerCase()

            if (extension === 'svg') {
                let xhr = new XMLHttpRequest()
                xhr.open("GET", images[i].src)
                xhr.overrideMimeType("image/svg+xml")
                xhr.addEventListener('load', function () {
                    let svg = xhr.responseXML.documentElement
                    svg.classList.add('fade-in')
                    images[i].parentElement.replaceChild(svg, images[i])
                })
                xhr.send()
            }
        }
    }
}

/**
 * Set all (group) elements to the same height
 * @type {{init: equalHeight.init}}
 */
let equalHeight = {
    init: function (selector = '.equal-height', groupName = '', groups = true) {
        let allGroups
        let onlyElements

        if (groupName) {
            allGroups = document.querySelectorAll(groupName)

            if (!allGroups) return
        } else {
            onlyElements = document.querySelectorAll(selector)

            if (!onlyElements) return
        }

        let equalHeight = 0

        let read = function () {
            if (allGroups) {
                allGroups.forEach(function (grp) {
                    let elements = grp.querySelectorAll(selector)

                    if (!elements) return

                    elements.forEach(function (el) {
                        if (groups) {
                            let dataHeight = grp.getAttribute(
                                'data-equal-height'
                            )

                            if (el.clientHeight > dataHeight) {
                                grp.setAttribute(
                                    'data-equal-height',
                                    Math.floor(el.clientHeight).toString()
                                )
                            }
                        } else {
                            if (el.clientHeight > equalHeight) {
                                equalHeight = Math.floor(el.clientHeight)
                            }
                        }
                    })
                })
            } else {
                onlyElements.forEach(function (el) {
                    if (groups) {
                        let parent = el.parentElement
                        let dataHeight = parent.getAttribute(
                            'data-equal-height'
                        )

                        if (el.clientHeight > dataHeight) {
                            parent.setAttribute(
                                'data-equal-height',
                                Math.floor(el.clientHeight).toString()
                            )
                        }
                    } else {
                        if (el.clientHeight > equalHeight) {
                            equalHeight = Math.floor(el.clientHeight)
                        }
                    }
                })
            }
        }

        let write = function () {
            if (allGroups) {
                allGroups.forEach(function (grp) {
                    let elements = grp.querySelectorAll(selector)

                    if (!elements) return

                    elements.forEach(function (el) {
                        if (groups) {
                            let dataHeight = grp.getAttribute(
                                'data-equal-height'
                            )
                            el.style.height = dataHeight + 'px'
                        } else {
                            el.style.height = equalHeight + 'px'
                        }
                    })
                })
            } else {
                onlyElements.forEach(function (el) {
                    if (groups) {
                        let parent = el.parentElement
                        let dataHeight = parent.getAttribute(
                            'data-equal-height'
                        )
                        el.style.height = dataHeight + 'px'
                    } else {
                        el.style.height = equalHeight + 'px'
                    }
                })
            }
        }

        let resize = function () {
            if (allGroups) {
                allGroups.forEach(function (grp) {
                    let elements = grp.querySelectorAll(selector)

                    if (!elements) return

                    elements.forEach(function (el) {
                        if (groups) {
                            grp.setAttribute(
                                'data-equal-height',
                                '0'
                            )
                        } else if (equalHeight > 0) {
                            equalHeight = 0
                        }
                        el.style.height = 'auto'
                    })
                })

                read()
                write()
            } else {
                onlyElements.forEach(function (el) {
                    if (groups) {
                        let parent = el.parentElement
                        parent.setAttribute(
                            'data-equal-height',
                            '0'
                        )
                    } else if (equalHeight > 0) {
                        equalHeight = 0
                    }
                    el.style.height = 'auto'
                })

                read()
                write()
            }
        }

        resize()
        window.addEventListener('resize', resize)
    }
}

/**
 * Image Parallax
 * @type {{init: parallax.init}}
 */
let parallax = {
    init: function () {
        let elementTop = document.querySelectorAll('.parallax-top')
        let elementBottom = document.querySelectorAll('.parallax-bottom')
        let elementLeft = document.querySelectorAll('.parallax-left')
        let elementRight = document.querySelectorAll('.parallax-right')

        let viewport = window.innerHeight

        let speedTop = 15
        let speedBottom = 15
        let speedLeft = 15
        let speedRight = 15

        let move = function (el, direction) {
            if (window.scrollY >= el.parentElement.offsetTop - viewport &&
                window.scrollY <= el.parentElement.offsetTop + el.parentElement.clientHeight + viewport) {
                if (direction === 'top') {
                    let pos = (window.scrollY - el.parentElement.offsetTop) / speedTop
                    el.style.top = pos + 'px'
                } else if (direction === 'bottom') {
                    let pos = (window.scrollY - el.parentElement.offsetTop) / speedBottom
                    el.style.bottom = pos + 'px'
                } else if (direction === 'left') {
                    let pos = (window.scrollY - el.parentElement.offsetTop) / speedLeft
                    el.style.left = pos + 'px'
                } else if (direction === 'right') {
                    let pos = (window.scrollY - el.parentElement.offsetTop) / speedRight
                    el.style.right = pos + 'px'
                }
            }
        }

        let scrollEvent = function () {
            elementTop.forEach(function (el) {
                move(el, 'top')
            })

            elementBottom.forEach(function (el) {
                move(el, 'bottom')
            })

            elementLeft.forEach(function (el) {
                move(el, 'left')
            })

            elementRight.forEach(function (el) {
                move(el, 'right')
            })
        }

        scrollEvent()
        window.addEventListener('scroll', scrollEvent, {passive: true})
    }
}

/**
 * Scroll to top
 */
let scrollToTop = {
    init: function () {
        let toTop = document.createElement('button')
        toTop.className = 'content-scroll-top'

        toTop.addEventListener('click', function () {
            document.body.scrollIntoView({ 'behavior': 'smooth' })
        })

        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                toTop.classList.add('scroll-top-show')
            } else {
                toTop.classList.remove('scroll-top-show')
            }
        })

        document.body.appendChild(toTop)
    }
}

/**
 * ENDE
 * Export Module (Functions, Variables)
 */
export {
    containerColors,
    mobileMenu,
    navigationFixed,
    convertImgSvg,
    equalHeight,
    parallax,
    scrollToTop
}
