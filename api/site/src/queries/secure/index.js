import { gql } from "@apollo/client";

export const SIGN_ON = gql`
  mutation($email: String!, $password: String!) {
    signOn(email: $email, password: $password) {
        token
        user {         
          first_name
          last_name
          mobile
          email
          role 
          stripeCustomerId
          stripe_user_id
          userId
          suid
          subscriptionId
          plan
          startDate
          endDate       
          status        
          church {
            email
            mobile
            name
            secure_url
            public_id
            logo_url
            logo_id
            description
          }       
          isSearchable
          enable_url_giving
          enable_bank_transfer
          enable_app_giving
          onboardingComplete
          address {
            addressLine1
            county
            town
            country
            postcode
            country_code
            location {
              type
              coordinates            
            }
          }
          currency
          tax_rate
          sort_code
          account_number
          bank_name
          reference
          features
          prayer_request_email
          giving_url
          enable_url_giving
          enable_bank_transfer
          enable_app_giving
        }        
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(email: $email) 
  }
`;

export const RESET_PASSWORD = gql`
  mutation($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) 
  }
`;

export const SUBSCRIPTION = gql`
  mutation($SubscriberInput: SubscriberInput!) {
    createSubscription(subscriber : $SubscriberInput){
      user { 
        first_name
        last_name
        mobile
        email
        role     
        stripeCustomerId
        stripe_user_id
        userId
        suid
        subscriptionId       
        plan
        startDate
        endDate
        status
        features
        prayer_request_email
        giving_url
        church {
            email
            mobile
            name
            secure_url
            public_id
            description
        }      
        isSearchable
        enable_url_giving
        enable_bank_transfer
        enable_app_giving
        onboardingComplete
        address {
          addressLine1
          county
          town
          country
          country_code
          postcode
          location {
              type
              coordinates            
            }
        }    
      }
      token
      clientSecret
    }    
  }  
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;


