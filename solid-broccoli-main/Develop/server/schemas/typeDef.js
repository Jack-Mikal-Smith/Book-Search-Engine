const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Book {
        bookId: Int
        authors: [String]
        description: String
        title: String!
        image: Boolean
        link: String!
    }
    
    type Auth {
        token: Boolean
        user: [User]
    }
    
    type Query {
        book: [Book]
        user: [User]
        loggedIn: [Auth]
    }
    
    type Mutation {
        createUser: User
        saveBook: Book
        deleteBook: Book
        login: Auth
    }
`;

module.exports = typeDefs;