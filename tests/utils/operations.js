import {
    gql
} from 'apollo-boost'

const getUsers = gql `
    query {
        users {
            id
            name
            email
        }
    }
`

const createUser = gql `
    mutation ($data: CreateUserInput!){
        createUser( 
            data: $data
        ){
            token,
            user {
                id
                name
                email
            }
        }
    }
`

const login = gql `
    mutation($data: LoginUserInput!) {
        login(
            data: $data
        ) {
            token
        }
    }
`

const getProfile = gql `
    query {
        me {
            id
            name
            email
        }
    }
`

const createOwnBook = gql `
    mutation($data: OwnBookCreateInput!) {
        createOwnBook(
            data: $data
        ) {
            name
            author
            published_year
            genre
            imageId
            sharingType
        }
    }
`

const deleteOwnBook = gql `
    mutation($id: ID!) {
        deleteOwnBook(
            id: $id
        ){
            id
        }
    }
`

const updateOwnBook = gql `
    mutation($id: ID!, $data: UpdateOwnBookInput!) {
        updateOwnBook(
            id: $id,
            data: $data
        ) {
            id
            name
            author
            published_year
            genre
            sharingType
            imageId
        }
    }
`

export {
    createUser,
    login,
    getUsers,
    getProfile,
    createOwnBook,
    deleteOwnBook,
    updateOwnBook,
}