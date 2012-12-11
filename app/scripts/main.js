require.config({

  shim: {
    'underscore' : {exports: '_' },
    'backbone' : { deps : ['underscore'], exports: 'Backbone'},
    'handlebars' : { exports: 'Handlebars' },
    'tyler' : { deps : ['backbone'] }
  },

  paths: {
    jquery: 'vendor/jquery.min',
    backbone: 'vendor/backbone',
    underscore: 'vendor/underscore',
    handlebars: 'vendor/handlebars',
    text : 'vendor/text',
    tyler : 'vendor/backbone.tyler',
    models: 'models',
    views: 'views',
    templates: '../templates'
  }

});

require(['app'], function(app) {
});
