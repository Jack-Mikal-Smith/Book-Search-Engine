const { AuthenticationError } = require('apollo-server-express')
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('You need to be logged in.');
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password}) => {
            console.log('Test')
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with these credentials.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password.');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const save = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return save;
            }

            throw new AuthenticationError('You need to log in');
        },
        deleteBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const bookToDelete = await User.findOneAndDelete(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {bookId} } },
                    { new: true }
                );
                return bookToDelete;
            }

            throw new AuthenticationError('You need to log in')
        },
    },
};

module.exports = resolvers;