import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({items}) => {
   
    return (
        <div className="grid grid-cols-3">
        {items.map((coffee) => (
          <FoodCard key={coffee.id} item={coffee}></FoodCard>
        ))}
      </div>
    );
};

export default OrderTab;