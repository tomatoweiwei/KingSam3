/*------------------------------------------------------------------------------
    JS Document (https://developer.mozilla.org/en/JavaScript)

    project:    Hello World!
    created:    2015-07-23
    author:     Christophe ANDRIEU (http://www.stpo.fr)

    summary:    CONSTANTES
                UTILITIES
                DOCUMENT.READY
                WINDOW.LOAD
                EASIN_CUSTOMZ
                SCROLL_TO
                PLANE_AND_STEPS
----------------------------------------------------------------------------- */

;(function($, undefined){

    //
    // == CONSTANTES
    // --------------------------------------------------
    $.noConflict();

    var d = document,
        w = window,
        stpo = {};


    //
    // == UTILITIES
    // --------------------------------------------------
    var log = function(x) {
        if (typeof console != 'undefined') {
            console.log(x);
        }
    };


    //
    // == DOCUMENT.READY
    // --------------------------------------------------
    // This is executed when HTML-Document is loaded and DOM is ready.
    $(d).ready(function(){

        stpo.scrollTo();                // back to top button behaviour
        stpo.gifMe();                   // if not touch screen serve gifs

    });


    //
    // == WINDOW.ONLOAD
    // --------------------------------------------------
    //  This is executed when complete page is fully loaded, including all frames, objects and images.
    $(w).load(function(){

        stpo.plane();                   // on your way, like an eagle

    });


    //
    // == EASIN_CUSTOMZ
    // --------------------------------------------------
    // This extends the easing methods of jQuery with a fanciest one.
    $.extend( $.easing,{
        def: 'easeOutExpo',
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        }
    });


    //
    // == SCROLL_TO
    // --------------------------------------------------
    // This function enables smooth scrolling when clicking links bearing the `link-scroll-to-anchor` class.
    // It is used, for example, for the links `back to top`.
    // It relies on the `easeOutExpo` easing defined above.
    stpo.scrollTo = function(){

        var $body = $('html, body'),
            $links = $('.link-scroll-to-anchor');

        $links.each(function(){

            var $this = $(this),
                href = $this.attr('href');

            // click
            $this.on('click', function(){

                $links.filter('.active').removeClass('active');
                $this.addClass('active');

                $body.stop().animate({

                    scrollTop: $(href).offset().top

                }, 1000, 'easeOutExpo', function(){

                    // nothun' dude

                });

                $this.blur();
                return false;
            });
        });
    };


    //
    // == GIF_ME
    // --------------------------------------------------
    // This function changes image sources to gif when needed on desktop.
    stpo.gifMe = function(){

        if (!('ontouchstart' in document.documentElement)){

            var $imgs = $('.gif-me');

            $imgs.each(function(){

                $(this)[0].src = $(this)[0].src.replace(/\.png/g, '.gif');

            });

        }
    };


    //
    // == PLANE_AND_STEPS
    // --------------------------------------------------
    // This function makes the plane fly and shows the steps on scroll.
    stpo.plane = function() {

        var $core = $('#flying-zone'),
            $plane = $('#plane'),
            planeH = $plane.outerHeight(),
            $parent = $plane.parent(),
            parentT = $parent.offset().top,
            parentH = $parent.outerHeight(),

            $steps = $('.step'),
            offsetTopValues = [],
            sections = [],

            init = function(){

                // store steps offset
                $steps.each(function(){
                    offsetTopValues.push(parseInt($(this).offset().top));
                });

                // build sections array
                for (i=0; i<$steps.length; i++) {

                    if (i == $steps.length-1) sections.push([offsetTopValues[i], $(d).height()]);
                    else sections.push([offsetTopValues[i], offsetTopValues[i+1]]);

                }

            },

            onScroll = function(){

                // plane
                if ($(w).scrollTop() > (parentT - (parseInt($(w).height()) / 2)) + 250){

                    // not take-off
                    if ($(w).scrollTop() > parentT + parentH - (parseInt($(w).height()) / 2)){
                        // landing
                        $plane.removeClass('flying take-off').addClass('landing');
                    }
                    else{
                        // flying
                        $plane.removeClass('landing take-off').addClass('flying');
                    }
                }
                else {
                    // default (take-off)
                    $plane.removeClass('flying landing').addClass('take-off');
                }

                // steps
                var windowTop = $(w).scrollTop() + (parseInt($(w).height()) / 1.25); // 1.25 feels better than 2

                for (var i in sections){

                    if ((parseInt(sections[i][0]) < parseInt(windowTop)) && (parseInt(windowTop) < parseInt(sections[i][1]))){

                        // this also shows the steps before the one we're on
                        for (var j = 0; j <= i; j++){
                            $steps.eq(j).addClass('active');
                        }

                    }
                }
            };

        // init
        init();

        // bind onScroll
        $(d).off('scroll').on('scroll', onScroll);
        onScroll();

    };

})(jQuery);
