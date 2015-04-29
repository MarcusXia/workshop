sap.ui.jsview("uis.js.Report", {

	getControllerName : function() {
		return "uis.js.Report";
	},

	createContent : function(oController) {
		
	  var oModel = new sap.ui.model.odata.ODataModel("/sap/hana/democontent/epmSP6/services/poWorklistJoin.xsodata/", false);
	  this.setModel(oModel);
	
	  var reportView =  buildReport(oController);
	  reportView.setWidth("100%");
	  return reportView;

	}
});

function buildReport(oController){
	  
	//Group By DDLB
	  oLayout = new sap.ui.commons.layout.MatrixLayout({width:"auto"});	  
      var oGroupBy = new sap.ui.commons.DropdownBox("DDLBGroupBy",{
              tooltip: oBundle.getText("group_by"),
              width: "200px",
              items: [new sap.ui.core.ListItem("Null",{text: "" }),
                      new sap.ui.core.ListItem("PartnerCompanyName",{text: oBundle.getText("company") }),
                      new sap.ui.core.ListItem("ProductCategory",{text: oBundle.getText("product_cat") }),
                      new sap.ui.core.ListItem("PartnerCity",{text: oBundle.getText("city") }),   
                      new sap.ui.core.ListItem("PartnerPostalCode",{text: oBundle.getText("postal") }),                      
                      new sap.ui.core.ListItem("ProductId",{text: oBundle.getText("product") })],
              change: function(oEvent){
            	//Add for personalization implementation (1/2)
                  var groupBy = oEvent.oSource.getSelectedItemId();
                  gadgetPrefs.setPreference('filterReport', groupBy, function () {
                  });
             	  oController.setGroupBy(oEvent,oController); }});                     
             
      oGroupBy.setSelectedItemId("Null");
          
      //Layout Placement for Filter By Panel Content
      var oLabel = new sap.ui.commons.Label("lblPie");
      oLabel.setText(oBundle.getText("sum_gross",["USD "]));
      oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
      oLayout.createRow(oLabel);
      
      var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
      oCell.addContent(new sap.ui.commons.HorizontalDivider());
      oLayout.createRow(oCell);
      
      //Label for Group By
	  var oLabel = new sap.ui.commons.Label("lblGroupBy");
      oLabel.setText(oBundle.getText("s_group_by"));	  
      oLayout.createRow(oLabel);
      oLayout.createRow(oGroupBy );
      
      //Pie Chart Data model - initialize empty	
      data = [{ label : oBundle.getText("empty"), data: 1},]
      oPieModel.setData({modelData: data});
      
      var dataset = new sap.viz.ui5.data.FlattenedDataset({

			dimensions : [ {
				axis : 1,
				name : oBundle.getText("s_group_by"),
				value : "{label}"
			} ],

			measures : [ {
				name : oBundle.getText("sum_gross",["USD "]),
				value : '{data}'
			} ],

			data : {
				path : "/modelData"
			}

		});
      var oPie = new sap.viz.ui5.Pie("myPie",{
			width : "600px",
			height : "550px",
			plotArea : {
			},
			
			title : {
				visible : false				
			},
			dataset : dataset
		});
      oPie.setModel(oPieModel);
  	
  	  //Pie Chart
 /*        var oPie = new sap.service.visualization.chart.Pie("myPie",{
           width: "400px",
           height: "250px",
           allDeSelectable: true,
           legendFirst: true,
           selectionMode: 'single',
           legendDirection: 'right',
           title: '',
           titleHorizontalAlign:'center',
           subTitle: '',
           subTitleHorizontalAlign:'left',
           showTitle: false,
           defaultSelectedSliceIndexes: [5],
           tooltipTextFormatString: ['0.00%'],  
           tooltipMainValueFormatString : ['$#,##0.00'],
   		   tooltipSubValueFormatString : ['0.00%'],           
           showLegend: true,
           pieType:'pie',
           dataset: dataset
         });*/
      var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
      oCell.addContent(oPie);
      oLayout.createRow(oCell);

      //Add for personalization implementation (2/2)
        var gadgetPrefs = new gadgets.GadgetPrefs();
            var filter = gadgetPrefs.getPreference("filterReport");
            if (filter) {
                oController.setContextGroupBy(filter);
            }
        //Add for personalization implementation (2/2)
            
      return oLayout;
}
