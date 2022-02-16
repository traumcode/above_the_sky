import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";


connectDB()

export default async (req, res) => {
	switch (req.method) {
		case "PATCH":
			await uploadInformation(req, res)
			break;
		case "GET":
			await getUsers(req, res)
			break;
	}
}

const getUsers = async (req, res) => {
	try {
		const result = await auth(req, res)

		if (result.role !== "ADMIN") {
			return res.status(400).json({ error: "Authentication Invalid" })
		}
		const users = await Users.find().select("-password")
		res.json({ users })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const uploadInformation = async (req, res) => {
	try {
		const result = await auth(req, res)
		const { name, avatar } = req.body

		const newUser = await Users.findOneAndUpdate({ _id: result.id }, { name, avatar })

		res.json({
			message: "Updated !",
			user: {
				name,
				avatar,
				email: newUser.email,
				role: newUser.role
			}
		})
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}