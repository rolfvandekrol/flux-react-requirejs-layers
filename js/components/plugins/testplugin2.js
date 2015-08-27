
define(
  ['react', 'components/plugins/testplugin2/sub'],
  function(React, Sub) {
    return React.createClass({
      displayName: 'TestPlugin2',
      render: function() {
        return (
          <div className="test-plugin">
            TestPlugin2
            <Sub />
          </div>
        );
      }
    });
  }
);
