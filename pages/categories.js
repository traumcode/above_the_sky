import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions"
import { postData, putData } from "../utils/fetchData";


const Categories = () => {
	const [ name, setName ] = useState("")
    const [ id, setId ] = useState("")

    const { state, dispatch } = useContext(DataContext);
    const { categories, auth } = state


	const createCategory = async () => {
		if (auth.user.role !== "ADMIN") {
			return dispatch({ type: "NOTIFY", payload: { error: "Authentication is not valid" } })
		}

		if (!name) {
			return dispatch({ type: "NOTIFY", payload: { error: "Name can not be left blank" } })
		}

		dispatch({ type: "NOTIFY", payload: { loading: true } })

		let res;
		if (id) {
			res = await putData(`categories/${id}`, { name }, auth.token)
			if (res.error) {
				return dispatch({ type: "NOTIFY", payload: { error: res.error } })
			}
			dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"))

		} else {
			res = await postData("categories", { name }, auth.token)
			if (res.error) {
				return dispatch({ type: "NOTIFY", payload: { error: res.error } })
			}
			dispatch({ type: "ADD_CATEGORIES", payload: [ ...categories, res.newCategory ] })

		}
		setName("")
		setId("")

		return dispatch({ type: "NOTIFY", payload: { success: res.message } })
	}

	const handleEditCategory = (category) => {
		setId(category._id)
		setName(category.name)
	}

	return (
		<div className="container">
			<Head>
				<title>Categories</title>
			</Head>
			<h3 className="text-secondary text-uppercase">Categories manager</h3>

			<div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Add a new category" value={name} onChange={e => setName(e.target.value)}/>
				<button className="btn btn-dark" onClick={createCategory}>{id ? "Update" : "Create new category"}</button>
			</div>
			{
				categories.map(category => (
					<div key={category._id} className="card my-2 text-capitalize">
						<div className="card-body d-flex justify-content-between">
							{category.name}
							<div style={{ cursor: "pointer" }}>
								<i className="fas fa-edit mr-2" style={{ marginRight: "10px" }} aria-hidden={true} onClick={() => handleEditCategory(category)}/>
								<i className="fas fa-trash mr-2 text-danger" aria-hidden={true} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => dispatch({
									type: "ADD_MODAL",
									payload: [ { data: categories, id: category._id, title: category.name, type: "ADD_CATEGORIES" } ]
								})}/>
							</div>
						</div>
					</div>
				))
			}
		</div>
	)
}

export default Categories