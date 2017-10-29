var gulp = require('gulp');
var webserver = require('gulp-webserver'); 

gulp.task('default',['webserver']);

gulp.task('webserver', function(){
    gulp.src('./').pipe(webserver({
        port: 3001,
        liveload: true,
    }))
});