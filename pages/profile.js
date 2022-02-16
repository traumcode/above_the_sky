import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from 'next/link';

import valid from '../utils/valid';
import { patchData } from "../utils/fetchData";

import { imageUpload } from "../utils/imageUpload";

const Profile = () => {
	const initialState = { avatar: "", name: "", password: "", cf_password: "" }

	const [ data, setData ] = useState(initialState);
	const { avatar, name, password, cf_password } = data
	const { state, dispatch } = useContext(DataContext);
	const { auth, notify, orders } = state;

	useEffect(() => {
		if(auth.user) setData({...data, name: auth.user.name})
	},[auth.user])

	const handleChange = (e) => {
		const { name, value } = e.target
		setData({...data, [name]:value})
		dispatch({ type: 'NOTIFY', payload: {} })
	}

	const handleUpdateProfile = e => {
		e.preventDefault()
		if(password){
			const errorMessage = valid(name, auth.user.email, password, cf_password)
			if(errorMessage) return dispatch({type: 'NOTIFY', payload: {error: errorMessage}})
			updatePassword()
		}
		if(name !== auth.user.name || avatar) updateInformation()
	}

	const updatePassword = () => {
		dispatch({ type: 'NOTIFY', payload: {loading: true}})
		patchData('user/resetPassword', {password}, auth.token)
			.then(res => {
				if(res.error) return dispatch({ type: 'NOTIFY', payload: {error: res.error}})
				return dispatch({ type: 'NOTIFY', payload: {success: res.message}})
			})
	}

	const changeAvatar = (e) => {
		const file = e.target.files[0]
		if(!file){
			return dispatch({type:'NOTIFY', payload: {error: 'File does not exist.'}})
		}
		if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif'){
			return dispatch({type:'NOTIFY', payload: {error: 'Wrong image format.'}})
		}
		if(file.size > 1024 * 1024 * 5){
			return dispatch({type:'NOTIFY', payload: {error: 'File too large. Please upload files under 5mb'}})
		}

		setData({...data, avatar: file })
	}

	const updateInformation = async () => {
		let media;
		dispatch({type: "NOTIFY", payload: {loading: true}})
		if(avatar) media = await imageUpload([avatar])

		patchData('user', {
			name, avatar: avatar ? media[0].url : auth.user.avatar
		}, auth.token).then(res => {
			if(res.error) return dispatch({type: 'NOTIFY', payload: {error: res.error}})
			dispatch({type: 'AUTH', payload: {
					token: auth.token,
					user: res.user
				}})

			return dispatch({type: 'NOTIFY', payload: {success: res.message}})
		})
	}


	if (!auth.user) { return null; }

	return (
		<div className="profile-page-container">
			<Head>
				<title>Profile page</title>
			</Head>

			<section className="row text-secondary my-3 profile-section-container" >
				<div className="col-md-4">
					<h3 className="text-center text-uppercase"> {auth.user.role === "USER" ? "User profile" : "Admin profile"} </h3>
					<div className="avatar">
						<img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar"/>
						<span>
							<i className="fas fa-camera"/>
							<p>Change</p>
							<input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar}/>
						</span>
					</div>

					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" name="name" value={name} className="form-control" placeholder="Your name" onChange={handleChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="text" name="email" defaultValue={auth.user.email} className="form-control" disabled={true}/>
					</div>

					<div className="form-group">
						<label htmlFor="password">New password</label>
						<input type="password" name="password" value={password} className="form-control" placeholder="Type new password" onChange={handleChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="cf_password">Confirm new password</label>
						<input type="password" name="cf_password" value={cf_password} className="form-control" placeholder="Type the new password to confirm" onChange={handleChange}/>
					</div>

					<button className='btn btn-dark' disabled={notify.loading} onClick={handleUpdateProfile} style={{marginTop: '10px'}}>Update</button>
				</div>

				<div className="col-md-8 table-responsive">
					<h3 className='text-uppercase'> {auth.user.role === "USER" ? "Orders" : "User orders"} </h3>
					<div className="my-3">
						<table className="table-bordered table-hover w-100 text-uppercase"
						style={{minWidth: '600px', cursor: 'pointer'}}>
							<thead className="bg-dark" style={{fontWeight: '900'}}>
							<tr>
								<td className="p-2">ID</td>
								<td className="p-2">date</td>
								<td className="p-2">total</td>
								<td className="p-2">delivered</td>
								<td className="p-2">paid</td>
							</tr>
							</thead>
							<tbody>

							{
								orders.map(order => (
									<tr key={order._id}>
										<td className="p-2">
											<Link href={`/order/${order._id}`}>
												<a>{order._id}</a>
											</Link>
										</td>
										<td className="p-2">{new Date(order.createdAt).toLocaleTimeString()}</td>
										<td className="p-2">${order.total}</td>
										<td className="p-2">{
											order.delivered
												? <i className="fas fa-check text-success"/>
												: <i className="fas fa-times text-danger"/>
										}</td>
										<td className="p-2">{
											order.paid
												? <i className="fas fa-check text-success"/>
												: <i className="fas fa-times text-danger"/>
										}</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>

			</section>
		</div>
	)
}
export default Profile