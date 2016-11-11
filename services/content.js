
function init(app){
  app.use('/content', feathers.static(__dirname + '/content'));
}
