var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    // imageop = require('gulp-image-optimization'),
    image = require('gulp-image'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    notify = require("gulp-notify"),
    wait = require('gulp-wait'),
    rsync = require('gulp-rsync');

// JavaScripts

gulp.task('js', function() {
    return gulp.src([
            'lib/jquery/dist/jquery.min.js',
            'lib/owl.carousel/dist/owl.carousel.min.js',
            'lib/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
            'lib/magnific-popup/dist/jquery.magnific-popup.min.js',
            'lib/progressbar.js/dist/progressbar.js',
            // add new css libs
            'js/main.js' // alwayse in the end
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify()) // minimize all js
        .pipe(gulp.dest('pub/static/js'))
        .pipe(browserSync.reload({ stream: true }));
});

// Browser localhost

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'pub'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

// CSS & SASS


gulp.task('sass', function() {
    return gulp.src('sass/**/*.sass')
        .pipe(wait(50))
        .pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // не використовуючі стилі
        .pipe(gulp.dest('pub/static/css'))
        .pipe(browserSync.reload({ stream: true }));
});

// Watcher

gulp.task('watch', ['sass', 'js', 'browser-sync', 'imagemin'], function() {
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch(['lib/**/*.js', 'js/main.js'], ['js']);
    gulp.watch('pub/*.html', browserSync.reload);
    var buildFonts = gulp.src([
        'lib/components-font-awesome/fonts/**/*',
    ]).pipe(gulp.dest('pub/static/fonts'));
});

// Images

gulp.task('imagemin', function() {
    return gulp.src('img/**/*')
        // .pipe(imagemin())
        // .pipe(image())
        .pipe(gulp.dest('pub/static/img'));
});
gulp.task('fonts', function() {
    return gulp.src([
        'lib/components-font-awesome/fonts/**/*',
    ]).pipe(gulp.dest('pub/static/fonts'));
});

// THE END

gulp.task('build', ['remove', 'imagemin', 'sass', 'js', 'fonts'], function() {


});


//Delete & clean

gulp.task('remove', function() {
    return del.sync('pub/static');
});
gulp.task('clean', function() {
    return cache.clearAll();
});

gulp.task('default', ['watch']);