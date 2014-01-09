var handler = {};
var ordermgmt = require('./query.js').ordermgmt;
exports.displayList = function(req, res){
 ordermgmt.list(req , res);
};
exports.getCustInfo = function(req, res){
	console.log(req.body);
  res.render('customer');
};
exports.displaySuccessMsg = function(req, res){
	ordermgmt.insertToCustInfo(req , res);
};
exports.handler = handler;


