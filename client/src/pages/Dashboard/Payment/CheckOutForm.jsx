import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CheckOutForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cart, refetch] = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const TotalPrice = cart.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate()
  useEffect(() => {
    if (TotalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: TotalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, TotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // creating paymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error ", error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm  error");
    } else {
      console.log("payment intention", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save th payment in database

        const payment = {
          email: user.email,
          price: TotalPrice,
          transactionId: paymentIntent.id,

          date: new Date(),
          cartIds: cart.map((item) => item._id),

          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
       console.log(res)
         refetch();
         if(res.data.paymentResult.insertedId)
         {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/paymentHistory')
         }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              color: "white",
              fontSize: "16px",
              "::placeholder": {
                color: "gray",
              },
            },
            invalid: {
              color: "red",
            },
          },
        }}
      ></CardElement>

      <button
        className="btn btn-warning mt-10"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-400">Your Transaction id:{transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
