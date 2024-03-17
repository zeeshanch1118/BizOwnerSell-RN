import {baseURL} from '../BaseURL'

export const getIndustryTypesForSiteMap = async () => {
  const response = await fetch(`${baseURL}/public/bussiness-industry-all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}
export const getListingTypesForSiteMap = async () => {
  const response = await fetch(`${baseURL}/public/bussiness-listing-types-all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}

export const getFranchisesTypesForSiteMap = async () => {
  const response = await fetch(`${baseURL}/public/franchise-categories-all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}
