import React from 'react'

import {useNavigate, useParams} from 'react-router-dom'

import backIcon from '../../../assets/icons/backIcon.svg'
import locationIcon from '../../../assets/icons/business-location-icon.svg'
import dollar from '../../../assets/icons/dollarIcon.svg'

import soldIcon from '../../../assets/icons/sold-business.svg'

import './Detail.css'
const SoldListingInner = (props) => {
  const navigate = useNavigate()
  const {slug} = useParams()
  const dateFormateHandler = (createdAt) => {
    let today = new Date(createdAt)
    let date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(today)
    return date
  }
  return (
    <>
      <>
        <button
          className='biz-owner-business-detail-back-button mt-4 mb-2 px-0'
          onClick={() => navigate(-1)}
        >
          <span className='text-primary '>
            <img src={backIcon} alt='' />
          </span>
        </button>

        <div className='row '>
          <div className=' px-0  biz-owner-detail-carousel-container biz-owner-box-shadow'>
            <div className='mx-5 mx-md-12 biz-owner-business-detail-container my-5'>
              <h4 className='biz-owner-business-detail-heading mb-0 pb-3 text-wrap'>
                {props?.data[0]?.title ?? 'NaN'}
              </h4>
            </div>
            <div
              id='carouselExampleCaptions'
              className='carousel slide position-relative'
              data-bs-ride='carousel'
            >
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <img
                    src={soldIcon}
                    className='d-block w-100 biz-owner-detail-carousel-img biz-owner-detail-carousel-img-sold'
                    alt='...'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {slug == 'businesses' ? (
          <>
            <div className='row mt-3 biz-owner-detail-container py-7 px-2 px-md-10 biz-owner-box-shadow'>
              <div className='col-md-6   d-flex justify-content-between biz-owner-cash-flow-section'>
                <h3 className='my-auto'>Asking Price</h3>

                <h3 className='biz-owner-detail-price my-auto pe-md-8'>
                  <span className='mx-md-2 '>
                    <img src={dollar} alt='' width={19} className='mb-1' />
                  </span>
                  {props.data[0]?.asking_price ?? 'NaN'}
                </h3>
              </div>
              <div className='col-md-6 d-flex justify-content-between mt-5 mt-md-0 ps-md-5'>
                <h3 className='my-auto'>Cash Flow</h3>
                <h3 className='biz-owner-detail-price my-auto pe-md-8'>
                  <span className='mx-md-2 '>
                    <img src={dollar} alt='' width={19} className='mb-1' />
                  </span>
                  {props.data[0]?.cash_flow ?? 'Nan'}
                </h3>
              </div>
            </div>

            <div className='row mt-3 biz-owner-detail-container biz-owner-box-shadow py-7 py-md-2 px-5 px-md-13 gx-7'>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title '>Sold Date:</p>
                <p className='biz-owner-detail-table-price me-md-8 '>
                  {props.data[0]?.business_sold != null
                    ? dateFormateHandler(props.data[0]?.business_sold?.created_at) ??
                      'NO Date' ??
                      'NaN'
                    : 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title '>Sold Price:</p>
                <p className='biz-owner-detail-table-price me-md-8 '>
                  {props.data[0]?.business_sold != null
                    ? props.data[0]?.business_sold?.price ?? 'NaN'
                    : 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title '>Gross Revenue:</p>
                <p className='biz-owner-detail-table-price me-md-8 '>
                  {props.data[0]?.gross_revenue ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Inventory:</p>
                <p className='biz-owner-detail-table-price me-md-8'>
                  {props.data[0]?.business_meta?.inventory ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>EBITDA:</p>
                <p className='biz-owner-detail-table-price me-md-8'>
                  {props.data[0]?.business_meta?.ebitda ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Lease Expiration:</p>
                <p className='biz-owner-detail-table-price me-md-8'>
                  {props?.data[0]?.business_meta?.lease_expiration ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>FF&E:</p>
                <p className='biz-owner-detail-table-price me-md-8'>
                  {props.data[0]?.business_meta?.ffe ?? 'NaN'}
                </p>
              </div>
              <div className='  col-md-6 ps-0 d-flex justify-content-between'>
                <p className='biz-owner-detail-table-price-title'>Established:</p>
                <p className='biz-owner-detail-table-price me-md-8'>
                  {props.data[0]?.established_at ?? 'NaN'}
                </p>
              </div>
            </div>
          </>
        ) : slug == 'franchise' ? (
          <>
            <div className='row mt-3 biz-owner-detail-container py-7 px-3 px-md-10 '>
              <div className='col-md-6  d-flex justify-content-between biz-owner-cash-flow-section'>
                <h3 className='my-auto'>Price</h3>
                <h3 className='biz-owner-detail-price my-auto pe-md-8'>
                  <span className='mx-md-2 '>
                    <img src={dollar} alt='' width={19} className='mb-1' />
                  </span>
                  {props.data[0]?.cash_required ?? 'NaN'}
                </h3>
              </div>
              <div className='col-md-6 d-flex justify-content-between mt-5 mt-md-0 ps-md-5'>
                <h3 className='my-auto'>Investment</h3>
                <h3 className='biz-owner-detail-price my-auto pe-md-8'>
                  <span className='mx-md-2 '>
                    <img src={dollar} alt='' width={19} className='mb-1' />
                  </span>
                  {props.data[0]?.total_investment ?? 'Nan'}
                </h3>
              </div>
            </div>
            <div className='row mt-3 biz-owner-detail-container py-2 px-5 px-md-13'>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Franchise units:</p>
                <p className='biz-owner-detail-table-price me-md-7'>
                  ${props.data[0]?.total_frenchise_units ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Royalty fee:</p>
                <p className='biz-owner-detail-table-price me-md-7'>
                  ${props.data[0]?.royalty_fee ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Fund fee:</p>
                <p className='biz-owner-detail-table-price me-md-7'>
                  ${props.data[0]?.ad_fund_fee ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Net worth:</p>
                <p className='biz-owner-detail-table-price me-md-7'>
                  ${props.data[0]?.net_worth_required ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Min franchise fee:</p>
                <p className='biz-owner-detail-table-price me-md-7'>
                  ${props.data[0]?.min_frenchise_fee ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title'>Franchise since:</p>
                <p className='biz-owner-detail-table-price me-md-7'>
                  {props.data[0]?.frenchise_since ?? 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title '>Sold Price:</p>
                <p className='biz-owner-detail-table-price me-md-8 '>
                  {props.data[0]?.franchise_sold != null
                    ? props.data[0]?.franchise_sold?.price ?? 'NaN'
                    : 'NaN'}
                </p>
              </div>
              <div className=' col-md-6 ps-0 d-flex justify-content-between '>
                <p className='biz-owner-detail-table-price-title '>Sold Date:</p>
                <p className='biz-owner-detail-table-price me-md-8 '>
                  {props.data[0]?.franchise_sold != null
                    ? dateFormateHandler(props.data[0]?.franchise_sold?.created_at) ??
                      'NO Date' ??
                      'NaN'
                    : 'NaN'}
                </p>
              </div>
            </div>
          </>
        ) : null}

        <div className='row mt-10 biz-owner-business-description mb-5'>
          <div className='card px-5 biz-owner-box-shadow px-md-15'>
            <div className='card-header border-2 px-0 d-block pt-8 my-2 '>
              <h3 className='single-business-heading pb-5 '>Detailed Information</h3>
            </div>

            <div className='py-3 px-0'>
              <div className='row'>
                <div className='col-12  my-3 biz-owner-paragraph '>
                  <div className='d-flex flex-wrap gap-4'>
                    <p>* Included in sold price </p>
                    <p>* Not included in sold price</p>
                  </div>
                  The sale information above has been provided by the business seller or their
                  representative. BisOwnerSell has not independently verified any of this
                  information, and assumes no responsibility for its accuracy or completeness. See
                  BizOwnerSell Terms of Use for more information.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default SoldListingInner
