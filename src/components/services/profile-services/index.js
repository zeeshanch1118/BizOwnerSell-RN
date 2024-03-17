import {baseURL} from '../BaseURL'

export const profileOverView = async (accessToken) => {
  const response = await fetch(`${baseURL}/get-current-user`, {
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
///////////////////////////broker///////////////////////
export const deleteImage = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/broker/delete-profile-step-fifit-images/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const brokerProfileOverView = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/get-profile-step-1`, {
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
export const getMembers = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/membership`, {
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
export const getCertification = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/certification`, {
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

export const deleteCertification = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/broker/certification/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const deleteMember = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/broker/membership/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const brokerSubscription = async (accessToken) => {
  const response = await fetch(`${baseURL}/subscription/single-broker-subscription`, {
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

export const unsubscriptionPackage = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/subscription/cancel/${id}`, {
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

export const addCertificationShipDB = async (accessToken, cardLogo, certificationDescription) => {
  let formData = new FormData()
  formData.append('image', cardLogo)
  formData.append('description', certificationDescription)

  const response = await fetch(`${baseURL}/broker/certification`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()

  return result
}
export const addMemberShipDB = async (accessToken, memberShipProfile, membershipDescription) => {
  let formData = new FormData()
  formData.append('image', memberShipProfile)
  formData.append('description', membershipDescription)

  const response = await fetch(`${baseURL}/broker/membership`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()

  return result
}
export const updateBrokerProfileOverView = async (
  id,
  accessToken,
  firstName,
  lastName,
  email,
  companyName,
  phone,
  imagesForDB,
  locationAdd
) => {
  let formData = new FormData()
  formData.append('first_name', firstName)
  formData.append('last_name', lastName)
  formData.append('email', email)
  formData.append('company_name', companyName)
  formData.append('phone', phone)
  if (imagesForDB) {
    formData.append('media', imagesForDB)
  }

  formData.append('location', JSON.stringify(locationAdd))
  const response = await fetch(`${baseURL}/broker/update-profile-step-1/${id}`, {
    body: formData,
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  console.log('result', result)
  return result
}
export const updateBrokerDetailInfo = async (
  accessToken,
  websiteLinks,
  countries,
  aboutCompany,
  aboutPersonal,
  servicesOffered,
  affiliations,
  tags,
  ref,
  affiliate,
  licensedArray,
  transworldArray
) => {
  let formData = new FormData()
  formData.append('link', websiteLinks)
  formData.append('reference_links', JSON.stringify(ref))
  formData.append('about_personal', aboutPersonal)
  formData.append('about_company', aboutCompany)
  formData.append('service_offered', servicesOffered)
  formData.append('affiliations', affiliations)
  formData.append('tags', tags)
  formData.append('countries', JSON.stringify(countries))
  formData.append('affiliate_links', JSON.stringify(affiliate))
  formData.append('licenses', JSON.stringify(licensedArray))
  formData.append('trans_world_businesses', JSON.stringify(transworldArray))

  // formData.append('location', JSON.stringify(locationAdd))
  const response = await fetch(`${baseURL}/broker/update-profile-step-4`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()

  return result
}
export const updateBrokerProfileOverView5 = async (images, accessToken) => {
  let formData = new FormData()
  images.map((item) => {
    formData.append('media[]', item)
  })
  const response = await fetch(`${baseURL}/broker/update-profile-step-5`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const brokerDetailInformation = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/get-profile-step-4`, {
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
export const brokerCompanyImage = async (accessToken) => {
  const response = await fetch(`${baseURL}/broker/get-profile-step-5`, {
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
export const getProfileDetails = async (accessToken) => {
  const response = await fetch(`${baseURL}/franchises`, {
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
export const profileListings = async (accessToken) => {
  const response = await fetch(`${baseURL}/get-listing-details`, {
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
export const updateProfile = async (
  firstName,
  lastName,
  PhoneNo,
  locationValue,
  language,
  currency,
  email,
  userName,
  selectedImages,
  accessToken,
  userID,
  password
) => {
  let formData = new FormData()
  formData.append('first_name', firstName)
  formData.append('last_name', lastName)
  formData.append('phone', PhoneNo)

  if (locationValue) {
    formData.append('location', JSON.stringify(locationValue))
  }
  formData.append('language', language)
  formData.append('currency', currency)
  formData.append('email', email)
  formData.append('username', userName)
  if (selectedImages != undefined) {
    formData.append('media', selectedImages)
  }
  if (password) {
    formData.append('password', password)
  }

  const response = await fetch(`${baseURL}/update-current-user/${userID}`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const updateAgent = async (
  firstName,
  lastName,
  PhoneNo,

  email,
  userName,

  userID,
  password
) => {
  let formData = new FormData()
  formData.append('first_name', firstName)
  formData.append('last_name', lastName)
  formData.append('phone', PhoneNo)

  formData.append('email', email)
  formData.append('username', userName)

  if (password) {
    formData.append('password', password)
  }

  const response = await fetch(`${baseURL}/update-agent/${userID}`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      // Authorization: 'Bearer ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
