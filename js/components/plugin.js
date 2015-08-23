

define(
  ['react', 'stores/plugin_store'],
  function(React, PluginStore) {
    return React.createClass({
      displayName: 'Plugin',
      render: function() {
        return (
          <div className="plugin">
            Plugin
          </div>
        );
      }
    });
  }
);