import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
const Offer = () => {
     const menu= useMenu();

     const popular = menu.filter(item=>item.category==='Popular')
  return (
    <div>
      <SectionTitle
        heading={`TODAY'S OFFER`}
        subHeading={`Donot Miss Our Offer`}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-5 mb-12">
       
        {popular.map((offer) => (
          <MenuItem key={offer.id} item={offer}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default Offer;
