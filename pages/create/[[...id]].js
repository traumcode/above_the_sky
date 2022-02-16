import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";

const ProductsManager = () => {
	const initialState = {
		title: "",
		price: 0,
		inStock: 0,
		description: "",
		content: "",
		category: ""
	}
	const [ product, setProduct ] = useState(initialState);
	const { title, price, inStock, description, content, category } = product;

	const [ images, setImages ] = useState([])

	const { state, dispatch } = useContext(DataContext);
	const { categories, auth } = state

	const router = useRouter();
	const {id} = router.query
	const [ onEdit, setOnEdit ] = useState(false)

	useEffect(() => {
		if(id) {
			setOnEdit(true)
			getData(`product/${id}`).then(res => {
				setProduct(res.product)
				setImages(res.product.images)
			})
		} else {
			setOnEdit(false)
			setProduct(initialState)
			setImages([])
		}
	}, [id])


	const handleChangeInput = e => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value })
		dispatch({ type: "NOTIFY", payload: {} })
	}

	const handleUploadInput = e => {
		dispatch({ type: "NOTIFY", payload: {} })
		let newImages = [];
		let num = 0;
		let error = "";
		const files = [ ...e.target.files ]

		if (files.length === 0) {
			return dispatch({ type: "NOTIFY", payload: { error: "Files does not exist" } })
		}
		files.forEach(file => {
			if (file.size > 10000000) {
				return error = "Files size is too big. Select something smaller than 10mb"
			}
			if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
				return error = "Wrong format. Please upload JPG, JPEG or PNG."
			}

			num += 1;

			if (num > 10) {
				return error = "You selected too many files. You can only upload 10 images."
			}
			newImages.push(file)
			return newImages;
		})
		if (error) {
			dispatch({ type: "NOTIFY", payload: { error: error } })
		}

		const imgCount = images.length
		if (imgCount + newImages.length > 10) {
			return dispatch({ type: "NOTIFY", payload: { error: "You have reached the maximum number of images." } })
		}
		setImages([ ...images, ...newImages ])
	}

	const deleteImage = index => {
		const newArray = [...images]
		newArray.splice(index, 1)
		setImages(newArray)
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		if(auth.user.role !== 'ADMIN') return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

		if (!title || !price || !inStock || !description || !content || category === "all" || images.length === 0)
			return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields!'}})

		dispatch({type: 'NOTIFY', payload: {loading: true}})

		let media = []
		const imgNewURL = images.filter(img => !img.url)
		const imgOldURL = images.filter(img => img.url)

		if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

		let res;
		if(onEdit) {
			res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
			if(res.error) return dispatch({type: 'NOTIFY', payload: {error: res.error}})
		} else {
			res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
			if(res.error) return dispatch({type: 'NOTIFY', payload: {error: res.error}})
		}

		return dispatch({type: 'NOTIFY', payload: {success: res.message}})
	}

	return (
		<div className="products_manager container">
			<Head>
				<title>Products Manager</title>
			</Head>
			<h3 className="text-secondary text-uppercase">Products Manager</h3>
			<form className="row" onSubmit={handleSubmit}>
				<div className="col-md-6">
					<input type="text" name="title" value={title} placeholder="Title" className="d-block my-4 w-100 p-2" onChange={handleChangeInput}/>
					<div className="row">
						<div className="col-sm-6">
							<label htmlFor="price">Price</label>
							<input type="number" name="price" value={price} placeholder="Price" className="d-block my-4 w-100 p-2" onChange={handleChangeInput}/>
						</div>
						<div className="col-sm-6">
							<label htmlFor="inStock">In Stock</label>

							<input type="number" name="inStock" value={inStock} placeholder="In Stock" className="d-block my-4 w-100 p-2" onChange={handleChangeInput}/>
						</div>
					</div>
					<textarea name="description" id="description" cols="30" rows="4" placeholder="Description" className="d-block my-4 w-100 p-2" onChange={handleChangeInput} value={description}/>
					<textarea name="content" id="content" cols="30" rows="6" placeholder="Content" className="d-block my-4 w-100 p-2" onChange={handleChangeInput} value={content}/>
					<div className="input-group-prepend px-0 my-2">
						<select name="category" id="category" value={category} onChange={handleChangeInput} className="custom-select text-capitalize">
							<option value="all">All Products</option>
							{
								categories.map(item => (
									<option key={item._id} value={item._id}>{item.name}</option>
								))
							}
						</select>
					</div>
				</div>

				<div className="col-md-6 my-4">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">Upload</span>
						</div>
						<div className="custom-file border rounded">
							<input type="file" className="custom-file-input" onChange={handleUploadInput} multiple accept='image/*'/>
						</div>

					</div>
					<div className="row img-up mx-0">
						{
							images.map((image, index) => (
								<div key={index} className="file_img my-1">
									<img src={image.url ? image.url : URL.createObjectURL(image)} alt={image.url ? image.url : URL.createObjectURL(image)} className="img-thumbnail rounded"/>
									<span onClick={() => deleteImage(index)}>X</span>
								</div>
							))
						}
					</div>
				</div>

				<button type='submit' className='btn btn-dark mb-3 px-5' >{onEdit ? 'Update' : 'Create'}</button>

			</form>
		</div>
	)
}

export default ProductsManager