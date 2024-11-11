import { gql } from "@apollo/client";

export const UPDATE_ONE  = gql`
  mutation($name: String!, $value: String!) {
    updateOneChurch(name: $name, value: $value) 
  }
`;

export const UPDATE_CHURCH_ADDRESS  = gql`
  mutation($addressInput: AddressInput!) {
    updateChurchAddress(addressInput: $addressInput) 
  }
`;

export const UPDATE_BULK  = gql`
  mutation($bulkInput: BulkInput!) {
    updateBulk(bulkInput : $bulkInput) 
  }
`;

export const UPDATE_CHURCH_CONTACT  = gql`
  mutation($name: String!, $email: String!, $mobile: String!, $secure_url:String, $public_id: String,  $logo_url:String, $logo_id: String) {
    updateChurchContact(name: $name, email: $email, mobile: $mobile, secure_url: $secure_url, public_id: $public_id, logo_url: $logo_url, logo_id: $logo_id) 
  }
`;

export const UPDATE_FEATURES = gql`
  mutation($features: [String!]) {
    updateFeatures(features: $features) 
  }
`;
