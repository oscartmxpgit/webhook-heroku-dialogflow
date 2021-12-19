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
  libro=req.body.queryResult.parameters.citalibro;
  capitulo=req.body.queryResult.parameters.citacapitulo;
  versiculo=req.body.queryResult.parameters.citaversiculo;

  speech = words[libro]["chapters"][capitulo]["verses"][versiculo];

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
