sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/BusyDialog"

], function (Controller,MessageToast,BusyDialog) {
    "use strict";
    var vendorI;
    var onBusyDataDialog= new BusyDialog({
        title:"DATA LOADING",
        text:"Please wait......."
    })

    return Controller.extend("ns.proposalnew.controller.VendorView", {
        
        onInit: function () {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("supplierView").attachMatched(this.onObjectMatched, this); //Attach Router Pattern      
        },
        onObjectMatched(oEvent) {
            onBusyDataDialog.open()
          var oArgs,oView;
          oArgs=oEvent.getParameter("arguments");
          oView=this.getView();
          console.log(oArgs.supplierId);
          vendorI=oArgs.supplierId;
          oView.bindElement({
            path:"/ProposalSupplier("+oArgs.supplierId+")"
        });
        this.associated();
        },
        associated:function(){
            var oModel=this.getOwnerComponent().getModel("proposal-supplier");
            var oJSON=new sap.ui.model.json.JSONModel();
            oModel.read("/ProposalSupplier("+vendorI+")",{
                urlParameters: {
					"$expand": "PS_VENDOR_ORG_CONTACT"
				},
				method: "GET",
                success:function(response){
                   // debugger;
                    console.log(response.PS_VENDOR_ORG_CONTACT.results[0].addressLine2)
                    oJSON.setData(response.PS_VENDOR_ORG_CONTACT.results[0]);
                    this.getView().setModel(oJSON,"ven")
                    this.time();
                                }.bind(this),
                                error:function(error){
                                    // debugger;

                                }

                                
            }) 
          },
          time:function(){
            setTimeout(() => {
              onBusyDataDialog.close();
  
            }, 2000);
          },
  
        onBack:function(){
            console.log(vendorI);  
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            // var id=this.getView().byId("id").getValue();
            // console.log(id);
            oRouter.navTo("supplierUpdateForm",{
                SelectedItem: vendorI
            });
        },
        onSaveandContinue:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainProposal");

        }
    });
});
