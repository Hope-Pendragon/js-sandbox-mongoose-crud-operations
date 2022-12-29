// Endpoint —  http://localhost:3000/api
// Currently all functions work, if anything stops working check whether all input data and the method they are sent in are correct
import {
	createUser,
	readUsers,
	updateUser,
	removeUser,
	readUser,
} from "../database/usersHandler";

// CREATE
export async function postUser(req, res) {
	try {
		const user = req.body;
		if (!user) throw new Error(`No user data provided.`);

		const data = await createUser(user);

		res.status(200).json(data);
		return data;
	} catch (error) {
		res.status(404).json({ error: error });
		return Promise.reject(error);
	}
}

// READ
export async function getUsers(res) {
	try {
		const users = await readUsers();
		res.status(200).json(users);
		return users;
	} catch (error) {
		res.status(404).json({ error: error });
		return Promise.reject(error);
	}
}

// UPDATE
export async function putUser(req, res) {
	try {
		const { _id } = req.query;
		if (!_id) throw new Error(`No user specified to update.`);

		const updates = req.body;
		if (!updates) throw new Error(`No update values provided.`);

		const user = await updateUser(_id, updates);

		res.status(200).json(user);
		return data;
	} catch (error) {
		res.status(404).json({ error: error });
		return Promise.reject(error);
	}
}

// DELETE
export async function deleteUser(req, res) {
	try {
		const { _id } = req.query;
		if (!_id) throw new Error(`No user specified to delete.`);

		const data = await removeUser(_id);

		console.log(data);
		res.status(200).json({ deleted: data });

		return data;
	} catch (error) {
		res.status(404).json({ error: error });
		return Promise.reject(error);
	}
}
