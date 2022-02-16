import swaal from "./Swal";
import { useRouter } from 'next/router'


const Toast = ({ message }) => {
	const router = useRouter()
	console.log(message)
	switch (message.message) {
		case 'Please add all the fields!':
			swaal(message.message = 'Please add all the fields!', 'warning')
			break;
		case 'Success! Updated a product':
			swaal(message.message = 'Successfully updated the product!', 'success')
			router.reload()
			break;
		case "Success! Created a new product":
			swaal(message.message, 'success')
			router.reload()
			break;
		case 'Wrong format. Please upload JPG, JPEG or PNG.':
			swaal(message.message, 'error')
			break;
		case 'Files size is too big. Select something smaller than 10mb':
			swaal(message.message, 'warning')
			break;
		case 'Files does not exist':
			swaal(message.message, 'error')
			break;
		case 'You have reached the maximum number of images.':
			swaal(message.message, 'warning')
			break;
		case 'You selected too many files. You can only upload 10 images.':
			swaal(message.message, 'warning')
			break;
		case 'Please enter a valid email':
			swaal(message.message, 'error')
			break;
		case 'Payment success! We will contact you to confirm the order.':
			swaal(message.message, 'success')
			router.reload()
			break;
		case 'Updated !':
			swaal(message.message = "Profile updated! ^_^", 'success')
			break;
		case 'Please add your address and mobile':
			swaal(message.message, 'error')
			break;
		case 'This email is not in the clouds.':
			swaal(message.message, 'error')
			break;
		case 'Register successfully!':
			swaal(message.message, 'success')
			break;
		case 'Confirm password is incorrect':
			swaal(message.message, 'error')
			break;
		case "You've typed an incorrect password.":
			swaal(message.message, 'error')
			break;
		case 'This email address already exists!':
			swaal(message.message, 'error')
			break;
		case 'Logged out':
			swaal(message.message, 'success')
			break;
		case 'Logged in!':
			swaal(message.message, 'success')
			router.reload()
			break;
		case 'Updated!':
			swaal(message.message, 'success')
			router.reload()
			break;
		default:
			console.log("Nothing here...")
	}
	return ""
}


export default Toast
