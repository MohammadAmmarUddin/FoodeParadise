
const MenuItem = ({item}) => {

    const {image , price , name ,description} = item
    return (
        <div className="flex gap-4 mt-6">
            <img src={image} className="w-[120px] rounded-full"  alt="" />
            <div> 
            <h2 className="text-black">{name}</h2>
            <h2 className="text-black">{description}</h2></div>
            <p className="text-orange-500">${price}</p>
          
        </div>
    );
};

export default MenuItem;