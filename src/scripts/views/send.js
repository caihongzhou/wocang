var tplsend = require('../templates/send.string');
SPA.defineView('send', {
  html: tplsend,
  styles:{
    background:  ' transparent !important'
  },
plugins: ['delegated']
})
