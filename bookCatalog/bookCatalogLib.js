var operations = {};
var bookInfo={};
 
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
var displayRecords = function(rows){
	if(rows.length == 0) { 
		console.log("\nSorry . No record avaliable ... ");
		return;
	} 
	var listOfBooks = "";
	rows.forEach(function(book){
		listOfBooks = listOfBooks+book.isbn+'  '+book.bookTitle+'  '+book.auther+'  '
		+book.price+'  '+book.publisher+'  '+book.noOfPages+'\n';
	})
	console.log('list:\n ',listOfBooks);
}
operations.list = function(connection){
connection.query('SELECT * from test.BookCatalog', function(err, rows, fields) {
	if (err) throw err;
	displayRecords(rows);
	});
};
operations.addRecord = function(connection , record){
	bookInfo = getBookInfo(record);

	connection.query('insert into test.BookCatalog values ("'
		+bookInfo.isbn+'","'+bookInfo.bookTitle+'","'+bookInfo.auther+'","'
		+bookInfo.price+'","'+bookInfo.publisher+'","'+bookInfo.noOfPages+'")'
		, function(err, rows, fields) {
	if (err) throw err;
	console.log("book with "+bookInfo.isbn+" inserted sucessfully");
	});
	connection.query('commit', function() {});
};
var getqueryToUpdateRecord = function(){
	var options=['price','auther','bookTitle','publisher','noOfPages'];

	var query = "update test.BookCatalog set ";
	options.forEach(function(feild){
		if (bookInfo[feild]) query = query + feild + " = '" + bookInfo[feild] + "', ";
		});
	query = query.slice(0,query.length-2)+ "  where isbn like "+ bookInfo.isbn;
	return query;
};
operations.updateRecord = function(connection , record){
	bookInfo = getBookInfo(record);
	query = getqueryToUpdateRecord(bookInfo);
	connection.query(query , function(err, rows, fields) {
	if (err) throw err;
	console.log("book with isbn "+bookInfo.isbn+" updated  sucessfully");
	});
	connection.query('commit', function() {});
};
operations.deleteRecord = function(connection , record){
	var isbn = record.slice(record.indexOf(':')+1).trim();	
	connection.query("delete from test.bookCatalog where isbn like " + isbn, function(err, rows, fields) {
	if (err) throw err;
	console.log("book with isbn "+isbn+" deleted  sucessfully");
	});
	connection.query('commit', function() {});
};
var getqueryToSearchRecord = function(){
	var options=['isbn','price','auther','bookTitle','publisher','noOfPages'];
	var query = "select * from test.BookCatalog where ";
	options.forEach(function(feild){
		if (bookInfo[feild]) query =" "+ query + feild + " = '" + bookInfo[feild] + "' && ";
		});
	query = query.slice(0,query.length-3);
	return query;
};
operations.searchRecord = function(connection , record){
	bookInfo = getBookInfo(record);
	var query = getqueryToSearchRecord(bookInfo);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		displayRecords(rows)
	});
	connection.query('commit', function() {});
};

exports.operations = operations;