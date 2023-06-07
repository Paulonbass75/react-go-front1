import Logo from "./../images/store_logo.png";
import { Link } from "react-router-dom";
import Test from "./Test";
import Slideshow from "./Slideshow";
const Home = () => {
  return (
    <>
      <div className="text-center w-full">
        <Slideshow />
        <div className="w-11/12 mx-auto bg-white shadow-xl px-20 pt-10 pb-20">
          <Test />
        </div>
      </div>
    </>
  );
};

export default Home;
