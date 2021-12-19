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
        console.log(key);
            if (key==="0" ){ //digamos que es el cap 1
                versiculos=capitulos[key];
            }
        }
    }

console.log(versiculos);


