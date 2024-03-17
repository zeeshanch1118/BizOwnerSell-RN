import {baseURL} from '../../BaseURL'
export const getAllAdd = async (accessToken, page) => {
  // console.log();
  const response = await fetch(`${baseURL}/admin/advertise?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const createAddsImage = async (imageUrl, accessToken, id) => {
  const response = await fetch(`${baseURL}/admin/advertise/${id}`, {
    body: JSON.stringify({
      advertise: imageUrl,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
