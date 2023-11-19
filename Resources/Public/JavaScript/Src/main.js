// Imports
import "../../Css/tailwind.css"
import {
    containerColors,
    mobileMenu,
    navigationFixed,
    convertImgSvg,
    equalHeight,
    parallax,
    scrollToTop
} from "./modules.js"

/**
 * Module inits
 */
containerColors.init()
mobileMenu.init()
navigationFixed.init()
convertImgSvg.init()
equalHeight.init()
//equalHeight.init('.equal-height', '.example-group')
//equalHeight.init('.example-class', false)
parallax.init()
scrollToTop.init()

console.log('WE LOVE TYPO3')
