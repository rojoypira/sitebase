var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cache = require('gulp-cache');

/*********************
 * Error Handling (ref. https://gist.github.com/noahmiller/61699ad1b0a7cc65ae2d)
 *********************/

global.isWatching = false

// Command line option:
//  --fatal=[warning|error|off]
const ERROR_LEVELS = ['error', 'warning']

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
// ref. http://stackoverflow.com/questions/21602332/catching-gulp-mocha-errors#answers
function handleError(level, error) {
  gutil.log(error.message)
  if (global.isWatching) {
    this.emit('end')
  } else {
    process.exit(1)
  }
}

// Convenience handler for error-level errors.
function onError(error) { return handleError.call(this, 'error', error) }
// Convenience handler for warning-level errors.
function onWarning(error) { return handleError.call(this, 'warning', error) }

// BROWSER-SYNC
gulp.task('sync', function() {
    browserSync.init('', {
        server: {
            baseDir: './'
        }
    })
})

// SASS
gulp.task('sass', function() {
    return gulp.src('./**/*.scss', {base: './'})
        .pipe(sass())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({ stream: true }))
})


// BUILD SITE
gulp.task('build', ['sass']) 

// WATCH
gulp.task('watch', ['build', 'sync'], function() {
    global.isWatching = true 
    gulp.watch('./**/*.scss', ['sass']);
})

gulp.task('default', ['watch'])