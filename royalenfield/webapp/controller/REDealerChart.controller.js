sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/core/format/DateFormat",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/routing/History"
], function (Controller, MessageToast, DateFormat, JSONModel, History) {
  "use strict";

  return Controller.extend("ns.royalenfield.controller.REDealerChart", {

        onInit: function () {
            // Sample data for the demo
            var oData = {
                cities: [
                    { name: "Chennai" },
                    { name: "Coimbatore" },
                    { name: "Madurai" }
                ],
                totalSales: 120000000,
                modelASales: 450000,
                selectedCitySales: 350000,
                sales: [
                    { month: "January", bikeName: "Classic 350", sales: 100000 },
                    { month: "February", bikeName: "Himalayan", sales: 700000 },
                    { month: "March", bikeName: "Scram 411", sales: 800000 }
                    
                ],
                modelSales: [
                    { bikeName: "Classic 350", sales: 410000 },
                    { bikeName: "Himalayan", sales: 390000 },
                    { bikeName: "Scram 411", sales: 5770000 }
                ],
                
                bikeNamePie: [
                    {bikeName: "Classic 350", sales: 100000 },
                    {bikeName: "Himalayan", sales: 700000 },
                    {bikeName: "Scram 411", sales: 800000 }
                ],
                    dealerPie: [
                
                    { name: "Dino Motorcycles", bikeName: "Classic 350", sales: 100000 },
                    { name: "Legend Motors", bikeName: "Himalayan", sales: 700000 },
                    { name: "AKG Motors", bikeName: "Scram 411", sales: 800000 }
                    ]
                           
            };
           

          var oModel = new JSONModel(oData);
          this.getView().setModel(oModel);
      },
      onbackToRoyal: function () {
              const oHistory = History.getInstance();
              const sPreviousHash = oHistory.getPreviousHash();
    
              if (sPreviousHash !== undefined) {
                  window.history.go(-1);
              } else {
                  const oRouter = this.getOwnerComponent().getRouter();
                  oRouter.navTo("relogin", {}, true);
              }
          },
    
    

    onCityChange: function (oEvent) {
        var selectedCity = oEvent.getParameter("selectedItem").getKey();
        var oModel = this.getView().getModel();
    
        // Example of dynamic data change based on selected city
        var updatedSalesData = [];
        var updatedSalesTrend = [];
        var updatedModelSales = [];
        var updatedBikeNamePie = [];
    
        switch (selectedCity) {
            case "Chennai":
                updatedSalesData = [
                    { month: "January", bikeName: "Classic 350", sales: 120000 },
                    { month: "February", bikeName: "Himalayan", sales: 800000 },
                    { month: "March", bikeName: "Scram 411", sales: 900000 }
                ];
                updatedSalesTrend = [
                    { date: "01-01-2024", sales: 320000 },
                    { date: "01-02-2024", sales: 490000 },
                    { date: "01-03-2024", sales: 600000 },
                    { date: "01-04-2024", sales: 350000 }
                ];
                updatedModelSales = [
                    { bikeName: "Classic 350", sales: 500000 },
                    { bikeName: "Himalayan", sales: 450000 },
                    { bikeName: "Scram 411", sales: 750000 }
                ];
                updatedBikeNamePie = [
                    { bikeName: "Classic 350", sales: 100000 },
                    { bikeName: "Himalayan", sales: 700000 },
                    { bikeName: "Scram 411", sales: 800000 }
                ];
                break;
            case "Madurai":
                updatedSalesData = [
                    { month: "January", bikeName: "Classic 350", sales: 150000 },
                    { month: "February", bikeName: "Himalayan", sales: 650000 },
                    { month: "March", bikeName: "Scram 411", sales: 750000 }
                ];
                updatedSalesTrend = [
                    { date: "01-01-2024", sales: 280000 },
                    { date: "01-02-2024", sales: 400000 },
                    { date: "01-03-2024", sales: 550000 },
                    { date: "01-04-2024", sales: 320000 }
                ];
                updatedModelSales = [
                    { bikeName: "Classic 350", sales: 470000 },
                    { bikeName: "Himalayan", sales: 430000 },
                    { bikeName: "Scram 411", sales: 680000 }
                ];
                updatedBikeNamePie = [
                    { bikeName: "Classic 350", sales: 110000 },
                    { bikeName: "Himalayan", sales: 701000 },
                    { bikeName: "Scram 411", sales: 500000 }
                ];
                break;
            case "Coimbatore":
                updatedSalesData = [
                    { month: "January", bikeName: "Classic 350", sales: 110000 },
                    { month: "February", bikeName: "Himalayan", sales: 750000 },
                    { month: "March", bikeName: "Scram 411", sales: 800000 }
                ];
                updatedSalesTrend = [
                    { date: "01-01-2024", sales: 330000 },
                    { date: "01-02-2024", sales: 460000 },
                    { date: "01-03-2024", sales: 540000 },
                    { date: "01-04-2024", sales: 360000 }
                ];
                updatedModelSales = [
                    { bikeName: "Classic 350", sales: 420000 },
                    { bikeName: "Himalayan", sales: 460000 },
                    { bikeName: "Scram 411", sales: 710000 }
                ];
                updatedBikeNamePie = [
                    { bikeName: "Classic 350", sales: 420000 },
                    { bikeName: "Himalayan", sales: 460000 },
                    { bikeName: "Scram 411", sales: 710000 }
                ];
                break;
            default:
                updatedSalesData = [];
                updatedSalesTrend = [];
                updatedModelSales = [];
                updatedBikeNamePie = [];
                break;
        }
    
        // Update the model with the new data
        oModel.setProperty("/sales", updatedSalesData);
        oModel.setProperty("/salesTrend", updatedSalesTrend);
        oModel.setProperty("/modelSales", updatedModelSales);
        oModel.setProperty("/bikeNamePie", updatedBikeNamePie);
    
        // Update city-specific sales data
        switch (selectedCity) {
            case "Chennai":
                oModel.setProperty("/selectedCitySales", 3500000);
                break;
            case "Madurai":
                oModel.setProperty("/selectedCitySales", 4500000);
                break;
            case "Coimbatore":
                oModel.setProperty("/selectedCitySales", 5000000);
                break;
            default:
                oModel.setProperty("/selectedCitySales", 0);
                break;
        }
    
        MessageToast.show("City changed to: " + selectedCity);
    },
    
  });
});