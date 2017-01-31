// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    debug = require('gulp-debug'),
// uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');
var paths = {
        inputScss: 'content/themes/custom-theme/assets/scss/*.scss',
        outCss: 'content/themes/custom-theme/assets/css'
    },
    sassOptionsDev = {
        errLogToConsole: true,
        outputStyle: 'compressed'
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
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.outCss));
});
// Scripts
// gulp.task('scripts', function () {
//     return gulp.src('src/scripts/**/*.js')
//         .pipe(jshint.reporter('default'))
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('dist/scripts'))
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/scripts'))
//         .pipe(notify({
//             message: 'Scripts compile f'
//         }));
// });
// Clean
// gulp.task('clean', function () {
//     return del(['dist/styles', 'dist/scripts']);
// });
// Default task
gulp.task('default', function () {
    gulp.start('styles');
});
// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('content/themes/custom-theme/assets/**/*.scss', ['styles']);
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
