
define(['fbemitter', 'dispatcher', 'constants'], function (fbemitter, Dispatcher, Constants) {
  var LOAD_EVENT = 'change';

  var _plugins = [];

  var events = new fbemitter.EventEmitter();

  var API = {
    emitLoad: function() {
      events.emit(LOAD_EVENT);
    },
    addLoadListener: function(callback) {
      events.addListener(LOAD_EVENT, callback);
    },
    removeLoadListener: function(callback) {
      events.removeListener(LOAD_EVENT, callback);
    },

    loaded: function(name) {
      return (_plugins.indexOf(name) !== -1);
    },

    setLoaded: function(name) {
      _plugins.push(name);
      API.emitLoad();
    }
  };

  API.dispatchToken = Dispatcher.register(function(action) {
    switch(action.type) {
      case Constants.ActionTypes.PLUGIN_LOADED:
        API.setLoaded(action.plugin);
        break;
    }
  });

  return API;
});