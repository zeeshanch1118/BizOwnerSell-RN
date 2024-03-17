import React from 'react'
import AdminDashBoard from './AdminDashBoard'
import BrokerDashBoard from './BrokerDashBoard'
import UserDashBoard from './UserDashBoard'
import AgentDashBoard from './AgentDashBoard'
const ShowDashBoard = () => {
  const tokenData = localStorage.getItem('userData')
  const transformTokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transformTokenData
  const {role} = transformTokenData
  return (
    <>
      {role == 'broker' && <BrokerDashBoard />}
      {role == 'user' && <UserDashBoard />}
      {role == 'admin' && <AdminDashBoard />}
      {role == 'agent' && <AgentDashBoard />}
    </>
  )
}

export default ShowDashBoard
