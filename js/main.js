$(function() {

    // Animation on scroll

    $('.hidden-load').viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        classToRemove: 'hidden-load',
        offset: 50,
        removeClassAfterAnimation: true
        // repeat: true
       });

    // Spy scrolling

    // $('.header .nav a').on('click', function(event) {
    //     setTimeout(function() {
    //     $(this).parents('.nav').find('a').removeClass('active');
    //     $(this).addClass('active');
    //     console.log("doen")
    //     }, 5000)
    // });

    $(window).on('scroll', function() {
        $('.target').each(function() {
            if ($(window).scrollTop() >= $(this).position().top - 50) {
                var id = "#" + $(this).attr('id');
                $('.header .nav a').removeClass('active');
                $(".header .nav a[href='" + id + "']").addClass('active');
            }
        });
    });

    // Smooth Scroling

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.focus();
                        };
                    });
                }
            }
        });

    // STICKY TOPLINE

    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        // if (document.documentElement.scrollTop > ($('.header').height() - $('.topline').height() * 1)) {
        if (document.documentElement.scrollTop > $('.topline').height() * 1) {
            $('.topline').addClass('sticky')

        } else {
            $('.topline').removeClass('sticky')
        }
    }

    // Slider underline first word title

    function firstWordU() {
        var text = $(".firstWordU").text().trim().split(" ");
        var first = text.shift();

        $(".firstWordU").html("<span class='underline'>" + first + "</span> " + text.join(" "))
    }

    // HEADER LANGUAGE CHANGE

    $('.header .language li a').click(function(event) {
        $(this).parents('.language').find('li').removeClass('selected')
        $(this).parent('li').addClass('selected')
    });

    // OWL RECENT WORKS   

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        // loop: true,
        margin: 20,
        nav: true,
        center: true,
        items: 4,
        startPosition: 3,
        // pagination: true,
        smartSpeed: 700,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsiveClass: true,
        onInitialized: callback,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            980: {
                items: 4,
            },
            1440: {
                items: 6,
                startPosition: 3
            }
        }
    });

    // FIRST LOAD

    function callback(event) {
        var currentItem = event.item.index;
        var projectImgSm = $(event.target).find(".owl-item").eq(currentItem).find("img").attr('src');
        var projectTitleSm = $(event.target).find(".owl-item").eq(currentItem).find("h2").text();
        var projectTitle = $('.project-info').find('h2');
        var projectImg = $('.project-img img');
        $(projectTitle).text(projectTitleSm)
        $(projectImg).attr('src', projectImgSm);
        firstWordU()
    }

    //ON CLICK LOAD

    owl.on('click', '.owl-item', function(event) {
        var target = $(this).index();
        owl.trigger("to.owl.carousel", [target, 700, true]);
    });

    // ON CHANGE LOAD

    owl.on('changed.owl.carousel', function(event) {
        var currentItem = event.item.index;
        var projectImgSm = $(event.target).find(".owl-item").eq(currentItem).find("img").attr('src');
        var projectTitleSm = $(event.target).find(".owl-item").eq(currentItem).find("h2").text();
        var projectTitle = $('.project-info').find('h2');
        var projectImg = $('.project-img img');
        $(projectTitle).text(projectTitleSm)
        $(projectImg).attr('src', projectImgSm);
        firstWordU()

    })

    //Owl navigation with keys

    $(document.documentElement).keyup(function(event) {
        if (event.keyCode == 37) {
            owl.trigger('prev.owl.carousel');
        } else if (event.keyCode == 39) {
             owl.trigger('next.owl.carousel');
        }

    });

    //Big slider images

    var data = [
        { src: 'static/img/Projects/project1.jpg' },
        { src: 'static/img/Projects/project1_1.jpg' },
        { src: 'static/img/Projects/project1_2.jpg' }
    ];

    //Popup Big slider

    $('.image-popups').magnificPopup({
        type: 'image',
        fixedContentPos: false,
        items: data,
        removalDelay: 300,
        gallery: { enabled: true },
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true
    });

});