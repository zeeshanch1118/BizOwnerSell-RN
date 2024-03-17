import {baseURL} from '../../BaseURL'

export const createPackage = async (
  title,
  description,
  oneMonthValue,
  threeMonthValue,
  sixMonthValue,
  nineMonthValue,
  yearValue,
  status,
  packageType,
  featuresId,
  oneMonthStatus,
  threeMonthStatus,
  sixMonthStatus,
  nineMonthStatus,
  oneYearStatus,
  features,
  accessToken
) => {
  let idOfFeature = features?.length > 0 ? features?.map((item, index) => item.id) : []

  const data = {
    title,
    description,
    package_for: packageType,
    half_year_price: sixMonthValue,
    yearly_price: yearValue,
    half_year_status: sixMonthStatus,
    yearly_status: oneYearStatus,
    number_of_listing: featuresId,
    features: idOfFeature,
    status,
  }
  const response = await fetch(`${baseURL}/package/add_package`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getPackages = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/package/get-package?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const getPermission = async (accessToken) => {
  const response = await fetch(`${baseURL}/package/get-all-permission`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const deletePackage = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/package/delete-package/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const updatePackage = async (
  id,
  title,
  description,
  oneMonthValue,
  threeMonthValue,
  sixMonthValue,
  nineMonthValue,
  yearValue,
  status,
  packageType,
  featuresId,
  oneMonthStatus,
  threeMonthStatus,
  sixMonthStatus,
  nineMonthStatus,
  oneYearStatus,
  features,
  accessToken
) => {
  let idOfFeature = features?.length > 0 ? features?.map((item, index) => item.id) : []

  const data = {
    title,
    description,
    package_for: packageType,
    half_year_price: sixMonthValue,
    yearly_price: yearValue,
    half_year_status: sixMonthStatus,
    yearly_status: oneYearStatus,
    number_of_listing: featuresId,
    features: idOfFeature,
    status,
  }
  console.log('features', features)
  const response = await fetch(`${baseURL}/package/update_package/${id}`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
