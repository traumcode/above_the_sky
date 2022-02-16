import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";
import bcrypt from "bcryptjs";


connectDB()

export default async (req, res) => {
	switch (req.method) {
		case "POST":
			await register(req, res)
			break;
	}
}

const register = async (req, res) => {
	try {
		const { name, email, password, cf_password } = req.body;

		const errorMessage = valid(name, email, password, cf_password)
		if (errorMessage) {
			return res.status(400).json({ error: errorMessage })
		}

		const user = await Users.findOne({ email })
		if (user) {
			return res.status(400).json({ error: "This email address already exists!" })
		}

		const passwordHash = bcrypt.hashSync(password, 12)

		const newUser = new Users({ name, email, password: passwordHash, cf_password })

		await newUser.save()
		res.json({ message: "Register successfully!" })

	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}