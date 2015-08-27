
define(
  ['react', 'components/plugins/testplugin1/sub'],
  function(React, Sub) {
    return React.createClass({
      displayName: 'TestPlugin1',
      render: function() {
        return (
          <div className="test-plugin">
            TestPlugin1
            <Sub />
          </div>
        );
      }
    });
  }
);