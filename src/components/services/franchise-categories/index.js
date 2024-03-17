import {baseURL} from '../BaseURL'
export const getFranchiseCategoriesHome = async () => {
  const response = await fetch(`${baseURL}/public/franchise-categories-home`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const getFranchiseCategories = async () => {
  const response = await fetch(`${baseURL}/public/franchise-categories`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const getSingleFranchiseCategories = async (id) => {
  const response = await fetch(`${baseURL}/franchises/search`, {
    body: JSON.stringify({
      f_cat: id,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
