;(function () {
    'use strict';

    var $body = $('body'),
        $window = $(window);

    /*==============================================
     Back to top
     ===============================================*/
    $body.append("<a href='.html' class='BackToTop BackToTop--hide ScrollTo'><i class='fa fa-angle-up'></i></a>");

    var $liftOff = $('.BackToTop');
    $window.on('scroll', function () {
        if ($window.scrollTop() > 150) {
            $liftOff.addClass('BackToTop--show').removeClass('BackToTop--hide');
        } else {
            $liftOff.addClass('BackToTop--hide').removeClass('BackToTop--show');
        }
    });

    /*==============================================
     Retina support added
     ===============================================*/
    if (window.devicePixelRatio > 1) {
        $(".retina, .navbar-brand img, .logo img").imagesLoaded(function () {
            $(".retina, .navbar-brand img, .logo img").each(function () {
                var src = $(this).attr("src").replace(".", "@2x.");
                var h = $(this).height();
                $(this).attr("src", src).css({height: h, width: "auto"});
            });
        });
    }

    /*==============================================
     Returns height of browser viewport
     ===============================================*/
    $window.on('resize.windowscreen', function() {
        var height = $(this).height(),
            width = $(this).width(),

            $jsFullHeight = $('.js-FullHeight'),
            $mainNav = $('#mainNav'),

            $mainNavSticky = $mainNav.hasClass('navbar-sticky'),

            isFixedNavbar = $mainNav.hasClass('navbar-fixed'),
            isNoBgNavbar = $mainNav.hasClass('no-background'),
            isTransNavbar = $mainNav.hasClass('navbar-transparent'),

            $mainNav_height = $mainNav.height(),
            $mainNav_nextSection = $mainNav.parent().next();

        // bottom nav
        if ($mainNavSticky) {
            var $_bottom_nav = $mainNav.parent('header'),
                $_bottom_navBanner = $_bottom_nav.prev($jsFullHeight),
                $_bottom_bannerHeight = height - $mainNav_height;

                $_bottom_navBanner.height($_bottom_bannerHeight);
        } else {
            if (isFixedNavbar && !isNoBgNavbar || !isTransNavbar) {
                var _height = height - $mainNav_height;

                $jsFullHeight.height(_height);
                $mainNav_nextSection.css('margin-top', $mainNav_height);
            }

            if (isFixedNavbar && isNoBgNavbar || isTransNavbar) {
                if (width < 1024) {
                    var _xs_height = height - $mainNav_height;

                    $mainNav_nextSection.css('margin-top', $mainNav_height);
                    $jsFullHeight.height(_xs_height);
                } else {
                    $jsFullHeight.height(height);

                    $mainNav_nextSection.css('margin-top', '0');
                }
            }
        }

    });

    $window.trigger('resize.windowscreen');


    /*==============================================
     Switch init
     ===============================================*/
    $('.js-Switch').each(function(){
        new Switchery(this, $(this).data());
    })


    /*==============================================
     Parallax
     ===============================================*/
    $('.ImageBackground').each(function(){
        var $this = $(this),
            $imgHolder = $this.children('.ImageBackground__holder'),
            thisIMG = $imgHolder.children().attr('src'),
            thisURL = 'url('+thisIMG+')';

            if ($this.hasClass('js-Parallax')) {
                $imgHolder.attr("data-image-src", thisIMG);
            } else {
                $imgHolder.css('background-image', thisURL);
            }
    });

    $('.js-Parallax .ImageBackground__holder').parallax({
        zIndex: 1,
        speed: 0.4
    });

    $window.trigger('resize').trigger('scroll');



    /*==============================================
     CountTo init
     ===============================================*/
    $('.js-CountTo').each(function() {
        var $this = $(this),
        firstLoadCountEvent = true;

        $this.waypoint(function() {
            if (firstLoadCountEvent) {
                $this.countTo({
                    speed : 2000,
                    refreshInterval : 50,
                    formatter : function(value, options) {
                        value = value.toFixed(options.decimals);
                        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return value;
                    }
                });
                firstLoadCountEvent = false;
            }
        }, {
            offset : '90%'
        });
    });


    /*==============================================
     Owl carousel init
     ===============================================*/
    $('.js-OwlCarousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        navText : ["", ""]
    });

    $('.js-OwlCarousel2').owlCarousel({
        margin: 40,
        nav: true,
        navText : ["", ""],
        slideBy: 1,
        responsive : {
            0 : { items: 1 },
            480 : { items: 2 }
        }
    });

    $('.js-OwlCarousel3').owlCarousel({
        margin: 40,
        nav: true,
        navText : ["", ""],
        slideBy: 1,
        responsive : {
            0 : { items: 1 },
            480 : { items: 2 },
            768 : { items: 3 }
        }
    });

    $('.js-OwlCarousel4').owlCarousel({
        margin: 40,
        nav: true,
        navText : ["", ""],
        slideBy: 1,
        responsive : {
            0 : { items: 1 },
            480 : { items: 2 },
            768 : { items: 3 },
            992 : { items: 4 }
        }
    });

    $('.js-OwlCarousel5').owlCarousel({
        margin: 40,
        nav: true,
        navText : ["", ""],
        slideBy: 1,
        responsive : {
            0 : { items: 2 },
            480 : { items: 2 },
            768 : { items: 3 },
            992 : { items: 5 }
        }
    });


    /*==============================================
     Progressbar init
     ===============================================*/
    $('.progress').each(function() {
        var dataParcent = $(this).attr('data-percent'),
            progressTitle,
            progressTitle__outer = $(this).prev('.progress-title'),
            progressTitle__inner = $(this).children('.progress-title');

        if (progressTitle__outer.length > 0) {
            progressTitle = progressTitle__outer.css('width', dataParcent)
        } else if (progressTitle__inner.length > 0) {
            progressTitle = progressTitle__inner.css('width', dataParcent)
        }

        $(this).appear(function() {
            $(this).find('.progress-bar').animate({
                width : dataParcent
            }, 500);
        });
    });


    /*==============================================
     Portfolio grid init
     ===============================================*/
    var $alienPortfolio = $('.js-Portfolio');

    $alienPortfolio = $('.js-Portfolio').isotope({
        itemSelector: '.portfolio-item',
        filter: '*'
    });

    if ($.fn.imagesLoaded) {
        $alienPortfolio.imagesLoaded().progress(function () {
            $alienPortfolio.isotope('layout');
        });
    }

    $('.js-PortfolioFilter').on('click focus', 'a', function (e) {
        var $this = $(this);
        e.preventDefault();
        $this.parent().addClass('active').siblings().removeClass('active');
        $alienPortfolio.isotope({filter: $this.data('filter')});
    });


    /*==============================================
     Portfolio popup
     ===============================================*/
    $(".portfolio-gallery").each(function () {
        $(this).find(".popup-gallery").magnificPopup({
            type: "image",
            gallery: {
                enabled: true
            }
        });
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


    /*==============================================
     Returns height of browser viewport
     ===============================================*/
    $('.ScrollTo').on('click', function(e) {
        e.preventDefault();
        var element_id = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(element_id).offset().top -60
        },500);
    });

})(jQuery);
