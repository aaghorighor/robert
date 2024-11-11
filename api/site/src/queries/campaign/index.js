import { gql } from "@apollo/client";

export const ADD_CAMPAIGN  = gql`
    mutation($campaignInput: CampaignInput!) {
        addCampaign(campaignInput: $campaignInput) {
            title
		    description
            target_amount
            current_amount_funded
            start_date
            end_date
            status
            secure_url
            public_id
            createdAt
            _id           
        }
    }
`;

export const UPDATE_CAMPAIGN  = gql`
    mutation($campaignId: ID!, $campaignInput: CampaignInput!) {
        updateCampaign(campaignId: $campaignId, campaignInput: $campaignInput)
    }
`;

export const REMOVE_CAMPAIGN  = gql`
    mutation($campaignId: ID!) {
        deleteCampaign(campaignId: $campaignId)
    }
`;

export const FETCH_CAMPAIGN  = gql`
    query($pageNumber: Int, $pageSize :Int, $filterTerm : String){
        getCampaigns(pageNumber : $pageNumber, pageSize:$pageSize, filterTerm:$filterTerm) {
          campaigns {
            title
            description
            target_amount
            current_amount_funded
            start_date
            end_date
            status
            secure_url
            public_id
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

export const FETCH_CountInCampaignCollection = gql`
    query CountInCampaignCollection {
        countInCampaignCollection   
    }
`;

export const FETCH_TOP10_CAMPAIGN  = gql`
    query GetTop10Campaigns {
        getTop10Campaigns {
            title
            description
            target_amount
            current_amount_funded
            start_date
            end_date
            status
            secure_url
            public_id
            createdAt
            _id            
        }
    }
`;

