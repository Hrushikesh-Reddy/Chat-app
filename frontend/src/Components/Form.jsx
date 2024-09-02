import api from "../scripts/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Form({ route, method }) {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  let name = method == "login" ? "Login" : "Register";
  let down = method !== "login" ? "login" : "register";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (method == "login" && (uname.trim() === "" || pass.trim() == "")) {
        alert("enter valid user name or password");
        return;
      }
      if (
        method == "register" &&
        (uname.trim() === "" ||
          pass.trim() === "" ||
          uname.split(" ").length > 1 ||
          pass.trim().length < 8)
      ) {
        alert(
          "1)Username should not contain spaces\n2)Password must be atleast 8 characters long"
        );
        return;
      }
      let res = await api.post(route, { username: uname, password: pass });
      if (method == "login") {
        //console.log(res.data);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (e) {
      if (method == "login") alert("Incorrect Username or Password");
      console.error(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center shadow-lg fixed top-[20vh] left-[15vw] w-[70%] p-4 lg:w-[40%] lg:left-[25vw]"
    >
      <h1 className="text-2xl">{name}</h1>
      <input
        className="border-2 m-2 w-[90%]"
        value={uname}
        type="text"
        onChange={(e) => setUname(e.target.value)}
      />
      <input
        className="border-2 m-2 w-[90%]"
        value={pass}
        type="password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button>{name}</button>
      <Link to={"/" + down}>{down}</Link>
    </form>
  );
}
