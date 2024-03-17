import {baseURL} from '../BaseURL'

export const getForSearchBusiness = async (page) => {
  const response = await fetch(`${baseURL}/businesses/search?page=${page}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result
}
export const getSingleBusiness = async (id, accessToken) => {
  const response = await fetch(`${baseURL}/businesses/${id}`, {
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
  listingType,
  industry,
  minPrice,
  maxPrice,
  grossMinPrice,
  grossMaxPrice,
  cashMinPrice,
  cashMaxPrice,
  tag,
  addDates,
  years,
  cityID,
  countryID,
  stateID,
  accessToken
) => {
  const response = await fetch(`${baseURL}/businesses/search?page=${page}`, {
    method: 'POST',
    body: JSON.stringify({
      listing_type: listingType,
      industry: industry,
      min_price: minPrice,
      max_price: maxPrice,
      gross_min_price: grossMinPrice,
      gross_max_price: grossMaxPrice,
      cash_min_price: cashMinPrice,
      cash_max_price: cashMaxPrice,
      tags: tag,
      add_date: addDates,
      established_at: years,
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

export const requestBusinessesConnected = async (
  type,
  fullName,
  email,
  phoneNo,
  business,
  message
) => {
  const response = await fetch(`${baseURL}/add-business-request`, {
    body: JSON.stringify({
      full_name: fullName,
      email: email,
      phone_no: phoneNo,
      business: business,
      message: message,
      type: type,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result
}

export const updateBusinessStatus = async (id, status, accessToken) => {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/update-business-status`, {
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
export const updateBusinessStatusUser = async (id, status, accessToken) => {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/update-business-status-user`, {
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
