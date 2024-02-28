import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:90/reactjs/',
})

export const get = async (path, option = {}) => {
    const res = await request.get(path, option)
    return res.data
}
export const post = async (path, option = {}) => {
    const res = await request.post(path, option)
    return res.data
}
