import React, {useEffect, useState} from 'react'
import ButtonLoader from '../../../../../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../../../../../assets/Loader/MainScreenLoader.gif'

const PaymentDetails = (props) => {
  const [btnLoader, setBtnLoader] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  useEffect(() => {
    setIsContinue(true)
  }, [])
  const paymentDetails = (e) => {
    e.preventDefault()
    setBtnLoader(true)
    props.PaymentDetailsStep()
  }
  const paymentDetailsStepBack = (e) => {
    e.preventDefault()
    props.paymentDetailsStepBack()
  }

  return (
    <>
      {isContinue ? (
        <div className='container'>
          <div className='row  px-md-15 py-7'>
            <div className='col-md-4 my-md-3'>
              <h4>Card Name</h4>
            </div>

            <div className='col-md-8 my-md-3'>X_Y_Z</div>
            <div className='col-md-4 my-md-3'>
              <h4>Card Number</h4>
            </div>

            <div className='col-md-8 my-md-3'>42424242424242424</div>
            <div className='col-md-4 my-md-3'>
              <h4>Expiry Date</h4>
            </div>

            <div className='col-md-8 my-md-3'>10/20</div>
            <div className='col-md-4 my-md-3'>
              <h4>Expiry Date</h4>
            </div>

            <div className='col-md-8 my-md-3'>10/20</div>
            <div className='col-md-4 my-md-3'>
              <h4>XYZ Date</h4>
            </div>

            <div className='col-md-8 my-md-3'>10/20</div>
            <div className='col-md-4 my-md-3'>
              <h4>Paid Amount</h4>
            </div>

            <div className='col-md-8 my-md-3'>100</div>
            <div className='col-md-4 my-md-3'>
              <h4>Payment Status</h4>
            </div>

            <div className='col-md-8 my-md-3'>100</div>
            <div className='col-md-4 my-md-3'>
              <h4>Permissions</h4>
            </div>

            <div className='col-md-6 my-md-3'>
              <li>dsds</li>
              <li>dsds</li>
            </div>
            <div className='col-md-4'>
              <h4>Duration</h4>
            </div>

            <div className='col-md-8'>10 Days</div>

            <div className='col-12 mx-auto d-flex justify-content-between pt-5'>
              <button className='btn btn-primary ' onClick={(e) => paymentDetailsStepBack(e)}>
                Back
              </button>
              <button className='btn btn-primary ' onClick={(e) => paymentDetails(e)}>
                {btnLoader ? (
                  <span className=''>
                    <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
                  </span>
                ) : (
                  <span className=''>Continue</span>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-top' style={{height: '100vh'}}>
          <div>
              <img src={MainScreenLoader} alt="BizOwnerSell" width="80" height="80" />
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentDetails
