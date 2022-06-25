import Head from 'next/head';
import { useState, useContext } from 'react';
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";


const ProductDetails = (props) => {
	const [ product ] = useState(props.product);
	const [ tab, setTab ] = useState(0);

	const { state, dispatch } = useContext(DataContext);
	const { cart } = state;

	const isActive = (index) => {
		if (tab === index) {
			return " active"
		}
		return ""
	}

	return (
		<div className="product-details-container">
			<Head>
				<title>Product Details</title>
			</Head>

			<div className="col-md-6">
				<img
					src={product.images[tab].url} alt={product.images[tab].url} className="d-block img-thumbnail rounded mt-4 w-100"
					style={{ height: "400px" }}
				/>
				<div className="row mx-0" style={{ cursor: 'pointer' }}>

					{
						product.images.map((image, index) => (
							<img key={index} src={image.url} alt={image.url} className={`img-thumbnail rounded ${isActive(index)}`} style={{
								height: '80px',
								width: '20%'
							}}
							     onClick={() => setTab(index)}/>
						))
					}
				</div>
			</div>

			<div className="col-md-6 m-3">
				<h2 className="text-uppercase">{product.title}</h2>
				<h5 className="text-danger">{product.price} lei</h5>

				<div className="row mx-0 d-flex justify-content-between">
					{
						product.inStock > 0
							? <h6 className="text-danger">In Stock: {product.inStock}</h6>
							: <h6 className="text-danger">Out Of Stock</h6>
					}
				</div>

				<div className="my-2">{product.description}</div>
				<div className="my-2">{product.content}</div>

				<button className="button-49" onClick={() => dispatch(addToCart(product, cart))}>
					add to cart
				</button>

			</div>
		</div>
	)
}

export async function getServerSideProps ({ params: { id } }) {
	const res = await getData(`product/${id}`)

	return {
		props: {
			product: res.product
		},
	}
}

export default ProductDetails