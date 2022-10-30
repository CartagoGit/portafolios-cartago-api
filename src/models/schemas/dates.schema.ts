import { Schema } from "mongoose";

export const DatesSchema = new Schema(
	{
		added: { type: Date, required: true, default: new Date(0) },
		lastUpdate: { type: Date, required: true, default: new Date(0) },
		started: { type: Date, default: undefined },
		finished: { type: Date, default: undefined },
	},
	{ _id: false }
);
