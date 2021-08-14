import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsers{
    users {
      _id
      email
      username
      firstName
      lastName
      password
      bucketList {
        campaign {
          title
          description
          updates{
            content
            dateCreated
          }
          dateCreated
        }
      }
      location {
        address
      }
      avatar
    }
  }
`;
export const QUERY_SINGLE_USER = gql`
query getSingleUser($userId: ID!){
  user{userId: $userId}{
    _id
    username
    email
    firstName
    lastName
    
  }
}
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      firstName
      LastName
      avatar
      bucketList {
        campaignId
        description
        // contributors {
//        ****users****
        // } 
        updates []
        dateCreated
        dateCompleted
        isComplete
        location {
          _id
          address
          coordinates
        }
        fundsNeeded
        donations
      }
      location {
        _id
        address
        coordinates
      }
    }
  }
`;