import Axios from 'axios'
import {baseURL} from '../../BaseURL'

export const createRealListings = async (listingTitle, listingSlug, accessToken) => {
  let formData = new FormData()
  formData.append('type', listingTitle)
  formData.append('slug', listingSlug)
  const response = await fetch(`${baseURL}/realestate-listing-types`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const UpdateRealListings = async (listingTitle, listingSlug, accessToken, id) => {
  const response = await fetch(`${baseURL}/realestate-listing-types/${id}`, {
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

export const deleteRealListings = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/realestate-listing-types/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getRealListings = async (accessToken) => {
  const response = await fetch(`${baseURL}/realestate-listing-types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
