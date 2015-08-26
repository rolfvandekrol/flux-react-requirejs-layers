
define(
  ['react', 'actions/plugin_action_creators'],
  function(React, Actions) {
    var ASYNC = 'async';
    var DIRECT = 'direct';

    return React.createClass({
      displayName: 'PluginButtons',
      render: function() {
        return (
          <div className="plugin-buttons">
            <button 
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin1"
              data-plugin-loader={DIRECT}
            >Plugin 1 Direct</button>
            <button
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin1"
              data-plugin-loader={ASYNC}
            >Plugin 1 Async</button>
            <button
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin2"
              data-plugin-loader={DIRECT}
            >Plugin 2 Direct</button>
            <button
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin2"
              data-plugin-loader={ASYNC}
            >Plugin 2 Async</button>
          </div>
        );
      },

      _onClick: function(e) {
        e.preventDefault();

        var button = e.target;
        var loader = button.getAttribute('data-plugin-loader');
        var plugin = button.getAttribute('data-plugin-name');

        switch (loader) {
          case ASYNC:
            Actions.enablePluginAsync(plugin);
            break;
          case DIRECT:
            Actions.enablePluginDirect(plugin);
            break;
        }
      }
    });
  }
);