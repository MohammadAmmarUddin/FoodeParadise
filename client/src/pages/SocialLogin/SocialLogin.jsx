import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      console.log(result.user);

      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
      };

      await axiosPublic.post("/users", userInfo);
      console.log("User added successfully");

      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full max-w-sm px-4 py-3 border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white text-gray-800 font-medium hover:bg-gray-100"
      >
        <FaGoogle className="text-red-500 text-lg" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
