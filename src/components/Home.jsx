import Logo from "./../images/store_logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h2>Home</h2>
        <p>Home page body content</p>
        <hr />
        <Link to="/Movies">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
    </>
  );
};

export default Home;
