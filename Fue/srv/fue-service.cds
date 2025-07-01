using {my.authorization as auth} from '../db/schema';
using { Fue.db.excelupload as excel } from '../db/excelupload/schema';


service MyService @(path:'csvextraction'){
    entity Security_Role_level      as projection on auth.Security_Role_level;
    entity Actvt_Codes              as projection on auth.Actvt_Codes;
    entity Auth_Object_List         as projection on auth.Auth_Object_List;
    entity User_Role_Details        as projection on auth.User_Role_Details;
    entity Roles_Auth_Details       as projection on auth.Roles_Auth_Details;
entity TcodeMapping as projection on excel.TcodeMapping;

entity SecurityRoleMappling as projection on excel.SecurityRoleMappling;

action uploadProductsXLSX(file: Binary) returns {message: String;
    inserted: Integer;
}
}