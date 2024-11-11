import { gql } from "@apollo/client";

export const UPDATE_PUSH_NOTIFICATION  = gql`
  mutation($_id: ID!, $pushNotificationInput: PushNotificationInput!) {
    updatePushNotification(notificationId:$_id, pushNotificationInput: $pushNotificationInput)
  }
`;

export const ADD_PUSH_NOTIFICATION  = gql`
  mutation($pushNotificationInput: PushNotificationInput!) {
    addPushNotification(pushNotificationInput: $pushNotificationInput){
    _id
		title
		message	
		status
    createdAt
    }
  }
`;

export const REMOVE_PUSH_NOTIFICATION  = gql`
  mutation($notificationId: ID!) {
    removePushNotification(notificationId: $notificationId)
  }
`;


export const FETCH_PUSH_NOTIFICATION  = gql`
  query GetAllPushNotifications {
    getAllPushNotifications {
     _id
		title
		message	
		status
    createdAt
    }
  }
`;
