import connectDB from "../../../utils/connectDB"
import Users from "../../../models/userModel"
import auth from "../../../middleware/auth"


connectDB()

export default async (req, res) => {
	switch (req.method) {
		case "PATCH":
			await updateRole(req, res)
			break;
		case "DELETE":
			await deleteUser(req, res)
			break;
	}
}

const updateRole = async (req, res) => {
	try {
		const result = await auth(req, res)

		if (result.role !== "ADMIN") {
			return res.status(400).json({ error: "Authentication is not valid" })
		}

		const { id } = req.query
		const { role } = req.body

		await Users.findOneAndUpdate({ _id: id }, { role })
		res.json({ message: "Update Success!" })

	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const deleteUser = async (req, res) => {
	try {
		const result = await auth(req, res)

		if (result.role !== "ADMIN") {
			return res.status(400).json({ error: "Authentication is not valid" })
		}

		const { id } = req.query

		await Users.findByIdAndDelete(id)
		res.json({ message: "Deleted Success!" })

	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}