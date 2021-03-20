const {GraphQLServer, PubSub} = require('graphql-yoga');

//messages라는 배열을 Query에 키값으로 넘겨준다.
const messages=[]; 
// 메시지를 붙이기위해 Mutation을 이용한다.
const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }
    type Query {
        messages: [Message!]
    }
    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }

    type Subscription {
        messages: [Message!]
    }
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

// data를 받는데 사용됨, resolvers는 message type의 키를 동일하게 가지고있어야함
const resolvers = {
 Query: {
    messages: () => messages,
    },
 Mutation: {
    postMessage: ( parent, {user, content}) => {
        const id = messages.length;
        messages.push({
            id,
            user,
            content
        });
        subscribers.forEach(fn => fn());
        return id;       
     }// "postMessage : array의 길이 -> id값으로 가진다."
 },
 Subscription: {
     messages: {
         subscribe: (parent, args, {pubsub})=>{
            const channel = Math.random().toString(36).slice(2,15);
            onMessagesUpdates(()=> pubsub.publish(channel, {messages}));
            setTimeout(()=> pubsub.publish(channel, {messages}), 0);
            return pubsub.asyncIterator(channel);
         },
     },
 },
};
const pubsub = new PubSub();
const server = new GraphQLServer({typeDefs, resolvers});

server.start(({port}) => {
    console.log(`Server on http://localhost:${port}/`);
})

/////기본적인 서버동작은 구현끝