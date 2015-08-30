
define(
  ['react', 'stores/plugin_store', 'actions/plugin_action_creators', 'require'],
  function(React, PluginStore, Actions, require) {
    // Get the state from the PluginStore.
    var getStateFromStore = function(plugin) {
      return {
        loaded: PluginStore.loaded(plugin)
      };
    };

    return React.createClass({
      displayName: 'Plugin',

      propTypes: {
        plugin: React.PropTypes.string.isRequired
      },

      getInitialState: function() {
        return getStateFromStore(this.props.plugin);
      },

      render: function() {
        // Render the plugin if it is loaded. Otherwise, just render a loading
        // message.
        if (this.state.loaded) {
          return (
            <div className="plugin">
              {React.createElement(require(this.props.plugin), null)}
            </div>
          );
        } else {
          return (
            <div className="plugin-loading">
              Loading...
            </div>
          );
        }
      },

      // Link to the PluginStore events to update the state.
      componentDidMount: function() {
        PluginStore.addLoadListener(this._onLoad);
        this._triggerLoad();
      },
      componentWillUnmount: function() {
        PluginStore.removeLoadListener(this._onLoad);
      },

      // Regenerate the state when the props change, and run the same logic as
      // in componentWillMount.
      componentWillReceiveProps: function(props) {
        this.setState(getStateFromStore(props.plugin));
      },

      componentDidUpdate: function(prevProps, prevState) {
        this._triggerLoad();
      },

      // Event handler for the PluginStore events.
      _onLoad: function() {
        this.setState(getStateFromStore(this.props.plugin));
      },

      // Trigger the load Action
      _triggerLoad: function() {
        // Try to load the plugin, if it is not loaded yet. This is only used in
        // the Direct loading logic.
        if (!this.state.loaded) {
          Actions.loadPlugin(this.props.plugin);
        }
      }
    });
  }
);
