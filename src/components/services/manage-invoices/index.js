import {baseURL} from '../BaseURL'
export const getInvoices = async (accessToken, page = '') => {

  let endpoint = `${baseURL}/all-invoice`;
  if (page !== "") {
    endpoint = `${baseURL}/all-invoice/${page}`;
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getUserInvoices = async (token, page) => {
  const response = await fetch(`${baseURL}/user-invoice?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + token,
    },
  })
  const result = await response.json()
  return result
}
export const getBrokerInvoices = async (token, page) => {
  const response = await fetch(`${baseURL}/broker/broker-invoice?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + token,
    },
  })
  const result = await response.json()
  return result
}
