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

var libro="";
var capitulo="";
var speech="";

restService.post("/echo", function(req, res) {
  libro='"'+req.body.queryResult.parameters.citalibro+'"';
  capitulo='"'+req.body.queryResult.parameters.citacapitulo+'"';

  var numVer=words[libro]["chapters"][capitulo]["ctd_verses"];

  for (let step = 1; step <= numVer; step++) {
    speech += words[libro]["chapters"][capitulo]["verses"][step] + "\n";
  }

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
