sap.ui.controller("user_management.Details", {


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

	onLiveChangeV1: function(oEvent){
		var aUrl = '/workshop/admin/services/workshopUsers.xsjs?cmd=getUsers'+'&username='+escape(oEvent.getParameters().liveValue);
		jQuery.ajax({
			url: aUrl,
			method: 'GET',
			dataType: 'json',
			success: this.onCompleteUserSearch,
			error: this.onErrorCall });
	},    	
onCompleteUserSearch: function(users){
	
	//Create a model and bind the table rows to this model
	var oModel = new sap.ui.model.json.JSONModel();
	oModel.setData(users);
	var oTable = sap.ui.getCore().byId("tblUsers");
	
	oTable.setModel(oModel);
	oTable.bindRows("/Users");

},

	onRoleSearch: function(oEvent){
		

		var aUrl = '/workshop/admin/services/workshopUsers.xsjs?cmd=getAssignedRoles'+'&username='+escape(sap.ui.getCore().byId(oEvent.oSource.oParent.sId).getValue());
		var response = jQuery.ajax({
			type: 'GET',
			url: aUrl,
			async: false
		}).responseText;
		//alert(assignedRoles);
		var assignedRoles = JSON.parse(response);
		var roleDtls = 'Roles for ' + assignedRoles.AssignedRoles[0].GRANTEE + '\n';
		for ( var i = 0; i < assignedRoles.AssignedRoles.length; i++) {
			roleDtls = roleDtls + assignedRoles.AssignedRoles[i].ROLE_NAME + '\n';
		}
		sap.ui.getCore().byId("calloutContent").setText(roleDtls);  
		sap.ui.getCore().byId("calloutContent").rerender();
		bDone = true;
		
	},
	
    onErrorCall: function(jqXHR, textStatus, errorThrown){
  	  if(jqXHR.status == '500'){
	    		 sap.ui.commons.MessageBox.show(jqXHR.responseText, 
	    				 "ERROR",
	    				 "Service Call Error" );	
	    		return;	
  	  }
  	  else{
		         sap.ui.commons.MessageBox.show(jqXHR.statusText, 
	    				 "ERROR",
	    				 "Service Call Error" );	
	    		return;	
  	  }
  	}	
});
