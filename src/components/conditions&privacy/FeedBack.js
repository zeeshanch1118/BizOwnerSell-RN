import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const FeedBack = () => {
  return (
    <React.Fragment>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12'>
            <h1>Contact Us</h1>
            <p>Have a question, problem, or suggestion? We want to hear from you.</p>
            <p>
              Note: If you want more information about a business listed on BizOwnerSell, please go
              directly to that listing and complete the form to Contact the Seller.
            </p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-3'>
            <b>Contact Us</b>
          </div>
          <div className='col-6'>
            <Link to='/contactus'>
              <Button>Click Here</Button>
            </Link>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-3'>
            <b>Telephone</b>
          </div>
          <div className='col-6'>
            <p>
              Customer Success <br />
              (888) 777-9893 <br />
              Franchise Advertising Network <br />
              (844) 495-3091
            </p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-3'>
            <b>Hours</b>
          </div>
          <div className='col-6'>
            <p>Monday - Friday 8am to 5pm, Pacific Time</p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-3'>
            <b>Mail</b>
          </div>
          <div className='col-6'>
            <p>
              BizOwnerSell <br />
              101 California St, 43rd Floor
              <br />
              San Francisco, CA 94111
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FeedBack
