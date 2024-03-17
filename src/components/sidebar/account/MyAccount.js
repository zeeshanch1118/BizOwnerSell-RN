import React from 'react'
import {Link} from 'react-router-dom'

import ProfilePage from '../profile/ProfilePage'

const MyAccount = () => {
  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row p-5 bg-white rounded'>
            <ProfilePage />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount
