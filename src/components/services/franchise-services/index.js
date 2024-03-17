import {baseURL} from '../BaseURL'
export const createfranchiseFirstStep = async (
  location,
  locationVisibitiy,
  title,
  listingType,
  phoneNumber,
  email,
  accessToken
) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('franchise_category', listingType)

  formData.append('email', email)
  formData.append('phone', phoneNumber)
  formData.append('location_visibitiy', locationVisibitiy)

  formData.append('location', JSON.stringify(location))
  const response = await fetch(`${baseURL}/franchises`, {
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
export const updatefranchiseFirstStep = async (
  location,
  // country,
  // state,
  // city,
  // streetAddress,
  locationVisibitiy,
  title,
  listingType,
  // zipCode,
  phoneNumber,
  email,
  accessToken,
  franchiseID,
  financing,
  listingStatus
) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('status', listingStatus)
  formData.append('franchise_category', listingType)
  formData.append('finance', financing)
  // formData.append('zip', zipCode)
  formData.append('email', email)
  formData.append('phone', phoneNumber)
  formData.append('location_visibitiy', locationVisibitiy)
  // formData.append('country', country)
  // formData.append('state', state)
  // formData.append('city', city)
  // formData.append('street_address', streetAddress)
  formData.append('location', JSON.stringify(location))
  const response = await fetch(`${baseURL}/franchises/${franchiseID}?_method=put`, {
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
export const updatefranchiseSecondStep = async (plane, accessToken) => {
  let formData = new FormData()
  formData.append('plane', plane)

  const response = await fetch(`${baseURL}/franchises`, {
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
export const updatefranchiseThirdStep = async (
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
  formData.append('phone', phoneNumber)
  formData.append('location_visibitiy', locationVisibitiy)
  formData.append('country', country)
  formData.append('state', state)
  formData.append('city', city)
  formData.append('street_address', streetAddress)

  const response = await fetch(`${baseURL}/franchises`, {
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
export const updatefranchiseFourthStep = async (
  // realEstateValue,
  price,
  franchiseSince,
  franchiseID,
  totalInvesment,
  minfranchiseFee,
  royaltyFee,
  AddFundFee,
  totalFranchiseUnit,

  corporateHeadquater,
  ceoName,
  accessToken,
  netWorth,
  franchiseOverview,
  history,
  idealCandidate,
  trainingSupport,
  whyChoose,
  aboutFranchise,
  shortDescription,
  financing,
  listingStatus
) => {
  let formData = new FormData()
  formData.append('cash_required', price)
  formData.append('finance', financing)
  formData.append('status', listingStatus)
  formData.append('short_description', shortDescription)
  formData.append('total_investment', totalInvesment)
  formData.append('min_frenchise_fee', minfranchiseFee)
  formData.append('royalty_fee', royaltyFee)
  formData.append('ad_fund_fee', AddFundFee)
  formData.append('total_frenchise_units', totalFranchiseUnit)
  formData.append('frenchise_since', franchiseSince)
  formData.append('about', aboutFranchise)
  formData.append('corporate_headquarter', corporateHeadquater)
  formData.append('ceo_name', ceoName)
  formData.append('why_choose', whyChoose)
  formData.append('training_support', trainingSupport)
  formData.append('ideal_candidate', idealCandidate)
  formData.append('history', history)
  formData.append('franchise_overview', JSON.stringify(franchiseOverview))
  formData.append('net_worth_required', netWorth)

  const response = await fetch(`${baseURL}/franchises/${franchiseID}?_method=put`, {
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
export const updatefranchiseFifthStep = async (images, franchiseID, accessToken, listingStatus) => {
  let formData = new FormData()
  images.map((item) => {
    // console.log(franchiseID);
    formData.append('slider_images[]', item)
  })
  formData.append('status', listingStatus)

  const response = await fetch(`${baseURL}/franchises/slider-images/${franchiseID}`, {
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
export const getSinglefranchises = async (accessToken, franchiseID) => {
  const response = await fetch(`${baseURL}/franchises/${franchiseID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const finalUploadStep = async (franchiseID, listingStatus, accessToken) => {
  let formData = new FormData()
  formData.append('status', 'active')
  formData.append('finance', listingStatus)
  const response = await fetch(`${baseURL}/franchises/${franchiseID}?_method=put`, {
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
export const getAllfranchisesListings = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/franchises?page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const deletefranchisesListing = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/franchises/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const deleteFranchisesImages = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/franchises/slider-image/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
