import '../node_modules/react-loader-spinner/dist/loader/css/triangle.css'
import { Triangle } from "react-loader-spinner";


const Loading = () => {
	return (
		<div className="loading-background">
			<Triangle ariaLabel="loading-indicator" color="white" wrapperStyle={{
				position: "absolute",
				top: '50%',
				left: '50%',
				zIndex: 9,
				transform: "translate(-50%, -50%)"
			}} width={190} height={190}/>
		</div>
	)
}

export default Loading