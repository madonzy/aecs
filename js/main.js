$(function() {
    // SPY SCROOL
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

    // Smooth Scrooling
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

    // STICKY

    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        // if (document.documentElement.scrollTop > ($('.header').height() - $('.topline').height() * 1)) {
        if (document.documentElement.scrollTop >  $('.topline').height() * 1) {
            $('.topline').addClass('sticky')

        }else {
            $('.topline').removeClass('sticky')
        }
    }



    $(".firstWordU").html(function() {
        var text = $(this).text().trim().split(" ");
        var first = text.shift();
        return (text.length > 0 ? "<span class='underline'>" + first + "</span> " : first) + text.join(" ");
    });


    // $(".header .nav a,.about .skills i").hover(
    //     function() {
    //         $(this).addClass('active');
    //     },
    //     function() {
    //         $(this).removeClass('active');
    //     }
    // );

    // HEADER LANGUAGE CHANGE

    $('.header .language').hover(function() {
        $(this).find('li').not('.selected').show(200);
    }, function() {
        $(this).find('li').not('.selected').hide(200);
    });
    $('.header .language li').on('click', function(event) {
        event.preventDefault();
        if ($(this).hasClass('selected')) {
            $(this).next().hide();
        } else {
            $(this).addClass('selected');
            $(this).prev().removeAttr('class');
            $(this).insertBefore($(this).prev());
            $(this).next().hide();
        }
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
        smartSpeed: 700,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsiveClass: true,
        onChange: callback,
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

    owl.on('click', '.owl-item', function(event) {
        var target = $(this).index();
        owl.trigger("to.owl.carousel", [target, 700, true]);
    });

    function callback(event) {

        // console.log("CHANGED")
    }



    // Changing text and img in project item

    owl.on('changed.owl.carousel', function(event) {
        var currentItem = event.item.index;
        var projectImgSm = $(event.target).find(".owl-item").eq(currentItem).find("img").attr('src');
        var projectTitleSm = $(event.target).find(".owl-item").eq(currentItem).find("h2").text();
        var projectTitle = $('.project-info').find('h2');
        var projectImg = $('.project-img img');
        $(projectTitle).text(projectTitleSm)
        $(projectImg).attr('src', projectImgSm);
        // console.log(projectTitleSm)
        // console.log(projectTitle)
        // console.log(projectImgSm)
        // console.log(projectImg)

    })

    // $('.project-sm-info').on('click', function(event) {
    //     var projectTitleSm = $(this).parent().find('h2').text();
    //     var projectImgSm = $(this).parents('.owl-item').find('img').attr('src');
    //     var projectTitle = $('.project-info').find('h2');
    //     var projectImg = $('.project-img img');
    //     console.log(projectTitleSm)
    //     console.log(projectTitle)
    //     console.log(projectImgSm)
    //     console.log(projectImg)
    //     $(projectTitle).text(projectTitleSm)
    //     projectImg.each(function(index, el) {
    //         if (index == 0) {
    //             $(el).attr('src', projectImgSm);
    //         } else {

    //             $(el).attr('src', projectImgSm.substr(0, projectImgSm.length - 4) + '_' + index + '.jpg');
    //         }
    //     });
    // });

    var data = [
        { src: 'static/img/Projects/project1.jpg' },
        { src: 'static/img/Projects/project1_1.jpg' },
        { src: 'static/img/Projects/project1_2.jpg' }
    ];


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