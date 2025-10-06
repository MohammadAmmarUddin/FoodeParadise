import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const UserHome = () => {
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await axiosPublic.get("/users");

      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <span>Hi,Welcome {user?.displayName}</span>

      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>

          <div className="form-control mt-6">
            {/* <button className="btn btn-primary">Login</button> */}
          </div>
        </form>
      
      </div>
    </div>
  );
};

export default UserHome;
