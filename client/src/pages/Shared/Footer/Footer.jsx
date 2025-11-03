import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import logo from "/images/logo/logo.png";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-12 pb-6">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Brand & Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Food Paradise Logo"
              className="w-16 rounded-lg"
            />
            <h2 className="text-xl font-semibold text-yellow-300">
              Food Paradise
            </h2>
          </div>
          <p className="text-gray-300 mb-4">
            Your favorite destination for delicious meals. Serving happiness
            since <span className="text-yellow-300 font-medium">2020</span>.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <FaLocationDot className="mr-2 text-yellow-300" />
              32 GEC, Bangladesh
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-yellow-300" /> +880 1883-33****
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-yellow-300" />
              foodparadise@gmail.com
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 transition">Home</li>
            <li className="hover:text-yellow-400 transition">Menu</li>
            <li className="hover:text-yellow-400 transition">About</li>
            <li className="hover:text-yellow-400 transition">Contact</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Follow Us
          </h3>
          <p className="text-gray-300 mb-4">
            Stay connected through our social channels.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                color="#1DA1F2"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3a9.864 9.864 0 0 1-3.127 1.195A4.917 4.917 0 0 0 16.616 3c-2.72 0-4.924 2.204-4.924 4.924 0 .39.045.765.128 1.124A13.978 13.978 0 0 1 1.671 3.149a4.93 4.93 0 0 0-.665 2.476 4.924 4.924 0 0 0 2.19 4.098 4.902 4.902 0 0 1-2.23-.616v.062c0 2.29 1.63 4.198 3.792 4.635a4.936 4.936 0 0 1-2.224.084c.63 1.97 2.46 3.405 4.63 3.446A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.514 14.01-14.028 0-.214-.005-.426-.014-.637A10.01 10.01 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                color="#E1306C"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.003.24 2.47.403a4.92 4.92 0 0 1 1.772 1.153 4.92 4.92 0 0 1 1.153 1.772c.163.467.347 1.264.403 2.47.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.24 2.003-.403 2.47a4.92 4.92 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.467.163-1.264.347-2.47.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.003-.24-2.47-.403a4.92 4.92 0 0 1-1.772-1.153 4.92 4.92 0 0 1-1.153-1.772c-.163-.467-.347-1.264-.403-2.47C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.206.24-2.003.403-2.47a4.92 4.92 0 0 1 1.153-1.772 4.92 4.92 0 0 1 1.772-1.153c.467-.163 1.264-.347 2.47-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.18 0-3.557.012-4.806.07-1.15.053-1.774.24-2.19.403a3.093 3.093 0 0 0-1.122.73 3.093 3.093 0 0 0-.73 1.122c-.163.416-.35 1.04-.403 2.19-.058 1.249-.07 1.626-.07 4.806s.012 3.557.07 4.806c.053 1.15.24 1.774.403 2.19.167.416.38.774.73 1.122.348.35.706.563 1.122.73.416.163 1.04.35 2.19.403 1.249.058 1.626.07 4.806.07s3.557-.012 4.806-.07c1.15-.053 1.774-.24 2.19-.403a3.093 3.093 0 0 0 1.122-.73 3.093 3.093 0 0 0 .73-1.122c.163-.416.35-1.04.403-2.19.058-1.249.07-1.626.07-4.806s-.012-3.557-.07-4.806c-.053-1.15-.24-1.774-.403-2.19a3.093 3.093 0 0 0-.73-1.122 3.093 3.093 0 0 0-1.122-.73c-.416-.163-1.04-.35-2.19-.403-1.249-.058-1.626-.07-4.806-.07z" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                color="#1877F2"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.379 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Food Paradise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
