import {baseURL} from '../BaseURL'
export const getBusinessListingTypes = async () => {
  const response = await fetch(`${baseURL}/public/bussiness-listing-types`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getIndustryTypes = async () => {
  const response = await fetch(`${baseURL}/public/bussiness-industries`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}

export const getCountries = async (accessToken) => {
  const response = await fetch(`${baseURL}/countries`, {
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

export const getStates = async (countryID, accessToken) => {
  const response = await fetch(`${baseURL}/states/${countryID}`, {
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

export const getCities = async (stateID, accessToken) => {
  const response = await fetch(`${baseURL}/cities/${stateID}`, {
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

export const getLocationVisibility = async (accessToken) => {
  const response = await fetch(`${baseURL}/public/location-visibility`, {
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

export const getStreetAddress = async (accessToken) => {
  const response = await fetch(`${baseURL}/cities`, {
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
export const getRealEastType = async () => {
  const response = await fetch(`${baseURL}/public/realestate-listing-types`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const getFranchisesTypes = async () => {
  const response = await fetch(`${baseURL}/public/franchise-categories`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}
export const getFilteredData = async (
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
  years
  // realEstate,

  // location
) => {
  // industry.map((item)=>())
  const response = await fetch(`${baseURL}/businesses/search`, {
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

      // "real_estate_listing_type[]": realEstate,

      // "location[]": location
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
