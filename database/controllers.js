import TestEntry from "./models";

export async function getTestEntries( _req, res ) {
	try {
		const testEntries = await TestEntry.find();

		res.status(200).json(testEntries);
	} catch ( error ) {
		res.status(404).send( { error: error } );
	}
}