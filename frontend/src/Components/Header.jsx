import { Link } from "react-router-dom";
import logout from "../assets/icons8-logout-100.png";
import { useState } from "react";
import api from "../scripts/api";

// eslint-disable-next-line react/prop-types
export default function Header({ CURRENT_USER, setPastData, pastData }) {
  const [search, setSearch] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    //check if the chat already exists
    if (search === CURRENT_USER) {
      alert("can't chat with yourself...(for now)");
      return;
    }
    if (pastData.find((data) => data.user === search)) {
      alert("this chat already exists...");
      return;
    }

    // check if it is a valid username and add chat
    let existing_user = await api.get("/chat/checkuser", {
      params: { user: search },
    });

    if (existing_user.data) {
      let chat = {
        from: CURRENT_USER,
        to: search,
      };
      await api.post("/chat/add", chat);

      const reqdata = { username: CURRENT_USER };
      const res = await api.get("/chat/get", {
        params: { reqdata },
      });
      let data = res.data;
      //console.log("adder : " + data);
      setPastData(data);

      setSearch("");
    } else {
      alert("entered user doesn't exist...");
    }
  }
  return (
    <nav className="flex justify-around items-center p-2 bg-blue-400 border-b-2 border-sky-800 flex-wrap-reverse">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="m-4 flex justify-center items-center"
      >
        <input
          placeholder="Enter a username..."
          className="border-2 p-2 rounded-l-md focus:outline-none"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="border-2 p-2 rounded-r-md bg-slate-100">Add</button>
      </form>
      <div className="flex items-center min-w-[50%] justify-around">
        <h1 className="text-3xl mr-auto">Chats</h1>

        <Link to="/logout" className="">
          <img src={logout} alt="" height="50px" width="50px" />
        </Link>
      </div>
    </nav>
  );
}
