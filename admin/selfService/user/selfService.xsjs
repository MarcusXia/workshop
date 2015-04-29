var utils = $.import('/sap/hana/xs/selfService/user/utils.xsjslib');
var appTexts = $.import("/sap/hana/xs/selfService/user/resources/apptexts.xsjslib");
var pwdUtil = $.import('/sap/hana/xs/selfService/user/pwdUtil.xsjslib');

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getNextUser(email){
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var userName = '';
	var query = 'SELECT * FROM "WORKSHOP"."workshop.admin.data::clientInstanceAssignment.Assignments" ' + 
		        ' WHERE "USER_ID" LIKE ? AND "ASSIGNED" = ? ORDER BY "USER_ID" DESC  ';
	rs = conn.executeQuery(query, 'WORKSHOP_%', 'X');
	if(rs.length<1){
		userName = 'WORKSHOP_01';
	}else{
		var highUser = rs[0].USER_ID;
		var res = highUser.split("_");
		var groupNumber = res[1] + 1;
		var userName = 'WORKSHOP_' + pad(groupNumber, 2, 0);
	}
	
	var query = 'UPSERT "WORKSHOP"."workshop.admin.data::clientInstanceAssignment.Assignments" ' + 
		        ' (USER_ID, ASSIGNMENT_TIMESTAMP, EMAIL, ASSIGNED) ' +
				' VALUES(?, now(), ?, ?) ' +
				' WHERE "USER_ID" = ? ';  
		       
	rs = conn.executeUpdate(query, userName, email, 'X', userName);
	
	
	 var commandAlter = "ALTER USER " + pwdUtil.sanitizeUsername(userName) + " SET PARAMETER EMAIL ADDRESS = '" + pwdUtil.sanitize(email) + "'";
     conn.executeUpdate(commandAlter);
	return userName;
}

function POST() {
    var data = JSON.parse($.request.body.asString());
    var action = data.action;

    try {
        var response = null;

        switch (action) {
             case 'createNewUser':
                var configParameters = utils.getINIConfigParameters();
                if (configParameters.request_new_user_enabled && configParameters.request_new_user_enabled === "true") {

                    var clientIPAddress = $.request.headers.get("x-forwarded-for");
                    utils.checkAccessLists(data.email, data.email.replace(/.*@/, ""), clientIPAddress);

                    //var username = unescape(data.username).toUpperCase();
                    
                    
                    var username = getNextUser(data.email);
                    var userDetails = utils.getUserDetails(username);
                    var checkEmailAddress = utils.getEmailAddress(username);
                    var originLocationLink = data["x-sap-origin-location"] == null || !data["x-sap-origin-location"] ? "/" : unescape(data["x-sap-origin-location"]);

                    // Go ahead if any of the conditions below are fulfilled
                    // 1. Username must exist in the system 
                    // 2. username and email address combination exists means that the user is trying again
                    if (userDetails.USER_NAME || (username == userDetails.USER_NAME && checkEmailAddress == data.email)) {
                        var email = data.email;
                        if (username === null) {
                            $.response.setContentType("text/plain");
                            $.response.addBody(appTexts.getText("USERNAME_NULL"));
                        }
                        if (email === null) {
                            $.response.setContentType("text/plain");
                            $.response.addBody(appTexts.getText("EMAIL_NULL"));
                        }

                        var output = {};
                        output.data = [];
                        var messageBody = utils.createNewUserWithEmail(username, email, originLocationLink);
                        utils.sendMail(appTexts.getText("EMAIL_SUBJECT"), messageBody, email);
                        utils.buildAndSendMailToUserAdministrator(username, originLocationLink);

                        $.response.status = $.net.http.OK;
                    } else {
                        throw {
                            name: "UserError",
                            message: appTexts.getText("INVALID_USER_ERROR")
                        }
                    }
                } else {
                    throw {
                        name: "UserError",
                        message: appTexts.getText("FORGOT_PASSWORD_FEATURE_UNSUPPORTED")
                    }
                }
                break;

            default:
                // Don't do anything
        }

        $.response.setBody(JSON.stringify(response));
        $.response.status = $.net.http.OK;

    } catch (e) {

        $.response.contentType = "text/plain";
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(JSON.stringify(e));

    }

}

var METHOD = $.request.method;
switch (METHOD) {
    case $.net.http.POST:
        POST();
        break;
}