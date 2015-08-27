
define(
  ['require', 'dispatcher', 'constants'],
  function(require, Dispatcher, Constants) {
    // Helper function to push the PLUGIN_LOADED action through the dispatcher.
    var dispatchLoaded = function(name) {
      Dispatcher.dispatch({
        type: Constants.ActionTypes.PLUGIN_LOADED,
        plugin: name
      });
    };

    // Helper function to push the PLUGIN_ENABLED action through the dispatcher.
    var dispatchEnable = function(name) {
      Dispatcher.dispatch({
        type: Constants.ActionTypes.PLUGIN_ENABLED,
        plugin: name
      });
    };

    // Helper function to load a require.js module and run a callback, after it
    // has been loaded.
    var pluginLoader = function(name, callback) {
      if (require.defined(name)) {
        callback(name);
      } else {
        require([name], function() {
          // We do a setTimeout here, to mimic the effect of a slow internet
          // connection.
          setTimeout(function() {
            callback(name);
          }, 2000); // 2 seconds
        });
      }
    };

    return {
      // This action is meant to be triggered from the React Component that 
      // handles the rendering of the plugin and is mainly important to aid the
      // Direct loading logic.
      loadPlugin: function(name) {
        pluginLoader(name, dispatchLoaded);
      },

      // Simply enable the plugin and let the plugin handle the loading of the
      // required modules.
      enablePluginDirect: function(name) {
        dispatchEnable(name);
      },

      // First make sure the required module is loaded and then enable the
      // plugin.
      enablePluginAsync: function(name) {
        pluginLoader(name, function(name) {
          dispatchLoaded(name);
          dispatchEnable(name);
        });
      }
    };
  }
);
