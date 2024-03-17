import React from 'react'
import {Link} from 'react-router-dom'
import '../../../components/BuyBizzOwner.css'

const MyValuationReports = () => {
  return (
    <div className='dashboard-bg py-0' style={{ backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
      <div className=' container p-10'>
        <div className='row bg-white rounded p-5'>
          <h3 className='my-3 bizOwner-email-guide-to-buying'>My Valuation Reports</h3>
          <p className='bizOwner-email-guide-to-buying-para'>
            You have not purchased any Valuation Reports.
          </p>
          <div>
            <Link to='/business-valuation-report' className='btn btn-primary'>
              Purchase a valuation Report
            </Link>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}

export default MyValuationReports
