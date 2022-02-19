const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");

function style() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
}

exports.default = watch; 
