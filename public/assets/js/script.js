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


$('.tab').on('click', function(e){
  e.preventDefault();
  $('.tab').removeClass('active')
  $(this).addClass('active')

  if($(this).hasClass('content-1')){
    $('.tab-content').removeClass('active')
    $('.tab-content.content-1').addClass('active')
  }else if($(this).hasClass('content-2')){
    $('.tab-content').removeClass('active')
    $('.tab-content.content-2').addClass('active')
  }else if($(this).hasClass('content-3')){
    $('.tab-content').removeClass('active')
    $('.tab-content.content-3').addClass('active')
  }
  else if($(this).hasClass('content-4')){
    $('.tab-content').removeClass('active')
    $('.tab-content.content-4').addClass('active')
  }
});



$(window).scroll(function () {
  if ($(window).scrollTop() > 800) {
      $('#toTop').addClass('active');
  } else {
      $('#toTop').removeClass('active');
  }
 
});
$('#toTop').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
      scrollTop: 0
  }, '500');
  }); 

  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 3000,
    },
    speed: 2000,
    loop: true,
  });
});

