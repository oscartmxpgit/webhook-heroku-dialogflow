var fs=require('fs');
var data=fs.readFileSync('./data/biblia.json', 'utf8');

var words=JSON.parse(data);
var bodyparser=require('body-parser');
const res = require('express/lib/response');

var libro=Rut;
var capitulo=0;

var numVer=words[libro]["chapters"][capitulo]["ctd_verses"];

var result="";

for (let step = 1; step <= numVer; step++) {
    result += words[libro]["chapters"][capitulo]["verses"][step] + "\n";
}

console.log(result);