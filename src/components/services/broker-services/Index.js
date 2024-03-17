import {baseURL} from '../BaseURL'

export const getBrokerPackage = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/broker-package`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}

// choose plan

export const chooseBrokerPlan = async (slug, accessToken) => {
  const response = await fetch(`${baseURL}/broker/package/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}

// PAYMENT
export const updateBrokerPayment = async (
  token,
  id,
  method,
  secretKey,
  couponCode,
  stripe_plan,
  accessToken
) => {
  let formData = new FormData()
  formData.append('token', token.token.id)
  formData.append('package', id)
  formData.append('client_secret', secretKey)
  formData.append('paymentMethod', method)
  formData.append('stripe_plan', stripe_plan)
  formData.append('coupon_code', couponCode)
  // const response = await fetch(`${baseURL}/broker/create-broker-subscription`, {
  const response = await fetch(`${baseURL}/broker/createBrokerSubscription`, {
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
export const brokerPayment = async (
  token,
  id,
  method,
  secretKey,
  coupon,
  stripe_plan,
  accessToken
) => {
  console.log('dsfffffffffffffffffffffffffff')
  let formData = new FormData()
  formData.append('token', token.token.id)
  formData.append('package', id)
  formData.append('client_secret', secretKey)
  formData.append('paymentMethod', method)
  formData.append('stripe_plan', stripe_plan)
  formData.append('coupon_code', coupon)
  const response = await fetch(`${baseURL}/broker/createBrokerSubscription`, {
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

// broker details

export const brokerDetails = async (
  websiteLinks,
  locationValue,
  aboutCompany,
  aboutPersonal,
  servicesOffered,
  affiliations,
  tags,
  refLinks,
  affiliatedLinksArray,
  licensedArray,
  transworldArray,
  accessToken
) => {
  let formData = new FormData()
  formData.append('link', websiteLinks)
  formData.append('countries', JSON.stringify(locationValue))
  formData.append('about_company', aboutCompany)
  formData.append('about_personal', aboutPersonal)
  formData.append('service_offered', servicesOffered)
  formData.append('affiliations', affiliations)
  formData.append('tags', tags)
  formData.append('reference_links', JSON.stringify(refLinks))
  formData.append('affiliate_links', JSON.stringify(affiliatedLinksArray))
  formData.append('licenses', JSON.stringify(licensedArray))
  formData.append('trans_world_businesses', JSON.stringify(transworldArray))

  const response = await fetch(`${baseURL}/broker/step-4`, {
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
export const updateBrokerFifthStep = async (images, accessToken) => {
  let formData = new FormData()
  images.map((item, index) => {
    formData.append('media[]', item)
  })
  // formData.append('media[]', images)
  const response = await fetch(`${baseURL}/broker/broker-image`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // "Content-Type": "multipart/form-data",
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()

  return result
}
export const getFilteredData = async (
  page,
  cityID,
  countryID,
  stateID,
  keyword,
  brokerFilter,
  accessToken
) => {
  console.log('brokerrrr', page, cityID, countryID, stateID, keyword, brokerFilter)
  const response = await fetch(`${baseURL}/broker/search-broker?page=${page}`, {
    method: 'POST',
    body: JSON.stringify({
      countries: countryID == null || countryID == 'null' ? '' : countryID,
      provinces: stateID == null || stateID == 'null' ? '' : stateID,
      cities: cityID == null || cityID == 'null' ? '' : cityID,
      tags: keyword == null || keyword == 'null' ? '' : keyword,
      moreFilter: brokerFilter == null || brokerFilter == 'null' ? '' : brokerFilter,
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

export const getSingleBroker = async (id, accessToken) => {
  const response = await fetch(`${baseURL}/broker/single-broker/${id}`, {
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

// contact
export const contactBroker = async (fullName, email, phoneNo, lookingFor, id, message) => {
  const response = await fetch(`${baseURL}/broker/contact-us`, {
    body: JSON.stringify({
      full_name: fullName,
      email: email,
      phone_no: phoneNo,
      looking: lookingFor,
      message: message,
      user: id,
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
// top Broker

export const getTopBrokers = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/top-broker`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const getBrokerSearch = async (accessToken) => {
  const response = await fetch(`${baseURL}/get-broker-search`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}

// save broker
export const saveBrokerSearch = async (country) => {
  let formData = new FormData()
  country?.map((item) => {
    formData.append('searches[]', item.name)
  })

  const response = await fetch(`${baseURL}/broker-search-create`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
  const result = await response.json()

  return result
}

// broker sold listings
export const soldListing = async (id) => {
  const response = await fetch(`${baseURL}/sold-business/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const soldFranchise = async (id) => {
  const response = await fetch(`${baseURL}/sold-franchise/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
