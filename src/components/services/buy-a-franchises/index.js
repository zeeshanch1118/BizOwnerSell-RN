import {baseURL} from '../BaseURL'

export const getSingleFranchise = async (id, accessToken) => {
  const response = await fetch(`${baseURL}/franchises/${id}`, {
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
export const getFilteredData = async (
  page,
  fCat,
  minPrice,
  maxPrice,
  cityID,
  countryID,
  stateID,
  accessToken
) => {
  const response = await fetch(`${baseURL}/franchises/search?page=${page}`, {
    method: 'POST',

    body: JSON.stringify({
      f_cat: fCat,
      min_price: minPrice,
      max_price: maxPrice,
      countries: countryID,
      provinces: stateID,
      cities: cityID,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()

  return result
}
export const updateFranchiseStatus = async (id, status, accessToken) => {
  let formData = new FormData()
  console.log(accessToken)
  formData.append('id', id)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/update-franchise-status`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //   'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const updateFranchiseStatusUser = async (id, status, accessToken) => {
  let formData = new FormData()
  console.log(status)
  formData.append('id', id)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/update-franchise-status-user`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //   'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
