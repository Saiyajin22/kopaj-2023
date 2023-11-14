var bodyParser = require('body-parser')
var express = require('express');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.text({ type: 'text/plain' }))

/**
 * This simple Express App can serve as an example for you. Take a look at the endpoint definitions, you will need to create similar ones!
 */


app.post('/ground/task1', function (req, res) {
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.status(200).send();
})

app.post('/ground/task2', function (req, res) {
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})

app.post('/ground/task3', function (req, res) {
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})


app.post('/level1/task1', function (req, res) {
   res.send('Hello');
})

app.post('/level1/task2', function (req, res) {
   res.send('Hello');
})

app.post('/level1/task3', function (req, res) {
   res.send('Hello');
})

app.post('/level2/task1', function (req, res) {
   res.send("Hello");
})

app.post('/level2/task2', function (req, res) {
   res.send("Hello");
})

app.post('/level2/task3', function (req, res) {
   res.send("Hello");
})

app.post('/level3/task1', function (req, res) {
   res.send('Hello');
})

app.post('/level3/task2', function (req, res) {
   res.send('Hello');
})

app.post('/level3/task3', function (req, res) {
   res.send('Hello');
})

var server = app.listen(1234, '0.0.0.0', function () {
   console.log("App listening at http://%s:%s", server.address().address, server.address().port)
})