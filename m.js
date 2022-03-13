jQuery.fn.extend({
    startSlider : function(){
      var that = this;
      var imgSelecter = $(that).find("img");
      var textSelecter = $(that).find(".slider-text");
      var currentIndex = 0;
      var lastIndex = (imgSelecter.length - 1);
      var slideInterval = $(that).data('slidechange-interval');
      var animationInterval = $(that).data('animation-interval');
      var imgDirection = $(that).data('img-direction');
      var textDirection = $(that).data('text-direction');
      var imgPropStart = (imgDirection=="left")?{left:400}:{right:400};
      var imgPropEnd = (imgDirection=="left")?{left:0}:{right:0};
      var textPropStart = (textDirection=="left")?{left:400}:{right:400};
      var textPropEnd = (textDirection=="left")?{left:0}:{right:0};

      imgSelecter.addClass((imgDirection=="left")?"left":"right");
      textSelecter.addClass((textDirection=="left")?"left":"right");

      loop = setInterval(function () {
        currentSlide = currentIndex;
        nextSlide = currentIndex + 1;
        currentIndex++;
        // call animation function
        that.slideAnimate(imgSelecter,currentSlide,nextSlide,imgPropStart,imgPropEnd,animationInterval);
        that.slideAnimate(textSelecter,currentSlide,nextSlide,textPropStart,textPropEnd,animationInterval);
        if(currentIndex >= lastIndex){ // check index.length
          clearInterval(loop); // break setInterval and reset slide img and text index
          currentIndex = 0;
          imgSelecter.eq(currentIndex).addClass("next");
          textSelecter.eq(currentIndex).addClass("next");
          setTimeout(function(){
            that.slideAnimate(imgSelecter,nextSlide,currentIndex,imgPropStart,imgPropEnd,animationInterval);
            that.slideAnimate(textSelecter,nextSlide,currentIndex,textPropStart,textPropEnd,animationInterval);
            setTimeout(function(){that.startSlider();},animationInterval);
          },slideInterval); // end setTimeout
        } // end if
      }, slideInterval); // end setInterval
    },
    slideAnimate : function(select,current,next,start,end,interval){
         // change class
        select.removeClass("active");
        select.eq(current).addClass("active move");
        select.eq(next).addClass("next");
        // animation
        select.eq(current).animate(start,interval,function(){
            select.eq(current).removeClass("active move").removeAttr("style");
        });
        select.eq(next).animate(end,interval,function(){
          select.eq(next).removeClass("next").addClass("active").removeAttr("style");
        });
    }
});
