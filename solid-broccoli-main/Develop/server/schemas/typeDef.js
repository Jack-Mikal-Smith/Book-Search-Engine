const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Book {
        _id: ID
        authors: [String]
        description: String
        title: String!
        image: Boolean
        link: String!
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        books: [Book]
        book(bookId: ID!)
        user(username: String!): User
        me: User
    }
    
    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: ID!): Book
        deleteBook(bookId: ID!): Book
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;