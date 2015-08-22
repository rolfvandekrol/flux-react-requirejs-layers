
require.config({
  "baseUrl" : "build/",
  "paths" : {
    "react" : "react-with-addons"
  },
});

require(['react', 'components/application'], function(React, Application) {
  React.render(
    <Application />,
    document.getElementById('wrapper')
  );
});