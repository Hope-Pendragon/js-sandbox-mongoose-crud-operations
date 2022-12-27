import mongoose from "mongoose";

export default function connectToDatabase() {

	mongoose.connect( process.env.MONGODB_URI, {
		dbName: process.env.MONGODB_DB,	
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} )
	.then( console.log( `Database connection established.` ) )
	.catch( ( error ) => {
		return Promise.reject(error);
	} );

}