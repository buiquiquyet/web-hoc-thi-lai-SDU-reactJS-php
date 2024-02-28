import * as request from "../utils/request";

export const userApiPostHoSo = async (option) => {
    try {
        const res = await request.post('UserHoSo.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}