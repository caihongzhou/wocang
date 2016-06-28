var tpLDetali = require('../templates/detali.string');
SPA.defineView('detali',{
  html:tpLDetali,

  plugins:['delegated',{
    name:'avalon',
    options:function(vm){
      vm.imgsrc = "";
      vm.title = "";
      vm.detail = "";
      vm.isShowLoading = true;
    }
  }],

  bindActions:{
    'banck-tab':function(e){

      this.hide();
    }
  },

  bindEvents:{
    'show':function(){
      var vm = this.getVM();
      var d = this.param.data;
      //console.log(d);
      $.ajax({
       url:'/wocang/moke/dedali.json',
         data: {
           cardId: d.id
         },
        success: function (rs) {
          var s = rs.data
          //console.log( rs)
          //setTimeout(function () {
            vm.imgsrc = rs.data.userImgUrl;
            vm.title= rs.data.nickName;

            vm.isShowLoading = false;
          //}, 1000);
        }
      })
    }
  }

})
