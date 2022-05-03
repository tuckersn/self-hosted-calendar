import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";
import expressWinston from "express-winston";

import { networkLoggerOptions, networkTransports } from "@internal/loggers/dist";

import { eventRouter } from "./routers/event";
import winston from "winston";

dotenv.config();

if(process.env.PORT === undefined) {
	throw new Error("PORT env is not defined");
}


// Initialize a GraphQL schema
var schema = buildSchema(`
	type Query {
		hello: String
	}
`);

// Root resolver
var root = { 
	hello: () => 'Hello world!'
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
	schema: schema,  // Must be provided
	rootValue: root,
	graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(process.env.PORT!, () => {
	console.log(`Listening @ http://localhost:${process.env.PORT!}`);
});