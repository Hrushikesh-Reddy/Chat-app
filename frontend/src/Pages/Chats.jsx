import { useEffect, useState } from "react";
import api from "../scripts/api";
import Room from "../Components/Room";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../scripts/constants";
import Header from "../Components/Header";

export default function Chats() {
  const [pastData, setPastData] = useState([]);
  const CURRENT_USER = jwtDecode(localStorage.getItem(ACCESS_TOKEN)).user;

  useEffect(() => {
    const reqdata = { username: CURRENT_USER };
    //console.log(reqdata);
    api
      .get("/chat/get", {
        params: { reqdata },
      })
      .then((past) => {
        if (past) {
          console.log(past.status+"\n\n"+past.data);
          //console.log(past);
          const data = past.data;
          //console.log(data)
          setPastData(data);
        } else {
          localStorage.clear();
        }
      });
  }, []);

  return (
    <div className="">
      <Header
        CURRENT_USER={CURRENT_USER}
        setPastData={setPastData}
        pastData={pastData}
      />
      <ul>
        {pastData.map((data) => {
          return (
            <li key={data.id}>
              <Room
                user={data.user}
                Room_id={data.id}
                CURRENT_USER={CURRENT_USER}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
