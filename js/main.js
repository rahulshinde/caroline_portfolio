Site = {}

$(document).ready(function(){
  Site.body = $('body');

  Site.image_width = 0

  var font_size = parseInt($('html').css('font-size'));

  Site.window_height   = $(window).height();
  Site.document_height = $(document).height() - Site.window_height;
  Site.window_width = $(window).width();

  if (Site.body.hasClass('project_page')){
    $(document).imagesLoaded(function(){
      $('.project_image').each(function(){
        Site.image_width = Site.image_width + $(this).outerWidth() + font_size;
      });
    })

    if (Site.window_width > 1050){
      Site.image_width = Site.image_width - Site.window_width + (6 * font_size);
    } else{
      Site.image_width = Site.image_width - Site.window_width + (2 * font_size);
    }

    $(window).on('scroll', Site.scrollProject);
  }

  Site.current_slide = 0;
  Site.slideshow_length = $('.works_image_container').length - 1;

  $('.works_image_container').on('click', Site.openImage);
  $('#slideshow_close').on('click', Site.closeImage);
  $('#arrow_left').on('click', Site.slideshowPrev);
  $('#arrow_right').on('click', Site.slideshowNext);
})

Site.scrollProject = function(){
  var scroll = $(document).scrollTop();
  Site.scroll_position = scroll/Site.document_height * Site.image_width;
  console.log(scroll);
  console.log(Site.scroll_position);
  console.log('----------');
  console.log(Site.document_height);
  $('#works_wrapper').css('transform', 'translateX(-' + Site.scroll_position  + 'px)')
}

Site.openImage = function(){
  Site.current_slide = $(this).data('slide');

  $('#image_wrapper').css('background-image', 'url(' + $(this).data('image') + ')')
  $('#slideshow_container').addClass('open');
}

Site.closeImage = function(){
  $('#slideshow_container').removeClass('open');
}

Site.slideshowPrev = function(){
  Site.current_slide --;
  if (Site.current_slide < 0){
    Site.current_slide = Site.slideshow_length;
  }

  Site.setSlide();
}

Site.slideshowNext = function(){
  Site.current_slide ++;
  if (Site.current_slide > Site.slideshow_length){
    Site.current_slide = 0;
  }
  
  Site.setSlide();
}

Site.setSlide = function(){
  var image = $('.works_image_container')[Site.current_slide]
  var background_image = $(image).data('image');
  $('#image_wrapper').css('background-image', 'url(' + background_image  + ')');
}