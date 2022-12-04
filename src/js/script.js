$(document).ready(function(){

    $('.carousel__inner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1200,
      prevArrow: '<button type="button" class="prev"><img src="images/icons/left.svg"></button>',
      nextArrow:' <button type="button" class="next"><img src="images/icons/right.svg"></button> ',
      autoplay: true,
      autoplaySpeed: 500,
      arrows: false,

      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,

          }
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ]
      

    });
  
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
    })
  })

  $('.catalog-item__back').each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
    });

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
  
    });
    });
  
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
  
    $('.button__catalog').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });

    
    function valideForms(form){
      $(form).validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required:true,
            email:true,
          }
        },
        messages: {
          name: "Пожалуйста,введите своё имя",
          phone:'Пожалуйста,введите свой номер телефон',
          email: {
            required: "Нам нужен ваш адрес для того чтобы связаться с вами",
            email: "Ваш адрес не соответствует правильному формату"
          }
        }
      });
    };

    valideForms('#order-form'),
    valideForms('#consultation-form'),
    valideForms('.feed-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();

      if(!$(this).valid()) {
        return;
      };


      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    // Scroll and pageup

    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else{
        $('.pageup').fadeOut();
      }
    });


    $('a[href^="#"').on('click', function() {

      let href = $(this).attr('href');

      $('html, body').animate({
          scrollTop: $(href).offset().top
      });
      return false;
    });

    new WOW().init();


  });

  




  // // Modal

  // $('[data-modal=consultation]').on('click', function() {
  //   $('.overlay, #consultation').fadeIn('slow');

  // });
  // });

  // $('.modal__close').on('click', function() {
  //   $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  // });


  // $('.button__catalog').on('click', function() {
  //   $('.overlay, #order').fadeIn('slow');
  // });
  
  



