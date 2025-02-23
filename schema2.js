const schema = `

type Message {
  _id: ID
  text: String
  receiverId: ID
}

type User {
  _id: ID
  userName: String
  email: String
  messages: [Message]
}

type Query {
  users: [User]
  user(id: ID!): User
}

type Mutation {
  register(user: NewUser!): User!
  login(user: LoginInput!): String!
  updateUser(id: ID!, newFields: UpdateUser!): User
  deleteUser(id: ID!): String
  add(text: String!): Message
  deleteMessage(id: ID!): String  
}

input LoginInput {
  email: String!
  password: String!
}

input NewUser {
  userName: String!
  email: String!
  password: String!
}

input UpdateUser {
  userName: String
  email: String
}

`;

export default schema;
