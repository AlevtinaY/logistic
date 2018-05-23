$(document).ready(function() {
  
  var video = document.querySelector('.js-video'),
      videoBlock = document.querySelector('.main__video-outer');
  if (window.innerWidth > 1100) {
    videoBlock.classList.add('_show');
    video.play();
  }

  // for numbers
      var num = $(".js-num-int");
      var numD = $(".js-num-dub");
      num.each(function(indx, el) {
          var max = $(el).data("max");
          var duration = 3000;

          var visibility = checkViewport('.about');
          $(el).on("animeNum", function() {
              $({n: 0}).animate({n: max}, {
                  easing: "linear",
                  duration: duration,
                  step: function(now, fx) {
                      $(el).html(now | 0)
                  }
              })
          }).data("visibility", visibility);
          visibility && $(el).trigger("animeNum")
      });
      numD.each(function(indx, el) {
          var max = $(el).data("max");
          var duration = 3000;

          var visibility = checkViewport('.about');
          $(el).on("animeNum", function() {
              $({n: 0}).animate({n: max}, {
                  easing: "linear",
                  duration: duration,
                  step: function(now, fx) {
                      $(el).html((now /10).toFixed(1));
                  }
              })
          }).data("visibility", visibility);
          visibility && $(el).trigger("animeNum")
      });

      function checkViewport(str) {
        var el = document.querySelector(str);
        var H = document.documentElement.clientHeight,
          h = el.scrollHeight,
          pos = el.getBoundingClientRect();
          return pos.top + h > 0 && pos.bottom - h < H
      }
      $(window).on('scroll', function() { 
          num.each(function(indx, el) {
              var visibility = checkViewport('.about');
              el = $(el);
              var old = el.data("visibility");
              old != visibility && el.data("visibility", visibility) && !old && el.trigger("animeNum")
          });
          numD.each(function(indx, el) {
              var visibility = checkViewport('.about');
              el = $(el);
              var old = el.data("visibility");
              old != visibility && el.data("visibility", visibility) && !old && el.trigger("animeNum")
          });
      });



  $('.js-sticky-close').click(function(e) {
    e.preventDefault();
    $(this).parent().addClass('_hide');
  });  

  $('.js-reviews-show').click(function(e) {
    e.preventDefault();
    $(this).slideUp();

      $('.reviews__btn-write').addClass('reviews__btn-write--open')
      $('.reviews__list').addClass('reviews__list--open');
  });

  $('.js-menu-open').on('click', function(e) {
    $('.header__nav').toggleClass('header__nav--open');
  });

  $('.nav__href').on('click', function(e) {
    if($('.header__nav').hasClass('header__nav--open'))
      $('.header__nav').removeClass('header__nav--open');
  });

  $('.mfp-close-video').on('click', function(e) {
    $.magnificPopup.close();
  });
    


    // SLIDERS
    if($(window).width() > 575) {
      var owl = $('.js-service-slider');
      owl.owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        autoHeight: true,
        animateOut: 'fadeOut',
        dots: true,
        navText: ['<span class="service__array service__array--prev"></span>', '<span class="service__array service__array--next"></span>']
      });

      $('.service__slider-item').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
       
        $('.service__slider-item').removeClass('service__slider-item--active');
        $(this).addClass('service__slider-item--active');
      });

      // Go to the next item
      $('.service__array--next').click(function() {
          parentNum = $('.service__slider-item--active').index() + 1;
          
          if(parentNum >= $('.service__slider-item').length) {
            parentNum = 0;
          }

          $('.service__slider-item--active').removeClass('service__slider-item--active');
          $('.service__slider-item').eq(parentNum).addClass('service__slider-item--active');
      });

      // Go to the previous item
      $('.service__array--prev').on('click', function() {
          parentNum = $('.service__slider-item--active').index() - 1;
          
          if(parentNum < 0) {
            parentNum =  $('.service__slider-item').length - 1;
          }

          $('.service__slider-item--active').removeClass('service__slider-item--active');
          $('.service__slider-item').eq(parentNum).addClass('service__slider-item--active');
      });

      // Dot clivk
      $('.js-service-slider .owl-dot').on('click', function() {
          index = $(this).index();

            $('.service__slider-item--active').removeClass('service__slider-item--active');
            $('.service__slider-item').eq(index).addClass('service__slider-item--active');
      });
    } else {
      $('.js-service-slider').removeClass('owl-carousel');
    }

    $('.js-offices-slider').owlCarousel({
      items: 1,
      nav: true,
      autoHeight: true,
      navText: ['<span class="offices__array _prev"></span>', '<span class="offices__array _next"></span>']
    });

    $('.js-staff-slider').owlCarousel({
      items: 3,
      nav: true,
      // autoHeight: true,
      navText: ['<span class="staff-array staff-array--prev"></span>', '<span class="staff-array staff-array--next"></span>'],
      responsive : {
          // breakpoint from 0 up
          0 : {
              items: 1
          },
          700 : {
              items: 2
          },
          992 : {
              items: 3 
          }
      }
    });
    
    // меню и др кнопки
    $('.clients__item').hover(
      function() {
        $(this).find('.clients__pop-up').addClass('clients__pop-up--show');
      }, function() {
        $(this).find('.clients__pop-up').removeClass('clients__pop-up--show');
      }
    );

    $('.gar').on('click', function() {
      $('.gar__block--show').removeClass('gar__block--show');
    });

    $('.js-gar-show').hover(function(e) {
      // $('.gar__block--show').removeClass('gar__block--show');
      $('.gar__block').eq($(this).index()).addClass('gar__block--show');
      // e.stopPropagation(); // Отмена всплытия
    }, function() {
      $('.gar__block').eq($(this).index()).removeClass('gar__block--show');
    });
    
    $('.js-gar-show').mousemove(function( e ) {
        var w = $(this).width()/2;
        var h = $(this).height()/2;
        var pos = $(this).offset();

        // положение курсора внутри элемента
        var x = e.pageX - pos.left;
        var y = e.pageY - pos.top;
        
        // расстояние на которое нужно подвинуть (чтобы совместить центр с курсором мыши)
        var toY = h-y;
        var toX = w-x;

        // радиус большего круга
        var R = Math.sqrt(w*w + h*h);

        // радиус круга на котором находится курсор мыши
        var r = Math.sqrt(toY*toY + toX*toX);
        var k1 = 42/r;
        var k2 = 1.2;

        if(r< R*0.9) {
          k2 = r/R;
          // для того чтобы курсор мыши приближался пропорционально..
        }

        toY -=  k2*k1*toY ;
        toX -=  k2*k1*toX ;

        $(this).children('span').css('transform', 'translate('+ -toX +'px, '+ -toY +'px) scale(1.15, 1.15)');
      });

   $('.js-gar-show').mouseleave(function( e ) {
      $(this).children('span').css('transform', 'translate(0, 0)');
    });

    // работа с формами

    $('.js-form').submit(function(e) {
      e.preventDefault();

      if($(this).data(num)) {
        var num = parseInt($('.js-hair-free-num').text());

        if(num > 0) {
          $('.js-hair-free-num').text(num - 1);
        }
      }
      $.ajax({
        type:'get',//тип запроса: get,post либо head
        url:'mail.php',//url адрес файла обработчика
        data: $(this).serialize()//,
      });

      $(this).children('input, textarea').each(function(index, elem) {
         $(elem).val('');
      });

      $.magnificPopup.close();
  });

    // POP-UPS

    $('.js-open-img').magnificPopup({
      type: 'image',
      closeMarkup: '<span class="mfp-close"></span>'
    }); 

    $('.js-open-pp').magnificPopup({
      type: 'inline',
      preloader: true,
      closeMarkup: '<span class="mfp-close"></span>' //,
    });

    $('.js-video-pp').magnificPopup({
      type: 'iframe',
      removalDelay: 50,
      preloader: true,
      fixedContentPos: false,
      closeMarkup: '<span class="mfp-close mfp-close-video"></span>'
    });

    var prevPopUp;
    var popUpClose = $('.pop-up-agree-close');

    $('.js-open-agree').on('click', function(){
      prevPopUp = $(this).data('close');
      popUpClose.attr('href', prevPopUp);
    });

    $('.js-open-agree').magnificPopup({
      type: 'inline',
      preloader: true
    });
    
    $('.magnific-youtube').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 250,
      preloader: false,
      fixedContentPos: false
    });

    // 
     $('.form-number').inputmask({
      mask: '+79999999999',
      showMaskOnHover: false,
      showMaskOnFocus: true
    });


    $('[href="#"]').on('click', function(e) {
      e.preventDefault();
    });

    // CUSTOM SCROLL 

    $(window).on('scroll', function() {
      if(checkViewport('.staff')) {
        $('.staff__title').addClass('staff__title--animate');
      } else {
        $('.staff__title').removeClass('staff__title--animate');
      } 

      if(checkViewport('.main')) {
          $('.main__title').addClass('main__title--animate');
      } else {
        $('.main__title').removeClass('main__title--animate');
      } 

      if(checkViewport('.faq')) {
          $('.faq__subtitle').addClass('faq__subtitle--animate');
      } else {
        $('.faq__subtitle').removeClass('faq__subtitle--animate');
      } 
    });

    var w = $(window).width();
    var h = $(window).height();
    var wrap = $('.offices__wrap');

    var b1 = 0;
    var b2 = 0;
    var b3 = 0;
    var b4 = 0;
    var x1 = 0;
    var x2 = 0;
    var y = 0;
    var y2 = 0;
    var moveBlock = $('.offices');


  if(w > 1280) {
    wrap.css('height' , w*2+2*h);
    $(window).on('scroll', function(e) {

        if($(window).scrollTop()  >=  wrap.offset().top && $(window).scrollTop()  <=  wrap.offset().top+wrap.height() ) {
          moveBlock.css('position', 'fixed');

            if($(window).scrollTop() < wrap.offset().top+w) {
                if(b1) {
                  x1 +=  window.pageYOffset - b1;
                  moveBlock.css('transform', 'translate(' + -x1 + 'px, 0px)');

                  b1 = window.pageYOffset;
                } else {
                  b1 = window.pageYOffset;
                }

                if($(window).scrollTop() > wrap.offset().top+w/2) {
                  $('.office__map-samolet-1').addClass('office__map-img--animate');
                }
            }
            else if($(window).scrollTop() < wrap.offset().top + w + h) {
                if(b2) {
                  y +=  window.pageYOffset - b2;
                  moveBlock.css('transform', 'translate(' + -x1 + 'px,'+ -y +'px)');

                  b2 = window.pageYOffset;
                } else {
                  b2 = window.pageYOffset;
                }

                if($(window).scrollTop() > wrap.offset().top+w+h/2) {
                  $('.office__map-down').addClass('office__map-img--animate');
                }
            } else if ($(window).scrollTop() < wrap.offset().top + w*2 + h) {
                if(b3) {
                  x2 +=  window.pageYOffset - b3;
                  moveBlock.css('transform', 'translate(' + (-x1+x2) + 'px,'+ -y +'px)');

                  b3 = window.pageYOffset;
                } else {
                  b3 = window.pageYOffset;
                }

                if($(window).scrollTop() > wrap.offset().top+h+3*w/2) {
                  $('.office__map-samolet-2').addClass('office__map-img--animate');
                }
            } else {
              if(b4) {
                y2 +=  window.pageYOffset - b4;
                moveBlock.css('transform', 'translate(' + (-x1+x2) + 'px,'+ (-y+y2) +'px)');

                b4 = window.pageYOffset;
              } else {
                b4 = window.pageYOffset;
              }
            }
          

        } else {
            moveBlock.css('position', 'absolute');
        }
      });
  } else {
    wrap.addClass('offices__wrap--mb');
  }

});





