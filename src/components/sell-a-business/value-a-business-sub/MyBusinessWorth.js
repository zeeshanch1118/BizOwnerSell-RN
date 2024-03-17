import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import DC_Logo_D_RGB_LG from '../../../assets/media/small-business-value/DC_Logo_D_RGB_LG.jpg'
import './MyBusinessWorth.css'
const MyBusinessWorth = () => {
  const [toggleSubmit, setToggleSubmit] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [reasonForValuation, setReasonForValuation] = useState('')
  const [website, setWebsite] = useState('')
  const [message, setMessage] = useState('')

  const saveDataHandler = () => {
    setToggle(true)
    setTimeout(function () {
      setToggleSubmit(true)
    }, 3000)
  }

  return (
    <div className='container p-5' style={{backgroundColor: '#f3f3f3'}}>
      <div className='row g-3 justify-content-center m-10'>
        <div className='col-lg-6 col-md-10 bg-white'>
          {!toggleSubmit && (
            <div className='p-5'>
              <div className='py-5 mb-5'>
                <img src={DC_Logo_D_RGB_LG} alt='' className='text-start w-100 px-5' />
              </div>
              <h1 className='fw-normal fs-1'>Discover Why it Pays to Be Precise</h1>
              <p className='fs-3 lead'>Request a one-on-one Valuation Consult</p>
              <div className='mb-5'>
                <label htmlFor='exampleFormControlInput1' className='required form-label fs-5'>
                  Full Name
                </label>
                <input
                  type='text'
                  className='form-control '
                  placeholder='Full Name'
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='exampleFormControlInput1' className='required form-label fs-5'>
                  Phone Number
                </label>
                <input
                  type='number'
                  className='form-control '
                  placeholder='Phone Number'
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='exampleFormControlInput1' className='required form-label fs-5'>
                  Email
                </label>

                <input
                  type='email'
                  className='form-control '
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor='exampleFormControlInput1' className='required form-label fs-5'>
                Reason for Valuation
              </label>
              <select
                className='form-select mb-5'
                aria-label='Select example'
                onChange={(e) => setReasonForValuation(e.target.value)}
                defaultValue={reasonForValuation}
              >
                <option selected hidden>
                  Reason for Valuation
                </option>
                <option>Looking to sell</option>
                <option>Looking to buy</option>
                <option>Benchmarking</option>
              </select>
              <div className='mb-5'>
                <label htmlFor='exampleFormControlInput1' className='form-label fs-5'>
                  Website (optional)
                </label>
                <input
                  type='email'
                  className='form-control '
                  placeholder='Website'
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='exampleFormControlInput1' className='form-label fs-5'>
                  Message To DealCoach (optional)
                </label>
                <textarea
                  className='form-control'
                  placeholder=' Message To DealCoach'
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div>
                {/* <a href="#" className="btn btn-success">Success</a> */}
                {!toggle && (
                  <button
                    type='button'
                    className='btn btn-primary me-10'
                    // id='kt_button_1'
                    onClick={saveDataHandler}
                  >
                    <span className='indicator-label'>Get My DealCoach</span>
                  </button>
                )}
                {toggle && (
                  <button type='button' className='btn btn-primary me-10' id='kt_button_1'>
                    {/* <span className='indicator-progress'> */}
                    Submitting...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    {/* </span> */}
                  </button>
                )}
                {/* <button className='btn btn-success'>Get the DealCoach</button> */}
              </div>
              <div className='mt-7'>
                <p>
                  By clicking the button, you agree to BizOwnerSell’s{' '}
                  <Link to='/terms-of-use'>Terms of Use&nbsp;</Link>
                  and
                  <Link to='/privacy-notice'>&nbsp;Privacy Notice</Link>
                </p>
              </div>
            </div>
          )}
          {toggleSubmit && (
            <div className='p-5'>
              <h1 className='fs-1'>Thank You for Your Request</h1>
              <p>Your information has been sent to DealCoach. </p>
              <p>
                A DealCoach representative will contact you within the next 48 business hours to
                setup a personal consultation.
              </p>
              <p>
                In the meantime, you can get started by providing some information about your
                business which will be needed to provide your estimate of value.
              </p>
              <button className='btn btn-primary'>Get Started</button>
            </div>
          )}
        </div>
        <div className='col-lg-6 col-md-10 right_section_bg_color'>
          <div className='p-5'>
            <iframe
              title='iframe'
              // width='530'
              height='300rem'
              className='w-100'
              src='https://www.youtube.com/embed/davMIM8kuBQ'
            ></iframe>
            <p className='fs-5 fw-bold text-light pt-4'>
              Whether selling your business or evaluating an acquisition, let DealCoach be your
              guide because when it comes to business value, good enough is never enough.
            </p>
            <h1 className='py-3 text-white mt-4 mb-3' style={{fontSize: '30px', fontWeight: '400'}}>
              Why Use DealCoach?
            </h1>
            <ul className='fs-5 lh-3 text-light'>
              <li>Establish true market value to draw competitive offers</li>
              <li>Accurate valuations protect from leaving money on the table</li>
              <li>Benchmark using cost analysis versus industry peers </li>
              <li>DealCoach has 10+ years of M&A valuation experience</li>
              <li>Your DealCoach will guide you and answer any questions</li>
            </ul>
            <h1 className='pt-5 text-light fs-2 fw-normal lh-4'>
              Request a consult and custom quote today.
            </h1>
            <p>
              <i className='text-light fs-6 lead mt-3'>
                DealCoach is our independent partner for business valuations
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBusinessWorth
