import Axios from 'axios'
import {baseURL} from '../../BaseURL'

export const getBusinessReportListing = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/report/business_report_listing?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const updateReportStatus = async (id, status, accessToken) => {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/update_report_status`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //   'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

// ////////////////franchise//////////////////
export const getFranchiseReportListing = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/report/franchise_report_listing?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const updateFranchiseReportStatus = async (id, status, accessToken) => {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('status', status)
  const response = await fetch(`${baseURL}/update_report_status`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //   'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
