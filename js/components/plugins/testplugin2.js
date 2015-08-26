
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'TestPlugin2',
      render: function() {
        return (
          <div className="test-plugin">
            TestPlugin2
          </div>
        );
      }
    });
  }
);