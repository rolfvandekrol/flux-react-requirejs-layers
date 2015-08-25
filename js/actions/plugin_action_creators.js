define(
  ['require', 'dispatcher', 'constants'],
  function(require, Dispatcher, Constants) {
    return {
      loadPlugin: function(name) {
        if (require.defined(name)) {
          Dispatcher.dispatch({
            type: Constants.ActionTypes.PLUGIN_LOADED,
            plugin: name
          });
        } else {
          require([name], function() {
            setTimeout(function() {
              Dispatcher.dispatch({
                type: Constants.ActionTypes.PLUGIN_LOADED,
                plugin: name
              });
            }, 2000);
          });
        }
      }
    };
  }
);