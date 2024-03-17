import {baseURL} from '../BaseURL'

export const postReport = async (
  report_reason,
  reportable_id,
  description,
  full_name,
  email,
  created_by,
  user_id,
  status
) => {
  let formData = new FormData()
  formData.append('report_reason', report_reason)
  formData.append('reportable_id', reportable_id)
  formData.append('description', description)

  formData.append('full_name', full_name)
  formData.append('email', email)
  formData.append('created_by', created_by)
  formData.append('user_id', user_id)
  formData.append('status', status)

  const response = await fetch(`${baseURL}/send_report`, {
    body: formData,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
    },
  })

  const result = await response.json()

  return result
}
export const requestFranchises = async (
  type,
  firstName,
  lastName,
  email,
  phone,
  zipCode,
  capital,
  time,
  location,
  franchisesID
) => {
  const response = await fetch(`${baseURL}/add-franchies-request`, {
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_no: phone,
      zip_code: zipCode,
      capital: capital,
      time_frame: time,
      deserve_locations: location,
      franchise: franchisesID,
      type: type,
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

export const addFavorite = async (accessToken, favorite_able_type, ID, type) => {
  console.log(favorite_able_type, ID, type)
  const response = await fetch(`${baseURL}/add-favorite`, {
    body: JSON.stringify({
      favorite_able_id: ID,
      favorite_able_type: favorite_able_type,
      type: type,
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
export const getReportReason = async () => {
  const response = await fetch(`${baseURL}/get_user_report_reason`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result
}
