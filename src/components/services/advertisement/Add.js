import {baseURL} from '../BaseURL'

export const getBizOwnerAdds = async (accessToken) => {
  const response = await fetch(`${baseURL}/get-advertise`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()

  return result
}
