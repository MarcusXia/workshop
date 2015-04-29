sap.ui.jsfragment("odataView.SimpleTable", {
	
    createContent: function(oController) { 
    	
    	
    	 oTable = new sap.m.Table("tblHeader",{
    		        tableId: "tblHeader", 
    		 		growingThreshold:5,
    		        growing:true});  
    	 var displayPanel = new sap.m.Panel().setHeaderText('Business Partner Data');
         displayPanel.setExpandable(true);
         displayPanel.setExpanded(true);
         displayPanel.addContent(oTable);
        return displayPanel;
    }  
});     	
