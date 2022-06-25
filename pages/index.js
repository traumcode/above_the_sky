import Head from "next/head"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../store/GlobalState"

import { getData } from "../utils/fetchData"
import ProductItem from "../components/product/ProductItem"
import { useRouter } from "next/router"

import {GiCoffeeBeans} from 'react-icons/gi'
import {GoGift} from 'react-icons/go'
import {TbTruckDelivery} from 'react-icons/tb'
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
				<section className="Why-choose-us-section">
					<div>
						<h1 className="Why-choose-us-title">De ce sa ne alegi pe noi ?</h1>
					</div>
					<div style={ { zIndex: "2", position: "relative" } }>
						<h5>ATENTIA NOASTRA SE CONCENTREAZA PE UN SINGUR LUCRU, PARCUSUL CAFELEI:</h5>
						<h5>DE LA FERMA, LA PRAJITORIE, IAR APOI IN CEASCA TA</h5>
					</div>
				</section>
				<div className="row justify-content-evenly">
					<div className="col-md-2 p-3 info-box">
						<GiCoffeeBeans className="info-icon"/>
						<h5>CAFEA</h5>
						<p className="info-text">Pentru noi este foarte important sa alegem si sa-ti oferim cafeaua de cea mai buna calitate.
							Selectam intotdeauna cu atentie loturile care confirma standardele cafelei de specialitate, ceea ce inseamna ca numai ciresele mature sunt culese manual si ca loturile pot
							fi usor de urmarit de la origine pana la tine in ceasca.</p>
					</div>
					<div className="col-md-2 p-3 info-box">
						<GoGift className="info-icon"/>
						<h5>BENEFICII</h5>
						<p className="info-text">Oferte speciale pentru ocazii speciale. Vrem ca fiecare comanda sa o facem speciala si unica asa ca am adaugat bonusuri in forma de ciocolata de fiecare data cand
							impachetam o comanda.
							Credem ca micile detalii conteaza foarte mult si adauga un detaliu simplu dar de neuitat.</p>
					</div>
					<div className="col-md-2 p-3 info-box">
						<TbTruckDelivery className="info-icon"/>
						<h5>LIVRARE</h5>
						<p className="info-text">Acoperim noi toate costurile de transport iar livrarea este foarte rapida. Livram in maxim 3 zile din ziua plasarii comenzii, daca aceasta este facuta intr-o zi lucratoare
							inainte de 12:00PM</p>
					</div>
				</div>
			</div>
			<div className="season-container">
				<div className="season-text">
					<h1 style={{ textAlign: 'center'}}>Aroma cafelei din Guatemala</h1>
					<p>acest sezon importam cafea atent culesa din Guatemala</p>
					<button className="button-53" style={{ height: "100px" }} onClick={() => router.push("/discover")}>Cumpara</button>
				</div>
				<div className="season-picture-container">
					<img className="season-picture" src="https://images.pexels.com/photos/1187761/pexels-photo-1187761.jpeg" alt="poza"/>
				</div>
			</div>
			<div className="new-arrivals-text">
				<h3>CATEVA DINTRE PRODUSELE NOASTRE</h3>
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