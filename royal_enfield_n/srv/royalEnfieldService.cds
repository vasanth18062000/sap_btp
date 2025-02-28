using { royal_enfield_n.db as db } from '../db/schema';
using { s4.samples as db1 } from './external';

service reService  {
    entity Dealer as projection on db.Dealer;
    entity ServiceCenterLocator as projection on db.ServiceCenterLocator;
    entity StoreLocator as projection on db.StoreLocator;
    entity BookTestRide as projection on db.BookTestRide;
    entity Customer as projection on db.Customer;
    entity BulkOrders as projection on db.BulkOrders;
    entity ContactUs as projection on db.ContactUs;
    entity Motorcycles as projection on db.Motorcycles;
    entity WarrantyClaim as projection on db.WarrantyClaim;
    entity Finance as projection on db.Finance;
    entity DealerSales as projection on db.DealerSales;
     entity BikeSales as projection on db.BikeSales;
    function getAvailableMotorcycle() returns array of String;
    action updateMotorcycleStock(id: UUID, stockQuantity: Integer) returns String;
    entity Supplier as projection on db1.Supplier;
}
