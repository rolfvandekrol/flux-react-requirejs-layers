
define(['fbemitter', 'dispatcher', 'constants'], function (fbemitter, Dispatcher, Constants) {
  var LOAD_EVENT = 'load';
  var ENABLE_EVENT = 'enable';

  var _plugins = [];
  var _enabled = null;

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
    },

    emitEnable: function() {
      events.emit(ENABLE_EVENT);
    },
    addEnableListener: function(callback) {
      events.addListener(ENABLE_EVENT, callback);
    },
    removeEnableListener: function(callback) {
      events.removeListener(ENABLE_EVENT, callback);
    },

    enabled: function() {
      return _enabled;
    },
    enable: function(name) {
      _enabled = name;
      API.emitEnable();
    }
  };

  API.dispatchToken = Dispatcher.register(function(action) {
    switch(action.type) {
      case Constants.ActionTypes.PLUGIN_LOADED:
        API.setLoaded(action.plugin);
        break;
      case Constants.ActionTypes.PLUGIN_ENABLED:
        API.enable(action.plugin);
        break;
    }
  });

  return API;
});