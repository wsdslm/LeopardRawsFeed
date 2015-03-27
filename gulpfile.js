/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/17.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename');
var js_src = 'js',
    css_src = 'css',
    js_dest = 'public/js',
    css_dest = 'public/css',
    font_dest = 'public/fonts';

gulp.task('default', ['js', 'css', 'fonts']);

gulp.task('clean', function () {
    gulp.src([
        js_dest + '/*.js',
        css_dest + '/*.css',
        font_dest + '/*.*'
    ]).pipe(clean());
});

gulp.task('js', function () {
    gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular/angular.min.js.map',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-route/angular-route.min.js.map',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ]).pipe(gulp.dest(js_dest));

    gulp.src([js_src + '/*.js'])
        .pipe(uglify({mangle: false}))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(js_dest));
});

gulp.task('css', function () {
    gulp.src([
        'node_modules/bootstrap/dist/css/*.+(min.css|map)'
    ]).pipe(gulp.dest(css_dest));

    gulp.src([css_src + '/*.css'])
        .pipe(minify())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(css_dest));
});

gulp.task('fonts', function () {
    gulp.src([
        'node_modules/bootstrap/fonts/*'
    ]).pipe(gulp.dest(font_dest));
});