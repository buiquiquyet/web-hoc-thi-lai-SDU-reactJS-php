import * as request from "../utils/request";

export const accountSVGVApiPost = async (option) => {
    try {
        const res = await request.post('AccountSVGV.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}