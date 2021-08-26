$(document).ready(() => {
  $('.menu-item').on('mouseover',function()  {
    $(this).find('.sub-menu').addClass('active');
  });

  $('.menu-item').on('mouseleave',function()  {
    $(this).find('.sub-menu').removeClass('active');
  });

  $('#user-login').on('click', function () {
    $('.login-popup').show(300)
    $('.login-popup').addClass('active')

})

$(document).mouseup(function (e) {
    if ($('.login-popup').hasClass('active') && !$('.login-inner').is(e.target) && $('.login-inner')
        .has(e.target).length === 0) {
        $('.login-popup').removeClass('active');
        $('.login-popup').hide(300)

    }
});

$('.popup-close').on('click',() => {
  $('.login-popup').hide(300)
});

  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 3000,
    },
    speed: 2000,
    // Optional parameters
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});

