import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//     query user($username: String!) {
//         user(username: $username) {
//             _id
//             username
//             email
//             books {
//                 _id
//                 authors
//                 description
//                 title
//                 image
//                 link
//             }
//         }
//     }
// `;

// export const QUERY_BOOKS = gql`
//     query getBooks {
//         books {
//             _id
//             authors
//             description
//             title
//             image
//             link
//         }
//     }
// `;

// export const QUERY_BOOK = gql`
//     query getSingleBook($bookId: ID!) {
//         book(bookId: $bookId) {
//             _id
//             authors
//             description
//             title
//             image
//             link
//         }
//     }
// `;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                _id
                authors
                description
                title
                image
                link
            }
        }
    }
`;