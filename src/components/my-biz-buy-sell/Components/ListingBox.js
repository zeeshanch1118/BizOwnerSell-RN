import React from 'react'
import '../dashboard.css'

const ListingBox = (props) => {
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
      <div className='listing-box my-3 px-4  w-100'>
        <div className='row h-100'>
          <div className='col-md-8 my-auto'>
            <span className='listing-inner-heading  d-md-flex align-items-center'>
              {props.title ?? ''}
            </span>
          </div>
          <div className='col-md-4 my-md-auto'>
            <span className=' d-md-flex align-items-center text-primary listing-box-number'>
              {numFormatter(props.number)}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingBox
