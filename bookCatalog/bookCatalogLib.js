
var operations = {};
 
var bookInfo={
	isbn : null,
	auther : null,
	bookTitle : null,
	price : null,
	publisher : null,
	noOfPages : null
};
var getBookInfo = function(record){
	record = record.split(";");
	var options=['isbn','price','auther','bookTitle','publisher','noOfPages'];
	record.forEach(function(detail){
		options.forEach(function(element){
			if(detail.indexOf(element) > -1)
			bookInfo[element] = detail.slice(detail.indexOf(':')+1).trim();			
		});
	});
	return bookInfo;
};
operations.list = function(connection){
connection.query('SELECT * from test.BookCatalog', function(err, rows, fields) {
	if (err) throw err;
	var bookNames = [];
	rows.forEach(function(record){
	bookNames.push(record.bookTitle);
	})
	console.log('The solution is: ',bookNames);
	});
};
operations.addRecord = function(connection , record){
	bookInfo = getBookInfo(record);

	connection.query('insert into test.BookCatalog values ("'
		+bookInfo.isbn+'","'+bookInfo.bookTitle+'","'+bookInfo.auther+'","'
		+bookInfo.price+'","'+bookInfo.publisher+'","'+bookInfo.noOfPages+'")'
		, function(err, rows, fields) {
	if (err) throw err;
	console.log("inserted sucessfully");
	});
	connection.query('commit', function() {});
};

exports.operations = operations;