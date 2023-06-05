import Logo from "./../images/store_logo.png";
import { Link } from "react-router-dom";
import Test from "./Test";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h2>Home</h2>
        <Test />
        <p>Home page body content</p>
      </div>
    </>
  );
};

export default Home;
