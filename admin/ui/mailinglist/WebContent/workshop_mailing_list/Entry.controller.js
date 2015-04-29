sap.ui.controller("workshop_mailing_list.Entry", {

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
	

	onButtonPress: function(oEvent,oController){


		//Check for Submit
		if (oEvent.getSource().getId()=="submitButton"){

			var sessionID = sap.ui.getCore().byId('SessionID_Field').getValue(); 
			var fName = sap.ui.getCore().byId('FName_Field').getValue();
			var lName = sap.ui.getCore().byId('LName_Field').getValue();
			var emailAddress= sap.ui.getCore().byId('Email_Field').getValue(); 

			var aUrl = '../../../services/mailingList.xsjs?cmd=Insert'+
			'&SessionID='+escape(sessionID)+
			'&FirstName='+escape(fName)+
			'&LastName='+escape(lName)+
			'&EmailAddress='+escape(emailAddress);

			jQuery.ajax({
				url: aUrl,
				method: 'GET',
				dataType: 'text',
				success: function(myTxt){
					oController.onSubmitSuccess(myTxt,oController,fName); },
					error: oController.onErrorCall });			 
			return;
		}

	},	

//	Submit Successful Event Handler
	onSubmitSuccess: function(myTxt,oController, fName){

		// Clear screen fields, and issue success message.
		sap.ui.getCore().byId('SessionID_Field').setValue(' '); 
		sap.ui.getCore().byId('FName_Field').setValue(' '); 
		sap.ui.getCore().byId('LName_Field').setValue(' '); 
		sap.ui.getCore().byId('Email_Field').setValue(' '); 
		sap.ui.commons.MessageBox.show("Your information has been submitted successfully", 
				"SUCCESS", "Thank you" + ' ' + fName + '!' );	
	},

//	Error Event Handler
	onErrorCall: function(jqXHR, textStatus, errorThrown){
		sap.ui.commons.MessageBox.show(jqXHR.responseText, 
				"ERROR", 'Error' );		 
	},	 

});