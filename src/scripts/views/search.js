///引入视图
var tplSearch = require('../templates/search.string');
// 利用spa 定义视图
SPA.defineView('search',{
  html:tplSearch,
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
    }
  }],

  init: {
    vm: null,
    livelistArray: [],
    formatData: function (arr) {
      var tempArr = [];
      for (var i = 0; i < Math.ceil(arr.length/2); i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[2*i]);
        tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },

  bindEvents: {
    'beforeShow': function () {
      var that = this;

      // 获得vm对象
    that.vm = that.getVM();
      $.ajax({
      url:'/wocang/moke/livelist.json',
      //url:' /api/getLivelist.php' ,
        type: 'get',
        date:{
          rtype: 'refresh'
        },
        success: function (rs) {

          that.livelistArray = rs.data;
          that.vm.livelist = that.formatData(rs.data);

            var mySwiper = new Swiper('#srarch-swiper', {
              loop: true,
              pagination: '.swiper-pagination'
            });

        }
      })

    },
    'show': function() {
			var that =this;
			var scrollSize = 30;
			var myScroll = this.widgets.searchScroll;
			myScroll.scrollBy(0, -scrollSize);

			var head = $('.head img'),
				topImgHasClass = head.hasClass('up');
			var foot = $('.foot img'),
				bottomImgHasClass = head.hasClass('down');
			myScroll.on('scroll', function() {
				var y = this.y,
					maxY = this.maxScrollY - y;
				if (y >= 0) {
					!topImgHasClass && head.addClass('up');
					return '';
				}
				if (maxY >= 0) {
					!bottomImgHasClass && foot.addClass('down');
					return '';
				}
			});

			myScroll.on('scrollEnd', function() {
				if (this.y >= -scrollSize && this.y < 0) {
					myScroll.scrollTo(0, -scrollSize);
					head.removeClass('up');
				} else if (this.y >= 0) {
					head.attr('src', '/wocang/images/img/ajax-loader.gif');
					// ajax下拉刷新数据
						$.ajax({
							url: '/api/getLivelist.php',
							data:{
									rtype: 'refash'
							},
							success: function(rs){
								var newArray = rs.data.concat(that.livelistArray);
									that.livelistArray = newArray;
									that.vm.livelist = that.formatData(newArray);
								myScroll.scrollTo(0, -scrollSize);
								head.removeClass('up');
								head.attr('src', '/wocang/images/img/arrow.png');
							}
						})

				}

				var maxY = this.maxScrollY - this.y;
				var self = this;
				if (maxY > -scrollSize && maxY < 0) {
					myScroll.scrollTo(0, self.maxScrollY + scrollSize);
					foot.removeClass('down')
				} else if (maxY >= 0) {
					foot.attr('src', '/wocang/images/img/ajax-loader.gif');
					// ajax上拉加载数据

					$.ajax({
						url: '/api/getLivelist.php',
						data: {
							rtype: 'more'
						},
						success: function(rs) {

							var newArray = that.livelistArray.concat(rs.data);
							that.vm.livelist = that.formatData(newArray);
							that.livelistArray = newArray;
						}
					});

				}
			})
		}

  }
})
