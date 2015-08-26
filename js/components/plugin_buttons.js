
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'PluginButtons',
      render: function() {
        return (
          <div className="plugin-buttons">
            <button 
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin1"
              data-plugin-loader="direct"
            >Plugin 1 Direct</button>
            <button
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin1"
              data-plugin-loader="async"
            >Plugin 1 Async</button>
            <button
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin2"
              data-plugin-loader="direct"
            >Plugin 2 Direct</button>
            <button
              onClick={this._onClick}
              data-plugin-name="components/plugins/testplugin2"
              data-plugin-loader="async"
            >Plugin 2 Async</button>
          </div>
        );
      },

      _onClick: function(e) {
        e.preventDefault();

        var button = e.target;
        var loader = button.getAttribute('data-plugin-loader');
        var plugin = button.getAttribute('data-plugin-name');
        console.log(loader, plugin);
      }
    });
  }
);