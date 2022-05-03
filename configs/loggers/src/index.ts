import winston from "winston";


export const loggerOptions: winston.LoggerOptions = {
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			format: winston.format.simple()
		}),
		new winston.transports.File({
			format: winston.format.json(),
			filename: "logs/info.log",
			level: "info"
		}),
	]
};

export const errorLoggerOptions: winston.LoggerOptions = {
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
			level: "error"
		}),
		new winston.transports.File({
			format: winston.format.json(),
			filename: "logs/error.log",
			level: "error"
		}),
	]
};


export const networkTransports = [
	new winston.transports.Console({
		format: winston.format.simple(),
		level: "info"
	}),
	new winston.transports.File({
		format: winston.format.json(),
		filename: "logs/network.log",
		level: "info"
	}),
];
export const networkLoggerOptions: winston.LoggerOptions = {
	transports: networkTransports
};

