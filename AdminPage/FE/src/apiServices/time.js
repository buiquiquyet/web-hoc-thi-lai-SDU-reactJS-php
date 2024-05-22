import * as request from "../utils/request";

export const createTime = async (option) => {
    try {
        const res = await request.post('Time.php',  option )
        return res
       } catch (error) {
        console.log(error)
       }
}

export const getTime = async () => {
    try {
        const res = await request.get('Time.php' )
        return res
       } catch (error) {
        console.log(error)
       }
}