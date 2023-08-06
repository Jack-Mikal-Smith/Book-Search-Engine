const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        book: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId });
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books')
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
            }
            throw new AuthenticationError('You need to be logged in.');
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password}) => {
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
        saveBook: async (parent, {_id}, args) => {
            const save = await User.findOneAndUpdate(
                { _id },
                { $addToSet: { ['savedBooks']: args } },
                { new: true }
            );
            return save;
        },
        deleteBook: async (parent, {_id}, args) => {
            const bookToDelete = await User.findOneAndDelete(
                { _id },
                { $pull: { ['savedBooks']: args } }
            );
            return bookToDelete;
        },
    },
};

module.exports = resolvers;