import { loadStripe } from "@stripe/stripe-js";


let stripePromise;
const getStripe=()=>{
    if(!stripePromise){
        stripePromise= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
}
// const params= {
            
//     ui_mode: 'embedded',
    
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of
//         // the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     return_url:
//       `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  
// }
export default getStripe