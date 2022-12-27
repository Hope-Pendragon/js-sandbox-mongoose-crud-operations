import TestEntry from "./models";

export async function getTestEntries( _req, res ) {
	try {
		const testEntries = await TestEntry.find();

		res.status(200).json(testEntries);
	} catch ( error ) {
		res.status(404).send( { error: error } );
	}
}

export async function getTestEntry( req, res) {
	try {
		const _id = req.query;

		const testEntry = await TestEntry.findByID( _id );

		if ( !testEntry ) { res.status( 404 ).send( { error: "No data received." } ) }

		res.status(200).json(testEntry);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function postTestEntry (req, res) {
	try {
		const testEntry = JSON.parse(req.body);

		if (!testEntry) {
			res.status(404).send({ error: "Unable to create entry..." });
		}

		TestEntry.create(testEntry, ( error, data ) => {
			if ( error ) {
				res.status(404).send({ error: error } );
			}

			res.status( 200 ).json( data );
		});
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function putTestEntry (req, res) {
	try {
		const { _id } = req.query;
		const updates = JSON.parse(req.body);
		
		const testEntry = TestEntry.findByIdAndUpdate(_id, updates, { new: true });
		
		if (!_id) {
			res.status(404).send({ error: "No entry selected to update..." });
		}
		if (!updates) {
			res.status(404).send({ error: "No updates provided..." });
		}

		res.status(200).json(testEntry);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}


export async function deleteTestEntry (req, res) {
	try {
		const { _id } = req.query;
		const testEntry = await TestEntry.findByIdAndDelete(_id);

		if (!_id) {
			res.status(404).send({ error: "No entry specified to delete..." });
		}

		res.status(200).json({ deleted: testEntry });
	} catch (error) {
		res.status(404).send( {  error: error } );
	}
}