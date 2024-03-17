import {baseURL} from '../BaseURL'
export const getFranchiseFavoriteListing = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/franchises/user/franchise-favorite?page=${page}`, {
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
export const getBusinessFavoriteListing = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/businesses/user/business-favorite?page=${page}`, {
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
