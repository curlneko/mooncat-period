import { gql } from "@apollo/client";

export const GET_USER = gql `
    query GetMoonCatUser($id: String!){
        getMoonCatUser(id: $id){
            id
            name
            birthday
            email
        }
    }
`