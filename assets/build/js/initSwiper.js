;(function () {
    'use strict';

    var swiper = new Swiper('.swiper-container', {
        // Optional parameters
        effect: 'fade',
        speed: 1000,
        loop: true,
        autoplay: 4000,
        nested: true,
        parallax: true,

        pagination: '.swiper-button-next, .swiper-button-prev',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationType: 'custom',
        paginationCustomRender: function (swiper, current, total) {
            return '<div class="swiperCount">'+
                        '<span class="swiperCount-current">'+ current +'</span>'+
                        '<i class="swiperCount-devider"></i>'+
                        '<span class="swiperCount-total">'+ total +'</span>'+
                   '</div>';
        },
        onSlideChangeStart: function(s) {

            var activeSlide = document.querySelector(".swiper-slide-active");
            var swiperControl = document.querySelectorAll(".swiper-control");
            var colorScheme = activeSlide.dataset.scheme.toLowerCase();


            // animated css via data-animate="aminate-name"
            var currAnimateItems = activeSlide.querySelectorAll("[data-animate]");

            swiperControl.forEach(function(control) {
                control.dataset.scheme = colorScheme;
            });

            Array.prototype.forEach.call(currAnimateItems, function(item) {
                var dataAnimateName = item.getAttribute("data-animate");
                item.classList.add(dataAnimateName);
                item.classList.add("animated");
            });

            // trigger unactive sliders
            // for remove animate
            var unActiveSlide = document.querySelectorAll(".swiper-slide:not(.swiper-slide-active)");

            unActiveSlide.forEach(function(unactive) {
                var _animateItems = unactive.querySelectorAll("[data-animate]");
                Array.prototype.forEach.call(_animateItems, function(_item) {
                    var _dataAnimateName = _item.getAttribute("data-animate");
                    _item.classList.remove(_dataAnimateName);
                });
            });

        }
    });

})();
