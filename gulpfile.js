var gulp         = require('gulp'),
    htmlmin      = require('gulp-htmlmin'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano      = require('gulp-cssnano'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    browserSync  = require('browser-sync');

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('styles', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('images', function() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('vendor', function() {
    return gulp.src('./src/vendor/**/*')
        .pipe(gulp.dest('./dist/vendor'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/scss/**/*.scss', ['styles']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/images/**/*', ['images']);
    gulp.watch('./src/vendor/**/*', ['vendor']);
    gulp.watch('./src/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['html', 'styles', 'scripts', 'images', 'vendor', 'browser-sync', 'watch']);
