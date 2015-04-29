sap.ui.jsfragment("odataView.CreateTable", {
	
    createContent: function(oController) { 
    	
    	
    	 oTable = new sap.m.Table("tblUsers",{
    		        tableId: "tblUsers", 
    		 		growingThreshold:5,
    		        growing:true});  
    	 var displayPanel = new sap.m.Panel().setHeaderText('User Data');
         displayPanel.setExpandable(true);
         displayPanel.setExpanded(true);
         displayPanel.addContent(oTable);
        return displayPanel;
    }  
});     	
