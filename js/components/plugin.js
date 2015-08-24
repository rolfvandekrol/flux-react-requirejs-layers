

define(
  ['react', 'stores/plugin_store'],
  function(React, PluginStore) {
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
        var today = new Date();
        var d = today.toISOString();
        return (
          <div className="plugin">
            {d + " " + this.props.plugin + " " + (this.state.loaded ? "loaded" : "unloaded")}
          </div>
        );
      },

      componentDidMount: function() {
        PluginStore.addLoadListener(this._onLoad);
      },

      componentWillUnmount: function() {
        PluginStore.removeLoadListener(this._onLoad);
      },

      _onLoad: function() {
        this.setState(getStateFromStore(this.props.plugin));
      }
    });
  }
);