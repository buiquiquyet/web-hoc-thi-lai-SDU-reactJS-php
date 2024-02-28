import * as request from "../utils/request";

export const searchAllApiPost = async (option) => {
    try {
        const res = await request.post('searchAll.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}

