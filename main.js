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
   console.log("Body: " + req.body) // 5040
   // let number = req.body;
   // let result = "NONE";
   // for(let i = 2; i < number; i++) {
   //    number = number / i;
   //    if(number === 1) {
   //       result = i;
   //       break;
   //    }
   // }
   // console.log("number: ", number)
   function reverseFactorial(num) {
      let product = 1,
          n = 1;

      while (product <= num) {
         if (product === num) {
            return `${num} = ${n}!`;
         }
         product *= ++n;
      }
      return `${num} = NONE`;
   }

   const factRes = reverseFactorial(req.body);
   console.log(factRes);
   res.send(factRes);
})

app.post('/ground/task3', function (req, res) {
   console.log("ground/task3")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)

   if(req.body === 0){
      res.send("now");
   }
   
   let rem = req.body
   let str = ""
   let yrs = (rem - rem % 31556926) / 31556926
   if (yrs !== 0) {
      str += `${yrs} year ${ yrs == 1 ? '' :'s'}`
      rem -= yrs * 31556926
   }
   let ms = (rem - rem % 2629743) / 2629743
   if (ms !== 0) {
      str += `$, {ms} month ${ ms == 1 ? '' :'s'}`
      rem -= ms * 2629743
   }
   let hrs = (rem - rem % 3600) / 3600
   if (hrs !== 0) {
      str += `$, {hrs} hour ${ hrs == 1 ? '' :'s'}`
      rem -= hrs * 3600
   }
   let mins = (rem - rem % 60) / 60
   if (mins !== 0) {
      str += `$, {mins} hour ${ mins == 1 ? '' :'s'}`
      rem -= mins * 60
   }
   if (rem !== 0){
      str += `$ and {rem} second ${ rem == 1 ? '' :'s'}`
   }
   res.send(str)
})

app.post('/ground/bonus', function (req, res) {
   console.log("/ground/bonus")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
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

   function findMissingCards(shuffledCards) {
      const allCards = generateAllCards();
      const shuffledSet = new Set(shuffledCards);
      const missingCards = [];
    
      for (const card of allCards) {
        if (!shuffledSet.has(card)) {
          missingCards.push(card);
        }
      }
    
      return missingCards.sort().join(' ');
    }
    
    function generateAllCards() {
      const ranks = '23456789TJQKA';
      const suits = 'SHCD';
      const allCards = [];
    
      for (const rank of ranks) {
        for (const suit of suits) {
          allCards.push(rank + suit);
        }
      }
      allCards.push('JK', 'JK');
    
      return allCards;
    }

    const shuffledCards = req.body.split(' ');
    const missingCards = findMissingCards(shuffledCards);
    console.log("Missing cards: "+ missingCards)
   res.send(missingCards);
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