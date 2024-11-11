import { gql } from "@apollo/client";

export const UPDATE_CONTACT  = gql`
  mutation($contactId: ID!, $contactItemInput: ContactItemInput!) {
    updateContact(contactId:$contactId, contactItemInput: $contactItemInput)
  }
`;

export const ADD_CONTACT  = gql`
  mutation($contactItemInput: ContactItemInput!) {
    addContact(contactItemInput: $contactItemInput){
    _id
		title
		fullNames
    phone	
		status
    createdAt
    }
  }
`;

export const REMOVE_CONTACT  = gql`
  mutation($contactId: ID!) {
    removeContact(contactId: $contactId)
  }
`;


export const FETCH_CONTACTS  = gql`
  query GetAllContacts {
    getAllContacts {
     _id
	  title
		fullNames
    phone			
		status
    createdAt
    }
  }
`;
