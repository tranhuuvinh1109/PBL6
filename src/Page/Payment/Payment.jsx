import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Modal } from 'antd';

const Payment = ({ data }) => {
	const { price, name, id } = data;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [show, setShow] = useState(false)
	const [success, setSuccess] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [orderId, setOrderId] = useState(false)

	const createOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					description: `You have successfully paid for ${name} course for ${price}`,
					amount: {
						currency_code: 'USD',
						value: price
					},
				},
			],
			application_context: {
				shipping_preference: 'NO_SHIPPING'
			}
		})
			.then((orderID) => {
				setOrderId(orderID)
				return orderID
			})
	}
	const onApprove = (_data, actions) => {
		return actions.order.capture().then(function (details) {
			const { payer } = details
			setSuccess(true)
		})
	}
	const onError = (_data, _actions) => {
		setErrorMessage("An error occured with your payment")
	}

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			<button onClick={ showModal } className="bg-red-400 text-white py-1.5 px-3 rounded-full min-w-[150px] hover:bg-red-300">
				Register
			</button>
			<Modal open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
				<PayPalScriptProvider
					options={ {
						"client-id": "AVpBPKvvEYVcWq7GDrnxKyYHgBT2RApnp95Mwoupc-jJE1lcZ-OayBq_ktkzihL8nWxVOFFj4_eC3HAC"
					} }
				>
					<h3>Payment Course</h3>
					<h2>{ price } USD</h2>
					<PayPalButtons style={ { layout: 'vertical' } } createOrder={ createOrder }
						onApprove={ onApprove } onError={ onError } />

					{ success ? (
						<h5>Your Payment has been done successfully please check email</h5>
					) : <h5>Payment is pending</h5> }

				</PayPalScriptProvider>
			</Modal>
		</div>
	)
}

export default Payment;