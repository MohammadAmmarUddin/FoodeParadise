import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="my-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <FoodCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTab;
