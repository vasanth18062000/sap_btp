using sales.order from '../db/schema';

service SalesService {
    entity SalesOrderCombined as
        select from order.SalesOrderHeader as h
        join order.SalesOrderItem as i
            on i.ID = h.ID
        {
            key h.ID as headerID,
                h.orderId,
                h.customerName,
                h.status,
                i.ID as itemID,
                i.itemNo,
                i.material,
                i.quantity
        }
        actions {
            action markOrderAsReviewed();
        };

    entity SalesOrderHeader   as projection on order.SalesOrderHeader;
    entity SalesOrderItem     as projection on order.SalesOrderItem;
}
