sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("ns.proposalnew.controller.Main", {
        onInit: function () {
            // Initialization code if needed
        },

        onNavVendor: function () {
            console.log("Vendor button clicked!");
            // Navigate to the proposal form
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("supplierForm");
            },

            onNavClient: function(){
            console.log("Vendor button clicked!");
            // Navigate to the proposal form
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("clientForm");
        },
        onNavClientViewEdit: function(){
            console.log("Vendor button clicked!");
            // Navigate to the proposal form
            // this.getOwnerComponent().getRouter().navTo("vendorclient");
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("clientViewEdit");
        },
        onNavSupplierViewEdit: function(){
            console.log("Vendor button clicked!");
            // Navigate to the proposal form
            // this.getOwnerComponent().getRouter().navTo("vendorclient");
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("supplierViewEdit");
        },
        onNavTemplate: function(){
            console.log("Vendor button clicked!");
            // Navigate to the proposal form
            // this.getOwnerComponent().getRouter().navTo("vendorclient");
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ProposalCreation");
        }
    });
});
