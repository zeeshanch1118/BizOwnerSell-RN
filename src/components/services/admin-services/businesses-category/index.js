import Axios from 'axios'
import {baseURL} from '../../BaseURL'

export const createListings = async (listingTitle, listingSlug, accessToken) => {
  let formData = new FormData()
  formData.append('type', listingTitle)
  formData.append('slug', listingSlug)
  const response = await fetch(`${baseURL}/bussiness-listing-types`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
  /////////////

  const result = await response.json()
  return result
}
export const UpdateListings = async (listingTitle, listingSlug, accessToken, id) => {
  const response = await fetch(`${baseURL}/bussiness-listing-types/${id}`, {
    body: JSON.stringify({
      type: listingTitle,
      slug: listingSlug,
    }),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const deleteListings = async (accessToken, alterId, id) => {
  const response = await fetch(`${baseURL}/bussiness-listing-types/${id}`, {
    body: JSON.stringify({
      alternative_id: alterId,
    }),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getListings = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/bussiness-listing-types?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
