import Link from "next/link";
import { useContext, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";


const ProductItem = ({ product }) => {
	const { state, dispatch } = useContext(DataContext);
	const { cart, auth } = state;
	const [ imageIndex, setImageIndex ] = useState(0)

	const userLink = () => {
		return (
			<div className="explore-buy-container">
				<Link href={`/product/${product._id}`}>
					<a className="product-explore">▲ explore product</a>
				</Link>

				<button className={product.inStock > 0 ? "button-49" : "button-49-disabled"} disabled={product.inStock === 0} onClick={() => dispatch(addToCart(product, cart))}>
					{product.inStock === 0 ? ("out of stock") : ("add to cart")}
				</button>
			</div>
		)
	}

	const adminLink = () => {
		return (
			<>
				<Link href={`create/${product._id}`}>
					<a className="btn btn-dark"
					   style={{ marginRight: "5px", flex: 1 }}>Edit</a>
				</Link>
				<button className="btn btn-danger"
				        style={{ marginLeft: "5px", flex: 1 }}
				        data-bs-toggle="modal" data-bs-target="#exampleModal"
				        onClick={() => dispatch({ type:'ADD_MODAL', payload: [{data: '', id: product._id, title: product.title, type: 'DELETE_PRODUCT'}]})}>
					Delete
				</button>
			</>
		)
	}

	const handleRandomImage = () => {
		let num = Math.floor(Math.random() * (product.images.length - 1))
		return num === 0 ? 1 : num
	}

	return (
		<div className="card" style={{ width: "18rem" }}>
			<div className="figure">
				<img src={product.images[0].url} className="card-img-top product-image-main" alt={product.images[0].url}/>
				<img src={product.images[imageIndex].url} className="card-img-top product-image-hover" alt={product.images[imageIndex].url}
				     onMouseOver={() => product.images.length === 1 ? setImageIndex(0) : setImageIndex(handleRandomImage)}/>
			</div>
			<div className="card-body">
				<h5 className="card-title text-capitalize" title={product.title}>
					{product.title}
				</h5>
				<div className="row justify-content-between mx-0" style={{ flexWrap: "nowrap" }}>
					<h6 className="text-danger" style={{ width: "50%" }}>{product.price} lei</h6>
					{
						product.inStock > 0
							? <h6 className="text-danger" style={{ width: "50%" }}>In Stock: {product.inStock}</h6>
							: <h6 className="text-danger" style={{ width: "60%" }}>OUT OF STOCK</h6>
					}
				</div>
				<p className="card-text">
					{product.description}
				</p>
				<div className="row justify-content-between mx-0">
					{!auth.user || auth.user.role !== "ADMIN" ? userLink() : adminLink()}
				</div>
			</div>
		</div>
	)
}

export default ProductItem