import { useEffect, useState } from "react";
import api from "../scripts/api";
import Room from "../Components/Room";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../scripts/constants";
import Header from "../Components/Header";

export default function Chats() {
  const [pastData, setPastData] = useState([]);
  const CURRENT_USER = jwtDecode(localStorage.getItem(ACCESS_TOKEN)).user;

  async function getC(){
    const reqdata = { username: CURRENT_USER };
    //console.log(reqdata);
    const res = await api.get("/chat/get", {params: { reqdata }});
    return res.data;
  }

  useEffect(() => {
    getC.then((data)=>{
      console.log(data);
      setPastData(data);
    })
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
