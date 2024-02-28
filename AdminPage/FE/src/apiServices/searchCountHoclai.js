import * as request from "../utils/request";

export const searchCountHoclai = async (option) => {
    try {
        const res = await request.post('searchCountHoclai.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}

