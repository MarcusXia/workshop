sap.ui.jsview("workshop_mailing_list.Table", {

      getControllerName : function() {
         return "workshop_mailing_list.Table";
      },

      createContent : function(oController) {
   	  
    	  
    	  var oModel = new sap.ui.model.odata.ODataModel("../../../services/mailingList.xsodata/", false);
   	  
  		  var oPanel = new sap.ui.commons.Panel({showCollapseIcon: false});
		  oPanel.setTitle(new sap.ui.commons.Title({text: "Mailing List Data", icon: "./images/sap_18.png"}));
		  oPanel.setAreaDesign(sap.ui.commons.enums.AreaDesign.Plain);
		  oPanel.setBorderDesign(sap.ui.commons.enums.BorderDesign.None);
		
          var oControl;
          oTable = new sap.ui.table.Table("mailingListTable",{tableId: "tableID",
                   visibleRowCount: 10, editable: false, selectionMode: sap.ui.table.SelectionMode.None });

         //Table Column Definitions
          oControl = new sap.ui.commons.TextField().bindProperty("value","RecordId");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Record Id'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "RecordId",
        	                                                                        filterProperty: "RecordId", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));
     
          oControl = new sap.ui.commons.TextField().bindProperty("value","SessionId");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Session Id'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "SessionId",
        	                                                                        filterProperty: "SessionId", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));
          
          oControl = new sap.ui.commons.TextField().bindProperty("value","UserId");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'User Id'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "UserId",
        	                                                                        filterProperty: "UserId", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));  

          oControl = new sap.ui.commons.TextField().bindProperty("value","DateCreated",dateFormatter);
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Date Created'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "DateCreatedd",
        	                                                                        filterProperty: "DateCreated", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));          
         
          oControl = new sap.ui.commons.TextField().bindProperty("value","FirstName");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'First Name'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "FirstName",
        	                                                                        filterProperty: "FirstName", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));          
          
          oControl = new sap.ui.commons.TextField().bindProperty("value","LastName");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Last Name'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "LastName",
        	                                                                        filterProperty: "LastName", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));     

          oControl = new sap.ui.commons.TextField().bindProperty("value","EmailAddress");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Email Address'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "EmailAddress",
        	                                                                        filterProperty: "EmailAddress", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.EQ, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));               
          
          
         oTable.setModel(oModel);
         var sort1 = new sap.ui.model.Sorter("RecordId");
    	 oTable.bindRows("/Mailing_List",sort1);
    	 
    	 var iNumberOfRows = oTable.getBinding("rows").iLength;
    	 oTable.setTitle("Entries" + " (" + oController.numericSimpleFormatter(iNumberOfRows) + ")" );
    	
    	//Work around a limitation in SAPUI5 where numeric values for string fields couldn't be sent in the filter as string
 	    var orig_createFilterParams = sap.ui.model.odata.ODataListBinding.prototype.createFilterParams;
	    sap.ui.model.odata.ODataListBinding.prototype.createFilterParams = function(aFilters) {
	        orig_createFilterParams.apply(this, arguments);
	        
	        if (aFilters) {
	            // old filterparam of overridden function           
            
	            // adapt or modify the internal sFilterParams
	        	if(aFilters[0]==null){ }
	        	else {
	        		this.sFilterParams = "$filter=((" + aFilters[0].sPath + " eq '" + aFilters[0].oValue1 + "'))"; }
	            
	            // new filterparam
	            // see also Filter.js for the properties of the filter: sPath, sOperator, OValue1, oValue2
	        }
	    }
        
	    //Toolbar
	    var oToolbar1 = new sap.ui.commons.Toolbar("tb1");
		oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

		var oButton1 = new sap.ui.commons.Button("btnDeleteAll",{
			text : 'Delete All',
			tooltip : 'Delete All',
			press : function(oEvent){
	          	  oController.onTBPress(oEvent,oController); } 
		});
		oToolbar1.addItem(oButton1);

//		oToolbar1.addItem(new sap.ui.commons.ToolbarSeparator());
		
		var oButton1 = new sap.ui.commons.Button("btnExcel",{
			text : 'Export to Excel',
			tooltip : 'Export to Excel',
			press : function(oEvent){
	          	  oController.onTBPress(oEvent,oController); } 
		});
		oToolbar1.addItem(oButton1);		
  	  
		oTable.setToolbar(oToolbar1);

		oPanel.addContent(oTable);

		return oPanel;		
		
      }
});

function dateFormatter(val){
	   if(val==undefined){ return '0'}
	   else{
	   jQuery.sap.require("sap.ui.core.format.DateFormat");
	   var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
		        pattern: 'yyyy-MM-dd', 
		        style: 'short'}, new sap.ui.core.Locale('en_US') );
       return oDateFormat.format(val); }
}	

