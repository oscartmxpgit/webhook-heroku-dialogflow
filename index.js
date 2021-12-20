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

restService.get("/prueba", function(req, res) {
  console.log("aqui");
  return res.json({
    "satus":"ok"

    });
});

restService.post("/echo", function(req, res) {
  var fs=require('fs');
  var data=fs.readFileSync('./data/biblia.json', 'utf8');

  var words=JSON.parse(data);

  var libro=req.body.queryResult.parameters.citalibro;
  var capitulo=req.body.queryResult.parameters.citacapitulo;

  var numVer=words[libro]["chapters"][capitulo]["ctd_verses"];

  var speech="";

  for (let step = 1; step <= numVer; step++) {
    speech += words[libro]["chapters"][capitulo]["verses"][step] + "\n";
  }


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
