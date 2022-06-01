const graphql = require('graphql');
var _ = require('lodash');

var usersData = [
  { id: '1', name: 'Tolkien', age: 78, city: 'Lund', profession: 'Writer' },
  { id: '2', name: 'Dick', age: 77, city: 'Lund', profession: 'Writer' },
  { id: '3', name: 'Glen', age: 17, city: 'Lund', profession: 'Actress' },
  { id: '4', name: 'Alice', age: 57, city: 'Lund', profession: 'Developer' },
  { id: '5', name: 'Ingela', age: 74, city: 'Lund', profession: 'Manager' },
];

var hobbiesData = [
  { id: '1', title: 'Programming', description: 'Java, React, NodeJS' },
  { id: '2', title: 'Running', description: ' ' },
  { id: '3', title: 'Reading', description: ' ' },
  { id: '4', title: 'Painting', description: ' ' },
  { id: '5', title: 'Gaming', description: ' ' },
];

var postData = [
  { id: '1', comment: 'Programming', userId: '1' },
  { id: '2', comment: 'Running', userId: '2' },
  { id: '3', comment: 'Reading', userId: '1' },
  { id: '4', comment: 'Painting', userId: '3' },
  { id: '5', comment: 'Gaming', userId: '2' },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    city: { type: GraphQLString },
    profession: { type: GraphQLString },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});