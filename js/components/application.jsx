
define(
  ['react'],
  function(React) {
    return React.createClass({
      displayName: 'Application',
      render: function() {
        return (
          <div className="application">
            Testcontent
          </div>
        );
      }
    });
  }
);