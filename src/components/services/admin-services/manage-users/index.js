import {baseURL} from '../../BaseURL'
export const getUsers = async (accessToken, page, search, fromDate, toDate, address, role) => {
  const response = await fetch(`${baseURL}/users/getusers?page=${page}`, {
    body: JSON.stringify({
      search: search,
      location: address,
      role: role,
      from: fromDate,
      to: toDate,
    }),
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

export const getBrokers = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/users/get-all-brokers?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const createUser = async (
  userName,
  firstName,
  lastName,
  phone,
  password,
  status,
  email,
  accessToken
) => {
  let formData = new FormData()
  formData.append('username', userName)
  formData.append('email', email)
  formData.append('first_name', firstName)
  formData.append('last_name', lastName)
  formData.append('password', password)
  formData.append('phone', phone)
  formData.append('status', status)

  const response = await fetch(`${baseURL}/users/addusers`, {
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

export const deleteUser = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/users/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const updateUser = async (
  id,
  userName,
  firstName,
  lastName,
  phone,
  password,
  status,
  email,
  accessToken
) => {
  let formData = new FormData()
  formData.append('username', userName)
  formData.append('email', email)
  formData.append('first_name', firstName)
  formData.append('last_name', lastName)
  if (password) {
    formData.append('password', password)
  }
  formData.append('phone', phone)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/users/update/${id}`, {
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
export const updateStatus = async (id, status, accessToken) => {
  let formData = new FormData()
  formData.append('status', status)
  const response = await fetch(`${baseURL}/users/update/${id}`, {
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
