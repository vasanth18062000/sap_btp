namespace Fue.db.excelupload;




entity TcodeMapping {
    key ID    : UUID;
        secruityRoleLevel  : String;
        s4HanaForSelfServiceUse : String;
        tCode: String;
}


entity SecurityRoleMappling {
    key ID    : UUID;
        secruityRoleLevels  : String;
        secruityRoleName : String;
        tCode: String;
}