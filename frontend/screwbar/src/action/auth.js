import axios from "axios";
import token from "./token";


export function loginAction(data) {
    axios.post("http://127.0.0.1:8080/auth/signin", data, {withCredentials: true})
    .then((result) => {
        if(result.status === 200) {
            token.saveToken(result.data);
            return result;
        }
    }).catch((error) => {
        alert(error);
    })
}

export  async function signupAction(data) {
    const result = axios.
    post("http://127.0.0.1:8080/auth/signup", data)
    .then((response) => response.date);
    return {
        payload: result,
    };

}