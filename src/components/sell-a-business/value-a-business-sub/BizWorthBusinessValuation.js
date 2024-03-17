import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './BizWorthBusinessValuation.css'
const BizWorthBusinessValuation = () => {
  const [zipCode, setZipCode] = useState('')
  const [businessCategory, setBusinessCategory] = useState('')
  const [annualRevenue, setAnnualRevenue] = useState('')
  const [annualCashFlow, setAnnualCashFlow] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [role, setRole] = useState('')
  const [timeframeForSale, setTimeframeForSale] = useState('')
  const [newsLetter, setNewsLetter] = useState('')

  const saveDataHandler = () => {}
  return (
    <div className='container my-10 '>
      <div className='row justify-content-center bg-secondary mx-20'>
        <h1 className='fs-1 pt-15 col-8'>What's your business worth?</h1>
      </div>
      <div className='row justify-content-center  bg-secondary mx-20 py-4'>
        <div className='col-lg-5 col-md-8 '>
          <p className='py-5'>
            Already have an account? <Link to='#'>Sign in here</Link>
          </p>
          {/*end::Input group*/}
          {/*begin::Input group*/}
          <div className='row'>
            <div className='col-md-12 border-2 border_end'>
              <select
                className='form-select mb-4'
                aria-label='Select example'
                onChange={(e) => setBusinessCategory(e.target.value)}
                defaultValue={businessCategory}
              >
                <option selected disabled hidden>
                  Business Category
                </option>
                <option disabled>Agriculture</option>
                <option>- Green Houses</option>
                <option>- Tree Forms and Orchards</option>
                <option>- Other</option>
                <option disabled>Automotive and Boat </option>
                <option>- Car Dealerships</option>
                <option>- Car Wash</option>
                <option>- Other</option>
              </select>

              {/*end::Input group*/}
              {/*begin::Input group*/}
              <div className='form-floating mb-4'>
                <input
                  type='text'
                  className='form-control is-invalid '
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder='ZipCode'
                />
                <label htmlFor='floatingInput'>Zip Code</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='text'
                  className='form-control fw-bold  is-valid'
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                  placeholder='Annual Revenue'
                />
                <label htmlFor='floatingInput'>Annual Revenue</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='text'
                  className='form-control fw-bold'
                  onChange={(e) => setAnnualCashFlow(e.target.value)}
                  placeholder='Annual Cash Flow'
                />
                <label htmlFor='floatingInput'>Annual Cash Flow</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='text'
                  className='form-control fw-bold'
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='First Name'
                />
                <label htmlFor='floatingInput'>First Name</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='text'
                  className='form-control fw-bold'
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Last Name'
                />
                <label htmlFor='floatingInput'>Last Name</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='email'
                  className='form-control '
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                />
                <label htmlFor='floatingInput'>Email Address</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='password'
                  className='form-control '
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
                <label htmlFor='floatingInput'>Password</label>
              </div>
              <div className='form-floating mb-4'>
                <input
                  type='number'
                  className='form-control '
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder='Phone Number'
                />
                <label htmlFor='floatingInput'>Phone Number</label>
              </div>
              <select
                className='form-select mb-4'
                aria-label='Select example'
                onChange={(e) => setRole(e.target.value)}
                defaultValue={role}
              >
                <option selected disabled hidden>
                  Role
                </option>
                <option>Business owner</option>
                <option>Investor</option>
                <option>Other</option>
              </select>
              <select
                className='form-select mb-4'
                aria-label='Select example'
                onChange={(e) => setTimeframeForSale(e.target.value)}
                defaultValue={timeframeForSale}
              >
                <option selected disabled hidden>
                  Timeframe for sale
                </option>
                <option>Now!</option>
                <option>0-3 month</option>
              </select>

              <div className='form-check form-check-custom form-check-solid mb-5'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  defaultValue
                  id='flexCheckDefault'
                  onChange={(e) => setNewsLetter(e.target.checked)}
                />
                <label className='form-check-label ' htmlFor='flexCheckDefault'>
                  Yes, send me the Seller Newsletter
                </label>
              </div>

              <Link to='#' className='btn btn-primary mt-5' onClick={saveDataHandler}>
                See your estimate
              </Link>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-8 mt-5'>
          <div className='py-5 text-end'>
            <img
              src='https://www.bizbuysell.com/xcommon/images/marketing/valuation/BizWorthLogo.svg'
              alt=''
              className=' w-75 img-fluid p-2'
            />
          </div>
          <div className=' rounded' style={{backgroundColor: '#dcf0f8'}}>
            <p className='p-5'>
              Get an instant estimate of the value of your business based on your geographic area,
              standard cash-flow multiples, and our extensive inventory of comps and active
              listings.
            </p>
          </div>
        </div>
        <p className='text-center mt-5'>
          By clicking the button, you agree to{' '}
          <Link to='/terms-of-use'>BizBuySell's Terms of Use</Link> and
          <Link to='/privacy-notice'> Privacy Notice</Link>
        </p>
      </div>
    </div>
  )
}

export default BizWorthBusinessValuation
