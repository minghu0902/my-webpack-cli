const Fontmin = require('fontmin');

var fontmin = new Fontmin();

fontmin.src('fonts/*.ttf')
  .use(Fontmin.glyph({
    text: ''
  }))
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2woff())
  .use(Fontmin.ttf2svg())
  .use(Fontmin.css())
  .dest('build/fonts/')
  .run(function (err, files) {
    if (err) {
      throw err;
    }
    console.log(files);
  });