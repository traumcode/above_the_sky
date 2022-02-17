import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from 'next/router';


const Cart = () => {
	const { state, dispatch } = useContext(DataContext);
	const { cart, auth, orders } = state;

	const [ total, setTotal ] = useState(0);

	const [ address, setAddress ] = useState("");
	const [ mobile, setMobile ] = useState("");

	const [ callback, setCallback ] = useState(false);
	const router = useRouter()

	useEffect(() => {
		const getTotal = () => {
			const res = cart.reduce((prev, item) => {
				return prev + (item.price * item.quantity)
			}, 0)

			setTotal(res)
		}

		getTotal()
	}, [ cart ])

	useEffect(() => {
		const cartLocal = JSON.parse(localStorage.getItem("__next__cart01__above"))
		if (cartLocal && cartLocal.length > 0) {
			let newArr = []
			const updateCart = async () => {
				for (const item of cartLocal) {
					const res = await getData(`product/${item._id}`)
					const { _id, title, images, price, inStock, sold } = res.product
					if (inStock > 0) {
						newArr.push({
							_id, title, images, price, inStock, sold,
							quantity: item.quantity > inStock ? 1 : item.quantity
						})
					}
				}

				dispatch({ type: "ADD_CART", payload: newArr })
			}

			updateCart()
		}
	}, [ callback ])

	const handlePayment = async () => {
		if (!address || !mobile) {
			return dispatch({ type: "NOTIFY", payload: { error: "Please add your address and mobile" } })
		}
		let newCart = [];
		for(const item of cart) {
			const res = await getData(`product/${item._id}`)
			if(res.product.inStock - item.quantity >= 0) {
				newCart.push(item)
			}
		}
		if(newCart.length < cart.length) {
			setCallback(!callback)
			return dispatch({ type: "NOTIFY", payload: { error: "The product is out of stock or the quantity is insufficient" } })
		}
		dispatch({ type: "NOTIFY", payload: { loading: true } })

		postData("order", { address, mobile, cart, total }, auth.token)
			.then(res => {
				if (res.error) {
					return dispatch({ type: "NOTIFY", payload: { error: res.error } })
				}

				dispatch({ type: "ADD_CART", payload: [] })
				const newOrder = {
					...res.newOrder,
					user: auth.user
				}
				dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] })
				dispatch({ type: "NOTIFY", payload: { success: res.message } })
				return router.push(`/order/${res.newOrder._id}`)
			})
	}

	if (cart.length === 0) {
		return (
			<div className="empty-cart cart-page">
				<i aria-hidden className="fas fa-solid fa-exclamation"/>
				<h3>Your cart is empty</h3>
			</div>
		)
	}

	return (
		<div className="row mx-auto cart-page-full">
			<Head>
				<title>Cart</title>
			</Head>
			<div className="col-md-8 text-secondary table-responsive my-3">
				<h2 className="text-uppercase w-100">Shopping Cart</h2>
				<table className="table my-3">
					<tbody>
					{
						cart.map(item => (
							<CartItem key={item._id} item={item} dispatch={dispatch} cart={cart}/>
						))
					}
					</tbody>
				</table>
			</div>
			<div className="col-md-4 my-3 text-secondary shipping-form">
				<form>
					<h2 className="text-uppercase">Shipping</h2>
					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address" className="form-control mb-2" value={address} onChange={e => setAddress(e.target.value)}/>

					<label htmlFor="mobile">Mobile</label>
					<input type="text" name="mobile" id="mobile" className="form-control mb-2" value={mobile} onChange={e => setMobile(e.target.value)}/>
				</form>
				<h3>Total: <span className="text-info">${total}</span></h3>
				<Link href={auth.user ? "#!" : "/signin"}>
					<a className="btn btn-dark my-2" onClick={handlePayment}>Proceed to payment <i className="fas fa-solid fa-credit-card"/></a>
				</Link>

			</div>
		</div>
	)
}
export default Cart