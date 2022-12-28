import mongoose from "mongoose";
mongoose.set("strictQuery", false);
export default async function connectToDatabase() {
	mongoose
		.connect(process.env.MONGODB_URI, {
			dbName: process.env.MONGODB_DB,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`Database connection established.`))
		.catch((error) => {
			return Promise.reject(error);
		});
}
