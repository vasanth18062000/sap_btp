sap.ui.define([
    "sap/ui/core/mvc/Controller",
   
    
    "sap/ui/core/routing/History"
], function (Controller,History) {
    "use strict";

    return Controller.extend("ns.royalenfield.controller.REDealerObject", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("reDealerObject").attachPatternMatched(this._onObjectMatched, this);
        },

         onDownloadCSV: function () {
            // Get the data from the model
            var oModel = this.getView().getModel("dealer");
            if (!oModel) {
                sap.m.MessageToast.show("No data available to download.");
                return;
            }
            
            var oData = oModel.getData();
            var csvContent = "data:text/csv;charset=utf-8,";

            // Add headers to the CSV
            csvContent += "Name,Company Name,Email,Phone,City,State,Country,Pincode\n";

            // Add data rows
            csvContent += `${oData.name},${oData.companyName},${oData.emailId},${oData.mobileNumber},${oData.city},${oData.state},${oData.country},${oData.pincode}\n`;

            // Encode and create the download link
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "DealerData.csv");
            document.body.appendChild(link);

            // Trigger the download
            link.click();
            document.body.removeChild(link);
        },


        onbackToAboutDealer: function () {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        },
    

        _onObjectMatched: function (oEvent) {
            const dealerId = oEvent.getParameter("arguments").dealerId;
        console.log(dealerId);
            // Fetch full data from backend
            const oModel = this.getView().getModel("samp"); 
            oModel.read(`/Dealer(${dealerId})`, {
                success: (oData) => {
                    console.log("odata",oData);
                    this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "dealer");
                },
                error: (oError) => {
                    console.error("Failed to fetch dealer data:", oError);
                }
            });
        }
        
        

    
    });
});
