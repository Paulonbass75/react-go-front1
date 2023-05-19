import { useCallback, useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    fetch(`/logout`, requestOptions)
      .catch((err) => {
        console.log("loggged out", err);
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
        .catch((error) => {
          console.log("user not logged in", error);
        });
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>React With Go Sandbox</h1>
        </div>
        <div className="col text-end">
          {jwtToken === "" ? (
            <Link to="/login">
              <span className="badge bg-success">Login</span>
            </Link>
          ) : (
            <a href="#!" onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </a>
          )}
        </div>
        <hr className="mb-3" />
      </div>
      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/Categories"
                className="list-group-item list-group-item-action"
              >
                Categories
              </Link>
              <Link
                to="/Movies"
                className="list-group-item list-group-item-action"
              >
                Items
              </Link>
              {jwtToken !== "" && (
                <>
                  <Link
                    to="/admin/Movie/0"
                    className="list-group-item list-group-item-action"
                  >
                    Add Movies
                  </Link>
                  <Link
                    to="/Admin"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Catalogue
                  </Link>
                  <Link
                    to="/GraphQL"
                    className="list-group-item list-group-item-action"
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
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
      </div>
    </div>
  );
}

export default App;
