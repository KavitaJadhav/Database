var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345'
});
connection.connect();

var ordermgmt = {};

ordermgmt.list = function(req , res){
connection.query('SELECT * from order_mgmt.products', function(err, rows, fields) {
	if (err) throw err;
	if(rows.length == 0) { 
		console.log("\nSorry . No record avaliable ... ");
		return;
	} 
  	res.render('displayList' ,{products : rows});
	});
};
ordermgmt.insertToCustInfo = function(req , res){
	connection.query("select max(cust_id) as id from order_mgmt.customer", function(err, rows, fields) {
		if (err) throw err;
		if (rows[0].id == null) rows[0].id = 100;

		var query = 'insert into order_mgmt.customer values ("' + (++rows[0].id)
			 + '" , "'+ '1" , "' + req.body.cust_name + '" , "' + req.body.add1 + '" , "' 
			+ req.body.city + '" , "' + req.body.contact + '");';
		connection.query(query, function(err, rows, fields) {
			if (err) throw err;
		});

	});
	connection.query('commit', function() {});
	res.render('success');
};
// ordermgmt.insertProduct = function(req , res){
// connection.query('insert into order_mgmt.products values ', function(err, rows, fields) {
// 	if (err) throw err;
// 	if(rows.length == 0) { 
// 		console.log("\nSorry . No record avaliable ... ");
// 		return;
// 	} 
// 	console.log(rows);
//   	res.render('displayList' ,{products : rows});
// 	});
// };
exports.ordermgmt = ordermgmt;
