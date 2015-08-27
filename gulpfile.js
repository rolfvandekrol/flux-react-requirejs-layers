var gulp = require('gulp');
var babel = require("gulp-babel");
var watch = require('gulp-watch');
var rjs = require('gulp-requirejs');
var rename = require("gulp-rename");
var browserify = require('browserify');
var source = require('vinyl-source-stream');


gulp.task('transform', function () {
  return gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

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
    .pipe(gulp.dest('build'));
});

gulp.task('fbemitter', function() {
  var b = browserify({
    entries: 'node_modules/fbemitter/index.js',
    debug: false,
    standalone: 'fbemitter'
  }).bundle();

  return b.pipe(source('index.js'))
    .pipe(rename('fbemitter.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['transform', 'require', 'react', 'flux', 'fbemitter']);

gulp.task('optimize', ['optimize-application', 'optimize-testplugin1', 'optimize-testplugin2']);

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

gulp.task('default', ['optimize']);

gulp.task('watch', function () {
  watch('js/**/*', function() {
    gulp.start('default');
  });
});