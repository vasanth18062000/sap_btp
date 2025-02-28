using {API_BUSINESS_PARTNER as s4} from './API_BUSINESS_PARTNER';

namespace s4.samples;

entity Supplier as
    projection on s4.A_Supplier {
        key Supplier                       as ID,
            SupplierFullName               as SupplierFullName,
            SuplrProofOfDelivRlvtCode      as SuplrProofOfDelivRlvtCode,
            ConcatenatedInternationalLocNo as ConcatenatedInternationalLocNo,
            SupplierAccountGroup           as SupplierAccountGroup,
            InternationalLocationNumber1   as InternationalLocationNumber1
    }
