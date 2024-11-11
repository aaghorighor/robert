import { gql } from "@apollo/client";

export const ADD_CAMPAIGN_CONTRIBUTION  = gql`
    mutation($contributionInput: ContributionInput) {
        addContribution(contributionInput: $contributionInput) {
            amount
            first_name
            last_name
            email
            campaignId
            createdAt
            _id           
        }
    }
`;

export const FETCH_CAMPAIGN_CONTRIBUTION  = gql`
    query GetContributionsByCampaignId {
        getContributionsByCampaignId {
            amount
            first_name
            last_name
            email
            campaignId
            createdAt
            _id           
        }
    }
`;

export const FETCH_CAMPAIGN_CONTRIBUTION_USER  = gql`
    query GetContributionsByUser($email: String!) {
        getContributionsByUser(email: $email) {
            amount
            first_name
            last_name
            email
            campaignId
            createdAt
            _id           
        }
    }
`;

