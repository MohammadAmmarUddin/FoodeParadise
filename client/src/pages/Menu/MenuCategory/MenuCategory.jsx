import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, coverImg }) => {
  const itemsCut = items.slice(0, 4); // Display only first 4 items

  return (
    <div className="my-12 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Cover with overlay */}
      {title && (
        <div className="relative mb-10 rounded-xl overflow-hidden shadow-lg">
          <Cover img={coverImg} title={title} />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"></div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemsCut.map((item) => (
          <div
            key={item._id}
            className="
              bg-white rounded-xl shadow-md hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-1 
              flex flex-col
            "
          >
            <MenuItem item={item} />
          </div>
        ))}
      </div>

      {/* Order Now Button */}
      <div className="flex justify-center mt-8">
        <Link
          to={`/order/${title}`}
          className="
            bg-gradient-to-r from-yellow-400 to-green-600 
            hover:from-green-500 hover:to-green-700 
            text-white font-bold px-6 py-3 rounded-full shadow-lg 
            transition-all duration-300
          "
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
