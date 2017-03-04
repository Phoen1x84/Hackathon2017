'use strict';
// gulp require modules
const gulp = require('gulp');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

// config
var paths = {
    //tasks: './gulp_tasks',
    src: {
        styles: './src/styles/',
        scripts: './src/scripts/',
        fonts: './src/fonts/',
        templates: './src/templates/',
        images: './src/images/'
    },
    dist: {
        main: './dist/',
        css: './dist/css/',
        scripts: './dist/scripts/',
        fonts: './dist/fonts/',
        images: './dist/images/'
    },
    webroot: 'C:/inetpub/wwwroot/AfternoonDelight/Website' // change this depending on project
};

// --------------------------------
// All SCSS compiling and linting
// --------------------------------
// SCSS compilation
gulp.task('compile-sass', function () {
    return gulp.src(paths.src.styles + 'hotspots.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 9'],
            cascade: false
        }))
        .pipe(concat({
            path: 'hotspots.css'
        }))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.css));
});

// SCSS linting
gulp.task('sass-lint', function () {
    return gulp.src(paths.src.styles + '**/*.s+(a|c)ss')
        .pipe(sassLint({
            files: {
                ignore: [
                    '**/components/faq/_faq.scss', // excluded due to legacy code which need to be refactored
                    '**/_normalize.scss',
                    '**/vendor/**/*.scss',
                    '**/_grid.scss',
                    '**/legacy.scss'
                ]
            },
            rules: {
                // Severirty 0 (disabled)
                // Severirty 1 (warning)
                // Severirty 2 (error)
                'clean-import-paths': 0, // need to fix this showing warnings and it needs to be changed
                'no-ids': 1,
                'bem-depth': 1,
                'no-misspelled-properties': 1,
                'space-after-colon': true,
                'nesting-depth': 4,
                'no-css-comments': 0,
                'no-vendor-prefixes': 0,
                'leading-zero': 0,
                'border-zero': 0,
                'property-sort-order': 0,
                'class-name-format': [1,
                    {
                        'allow-leading-underscore': true,
                        'convention': 'hyphenatedbem'
                    }
                ],
                'indentation': [1,
                    {
                        'size': 4
                    }
                ],
                'quotes': [1,
                    {
                        'style': 'double'
                    }
                ]
            },
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

// CSS minification
gulp.task('minify-css', function () {
    return gulp.src(paths.dist.css + '*.min.css')
      .pipe(cleanCSS({ compatibility: 'ie9' }))
      .pipe(gulp.dest(paths.dist.css));
});

// -------------------------------
// javascript compilation and linting
// -------------------------------

// javascript lint
gulp.task('eslint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([
            paths.src.scripts + '**/*.js',
            '!' + paths.src.scripts + '/vendor/**/*.js',
            '!' + paths.src.scripts + '/partials.js',
            '!' + paths.src.scripts + '/templates.js',
            '!node_modules/**',
    ])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            "parserOptions": {
                "ecmaVersion": 6,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true
                }
            },
            rules: {
                'eqeqeq': 'off',
                'semi': ['error', 'always'],
                'quotes': ['error', 'single', {
                    'avoidEscape': true
                }],
                'one-var': ['error', 'never'],
                'strict': ['error', 'safe'],
                'camelcase': 'error',
                'max-depth': ['error', 4]
            },
            // specify global variables to declare
            globals: [
                'jQuery',
                '$',
                'APP',
                'UTILS'
            ],
            // An environment defines global variables that are predefined.
            // http://eslint.org/docs/user-guide/configuring#specifying-environments
            envs: [
                'browser'
            ]
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

// javascript compiler
gulp.task('compile-js', function () {
    return gulp.src([
            paths.src.scripts + 'vendor/jquery-3.1.1.js', // To make sure that JQuery file is first added to main.js
            paths.src.scripts + 'vendor/**/*.js',
            paths.src.scripts + 'utilities/**/*.js',
            paths.src.scripts + 'modules/**/*.js',
            paths.src.scripts + 'partials.js',
            paths.src.scripts + 'templates.js',
            paths.src.scripts + 'hotspots.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat({
            path: 'hotspots.js'
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist.scripts));
});

// -------------------
// Image optimisation
// -------------------
gulp.task('image-min', function () {
    gulp.src(paths.src.images + '*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images))
});

// ----------------------------------------------------
// Handlebars template and partials compiler
// ----------------------------------------------------
gulp.task('compile-templates', function () {
    return gulp.src([
            paths.src.templates + '**/*.hbs',
    ])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'WW.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(paths.src.scripts));
});

gulp.task('compile-partials', function () {
    // Assume all partials start with an underscore
    // You could also put them in a folder such as source/templates/partials/*.hbs
    return gulp.src([paths.src.templates + '**/_*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function (fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }))
        .pipe(concat('partials.js'))
        .pipe(gulp.dest(paths.src.scripts));
});

// -------------------------------
// All copy tasks
// -------------------------------
// copy files to wwwroot
gulp.task('copy', function () {
    return gulp.src([
            paths.dist.main + '**/*.*'
    ], {
        base: './'
    })
        .pipe(gulp.dest(paths.webroot));
});

// copy fonts to dist
gulp.task('copy-fonts', function () {
    return gulp.src([
            paths.src.fonts + '*'
    ])
        .pipe(gulp.dest(paths.dist.fonts));
});

// -------------------------------
// All build tasks
// -------------------------------
gulp.task('build-templates', function () {
    runSequence('compile-partials', 'compile-templates', 'eslint', ['compile-js'], 'copy');
});

// production build
gulp.task('build-prod', function () {
    runSequence('compile-partials', 'compile-templates', 'eslint', 'sass-lint', ['compile-sass', 'compile-js', 'image-min'], 'minify-css', 'copy');
});

// watch task (default)
gulp.task('default', function () {
    gulp.watch([paths.src.styles + '**/*.scss', paths.src.scripts + '**/*.js'], function () {
        runSequence('sass-lint', 'eslint', ['compile-sass', 'compile-js'], 'minify-css', 'copy');
    });
});