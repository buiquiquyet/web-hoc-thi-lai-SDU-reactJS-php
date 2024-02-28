import * as request from "../utils/request";

export const userApiPost = async (option) => {
    try {
        const res = await request.post('HeaderInfo.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}