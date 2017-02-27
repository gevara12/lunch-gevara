// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    debug = require('gulp-debug'),
// uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    styleInject = require("gulp-style-inject"),
    del = require('del');

//other vars
var paths = {
        inputScss: 'content/themes/custom-theme/dev/scss/*.scss',
        outCss: 'content/themes/custom-theme/assets/css',
        jsDevFolder: 'content/themes/custom-theme/dev/js/'
    },
    sassOptionsDev = {
        errLogToConsole: true,
        outputStyle: 'compressed'
    },
    autoprefixerOptions = {
        browsers: ['last 2 versions', 'iOS 7']
    };

gulp.task('image-opt', function () {
    return gulp.src(['content/images/**/*.JPG'])
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true
        }))
        .pipe(gulp.dest('content/images/optimized'));
});

// Styles
gulp.task('styles', function () {
    return gulp.src(paths.inputScss)
    //.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass(sassOptionsDev).on('error', sass.logError))
        .pipe(debug())
        .pipe(autoprefixer(autoprefixerOptions))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.outCss));
});
// Scripts
gulp.task('scripts', function () {
    return gulp.src(['content/themes/custom-theme/dev/js/webfont.js',
        'content/themes/custom-theme/dev/js/small-config.js',
        'content/themes/custom-theme/dev/js/jquery-1.12.0.min.js',
        'content/themes/custom-theme/dev/js/jquery.fitvids.js',
        'content/themes/custom-theme/dev/js/index.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('content/themes/custom-theme/assets/js'))
        //.pipe(jshint.reporter('default'))
        //.pipe(rename({
        //    suffix: '.min'
        //}))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/scripts'))
        .pipe(notify({
            message: 'Scripts compile f'
        }));
});

gulp.task('inject', ['styles'], function() {
    gulp.src("content/themes/custom-theme/dev/templates/*.hbs")
        .pipe(styleInject())
        .pipe(gulp.dest("content/themes/custom-theme"))
});

// Default task
gulp.task('default', function () {
    gulp.start('styles');
});
// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('content/themes/custom-theme/dev/**/*.scss', ['styles', 'inject']);
    gulp.watch('content/themes/custom-theme/dev/**/*.js', ['scripts']);
    gulp.watch('content/themes/custom-theme/dev/templates/*.hbs', ['inject']);
    // Watch .js files
    // gulp.watch('src/scripts/**/*.js', ['scripts']);
    // Watch PHP files
    // gulp.watch('src/php/**/*', ['php']);
    // Create LiveReload server
    // livereload.listen();
    // Watch any files in dist/, reload on change
    // gulp.watch(['dist/**', 'index.html']).on('change', livereload.changed);
});
gulp.task('default', ['watch']);
