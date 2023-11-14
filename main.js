var bodyParser = require('body-parser')
var express = require('express');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.text({ type: 'text/plain' }))

/**
 * This simple Express App can serve as an example for you. Take a look at the endpoint definitions, you will need to create similar ones!
 */


app.post('/ground/task1', function (req, res) {
   console.log("ground/task1")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.status(200).send();
})

app.post('/ground/task2', function (req, res) {
   console.log("ground/task2")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   let number = req.body;
   let result = "NONE";
   for(let i = 2; i < number; i++) {
      number = number / i;
      if(number === 1) {
         result = i;
         break;
      }
   }
   console.log("number: ", number)

   res.send(result);
})

app.post('/ground/task3', function (req, res) {
   console.log("ground/task3")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)

   if(req.body === 0){
      res.send("now");
   }
   else if(req.body < 60){
      res.send(req.body + " second");
   }
   else if(req.body >= 60 && req.body < 3600){
      const minutes = req.body / 60;
      const seconds = req.body % 60;
      res.send(minutes + " minute and " + seconds + " seconds");
   }
   else if(req.body >= 3600 && req.body < 86400) {
      const hours = req.body / 3600;
      const minutes = req.body % 60;
      res.send( minutes + " minute and " + seconds + " seconds");
   }
})


app.post('/level1/task1', function (req, res) {
   console.log("level1/task1")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})

app.post('/level1/task2', function (req, res) {
   console.log("level1/task2")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})

app.post('/level1/task3', function (req, res) {
   console.log("level1/task3")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})

app.post('/level2/task1', function (req, res) {
   console.log("level2/task1")
   res.send("Hello");
})

app.post('/level2/task2', function (req, res) {
   console.log("level2/task2")
   res.send("Hello");
})

app.post('/level2/task3', function (req, res) {
   console.log("level2/task3")
   res.send("Hello");
})

app.post('/level3/task1', function (req, res) {
   console.log("level3/task1")
   res.send('Hello');
})

app.post('/level3/task2', function (req, res) {
   console.log("level3/task2")
   res.send('Hello');
})

app.post('/level3/task3', function (req, res) {
   console.log("level3/task3")
   res.send('Hello');
})

var server = app.listen(1234, '0.0.0.0', function () {
   console.log("App listening at http://%s:%s", server.address().address, server.address().port)
})