'use strict';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'gulp-buffer';
import uglify from 'gulp-uglify';
import tap from 'gulp-tap';
import browserify from 'browserify';
import babel from 'babelify';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import del from 'del';
import server from 'gulp-server-livereload';
import pug from 'gulp-pug';


const dirs = {
  src: 'source',
  dest: 'build',
   nodeDir: 'node_modules' 
};

const paths = {
  images: `${dirs.src}/img/**/*`,
  sass: `${dirs.src}/sass/**/*.scss`,
  css: `${dirs.src}/css/**`,
  pug: `${dirs.src}/pug/**`,
  php: `${dirs.src}/php/**`,
  htaccess: `${dirs.src}/php/**/.htaccess`,
  js: `${dirs.src}/js/**`,
  json: `${dirs.src}/*.json`,
  babel: `${dirs.src}/js/*`, //Should pick up both JS and JSX
  html: `${dirs.src}/html/**/*`
};

gulp.task('clean', () => {
  return del(['build']);
});

//VENDOR SPECIFIC
/**************************/

gulp.task('bootstrap-icons', () => { 
    return gulp.src(`${dirs.nodeDir}/bootstrap-sass/assets/fonts/**`) 
        .pipe(gulp.dest(`${dirs.dest}/fonts`)); 
});

gulp.task('bootstrap-js', () => { 
    return gulp.src(`${dirs.nodeDir}/bootstrap-sass/assets/javascripts/**/*.min.js`) 
        .pipe(gulp.dest(`${dirs.dest}/js`)); 
});

gulp.task('icons', () => { 
    return gulp.src(`${dirs.nodeDir}/font-awesome/fonts/**`) 
        .pipe(gulp.dest(`${dirs.dest}/fonts`)); 
});

gulp.task('jquery', () => { 
    return gulp.src(`${dirs.nodeDir}/jquery/dist/jquery.min.js`) 
        .pipe(gulp.dest(`${dirs.dest}/js`)); 
});

gulp.task('lodash', () => { 
    return gulp.src(`${dirs.nodeDir}/lodash/lodash.min.js`) 
        .pipe(gulp.dest(`${dirs.dest}/js`)); 
});

/*************************/
//END VENDOR SPECIFIC

gulp.task('copy_html', () => {
  return gulp.src([paths.html]).pipe(gulp.dest(dirs.dest));
});

gulp.task('copy_css', () => {
  return gulp.src([paths.css]).pipe(gulp.dest(`${dirs.dest}/css`));
});

gulp.task('copy_js', () => {
  return gulp.src([paths.js]).pipe(gulp.dest(`${dirs.dest}/js`));
});

gulp.task('copy_php', () => {
  return gulp.src([paths.php]).pipe(gulp.dest(`${dirs.dest}/php`));
});

gulp.task('copy_htaccess', () => {
  return gulp.src([paths.htaccess]).pipe(gulp.dest(`${dirs.dest}/php`));
});

gulp.task('copy_json', () => {
  return gulp.src([paths.json]).pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('babel', () => {
  return gulp.src([paths.babel,`!${dirs.src}/js/{_includes,_includes/**}`], { read: false })
    .pipe(tap((file) => {
      file.contents = browserify(file.path, {
        debug: true,
      }).transform(babel, {
        presets: [ 'es2015', 'react']
      }).exclude('_includes').bundle();
    }))
    .pipe(buffer())
    //.pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${dirs.dest}/js`));
});

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${dirs.dest}/css`));
});

gulp.task('images', () => {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(`${dirs.dest}/img`));
});

gulp.task('pug', () => {
  return gulp.src([`${paths.pug}/*.pug`, `!${paths.pug}/_includes/*`, `!${paths.pug}/_extends/*`, `!${paths.pug}/_components/*` ])
  .pipe(pug({})).pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('sass:watch', () => {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('babel:watch', () => {
  gulp.watch(paths.babel, ['babel']);
});

gulp.task('images:watch', () => {
  gulp.watch(paths.images, ['images']);
});

gulp.task('css:watch', () => {
  gulp.watch(paths.css, ['copy_css']);
});

gulp.task('html:watch', () => {
  gulp.watch(paths.html, ['copy_html']);
});

gulp.task('js:watch', () => {
  gulp.watch(paths.js, ['copy_js']);
});

gulp.task('php:watch', () => {
  gulp.watch(paths.php, ['copy_php']);
});

gulp.task('htaccess:watch', () => {
  gulp.watch(paths.htaccess, ['copy_htaccess']);
});

gulp.task('json:watch', () => {
  gulp.watch(paths.json, ['copy_json']);
});

gulp.task('watch:babel', () => {
  gulp.watch(paths.babel, ['babel']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.html, ['copy_html']);
  gulp.watch(paths.json, ['copy_json']);
  gulp.watch(paths.php, ['copy_php']);
  gulp.watch(paths.htaccess, ['copy_htaccess']);
  gulp.watch(paths.css, ['copy_css']);
});

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.html, ['copy_html']);
  gulp.watch(paths.js, ['copy_js']);
  gulp.watch(paths.json, ['copy_json']);
  gulp.watch(paths.php, ['copy_php']);
  gulp.watch(paths.htaccess, ['copy_htaccess']);
  gulp.watch(paths.css, ['copy_css']);
});

gulp.task('webserver', ['watch:babel'], () => {
  gulp.src(`${dirs.dest}`)
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

gulp.task('dirty_build', ['lodash','jquery','icons','bootstrap-icons','bootstrap-js','copy_html','copy_css','copy_js','copy_json','copy_php','copy_htaccess','sass', 'images']);

gulp.task('dirty_build_babel', ['icons','bootstrap-icons','copy_html','copy_json','copy_php','copy_htaccess','babel','sass','pug','images']);

gulp.task('noes6', ['clean'], () => {
  gulp.start('dirty_build');
});

gulp.task('default', ['clean'], () => {
  gulp.start('dirty_build_babel');
});