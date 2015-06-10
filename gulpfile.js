
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    jsonminify = require('gulp-jsonminify');


gulp.task('json', function () {
    return gulp.src('dev/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('dev/index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer({ 
            browsers: ['last 2 versions', 'ie 8', 'ie 9'] 
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['html', 'json']);