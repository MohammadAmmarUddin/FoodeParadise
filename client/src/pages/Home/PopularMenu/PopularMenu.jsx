import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="my-16 px-4 md:px-8">
      <SectionTitle heading="Popular Items" subHeading="OUR MENU" />

      {popular.length === 0 ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          <p className="text-lg animate-pulse">Loading popular dishes...</p>
        </div>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6 
            mt-10
          "
        >
          {popular.map((item) => (
            <div
              key={item._id}
              className="
                hover:scale-[1.02] 
                transition-transform 
                duration-300 
                ease-in-out
              "
            >
              <MenuItem item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularMenu;
