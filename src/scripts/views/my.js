///引入视图
var tplMy = require('../templates/my.string');
// 利用spa 定义视图
SPA.defineView('my', {
	html: tplMy,

	plugins: ['delegated', {
		name: 'avalon',
		options: function(vm) {
			vm.livelist = []; //定义视图数据
		}
	}],

	init: {
		vm: null,

		livelistArray: [],

		formatData: function(arr) {
			var tempArr = [];
			for (var i = 0; i < Math.ceil(arr.length / 2); i++) {
				tempArr[i] = [];
				tempArr[i].push(arr[2 * i]);
				tempArr[i].push(arr[2 * i + 1]);
			}
			return tempArr;
		}
	},
	bindActions:{
		"goto.tab":function(e){

			SPA.open('login')
		},
		"detali.tab":function(e,data){
			//console.log(1);

			SPA.open('detali',{
				param: {
					data:data
				}
			})

		},
		"favorites.tab":function(e){

			SPA.open('favorites')
		},
		"send.tab":function(e){

			SPA.open('send',{
				ani:{
					name:'dialog',
					 autoHide: true,

				//	maskColor: "#f00",
					height: 250,
					maskColor:'rgba(250,250,250,0.9)'



				}
			})
		}

	},

	bindEvents: {

		'beforeShow': function() {
			var that = this;

				var date =new Date();
				var moth=date.getMonth()+1
				var time = date.getFullYear()+"-"+moth+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds();
					//	console.log(time);
//
// 			console.log(date.toLocaleDateString());
// console.log(date.toLocaleTimeString());
// console.log(date.toGMTString());
// console.log(date.toTimeString());
// console.log(date.getMilliseconds());//毫秒数
// console.log(date.getSeconds());//秒数
// console.log(date.getMinutes());//分钟数
// console.log(date.getHours());//xiaoshi
// console.log(date.getDate());
// console.log(date.getMonth()+1);
// console.log(date.getFullYear());
			// 获得vm对象

			  that.vm = that.getVM()
			$.ajax({
				 url:'/wocang/moke/livelist.json',
			//	url:"https://localhost:8443/1.0/usercards/all?page=0",
			//url:"https://api.mystarcloud.com/1.0/usercards/all?page=1&time="+time,
			//	url: '/api/getLivelist.php\?rtype=origin',
				type: 'GET',
				date: {
					// page: '0',
					// time:time
					rtype :'origin'
				},
				// headers:{
				// 	connection.setRequestProperty("SCApplication-Id", "application/json");
				// 	connection.setRequestProperty("SCApplication-Key", "application/json");
				// 	connection.setRequestProperty("Accept-Encoding", "gzip");
				// 	connection.setRequestProperty("device", "web");
				// 	connection.setRequestProperty("userId", MIUser.getCurrentId());
				// 	connection.setRequestProperty("Content-Type", "application/json");
				// },
				success: function(rs) {
				//	console.log(rs);
					that.livelistArray = rs.data;
					that.vm.livelist = that.formatData(rs.data);
				}
			})

		},
		'show': function() {
			var that =this;
			var scrollSize = 30;
			var myScroll = this.widgets.homeHotScroll;
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
						 url:'/wocang/moke/refash.json',
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
					 url:'/wocang/moke/livelist-more.json',
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
			var	onn=true;
		$(".display-show").on('click',function(){

				if(onn){
						$('.lookup').addClass('show');
						onn=false;
				}else if(onn == false){

					$('.lookup').removeClass('show');
					onn = true;
				}

			})

		}

	}

});
