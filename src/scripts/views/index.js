///引入视图
var tplIndex = require('../templates/index.string');
// 利用spa 定义视图
SPA.defineView('index',{
  html:tplIndex,
  plugins: ['delegated'],
  modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['friend', 'search', 'my'], // 定义子视图的列表数组
    defaultTag: 'my', // 定义默认视图
    container: '.l-container' // 子视图的容器
  }],

  bindActions:{
    "switch.tab" : function(e,data){
        //console.log(e);
        $(e.el).addClass("active").siblings().removeClass("active");
      //  console.log(data.tag);
        //console.log(this);
        this.modules.content.launch(data.tag);

    }
  }
})
