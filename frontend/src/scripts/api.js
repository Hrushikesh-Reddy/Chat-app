import axios from "axios";
import { ACCESS_TOKEN} from "./constants";

const apiURL = "https://c37ebc4c-8f89-49f7-bc20-30c8c34ad918-dev.e1-us-east-azure.choreoapis.dev/chatapp/backend/v1.0"

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token){
            // change to 'Bearer' if error
            config.headers.Auth = `bearer ${token}`
        }
        return config;
    }, 
    (err)=>{
        return Promise.reject(err);
    }
)

export default api