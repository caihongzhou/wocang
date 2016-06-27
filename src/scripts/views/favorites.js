var tplfavorites = require('../templates/favorites.string');
SPA.defineView ('favorites',{
  html:tplfavorites,
  plugins:['delegated'],
  init:{
    favoritesSwiper:null
  },
  bindActions:{
    'banck-tab':function(e){

      this.hide()
    },
    'tap.favorites.slide': function (e, data) {

     this.favoritesSwiper.slideTo($(e.el).index());

    },

  },
  bindEvents:{
    show:function(){
      this.favoritesSwiper = new Swiper('#favorites-swiper', {
        loop: false,
        onSlideChangeStart: function (swiper) {
        var index = swiper.activeIndex;
        
        var $lis = $('#favorites li span');
          $($lis.eq(index)).addClass("active").parent('li').siblings().find('span').removeClass("active")
      }
      });
    }
  }
})
