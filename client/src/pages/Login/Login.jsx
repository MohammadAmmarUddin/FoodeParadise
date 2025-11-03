import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
      };
      await axiosPublic.post("/users", userInfo);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Email
              </span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Password
              </span>
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
            <label className="label">
              <Link
                to="#"
                className="label-text-alt text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </label>
          </div>

          {/* Captcha */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Captcha
              </span>
            </label>
            <div className="flex items-center gap-3 mb-2">
              <LoadCanvasTemplate />
              <input
                onBlur={handleValidateCaptcha}
                type="text"
                name="captcha"
                placeholder="Enter captcha"
                className="input input-bordered flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 font-medium">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white text-gray-800 font-medium hover:bg-gray-100"
        >
          <FaGoogle className="text-red-500 text-lg" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-gray-600">
          New here?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
