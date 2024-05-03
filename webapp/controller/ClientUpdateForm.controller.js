sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/m/BusyDialog"


], function (Controller,MessageToast,History,BusyDialog) {
    "use strict";
    var selectedItem;
    var updateCustomerName;
    var onBusyDataDialog= new BusyDialog({
        title:"DATA LOADING",
        text:"Please wait......."
    })
    return Controller.extend("ns.proposalnew.controller.ClientUpdateForm", {
        onInit: function () {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("clientUpdateForm").attachMatched(this.onObjectMatched, this); //Attach Router Pattern      
        },
        onObjectMatched(oEvent) {
            onBusyDataDialog.open();
            var oArgs,oView;
            oArgs=oEvent.getParameter("arguments");
            oView=this.getView();
            console.log(oArgs.SelectedItem);
            selectedItem=oArgs.SelectedItem;
            oView.bindElement({
              path:"/ProposalCustomer("+oArgs.SelectedItem+")"
          });
          this.associated();
          },
          associated:function(){
            var oModel=this.getOwnerComponent().getModel();
            var oJSON=new sap.ui.model.json.JSONModel();
            oModel.read("/ProposalCustomer("+selectedItem+")",{
                urlParameters: {
					"$expand": "PS_CUSTOMER_ORG_CONTACT"
				},
				method: "GET",
                success:function(response){
                    // debugger;
                    console.log(response.PS_CUSTOMER_ORG_CONTACT.results[0].addressLine2)
                    oJSON.setData(response.PS_CUSTOMER_ORG_CONTACT.results[0]);
                    this.getView().setModel(oJSON,"ven")
                    onBusyDataDialog.close();
                                }.bind(this),
                                error:function(error){
                                    // debugger;

                                }

                                
            }) 
          },

          onNextClientDetails: function () {
            // Move to the "Contact Detail" tab in the IconTabBar
            this.getView().byId("iconTabBar").setSelectedKey("contactTab");
        },
        onNextContact1Details: function () {
            
            this.getView().byId("iconTabBar").setSelectedKey("contactTab1");
        },
        onNextContact2Details: function () {
            
            this.getView().byId("iconTabBar").setSelectedKey("contactTab2");
        },
        onbackClientDetails:function(){
            this.getView().byId("iconTabBar").setSelectedKey("contactTab3");
        },
        onbackClient1Details:function(){
            this.getView().byId("iconTabBar").setSelectedKey("contactTab");

        },
        onbackClient2Details:function(){
           this.getView().byId("iconTabBar").setSelectedKey("contactTab1");

        },

        onUpdate : function(){
            var oModel = this.getView().getModel();
            updateCustomerName= this.getView().byId("name").getValue();
            var that = this;
            var idss = this.getView().byId("ID").getValue(); // Assuming "ID" is an input field
            console.log(idss);

            var sID=this.getView().byId("id").getValue();
                        console.log(oModel);
                        var onBusyDialog= new BusyDialog({
                            text:"Please wait......."
                        })
                        onBusyDialog.open();
                        var currentDate = new Date();

                var oEntry = {
                   id: parseInt(this.getView().byId("id").getValue()),
                   name: this.getView().byId("name").getValue(),
                  // logo: this.getView().byId("logo").getValue()
                  website:this.getView().byId("website").getValue(),
                  createdAt: currentDate,
                  createdBy: this.getView().byId("name").getValue(),
                  modifiedAt: currentDate,
                  modifiedBy: this.getView().byId("name").getValue(),
              
                };
                console.log(oEntry);
                  // Assuming the base URL for your OData service
            // var sServiceUrl = "http://localhost:4004/odata/v4/proposal/";
            oModel.update("/ProposalCustomer(" + sID + ")", oEntry, {
                method: "PUT",
                success: function () {
            // Update ProposalSupplier
            // jQuery.ajax({
            //     url: sServiceUrl + "ProposalSupplier(" + encodeURIComponent(sID) + ")",
            //     method: "PATCH",
            //     contentType: "application/json",
            //     data: JSON.stringify(oEntry),
            //         success: function () {
                        // MessageToast.show("Added Successfully");
                        // var proposalClientId = this.getView().byId("id").getValue();
                        // console.log(proposalClientId);
                        var oEntrydetails = {
                          id: parseInt(this.getView().byId("ID").getValue()),
                          addressLine1: this.getView().byId("addressLine1").getValue(),
                          addressLine2: this.getView().byId("addressLine2").getValue(),
                          addressLine3: this.getView().byId("addressLine3").getValue(),
                          city: this.getView().byId("city").getValue(),
                          pincode: this.getView().byId("pincode").getValue(),
                          state: this.getView().byId("state").getValue(),
                          country: this.getView().byId("country").getValue(),
                          contact_person_1_mobileNumber: this.getView().byId("contact_person_1_mobileNumber").getValue(),
                          contact_person_1_emailId: this.getView().byId("contact_person_1_emailId").getValue(),
                          contact_person_2_mobileNumber: this.getView().byId("contact_person_2_mobileNumber").getValue(),
                          contact_person_2_emailId: this.getView().byId("contact_person_2_emailId").getValue(),
                          createdAt: currentDate,
                          createdBy: this.getView().byId("name").getValue(),
                          modifiedAt: currentDate,
                          modifiedBy: this.getView().byId("name").getValue(),
                                              };
                        console.log(oEntrydetails);
                        
                        // jQuery.ajax({
                        //     url: sServiceUrl + "ProposalSupplierContact(" + encodeURIComponent(idss) + ")",
                        //     method: "PATCH",
                        //     contentType: "application/json",
                        //     data: JSON.stringify(oEntrydetails),
                        oModel.update("/ProposalCustomerContact(" + idss + ")", oEntrydetails, {
                            method: "PUT",
                            success: function () {
                        onBusyDialog.close();
                        MessageToast.show(`Customer "${updateCustomerName}" Updated Successfully`);
                    }
                    });
                }.bind(this)
                });


        },
        onView:function(){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            var id=this.getView().byId("id").getValue();
            console.log(id);
            oRouter.navTo("clientView",{
                clientId: id
            });
        },
        goHome:function(){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainProposal");
        },
        updateToEdit:function(){
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("clientViewEdit", {}, true);
			}
        },
        onView:function(){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            var sID=this.getView().byId("id").getValue();
            oRouter.navTo("clientView",{
                clientId: sID
            });
        }
     
    });
});
