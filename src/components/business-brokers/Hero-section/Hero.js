import React from 'react'
import {Link} from 'react-router-dom'
import forSaleIcon from '../../../assets/broker-icons/for-sale.svg'
import openIcon from '../../../assets/broker-icons/open.svg'
import SuccessfulDeal from '../../../assets/broker-icons/Successful-deal.svg'
import './style.css'
function Hero() {
  return (
    <>
      <div className='container biz-owner-buy-a-business-components-broker mb-4  p-4'>
        <div className='row'>
          <div className='col-sm-3 d-flex justify-content-center'>
            <img src={forSaleIcon} alt='' className='img-fluid biz-owner-image-broker-icon' />
          </div>
          <div className='mt-5 mt-md-0  pe-5 text-wrap  col-sm-9 d-flex flex-column justify-content-between'>
            <span className='pb-4'>
              <h1 className=' biz-owner-heading py-0 my-0 mb-md-0 mb-3 me-0 text-wrap align-top'>
                For Business Sellers
              </h1>

              <span className='d-flex biz-owner-business-paragraph  pt-sm-6 pe-sm-8 '>
                Business brokers can help you properly determine the sales price of your business,
                attract qualified prospects, and get exposure in your community.
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className='container biz-owner-buy-a-business-components-broker my-4 p-4'>
        <div className='row'>
          <div className='col-sm-3 d-flex justify-content-center'>
            <img src={openIcon} alt='' className='img-fluid biz-owner-image-broker-icon' />
          </div>
          <div className='mt-5 mt-md-0  pe-5 text-wrap  col-sm-9 d-flex flex-column justify-content-between'>
            <span className='pb-4'>
              <h1 className=' biz-owner-heading py-0 my-0 mb-md-0 mb-3 me-0 text-wrap align-top'>
                For Business Buyers
              </h1>

              <span className='d-flex biz-owner-business-paragraph  pt-sm-6 pe-sm-8 '>
                Backed with the experience of helping buyers and sellers, a business broker can be
                the rational voice in your business purchase decision.
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className='container biz-owner-buy-a-business-components-broker my-4 p-4'>
        <div className='row'>
          <div className='col-sm-3 d-flex justify-content-center'>
            <img src={SuccessfulDeal} alt='' className='img-fluid biz-owner-image-broker-icon' />
          </div>
          <div className='mt-5 mt-md-0 pe-5 text-wrap  col-sm-9 d-flex flex-column justify-content-between'>
            <span className='pb-4'>
              <h1 className=' biz-owner-heading py-0 my-0 mb-md-0 mb-3 me-0 text-wrap align-top'>
                For a Successful Deal
              </h1>

              <span className='d-flex biz-owner-business-paragraph  pt-sm-6 pe-sm-8 '>
                With their extended network of business resources and contacts, brokers provide
                valuable support for every step of the business sales process.
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
