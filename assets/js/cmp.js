// /* 
//  *************************
//  ** JS FOR THIS TEMPLATE *
//  *************************
//  */


/*******************
 ** SMOOTH SCROLL **
 *******************
 */


// (function() {
//     'use strict';
//     // Test
//     if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
//         // Function Animate on Scrolling
//         var smoothScroll = function(anchor, duration) {
//             // Calculation how far and how fast
//             var startLocation = window.pageYOffset;
//             var endLocation = anchor.offsetTop;
//             var distance = endLocation - startLocation;
//             var increments = distance / (duration / 16);
//             var stopAnimation;
//             // Scrolling on check if time to stop
//             var animateScroll = function()  {
//                 window.scrollBy(0, increments);
//                 stopAnimation();
//             };
//             // If scroll down
//             if (increments >= 0) {
//                 // Stop animation when reach the offset
//                 stopAnimation = function() {
//                     var travelled = window.pageYOffset;
//                     if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
//                         clearInterval(runAnimation);
//                     }
//                 };
//             }
//             // If scrolling up
//             else {
//                 // Stop the function when reach the point
//                 stopAnimation = function() {
//                     var travelled = window.pageYOffset;
//                     if (travelled <= (endLocation || 0)) {
//                         clearInterval(runAnimation);
//                     }
//                 };
//             }
//             // Loop the function
//             var runAnimation = setInterval(animateScroll, 16);
//         };
//         // Define links for smooth function
//         var scrollToggle = document.querySelectorAll('.scroll');
//         // For each scroll link
//         [].forEach.call(scrollToggle, function(toggle) {
//             // Function On Click
//             toggle.addEventListener('click', function(e) {
//                 // Prevent default link behavior
//                 e.preventDefault();
//                 // Calc distance from the top
//                 var dataID = toggle.getAttribute('href');
//                 var dataTarget = document.querySelector(dataID);
//                 var dataSpeed = toggle.getAttribute('data-speed');
//                 // If anchor exists
//                 if (dataTarget) {
//                     // Go to the anchor
//                     smoothScroll(dataTarget, dataSpeed || 500);
//                 }
//             }, false);
//         });
//     }
// })();



/****************
 ** NAVIGATION **
 ****************
 */


// class Dropdown {
//     constructor(elem) {
//         if (!(elem instanceof HTMLElement)) {
//             throw new TypeError("The element must be an HTML element.");
//         }

//         this.isOpen = false;
//         this.elem = elem;
//         this.elem.addEventListener('click', () => {
//             this.open();
//         });
//     }

//     open() {
//         if (!this.isOpen) {
//             this.elem.querySelector(".dropdown-list").classList.add("show-dropdown");
//         } else {
//             this.elem.querySelector(".dropdown-list").classList.remove("show-dropdown");
//         }
//         this.isOpen = !this.isOpen;
//     }
// }
// const dropdownElem = document.querySelector('.dropdown');

// const navDropdown = new Dropdown(dropdownElem);



var NavToggle = function() {

    var
        navToggle,
        body;

    var _init = function() {
        navToggle = document.querySelector('.toggleWrap');
        body = document.querySelector('body');

        _addEventHandlers();
    }

    var _addEventHandlers = function() {
        navToggle.addEventListener('click', _toggleNav, false)
    }

    var _toggleNav = function() {
        if (!body.classList.contains('is-activeMenu')) {
            body.classList.add('is-activeMenu');
            this.children[0].classList.add('is-active');
        } else {
            var that = this;
            setTimeout(function() {
                body.classList.remove('is-activeMenu');
                that.children[0].classList.remove('is-active');
            }, 150);
        }
    }

    return {
        init: _init
    }
}();

NavToggle.init();


/************
 ** SLIDER **
 ************
 */

class FullSlider {
    constructor(_element = null, _options = {}) {
        this.element = _element;
        this.options = {
            ... {
                autoSlide: true,
                duration: 3000
            },

            ..._options
        };


        this.slides = [...this.element.querySelectorAll('.js-slide')];
        this.prevBtn = this.element.querySelector('.js-slide-prev');
        this.nextBtn = this.element.querySelector('.js-slide-next');

        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        if (this.options.autoSlide) {
            this.autoSlideInterval = setInterval(this.goNext.bind(this), this.options.duration);
        }

        this.addEvents();
    }

    goPrev() {
        const activeSlide = this.element.querySelector('.is-active');
        const prevSlide = activeSlide.previousElementSibling;
        activeSlide.classList.remove('is-active');
        if (prevSlide) {
            prevSlide.classList.add('is-active');
            return;
        }

        const slidesLength = this.slides.length - 1;
        const lastSlide = this.slides[slidesLength];
        lastSlide.classList.add('is-active');
    }

    goNext() {
        const activeSlide = this.element.querySelector('.is-active');
        const nextSlide = activeSlide.nextElementSibling;
        const nextSlideClassList = [...nextSlide.classList];
        activeSlide.classList.remove('is-active');
        if (nextSlideClassList.indexOf('js-slide') > 0) {
            nextSlide.classList.add('is-active');
            return;
        }

        this.slides[0].classList.add('is-active');
    }

    addEvents() {
        this.prevBtn.addEventListener('click', () => {
            this.goPrev();

            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
            }
        });

        this.nextBtn.addEventListener('click', () => {
            this.goNext();

            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
            }
        });
    }
}

//---
window.addEventListener("DOMContentLoaded", () => {

    const fullSliders = [...document.querySelectorAll('.fullSlider')];
    if (fullSliders.length) {
        for (let element of fullSliders) {
            new FullSlider(element);
        }
    }
});