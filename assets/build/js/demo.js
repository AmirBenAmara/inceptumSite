;(function($) {
    "use strict";

    $(function() {
        $("#portfolio-toggle").on("click", function(){
            $(".p-option").slideToggle("slideUp");
        });

        $("#portfolio-toggle-2").on("click", function(){
            $(".p-option-2").slideToggle("slideUp");
        });

        $("#portfolio-toggle-3").on("click", function(){
            $(".p-option-3").slideToggle("slideUp");
        });

        initPortfolioController();
    });

    function initPortfolioController() {
        var $portfolio = $('.portfolio-grid, .portfolio-masonry'),
            $wrapper = $('.js-PortfolioWrapper'),
            $gridController = $('.js-PortfolioGridController'),
            $gutterController = $('.js-PortfolioGutterController'),
            $widthController = $('.js-PortfolioWidthController');

        $gridController.on('click', 'a', function(e) {
            e.preventDefault();

            var $this = $(this),
                input = $this.data('input'),
                $parent = $this.parent();

            $parent.addClass('active').siblings().removeClass('active');

            $portfolio
                .addClass(input)
                .removeClass(removableGridClasses(input))
                .isotope('layout');
        });

        $gutterController.on('click', 'a', function(e) {
            e.preventDefault();

            var $this = $(this),
                input = $this.data('input'),
                $parent = $this.parent();

            $parent.addClass('active').siblings().removeClass('active');

            if ('gutter' === input) {
                $portfolio.addClass('gutter');
            } else {
                $portfolio.removeClass('gutter');
            }
            $portfolio.isotope('layout');
        });

        $widthController.on('click', 'a', function(e) {
            e.preventDefault();

            var $this = $(this),
                input = $this.data('input'),
                $parent = $this.parent();

            $parent.addClass('active').siblings().removeClass('active');

            if ('box' === input) {
                $wrapper.addClass('container');
            } else {
                $wrapper.removeClass('container');
            }
            $portfolio.isotope('layout');
        });
    }

    function removableGridClasses(selectedGrid) {
        var grids = ['grid-2', 'grid-3', 'grid-4', 'grid-5'];
        return $.grep(grids, function(grid) {
            return selectedGrid !== grid;
        }).join(' ');
    }

}(jQuery));
