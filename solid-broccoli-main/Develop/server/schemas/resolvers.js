const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
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
        saveBook: async (parent, {bookData}, context) => {
            const save = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
            );
            return save;
        },
        deleteBook: async (parent, {_id}, context) => {
            const bookToDelete = await User.findOneAndDelete(
                { _id: context.user._id },
                { $pull: { savedBooks: {_id} } }
            );
            return bookToDelete;
        },
    },
};

module.exports = resolvers;