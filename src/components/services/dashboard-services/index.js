import {baseURL} from '../BaseURL'
export const getAdminDashboard = async (accessToken) => {
  const response = await fetch(`${baseURL}/dashboard/admin_dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const getUserDashboard = async (accessToken) => {
  const response = await fetch(`${baseURL}/dashboard/user_dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const getBrokerDashboard = async (accessToken) => {
  const response = await fetch(`${baseURL}/dashboard/broker_dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
export const getAgentDashboard = async (accessToken) => {
  const response = await fetch(`${baseURL}/dashboard/agent_dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

