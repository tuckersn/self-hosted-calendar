import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import gql from 'graphql-tag';
import { print } from "graphql/language/printer";
import winston from "winston";


import { networkLoggerOptions, networkTransports } from "@internal/loggers/dist";

import { eventRouter } from "./routers/event";

dotenv.config();

if(process.env.PORT === undefined) {
	throw new Error("PORT env is not defined");
}

const schemaStr = print(gql`
	type Query {
		hello: String
		test: String
		user: User
	}
	type UserLogin {
		date: String!
		ip: String!
	}
	type User {
		uuid: ID
		name: String
		logins: [UserLogin]
		trustees: [User]
	}
`);

// Initialize a GraphQL schema
var schema = buildSchema(schemaStr);

// Root resolver
var root = { 
	hello: () => 'Hello world!',
	test: () => "Testing!",
	user: () => { return {
		uuid: "UUID",
		name: "Name",
		logins: []
	}}
};


const app = express();

app.use(expressWinston.logger({
	format: winston.format.json(),
	transports: networkTransports
}));

app.get("/", (req,res) => {
	res.status(200).send("pong");
});

app.use("/event", eventRouter);

app.use('/graphql', graphqlHTTP({
	schema,  // Must be provided
	rootValue: root,
	graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(process.env.PORT!, () => {
	console.log(`Listening @ http://localhost:${process.env.PORT!}`);
});