import { FaUtensilSpoon } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const hosting_key = "31b8c3042470c9673a22cc6767e6a68f";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${hosting_key}`;

const AddItem = () => {
  //   const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // send img to imgbb and  get  url

    const imageFile = { image: data.image[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(res.data.data.display_url);
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,

        description: data.recipe,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes);

      if (menuRes.data.insertedId) {
        // show success popup

        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your menu has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        heading={"Add An Item"}
        subHeading={"Whats new ?"}
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe name"
              className="input input-bordered"
            />
          </div>
          <div className="flex justify-between gap-3 ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>

              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Select a category
                </option>
                <option>Coffee</option>
                <option>BBQ</option>
                <option>SHAWARMA</option>
                <option>GRILL</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea  textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <input type="file" {...register("image", { required: true })} />
          </div>

          <button
            type="submit"
            className="btn bg-orange-400 text-black text-3xl "
          >
            Add item <FaUtensilSpoon></FaUtensilSpoon>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
