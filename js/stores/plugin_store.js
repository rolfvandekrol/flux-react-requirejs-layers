
define(
  ['fbemitter', 'dispatcher', 'constants'], 
  function (fbemitter, Dispatcher, Constants) {
    // Constants for the internal event names.
    var LOAD_EVENT = 'load';
    var ENABLE_EVENT = 'enable';

    // Internal storage variables.
    var _plugins = [];
    var _enabled = null;

    // Initialize the EventEmitter.
    var events = new fbemitter.EventEmitter();

    // Emit the load event.
    var emitLoad = function() {
      events.emit(LOAD_EVENT);
    };
    var emitEnable = function() {
      events.emit(ENABLE_EVENT);
    };

    var API = {
      // Event methods for the plugin loaded storage.
      addLoadListener: function(callback) {
        events.addListener(LOAD_EVENT, callback);
      },
      removeLoadListener: function(callback) {
        events.removeListener(LOAD_EVENT, callback);
      },

      // Check if a plugin is loaded.
      loaded: function(name) {
        return (_plugins.indexOf(name) !== -1);
      },
      // Mark a plugin as loaded.
      setLoaded: function(name) {
        _plugins.push(name);
        emitLoad();
      },

      // Event methods for the plugin enable storage.
      addEnableListener: function(callback) {
        events.addListener(ENABLE_EVENT, callback);
      },
      removeEnableListener: function(callback) {
        events.removeListener(ENABLE_EVENT, callback);
      },

      // Check which plugin is enabled.
      enabled: function() {
        return _enabled;
      },
      // Mark a plugin as enabled.
      enable: function(name) {
        _enabled = name;
        emitEnable();
      }
    };

    // Link the storage to the Dispatcher.
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
  }
);
