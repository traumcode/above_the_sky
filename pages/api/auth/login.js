import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'
import bcrypt from 'bcryptjs'


connectDB()

export default async (req, res) => {
	switch (req.method) {
		case "POST":
			await login(req, res)
			break;
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Users.findOne({ email })
		if(!user) return res.status(400).json({ error: "This email is not in the clouds."})

		const isMatch = await bcrypt.compareSync(password, user.password)
		if(!isMatch) return res.status(400).json({ error: "You've typed an incorrect password." })

		const access_token = createAccessToken({id: user._id})
		const refreshToken = createRefreshToken({id: user._id})


		res.json({
			message: "Logged in!",
			refreshToken,
			access_token,
			user: {
				name: user.name,
				email: user.email,
				dateJoined: user.dateJoined,
				role: user.role,
				root: user.root,
				avatar: user.avatar,
			}
		})

	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}