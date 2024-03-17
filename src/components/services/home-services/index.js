import { baseURL } from "../BaseURL";

export const  getHomeSesvices =async () =>{

    const response = await fetch(`${baseURL}/public/home`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const result = await response.json()
    return result

}
