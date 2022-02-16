import "../styles/globals.scss"
import React from "react"
import Layout from "../components/Layout"
import Head from "next/head";
import { DataProvider } from "../store/GlobalState";
import Notify from "../components/Notify";
import CookieConsent from "react-cookie-consent";
import { useRouter } from "next/router";


function MyApp ({
	                Component,
	                pageProps,
                }) {

	if (useRouter().route === "/signin") {
		return (
			<DataProvider>
				<Notify/>
				<Component {...pageProps} />
			</DataProvider>
		)
	} else if (useRouter().route === "/register") {
		return (
			<DataProvider>
				<Notify/>
				<Component {...pageProps} />
			</DataProvider>
		)
	}
	return (
		<DataProvider>
			<Head>
				<title>Above the Sky</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
				<CookieConsent
					location="bottom"
					style={{ background: "black", width: "96%", left: "2%", alignItems: "flex-end" }}
					buttonStyle={{ background: "none", border: "1px solid grey", color: "aqua" }}
					expires={30}
				>
					<h4 style={{ fontWeight: "100" }}>Privacy Policy of above the sky</h4>
					<p style={{ fontWeight: "100" }}>In order to receive information about your Personal Data, the purposes and the parties the Data is shared with, contact the Owner.</p>
					<p style={{ fontWeight: "100" }}>For more information and to understand your rights, you can also view the complete version of this privacy policy, by clicking <a
						style={{ color: "aqua" }} href="/privacy">our privacy policy page</a>.</p>
				</CookieConsent>
			</Layout>
		</DataProvider>
	)
}

export default MyApp
