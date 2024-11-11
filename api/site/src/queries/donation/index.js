import { gql } from "@apollo/client";

export const ADD_DONATION  = gql`
    mutation($donationInput: DonationInput!) {
        addDonation(donationInput: $donationInput) {
            donation_type
            amount
		    first_name
            last_name
            email
            online
            date_donated           
            createdAt
            _id           
        }
    }
`;

export const UPDATE_DONATION  = gql`
    mutation($donationId: ID!, $donationInput: DonationInput!) {
        updateDonation(donationId: $donationId, donationInput: $donationInput)
    }
`;

export const REMOVE_DONATION  = gql`
    mutation($donationId: ID!) {
        deleteDonation(donationId: $donationId)
    }
`;

export const FETCH_DONATIONS  = gql`
    query($pageNumber: Int, $pageSize :Int, $filterTerm : String){
        getDonations(pageNumber : $pageNumber, pageSize:$pageSize, filterTerm:$filterTerm) {
          donations {
           donation_type
            amount
		    first_name
            last_name
            email
            online
            date_donated           
            createdAt
            _id        
          }
          pageInfo {
            pageNumber
            pageSize
            totalPages
        }
    }
}
`;

export const FETCH_DONATION_MONTHLY_AGGREGATES  = gql`
    query GetDonationByMonthlyAggregates {
        getDonationByMonthlyAggregates {
            _id {
                    donation_type
                    month
                    year
                }
            totalAmount      
        }
    }
`;

export const FETCH_DONATION_TYPE_AGGREGATES  = gql`
    query getByDonationTypeAggregates {
        getByDonationTypeAggregates {
            _id {
                    donation_type                    
                    year
                }
            totalAmount      
        }
    }
`;

export const FETCH_DONATION_TYPE_DAILY_AGGREGATES  = gql`
    query getDonationByDaily {
        getDonationByDaily {
            weekOfYear
            year
            donations {
                type
                totalAmount
            }
        }
    }
`;

export const FETCH_DONATIONS_BY_DATE  = gql`
    query filterDonationsByDate($startDateStr: String!, $endDateStr: String!, $donation_type: String) {
        filterDonationsByDate(startDateStr: $startDateStr, endDateStr: $endDateStr, donation_type: $donation_type){
          donations {
            donation_type
            amount
		    first_name
            last_name
            email
            online
            date_donated           
            createdAt
            _id        
          },
          totalAmount 
        }
    }
`;
