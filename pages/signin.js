import Head from 'next/head';
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";
import { postData } from "../utils/fetchData";
import Cookie from 'js-cookie';


const Signin = () => {
	const [ mounted, setMounted ] = useState(false);

	const initialState = {
		email: '',
		password: ''
	};

	const [ userData, setUserData ] = useState(initialState);
	const {
		      email,
		      password,
	      } = userData;

	const {
		      state,
		      dispatch
	      } = useContext(DataContext)

	const { auth } = state

	const router = useRouter()

	const handleChangeInput = e => {
		const {
			      name,
			      value
		      } = e.target

		setUserData({
			...userData,
			[name]: value
		})

		dispatch({
			type: 'NOTIFY',
			payload: {}
		})
	}
	const handleSubmit = async e => {
		e.preventDefault()
		dispatch({ type: 'NOTIFY', payload: { loading: true }})
		const res = await postData('auth/login', userData)

		if(res.error) return dispatch({ type: 'NOTIFY',payload: { error: res.error }})
		dispatch({ type: 'NOTIFY',payload: { success: res.message }})

		dispatch({ type: 'AUTH',payload: {
			token: res.access_token,
			user: res.user
		}})

		Cookie.set('refreshtoken', res.refreshToken, {
			path: 'api/auth/accessToken',
			expires: 7
		})
		localStorage.setItem('firstLogin', true)

	}

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if(Object.keys(auth).length !== 0) {
			router.push('/')
		}
	}, [auth])

	return (
		mounted
		&&
		<div style={{
			backgroundColor: 'black',
			height: '100vh'
		}}>
			<Head>
				<title>Sign in Page</title>
			</Head>
			<div className="login-dark" style={{ height: "100vh" }}>
				<form className='container' onSubmit={handleSubmit}>
					<div className="illustration"><i className="fas fa-solid fa-fingerprint"/></div>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
						<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
						name="email" value={email} onChange={handleChangeInput}/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1"
						       name="password" value={password} onChange={handleChangeInput}/>
					</div>
					<div className='button-container'>
						<button type="submit" className="btn btn-primary btn-block">Login</button>
					</div>
					<a className="forgot" href="#">Forgot your email or password?</a>
					<p className="have-account">You don't have an account ? <Link href="/register"><a style={{ color: 'crimson' }}>Register here</a></Link></p>
				</form>
			</div>
		</div>
	)
}

export default Signin