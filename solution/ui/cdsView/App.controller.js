//To use a javascript controller its name must end with .controller.js
sap.ui.controller("cdsView.App", {
	 onInit : function(){
         var model = new sap.ui.model.json.JSONModel({});
         sap.ui.getCore().setModel(model);
         this.getView().setModel(model);
		 this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode

     },
	createData: function(){
		    var oController = sap.ui.getCore().byId("App").getController();
			sap.ui.getCore().byId("pageID").setBusy(true);
			
			//Clear tables
			var oModel = sap.ui.getCore().getModel("header"); 	
		  	oModel.setData({});		  	
		  	var oModelItem = sap.ui.getCore().getModel("item");
		  	oModelItem.setData({});			
			
		    var schema = sap.ui.getCore().getModel().getData().Schema;
			var aUrl = '/workshop/solution/services/cdsTest.xsjs?cmd=checkSchema&schema='+
					    schema;
			jQuery.ajax({
				url: aUrl,
				type: 'GET',
				success: oController.onCompleteCheckSchema,
				error: onErrorCall });		
	},
	
	onCompleteCheckSchema: function(){
	    	var oController = sap.ui.getCore().byId("App").getController();		
	    	var schema =sap.ui.getCore().getModel().getData().Schema;		
			var aUrl = '/workshop/solution/services/cdsTest.xsjs?cmd=popTables&schema='+
		               schema;
		jQuery.ajax({
			url: aUrl,
			type: 'GET',
			success: oController.onCompletePopTables,
			error: onErrorCall });
	},
	onCompletePopTables: function(){
	    var oController = sap.ui.getCore().byId("App").getController();		
    	var schema = sap.ui.getCore().getModel().getData().Schema;		
		var aUrl = '/workshop/solution/services/cdsTest.xsjs?cmd=getData&schema='+
	    			schema;
		jQuery.ajax({
		url: aUrl,
		type: 'GET',
	    dataType: 'json',
		success: oController.onCompleteGetTables,
		error: onErrorCall });	   				
	},
		
	onCompleteGetTables: function(JSON){

	    	 
	    //Create a model and bind the table rows to this model
		var oModel = sap.ui.getCore().getModel("header"); 	
	  	oModel.setData(JSON[0]);
	  	
	  	var oModelItem = sap.ui.getCore().getModel("item");
	  	oModelItem.setData(JSON[1]);
	  	
		sap.ui.getCore().byId("pageID").setBusy(false);	  	
	}	
});