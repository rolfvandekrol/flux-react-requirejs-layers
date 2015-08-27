
define(
  ['react', 'components/plugin_buttons', 'components/plugin_container'],
  function(React, PluginButtons, PluginContainer) {
    return React.createClass({
      displayName: 'Application',
      render: function() {
        return (
          <div className="application">
            <h1>Flux ReactJS Require.js Layers</h1>
            <p>
              Example Flux &amp; ReactJS application that uses Require.js build
              layers to load parts of the application gradually.
            </p>
            <PluginButtons />
            <PluginContainer />
          </div>
        );
      }
    });
  }
);
