const { AuthenticationError } = require("apollo-server-express");
const { User, Campaign } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
      getSingleUser: async (parent, { username }) => {
        return User.findOne({ username });
      },
  
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError("You need to be logged in!");
      },
      getCampaigns: async () => {
        return Campaign.find();
      },
      getSingleCampaign: async (parent, { _id }) => {
        return Campaign.findOne({ _id });
      },
    },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // do we need a user context if block to be logged in?
    addCampaign: async (parent, { title, description, fundsNeeded }, context) => {
      const campaign = await Campaign.create({
        title, 
        description,
        fundsNeeded
        
      });
      return campaign;
    },
    
    updateCampaign: async (parent, {_id, updates
      // , dateCompleted, isComplete, fundsNeeded
    }) => {
      return await Campaign.findByIdAndUpdate(_id, {
        updates,
        // dateCompleted,
        // isComplete,
        // fundsNeeded
      }, {new: true});
    }
  },
};

module.exports = resolvers;
