import React, { useContext } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState"
import Cookie from "js-cookie";


function NavbarShort () {
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
			<nav className="navbar navbar-expand-md navbar-dark bg-dark">
				<div className="profile-icon-container-short">
					<ul className="navbar-nav p-1 profile-container-short">

					</ul>
				</div>
				<div className="container-fluid" style={{alignItems: 'stretch'}}>
					<Link href="/">
						<a className="navbar-brand">CAFFEINE LAB</a>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					        aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link href="/">
									<a className="nav-link">home</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/manifest">
									<a className="nav-link">manifest</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/cart">
									<a className={"nav-link" + isActive("/cart")}>
										<i aria-hidden className="fas fa-shopping-cart position-relative">
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
											<a className="nav-link dropdown-toggle " href="#"
											   id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
											   aria-expanded="false">
												<img
													src={auth.user.avatar}
													alt={auth.user.avatar}
													style={{
														borderRadius: "50%",
														width: '20px',
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
												<button className="dropdown-item" onClick={handleLogout}>log out</button>
											</div>
										</li>
									)
							}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default NavbarShort;