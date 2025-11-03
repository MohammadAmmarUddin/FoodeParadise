import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "/images/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import coffeeImg from "/images/menu/coffee.jpg";
import bbqImg from "/images/menu/bbq.jpg";
import shawarmaImg from "/images/home/featuredBg.jpg";
import burgerImg from "/images/menu/Grill.jpg";

const Menu = () => {
  const [menu] = useMenu();

  const coffees = menu.filter((item) => item.category === "coffee");
  const grills = menu.filter((item) => item.category === "Grill");
  const shawarmas = menu.filter((item) => item.category === "shawarma");
  const burgers = menu.filter((item) => item.category === "burger");

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <Helmet>
        <title>FoodParadise | Menu</title>
      </Helmet>

      {/* PAGE COVER */}
      <Cover img={menuImg} title="OUR MENU" />

      {/* TODAY'S OFFER */}
      <section className="my-12">
        <SectionTitle
          heading="TODAY'S OFFER"
          subHeading="Don't miss our special items"
        />
        <MenuCategory items={coffees} title="COFFEE" coverImg={coffeeImg} />
      </section>

      {/* GRILL SECTION */}
      <section className="my-12">
        <SectionTitle
          heading="GRILL SPECIALS"
          subHeading="Deliciously Grilled for You"
        />
        <MenuCategory items={grills} title="GRILL" coverImg={bbqImg} />
      </section>

      {/* SHAWARMA SECTION */}
      <section className="my-12">
        <SectionTitle heading="SHAWARMA" subHeading="Juicy & Flavorful" />
        <MenuCategory
          items={shawarmas}
          title="SHAWARMA"
          coverImg={shawarmaImg}
        />
      </section>

      {/* BURGER SECTION */}
      <section className="my-12">
        <SectionTitle
          heading="BURGER DELIGHTS"
          subHeading="Burgers You Can't Resist"
        />
        <MenuCategory items={burgers} title="BURGER" coverImg={burgerImg} />
      </section>
    </div>
  );
};

export default Menu;
