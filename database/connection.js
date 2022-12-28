import mongoose from "mongoose";
mongoose.set("strictQuery", false);
export default async function connectToDatabase() {
	mongoose.connection.on("error", (error) => {
		console.log(`An error has occurred with the database connection.`);
		return Promise.reject(error);
	});

	mongoose.connection.on("disconnected", () => {
		console.log(`Not connected to database.`);
	});

	try {
		mongoose.connect(process.env.MONGODB_URI, {
			dbName: process.env.MONGODB_DB,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`Database connection established.`);
	} catch (error) {
		console.log(`Unable to established database connection.`);
		return Promise.reject(error);
	}

	mongoose.connection.on("connected", () => {
		console.log(`Connected to database.`);
	});
}
