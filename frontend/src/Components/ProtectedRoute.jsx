import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../scripts/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth();
  }, []);

  const refreshToken = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("api/token/refresh", { refresh: token });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.log(err);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    //console.log(token)
    if (token == null || token == "undefined") {
      setIsAuthorized(false);
    }else{
        setIsAuthorized(true);
    }

/*    const decoded = jwtDecode(token);
     const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    } */
  };

  if (isAuthorized == null) {
    return <div>loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}
