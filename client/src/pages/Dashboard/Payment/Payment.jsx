import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51PhCV9BYgbU2QpVdFUquepMLsQJNPZfHTIxKzEchX8ZI0m4NQ2r2mYf6t5h4S0gK3WwNlcGw2GTj4uWpPwSRGPHl001ZGsNJ42"
);

const Payment = () => {
  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <div>
      <SectionTitle
        heading={"Payment"}
        subHeading={"Please Pay To Eat"}
      ></SectionTitle>

      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default Payment;
