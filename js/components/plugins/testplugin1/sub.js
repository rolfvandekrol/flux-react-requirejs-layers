
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'TestPlugin1Sub',
      render: function() {
        return (
          <div className="test-plugin-sub">
            TestPlugin1 Sub Item
          </div>
        );
      }
    });
  }
);
