import babel from 'gulp-babel';
import cache from 'gulp-cached';
import clean from 'gulp-clean';
import cleanCss from 'gulp-clean-css';
import copy from 'gulp-copy';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import nodemon from 'gulp-nodemon';
import open from 'gulp-open';
import puglint from 'gulp-pug-lint';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import sourcemaps from 'gulp-sourcemaps';

/* Global tasks*/
// Global paths
const OUTPUT_ROOT = 'dist/';
const SOURCE_ROOT = 'src/';

// Simply start the app by default
gulp.task('default', ['serve']);

// Combine all build tasks for NPM script
gulp.task('build:all',
  [
    'build:server',
    'build:views',
    'build:content',
    'build:styles',
  ],
);

// Same with clean tasks
gulp.task('clean:all',
  [
    'clean:server',
    'clean:views',
    'clean:content',
    'clean:styles',
  ],
);

// And of course, lint tasks...
gulp.task('lint:all',
  [
    'lint:server',
    'lint:views',
    'lint:styles',
  ],
);

/* Express Server Tasks */
const SERVER_SOURCE_ROOT = `${SOURCE_ROOT}/server/`;
const SERVER_OUTPUT_ROOT = `${OUTPUT_ROOT}/`;

// The server has a special task for starting the entire app
// Note that everything should be built before serving the app - this will automatically trigger
// linting of the entire project
gulp.task('server', ['build:all'], () =>
    nodemon({
      script: `${SERVER_OUTPUT_ROOT}/app.js`,
    }),
);

// Lint JavaScript source
gulp.task('lint:server', () =>
    gulp.src(`${SERVER_SOURCE_ROOT}/**/*.js`)
        .pipe(cache('lint-server'))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError()),
);

// Transpile JavaScript source with Babel
gulp.task('build:server', ['lint:server'], () =>
    gulp.src(`${SERVER_SOURCE_ROOT}/**/*.js`)
        .pipe(cache('build-server'))
        .pipe(sourcemaps.init())
        .pipe(babel({
          presets: ['es2015'],
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(SERVER_OUTPUT_ROOT))
        .pipe(livereload()),
);

// Remove transpiled server files
gulp.task('clean:server', () =>
    gulp.src(`${SERVER_OUTPUT_ROOT}`, { read: false })
        .pipe(clean()),
);

/* View Tasks */
const VIEWS_SOURCE_ROOT = `${SOURCE_ROOT}/views/`;
const VIEWS_OUTPUT_ROOT = `${OUTPUT_ROOT}/views/`;

gulp.task('build:views', ['lint:views'], () =>
    gulp.src(`${VIEWS_SOURCE_ROOT}/**/*.pug`)
        .pipe(cache('build-views'))
        .pipe(copy(VIEWS_OUTPUT_ROOT, { prefix: 2 }))
        .pipe(livereload()),
);

gulp.task('lint:views', () =>
    gulp.src(`${VIEWS_SOURCE_ROOT}/**/*.pug`)
        .pipe(cache('lint-views'))
        .pipe(puglint()),
);

gulp.task('clean:views', () =>
    gulp.src(`${VIEWS_OUTPUT_ROOT}`, { read: false })
        .pipe(clean()),
);

/* Static Content Tasks */

const CONTENT_SOURCE_ROOT = `${SOURCE_ROOT}/public/content/`;
const CONTENT_OUTPUT_ROOT = `${OUTPUT_ROOT}/public/content/`;

gulp.task('build:content', () =>
    gulp.src(`${CONTENT_SOURCE_ROOT}/**/*.md`)
        .pipe(cache('build-content'))
        .pipe(copy(CONTENT_OUTPUT_ROOT, { prefix: 3 }))
        .pipe(livereload()),
);

gulp.task('clean:content', () =>
    gulp.src(`${CONTENT_OUTPUT_ROOT}`, { read: false })
        .pipe(clean()),
);

/* Styles Tasks */

const STYLES_SOURCE_ROOT = `${SOURCE_ROOT}/public/stylesheets/`;
const STYLES_OUTPUT_ROOT = `${OUTPUT_ROOT}/public/stylesheets/`;

gulp.task('build:styles', ['lint:styles'], () =>
    gulp.src(`${STYLES_SOURCE_ROOT}/**/*.s+(a|c)ss`)
        .pipe(cache('build-styles'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(STYLES_OUTPUT_ROOT))
        .pipe(livereload()),
);

gulp.task('lint:styles', () =>
    gulp.src(`${STYLES_SOURCE_ROOT}/**/*.s+(a|c)ss`)
        .pipe(cache('lint-styles'))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError()),
);

gulp.task('clean:styles', () =>
    gulp.src(`${STYLES_OUTPUT_ROOT}`, { read: false })
        .pipe(clean()),
);

/* Miscellaneous Helper Tasks */

// 'watch' is a specialized task that watches source files for changes and triggers livereload when
// there's a relevant change
gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(`${SERVER_SOURCE_ROOT}/**/*.js`, ['build:server']);
  gulp.watch(`${VIEWS_SOURCE_ROOT}/**/*.pug`, ['build:views']);
  gulp.watch(`${CONTENT_SOURCE_ROOT}/**/*.md`, ['build:content']);
  gulp.watch(`${STYLES_SOURCE_ROOT}/**/*.s+(a|c)ss`, ['build:styles']);
  // TODO: insert static asset gulp.watch() statements
});

// 'serve' is an even _more_ specialized task that begins running the app then watches for changes
gulp.task('serve',
  [
    'server',
    'watch',
  ],
  () => gulp.src(__filename).pipe(open({ uri: `http://localhost:${process.env.PORT || 8080}` })),
);
