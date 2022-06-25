import React from 'react';
import Link from 'next/link'


function Footer () {
	return (
		<div>
			<div className='footer-container'>
				<div className='footer-title'>
					<h1 className='above-title'>caffeinelab.</h1>
				</div>
				<div className='footer-buttons'>
					<Link href='/'>
						Home
					</Link>
					<Link href='/manifest'>
						Despre noi
					</Link>
					<Link href='/contact'>
						Contact
					</Link>
					<Link href='/terms'>
						Terms of Service
					</Link>
					<Link href='/refund'>
						Refund Policy
					</Link>
					<Link href='/privacy'>
						Privacy Policy
					</Link>

				</div>
				<div className='footer-social'>
					Ne gasesti si pe:
					<i className="fa fa-brands fa-instagram footer-icon" aria-hidden/>
					<i className="fa fa-brands fa-facebook-square footer-icon" aria-hidden/>
				</div>
			</div>
			<div className='footer2-container'>
				<h5 className='footer-copyright'>Copyright ©2022 All rights reserved | This shop is made with 💗 by <Link href='https://www.github.com/traumcode'>traumcode</Link></h5>
			</div>
		</div>
	);
}

export default Footer;