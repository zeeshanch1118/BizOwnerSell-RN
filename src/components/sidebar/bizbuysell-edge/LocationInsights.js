import React from 'react'

const LocationInsights = () => {
  return (
    <div className='dashboard-bg py-0' style={{ backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
      <div className='container p-10 '>
        <div className='row bg-white p-5 rounded'>
          <h2 className='fs-1 fw-normal  pb-4'>Location Insights</h2>
          <h5 className='my-2 fs-2 pb-1 fw-normal'>County Info required</h5>
          <p className='fs-5'>to view location insight please Update your Edge Profile</p>
          <div>
            <button className='btn btn-primary'>Update My Edge Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationInsights
