import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "/images/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import coffee from "/images/menu/coffee.jpg";
import bbqImg from "/images/menu/bbq.jpg";
import sharmaImg from "/images/home/featuredBg.jpg";
import burgerImg from "/images/menu/Grill.jpg";

const Menu = () => {
  const [menu] = useMenu();
  console.log(menu);
  
  const coffees = menu.filter((item) => item.category === "coffee");

  const Grills = menu.filter((item) => item.category === "Grill");
  const shawarmas = menu.filter((item) => item.category === "shawarma");
  const burgers = menu.filter((item) => item.category === "burger");
  // const offered = menu.filter((item) => item.category === "Offered");

  return (
    <div className="mx-auto max-w-7xl">
      <Helmet>
        <title>foodparadise | Menu</title>
      </Helmet>
      {/* COFFEE SECTION  */}
      <Cover img={menuImg} title={"OUR MENU"}></Cover>

      <SectionTitle
        subHeading={"Donot miss our offer"}
        heading={"TODAY'S  OFFER"}
      ></SectionTitle>

      <MenuCategory
        items={coffees}
        title={"COFFEE"}
        coverImg={coffee}
      ></MenuCategory>

      {/* SHAWARMA SECTION  */}

      <SectionTitle
        subHeading={"Grill"}
        heading={"TODAY'S  OFFER"}
      ></SectionTitle>

      <MenuCategory
        items={Grills}
        title={"Grill"}
        coverImg={bbqImg}
      ></MenuCategory>

      <SectionTitle
        subHeading={"SHAWARMA"}
        heading={"TODAY'S  OFFER"}
      ></SectionTitle>

      <MenuCategory
        items={shawarmas}
        title={"SHAWARMA"}
        coverImg={sharmaImg}
      ></MenuCategory>
      <SectionTitle
        subHeading={"Burger"}
        heading={"TODAY'S  OFFER"}
      ></SectionTitle>

      <MenuCategory
        items={burgers}
        title={"Burger"}
        coverImg={burgerImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
