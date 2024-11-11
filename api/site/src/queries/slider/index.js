import { gql } from "@apollo/client";

export const UPDATE_SLIDER  = gql`
  mutation($_id: ID!, $sliderItemInput: SliderItemInput!) {
    updateSlider(sliderId:$_id, sliderItemInput: $sliderItemInput)
  }
`;

export const ADD_SLIDER  = gql`
  mutation($sliderItemInput: SliderItemInput!) {
    addSlider(sliderItemInput: $sliderItemInput){
    _id
		title
		message	
		status
    imageOnly
    secure_url
    public_id
    createdAt
    }
  }
`;

export const REMOVE_SLIDER  = gql`
  mutation($sliderId: ID!) {
    removeSlider(sliderId: $sliderId)
  }
`;


export const FETCH_SLIDERS  = gql`
  query GetAllSliders {
    getAllSliders {
     _id
		title
		message	
		status
    imageOnly
    secure_url
    public_id
    createdAt
    }
  }
`;
