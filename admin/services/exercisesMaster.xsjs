var SESSIONINFO = $.import("workshop.admin.services", "session");

function getExercises(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');
	
}

function getWorkshopList(){
	
	try {
	var searchPackage = "workshop.admin.services";
	var objName = "%";
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT TOP 200 DISTINCT "OBJECT_NAME" FROM "_SYS_REPO"."ACTIVE_OBJECT" '+
	            ' WHERE "PACKAGE_ID" = ? and "OBJECT_NAME" LIKE ? AND "OBJECT_SUFFIX" = '+ "'json'" + 'ORDER BY LOWER("OBJECT_NAME")';
	rs = conn.executeQuery(query, searchPackage, objName);
	var jsonOut = {"Objects":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.Objects.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
	}
	catch(err){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(err.message);
	}	
   
}
function getObject(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');

}

function createWorkshop(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');

}

function getPackages(){
	var searchPackage = $.request.parameters.get("package");
	if (typeof searchPackage === 'undefined') {
		searchPackage = "%";
	} else {
		searchPackage += "%";
	}
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT TOP 200 "PACKAGE_ID" FROM "_SYS_REPO"."PACKAGE_CATALOG" '+
	            '   WHERE "PACKAGE_ID" LIKE ? ORDER BY "PACKAGE_ID" ';
	rs = conn.executeQuery(query, searchPackage);
	var jsonOut = {"Packages":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.Packages.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
	
}

function getObjList(){
	var searchPackage = $.request.parameters.get("package");
	var objName = $.request.parameters.get("obj");
	if (typeof objName === 'undefined') {
		objName = "%";
	} else {
		objName += "%";
	}
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT TOP 200 DISTINCT "OBJECT_NAME" FROM "_SYS_REPO"."ACTIVE_OBJECT" '+
	            ' WHERE "PACKAGE_ID" = ? and "OBJECT_NAME" LIKE ? ORDER BY LOWER("OBJECT_NAME")';
	rs = conn.executeQuery(query,searchPackage,objName);
	var jsonOut = {"Objects":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.Objects.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
	
}

function getExtList(){
	var searchPackage = $.request.parameters.get("package");
	var objName = $.request.parameters.get("obj");
	if (typeof objName === 'undefined') {
		objName = "%";
	} else {
		objName += "%";
	}
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT TOP 200 DISTINCT "OBJECT_SUFFIX" FROM "_SYS_REPO"."ACTIVE_OBJECT" '+
	            ' WHERE "PACKAGE_ID" = ? and "OBJECT_NAME" LIKE ? ORDER BY LOWER("OBJECT_SUFFIX")';
	rs = conn.executeQuery(query,searchPackage,objName);
	var jsonOut = {"Extensions":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.Extensions.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
	
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "getExercises":
	getExercises();
	break;
case "getObject":
    getObject();
    break;
case "getWorkshopList":
	getWorkshopList();
	break;
case "createWorkshop":
	createWorkshop();
	break;
case "getSessionInfo":
	SESSIONINFO.fillSessionInfo();
	break; 
case "getPackages":
	getPackages();
	break;
case "getObjList":
	getObjList();
	break;
case "getExtList":
	getExtList();
	break;
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('Invalid Request Method');
}