$.import("sap.hana.democontent.epm.services", "messages");
var MESSAGES = $.sap.hana.democontent.epm.services.messages;

function performMultiply(){
	var body = '';
	var num1 = $.request.parameters.get('num1');
	var num2 = $.request.parameters.get('num2');
	var answer;
	
	answer = num1 * num2;
	
	body = answer.toString();
	
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

function downloadExcel() {
	var body = '';

	try {
		var query = 'SELECT TOP 25000 \"PurchaseOrderId\", \"PartnerId\", \"CompanyName\", \"CreatedByLoginName\", \"History.CREATEDAT\", \"GrossAmount\" '
				+ 'FROM \"sap.hana.democontent.epm.data::purchaseOrderHeaderExternal\" order by \"PurchaseOrderId\"';
		$.trace.debug(query);
		var conn = $.db.getConnection();
		var pstmt = conn.prepareStatement(query);
		var rs = pstmt.executeQuery();

		body = MESSAGES.getMessage('SEPM_POWRK', '002') + "\t" + // PurchaseOrder ID
		MESSAGES.getMessage('SEPM_POWRK', '003') + "\t" + // Partner ID
		MESSAGES.getMessage('SEPM_POWRK', '001') + "\t" + // Company Name
		MESSAGES.getMessage('SEPM_POWRK', '004') + "\t" + // Employee Responsible
		MESSAGES.getMessage('SEPM_POWRK', '005') + "\t" + // Created At
		MESSAGES.getMessage('SEPM_POWRK', '006') + "\n"; // Gross Amount

		while (rs.next()) {
			body += rs.getNString(1) + "\t" + rs.getNString(2) + "\t"
				 + rs.getNString(3) + "\t" + rs.getNString(4) + "\t"
				 + rs.getDate(5) + "\t" + rs.getDecimal(6) + "\n";
		}
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	$.response.setBody(body);
	$.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
	$.response.headers.set('Content-Disposition',
			'attachment; filename=Excel.xls');
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;

}


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "multiply":
	performMultiply();
	break;
case "Excel":
	downloadExcel();
	break;	
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(MESSAGES.getMessage('SEPM_ADMIN', '002', aCmd));
}