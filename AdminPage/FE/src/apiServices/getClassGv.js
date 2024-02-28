import * as request from "../utils/request";

export const getClassGvSearchFilter = async (option) => {
    try {
        const res = await request.post('getClassGvSearchFillter.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}