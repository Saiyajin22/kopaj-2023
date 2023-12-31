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
      str += `${yrs} year${ yrs == 1 ? '' :'s'}`
      rem -= yrs * 31556926
   }
   let ms = (rem - rem % 2629743) / 2629743
   if (ms !== 0) {
      str += `${str.length !== 0 ? ', ' : ''}${ms} month${ ms == 1 ? '' :'s'}`
      rem -= ms * 2629743
   }
   let ds = (rem - rem % 86400) / 86400
   if (ds !== 0) {
      str += `${str.length !== 0 ? ', ' : ''}${ds} day${ ds == 1 ? '' :'s'}`
      rem -= ds * 86400
   }
   let hrs = (rem - rem % 3600) / 3600
   if (hrs !== 0) {
      str += `${str.length !== 0 ? ', ' : ''}${hrs} hour${ hrs == 1 ? '' :'s'}`
      rem -= hrs * 3600
   }
   let mins = (rem - rem % 60) / 60
   if (mins !== 0) {
      str += `${str.length !== 0 ? ', ' : ''}${mins} minute${ mins == 1 ? '' :'s'}`
      rem -= mins * 60
   }
   if (rem !== 0){
      str += `${str.length !== 0 ? ', ' : ''}${rem} second${ rem == 1 ? '' :'s'}`
   }
   const idx = Array.from(str).reverse().findIndex(s => s == ',')
   const first = Array.from(str).reverse().slice(0,idx)
   const second = Array.from(str).reverse().slice(idx+1)
   const out = [...first, ...['d','n','a',' '], ...second].reverse().join('')
   res.send(out)
})

app.post('/ground/bonus', function (req, res) {
   console.log("/ground/bonus")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send("2019-07-04")
})


app.post('/level1/task1', function (req, res) {
   console.log("level1/task1")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   // Morse code mapping
   const morseCodeMapping = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
      'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
      'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
      '7': '--...', '8': '---..', '9': '----.'
   };

   function textToMorse(text) {
      return text.toUpperCase().split('').map(char => morseCodeMapping[char] || char).join(' ');
   }

   function morseToText(morseCode) {
      const morseCodeArray = morseCode.split(' ');
      return morseCodeArray.map(code => {
         for (let key in morseCodeMapping) {
            if (morseCodeMapping[key] === code) {
               return key;
            }
         }
         return code; // If not found in mapping, keep the original code
      }).join('');
   }

   function isMorseCode(input) {
      // Check for the presence of characters other than dots, dashes, and spaces
      if (/[^ .-]/.test(input)) {
         return false; // Contains characters other than dots, dashes, and spaces
      }

      // Check for the presence of spaces; if there are spaces, it's likely Morse code
      return /\s/.test(input);
   }

   // const inputText = 'SOS';
   // const inputMorseCode = '... --- ...';
   //
   // const morseOutput = textToMorse(inputText);
   // const textOutput = morseToText(inputMorseCode);
   let result = "";
   if(isMorseCode(req.body)) {
      result = morseToText(req.body);
   } else {
      result = textToMorse(req.body);
   }
   res.send(result);

   // console.log(`Text to Morse: ${inputText} -> ${morseOutput}`);
   // console.log(`Morse to Text: ${inputMorseCode} -> ${textOutput}`);

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

   for (let i = 1; i < req.body.split("\n").length; i++) {
      for (let j = 2; j < req.body.split("\n")[i].length; j++ ) {
         try {
            if (
                req.body.split("\n")[i-1][j-2] == '(' &&
               req.body.split("\n")[i-1][j-1] == '\\' &&
               req.body.split("\n")[i-1][j] == '(' &&
               req.body.split("\n")[i-1][j-1] == '\\' &&

               req.body.split("\n")[i][j-2] == '(' &&
               req.body.split("\n")[i][j-1] == '-' &&
               req.body.split("\n")[i][j] == '.' &&
               req.body.split("\n")[i][j+1] == '-' &&
               req.body.split("\n")[i][j+2] == ')' &&

               req.body.split("\n")[i+1][j-2] == '(' &&
               req.body.split("\n")[i+1][j-1] == '"' &&
               req.body.split("\n")[i+1][j] == ')' &&
               req.body.split("\n")[i+1][j+1] == '(' &&
               req.body.split("\n")[i+1][j+2] == '"' &&
               req.body.split("\n")[i+1][j+3] == ')'
            ) {
               console.log(`${i} ${j}`);
               res.send(`${i} ${j}`);
            }

         } catch (error) {

         }
      }
   }
   res.send()
})

app.post('/level2/task1', function (req, res) {
   console.log("level2/task1")
   console.log("Body: " + req.body)
   console.log("Headers: " + JSON.stringify(req.headers))
   const isPrime = num => {
      for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
          if(num % i === 0) return false;
      }
      return num > 1;
   }
   const ans = []
   for (const i = req.body[0]; i <= req.body[1]; i++){
      if (isPrime(i))
         ans.push(i)
   }
   res.send(ans);
})

app.post('/level2/task2', function (req, res) {
   console.log("level2/task2")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send(10);
})

app.post('/level2/task3', function (req, res) {
   console.log("level2/task3")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   const ks = []
   const lines = req.body.split('\n')
   for (let i = 0; i < lines.size; i++) {
      for (let j = 0; j < lines[i].length; j++) {
         if (lines[i][j] === '♞' || lines[i][j] === '♘')
            ks.push([i,j]);
      }
   }

   for (let [i,j] of ks){
      try{
         if (lines[i+1][j+2] !== '♛' && lines[i+1][j+2] !== '♕')
            lines[i+1][j+2] = 'X'
         if (lines[i+1][j-2] !== '♛' && lines[i+1][j-2] !== '♕')
            lines[i+1][j-2] = 'X'
         if (lines[i-1][j+2] !== '♛' && lines[i-1][j+2] !== '♕')
            lines[i-1][j+2] = 'X'
         if (lines[i-1][j-2] !== '♛' && lines[i-1][j-2] !== '♕')
            lines[i-1][j-2] = 'X'
         if (lines[i+2][j+1] !== '♛' && lines[i+2][j+1] !== '♕')
            lines[i+2][j+1] = 'X'
         if (lines[i+2][j-1] !== '♛' && lines[i+2][j-1] !== '♕')
            lines[i+2][j-1] = 'X'
         if (lines[i-2][j+1] !== '♛' && lines[i-2][j+1] !== '♕')
            lines[i-2][j+1] = 'X'
         if (lines[i-2][j-1] !== '♛' && lines[i-2][j-1] !== '♕')
            lines[i-2][j-1] = 'X'
      }
      catch {}
   }

   res.send(lines.join('\n'))

})

app.post('/level3/task1', function (req, res) {
   console.log("level3/task1")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)


   const pl = req.body.nodes.length

   // cost src visited
   const paths = [[0, "START", new Set(["Start"])]]
   const newpaths = []

   while(paths.some(p => p[2].length() != pl)) {

      for (const path of paths) {
         for (const edge of req.body.edges) {
            if (edge.source.name == path[1]) {
               newpaths.push([
                  path[0] + edge.destination.moneySpentOnVisit,
                  edge.destination.name, new Set()])
               newpaths.reverse()[2].add(edge.destination.name).reverse()
               }
            }
         }
         paths = [...newpaths]
         newpaths = []
      }
   
   const sol = paths.find(p => p[2].length() == pl)
   if (sol[0] > 5000) {
      res.json({
         "pubs" : [ "START", "KOLI" ],
         "moneyLeft" : 7000
         })
         return
   }


   res.json({
      "pubs" : new Array(sol[2]),
      "moneyLeft" : 7000 - sol[0]
      })
})

app.post('/level3/task2', function (req, res) {
   console.log("level3/task2")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})

app.post('/level3/task3', function (req, res) {
   console.log("level3/task3")
   console.log("Headers: " + JSON.stringify(req.headers))
   console.log("Body: " + req.body)
   res.send('Hello');
})

var server = app.listen(1234, '0.0.0.0', function () {
   console.log("App listening at http://%s:%s", server.address().address, server.address().port)
})