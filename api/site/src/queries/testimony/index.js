import { gql } from "@apollo/client";

export const UPDATE_Testimony = gql`
  mutation UpdateTestimony($input: TestimonyUpdateInput!) {
    updateTestimony(input: $input)
  }
`;

export const ADD_Testimony = gql`
 mutation CreateTestimony($input: TestimonyInput!) {
    createTestimony(input: $input) {      
      description
      last_name
      _id
      first_name
      status
      createdAt
    }
}
`;

export const REMOVE_Testimony = gql`
  mutation($id: ID!) {
    removeTestimony(id: $id)
  }
`;

export const GET_Testimonies = gql`
 query GetTestimonies($suid: ID!) {
  getTestimonies(suid: $suid) {
    _id
    first_name,
    last_name,
    description,
    status,  
    createdAt   
  }
}
`;
