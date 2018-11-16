'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('sass', function () {
    gulp.src('./assets/scss/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./assets/css'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./assets/scss/*.scss', ['sass']);
});