Enter file contents here
// retrieve password when username is given

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var path = require('path')
var ObjectId = require('mongodb').ObjectID;
var PythonShell = require('python-shell');
var url = 'mongodb://localhost:27017/vendor';

//var user="rajkiran"
var dateFormat = require('dateformat');
var now = new Date();

var v_name
var token = 0
var pwd
var nodeArr
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var app1    = express();
app1.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true })); 
var today = new Date();
console.dir(today);
var oneMonth = new Date(new Date(today).setMonth(today.getMonth()+1));
//var month = today.getMonth();
//console.dir(month);
app.get('/',function(req,res) {
res.write('<html> <head> </head> <body> <center>');
console.dir(__dirname);
res.write('<h2>Vendor Search System</h2>');
file1 = fs.readFile('index.html',function(err,data) {
res.write(data);
});
// - Code for expiring in last 30 days.
var expVendor = function(db, callback) {
								console.dir(oneMonth);
								// ----------------------------------------------------trial
								//-----------------------------------------------------trial
			
		   var cursor =db.collection('vendor').find( { 'lenddate': { $lte : new Date(oneMonth)}});
		   //console.dir(cursor);
								
								
								res.write('<h3>Vendor License Expiry Notification</h3>');
								res.write('<form name="report" >');
								res.write('<table border="1" style="width:70% ; "> <tr><th>Vendor Name</th> <th><b>Products</b></th><th><b>License Start Date</b></th><th><b> License End Date </b> </th><th><b>Status</b></th> </tr>');
							   cursor.each(function(err, doc) {
								   
								   
								  assert.equal(err, null);
								  if(doc != null) {
									// ---------------------------- COPY
									
									v_name = doc.vname
								//console.dir

																if ( doc.lenddate < oneMonth )
																{
																
																	
																	res.write('<tr><td><input type="text" name="pname" readonly value="'+ v_name +'"/></td><td><input type="text" name="pname" readonly value="'+doc.pname+'"/></td><td><input type="text" name="l_sdate" readonly value="'+ dateFormat(doc.lstartdate,"yyyy-mm-dd")+'"/></td><td><input type="text" name="l_edate" readonly value="'+dateFormat(doc.lenddate,"yyyy-mm-dd")+'"/></td><td><input type=text id="lstatus" name="lstatus" readonly value="'+doc.lstatus+'"/></td></tr>');
																
																
																
																											
														
															}
															
												}
								
										//token=1;
									else
								  {
								  res.write('</table>');
								res.write('</form>');
									res.write('</center></body></html>');
									res.end();
								  }
								  
										
										
									// ----------------------------- COPY
								
									
								  }); // cursor ends here
											console.dir('OUT of Cursor' );
								
									 
									
									//res.end();
		}; // ExpIn30Days ends here 

		
		MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  expVendor(db, function() {
					  db.close();
				  });
				});
// - Code for expiring in last 30 days.



//res.end();




});




app.get('/add_user.html',function(req,res){
res.sendFile(__dirname+'\\'+'add_user.html');


});

app.post('/search', function(req, res) {

//console.dir(dateFormat(now,"yyyy-mm-dd"));
		res.write('<html> <head> </head> <body><center>')
	v_name = req.body.v_name;
							// -- function starts here !!!!
		var searchVendor = function(db, callback) {
								
								// ----------------------------------------------------trial
								//-----------------------------------------------------trial
								var checkprint=0
								var enable = 0
		   var cursor =db.collection('vendor').find({"vname":v_name});
		   
								console.dir(v_name);
								
								
							   cursor.each(function(err, doc) {
								   
								  assert.equal(err, null);
								
								  if (doc != null) {
								
													if(checkprint == 0)
																		{
																		res.write('<h2 style="LINE-HEIGHT:25px;"> Vendor Details for : '+ v_name +'</h2>');
																		res.write('<form name="update_vendor" action="http://localhost:9090/update"  method="post">');
																		res.write('<table border="1" style="width:100% ; "> <tr align=center> <th><b>Products</b></th><th><b>License Start Date</b></th><th><b> License End Date </b> </th><th> <b> Renew Date</b></th><th><b>Status</b></th> <th> <b>Comments</b></th><th>Action</th></tr>');
																		checkprint=1;
																		}
													res.write('<tr><form name="update_vendor" action="http://localhost:9090/update"  method="post"><td align=center width="10%";height="20%";><input type="text" name="pname" readonly value="'+doc.pname+'"></td><td width="15%";height="20%";><input type="text" name="l_sdate" readonly value="'+ dateFormat(doc.lstartdate,"yyyy-mm-dd")+'"/></td><td width="15%";height="20%";><input type="text" name="l_edate" readonly value="'+dateFormat(doc.lenddate,"yyyy-mm-dd")+'"></td><td align=center width="30%";height="20%";><b></b> <input type="date" id="l_renew_date" name="l_renew_date" placeholder="yyyy-mm-dd" /></td> <td><select id="lstatus" name="lstatus"><option selected>'+doc.lstatus+'</option><option>To be initiated</option><option >Triggered with Vendor</option><option >PO initiated with Purchase</option><option >PO available</option><option>PO Shared with vendor</option><option>Renewal document signed</option><option>Renewed</option></select></td><td><input type="textarea" name="lcomments" placeholder="'+ doc.lcomments+'"/></td><input type=hidden name="licenseno" id="l_licenseno" value="'+doc.licenseno+'"/>');
													res.write('<input type=hidden name="vname" id="vname" value="'+v_name+'"/>');
													res.write('<td align="center"><input type="submit" value="Update Details" /></td></form></tr>');
															enable=1;
								
								
													}
								  else {
								  
											if( enable == 1)
											{
											//res.write('<tr><td colspan = 6 align="center"><input type="submit" value="Update Details" /></td></tr>');
											res.write('</table>');
											res.write('</BR> </BR> </BR>');
											res.write('</center></body></html>');
											
											// adding HTML for license update.
														res.write('<!DOCTYPE html> \
<html>\
<head>\
<meta charset="utf-8" />\
<title>Add Vendor</title>\
</head>\
<body>\
<div id="add_vendor">\
<center><h3> Add a License or a Product for  '+v_name+'</h3>\
	<form action="http://localhost:9090/add_vendor"  method="post"> \
                <table border="3"  align="center" >\
            <tr><th>Vendor Name</th>\
			<th>Product Name</th>\
			<th>Status</th>\
			<th>Start Date</th>\
			<th>End Date </th>\
			<th>Comments</th>\
			</tr> \
			<tr>\
			<td><input type="text" id="vname" name="vname" value="'+v_name+'" readonly/></td>\
            <td><input type="text" id="pname" name="pname" placeholder="Enter Product Name" required/></td>\
			<td><select id="selected_opt" name="selected_opt">\
				<option selected>To be initiated</option>\
				<option >Triggered with Vendor</option>\
				<option >PO initiated with Purchase</option>\
				<option >PO available</option>\
				<option>PO Shared with vendor</option>\
				<option>Renewal document signed</option>\
				<option>Renewed</option>\
				</select>\
			</td>\
			<td><input type="date" id="sdate" name="sdate" placeholder="yyyy-mm-dd" required/></td>\
			<td><input type="date" id="edate" name="edate" placeholder="yyyy-mm-dd" required/></td>\
            <td><textarea id="comments" name="comments" placeholder="Comment" required></textarea></td>\
			<input type="hidden" id="pliscenceno" name="pliscenceno"  />\
			</tr>\
            <tr><td colspan = 6 align="center"><input type="submit" value="Save Details" /></td></tr>\
		</table>\
		    </form>\
 	</center>\
</div>\
</body>\
</html>');												}
															else if ( enable == 0)
															  {
																res.write('<html> <head> </head> <body> <center> <b> Entered Vendor Does not exist. Kindly enter valid Vendor  or  <a href="add_user.html">Add Vendor</a> </b></center></body></html>');
															
															  }
								res.end();
									 
								  }
											});// cursor ends here
										
											
									  											
										
			

			
			
			
			
											
		

		}; // searchVendor ends here 

			

				MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  searchVendor(db, function() {
			
					  db.close();
					  
				  });
									 
				});
			
							// -- function ends here !!!
								//  res.send('You sent the name "' + v_name + pwd + '".');
});
// -- app.post ends here !!!!!!


app.post('/add_vendor', function(req, res) {
//console.dir(dateFormat(now,"yyyy-mm-dd"));
		//res.write('<html> <head> </head> <body><center>')
	
							// -- function starts here !!!!
		var addVendor = function(db, callback) {
					vendorname=req.body.vname
					p_name=req.body.pname
					licenseno=req.body.pliscenceno
					status=req.body.selected_opt
					comments = req.body.comments
					start_date=req.body.sdate
					end_date=req.body.edate;
					var insert=0;
					
					var check_existing_cursor =db.collection('vendor').find({vname:vendorname,pname:p_name }).sort({"licenseno":-1}).limit(1);
					check_existing_cursor.each(function(err, doc) {
								   
								   
								  assert.equal(err, null);
								  if(doc != null) {
								  console.dir(doc.licenseno);
								  var string = doc.licenseno;
								  var l_number = parseInt(string);
								  console.log(l_number);
								  db.collection('vendor').insert({ "vname":doc.vname ,"pname":p_name,"licenseno":l_number+1,"lstartdate": new Date(start_date),"lenddate": new Date(end_date),"lstatus":status,"lcomments":comments											
											}
											);

									db.collection('vendor').save();
								console.dir('HERE');
								console.dir(__dirname);
								res.write('<!DOCTYPE html>	\
<html>	\
<head>	\
<meta charset="utf-8" />	\
<title>Add Vendor</title>	\
</head>	\
<body>	\
<div id="add_vendor">	\
<form name="update_notification" action="http://localhost:9090/" method="get" >	\
<center><h3>Vendor Updated</h3>	\
<input type="submit" value="Home Page"/>  \
</form> \
</center> \
</div> \
</body> \
</html>');
									insert=1;
									//res.write('good');
								  //res.sendFile(__dirname+'\\'+'a_user_update.html');
								  
								  }
								  else{
								  // Vendor Does not exist !
								  if (insert == 0 )
								  {
									db.collection('vendor').insert({ "vname":vendorname ,"pname":p_name,"licenseno":1,"lstartdate": new Date(start_date),"lenddate": new Date(end_date),"lstatus":status,"lcomments":comments											
											}
											
											);

									db.collection('vendor').save();
									res.sendFile(__dirname+'\\'+'a_user_update.html');
									}
									
									res.end();
								  }
								  });
					

				
			
			
				
							
				
						
							  
		

		}; // addVendor ends here 



				MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  addVendor(db, function() {
					  db.close();
				  });
				});
							// -- function ends here !!!
								//  res.send('You sent the name "' + v_name + pwd + '".');
});
//-- add_vendor here

app.post('/update', function(req, res) {
//console.dir(dateFormat(now,"yyyy-mm-dd"));
							// -- function starts here !!!!
		var updateVendor = function(db, callback) {
					vendorname=req.body.vname
					p_name=req.body.pname
					licenseno=req.body.licenseno
					status=req.body.lstatus
					comments = req.body.lcomments
					start_date=req.body.l_edate
					end_date=req.body.l_renew_date
					var check_update=0;
					console.log(vendorname);
					console.log(p_name);
					console.log(status);
					console.log(comments);
					console.log(start_date);
					console.log(end_date);
					console.log(licenseno);
					var string =licenseno;
					var l_number = parseInt(string);
					
					console.log(db.collection('vendor').update({"vname":vendorname,"licenseno":l_number,"pname":p_name},
					{$set:{"lstartdate": new Date(start_date),"lenddate":new Date(end_date),"lstatus":status,"lcomments":comments}}));
					
						db.collection('vendor').save();
						
					res.sendFile(__dirname+'\\'+'a_user_update.html');
					
					
					
}; 
				MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  updateVendor(db, function() {
					  db.close();
				  });
				});// update vendor ends here 
});





app.listen(9090, function() {
console.log('Server running at http://BLRKEC325016D:9090/');
});




