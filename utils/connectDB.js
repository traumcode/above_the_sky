import mongoose from "mongoose";


const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected')
		return;
	}
	mongoose.connect(
		process.env.MONGO_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}, error => {
			if(error) throw error;
			console.log('Connected to mongodb')
		}
	)
}

export default connectDB