namespace royal_enfield_n.db;

using {managed} from '@sap/cds/common';


entity Dealer : managed {
    key id                 : String;
        emailId            : String(30);
        pincode            : String(30);
        mobileNumber       : String(30);
        existingOwner      : Boolean;
        motorcycleOwned    : String;
        age                : Integer;
        name               : String(30);
        companyName        : String(30);
        source             : String(30);
        existingDealer     : Boolean;
        description        : String(50);
        cityForDealership  : String(30);
        address            : String(50);
        city               : String(30);
        state              : String(30);
        country            : String(30);
        termsAndConditions : Boolean;
        fileUploade        : LargeBinary;
}

entity DealerSales : managed {
    key id            : String;
        dealerId      : String;
        dealerName    : String(50);
        year          : Integer;
        month         : String(9);
        region        : String(30);
        city          : String(50);
        state         : String(50);
        country       : String(50);
        salesCategory : String(20);
        salesChannel  : String(20);
        discount      : Decimal(15, 2);
        netRevenue    : Decimal(15, 2);
        bikeSales     : Composition of many BikeSales
                            on bikeSales.dealerSales = $self;
}

entity BikeSales : managed {
    key id           : String;
        dealerSales  : Association to DealerSales;
        bikeModel    : String(30);
        unitsSold    : Integer;
        unitPrice    : Decimal(15, 2);
        totalRevenue : Decimal(15, 2);
}


entity ServiceCenterLocator {
    key id      : String;
        country : String(30);
        state   : String(30);
        city    : String(30);
}

entity StoreLocator {
    key id      : String;
        country : String(30);
        state   : String(30);
        city    : String(30);
}

entity BookTestRide : managed {
    key id           : String;
        firstName    : String(30);
        lastName     : String(30);
        emailId      : String(30);
        pincode      : String(30);
        mobileNumber : String;
}

entity Customer : managed {
    key id           : String;
        firstName    : String(30);
        lastName     : String(30);
        emailId      : String(30);
        mobileNumber : String;
        dateOfBirth  : String;
        gender       : Gender;
        password     : String;
}

entity BulkOrders : managed {
    key id           : String;
        name         : String;
        emailId      : String;
        gstIn        : String;
        quantity     : Integer;
        company      : String;
        categorytype : String;
        details      : String;
}


entity ContactUs : managed {
    key id           : String;
        name         : String;
        emailId      : String;
        mobileNumber : String;
        anyQueries   : String;
}

entity WarrantyClaim : managed {
    key id           : Integer;
        firstName    : String;
        lastName     : String;
        purchaseDate : String;
        orderId      : String;
        mobileNumber : String;
        description  : String;
        userEmail    : String;
        category     : String;
        attachement  : LargeBinary;
        invoiceCopy  : LargeBinary;
        photocopy1   : LargeBinary;
        photocopy2   : LargeBinary;
        photocopy3   : LargeBinary;
        photocopy4   : LargeBinary;

}


entity Motorcycles : managed {
    key id             : String;
        modelName      : String;
        modelYear      : Integer;
        engineCapacity : String;
        price          : Decimal(10, 2);
        color          : String;
        stockQuantity  : Integer;
        isAvailable    : Boolean;

}


entity Finance {
    key id           : String;
        name         : String;
        emailId      : String;
        mobileNumber : String;
        city         : String;

}


type Gender : String enum {
    Male   = 'M';
    Female = 'F';
    Other  = 'O';
}
