import axios from "axios";
import token from "./token";
import { LOGIN_USER, AUTH_USER } from "./types";


export function login(data) {
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

export function loginUser(data) {
    const request = axios.post('/auth/signin', data).then((response) => 
        response.data
    ).catch((error) => {
       return error;
    })
    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function auth() {
    const request = axios.get('/auth/me').then((response) => 
        response.data
    ).catch((error) => {
       return error;
    })
    return {
        type: AUTH_USER,
        payload: request
    }

}

