sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/product/test/integration/FirstJourney',
		'ns/product/test/integration/pages/ProductsList',
		'ns/product/test/integration/pages/ProductsObjectPage',
		'ns/product/test/integration/pages/Order_DetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductsList, ProductsObjectPage, Order_DetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/product') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductsList: ProductsList,
					onTheProductsObjectPage: ProductsObjectPage,
					onTheOrder_DetailsObjectPage: Order_DetailsObjectPage
                }
            },
            opaJourney.run
        );
    }
);