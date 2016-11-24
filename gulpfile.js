const gulp = require('gulp');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const filter = require('gulp-filter');
const cleanCSS = require('gulp-clean-css');                     //- 压缩CSS为一行；
const qn = require('gulp-qn');
const rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
const revCollector = require('gulp-rev-collector');
const runSequence = require('run-sequence');//控制task顺序
const qiniu_options = {
    accessKey: 'XXX',
    secretKey: 'XXX',
    bucket: 'XXX',
    domain: 'http://XXXX.bkt.clouddn.com'
};

gulp.task('clean', function () {

    return gulp.src('dist', {read: false})

        .pipe(clean())

});

gulp.task('build-js', function () {

    return gulp.src(['public/**/*.js'])

        //压缩js
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));

});

gulp.task('build-css', function () {

    return gulp.src(['public/**/*.css'])

        //压缩css
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));

});

gulp.task('upload-cdn-js', function () {

    return gulp.src(['dist/**/*.js'])
        .pipe(qn({
            qiniu: qiniu_options,
            prefix: 'javascript'
        }))

});

gulp.task('upload-cdn-css', function () {

    return gulp.src(['dist/**/*.css'])
        .pipe(qn({
            qiniu: qiniu_options,
            prefix: 'stylesheets'
        }))

});

gulp.task('upload-cdn-srcimages', function () {

    return gulp.src(['public/**/*.png','public/**/*.jpg','public/**/*.gif'])
        .pipe(qn({
            qiniu: qiniu_options,
            prefix: 'images'
        }))

});

gulp.task('build-upload', function (callback) {
    runSequence(['build-js', 'build-css'],
        ['upload-cdn-js', 'upload-cdn-css', 'upload-cdn-srcimages'],
        callback);
});

gulp.task('build-ejs', function () {
    return gulp.src(['dist/rev/**/*.json', 'views-ejs/*.ejs'])
        .pipe(revCollector({
            replaceReved: false,
            dirReplacements: {}
        }))
        .pipe(replace(/(\/stylesheets\/|\/javascript\/|\/images\/)/g, qiniu_options.domain+'$1'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function (callback) {
    runSequence(
        'clean',
        ['build-upload'],
        'build-ejs',
        callback);
});
