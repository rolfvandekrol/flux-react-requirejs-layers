
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'TestPlugin1',
      render: function() {
        return (
          <div className="test-plugin">
            TestPlugin1
          </div>
        );
      }
    });
  }
);