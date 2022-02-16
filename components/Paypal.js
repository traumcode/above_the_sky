import { useEffect, useRef, useContext } from "react";
import { patchData } from "../utils/fetchData";
import { DataContext } from '../store/GlobalState';
import { updateItem } from '../store/Actions';


const Paypal = ({ order }) => {
	const refPaypalBtn = useRef();
	const {state, dispatch} = useContext(DataContext);
	const { auth, orders } = state;

	useEffect(() => {
		paypal.Buttons({
			createOrder: function (data, actions) {
				return actions.order.create({
					purchase_units: [ {
						amount: {
							value: order.total
						}
					} ]
				});
			},

			onApprove: function (data, actions) {
				return actions.order.capture().then(function (details) {

					patchData(`order/payment/${order._id}`, {
						paymentId: details.payer.payer_id
					}, auth.token)
						.then(res => {
							if (res.error) {
								return dispatch({ type: "NOTIFY", payload: { error: res.error } })
							}

							dispatch(updateItem(orders, order._id, {
								...order,
								paid: true, dateOfPayment: details.create_time,
								paymentId: details.payer.payer_id, method: "Paypal"
							}, 'ADD_ORDERS'))
							return dispatch({ type: "NOTIFY", payload: { success: res.message } })
						})
				});
			}
		}).render(refPaypalBtn.current);
	}, [auth.token, dispatch, order, orders]);

	return (
		<div ref={refPaypalBtn}/>
	)
}

export default Paypal