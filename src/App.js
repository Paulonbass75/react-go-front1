import { useCallback, useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Alert from "./components/Alert";
import TopNavigation from "./components/Layouts/TopNavigation";
import "./App.css";
// import Test from "./components/Test";
import Footer from "./components/Layouts/Footer";
import { DBProvider } from "./components/contexts/Context";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [categories, setCategories] = useState([]);
  const [children, setChildren] = useState([]); // [category, setCategory
  const [error, setError] = useState("");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    fetch(`/logout`, requestOptions)
      .catch((err) => {
        console.log("logged out", err);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });
    navigate("/login");
  };

  const toggleRefresh = useCallback(
    (status) => {
      console.log("clicked");

      if (status) {
        console.log("turn on ticking");
        let i = setInterval(() => {
          const requestOptions = {
            method: "GET",
            credentials: "include",
          };
          fetch(`/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log("user not logged in");
            });
        }, 600000);
        setTickInterval(i);
        console.log("tickInterval", i);
      } else {
        console.log("turn off ticking");
        console.log("turn off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch(() => {
          console.log("user not logged in");
        });
    }

    // const requestOptions = {
    //   method: "GET",
    // };
    // fetch(`http://10.0.1.244/api/v2/categories`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.error) {
    //       setError(data.message);
    //     } else {
    //       setCategories(data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [jwtToken, toggleRefresh]);
  // console.log(categories);

  return (
    <div className="">
      <DBProvider>
        <TopNavigation data={jwtToken} />
        <div id="App">
          <div className="">
            <Alert message={alertMessage} className={alertClassName} />
            <Outlet
              context={{
                jwtToken,
                setJwtToken,
                setAlertClassName,
                setAlertMessage,
                toggleRefresh,
              }}
            />
          </div>
          <Footer />
        </div>
      </DBProvider>
    </div>
  );
}

export default App;
