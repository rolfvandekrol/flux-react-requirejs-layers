var gulp = require('gulp');
var babel = require("gulp-babel");
var watch = require('gulp-watch');
var rjs = require('gulp-requirejs');
var rename = require("gulp-rename");
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Run all the .js files through Babel to make sure all JSX is converted to 
// plain old Javascript. This is also helpful if you want to use ES6.
gulp.task('transform', function () {
  return gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

// Copy files from node_modules to the build directory to make them available as
// Require.js modules.
gulp.task('require', function() {
  return gulp.src('node_modules/requirejs/require.js')
    .pipe(gulp.dest('build'));
});
gulp.task('react', function() {
  return gulp.src('node_modules/react/dist/react-with-addons.js')
    .pipe(gulp.dest('build'));
});
gulp.task('flux', function() {
  return gulp.src('node_modules/flux/dist/Flux.js')
    .pipe(rename('flux.js'))
    .pipe(gulp.dest('build'));
});
gulp.task('fbemitter', function() {
  // fbemitter is a bit more complex, but with browserify standalone conversion
  // it can be beaten hard enough to be require.js compatible.
  var b = browserify({
    entries: 'node_modules/fbemitter/index.js',
    debug: false,
    standalone: 'fbemitter'
  }).bundle();

  return b.pipe(source('index.js'))
    .pipe(rename('fbemitter.js'))
    .pipe(gulp.dest('build'));
});

// Optimize the sets of require.js modules to three javascript files, so we
// don't have to make too much HTTP requests.
gulp.task('optimize-application', ['build'], function() {
  return rjs({
      baseUrl: 'build/',
      out: 'application.js',
      name: 'application',
      paths: {
        "react" : "react-with-addons"
      },
    })
    .pipe(gulp.dest('./build/optimize'));
});
gulp.task('optimize-testplugin1', ['build'], function() {
  return rjs({
      baseUrl: 'build/',
      out: 'testplugin1.js',
      name: 'components/plugins/testplugin1',
      paths: {
        "react" : "react-with-addons"
      },
      excludeShallow: ['react'],
    })
    .pipe(gulp.dest('./build/optimize'));
});
gulp.task('optimize-testplugin2', ['build'], function() {
  return rjs({
      baseUrl: 'build/',
      out: 'testplugin2.js',
      name: 'components/plugins/testplugin2',
      paths: {
        "react" : "react-with-addons"
      },
      excludeShallow: ['react'],
    })
    .pipe(gulp.dest('./build/optimize'));
});

// Basic task to make sure the build directory is complete.
gulp.task('build', ['transform', 'require', 'react', 'flux', 'fbemitter']);

// Basic task to make sure the build/optimize directory is complete.
gulp.task('optimize', ['optimize-application', 'optimize-testplugin1', 'optimize-testplugin2']);

// If we call just `gulp`, run the optimize task.
gulp.task('default', ['optimize']);

// Run the default task every time a .js file changes.
gulp.task('watch', function () {
  watch('js/**/*', function() {
    gulp.start('default');
  });
});