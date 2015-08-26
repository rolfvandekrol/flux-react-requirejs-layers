define(
  ['require', 'dispatcher', 'constants'],
  function(require, Dispatcher, Constants) {
    var dispatchLoaded = function(name) {
      Dispatcher.dispatch({
        type: Constants.ActionTypes.PLUGIN_LOADED,
        plugin: name
      });
    };

    var dispatchEnable = function(name) {
      Dispatcher.dispatch({
        type: Constants.ActionTypes.PLUGIN_ENABLED,
        plugin: name
      });
    };

    var pluginLoader = function(name, callback) {
      if (require.defined(name)) {
        callback(name);
      } else {
        require([name], function() {
          setTimeout(function() {
            callback(name);
          }, 2000);
        });
      }
    };

    return {
      loadPlugin: function(name) {
        pluginLoader(name, dispatchLoaded);
      },

      enablePluginDirect: function(name) {
        dispatchEnable(name);
      },

      enablePluginAsync: function(name) {
        pluginLoader(name, function(name) {
          dispatchEnable(name);
          dispatchLoaded(name);
        });
      }
    };
  }
);