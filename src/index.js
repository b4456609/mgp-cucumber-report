const express = require('express');
const path = require('path');
const reporter = require('cucumber-html-reporter')
const morgan = require('morgan')
const fs = require('fs')
const request = require('request');

var app = express()

app.use(morgan('combined'))
app.use(express.static('./build'));

app.get('/', function (req, res) {
  console.log(req.query.url);
  let stream = request
    .get(req.query.url)
    .pipe(fs.createWriteStream('build/cucumber.json'))
  stream.on('error', function (err) {
    console.log(err)
    res.status(400).send('Bad Request');
  })
  stream.on('finish', function () {
    console.log("The file was saved!");
    const options = {
      theme: 'bootstrap',
      jsonFile: 'build/cucumber.json',
      output: 'build/report.html',
      reportSuiteAsScenarios: true,
      launchReport: false,
    };

    reporter.generate(options);
    res.sendFile(path.join(__dirname, './build', 'report.html'));
  })


})

app.listen(3010);
console.log("The port listen on 3010");
