var fs=require('fs');
var data=fs.readFileSync('./data/biblia.json', 'utf8');

var words=JSON.parse(data);
var bodyparser=require('body-parser');

//console.log(words);

console.log(words["Génesis"]["chapters"]["0"]);