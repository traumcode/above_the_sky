import Document, { Head, Html, Main, NextScript } from "next/document";


class MyDocument extends Document {
	render () {
		return (
			<Html lang='en'>
				<Head>
					<meta name="description" content="CAFFEINE LAB"/>
					<meta name="apple-mobile-app-capable" content="yes"/>
					<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"/>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"/>
					<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"/>
					<script src="https://kit.fontawesome.com/5aedd24813.js" crossOrigin="anonymous"/>
					<script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}/>
					<script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"/>
				</body>
			</Html>
		)
	}
}

export default MyDocument