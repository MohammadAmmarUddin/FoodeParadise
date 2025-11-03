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
import loginImg from "/images/others/login.png";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password).then(() => {
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
    const value = e.target.value;
    setDisabled(!validateCaptcha(value));
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
    <div className="md:h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      {/* Left Side: Image (hidden on mobile) */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="max-h-[90vh] w-auto md:w-4/5 lg:w-3/5 object-contain rounded-3xl"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-3xl p-6 md:p-8 m-2 md:m-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}

          <div className="flex items-center gap-2">
            <LoadCanvasTemplate />
            <input
              type="text"
              placeholder=" Enter captcha"
              onBlur={handleValidateCaptcha}
              className="flex-1 md:px-3  py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-300 disabled:opacity-50"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 font-medium">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium hover:bg-gray-50 transition duration-300"
        >
          <FaGoogle className="text-red-500 text-lg" />
          Continue with Google
        </button>

        <p className="text-center mt-3 text-gray-600 text-sm">
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
