namespace sales.order;
 entity SalesOrderHeader {
 key ID     : UUID;
 orderId: String(10);
 customerName: String(50);
 status: String(20);
 items  : Composition of many SalesOrderItem on 
items.parent = $self;
 }
 entity SalesOrderItem {
 key ID     : UUID;
 itemNo : Integer;
 material: String(20);
 quantity: Integer;
 parent : Association to SalesOrderHeader;
 }