import {baseURL} from '../../BaseURL'

export const createIndustry = async (industryTitle, industrySlug, accessToken) => {
  const response = await fetch(`${baseURL}/bussiness-industries`, {
    body: JSON.stringify({
      name: industryTitle,
      slug: industrySlug,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const updateIndustry = async (industryTitle, industrySlug, accessToken, id) => {
  const response = await fetch(`${baseURL}/bussiness-industries/${id}`, {
    body: JSON.stringify({
      name: industryTitle,
      slug: industrySlug,
    }),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const deleteIndustry = async (accessToken, altId, id) => {
  const response = await fetch(`${baseURL}/bussiness-industries/${id}`, {
    body: JSON.stringify({
      alternative_id: altId,
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

export const getIndustry = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/bussiness-industries?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
