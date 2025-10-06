import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res =await axiosPublic.get(`/payments/${user?.email}`);

      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl font-bold">Your Payment History</h2>

      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Status</th>
        <th>TransactionId</th>
        <th>Total Price</th>
        <th>Payment Date</th>
      </tr>
    </thead>
    <tbody>
   {

      paymentHistory.map(data=> <tr key={data._id}>
        <th>{data?.status}</th>
        <td>{data?.transactionId}</td>
        <td>{data?.price}</td>
        <td>{data?.date}</td>
      </tr>
   )
   }
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default PaymentHistory;
