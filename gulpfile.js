//Gulp
const { src, dest, task, watch, series, parallel } = require("gulp");
//Utility
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
//CSS
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
//JS
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
//Browser
var browserSync = require("browser-sync").create();
//Variables

var jsURL = "./dist/js/";

var imgSRC = "./src/images/**/*";
var imgURL = "./dist/images/";

var fontsSRC = "./src/fonts/**/*";
var fontsURL = "./dist/fonts/";

var htmlSRC = "./src/**/*.html";
var htmlURL = "./dist/";

var htmlWatch = "src/**/*.html";
var styleWatch = "src/scss/**/*.scss";
var jsWatch = "src/js/**/*.js";
var imgWatch = "./src/images/**/*.*";
var fontsWatch = "./src/fonts/**/*.*";
//Tasks

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
}

function reload(done) {
  browserSync.reload(done);
  done();
}

function css(done) {
  src("./src/scss/**/*")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "> 5%"],
        cascade: false
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
  done();
}

function js(done) {
  return browserify({
    extensions: [".js"],
    entries: ["./src/js/app.js"],
    debug: true
  })
    .transform(babelify, { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source("main.min.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest(jsURL))
    .pipe(browserSync.stream());
  done();
}

function triggerPlumber(src_file, dest_file) {
  return src(src_file)
    .pipe(plumber())
    .pipe(dest(dest_file));
}

function images() {
  return triggerPlumber(imgSRC, imgURL);
}

function fonts() {
  return triggerPlumber(fontsSRC, fontsURL);
}

function html() {
  return triggerPlumber(htmlSRC, htmlURL);
}

function watch_files() {
  watch(styleWatch, series(css, reload));
  watch(jsWatch, series(js, reload));
  watch(imgWatch, series(images, reload));
  watch(fontsWatch, series(fonts, reload));
  watch(htmlWatch, series(html, reload));
  src(jsURL + "main.min.js");
}

task("css", css);
task("js", js);
task("images", images);
task("fonts", fonts);
task("html", html);
task("default", parallel(css, js, images, fonts, html));
task("watch", parallel(browser_sync, watch_files));
