import connectToDatabase from "../../database/connection";
import { getTestEntries, postTestEntry, putTestEntry, deleteTestEntry } from "../../database/controllers";

export default function handler(req, res) {
	connectToDatabase().catch((error) => {
		res.status(405).json({
			error: `Failed to connect to database. \n${error}`,
		});
	});

	const { method } = req;

	switch (method) {
		case "GET":
			getTestEntries(req, res);
			break;
		case "POST":
			postTestEntry(req, res);
			break;
		case "PUT":
			putTestEntry(req, res);
			break;
		case "DELETE":
			deleteTestEntry(req, res);
			break;
		default:
			res.status(405).end(`${method} method is not allowed.`);
			break;
	}
}
