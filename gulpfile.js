const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync");
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const { dest, series, src, watch } = require("gulp");

function css() {
  return src("./sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./css/"));
}

function serve() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("./sass/**/*.scss", css);
  watch("./*.html").on("change", browsersync.reload);
}

exports.css = css;
exports.serve = serve;
exports.default = series(css, serve);
