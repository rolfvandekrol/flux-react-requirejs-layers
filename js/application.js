
define(
  ['react', 'components/application'],
  function(React, Application) {
    React.render(
      <Application />,
      document.getElementById('wrapper')
    );
  }
);
