var gulp = require('gulp');
var babel = require("gulp-babel");
var watch = require('gulp-watch');
 
gulp.task('transform', function () {
  return gulp.src('js/**/*.jsx')
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

gulp.task('default', ['transform', 'require', 'react'], function() {

});

gulp.task('watch', function () {
  watch('js/**/*', function() {
    gulp.start('default');
  });
});