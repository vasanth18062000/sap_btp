sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/BusyDialog"

], function (Controller,MessageToast,BusyDialog) {
    "use strict";
    var cllientI;
    var onBusyDataDialog= new BusyDialog({
        title:"DATA LOADING",
        text:"Please wait......."
    })

    return Controller.extend("ns.proposalnew.controller.ClientView", {
        onInit: function () {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("clientView").attachMatched(this.onObjectMatched, this); //Attach Router Pattern      
        },
        onObjectMatched(oEvent) {
            onBusyDataDialog.open();
            var oArgs,oView;
            oArgs=oEvent.getParameter("arguments");
            oView=this.getView();
            console.log(oArgs.clientId);
            cllientI=oArgs.clientId;
            oView.bindElement({
              path:"/ProposalCustomer("+oArgs.clientId+")"
          });
          this.associated();
          },
          associated:function(){
            var oModel=this.getOwnerComponent().getModel();
            var oJSON=new sap.ui.model.json.JSONModel();
            oModel.read("/ProposalCustomer("+cllientI+")",{
                urlParameters: {
					"$expand": "PS_CUSTOMER_ORG_CONTACT"
				},
				method: "GET",
                success:function(response){
                    // debugger;
                    console.log(response.PS_CUSTOMER_ORG_CONTACT.results[0].addressLine2)
                    oJSON.setData(response.PS_CUSTOMER_ORG_CONTACT.results[0]);
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
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("clientUpdateForm",{
                SelectedItem:cllientI
            });
 
        },
        onSaveandContinue:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainProposal");

        },

    });
});
