import axios from "axios";

export default class AuthSerivce {

    static async createNewUser(username, email, password) {
        this.SERVER_URL = `http://127.0.0.1/`
        this.SIGNUP_URL = `${this.SERVER_URL}api/v1/users/register/`
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
        this.SERVER_URL = `http://127.0.0.1/`
        this.LOGIN_URL = `${this.SERVER_URL}api/token/`
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
}