import connectToDatabase from "../../database/connection";
import {
	getUsers,
	postUser,
	putUser,
	deleteUser,
} from "../../utils/usersController";
export default async function usersEndpoint(req, res) {
	try {
		connectToDatabase();

		const { method } = req;

		try {
			switch (method) {
				case "POST":
					await postUser(req, res);
					break;
				case "GET":
					await getUsers(res);
					break;
				case "PUT":
					await putUser(req, res);
					break;
				case "DELETE":
					await deleteUser(req, res);
					break;
				default:
					throw new Error(`${method} method is not allowed.`);
			}
		} catch (error) {
			console.log("index.js error");
			res.status(404).end({ error: error });
		}
	} catch {
		res.status(404).end("Unable to connect to database...");
	}
}
