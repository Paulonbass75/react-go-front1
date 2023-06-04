import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setJwtToken } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { setAlertMessage } = useOutletContext();
  const { toggleRefresh } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //build request payload
    let payload = {
      email: email,
      password: password,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    };

    await fetch(`/authenticate`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertClassName("alert alert-danger");
          setAlertMessage(data.message);
        } else {
          setJwtToken(data.access_token);
          setAlertClassName("d-none");
          setAlertMessage("");
          toggleRefresh(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setAlertClassName("alert-danger");
        setAlertMessage(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="my-20 px-20 bg-white rounded-xl border-slate shadow-xl flex flex-col justify-center items-center max-w-[450px] w-full">
        <h2 className="pt-10 text-4xl font-poppins font-extrabold my-2">Login</h2>
        <div className="mt-10 pb-32 pt-10">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="font-poppins text-lg pb-5 font-medium">Email:</label>
            <Input
              type="email"
              className="max-w-[300px] text-xl border-2 pl-2 py-1 border-slate rounded-md shadow-sm shadow-gray-400 mb-5"
              name="email"
              autocomplete="email-new"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="font-poppins text-lg pb-5 font-medium">Password:</label>
            <Input
              type="password"
              className="max-w-[300px] text-xl border-2 pl-2 py-1 border-slate rounded-lg shadow-sm shadow-gray-400 mb-10"
              name="password"
              autocomplete="password-new"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" className="w-full bg-[#01b6e3] shadow-md shadow-gray-400 rounded-lg py-2 text-lg font-poppins font-semibold text-white cursor-pointer" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
