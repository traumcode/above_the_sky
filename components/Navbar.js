import React, { useContext } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState"
import Cookie from "js-cookie";
import LogoC from "../resources/caffeine lab..png"


function Navbar () {
	const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const { auth, cart } = state;

	const isActive = (r) => {
		if (r === router.pathname) {
			return " active"
		} else {
			return ""
		}
	}
	const handleLogout = () => {
		Cookie.remove("refreshtoken", { path: "api/auth/accessToken" })
		localStorage.removeItem("firstLogin")
		dispatch({ type: "AUTH", payload: {} })
		dispatch({ type: "NOTIFY", payload: { success: "Logged out" } })
		return router.push('/')
	}

	const adminRouter = () => {
		return <>
			<Link href="/users">
				<a className="dropdown-item">users</a>
			</Link>
			<Link href="/create">
				<a className="dropdown-item">products</a>
			</Link>
			<Link href="/categories">
				<a className="dropdown-item">categories</a>
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
								<a className={"nav-link" + isActive("/cart")}>
									<i aria-hidden className="fas fa-shopping-cart cart-icon position-relative">
										{cart.length > 0 ? (<span className="cart-icon-span">
											{cart.length}
										</span>) : <div/>}
									</i>
								</a>
							</Link>
						</li>
						{
							Object.keys(auth).length === 0 ?
								(
									<li className="nav-item">
										<Link href="/signin">
											<a className={"nav-link" + isActive("/signin")}>
												<i aria-hidden className="fas fa-solid fa-user-astronaut sign-in-link"/>
											</a>
										</Link>
									</li>
								) : (
									<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle username-dropdown" href="#"
										   id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
										   aria-expanded="false">
											<img
												src={auth.user.avatar}
												alt={auth.user.avatar}
												style={{
													borderRadius: "50%",
													width: "clamp(22px, 2vw, 30px)",
													height: "clamp(22px, 2vw, 30px)",
													transform: "translateY(-3px)",
													marginRight: "5px",
													backgroundColor: "white"
												}}/>
											{auth.user.name}
										</a>

										<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
											<Link href="/profile">
												<a className="dropdown-item">profile</a>
											</Link>
											{
												auth.user.role === 'ADMIN' && adminRouter()
											}
											<div className="dropdown-divider"/>
											<a className="dropdown-item" href="#">settings</a>
											<button className="dropdown-item" onClick={handleLogout}>log out</button>
										</div>
									</li>
								)
						}
					</ul>
				</div>
				<Link href="/">
					<button className="title-above">
						CAFFEINE LAB
					</button>
				</Link>
				<img src={LogoC} alt="logo"/>
				
				<p className="newest-products">view newest products</p>
				<div className="indicator">
					<span/>
					<span/>
					<span/>
				</div>
				<div className="container-fluid">
					<div className="navbar-collapse" id="navbarNavDropdown"
					     style={{ justifyContent: "center", position: "absolute", top: "6%" }}>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link href="/discover">
									<a className="nav-link">discover</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/manifest">
									<a className="nav-link">manifest</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;