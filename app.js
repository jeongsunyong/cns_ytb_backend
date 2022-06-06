const bodyParser = require("body-parser");
var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes');
const cors = require('cors'); 
app.use('/', routes);
app.use(cors());

server.listen(8000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });

//server.listen(8001);

/*
var express = require('express')
const routes = require('routes');
var app = express()

//var port = app.listen(process.env.PORT || 8000);
port=8000;

app.use(express.json());
app.use('/', routes);

const server = app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

module.exports = app;

*/