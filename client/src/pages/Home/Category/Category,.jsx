import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const categories = [
  { name: "Coffee", img: "/images/menu/coffee.jpg" },
  { name: "Burger", img: "/images/menu/Grill.jpg" },
  { name: "Grill", img: "/images/menu/bbq.jpg" },
  { name: "Shawarma", img: "/images/home/featuredBg.jpg" },
];

const Category = () => {
  return (
    <section className="my-16 px-4 md:px-8">
      <SectionTitle heading="Categories" subHeading="Explore our categories" />

      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          gap-4 
          md:gap-6 
          mt-8
        "
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="
              relative 
              cursor-pointer 
              group 
              overflow-hidden 
              rounded-xl 
              shadow-md 
              hover:shadow-xl 
              transition-shadow 
              duration-300
            "
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="
                w-full 
                h-32 
                sm:h-40 
                md:h-48 
                lg:h-56 
             
                transition-transform 
                group-hover:scale-110
              "
            />
            <div
              className="
                absolute 
                inset-0 
                bg-black 
                bg-opacity-40 
                flex 
                items-center 
                justify-center 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-300
              "
            >
              <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
