import * as gulp from 'gulp';

function clean(cb) {
    cb();
}

exports.build = build;
exports.default = gulp.series(clean, build);
