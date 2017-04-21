var gulp = require('gulp'),
    sass = require('gulp-sass'),
	pug = require('gulp-pug'),
    watch = require("gulp-watch"),
    gulpPugBeautify = require('gulp-pug-beautify');
 

var source = '_application/',
    dest = '_dst/';
// Bootstrap scss source
var bootstrapSass = {
        in: './bower_components/bootstrap-sass/'
    };
// fonts
var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'styles/fonts/glyphicons/'
    };
// css source file: .scss files
var css = {
    in: source + 'scss/science.scss',
    out: dest + 'styles/css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};
// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});
// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});
// JADE (PUG)
gulp.task('pug', function () {
  return gulp.src(source + 'template/*.pug')
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest));
});
// default task
gulp.task('default', ['sass', 'pug'], function () {
     gulp.watch(css.watch, ['sass']);
     gulp.watch(source+'template/**/*.pug', ['pug']); 
});
