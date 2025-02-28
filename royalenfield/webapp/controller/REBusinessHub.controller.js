sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History"

  ], function (Controller, Filter, FilterOperator,History) {
    "use strict";
  
    return Controller.extend("ns.royalenfield.controller.REBusinessHub", {
      onInit: function () {
        console.log("startttttt")
        var oModel = this.getOwnerComponent().getModel();
console.log(oModel)
    this.getView().setModel(oModel);

    oModel.read("/Supplier", {
        success: function (oData) {
            console.log("Data fetched successfully:", oData);
        },
        error: function (oError) {
            console.error("Error fetching data:", oError);
        }
    });

      },
      onFilter(oEvent) {
        // Build filter array
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
    
        if (sQuery) {
            // Create an OR filter combining SupplierFullName and ID
            const oFilter = new Filter({
                filters: [
                    new Filter("SupplierFullName", FilterOperator.Contains, sQuery),
                    new Filter("ID", FilterOperator.Contains, sQuery),
                    new Filter("VATRegistration", FilterOperator.Contains, sQuery),
                    new Filter("SupplierAccountGroup", FilterOperator.Contains, sQuery),
                    new Filter("ConcatenatedInternationalLocNo", FilterOperator.Contains, sQuery)

                ],
                and: false // Use OR logic
            });
            aFilter.push(oFilter);
        }
    
        // Filter binding
        const oList = this.byId("idResponsiveTable");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
    },
    
      onbackToRoyal(){
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("overview", {}, true);
        }
    }
    });
  });
        