const gulp 				= require("gulp")
const sass 				= require("gulp-sass")
const htmlmin 			= require("gulp-htmlmin")
const notify 				= require("gulp-notify")
const concat 				= require("gulp-concat")
const uglify 				= require("gulp-uglify")
const browserSync 		= require("browser-sync").create()
const del 				= require("del")

/* Tasks cached */
gulp.task("cache:css", () =>
	del("./dist/css/style.css"))

gulp.task("cache:js", () => 
	del("./dist/js/app.js"))

/* Task compile scss to css */
gulp.task("sass", ['cache:css'], () => {
	return gulp.src("./src/scss/style.scss")
				.pipe(sass({outPutStyle: 'compressed'}))
				.on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css"))
				.pipe(browserSync.stream())
})

/* Task minify html */
gulp.task("html", () => {
	return gulp.src("./src/index.html")
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest("./dist"))
				.pipe(browserSync.stream())
})

/* Task minify js */
gulp.task("js", ['cache:js'], () => {
	return gulp.src("./src/js/app.js")
				.pipe(uglify())
				.pipe(gulp.dest("./dist/js"))
				.pipe(browserSync.stream())
})

/* Task concat js */
gulp.task("concat-js", () => {
	return gulp.src([
					'./src/components/jquery/dist/jquery.js',
					'./src/components/tether/dist/js/tether.js',
					'./src/components/bootstrap/dist/js/bootstrap.js'])
				.pipe(concat("main.js"))
				.pipe(gulp.dest("./dist/js"))

})

/* Task server local */
gulp.task("server", () => {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	})

	/* Watch */
	gulp.watch("./src/scss/**/*.scss", ['sass'])
	gulp.watch("./src/components/bootstrap/scss/**/*.scss", ['sass'])
	gulp.watch("./src/js/**/*.js", ['js'])
	gulp.watch("./src/index.html", ['html'])
})

gulp.task("default", ["sass", "html", "js", "concat-js", "server"])
