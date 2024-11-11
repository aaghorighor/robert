import { gql } from "@apollo/client";

export const UPDATE_USER  = gql`
  mutation($_id: ID!, $first_name: String!, $last_name: String!, $mobile : String!, $email: String!, $user_status:Boolean, $role: String, $password: String, $change_password:Boolean ) {
    updateUser(_id:$_id, first_name: $first_name, last_name: $last_name, mobile: $mobile, email: $email, role: $role, user_status :$user_status, password:$password, change_password :$change_password )
  }
`;

export const ADD_USER  = gql`
  mutation($first_name: String!, $last_name: String!, $mobile : String!, $email: String!, $user_status:Boolean, $role: String,$password:String) {
    createUser(first_name: $first_name, last_name: $last_name, mobile: $mobile, email: $email, role: $role, user_status :$user_status,password:$password )
    {
        _id
        first_name
        last_name
        mobile
        email
        role		
        user_status
    }
  }
`;

export const REMOVE_USER  = gql`
  mutation($id: ID!) {
    removeUser(id: $id)
  }
`;

export const CHANGE_USER_PASSWORD  = gql`
  mutation($password: String!) {
    changePassword(password: $password)
  }
`;

export const FETCH_USERS  = gql`
  query fetchUsers {
    getUsers {
     _id
		first_name
		last_name
		mobile
		email
		role		
		user_status
    }
  }
`;
