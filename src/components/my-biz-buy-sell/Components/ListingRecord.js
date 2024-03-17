import React from 'react'
import '../dashboard.css'

function ListingRecord(props) {
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
      <div className='total-listing-section  px-md-5 mt-5'>
        <div className=' px-5 py-6 '>
          <div className='border border-gray border-top-0 border-left-0 border-right-0 border-bottom-3 '>
            <h3 className=' '>
              <span>
                <img
                  src={props.img}
                  alt=''
                  className={`
                  ${props.imgType == 'total' ? 'listing-icon-total' : null}
                  ${props.imgType == 'active' ? 'listing-icon-active' : null}
                  ${props.imgType == 'deactive' ? 'listing-icon-deactive' : null}
                  `}
                />
              </span>
              {props.title ?? ''}
            </h3>
          </div>
          <div className='row justify-content-between py-5'>
            <div className='col-md-4 col-12 listing-section-border d-flex justify-content-between '>
              <p className='listing-inner-heading mb-0'>Businesses</p>

              <p className='listing-numbers text-primary me-7 mb-0'>
                {numFormatter(props?.businessesValue)}
              </p>
            </div>
            <div className='col-md-4 col-12 listing-section-border d-flex justify-content-between '>
              <p className='listing-inner-heading mb-0'>Franchises</p>
              <p className='listing-numbers text-primary me-7 mb-0'>
                {numFormatter(props?.FranchisesValue)}
              </p>
            </div>
            <div className='col-md-4 col-12 d-flex justify-content-between '>
              <p className='listing-inner-heading mb-0'>Assets</p>
              <p className='listing-numbers text-primary me-7 mb-0'>
                {numFormatter(props?.AssetsValue)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingRecord
