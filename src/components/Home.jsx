import Logo from "./../images/store_logo.png";
import { Link } from "react-router-dom";
import Test from "./Test";
import AllProducts from "./AllProducts";
import MkYrMdl2 from "./Layouts/MkYrMdl2";
import CategoryCards from "./CategoryCards";
import Slideshow from "./Slideshow";
import { useDB } from "./contexts/Context";
const Home = () => {
  const { categories } = useDB();
  return (
    <>
      <div className="text-center w-full">
        <Slideshow />
        <div className="w-full py-4 ps-24 bg-stone-900 hidden min-[1024px]:flex flex-row items-center sticky">
          <MkYrMdl2 />
        </div>
        <div className="w-11/12 mx-auto bg-white shadow-xl px-20 pt-10 pb-20 ">
          {/* <Test /> */}
          {/* <AllProducts /> */}
          <div className="flex justify-center">
            <div className="flex flex-row justify-center flex-wrap w-fit">
              {categories.map((category, index) => {
                return (
                  <Link key={category.id} to={`/categories/${category.id}`}>
                    <CategoryCards
                      id={category.id}
                      img={category.img}
                      name={category.name}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
