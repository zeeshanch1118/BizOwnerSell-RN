import React from 'react'

const AdminStatistics = (props) => {
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'
    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num < 900) {
      return num
    }
  }
  return (
    <>
      <div className='  col-xl-6 '>
        <div className=' px-5 py-6 total-listing-section border-primary border border-top-0 border-bottom-0 border-right-0 border-left-5'>
          <div className='d-flex justify-content-between pb-1 border border-gray border-top-0 border-left-0 border-right-0 border-bottom-2'>
            <h3 className='mt-1 mb-0'>{props.title}</h3>
            <p className='bg-primary d-inline-block py-1 px-4 rounded mb-0 text-light'>
              {numFormatter(props.total)}
            </p>
          </div>
          <div className='row justify-content-between py-5'>
            <div className='col-md-6 col-12 listing-section-border d-flex justify-content-between '>
              <p className='listing-inner-heading mb-0'>Active</p>
              <p className='listing-numbers text-primary me-7 mb-0'>{numFormatter(props.active)}</p>
            </div>
            <div className='col-md-6 col-12 d-flex justify-content-between '>
              <p className='listing-inner-heading mb-0'>Deactive</p>
              <p className='listing-numbers text-primary me-7 mb-0'>
                {numFormatter(props.deactive)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminStatistics
