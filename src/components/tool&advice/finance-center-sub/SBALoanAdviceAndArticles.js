import React from 'react'
import {Link} from 'react-router-dom'
const SBALoanAdviceAndArticles = () => {
  return (
    <>
      <h2 className='fs-1 border-bottom'>Featured SBA Loan Advice and Articles</h2>
      <div className='row'>
        <div className='col-md-6'>
          <p className='lead border-bottom'>
            <Link to='/covid-19-resources'>
              PPP Loan Guidance to Lenders a Positive for Sellers, Buyers and Business Brokers.
              Effective Immediately.
            </Link>
          </p>
          <p className='lead border-bottom'>
            <Link to='#'>Is there a Boom for Business Buyers within this Gloom?</Link>
          </p>
          <p className='lead border-bottom'>
            <Link to='#'>Is there a Boom for Business Buyers within this Gloom?</Link>
          </p>
          <p className='lead border-bottom'>
            <Link to='#'>Frequently Asked Questions about SBA Loans</Link>
          </p>
          <p className='lead border-bottom'>
            <Link to='#'>What is the best SBA lender?</Link>
          </p>
        </div>
        <div className='col-md-6'>
          <p className='lead border-bottom'>
            <Link to='#'>
              The CARES Act May Allow You to Buy a Business for Effectively No Money Out of Pocket
            </Link>
          </p>
          <p className='lead border-bottom'>
            <Link to='#'>Top 5 Requirements for a Successful SBA Business Acquisition Loan</Link>
          </p>
          <p className='lead border-bottom'>
            <Link to='#'>SBA Loan Approval Myths</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SBALoanAdviceAndArticles
