"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

var fs=require('fs');
var data=fs.readFileSync('./data/biblia.json', 'utf8');

var words=JSON.parse(data);
var bodyparser=require('body-parser');

restService.post("/echo", function(req, res) {
  var speech=words[req.body.queryResult.parameters.citalibro]["chapters"]["0"];
  var speech1 =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.citalibro
      ? req.body.queryResult.parameters.citalibro
      : "Seems like some problem. Speak again."+req.body;
  return res.json({

  "fulfillmentText": speech,
  "fulfillmentMessages": [
    {
      "text": {
        "text": [speech]
      }
    }
  ],
  "source": "<webhookpn1>"


  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
