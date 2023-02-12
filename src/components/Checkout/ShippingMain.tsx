import { useState, useEffect, useContext } from "react";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

import {trpc} from "@/utils/trpc";
import {OrderSummary, ShippingInfo, CheckoutForm} from "@/components"
import { CartContext } from "@/context/CartContext";
import { OrderContext } from "@/context/OrderContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const pubKey =  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

/**
 * 1. collect customer shipping information in ShippingInfo section
 * 2. Upon validation of all input fields, customer submits form
 * 3. If inputs valid, display popup form with Stripe or Paypal payout form
 */
export default function ShippingMain() {

    //FETCH DATA REQUEST
    const { cart } = useContext(CartContext);
    const { paymentMethod } = useContext(OrderContext);
    const [clientSecret, setClientSecret] = useState("");
    const {mutate:makeIntent} = trpc.StripePaymentIntent.useMutation({
        onSuccess:(secret)=> { 
            if(typeof secret === "string"){
                setClientSecret(secret)}
            }
    })
    
    useEffect(()=>{
        if(!cart) return;
        makeIntent({ cart })        
    },[cart, makeIntent])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="flex flex-wrap h-full w-full items-center justify-center p-16 max-w-[1250px] min-w-[1150px] bg-white">
            <div className="flex items-center justify-center h-full w-full p-3 m-5 bg-black">
                <ShippingInfo />
                <OrderSummary />
                { paymentMethod === "Stripe" && clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm />
                    </Elements>
                ) }
            </div>
        </div>
    );
}