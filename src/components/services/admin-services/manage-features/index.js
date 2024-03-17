import {baseURL} from '../../BaseURL'
export const getFeatures = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/feature-packages/get-features?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const createFeatures = async (title, description, status, accessToken) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('status', status)

  const response = await fetch(`${baseURL}/feature-packages/create`, {
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

export const deleteFeature = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/feature-packages/delete-features/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const updateFeatures = async (id, title, description, status, accessToken) => {
  let formData = new FormData()
  formData.append('title', title)
  if (description) {
    formData.append('description', description)
  }
  formData.append('status', status)
  const response = await fetch(`${baseURL}/feature-packages/update-features/${id}`, {
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
