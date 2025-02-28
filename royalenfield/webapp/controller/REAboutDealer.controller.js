sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"


  ], (Controller,History,Filter,FilterOperator) => {
    "use strict";
  
    return Controller.extend("ns.royalenfield.controller.REAboutDealer", {
        onInit() {
        },
        onFilter(oEvent) {
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                const oFilter = new Filter({
                    filters: [
                        new Filter("country", FilterOperator.Contains, sQuery),
                        new Filter("companyName", FilterOperator.Contains, sQuery),
                        new Filter("name", FilterOperator.Contains, sQuery)    
                    ],
                    and: false 
                });
                aFilter.push(oFilter);
            }
        
            const oList = this.byId("idResponsiveTable");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        
        navToHome(){
            console.log("hai....")
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
    
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        },
// old
        // handleSelectionChange(){
        //     console.log("reDealerObject")
        //    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //    oRouter.navTo("reDealerObject",1)
        // }

// new

handleSelectionChange(event) {
    // Get selected data
    const oSelectedItem = event.getParameter("listItem") || event.getSource();
    const oContext = oSelectedItem.getBindingContext();
    const oData = oContext.getObject();

    // Pass the selected item ID (or other properties) as route parameters
    const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.navTo("reDealerObject", {
        dealerId: oData.id // Adjust 'id' to your actual field
        // name: encodeURIComponent(oData.name) // Example for additional data
    });
}


    });
  });