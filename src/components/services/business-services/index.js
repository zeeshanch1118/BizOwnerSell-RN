import {baseURL} from '../BaseURL'
export const createListingFirstStep = async (
  location,
  locationVisibitiy,
  title,
  listingType,
  industry,
  phoneNumber,
  email,
  accessToken
) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('listing_type', listingType)
  formData.append('industry', industry)

  formData.append('email', email)
  formData.append('phone', phoneNumber)
  formData.append('location_visibitiy', locationVisibitiy)

  formData.append('location', JSON.stringify(location))
  const response = await fetch(`${baseURL}/businesses`, {
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
export const updateListingFirstStep = async (
  location,
  locationVisibitiy,
  title,
  listingType,
  industry,
  phoneNumber,
  email,
  accessToken,
  businessID,
  financing,
  listingStatus
) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('status', listingStatus)
  formData.append('finance', financing)
  formData.append('listing_type', listingType)
  formData.append('industry', industry)
  formData.append('email', email)
  formData.append('phone', phoneNumber)
  formData.append('location_visibitiy', locationVisibitiy)
  formData.append('location', JSON.stringify(location))

  const response = await fetch(`${baseURL}/businesses/${businessID}?_method=put`, {
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
export const updateListingSecondStep = async (plane, accessToken) => {
  let formData = new FormData()
  formData.append('plane', plane)

  const response = await fetch(`${baseURL}/businesses`, {
    body: formData,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const updateListingThirdStep = async (
  country,
  state,
  city,
  streetAddress,
  locationVisibitiy,
  title,
  listingType,
  industry,
  zipCode,
  phoneNumber,
  email,
  accessToken
) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('listing_type', listingType)
  formData.append('industry', industry)
  formData.append('zip', zipCode)
  formData.append('email', email)
  formData.append('phoneNumber', phoneNumber)
  formData.append('location_visibitiy', locationVisibitiy)
  formData.append('country', country)
  formData.append('state', state)
  formData.append('city', city)
  formData.append('street_address', streetAddress)

  const response = await fetch(`${baseURL}/businesses`, {
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
export const updateListingFourthStep = async (
  realEstateTupe,
  price,
  established,
  tags,
  businessDescription,
  businessID,
  cashFlow,
  grossRevenue,
  accessToken,
  reasonForSelling,
  supporTraining,
  growthExpansion,
  competation,
  inventoryDescription,
  realEstatePrice,
  totalEmployees,
  leaseExpiration,
  EBITDA,
  buildingSquareFeet,
  inventoryFee,
  FurnitureFixtures,
  financing,
  listingStatus
) => {
  let stringOfTags = tags.toString()
  let formData = new FormData()

  formData.append('real_estate_listing_type', realEstateTupe)
  formData.append('asking_price', price)
  formData.append('finance', financing)
  formData.append('established_at', established)
  formData.append('tags', stringOfTags)
  formData.append('cash_flow', cashFlow)
  formData.append('gross_revenue', grossRevenue)
  formData.append('description', businessDescription)
  formData.append('ffe', FurnitureFixtures)
  formData.append('inventory', inventoryFee)
  formData.append('inventory_description', inventoryDescription)
  formData.append('building_sf', buildingSquareFeet)
  formData.append('ebitda', EBITDA)
  formData.append('lease_expiration', leaseExpiration)
  formData.append('total_employees', totalEmployees)
  formData.append('real_estate_price', realEstatePrice)
  formData.append('competition', competation)
  formData.append('growth_expansion', growthExpansion)
  formData.append('support_training', supporTraining)
  formData.append('reason_for_selling', reasonForSelling)

  const response = await fetch(`${baseURL}/businesses/${businessID}?_method=put`, {
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
export const updateListingFifthStep = async (images, businessID, accessToken, listingStatus) => {
  let formData = new FormData()
  images.map((item) => {
    // console.log('ffffffffffff', item)
    formData.append('slider_images[]', item)
  })
  formData.append('status', listingStatus)
  // formData.append('slider_images', images)

  const response = await fetch(`${baseURL}/businesses/slider-images/${businessID}`, {
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
export const getSingleBusinessesListings = async (accessToken, businessID) => {
  const response = await fetch(`${baseURL}/businesses/${businessID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const finalUploadStep = async (businessID, listingStatus, accessToken) => {
  let formData = new FormData()
  formData.append('status', 'active')
  formData.append('finance', listingStatus)
  const response = await fetch(`${baseURL}/businesses/${businessID}?_method=put`, {
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
export const getAllBusinessesListings = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/businesses?page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const deleteBusinessesListing = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/businesses/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const deleteBusinessImages = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/businesses/slider-image/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}

export const getPackage = async (accessToken) => {
  const response = await fetch(`${baseURL}/user/package/get-all-user-package`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const choosePlan = async (slug, accessToken) => {
  const response = await fetch(`${baseURL}/subscription/package/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const payment = async (
  token,
  id,
  method,
  secretKey,
  couponCode,
  stripe_plan,
  planID,
  key,
  accessToken
) => {
  console.log('buyerrrrrrrrrrrrrrrr')
  let formData = new FormData()
  if (
    planID !== null &&
    planID !== undefined &&
    planID !== '' &&
    key !== '' &&
    key !== undefined &&
    key !== null
  ) {
    formData.append(key, planID)
  }
  formData.append('token', token.token.id)
  formData.append('package', id)
  formData.append('client_secret', secretKey)
  formData.append('paymentMethod', method)
  formData.append('stripe_plan', stripe_plan)
  formData.append('coupon_code', couponCode)
  const response = await fetch(`${baseURL}/subscription/subscription`, {
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

// listing status

export const updateListingStatus = async (id, sold, price, accessToken) => {
  // let formData = new FormData()
  // formData.append('business_id', id)
  // formData.append('sold', status)
  // formData.append('price', price)
  const response = await fetch(`${baseURL}/businesses/business-sold`, {
    body: JSON.stringify({
      business_id: id,
      sold: sold,
      price: price,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const updateFranchiseListingStatus = async (id, sold, price, accessToken) => {
  const response = await fetch(`${baseURL}/franchises/franchise-sold`, {
    body: JSON.stringify({
      franchise_id: id,
      sold: sold,
      price: price,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}

export const getPaymentData = async (accessToken, id, type) => {
  const response = await fetch(`${baseURL}/subscription/single-user-subscription/${id}/${type}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const getBrokerPaymentData = async (accessToken, id, type) => {
  console.log(id, type)
  const response = await fetch(`${baseURL}/subscription/single-broker-subscription`, {
    body: JSON.stringify({
      id: id,
      type: type,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
