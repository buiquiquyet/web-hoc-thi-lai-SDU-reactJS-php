import * as request from "../utils/request";

export const searchAllDataTableApiPost = async (option) => {
    try {
        const res = await request.post('searchAllDataTalbe.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}

