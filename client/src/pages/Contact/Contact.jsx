import contactImg from "/images/others/authentication1.png";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "2e78d586-95c4-4cac-8549-780f82495b0b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully ✅");
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We'll get back to you soon.",
          showConfirmButton: false,
          timer: 1500,
          position: "top-end",
        });
        event.target.reset();
      } else {
        setResult(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setResult("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center py-12 px-4">
      <Helmet>
        <title>FoodParadise | Contact</title>
      </Helmet>

      <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-tr from-yellow-400 to-orange-500 flex flex-col justify-center items-center p-8 text-white"
        >
          <h1 className="text-4xl font-extrabold mb-2">Get in Touch</h1>
          <p className="text-lg mb-6 text-center px-4">
            Have questions or suggestions? We’d love to hear from you!
          </p>
          <img
            src={contactImg}
            alt="Contact"
            className="w-72 md:w-80 rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full input input-bordered focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full input input-bordered focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message here..."
                className="w-full input input-bordered h-28 focus:ring-2 focus:ring-orange-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn btn-warning font-bold tracking-wide"
            >
              {result === "Sending..." ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Result message */}
          {result && (
            <p className="text-center text-sm text-gray-600 mt-3">{result}</p>
          )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link to="/" className="btn btn-outline btn-sm">
              ⬅ Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
