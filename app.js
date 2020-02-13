const express = require('express');
const bodyParser = require('body-parser');
const graphQltHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const app = express();

app.use(bodyParser.json());
app.get("/",(req,res,next)=>{
    res.send("hello world");
})
app.use('/graphql',graphQltHttp({
    schema:buildSchema(`
        type RootQuery{
            events:[String!]!
        }
        type RootMutation{
            createEvent(name: String): String
        }
        schema{
           query:RootQuery
           mutation: RootMutation
        }
    `),
    rootValue:{
        events:()=>{
            return ['a','b','c'];
        },
        createEvent :(arg)=>{
            const eventName = arg.name;
            return eventName;
        },
        graphiql:true

    }
}))
app.listen(3000);