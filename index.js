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

  var abreviacion="";
  var capitulo="";
  var nombreLibro="";

  var numVer="";

  var speech="";

  var key="";

  try {
    abreviacion=req.body.queryResult.parameters.citalibro;
    capitulo=req.body.queryResult.parameters.citacapitulo - 1;

    for (key in words) {
      if (words[key]["abreviacion"]===abreviacion ){
        nombreLibro=key;
      }
    }

    numVer=words[nombreLibro]["chapters"][capitulo]["ctd_verses"];

    for (let step = 1; step <= numVer; step++) {
      speech += words[nombreLibro]["chapters"][capitulo]["verses"][step] + "\n";
    }

    if (speech.length > 4095){
      speech=speech.substring(0, 4091)+"...";
    }

  }
  catch(err) {
    speech="No es una cita válida";
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
