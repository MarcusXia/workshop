sap.ui.jsview("cia_ui.Table", {

      getControllerName : function() {
         return "cia_ui.Table";
      },

      createContent : function(oController) {
   	  
    	  
    	  var oModel = new sap.ui.model.odata.ODataModel("../../services/cia.xsodata/", false);
   	  
  		  var oPanel = new sap.ui.commons.Panel({showCollapseIcon: false});
		  oPanel.setTitle(new sap.ui.commons.Title({text: "Workshop Remote Client Instance Assignments"}));
		  oPanel.setAreaDesign(sap.ui.commons.enums.AreaDesign.Plain);
		  oPanel.setBorderDesign(sap.ui.commons.enums.BorderDesign.None);
		
          var oControl;
          oTable = new sap.ui.table.Table("ciaTable",{tableId: "tableID",
                   visibleRowCount: 20, editable: false, selectionMode: sap.ui.table.SelectionMode.None });

         //Table Column Definitions
          oControl = new sap.ui.commons.TextField().bindProperty("value","USER_ID");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'User Id'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "USER_ID",
        	                                                                        filterProperty: "USER_ID", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.Contains, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));
     
          oControl = new sap.ui.commons.TextField().bindProperty("value","CLIENT_IP_ADDRESS");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Client Instance IP'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "CLIENT_IP_ADDRESS",
        	                                                                        filterProperty: "CLIENT_IP_ADDRESS", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.Contains, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));


          oControl = new sap.ui.commons.TextField().bindProperty("value","ASSIGNMENT_TIMESTAMP");
          oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: 'Assignment Timestamp'}), 
        	                                                                        template: oControl, 
        	                                                                        sortProperty: "ASSIGNMENT_TIMESTAMP",
        	                                                                        filterProperty: "ASSIGNMENT_TIMESTAMP", 
        	                                                                        filterOperator: sap.ui.model.FilterOperator.Contains, 
        	                                                                        flexible: true,
        	                                                                        width: "125px" }));          
          
         oTable.setModel(oModel);
         var sort1 = new sap.ui.model.Sorter("USER_ID");
    	 oTable.bindRows("/ClientInstanceAssignments",sort1);
    	 
    	 var iNumberOfRows = oTable.getBinding("rows").iLength;
 //   	 oTable.setTitle("Assignments" + " (" + oController.numericSimpleFormatter(iNumberOfRows) + ")" );
    	
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

// currently not used
function dateFormatter(val){
	   if(val==undefined){ return '0'}
	   else{
	   jQuery.sap.require("sap.ui.core.format.DateFormat");
	   var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
		        pattern: 'yyyy-MM-dd', 
		        style: 'short'}, new sap.ui.core.Locale('en_US') );
       return oDateFormat.format(val); }
}	


