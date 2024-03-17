import Axios from 'axios'
import {baseURL} from '../../BaseURL'

export const createFranchises = async (franchiseTitle, franchiseSlug, accessToken) => {

  let formData = new FormData()
  formData.append('name', franchiseTitle)
  formData.append('slug', franchiseSlug)
  const response = await fetch(`${baseURL}/franchise-categories`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  //////////////////////

  const result = await response.json()
  return result
}

export const UpdateFranchises = async (franchiseTitle, franchiseSlug, accessToken, id) => {
  const response = await fetch(`${baseURL}/franchise-categories/${id}`, {
    body: JSON.stringify({
      name: franchiseTitle,
      slug: franchiseSlug,
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

export const deleteFranchises = async (accessToken, alterId, id) => {
  const response = await fetch(`${baseURL}/franchise-categories/${id}`, {
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

export const getFranchises = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/franchise-categories?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
