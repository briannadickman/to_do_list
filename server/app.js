var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var todo = require("./routes/todo.js");

app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/todo', todo);

app.listen(port, function(){
  console.log("Listening on port: ", port);
});
