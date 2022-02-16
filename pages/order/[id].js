import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { useRouter } from 'next/router';
import Link from 'next/link';
import OrderDetail from "../../components/OrderDetail";

const DetailsOrder =() => {
	const { state, dispatch } = useContext(DataContext);
	const {orders, auth} = state

	const router = useRouter();

	const [orderDetail, setOrderDetail] = useState([])

	useEffect(() => {
		const newArray = orders.filter(order => order._id === router.query.id)
		setOrderDetail(newArray)

	}, [orders])
	return (
		<div className="my-3 container">
			<Head>
				<title>Order Details</title>
			</Head>
			<div>
				<button className='btn btn-dark' style={{margin: '20px'}} onClick={() => router.back()}>
					<i className="fas fa-long-arrow-alt-left" aria-hidden/> Go Back
				</button>
			</div>
			<OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch}/>
		</div>

	)
}

export default DetailsOrder