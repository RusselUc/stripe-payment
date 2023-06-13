import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import "bootswatch/dist/lux/bootstrap.min.css";

const App = () => {

  // esta clave se encuentra la cuenta de stripe:https://dashboard.stripe.com/test/apikeys
  const stripePromise = loadStripe(
    "clave secreta"
  );

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if(!error) {
        console.log(paymentMethod)
        const { id } = paymentMethod

        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id,
          amount: 10000
        })

        console.log(data)

        elements.getElement(CardElement).clear()
      }
    };

    return (
      <form onSubmit={handleSubmit} className="card card-body">
        <div className="form-group">
          <CardElement className="form-control" />
        </div>
        <button className="btn btn-success">Buy</button>
      </form>
    );
  };
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
};
export default App;
