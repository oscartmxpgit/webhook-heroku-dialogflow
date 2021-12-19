var fs=require('fs');
var data=fs.readFileSync('./data/biblia.json', 'utf8');

var words=JSON.parse(data);
var bodyparser=require('body-parser');

//console.log(words);

var libro;

for (key in words) {
    if (words.hasOwnProperty(key)) {
        if (key==="Rut" ){
            libro=words[key];
        }
    }
  }



  var capitulos;

  for (key in libro) {
    if (libro.hasOwnProperty(key)) {
            if (key==="chapters" ){
                capitulos=libro[key];
            }
        }

    }

    var versiculos;

  for (key in capitulos) {
    if (capitulos.hasOwnProperty(key)) {
            if (key==="0" ){ //digamos que es el cap 1
                versiculos=capitulos[key];
            }
        }
    }


var result;

for (key in versiculos) {
    if (versiculos.hasOwnProperty(key)) {

            if (key==="verses" ){ //digamos que es el cap 1
                result=versiculos[key];
            }
        }
    }

//console.log(result);

for (key in result) {
    if (result.hasOwnProperty(key)) {
            if (key==="1" ){ //digamos que es el versículo 1
                final=result[key];
            }
        }
    }
    console.log(versiculos);
