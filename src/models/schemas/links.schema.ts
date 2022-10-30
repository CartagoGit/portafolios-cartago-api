import { Schema } from "mongoose";

export const LinksSchema = new Schema({
	personal: { type: String },
	github: { type: String },
	udemy: { type: String },
	twitter: { type: String },
	linkedin: { type: String },
	youtube: { type: String },
	instagram: { type: String },
	tiktok: { type: String },
	others: { type: [String], default: undefined },
},{ _id : false });
