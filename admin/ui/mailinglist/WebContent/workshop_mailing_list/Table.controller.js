sap.ui.controller("workshop_mailing_list.Table", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }
	 //Toolbar Button Press Event Handler
	 onTBPress: function(oEvent,oController){
		 
		 //Excel Download
		 if (oEvent.getSource().getId()=="btnExcel"){
			 $.download('../../../services/mailingList.xsjs','cmd=Excel','GET' );
			 return;
		 }

		 if (oEvent.getSource().getId()=="btnDeleteAll"){
			 sap.ui.commons.MessageBox.confirm("Are you sure that you want to delete all entries?",
					 function(bResult){oController.deleteConfirm(bResult,oController); },
					 "Delete All?");
		 return;
	     }		 
 
	 },
	 
	 //Delete Confirmation Dialog Results
	 deleteConfirm: function(bResult,oController){
		 if(bResult){ 
			 var aUrl = '../../../services/mailingList.xsjs?cmd=DeleteAll';
			 jQuery.ajax({
			       url: aUrl,
			       method: 'GET',
			       dataType: 'text',
			       success: function(myTxt){
			          	  oController.onDeleteSuccess(myTxt,oController); },
			       error: oController.onErrorCall });	
			 
		 }
	 },
	 
	 //Delete Successful Event Handler
	 onDeleteSuccess: function(myTxt,oController){
		    	
		 oController.refreshTable(oController);
		 sap.ui.commons.MessageBox.show("All Mailing List Entries have been deleted", 
				 "SUCCESS",
				'Delete All Successful' );

	 },

	 //Error Event Handler
	 onErrorCall: function(jqXHR, textStatus, errorThrown){
		 sap.ui.commons.MessageBox.show(jqXHR.responseText, 
				 "ERROR", "Error" );		 
	 },	 
	 
	 //Utility function to refresh the table & reset # of recs in title
	 refreshTable: function(oController){
		 oTable = sap.ui.getCore().byId("mailingListTable");
		 var sort1 = new sap.ui.model.Sorter("RecordId");
         oTable.bindRows("/Mailing_List",sort1); 
         var iNumberOfRows = oTable.getBinding("rows").iLength;
	     oTable.setTitle("Entries" + " (" + oController.numericSimpleFormatter(iNumberOfRows) + ")" );
	 },

	 numericSimpleFormatter: function(val){
		   if(val==undefined){ return '0'}
		   else {
		   jQuery.sap.require("sap.ui.core.format.NumberFormat");
		   var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
		      maxFractionDigits: 0,
		      minFractionDigits: 0,
		      groupingEnabled: true });
		   return oNumberFormat.format(val); }
		   
	}	
 	 
});

jQuery.download = function(url, data, method){
	//url and data options required
	if( url && data ){ 
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function(){ 
			var pair = this.split('=');
			inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
		});
		//send request
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
		.appendTo('body').submit().remove();
	};
};

