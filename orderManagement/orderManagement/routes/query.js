var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345'
});
connection.connect();

var ordermgmt = {};

ordermgmt.list = function(req , res){
connection.query('SELECT * from order_mgmt.products order by p_name', function(err, rows, fields) {
	if (err) throw err;
	if(rows.length == 0) { 
		console.log("\nSorry . No record avaliable ... ");
		return;
	} 
  	res.render('displayList' ,{products : rows});
	});
};

ordermgmt.create_order = function(req , res){
	connection.query("select max(order_id) as id from order_mgmt.orders", function(err, rows, fields) {
		if (err) throw err;
		var o_id = rows[0].id;

		connection.query("select p_id ,unit_price from order_mgmt.products where p_name = \"" 
		+ req.body.item+"\";", function(err, rows, fields) {
		if (err) throw err;
		var p = rows[0];

		order_query = 'insert into order_mgmt.orders values ("' + (++o_id)
		 + '" , "'+ p.p_id +'" , current_date ,"' + req.body.qty+ '" , "' 
		 + req.body.qty * p.unit_price + '" , "N");';	

			var p= connection.query(order_query, function(err, rows, fields) {
				if (err) throw err;
			});
		});
	}); 
  res.render('customer');
};
ordermgmt.insertToCustInfo = function(req , res){
	connection.query("select max(cust_id) as id from order_mgmt.customer", function(err, rows, fields) {
		if (err) throw err;
		if (rows[0].id == null) rows[0].id = 100;

		var cust_query = 'insert into order_mgmt.customer values ("' + (++rows[0].id)
			 + '" , "'+ '1" , "' + req.body.cust_name + '" , "' + req.body.add1 + '" , "' 
			+ req.body.city + '" , "' + req.body.contact + '");';
		connection.query(cust_query, function(err, rows, fields) {
			if (err) throw err;
		});

	});
	connection.query('commit', function() {});
	res.render('success');
};

exports.ordermgmt = ordermgmt;
