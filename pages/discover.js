import Head from "next/head"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../store/GlobalState"

import { getData } from "../utils/fetchData"
import ProductItem from "../components/product/ProductItem"
import { useRouter } from "next/router"

import filterSearch from '../utils/filterSearch'
import Filter from '../components/Filter'


const Discover = (props) => {
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
		<div className="home-container product-page-container">
			<Head>
				<title>Discover Page</title>
			</Head>
			<Filter state={state}/>

			<div className="container-fluid mt-5 info-container">
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
			page * 20
		}&category=${category}&sort=${sort}&title=${search}`
	);
	return {
		props: {
			products: res.products,
			result: res.result,
		}
	};
}

export default Discover