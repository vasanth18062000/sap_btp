using my.bookshop as my from '../db/data-model';
@(requires: 'system-user')
service CatalogService {
    entity Books  as projection  on my.Books ;
        function calculateTotalDailyTransactionValue @(restrict : [{
                grant : 'READ',
                to    : 'jobscheduler'
        }])() returns String;
}

