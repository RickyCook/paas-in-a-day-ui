var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var runSequence = require('run-sequence'); // TODO: HACK: This will be deprecated in the future and may stop running depending on https://github.com/robrich/orchestrator/issues/21

// Linters
// var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sloc = require('gulp-sloc');

// Minifiers
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var removelogs = require('gulp-removelogs');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

// Angular
var html2js = require('gulp-ng-html2js');

var paths = {
    components: [
        'bower_components/angular/angular.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery/dist/jquery.min.map',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/bootstrap-material-design/dist/js/material.min.js',
        'bower_components/bootstrap-material-design/dist/js/material.min.js.map',
        'bower_components/bootstrap-material-design/dist/js/ripples.min.js',
        'bower_components/bootstrap-material-design/dist/js/ripples.min.js.map'
        //'bower_components/highcharts-release/highcharts.src.js',
        //'bower_components/highcharts-ng/dist/highcharts-ng.js'
    ],
    scripts: [
        'app/js/**/*.js'
    ],
    partials: [
        'app/partials/**/*.html'
    ],
    img: [
        'app/img/**/*.*'
    ],
    favicon: [
        'app/favicon.png'
    ],
    less: [
        'app/css/**/*.less'
    ],
    index: [
        'app/index.html'
    ],
    trackjs: [
        'bower_components/mustache/mustache.js',
        'app/track.js'
    ]
};

var htmlminOptions = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeAttributeQuotes: false,
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeEmptyAttributes: false,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: false,
    removeStyleLinkTypeAttributes: false
};

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('sloc', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(sloc())
});

gulp.task('lint-jshint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint({
            globals: {
                console: false,
                angular: false,
                jstz: false
            },
            // TODO: I should probably encapsulate my code into modules and remove the global use of 'use strict';
            globalstrict: true
        }))
        .pipe(jshint.reporter(stylish));
//        .pipe(jshint.reporter('fail'));
});

//gulp.task('lint-jscs', function () {
//    return gulp.src(paths.scripts)
//        .pipe(jscs());
//});

gulp.task('img', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest('build/img'));
});

gulp.task('partials', function () {
    return gulp.src(paths.partials)
        .pipe(htmlmin(htmlminOptions))
        .pipe(html2js({
            moduleName: "paas-in-a-day-ui.partials",
            prefix: "partials/"
        }))
        .pipe(concat("partials.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(concat('app.css'))
        //.pipe(autoprefixer({
        //    browsers: ['last 2 versions'],
        //    cascade: false
        //}))
        //.pipe(csso()) // TODO: Re-enable CSSO
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
    return gulp.src(paths.components.concat(paths.scripts).concat(['build/js/partials.js']))
        .pipe(removelogs())
        .pipe(ngmin())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('application.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('scripts-dev', function () {
    return gulp.src(paths.components.concat(paths.scripts).concat(['build/js/partials.js']))
        .pipe(gulp.dest('build/js'));
});


gulp.task('clean-partials', function () {
    // This is concatted into application.js for production runs and should be
    // removed before injecting!
    return gulp.src(['build/js/partials.js'])
        .pipe(clean());
});

gulp.task('index', function () {
    return gulp.src('app/index.html')
        .pipe(
            inject(
                gulp.src([
                    'build/js/angular.js', // Include angular first if it is around
                    'build/js/jquery.min.js', // Include jQuery second if it's around
                    'build/js/material.min.js', // Include material third if it's around
                    'build/js/ripples.min.js', // Include ripples fourth if it's around
                    'build/**/*.js',
                    'build/**/*.css'
                ], {read: false}),
                {ignorePath: 'build'}
            )
        )
        //.pipe(htmlmin(htmlminOptions)) // TODO: re-enable htmlmin, or switch this on/off depending on dev
        .pipe(gulp.dest('build'));
});

gulp.task('favicon', function () {
    return gulp.src(paths.favicon)
        .pipe(gulp.dest('build'));
});

gulp.task('trackjs', function () {
    return gulp.src(paths.trackjs)
        .pipe(concat('track.js'))
        .pipe(removelogs())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('trackjs-dev', function () {
    return gulp.src(paths.trackjs)
        .pipe(concat('track.js'))
        .pipe(gulp.dest('build'));
});

// TODO: Something is dying in generating production style minified assets - needs investigation.
gulp.task('prod', function (callback) {
    return runSequence(
        ['clean', 'sloc', 'lint-jshint'], //, 'lint-jscs'],
        ['img', 'favicon', 'partials', 'less'],
        'scripts',
        ['clean-partials'],
        ['index', 'trackjs'],
        callback
    );
});

gulp.task('dev', function (callback) {
    return runSequence(
        ['clean', 'sloc', 'lint-jshint'], //, 'lint-jscs'],
        ['img', 'favicon', 'partials', 'less'],
        'scripts-dev',
        ['index', 'trackjs-dev'],
        callback
    );
});

gulp.task('watch', function () {
    gulp.watch(paths.components, ['scripts-dev', 'index']);
    gulp.watch(paths.scripts, ['scripts-dev', 'index']);
    gulp.watch(paths.partials, ['partials']);
    gulp.watch(paths.img, ['img']);
    gulp.watch(paths.favicon, ['favicon']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.index, ['index']);
    gulp.watch(paths.trackjs, ['trackjs-dev']);
});

gulp.task('default', function (callback) {
    return runSequence('dev', 'watch');
});
