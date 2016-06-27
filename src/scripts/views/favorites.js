var tplfavorites = require('../templates/favorites.string');
SPA.defineView ('favorites',{
  html:tplfavorites,
  plugins:['delegated'],
  bindActions:{
    'banck-tab':function(e){
      
      this.hide()
    }
  }
})
