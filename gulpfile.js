var gulp = require('gulp');
var babel = require("gulp-babel");
var watch = require('gulp-watch');
var rjs = require('gulp-requirejs');
var convert = require("gulp-require-convert");
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

gulp.task('assign', function() {
  return gulp.src('node_modules/object-assign/index.js')
    .pipe(convert())
    .pipe(rename('assign.js'))
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

gulp.task('default', ['transform', 'require', 'react', 'flux', 'assign', 'fbemitter'], function() {

});

gulp.task('watch', function () {
  watch('js/**/*', function() {
    gulp.start('default');
  });
});