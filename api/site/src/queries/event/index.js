import { gql } from "@apollo/client";

export const ADD_EVENT  = gql`
    mutation($eventInput: EventInput) {
        addEvent(eventInput: $eventInput) {
            description
            end_time
            start_time
            start_date
		    end_date
            secure_url
            public_id
            status
            title
            _id
            createdAt
            addressLine1
            county
            town
            country
            postcode
            completeAddress       
            status  
            can_register        
            location {
              type
              coordinates            
            }
        }
    }
`;

export const UPDATE_EVENT  = gql`
    mutation($eventId: ID!, $eventInput: EventInput) {
        editEvent(eventId: $eventId, eventInput: $eventInput)
    }
`;

export const REMOVE_EVENT  = gql`
    mutation($eventId: ID!) {
        deleteEvent(eventId: $eventId)
    }
`;

export const FETCH_EVENT  = gql`
    query GetAllEvents {
        getAllEvents {
            description
            end_time
            start_time
            start_date
		    end_date
            secure_url
            public_id
            status
            title
            createdAt
            _id
            addressLine1
            county
            town
            country
            postcode
            completeAddress       
            status    
            can_register      
            location {
              type
              coordinates            
            }
            agenda {
                description
                _id
                end_time
                facilitator
                start_time
                status
                title
            }
            register {
                _id
                first_name
                last_name
                mobile
                email
          }
        }
    }
`;

export const FETCH_CountInEventCollection = gql`
    query CountInEventCollection {
        countInEventCollection  
    }
`;

export const FETCH_EVENTs  = gql`
    query($pageNumber: Int, $pageSize :Int, $filterTerm : String){
        getEvents(pageNumber : $pageNumber, pageSize:$pageSize, filterTerm:$filterTerm) {
          events {
           description
            end_time
            start_time
            start_date
		    end_date
            secure_url
            public_id
            status
            title
            createdAt
            _id
            addressLine1
            county
            town
            country
            postcode
            completeAddress       
            status    
            can_register    
            location {
              type
              coordinates            
            }
            agenda {
                description
                _id
                end_time
                facilitator
                start_time
                status
                title
            }  
             register {
                _id
                first_name
                last_name
                mobile
                email
          }
          }
          pageInfo {
            pageNumber
            pageSize
            totalPages
        }
       
    }
}
`;