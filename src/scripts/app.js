

 require('./lib/spa.min.js');//引入spa类库
 require('./lib/swiper-3.3.1.min.js');
 require('./lib/moment.min.js');
 // require('./lib/iscroll-probe.js');//引入iscroll
//引入试图
require('./views/guide.js');
require('./views/favorites.js');

require('./views/login.js');
require('./views/my.js');
require('./views/send.js')
require('./views/search.js');
require('./views/friend.js');
require('./views/detali.js');

require('./views/index.js');

SPA.config({
  indexView: 'guide'
});
