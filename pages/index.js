import Head from "next/head"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../store/GlobalState"

import { getData } from "../utils/fetchData"
import ProductItem from "../components/product/ProductItem"
import { useRouter } from "next/router"

import filterSearch from '../utils/filterSearch'


const Home = (props) => {
	const [ products, setProducts ] = useState(props.products)
	const [ page, setPage ] = useState(1)
	const router = useRouter()

	const { state, dispatch } = useContext(DataContext)
	const { auth } = state

	useEffect(() => {
		setProducts(props.products)
	},[props.products])

	useEffect(() => {
		if(Object.keys(router.query).length === 0) setPage(1)
	},[router.query])

	return (
		<div className="home-container">
			<Head>
				<title>Home Page</title>
			</Head>

			<div className="container-fluid mt-5 info-container">
				<div className="row justify-content-evenly">
					<div className="col-md-2 p-3 info-box">
						<i className="info-icon fas fa-solid fa-truck" aria-hidden/>
						<h5>FAST SHIPPING</h5>
						<p className="info-text">Depends on the availability of the product we ship the next day</p>
					</div>
					<div className="col-md-2 p-3 info-box">
						<i className="info-icon fas fa-solid fa-rotate-left" aria-hidden/>
						<h5>FREE 5 DAY RETURNS</h5>
						<p className="info-text">If you return the product in 5 days, we will pay for the costs</p>
					</div>
					<div className="col-md-2 p-3 info-box">
						<i className="info-icon fas fa-solid fa-user-lock" aria-hidden/>
						<h5>SECURE CHECKOUT</h5>
						<p className="info-text">We have a very secure backend for your payments</p>
					</div>
				</div>
			</div>
			<div className="season-container">
				<div className="season-text">
					<h1>This season</h1>
					<p>be ready to change</p>
					<button className="button-49" style={{ height: "100px" }} onClick={() => router.push("/discover")}>SHOP</button>
				</div>
				<div className="season-picture-container">
					<img className="season-picture" src="https://i.ibb.co/8Y5jKMD/Whats-App-Image-2022-02-07-at-11-59-57.jpg" alt="poza"/>
				</div>
			</div>
			<div className="new-arrivals-text">
				<h3>NEW ARRIVALS</h3>
			</div>
			<div className="products-grid">
				{
					products.length === 0
						? <h2>No products yet</h2>
						: products.map((product) => {
							return (
								<ProductItem
									key={product._id}
									product={product}
								/>
							)
						})
				}
			</div>
		</div>
	)
}

export async function getServerSideProps ({ query }) {
	const page = query.page || 1;
	const category = query.category || "all";
	const sort = query.sort || "";
	const search = query.search || "all";

	const res = await getData(
		`product?limit=${
			page * 6
		}&category=${category}&sort=${sort}&title=${search}`
	);
	return {
		props: {
			products: res.products,
			result: res.result,
		}
	};
}

export default Home