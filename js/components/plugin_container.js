
define(
  ['react', 'stores/plugin_store', 'components/plugin'],
  function(React, PluginStore, Plugin) {
    // Get the state from the PluginStore.
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
        // Render the enabled plugin, or render a temporary message.
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

      // Link to the PluginStore events to update the state.
      componentDidMount: function() {
        PluginStore.addEnableListener(this._onEnable);
      },
      componentWillUnmount: function() {
        PluginStore.removeEnableListener(this._onEnable);
      },

      // Event handler for the PluginStore events.
      _onEnable: function() {
        this.setState(getStateFromStore());
      }
    });
  }
);
