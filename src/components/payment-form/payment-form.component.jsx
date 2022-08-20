import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const onPaymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 10000 })
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
                    name: 'Test user Name',
                    email: 'testusername@email.com',
                    address: 'test user address',
                    phone: '0321654987',
                },
            }
        });

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
                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
