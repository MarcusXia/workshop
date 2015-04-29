
var user = $.session.getUsername();
var targetSchema = $.request.parameters.get('schema');
if(typeof(targetSchema) !== 'undefined' && targetSchema !== null){}
else
{
	//Default to _SYS_BIC if no parameter was supplied
	targetSchema = '_SYS_BIC';
}

var conn = $.hdb.getConnection();
var query = "select CURRENT_USER from dummy";
var body = '';
var rs = conn.executeQuery(query); 
for(var i=0; i<rs.length;i++){
	body = rs[i].CURRENT_USER;
}
var targetUser = body;
body += ' has been setup to debug schema ' + targetSchema; 

var conn = $.hdb.getConnection({"sqlcc": "workshop.admin.services::externalDebugProcConn"});
var query = 'GRANT ATTACH DEBUGGER TO '+user;
conn.executeUpdate(query);

var GRANT_SCHEMA_PRIVILEGE_ON_ACTIVATED_CONTENT = conn.loadProcedure("_SYS_REPO", 
	"GRANT_SCHEMA_PRIVILEGE_ON_ACTIVATED_CONTENT");
GRANT_SCHEMA_PRIVILEGE_ON_ACTIVATED_CONTENT('DEBUG', targetSchema, targetUser);

conn.commit();
conn.close();

$.response.setBody( body );

//GRANT ATTACH DEBUGGER TO <USER> -- Must run as SAP<SID>

//CALL "_SYS_REPO"."GRANT_SCHEMA_PRIVILEGE_ON_ACTIVATED_CONTENT"('DEBUG', '<SCHEMA_NAME>', '<SAPSID>')
