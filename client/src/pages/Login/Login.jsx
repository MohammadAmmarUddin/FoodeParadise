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
import SocialLogin from "../SocialLogin/SocialLogin";
const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password).then((res) => {
      const result = res.user;
      
      console.log(res.user);
      Swal.fire("Registration success!");

      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);

    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <SocialLogin></SocialLogin>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            name="email"
            placeholder="email"
            className="input input-bordered"
          />
          {errors.email && (
            <span className="text-red-400">Email is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
            name="password"
            placeholder="password"
            className="input input-bordered"
          />
          {errors.password && (
            <span className="text-red-400">Password is required</span>
          )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Captcha</span>
          </label>
          <LoadCanvasTemplate />
          <input
            onBlur={handleValidateCaptcha}
            type="captcha"
            id="captcha"
            name="captcha"
            placeholder="captcha"
            className="input input-bordered"
            required
          />
          {/* 
          <button className="btn " >Validate</button> */}
        </div>
        <div className="form-control mt-6">
          <button type="submit" disabled={disabled} className="btn btn-primary">
            Login
          </button>
          <p>
            New Here ? please{" "}
            <Link to={"/signup"} className="text-blue-400">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
