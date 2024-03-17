import {baseURL} from '../BaseURL'
export const getFranchiseRecommendation = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/franchises/recommanded/franchise?page=${page}`, {
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
export const getBusinessRecommendation = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/businesses/recommanded/business?page=${page}`, {
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
