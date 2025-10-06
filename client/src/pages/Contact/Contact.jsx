import contactImg from "/images/others/authentication1.png";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Swal from "sweetalert2";
const Contact = () => {
  

  const [result,setResult] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "2e78d586-95c4-4cac-8549-780f82495b0b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your message has been sent",
        showConfirmButton: false,
        timer: 1500
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  //  2e78d586-95c4-4cac-8549-780f82495b0b
  return (
    <div className="hero bg-base-200 min-h-screen">
      <Helmet>
        <title>foodparadise | CONTACT</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Contact now!</h1>
          <p className="font-bold text-3xl">Feel free to inquiries!</p>
          <img src={contactImg} alt="" />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
         
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
          
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                name="message"
                id="message"
                className="input input-bordered h-24"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
