import React from 'react';
import NavBar from './Navbar'
import Notify from "./Notify";
import Footer from "./Footer";
import Modal from "./Modal";
import { useRouter } from "next/router";
import NavbarShort from "./NavbarShort";


function Layout ({ children }) {
	const router = useRouter();

	if (router.route === "/") {
		return (
			<div>
				<NavBar/>
				<Notify/>
				<Modal/>
				{children}
				<Footer/>
			</div>
		);
	}
	return (
		<div>
			<NavbarShort/>
			<Notify/>
			<Modal/>
			<div style={{marginTop: '30px'}}>
			{children}
			</div>
			<Footer/>
		</div>
	)

}

export default Layout;