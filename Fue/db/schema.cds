namespace my.authorization;

entity Security_Role_level {
        key security_Role_Level_Role_ID : UUID;
        security_Role_Level_Name    : String;
}


entity Actvt_Codes {
        key actvt_ID                     : UUID;
        actvt_Name                   : String;
        actvt_Code                   : String;
        // actvt_Codes_to_Security_Role : Association to Security_Role_level;
}


entity Auth_Object_List {
    key auth_Obj_ID                       : UUID;
        auth_Obj_Name                     : String;
        auth_Object_List_to_Security_Role : Association to Security_Role_level;
}

entity User_Role_Details {
    key customer_ID                        : UUID;
        customer_Name                      : String;
        user                               : String;
        role                               : String;
        user_Role_Details_to_Security_Role : Association to Security_Role_level;
}


entity Roles_Auth_Details {
    key Role_Id                             : UUID;
        Role_Name                           : String;
        Auth_Obj_Name                       : String;
        Actvt_Code                          : String;
        Roles_Auth_Details_to_Customer      : Association to User_Role_Details;
        Roles_Auth_Details_to_Security_Role : Association to Security_Role_level;
}


entity FUE_Details {
    key Customer_ID             : UUID;
        Customer_Name           : String;
        Total_Users             : String;
        Adv_Users_Count         : String;
        SelfService_Users_Count : String;
        Dev_Users_Count         : String;
        Core_Users_Count        : String;
        to_Customer             : Association to User_Role_Details;
}
