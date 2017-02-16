const express = require('express');
const path = require('path');
const reporter = require('cucumber-html-reporter')
const morgan = require('morgan')

var app = express()

app.use(morgan('combined'))
app.use(express.static('./build'));

app.get('/', function (req, res) {
  console.log(req.query.url);
  const options = {
    theme: 'bootstrap',
    jsonFile: 'test/cucumber.json',
    output: 'build/report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
  };

  reporter.generate(options);
  res.sendFile(path.join(__dirname, './build', 'report.html'));
})

app.listen(3010);
