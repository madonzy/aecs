$(function() {

    $(".header .nav a, .about .skills i").hover(
        function() {
            $(this).addClass('active');
        },
        function() {
            $(this).removeClass('active');
        }
    );


    var itemInfoWrapper = $('.project-item');

    itemInfoWrapper.each(function() {
        var container = $(this),
            sliderPagination = createSliderPagination(container);

        updateNavigation(container, container.find('.project-slider li').eq(0));

        container.find('.project-slider').on('click', function(event) {
            if (!container.hasClass('project-slider-active') && $(event.target).is('.project-slider')) {
                itemInfoWrapper.removeClass('project-slider-active');
                container.addClass('project-slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    $('body,html').animate({ 'scrollTop': container.offset().top }, 200);
                });
            }
        });

        container.find('.project-close').on('click', function() {
            container.removeClass('project-slider-active');
        });

        container.find('.project-next').on('click', function() {
            nextSlide(container, sliderPagination);
        });

        container.find('.project-prev').on('click', function() {
            prevSlide(container, sliderPagination);
        });

        container.find('.project-slider').on('swipeleft', function() {
            var wrapper = $(this),
                bool = enableSwipe(container);
            if (!wrapper.find('.selected').is(':last-child') && bool) { nextSlide(container, sliderPagination); }
        });

        container.find('.project-slider').on('swiperight', function() {
            var wrapper = $(this),
                bool = enableSwipe(container);
            if (!wrapper.find('.selected').is(':first-child') && bool) { prevSlide(container, sliderPagination); }
        });

        sliderPagination.on('click', function() {
            var selectedDot = $(this);
            if (!selectedDot.hasClass('selected')) {
                var selectedPosition = selectedDot.index(),
                    activePosition = container.find('.project-slider .selected').index();
                if (activePosition < selectedPosition) {
                    nextSlide(container, sliderPagination, selectedPosition);
                } else {
                    prevSlide(container, sliderPagination, selectedPosition);
                }
            }
        });
    });

    $(document).keyup(function(event) {
        if (event.which == '37' && $('.project-slider-active').length > 0 && !$('.project-slider-active .project-slider .selected').is(':first-child')) {
            prevSlide($('.project-slider-active'), $('.project-slider-active').find('.project-slider-pagination li'));
        } else if (event.which == '39' && $('.project-slider-active').length && !$('.project-slider-active .project-slider .selected').is(':last-child')) {
            nextSlide($('.project-slider-active'), $('.project-slider-active').find('.project-slider-pagination li'));
        } else if (event.which == '27') {
            itemInfoWrapper.removeClass('project-slider-active');
        }
    });

    function createSliderPagination($container) {
        var wrapper = $('<ul class="project-slider-pagination"></ul>').insertAfter($container.find('.project-slider-navigation'));
        $container.find('.project-slider li').each(function(index) {
            var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
                dot = $('<a href="#0"></a>').appendTo(dotWrapper);
            dotWrapper.appendTo(wrapper);
            dot.text(index + 1);
        });
        return wrapper.children('li');
    }

    function nextSlide($container, $pagination, $n) {
        var visibleSlide = $container.find('.project-slider .selected'),
            navigationDot = $container.find('.project-slider-pagination .selected');
        if (typeof $n === 'undefined') $n = visibleSlide.index() + 1;
        visibleSlide.removeClass('selected');
        $container.find('.project-slider li').eq($n).addClass('selected').prevAll().addClass('move-left');
        navigationDot.removeClass('selected')
        $pagination.eq($n).addClass('selected');
        updateNavigation($container, $container.find('.project-slider li').eq($n));
    }

    function prevSlide($container, $pagination, $n) {
        var visibleSlide = $container.find('.project-slider .selected'),
            navigationDot = $container.find('.project-slider-pagination .selected');
        if (typeof $n === 'undefined') $n = visibleSlide.index() - 1;
        visibleSlide.removeClass('selected')
        $container.find('.project-slider li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
        navigationDot.removeClass('selected');
        $pagination.eq($n).addClass('selected');
        updateNavigation($container, $container.find('.project-slider li').eq($n));
    }

    function updateNavigation($container, $active) {
        $container.find('.project-prev').toggleClass('inactive', $active.is(':first-child'));
        $container.find('.project-next').toggleClass('inactive', $active.is(':last-child'));
    }

    function enableSwipe($container) {
        var mq = window.getComputedStyle(document.querySelector('.project-slider'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
        return (mq == 'mobile' || $container.hasClass('project-slider-active'));
    }
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        center: true,
        items: 4,
        smartSpeed: 700,
        // onChanged: callback,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            980: { items: 4 }
        }
    });
    // function callback(event) {
    // }
    // owl.on('changed.owl.carousel', function(event) {
    //      var element   = event.target;
    //      var x = $(element).find('.owl-item.center');
    //      // var x = $('.owl-carousel').find('.owl-item.active.center');

    //      console.log(x)
    // })
    $('.project-sm-info').on('click', '.button', function(event) {
        var projectTitleSm = $(this).parent().find('h2').text();
        var projectImgSm = $(this).parents('.owl-item').find('img').attr('src');
        var projectTitle = $('.project-item .project-item-info').find('h2');
        var projectImg = $('.project-item .project-slider img');
        $(projectTitle).text(projectTitleSm)
        projectImg.each(function(index, el) {
            if (index == 0) {
                $(el).attr('src', projectImgSm);
            } else {

                $(el).attr('src', projectImgSm.substr(0, projectImgSm.length - 4) + '_' + index + '.jpg');
            }
        });
    });
});