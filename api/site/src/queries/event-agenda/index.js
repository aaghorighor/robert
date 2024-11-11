import { gql } from "@apollo/client";

export const ADD_EVENT_AGENDA  = gql`
    mutation($eventAgendaItemInput: EventAgendaItemInput) {
        addEventAgenda(eventAgendaItemInput: $eventAgendaItemInput) {
            description
            end_time
            start_time
            _id
            facilitator
            sequency_no
            status
            title
        }
    }
`;

export const UPDATE_EVENT_AGENDA  = gql`
    mutation($agendaId: ID!, $eventAgendaItemInput: EventAgendaItemInput) {
        updateEventAgenda(agendaId: $agendaId, eventAgendaItemInput: $eventAgendaItemInput)
    }
`;

export const REMOVE_EVENT_AGENDA  = gql`
    mutation RemoveAgenda($agendaId: ID!, $eventId: ID!) {
        removeEventAgenda(agendaId: $agendaId, eventId: $eventId)
    }
`;

export const FETCH_EVENT_AGENDAS  = gql`
  query GetEventAgendasById($eventId: ID!) {
    getEventAgendasById(eventId: $eventId) {
        _id
		title
		start_time
		end_time
        sequency_no
		description
		status
		facilitator
    }
  }
`;
