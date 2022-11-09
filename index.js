// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { application } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const currentDate = Date()
  const currentUnix = Date.parse(currentDate)
  console.log(currentUnix, currentDate)
  res.json({ unix: currentUnix, utc: currentDate })
})

// Handle request with date-string
app.get('/api/:date?', (req, res) => {
  const providedDate = req.params.date
  const providedDateRegex = /^[0-9]+$/
  const userTimestamp = providedDateRegex.test(providedDate)

  if (!userTimestamp) {
    const unixTimestamp = Date.parse(providedDate)
    const utcDate = Date(unixTimestamp)
    
    if (unixTimestamp) {
      res.json({ "unix": unixTimestamp, "utc": utcDate })
    } else {
      res.json({ error: "Invalid Date" })
    }
  } 
  else {
    const utcDate = Date(providedDate)
    res.json({ "unix": providedDate, "utc": utcDate })
  }
})



// [ORIGINAL] listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// [ORIGINAL] listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
