import {baseURL} from '../../BaseURL'
export const getLocation = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/locations?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

// export const createCountry = async (country, status, accessToken) => {
//   let formData = new FormData()
//   // formData.append('id', id)
//   formData.append('status', status)
//   formData.append('country', country)
//   console.log(country, status)
//   const response = await fetch(`${baseURL}/add-locations`, {
//     body: formData,
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer ' + accessToken,
//     },
//   })

//   const result = await response.json()
//   return result
// }
export const updateLocationStatus = async (country, status, accessToken) => {
  let formData = new FormData()
  formData.append('status', status)
  formData.append('name', country)
  const response = await fetch(`${baseURL}/block-location-status`, {
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
