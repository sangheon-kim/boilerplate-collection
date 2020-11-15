'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const spritesmith = require('gulp.spritesmith');

const DIR = {
	SRC: 'src',
	DEST: 'dist',
};

const SRC = {
	JS: `${DIR.SRC}/scripts/*`,
	SCSS: [`${DIR.SRC}/style/*`, `!${DIR.SRC}/style/*.png`],
	HTML: `${DIR.SRC}/*.html`,
	IMAGES: `${DIR.SRC}/images/**/*`,
	SPRITES: `${DIR.SRC}/images/src/*`,
	TRANS_SPRITE: `${DIR.SRC}/style/*.png`,
};

const DEST = {
	JS: `${DIR.DEST}/js`,
	CSS: `${DIR.DEST}/css`,
	HTML: `${DIR.DEST}/`,
	IMAGES: `${DIR.DEST}/img`,
	SPRITES: `${DIR.SRC}/style`,
	TRANS_SPRITE: `${DIR.DEST}/css`,
};

function html() {
	return gulp
		.src(SRC.HTML)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			}),
		)
		.pipe(gulp.dest(DEST.HTML))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
}

function style() {
	return gulp
		.src(SRC.SCSS)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gulp.dest(DEST.CSS))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(
			cleanCSS({ debug: true }, (details) => {
				gutil.log(`${details.name}: ${details.stats.originalSize}`);
				gutil.log(`${details.name}: ${details.stats.minifiedSize}`);
			}),
		)
		.pipe(
			rename({
				suffix: '.min',
			}),
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEST.CSS))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
}

const babelIgnore = ['${DIR.SRC}/scripts/*.min.js'];

function scripts() {
	return gulp
		.src(SRC.JS)
		.pipe(babel({ presets: ['@babel/env'], ignore: babelIgnore }))
		.pipe(gulp.dest(DEST.JS))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
}

function images() {
	return gulp
		.src([SRC.IMAGES, `!${DIR.SRC}/images/src/*`])
		.pipe(gulp.dest(DEST.IMAGES))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
}

function sprite() {
	var opts = {
		imgName: 'sprite.png',
		imgPath: './sprite.png',
		retinaSrcFilter: SRC.SPRITES + '@2x*',
		retinaImgName: 'sprite-2x.png',
		padding: 5,
		cssName: 'sprite.css',
		cssVarMap: function (sprite) {
			sprite.name = 'sprite_' + sprite.name;
		},
	};

	var spriteData = gulp
		.src(SRC.SPRITES)
		.pipe(spritesmith(opts))
		.on('error', function (err) {
			console.log(err);
		});

	return spriteData.pipe(gulp.dest(DEST.SPRITES)).pipe(transper());
}
function transper() {
	return gulp.src(SRC.TRANS_SPRITE).pipe(gulp.dest(DEST.TRANS_SPRITE));
}

function reload() {
	browserSync.reload();
}

function watch() {
	browserSync.init({
		directory: true,
		server: './dist/',
	});
	gulp.watch(SRC.HTML, html);
	gulp.watch(SRC.SCSS, style);
	gulp.watch(SRC.JS, scripts);
	gulp.watch(SRC.IMAGES, images);
	gulp.watch(SRC.SPRITES, sprite);
	gulp.watch(SRC.SCSS, transper);
	gulp.watch([DEST.HTML, DEST.CSS, DEST.JS, DEST.IMAGES], reload);
	gutil.log('gulp가 실행되었습니다!');
}

exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.images = images;
exports.default = watch;
