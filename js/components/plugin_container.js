

define(
  ['react', 'stores/plugin_store', 'components/plugin'],
  function(React, PluginStore, Plugin) {
    var getStateFromStore = function() {
      return {
        plugin: PluginStore.enabled()
      };
    };

    return React.createClass({
      displayName: 'PluginContainer',

      getInitialState: function() {
        return getStateFromStore();
      },

      render: function() {
        if (this.state.plugin) {
          return (
            <div className="plugin-container">
              <Plugin plugin={this.state.plugin} />
            </div>
          );
        } else {
          return (
            <div className="plugin-container">
              No plugin selected yet.
            </div>
          );
        }
      },

      componentDidMount: function() {
        PluginStore.addEnableListener(this._onEnable);
      },

      componentWillUnmount: function() {
        PluginStore.removeEnableListener(this._onEnable);
      },

      _onEnable: function() {
        this.setState(getStateFromStore());
      }
    });
  }
);