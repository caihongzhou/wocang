var tpllogin = require('../templates/login.string');
SPA.defineView('login', {
  html: tpllogin,
  plugins:['delegated'],
  bindActions:{
    'banck-tab':function(e){
      this.hide()
    }
  }
})
