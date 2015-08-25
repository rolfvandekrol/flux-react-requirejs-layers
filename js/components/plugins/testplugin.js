
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'TestPlugin',
      render: function() {
        return (
          <div className="test-plugin">
            TestPlugin
          </div>
        );
      }
    });
  }
);