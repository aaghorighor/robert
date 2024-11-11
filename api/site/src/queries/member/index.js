import { gql } from "@apollo/client";

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($input: UpdateMemberInput!) {
    updateMember(input: $input)
  }
`;

export const ADD_MEMBER = gql`
 mutation CreateMember($input: CreateMemberInput!) {
    createMemberManual(input: $input) {
      user_status
      updatedAt
      role
      mobile
      last_name
      _id
      first_name
      email
      createdAt
    }
}
`;

export const REMOVE_MEMBER = gql`
  mutation($id: ID!) {
    deleteMember(id: $id)
  }
`;

export const GET_MEMBERS = gql`
 query GetMembers {
  getMembers {
     _id
		first_name
		last_name
		mobile
		email
		role		
		user_status
    createdAt
  }
}
`;

export const GET_MEMBERS_COUNT = gql`
 query getMemberCount {
  getMemberCount {
   activeCount
   noneActiveCount
  }
}
`;

export const GET_MEMBER = gql`
 query GetMember($id: ID!) {
  getMember(id: $id) {
  _id
    first_name,
    last_name,
    email,
    role,
    mobile,
    createdAt,
    updatedAt
  }
}
`;
