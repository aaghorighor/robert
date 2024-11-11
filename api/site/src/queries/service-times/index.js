import { gql } from "@apollo/client";

export const ADD_SERVICE_TIME  = gql`
    mutation($serviceTimeInput: ServiceTimeInput) {
        addServiceTime(serviceTimeInput: $serviceTimeInput) {
            description
            end_time
            start_time
            status
            remote
            remote_link
            sequency_no
            title
            _id
            createdAt
        }
    }
`;

export const UPDATE_SERVICE_TIME  = gql`
    mutation($serviceTimeId: ID!, $serviceTimeInput: ServiceTimeInput) {
        editServiceTime(serviceTimeId: $serviceTimeId, serviceTimeInput: $serviceTimeInput)
    }
`;

export const REMOVE_SERVICE_TIME  = gql`
    mutation($serviceTimeId: ID!) {
        deleteServiceTime(serviceTimeId: $serviceTimeId)
    }
`;

export const FETCH_SERVICE_TIME  = gql`
    query GetAllServiceTimes {
        getAllServiceTimes {
            description
            end_time
            start_time
            status
            remote
            remote_link
            sequency_no
            suid
            title
            createdAt
            _id
            agenda {
                description
                _id
                end_time
                facilitator
                start_time
                sequency_no
                status
                title
            }
        }
    }
`;