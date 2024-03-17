import {baseURL} from '../BaseURL'
/////////////////////Business Section///////////////////////
export const getBusinessesMails = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/businesses/get/business-email?page=${page}`, {
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
export const deleteBusinessesMail = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/businesses/delete/delete-business-email/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
/////////////////////Franchise Section///////////////////////
export const getFranchiseMails = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/franchises/get/franchise-email?page=${page}`, {
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

export const deleteFranchiseMail = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/franchises/delete/delete-franchise-email/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

////////////////////////Broker Mail///////////////////////////

export const getBrokerMails = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/broker/get-broker-contact-us?page=${page}`, {
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

export const deleteBrokerMail = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/broker/delete-broker-contact-us/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
