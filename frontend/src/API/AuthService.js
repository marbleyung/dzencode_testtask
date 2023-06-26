import axios from "axios";
import { SERVER_URL } from './consts.js';

export default class AuthSerivce {

    static async createNewUser(username, email, password) {
        this.SIGNUP_URL = `${SERVER_URL}api/v1/users/register/`
        try {
            const response = await axios.post(`${this.SIGNUP_URL}`,
                {
                    username,
                    email,
                    password
                })
            console.log('authservice response', response)
            return response
        } catch (e) {
            console.log('authservice error', e.response.data)
            return e.response.data
        }
    }

    static async login(username, password) {
        this.LOGIN_URL = `${SERVER_URL}api/token/`
        try {
            const response = await axios.post(`${this.LOGIN_URL}`,
                {
                    username,
                    password
                })
            console.log('authservice response', response)
            return response
        } catch (e) {
            console.log('authservice error', e.response.data)
            return e.response.data
        }
    }

    static async refreshToken(refresh) {
        const axiosResponse = await axios.post(`${SERVER_URL}api/token/refresh/`, { refresh: refresh})
        return axiosResponse.data.access
    }
}