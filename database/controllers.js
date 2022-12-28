import { ObjectId } from "mongodb";
import TestEntry from "./models";

export async function getTestEntries(_req, res) {
	try {
		const testEntries = await TestEntry.find();

		res.status(200).json(testEntries);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function getTestEntry(req, res) {
	try {
		const _id = req.query;

		const testEntry = await TestEntry.findByID(_id);

		if (!testEntry) {
			res.status(404).send({ error: "No data received." });
		}

		res.status(200).json(testEntry);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function postTestEntry(req, res) {
	try {
		const testEntry = JSON.parse(req.body);

		if (!testEntry) {
			res.status(404).send({ error: "Unable to create entry..." });
		}

		TestEntry.create(testEntry, (error, data) => {
			if (error) {
				res.status(404).send({ error: error });
			}

			res.status(200).json(data);
		});
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function putTestEntry(req, res) {
	try {
		// The following code needs to be executed EXACTLY as is
		// - Changing any one part will likely require almost everything else to change as well

		// - _id MUST come from the query and both the property or value should be unquoted string values
		const { _id } = req.query;
		if (!_id) {
			res.status(404).send({ error: "No entry selected to update..." });
		}

		// - updates MUST be set directly equal to req.body
		// - the contents of the body MUST be sent as JSON
		//   - and due to that property names MUST be DOUBLE quoted
		// - neither updates nor req.body should be modified in any way
		const updates = req.body;
		if (!updates) {
			res.status(404).send({ error: "No updates provided..." });
		}

		// - testEntry needs to be defined and be const
		// - await MUST be used
		// - the query function MUST be assigned directly to testEntry
		// - neither the _id nor updates should be passed in any way other than as is
		// - the properties being passed must already exist within the database to be updated
		//   - { strict: false } MUST be specified in the options if you wish to bypass this
		const testEntry = await TestEntry.findByIdAndUpdate(_id, updates, {
			strict: false,
			strictQuery: false,
			new: true,
		});

		res.status(200).json(testEntry);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function deleteTestEntry(req, res) {
	try {
		const { _id } = req.query;
		const testEntry = await TestEntry.findByIdAndDelete(_id);

		if (!_id) {
			res.status(404).send({ error: "No entry specified to delete..." });
		}

		res.status(200).json({ deleted: testEntry });
	} catch (error) {
		res.status(404).send({ error: error });
	}
}
