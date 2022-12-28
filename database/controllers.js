import { ObjectId } from "mongodb";
import User from "./models";

export async function readUsers(_req, res) {
	try {
		const users = await User.find();

		res.status(200).json(users);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function readUser(req, res) {
	try {
		const _id = req.query;

		const user = await User.findByID(_id);

		if (!user) {
			res.status(404).send({ error: "No data received." });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function postUser(req, res) {
	try {
		const user = JSON.parse(req.body);

		if (!user) {
			res.status(404).send({ error: "Unable to create entry..." });
		}

		User.create(user, (error, data) => {
			if (error) {
				res.status(404).send({ error: error });
			}

			res.status(200).json(data);
		});
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function updateUser(req, res) {
	try {
		const { _id } = req.query;
		if (!_id) {
			res.status(404).send({ error: "No entry selected to update..." });
		}

		const updates = req.body;
		if (!updates) {
			res.status(404).send({ error: "No updates provided..." });
		}

		const user = await User.findByIdAndUpdate(_id, updates, {
			strict: false,
			strictQuery: false,
			new: true,
		});

		res.status(200).json(user);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function deleteUser(req, res) {
	try {
		const { _id } = req.query;
		const user = await User.findByIdAndDelete(_id);

		if (!_id) {
			res.status(404).send({ error: "No entry specified to delete..." });
		}

		res.status(200).json({ deleted: user });
	} catch (error) {
		res.status(404).send({ error: error });
	}
}
