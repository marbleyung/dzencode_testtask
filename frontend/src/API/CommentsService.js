import axios from "axios";
import { SERVER_URL } from './consts.js';


export default class CommentsService {

    static async getAllComments(offset = 0) {
        this.COMMENTS_URL = `${SERVER_URL}api/v1/comments/?offset=${offset}`
        try {
            const response = await axios.get(`${this.COMMENTS_URL}`).then(res => res)
            return response
        } catch (e) {
            console.log(e)
        }
    }

    static async getComment(id) {
        this.COMMENTS_URL = `${SERVER_URL}api/v1/comments/`

        try {
            const response = await axios.get(`${this.COMMENTS_URL}${id}/`).then(res => res)
            console.log(`response: ${response}`)
            return response
        } catch (e) {
            console.log(e)
        }
    }

    static async getNestedComments(id) {
        this.COMMENTS_URL = `${SERVER_URL}api/v1/comments/`

        try {
            const response = await axios.get(`${this.COMMENTS_URL}${id}/nested/`).then(res => res)
            console.log(`response: ${response}`)
            return response
        } catch (e) {
            console.log(e)
        }
    }

    static async postComment(parent, body, image = null, textfile = null, accessToken) {
        this.COMMENTS_URL = `${SERVER_URL}api/v1/comments/`
        const data = {
            parent,
            body,
            image,
            textfile
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
          }
        try {
            const response = await axios.post(`${this.COMMENTS_URL}`, data, {headers: headers})
            console.log(`response post create: ${response}`)
            return response
        } catch (e) {
            console.log(e)
        }
    }
}