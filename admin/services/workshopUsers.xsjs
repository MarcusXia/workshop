var SESSIONINFO = $.import("workshop.admin.services", "session");

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getRoles() {
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT "ROLE_NAME", "ROLE_ID", "ROLE_MODE", "GLOBAL_IDENTITY", "CREATOR", "CREATE_TIME" FROM "SYS"."ROLES" WHERE "CREATOR" = ? ORDER BY "ROLE_NAME"  ';
	rs = conn.executeQuery(query,'_SYS_REPO');
	var jsonOut = {"Roles":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.Roles.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
}

function getAssignedRoles() {
	var user = $.request.parameters.get("username").toUpperCase();
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT * FROM "SYS"."GRANTED_ROLES" WHERE "GRANTEE" = ?';
	rs = conn.executeQuery(query, user);
	var jsonOut = {"AssignedRoles":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.AssignedRoles.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
}


function getUsers() {
	var user = $.request.parameters.get("username").toUpperCase();
	if (typeof user === 'undefined') {
		user = "%";
	} else {
		user += "%";
	}
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query = 'SELECT "USER_NAME", "USER_ID", "USER_MODE", "EXTERNAL_IDENTITY", "CREATOR", "CREATE_TIME", "VALID_FROM", '
			+ '"VALID_UNTIL", "LAST_SUCCESSFUL_CONNECT", "LAST_INVALID_CONNECT_ATTEMPT", "INVALID_CONNECT_ATTEMPTS", "ADMIN_GIVEN_PASSWORD", '
			+ '"PASSWORD_CHANGE_TIME", "PASSWORD_CHANGE_NEEDED", "USER_DEACTIVATED", "DEACTIVATION_TIME", "IS_PASSWORD_ENABLED", '
			+ '"IS_KERBEROS_ENABLED", "IS_SAML_ENABLED", "IS_X509_ENABLED" '
			+ 'FROM "SYS"."USERS" WHERE "USER_NAME" LIKE ?';
	rs = conn.executeQuery(query, user);
	var jsonOut = {"Users":[]};
	for(var i=0; i<rs.length;i++){
		jsonOut.Users.push(rs[i]);
	}
	conn.close();

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonOut));
}

function createUsers() {
	var userJson = JSON.parse($.request.body.asString());
	var conn = $.hdb.getConnection();
	var log = '';
	
	try {
		for ( var i = 0; i < userJson.number; i++) {
			var localNum = i + 1;
			if(userJson.number < 100){
				var userId = userJson.user + pad(localNum, 2, 0);				
			}else{
				var userId = userJson.user + pad(localNum, 3, 0);				
			}

			userId = userId.toUpperCase();
			var query = 'CREATE USER ' + userId
					+ ' PASSWORD ' + userJson.password
					+ ' SET PARAMETER CLIENT = \'001\'';
			conn.executeUpdate(query);

			var query2 = 'ALTER USER ' + userId
					+ ' DISABLE PASSWORD LIFETIME';
			conn.executeUpdate(query2);
			
			var CREATE_USERS_XS = conn.loadProcedure("WORKSHOP", 
		    	"workshop.admin.procedures::CREATE_USERS_XS");			
			for ( var x = 0; x < userJson.roles.length; x++) {
				CREATE_USERS_XS(userId,userJson.roles[x].role_name);
			}
			log = log + 'User ' + userId + ' successfully created \n'; 
		}

		conn.commit();
		conn.close();

		$.response.status = $.net.http.OK;
		$.response.contentType = "text/plain";
		$.response.setBody(log);
	} catch (err) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(err.message);
	}

}

function createUsers2() {
	var userJson = JSON.parse($.request.body.asString());
	var conn = $.hdb.getConnection();
	var log = '';

    try {  
  	
        var ROLES = [];
    	for ( var x = 0; x < userJson.roles.length; x++) {
    		var role = {};
    		role.ROLE_NAME = userJson.roles[x].role_name
    		ROLES.push(role);
    	}
    	var userId = userJson.user;
		var create_users_mass = conn.loadProcedure("WORKSHOP", 
    	"workshop.admin.procedures::create_users_mass");
		var rs = create_users_mass(userId.toUpperCase(),userJson.password,userJson.number,ROLES);
    	
        for(var i = 0; i < rs.LOG.length; i++){
        	log += rs.LOG[i].MESSAGE + '\n';
        }
	conn.commit();

	$.response.status = $.net.http.OK;
	$.response.contentType = "text/plain";
	$.response.setBody(log);
	
	} catch (err) {
        log += err.toString() + "\n--------\n\n";  
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(err.message);
	}

}

function deleteUsers() {
	var userJson = JSON.parse($.request.body.asString());
	var conn = $.hdb.getConnection();
	var log = '';
	
	try {
		for ( var i = 0; i < userJson.number; i++) {
			var localNum = i + 1;
			var userId = userJson.user + pad(localNum, 2, 0);
			userId = userId.toUpperCase();
			var query = 'DROP USER ' + userId
					+ ' CASCADE ';
			conn.executeUpdate(query);
			log = log + 'User ' + userId + ' successfully dropped \n'; 
		}
		conn.commit();

		$.response.status = $.net.http.OK;
		$.response.contentType = "text/plain";
		$.response.setBody(log);
	} catch (err) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(err.message);
	}

}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "getRoles":
	getRoles();
	break;
case "getAssignedRoles":
	getAssignedRoles();
	break;	
case "getUsers":
	getUsers();
	break;
case "createUsers":
	createUsers2();
	break;
case "deleteUsers":
	deleteUsers();
	break;	
case "getSessionInfo":
	SESSIONINFO.fillSessionInfo();
	break;
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('Invalid Request Method');
}