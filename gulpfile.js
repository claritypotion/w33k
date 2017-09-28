'use strict';

const gulp = require('gulp');
const browser = require('gulp-browser');
let transforms = [
    {
        transform: 'babelify',
        options: {presets: ['es2015', 'react']}
    }
];

gulp.task('default', () => {
    return gulp.src('./src/app.js')
        .pipe(browser.browserify(transforms))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch(['./src/**'], ['default']);
});