// =========================================================
// Gulp Task: HTML
// Description: Move HTML file, compile templates, and add analytics
// npm install --save-dev gulp-environments gulp-replace gulp-strip gulp-file-include
// =========================================================
const config              = require('../config.js');
const fileinclude         = require('gulp-file-include');
const fs                  = require('fs');

module.exports = function(gulp, plugins) {
    return function() {
        const analytics = plugins.environments.production() ? fs.readFileSync('./prod/analytics.html', "utf8") : '';
        return (
            gulp.src(config.html.src)
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(plugins.replace('<!!-- google_analytics -->', analytics))
                // .pipe(plugins.stripComments())
                .pipe(gulp.dest(config.html.dest))
        );
    }
};