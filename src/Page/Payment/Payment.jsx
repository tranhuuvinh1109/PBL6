import React, { useState, useContext } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../App';
import { courseAPI } from '../../api/courseAPI';
import { mailAPI } from '../../api/mailAPI';

const Payment = ({ data, res }) => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const { price, name, id, image } = data;
	const [isModalOpen, setIsModalOpen] = useState(false);
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
						value: 1
						// value: price
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
	const onApprove = (data, actions) => {
		const param = {
			email: context?.user?.email,
			price: price,
			image: image,
			course: name
		}
		sendEmailPayment(param);
		registerCourse(id)
		return actions.order.capture().then(function () {
			setSuccess(true);
		})
	}
	const registerCourse = async (id) => {
		const res = await courseAPI.registerCourse(id, context?.user?.id);
		if (res.status === 200) {
			navigate(`/learning/${id}`);
			toast.success('Course successfully registered !');
		} else {
			toast.error('Registering course failed !');
		}
	}
	const onError = (_data, _actions) => {
		setErrorMessage("An error occured with your payment")
	}
	const sendEmailPayment = async (data) => {
		const res = await mailAPI.sendMail({
			email: data.email,
			price: data.price,
			course: data.course,
			img: data.img
		});
		if (res.status === 201) {
			toast(`Purchase course successfully, Order Id: ${orderId}`);
		} else {
			toast(`Purchase course fail, ${errorMessage}`);
		}

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