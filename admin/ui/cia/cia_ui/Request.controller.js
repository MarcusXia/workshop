sap.ui.controller("cia_ui.Request", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//	   onInit: function() {
//
//	   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
 //  },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
   onAfterRendering: function() {
	   this.getClientInstanceDetails(this); 
   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }
	
	 onLinkPress: function(oEvent,oController){
		 
		 //Download RDP file
			 $.download('../../services/cia.xsjs','cmd=RDP','GET' );
 
	 },  
   
	 getClientInstanceDetails: function(oController){
			var aUrl = '../../services/cia.xsjs?cmd=getClientInstance';

		    jQuery.ajax({
		       url: aUrl,
		       method: 'GET',
		       dataType: 'json',
		       success: function(myJSON){oController.onLoadSession(myJSON,oController); },
		       error: oController.onErrorCall });
	 },
	 
	 onLoadSession: function(myJSON,oController){
			for( var i = 0; i<myJSON.Assignment.length; i++)
		     {
				sap.ui.getCore().byId('UserID_Field').setValue(myJSON.Assignment[i].USER_ID); 
				sap.ui.getCore().byId('CI_Field').setText(myJSON.Assignment[i].CLIENT_IP_ADDRESS); 
				sap.ui.getCore().byId('Timestamp_Field').setValue(myJSON.Assignment[i].ASSIGNMENT_TIMESTAMP); 
		     }
	 },		

	
//	Error Event Handler
	onErrorCall: function(jqXHR, textStatus, errorThrown){
		sap.ui.commons.MessageBox.show(jqXHR.responseText, 
				"ERROR", 'Error' );		 
	},	 

});