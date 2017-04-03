// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    styleInject = require("gulp-style-inject"),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    fs = require('fs'),
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
    return gulp.src([
        // 'content/themes/custom-theme/dev/js/webfont.js',
        // 'content/themes/custom-theme/dev/js/small-config.js',
        'content/themes/custom-theme/dev/js/jquery-1.12.0.min.js',
        'content/themes/custom-theme/dev/js/jquery.fitvids.js',
        'content/themes/custom-theme/dev/js/prism.js',
        'content/themes/custom-theme/dev/js/jquery.fluidbox.js',
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

gulp.task('inject', ['styles'], function () {
    gulp.src("content/themes/custom-theme/dev/templates/default.hbs")
        .pipe(styleInject())
        .pipe(gulp.dest("content/themes/custom-theme"))
});

gulp.task('inject-amp', function () {
    gulp.src("content/themes/custom-theme/dev/templates/amp-styles-src.hbs")
        .pipe(replace('<link rel="stylesheet">', function () {
            var style = fs.readFileSync('content/themes/custom-theme/assets/css/amp.css', 'utf-8');
            return '<style amp-custom>\n' + style + '\n</style>';
        }))
        .pipe(rename('amp-styles.hbs'))
        .pipe(gulp.dest("content/themes/custom-theme/partials"))
});

// Default task
gulp.task('default', function () {
    gulp.start('styles');
});

// Watch
gulp.task('watch', function () {
    gulp.watch('content/themes/custom-theme/dev/**/*.scss', ['styles', 'inject']);
    gulp.watch('content/themes/custom-theme/dev/**/*.js', ['scripts']);
    gulp.watch('content/themes/custom-theme/dev/templates/*.hbs', ['inject']);
});

gulp.task('default', ['watch']);
