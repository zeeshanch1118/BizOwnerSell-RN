import React, {useState} from 'react'
import finance from '../../../assets/media/finance/yoursba-com-logo-original-horizontal.png'
import credit from '../../../assets/images/icon-credit-check.svg'
import coin from '../../../assets/images/icon-coin-fee.svg'
import bank from '../../../assets/images/icon-bank.svg'
import {Link, useNavigate} from 'react-router-dom'
import SBALoanAdviceAndArticles from './SBALoanAdviceAndArticles'
import FinanceCenterHeader from '../FinanceCenterHeader'
const YoursSba = () => {
  const [toggle, setToggle] = useState(true)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [primaryLoanPurpose, setPrimaryLoanPurpose] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [creditScore, setCreditScore] = useState('')
  const [timeFrame, setTimeFrame] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const saveDataHandler = () => {
    setToggle(false)
    console.log(fullName)
    console.log(email)
    console.log(phone)
    console.log(zipCode)
    console.log(primaryLoanPurpose)
    console.log(loanAmount)
    console.log(creditScore)
    console.log(timeFrame)
    console.log(message)
  }
  return (
    <>
      <div className='container-fluid px-0'>
        <FinanceCenterHeader name='SBA Loan Solutions' />

        {/* <div className='bg-info mb-20 container-fluid px-0'>
        <div className='container py-5 '>
          <p className='fs-3'>
            <Link to='/finance-center' className=' text-light'>
              Finance Center
            </Link>
            <h1 className='text-light '>SBA Loan Solutions</h1>
          </p>
        </div>
      </div> */}
        <div className='container'>
          <div className='row mt-20'>
            <div className='col-lg-7 col-12'>
              <h1 className='fs-1 fw-normal'>SBA Business Acquisition Loans from $350K to $5M</h1>
              <img src={finance} alt='' className='img-fluid w-50 py-5' />
              <p className='fs-2 lead'>
                Once you've found a business and need to secure financing, use the form to have top
                SBA lenders compete to give you the lowest interest rate, best loan terms and
                highest loan amount.
              </p>
              <p className='fs-2 lead'>
                Each lender is different but YourSBA's innovative lending platform matches you to
                the best SBA lender for your project with:
              </p>
              <ul className='fs-2 lead'>
                <li>No Fees or Credit Check</li>
                <li>No Bank Runaround</li>
                <li>5x Success Rate of Direct-to-Bank</li>
              </ul>
              <p className='fs-2 lead'>
                <b>Ready to finance your business purchase?</b> If so, complete the form to get
                pre-qualified today!
              </p>
              <div className='row text-center pt-10'>
                <div className='col-4'>
                  <h2 className='text-primary fw-bold pb-3'>Best Loan Terms</h2>
                  <img src={credit} alt='' />
                </div>
                <div className='col-4'>
                  <h2 className='text-primary fw-bold pb-3'>No Bank Runaround</h2>
                  <img src={bank} alt='' />
                </div>
                <div className='col-4'>
                  <h2 className='text-primary fw-bold pb-3'>5x the Success</h2>
                  <img src={coin} alt='' />
                </div>
              </div>
            </div>
            <div className='offset-md-1 col-4 d-none d-lg-block'>
              <div className='card border-primary border'>
                <div className='card-header bg-primary text-center pt-3'>
                  <h1 className='text-light fs-1'>Found a Business? Get prequalified here.</h1>
                </div>
                {toggle && (
                  <div className='card-body'>
                    <h5 className='card-title'>
                      COVID-19 Update: Our lenders are active and lending. Good credit with a
                      minimum of $70,000 cash required.
                    </h5>

                    <input
                      type='text'
                      className='form-control form-control-solid my-3'
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder='Full Name'
                    />
                    <input
                      type='email'
                      className='form-control form-control-solid mb-3'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email'
                    />
                    <input
                      type='number'
                      className='form-control form-control-solid mb-3'
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Phone Number'
                    />
                    <input
                      type='number'
                      className='form-control form-control-solid mb-3'
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder='Zip Code'
                    />
                    <select
                      className='form-select form-select-solid mb-3'
                      onChange={(e) => setPrimaryLoanPurpose(e.target.value)}
                      defaultValue={primaryLoanPurpose}
                      aria-label='Select example'
                    >
                      <option value disabled selected hidden>
                        Primary Loan Purpose
                      </option>
                      <option>Buy Existing Business</option>
                      <option>Partner or Employee Buyout</option>
                      <option>Working Capital/Business Expansion</option>
                      <option>Debt Refinance</option>
                      <option>Commercial Real Estate</option>
                    </select>
                    <select
                      className='form-select form-select-solid mb-3'
                      onChange={(e) => setLoanAmount(e.target.value)}
                      defaultValue={loanAmount}
                      aria-label='Select example'
                    >
                      <option disabled selected hidden>
                        Loan Amount
                      </option>
                      <option>$2 million to $5 million</option>
                      <option>$1 million to $2 million</option>
                      <option>$350K to $1 million</option>
                      <option>$150K to $350K</option>
                    </select>
                    <select
                      className='form-select form-select-solid mb-3'
                      onChange={(e) => setCreditScore(e.target.value)}
                      defaultValue={creditScore}
                      aria-label='Select example'
                    >
                      <option value disabled selected hidden>
                        Your Credit Score
                      </option>
                      <option>Don't Know</option>
                      <option>Excellent (750-850)</option>
                      <option>Good (700-749)</option>
                      <option>Fair (650-699)</option>
                      <option>Poor (550-649)</option>
                      <option>Terrible (350-549)</option>
                    </select>
                    <select
                      className='form-select form-select-solid mb-3'
                      onChange={(e) => setTimeFrame(e.target.value)}
                      defaultValue={timeFrame}
                      aria-label='Select example'
                    >
                      <option value disabled selected hidden>
                        Timeframe
                      </option>
                      <option>Now</option>
                      <option>1 to 3 months</option>
                      <option>3 to 6 months</option>
                      <option>6 to 12 months</option>
                      <option>More than a year</option>
                    </select>
                    <textarea
                      className='form-control form-control-solid mb-3'
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder='Project Description'
                    />

                    <Link to='#' className='btn btn-primary mb-3' onClick={saveDataHandler}>
                      Get Prequalified today!
                    </Link>
                    <p className='text-center'>
                      By clicking the button, you agree to BizOwnerSell’s{' '}
                      <Link to='/terms-of-use'>Terms of Use</Link>
                      and <Link to='/privacy-notice'>Privacy Notice</Link>
                    </p>
                  </div>
                )}
                {!toggle && (
                  <div className='card-body'>
                    <h6 className='card-title'>Your request to get prequalified has been sent.</h6>
                    <p>
                      Thank you for expressing interest in buying your business or franchise with
                      finance solutions provided by:
                    </p>
                    <h5>YourSBA.com</h5>
                    <p>The provider should contact your within a few days.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-secondary my-20 py-10'>
          <div className='container'>
            <h1 className=' text-primary  fs-1 fw-normal'>Why YourSBA</h1>
            <p className='lead'>
              When you work with us, you’re closer to the top SBA credit decision makers than if
              you’re standing in the lobby of your very own bank. We’re proud of our reviews and
              referrals from existing clients and business brokers.
            </p>
          </div>
        </div>
      </div>
      <div className='container'>
        <SBALoanAdviceAndArticles />
        <button
          className='btn btn-info'
          onClick={() => {
            navigate('/finance-center')
          }}
        >
          Back to Finance Center
        </button>
      </div>
    </>
  )
}

export default YoursSba
