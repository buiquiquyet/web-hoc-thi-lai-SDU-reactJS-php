import * as request from "../utils/request";

export const userApiPostLogin = async (option) => {
    try {
        const res = await request.post('login.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}