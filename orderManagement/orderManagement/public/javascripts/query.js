var mysql = require('mysql');
var operations = require('./bookCatalogLib.js').operations;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
});
connection.connect();


// var main = function(){
// 	operations[process.argv[2]](connection , process.argv[3]); 
// }
// main();
connection.end();