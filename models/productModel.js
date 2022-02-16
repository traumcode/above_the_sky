import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		trim: true
	},
	price: {
		type: Number,
		require: true,
		trim: true
	},
	description: {
		type: String,
		default: "No description yet.."
	},
	content: {
		type: String,
		require: true
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	images: {
		type: Array,
		require: true
	},
	category: {
		type: String,
		require: true
	},
	checked: {
		type: Boolean,
		default: false
	},
	inStock: {
		type: Number,
		default: 0
	},
	sold: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset