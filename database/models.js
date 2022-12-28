import { Schema, model, models } from "mongoose";

const testEntrySchema = new Schema(
	{
		text: String,
	},
	{
		timestamps: true,
	}
);

export default models.TestEntry || model("TestEntry", testEntrySchema);
