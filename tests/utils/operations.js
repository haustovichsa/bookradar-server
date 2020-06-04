import {
    gql
} from 'apollo-boost'

const getUsers = gql `
    query {
        users {
            id
            name
            email,
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
            id
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

const createWishBook = gql `
    mutation($data: WishBookCreateInput!) {
        createWishBook(
            data: $data
        ) {
            name
            author
            genre
        }
    }
`

const deleteWishBook = gql `
    mutation($id: ID!) {
        deleteWishBook(
            id: $id
        ){
            id
        }
    }
`

const updateWishBook = gql `
    mutation($id: ID!, $data: WishBookUpdateInput!) {
        updateWishBook(
            id: $id,
            data: $data
        ) {
            id
            name
            author
            genre
        }
    }
`

const searchBooksByNameOrAuthor = gql `
    query($query: String!) {
        searchBooksByNameOrAuthor(query: $query) {
            id,
            name,
            author,
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
    createWishBook,
    deleteWishBook,
    updateWishBook,
    searchBooksByNameOrAuthor,
}