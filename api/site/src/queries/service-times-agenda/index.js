import { gql } from "@apollo/client";

export const ADD_SERVICE_TIME_AGENDA  = gql`
    mutation($agendaItemInput: AgendaItemInput) {
        addServiceTimeAgenda(agendaItemInput: $agendaItemInput) {
            description
            end_time
            start_time
            _id
            facilitator,
            sequency_no
            status
            title           
        }
    }
`;

export const UPDATE_SERVICE_TIME_AGENDA  = gql`
    mutation($agendaId: ID!, $agendaItemInput: AgendaItemInput) {
        updateServiceTimeAgenda(agendaId: $agendaId, agendaItemInput: $agendaItemInput)
    }
`;

export const REMOVE_SERVICE_TIME_AGENDA  = gql`
    mutation RemoveAgenda($agendaId: ID!, $serviceTimeId: ID!) {
        removeServiceTimeAgenda(agendaId: $agendaId, serviceTimeId: $serviceTimeId)
    }
`;

export const FETCH_SERVICE_TIME_AGENDAS  = gql`
  query GetServiceTimeAgendasById($serviceTimeId: ID!) {
    getServiceTimeAgendasById(serviceTimeId: $serviceTimeId) {
        _id
		title
		start_time
		end_time
		description
		status
        sequency_no
		facilitator       
    }
  }
`;


