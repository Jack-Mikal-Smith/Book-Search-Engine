const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        book: async () => {
            return Book.find({});
        },
        user: async (parent, {_id}) => {
            const params = _id ? {_id} : {};
            return User.find(params);
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        login: async (parent, {_id}) => {
            const login = await User.signToken(_id);
            return login;
        },
        saveBook: async (parent, {_id}, args) => {
            const save = await User.findOneAndUpdate(
                { _id },
                { $inc: { ['savedBooks']: args } },
                { new: true }
            );
            return save;
        },
        deleteBook: async (parent, {_id}, args) => {
            const bookToDelete = await User.findOneAndDelete(
                { _id },
                { $inc: { ['savedBooks']: args } }
            );
        },
    },
};

module.exports = resolvers;