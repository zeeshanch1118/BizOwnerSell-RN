import React, {useState} from 'react'
import Axios from 'axios'
import {baseURL} from '../BaseURL'

export const registerUser = async (Email, Firstname, Lastname, Password, username, number) => {
  try {
    const response = await fetch(
      `${baseURL}/register`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
          phone: number,
          username: username,
          first_name: Firstname,
          last_name: Lastname,
        }),
      }
    )
    const result = await response.json()

    return result
  } catch (e) {
    throw e
  }
}
export const getAgentData = async (id) => {
  try {
    const response = await fetch(
      `${baseURL}/agent/single-agent/${id}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const result = await response.json()

    return result
  } catch (e) {
    throw e
  }
}

// export const registerUser =async (
//     Email,
//     Firstname,
//     Lastname,
//     Password,
//     ) => {

//     const result = Axios.post(`${baseURL}/register`, {
//         email: Email,
//         password: Password,
//         phone:'00999009977',
//         username:'shafi',
//         first_name: Firstname,
//         last_name: Lastname,

//     }).then((response) => {
//         if (response.status === 200) {
//             return true;

//         } else {
//             return false;
//         }
//     }).catch((err) => {
//         const error = err.response.data.errors;
//         // if (error.username && error.email) {
//         //     return "Email and Username has already been taken";
//         // } else if (error.username) {
//         //     return error.username[0];
//         // } else if (error.email) {
//         //     return error.email[0];
//         // }
//         return error;
//     });
//     return result;
// }
export const loginUser = async (Email, Password) => {
  try {
    const response = await fetch(
      `${baseURL}/login`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email_username: Email,
          password: Password,
        }),
      }
    )
    const result = await response.json()

    return result
  } catch (e) {
    throw e
  }
}
export const forgotPasswordRequest = async (email) => {
  try {
    const result = await Axios.post(`${baseURL}/forget_password`, {
      email: email,

      headers: {
        'content-type': 'application/json',
      },
    })

    return result
  } catch (err) {
    const error = err.response.data.message
    throw error
  }
}

export const changePasswordRequest = async (code, email, password, confirmPassword) => {
  try {
    const response = await fetch(
      `${baseURL}/reset_password`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          token: code,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }),
      }
    )
    const result = await response.json()

    return result
  } catch (e) {
    throw e
  }
}

export const logOutUser = async (accessToken) => {
  try {
    const response = await fetch(`${baseURL}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })

    const result = await response.json()
    return result
  } catch (e) {
    throw e
  }
}

// broker

export const registerBrokerStep1 = async (
  userName,
  first_name,
  last_name,
  email,
  company_name,
  password,
  phone,
  image,
  location
) => {
  let formData = new FormData()
  formData.append('username', userName)
  formData.append('first_name', first_name)
  formData.append('last_name', last_name)
  formData.append('email', email)
  formData.append('company_name', company_name)
  formData.append('password', password)
  formData.append('phone', phone)
  if (image != undefined) {
    formData.append('media', image)
  }
  formData.append('location', JSON.stringify(location))

  const response = await fetch(`${baseURL}/broker/step-1`, {
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
