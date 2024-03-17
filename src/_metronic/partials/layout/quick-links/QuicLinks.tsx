/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

const QuickLinks: FC = () => (
  // 'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px '
    data-kt-menu='true'
  >
    <div
      className='d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10'
      style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/pattern-1.jpg')}')`}}
    >
      <h3 className='text-white fw-bold mb-3'>Quick Search</h3>
    </div>

    <div className='row g-0'>
      <div className='col-6 menu-item '>
        <Link
          to='/dashboard/my-listings'
          className='d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom'
        >
          <KTSVG
            path='/media/icons/duotune/finance/fin009.svg'
            className='svg-icon-3x svg-icon-primary mb-2'
          />
          <Link to='/dashboard/my-listings' className='fs-5 fw-bold text-gray-800 mb-0'>
            My Listings
          </Link>
        </Link>
      </div>
      <div className='col-6 menu-item'>
        <Link
          to='/dashboard/inbox'
          className='d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end'
        >
          <KTSVG
            path='/media/icons/duotune/communication/com010.svg'
            className='svg-icon-3x svg-icon-primary mb-2'
          />

          <Link to='/dashboard/inbox' className='fs-5 fw-bold text-gray-800 mb-0'>
            My Mailbox
          </Link>
        </Link>
      </div>
      <div className='col-6 menu-item'>
        <Link
          to='/search-franchises'
          className='d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom'
        >
          <KTSVG
            path='/media/icons/duotune/abstract/abs042.svg'
            className='svg-icon-3x svg-icon-primary mb-2'
          />

          <Link to='/search-franchises' className='fs-5 fw-bold text-gray-800 mb-0'>
            All Franchises
          </Link>
        </Link>
      </div>
      <div className='col-6 menu-item'>
        <Link
          to='/search-businesses-for-sale'
          className='d-flex flex-column flex-center h-100 p-6 bg-hover-light'
        >
          <KTSVG
            path='/media/icons/duotune/finance/fin006.svg'
            className='svg-icon-3x svg-icon-primary mb-2'
          />
          <Link to='/search-businesses-for-sale' className='fs-5 fw-bold text-gray-800 mb-0'>
            All Businesses
          </Link>
        </Link>
      </div>
    </div>

    {/* <div className='py-2 text-center border-top'>
      <Link to='#' className='btn btn-color-gray-600 btn-active-color-primary'>
        View All <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
      </Link>
    </div> */}
  </div>
)

export {QuickLinks}
