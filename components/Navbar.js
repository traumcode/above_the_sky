import React, { useContext } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState"
import Cookie from "js-cookie";
import {FaUserCircle} from 'react-icons/fa'


function Navbar () {
	const router = useRouter();
	const { state, dispatch } = useContext( DataContext );
	const { auth, cart } = state;
	
	const isActive = (r) => {
		if (r === router.pathname) {
			return " active"
		} else {
			return ""
		}
	}
	const handleLogout = () => {
		Cookie.remove( "refreshtoken", { path: "api/auth/accessToken" } )
		localStorage.removeItem( "firstLogin" )
		dispatch( { type: "AUTH", payload: {} } )
		dispatch( { type: "NOTIFY", payload: { success: "Deconectat!" } } )
		return router.push( "/" )
	}
	
	const adminRouter = () => {
		return <>
			<Link href="/users">
				<a className="dropdown-item">useri</a>
			</Link>
			<Link href="/create">
				<a className="dropdown-item">produse</a>
			</Link>
			<Link href="/categories">
				<a className="dropdown-item">categorii</a>
			</Link>
		</>
	}
	
	return (
		<div>
			<nav className="navbarMain navbar-expand-sm navbar-dark bg-dark">
				<div className="profile-icon-container">
					<ul className="navbar-nav p-1 profile-container">
						<li className="nav-item">
							<Link href="/cart">
								<a className={ "nav-link" + isActive( "/cart" ) }>
									<i aria-hidden className="fas fa-shopping-cart cart-icon position-relative">
										{ cart.length > 0 ? (<span className="cart-icon-span">
											{ cart.length }
										</span>) : <div/> }
									</i>
								</a>
							</Link>
						</li>
						{
							Object.keys( auth ).length === 0 ?
							(
								<li className="nav-item">
									<Link href="/signin">
										<a className={ "nav-link" + isActive( "/signin" ) }>
											{/*<i aria-hidden className="fas fa-solid fa-user-astronaut sign-in-link"/>*/}
											<FaUserCircle className="sign-in-link"/>
										</a>
									</Link>
								</li>
							) : (
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle username-dropdown" href="#"
									   id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
									   aria-expanded="false">
										<img
											src={ auth.user.avatar }
											alt={ auth.user.avatar }
											style={ {
												borderRadius: "50%",
												width: "clamp(22px, 2vw, 30px)",
												height: "clamp(22px, 2vw, 30px)",
												transform: "translateY(-3px)",
												marginRight: "5px",
												backgroundColor: "white"
											} }/>
										{ auth.user.name }
									</a>
									
									<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
										<Link href="/profile">
											<a className="dropdown-item">profil</a>
										</Link>
										{
											auth.user.role === "ADMIN" && adminRouter()
										}
										<div className="dropdown-divider"/>
										<a className="dropdown-item" href="#">setari</a>
										<button className="dropdown-item" onClick={ handleLogout }>deconectare</button>
									</div>
								</li>
							)
						}
					</ul>
				</div>
				
				<div style={ { display: "flex", position: "absolute", top: 0, right: "65vw" } }>
					
					<Link href="/">
						<button className="title-above"/>
					</Link>
					<h2 className="title-below">Caffeine Lab.</h2>
					{/*<img src="https://i.ibb.co/G5sYL5Q/caffeine-lab.png" alt="logo" className="photo-above"/>*/ }
				</div>
				<p className="newest-products"></p>
				<i className="bi bi-arrow-down" style={ { fontSize: "62px", color: "wheat", position: "absolute" } }></i>
				<div className="container-fluid">
					<div className="navbar-collapse" id="navbarNavDropdown"
					     style={ { justifyContent: "center", position: "absolute", top: "6%" } }>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link href="/discover">
									<a className="nav-link">magazin</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/manifest">
									<a className="nav-link">despre noi</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
		;
}

export default Navbar;