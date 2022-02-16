import Head from 'next/head'
import { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import valid from '../utils/valid'
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from 'next/router'


const Register = () => {
	const [ mounted, setMounted ] = useState(false);
	const initialState = {
		name: '',
		email: '',
		password: '',
		cf_password: ''
	};
	const [ userData, setUserData ] = useState(initialState);
	const { name, email, password, cf_password } = userData;

	const { state,dispatch } = useContext(DataContext)

	const { auth } = state

	const router = useRouter()

	const handleChangeInput = e => {
		const {name, value} = e.target
		setUserData({...userData, [name]:value})
		dispatch({ type: 'NOTIFY', payload: {} })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const errorMessage = valid(name, email, password, cf_password)

		if (errorMessage) {
			return dispatch({ type: 'NOTIFY', payload: { error: errorMessage } })
		}
		dispatch({ type: 'NOTIFY', payload: { loading: true }})

		const res = await postData('auth/register', userData)

		if(res.error) return dispatch({ type: 'NOTIFY',payload: { error: res.error }})

		dispatch({ type: 'NOTIFY',payload: { success: res.message }})
		return  router.push('/signin') }



	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if(Object.keys(auth).length !== 0) router.push('/')
	}, [auth])

	return (
		mounted
		&&
		<div
			style={{
			backgroundColor: 'black',
			height: '100vh'
		}}>
			<Head>
				<title>Register Page</title>
			</Head>
			<div className="login-dark" style={{ height: "100vh" }}>
				<form className='container' onSubmit={handleSubmit}>
					<div className="illustration"><i className="fas fa-thin fa-user-plus"/></div>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">Username</label>
						<input type="text" className="form-control" id="name"
							   name="name" value={name} onChange={handleChangeInput}/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
						<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
						       name="email" value={email} onChange={handleChangeInput}/>
						<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1"
						       name="password" value={password} onChange={handleChangeInput}/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
						<input type="password" className="form-control" id="exampleInputPassword2"
						       name="cf_password" value={cf_password} onChange={handleChangeInput}/>
					</div>
					<div className='button-container'>
						<button type="submit" className="btn btn-primary btn-block">Register</button>
					</div>
					<a className="forgot" href="#">Forgot your email or password?</a>
					<p className="have-account">Already have an account ? &nbsp;&nbsp; <Link href="/signin"><a style={{ color: 'crimson' }}>Login here</a></Link></p>
				</form>
			</div>
		</div>
	)
}

export default Register
