const MenuItem = ({ item }) => {
  const { image, price, name, description } = item;

  return (
    <div
      className="
        flex flex-col sm:flex-row items-center sm:items-start 
        gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg 
        transition-shadow duration-300 ease-in-out
      "
    >
      {/* Image Section */}
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover rounded-full 
            border-4 border-orange-500/20 shadow-sm
            hover:scale-105 transition-transform duration-300 ease-in-out
          "
        />
        {/* Optional Glow Overlay */}
        <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-md opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {/* Text Section */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{name}</h2>
        <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
      </div>

      {/* Price */}
      <p className="text-orange-600 font-bold text-lg">${price}</p>
    </div>
  );
};

export default MenuItem;
