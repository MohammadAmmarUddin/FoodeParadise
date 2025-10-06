import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  //   const [users] = useUsers();
  //   console.log(users)
  const axiosSecure = useAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
    },
  });
  const handleDelete = (user) => {
  
    console.log(user._id);
    axiosSecure.delete(`/users/${user._id}`)
    .then(()=> { refetch()
    console.log('delete done')})
  };
  const handleMakeAdmin =(user)=>{

    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res=>{
        refetch()

        console.log(res.data)
        if(res.data.modifiedCount > 0)
        {
           refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is now admin`,
                showConfirmButton: false,
                timer: 1500
              });

        }
    })


  }

  return (
    <div className="overflow-x-auto">
      <div>
        <h3>Total Users: {users.length}</h3>
      </div>
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>
              { item.role === 'admin'? 'Admin' :  <button onClick={()=>handleMakeAdmin(item)} className="btn btn-ghost btn-xs">
                  <FaUsers className="text-2xl text-red-600" />
                </button>}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item)}
                  className="btn btn-ghost btn-xs"
                >
                  <RiDeleteBin6Line className="text-2xl text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
