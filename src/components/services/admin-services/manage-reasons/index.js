import Axios from 'axios'
import {baseURL} from '../../BaseURL'

export const createReasons = async (title, reportType, accessToken) => {
  let formData = new FormData()

  formData.append('title', title)
  formData.append('report_type', reportType)
  const response = await fetch(`${baseURL}/report/add_report_reason`, {
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
export const getReasons = async (accessToken) => {
  const response = await fetch(`${baseURL}/report/get_report_reason`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const updateReason = async (id, title, reportType, accessToken) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('report_type', reportType)
  const response = await fetch(`${baseURL}/report/edit_report_reason/${id}`, {
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
export const deleteReason = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/report/delete_report_reason/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
