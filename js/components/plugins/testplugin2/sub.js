
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'TestPlugin2Sub',
      render: function() {
        return (
          <div className="test-plugin-sub">
            TestPlugin2 Sub Item
          </div>
        );
      }
    });
  }
);