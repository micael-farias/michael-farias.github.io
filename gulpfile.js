const gulp = require('gulp');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const cp = require('child_process');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
function jekyllBuild() {
    return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'});
}

// Rebuild Jekyll & reload browserSync
function jekyllRebuild(done) {
    browserSync.reload();
    done();
}

// Launch browser-sync
function browserSyncServe(done) {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
    done();
}

// Compile and minify sass
function styles() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
}

// Compile fonts
function fonts() {
    return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
        .pipe(plumber())
        .pipe(gulp.dest('assets/fonts/'));
}

// Minify images
function images() {
    return gulp.src('src/img/**/*.{jpg,png,gif}')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img/'));
}

// Old scripts task
// function scripts() {
//     return gulp.src('src/js/**/*.js')
//         .pipe(plumber())
//         .pipe(concat('main.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('assets/js/'));
// }

// Compile and minify js
function scripts() {
    return gulp.src(['src/js/**/*.js', '!src/js/custom.js']) // Exclui custom.js do processo principal
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream()) // Adiciona streaming para o BrowserSync
        .on('end', function() { // Depois que main.js é criado, adiciona custom.js
            return gulp.src(['assets/js/main.js', 'src/js/custom.js'])
                .pipe(concat('main.js'))
                .pipe(gulp.dest('assets/js/'))
                .pipe(browserSync.stream());
        });
}

// Watch files
function watchFiles() {
    gulp.watch('src/styles/**/*.scss', gulp.series(styles, jekyllRebuild));
    // gulp.watch('src/js/**/*.js', gulp.series(scripts, jekyllRebuild));
    gulp.watch(['src/js/**/*.js', 'src/js/custom.js'], gulp.series(scripts, jekyllRebuild));
    gulp.watch('src/fonts/**/*.{ttf,woff,woff2}', fonts);
    gulp.watch('src/img/**/*.{jpg,png,gif}', images);
    gulp.watch(['*html', '_includes/*html', '_layouts/*.html'], jekyllRebuild);
}

// Complex tasks
const build = gulp.series(jekyllBuild, gulp.parallel(styles, scripts, fonts, images));
const watch = gulp.parallel(watchFiles, browserSyncServe);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = gulp.series(build, watch);