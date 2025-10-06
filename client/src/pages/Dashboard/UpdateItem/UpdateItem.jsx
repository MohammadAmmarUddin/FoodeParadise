import { FaUtensilSpoon } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const hosting_key = "31b8c3042470c9673a22cc6767e6a68f";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${hosting_key}`;
const UpdateItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { name, image, category, description, price, _id } = useLoaderData();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log("clicked");
    // send img to imgbb and  get  url

    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(res.data.data.display_url);
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,

        description: data.description,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes);

      if (menuRes.data.modifiedCount > 0) {
        // show success popup
        reset();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your menu has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle
        heading={"Update An Item"}
        subHeading={"Update This Item ?"}
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={name}
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
                defaultValue={category}
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
                defaultValue={price}
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
              defaultValue={description}
              {...register("description", { required: true })}
              className="textarea  textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <img src={image} className="w-20 rounded mb-2" alt="" />
            <input type="file"  {...register("image")} />
          </div>

          <button
            type="submit"
            className="btn bg-orange-400 text-black text-3xl "
          >
            Update item <FaUtensilSpoon></FaUtensilSpoon>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
