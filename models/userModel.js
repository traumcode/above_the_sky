import * as mongoose from 'mongoose';
let Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	dateJoined: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		default: 'USER'
	},
	root: {
		type: Boolean,
		default: false
	},
	avatar: {
		type: String,
		default: 'https://i.ibb.co/HrDXbw8/user.png'
	}

}, {
	timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset