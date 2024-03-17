import {baseURL} from '../BaseURL'

export const getSellerProfile = async (id, accessToken) => {
  const response = await fetch(`${baseURL}/single-user/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
