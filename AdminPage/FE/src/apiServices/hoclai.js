import * as request from "../utils/request";

export const hoclaiPostApi = async (option) => {
    try {
        const res = await request.post('hoclai1.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}

