import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const totalAmount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const onPaymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: totalAmount * 100 })
        }).then(res => {
            return res.json()
        })

        console.log('payment-form.component: onPaymentHandler: response: : : ', response);
        // const clientSecret = response.paymentIntent.client_secret;
        const { paymentIntent: { client_secret } } = response;
        console.log('payment-form.component: onPaymentHandler: response: paymentIntent: clientSecret: ', client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                    email: currentUser ? currentUser.email : 'guestuser@guest.com',
                    address: 'guest address',
                    phone: '0321654987',
                },
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successfull')
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={onPaymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
