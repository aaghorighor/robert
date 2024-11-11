import { gql } from "@apollo/client";

export const ADD_FELLOWSHIP  = gql`
    mutation($fellowshipInput: FellowshipInput!) {
        addFellowship(fellowshipInput: $fellowshipInput) {
            name
            mobile
            addressLine1
            county
            town
            country
            postcode         
            status
            createdAt
            _id           
        }
    }
`;

export const UPDATE_FELLOWSHIP  = gql`
    mutation($fellowshipId: ID!, $fellowshipInput: FellowshipInput!) {
        updateFellowship(fellowshipId: $fellowshipId, fellowshipInput: $fellowshipInput)
    }
`;

export const REMOVE_FELLOWSHIP  = gql`
    mutation($fellowshipId: ID!) {
        deleteFellowship(fellowshipId: $fellowshipId)
    }
`;

export const FETCH_FELLOWSHIP  = gql`
    query GetAllFellowships {
        getAllFellowships {
            name
            mobile
            addressLine1
            county
            town
            country
            postcode
            completeAddress       
            status          
            location {
              type
              coordinates            
            }
            createdAt
            _id            
        }
    }
`;

export const FETCH_CountInFellowshipCollection = gql`
    query CountInFellowshipCollection {
        countInFellowshipCollection 
    }
`;