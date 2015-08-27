

define(
  ['react', 'stores/plugin_store', 'actions/plugin_action_creators', 'require'],
  function(React, PluginStore, Actions, require) {
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

      componentDidMount: function() {
        PluginStore.addLoadListener(this._onLoad);
      },

      componentWillUnmount: function() {
        PluginStore.removeLoadListener(this._onLoad);
      },

      componentWillMount: function() {
        if (!this.state.loaded) {
          Actions.loadPlugin(this.props.plugin);
        }
      },

      componentWillReceiveProps: function(props) {
        var new_state = getStateFromStore(props.plugin);
        this.setState(new_state);

        if (!new_state.loaded) {
          Actions.loadPlugin(props.plugin);
        }

      },

      _onLoad: function() {
        this.setState(getStateFromStore(this.props.plugin));
      }
    });
  }
);