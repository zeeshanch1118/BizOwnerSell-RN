import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import visa from '../../../assets/media/cards/visa.png'
import mastercard from '../../../assets/media/cards/mastercard.png'
import amex from '../../../assets/media/cards/amex.png'
import discover from '../../../assets/media/cards/discover.png'
import cvn from '../../../assets/media/cards/cvn.png'
import './ValRpt.css'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
const ValRpt = () => {
  const [toggle, setToggle] = useState(false)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [ownBusiness, setOwnBusiness] = useState('')
  const [pymentFirstName, setPymentFirstName] = useState('')
  const [pymentLastName, setPymentLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress1, setStreetAddress1] = useState('')
  const [streetAddress2, setStreetAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')
  const [creditCard, setCreditCard] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [securityCode, setSecurityCode] = useState('')
  const [termsOfUse, setTermsOfUse] = useState('')
  const [termsOfUse2, setTermsOfUse2] = useState('')
  const [termsOfUse3, setTermsOfUse3] = useState('')

  const saveDataHandler = () => {
  
  }

  const promoCode = () => {
    setToggle(true)
  }
  return (
    <div className='container'>
      <div className='m-19'>
        <h1 className='fs-1 py-1 text-center fw-bolder '>Purchase Valuation Report</h1>
        <div className='row g-3'>
          <div className='col-md-12 border-bottom'>
            <p className='border-bottom fw-bold fs-2 '>Payment Summary</p>
            <h5 className='d-flex justify-content-between bg-secondary text-black mb-2  px-2 fs-5 mb-0 p-2'>
              <span>Product Description:</span>
              <span>Price</span>
            </h5>
            <h5 className='d-flex justify-content-between fw-normal  px-2 mb-0'>
              <span>
                Valuation Report for Magazines and Newspapers
                <br />
                Includes 30 day access to details of Active and Sold Businesses
              </span>
              <span>$19.95</span>
            </h5>
            <h5 className='d-flex  justify-content-end  px-2'>
              <span className='fs-6 fw-bold px-5'>Total</span>
              <span>$19.95</span>
            </h5>
            <div className='mb-3 row'>
              {!toggle && (
                <Link to='#' className='ms-4' onClick={promoCode}>
                  Have a promo code?
                </Link>
              )}
              {toggle && (
                <div className='mb-3 row'>
                  <label for='inputPassword' className='col-12 col-md-2 col-form-label me-1'>
                    Promo Code
                  </label>
                  <div className='col-12 d-flex col-md-6'>
                    <div>
                      <input type='password' className='form-control ' id='inputPassword' />
                    </div>
                    <div>
                      <button
                        className='btn btn-warning ms-2 mt-0'
                        data-bs-toggle='modal'
                        data-bs-target='#staticBackdrop1'
                      >
                        Apply Code
                      </button>

                      {/* Modal */}
                      <div
                        className='modal fade'
                        id='staticBackdrop1'
                        data-bs-backdrop='static'
                        data-bs-keyboard='false'
                        tabIndex={-1}
                        aria-labelledby='staticBackdropLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h5 className='modal-title' id='staticBackdropLabel'>
                                Purchase Alert
                              </h5>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              />
                            </div>
                            <div className='modal-body'>
                              <p>Invalid promo code.</p>
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-warning'
                                data-bs-dismiss='modal'
                              >
                                Ok
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='col-md-12 border-bottom '>
              <span className=' col-md-12'>
                <span className=' fs-3 pe-2 '>Create your account</span>
                <Link className='border-start px-2' to='/auth/login'>
                  Already have an account? Sign in here.
                </Link>
              </span>
            </div>
            <div className=' col-12'>
              <div className='container'>
                <div className='row mb-4 col-12'>
                  <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                    Full Name
                  </label>
                  <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                    Last Name
                  </label>
                  <div className='col-lg-12'>
                    <div className='row'>
                      <div className='col-lg-6 fv-row'>
                        <input
                          type='text'
                          onChange={(e) => setUserFirstName(e.target.value)}
                          className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                          placeholder='First name'
                        />
                      </div>

                      <div className='col-lg-6 fv-row'>
                        <input
                          type='text'
                          onChange={(e) => setUserLastName(e.target.value)}
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Last name'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mb-12 col-12'>
                  <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                    Email Address
                  </label>
                  <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                    Password
                  </label>
                  <div className='col-lg-12'>
                    <div className='row'>
                      <div className='col-lg-6 fv-row'>
                        <input
                          type='text'
                          onChange={(e) => setUserFirstName(e.target.value)}
                          className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                          placeholder='Password'
                        />
                      </div>

                      <div className='col-lg-6 fv-row'>
                        <input
                          type='text'
                          onChange={(e) => setUserLastName(e.target.value)}
                          className='form-control form-control-lg form-control-solid'
                          placeholder=' Email Address'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className='mb-3 row justify-content-start'> */}
                <div className='row'>
                  <div className='col-lg-6  fv-row'>
                    <div className='col-12'>
                      <select
                        className='form-select form-select-solid form-select-lg fw-bold '
                        aria-label='Default select example'
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option selected> Do you own a business?</option>
                        <option>Yes, I own a business</option>
                        <option>No, I own a business</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className='col-md-12 mt-9'>
              <p className='border-bottom fw-bold fs-1 pb-2' style={{}}>
                Payment Information
              </p>
            </div>
            <div className='row mb-4 col-12'>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>Full Name</label>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>Last Name</label>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      onChange={(e) => setUserFirstName(e.target.value)}
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                    />
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      onChange={(e) => setUserLastName(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Last name'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-4 col-12'>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                {' '}
                Phone Number
              </label>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                Street Address
              </label>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      onChange={(e) => setPhone(e.target.value)}
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Phone Number'
                    />
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      onChange={(e) => setUserLastName(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                      placeholder=' Street Address'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-4 col-12'>
              <label className='col-lg-6 col-form-label '>Optional</label>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>City</label>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      onChange={(e) => setStreetAddress2(e.target.value)}
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Optional'
                    />
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      onChange={(e) => setCity(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                      placeholder=' city'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-4 col-12'>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>Country</label>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                State/Province
              </label>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <select
                      className='form-select form-select-solid form-select-lg fw-bold '
                      aria-label='Default select example'
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option selected> United State</option>
                      <option>Turkey</option>
                      <option>Spain</option>
                      <option>U.A.E</option>
                      <option>United Kingdom</option>
                      <option>Thailand</option>
                      <option>Sweden</option>
                    </select>
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <select
                      className='form-select form-select-solid form-select-lg fw-bold'
                      aria-label='Default select example'
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option selected>Select State</option>
                      <option>Turkey</option>
                      <option>Spain</option>
                      <option>Hawaii</option>
                      <option>lowa</option>
                      <option>Taxes</option>
                      <option>Florida</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-4 col-12'>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                Credit Card Number
              </label>
              <label className='col-lg-6 col-form-label required fw-bolder fs-3'>
                Expiration Date
              </label>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-12 pt-1'>
                    <div className='position-relative'>
                      <input
                        type='number'
                        className='form-control form-control-solid py-3'
                        placeholder='Enter card number'
                        name='creditCard'
                        id='cr_no'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        //   onChange={(e) => billingSubmit(e)}
                        // onChange={(e) => setCreditCardNumber(e.target.value)}
                      />
                      {/* {creditCardValidation ? (
                <div className='biz_owner_input_validation'>Enter card number</div>
              ) : null} */}

                      <div className='position-absolute translate-middle-y top-50 end-0 me-5 pb-3'>
                        <img
                          src={toAbsoluteUrl('/media/svg/card-logos/visa.svg')}
                          alt=''
                          className='h-25px'
                        />
                        <img
                          src={toAbsoluteUrl('/media/svg/card-logos/mastercard.svg')}
                          alt=''
                          className='h-25px'
                        />
                        <img
                          src={toAbsoluteUrl('/media/svg/card-logos/american-express.svg')}
                          alt=''
                          className='h-25px'
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className='col-lg-6 fv-row '> */}
                  <div className='col-6   d-flex'>
                    <select
                      className=' form-select w-75 me-2 form-select-solid form-select-lg fw-bold'
                      aria-label='Default select example'
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option selected>Month</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>12</option>
                    </select>

                    <select
                      className='form-select w-75 form-select form-select-solid form-select-lg fw-bold'
                      aria-label='Default select example'
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option selected>Year</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                      <option>2030</option>
                      <option>2031</option>
                      <option>2032</option>
                    </select>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div>
              <label className='col-lg-6 col-form-label  fw-bolder fs-3'>Security Code</label>
              <div className='row  me-3'>
                <div className='col-lg-6 fv-row'>
                  <input
                    type='text'
                    onChange={(e) => setSecurityCode(e.target.value)}
                    className='form-control form-control-lg form-control-solid'
                  />
                </div>
              </div>
              <div className='col-7 mt-1 mt-2 mb-9'>
                <img src={cvn} alt='' />
                <span className='ms-2'>(3 digits on back. Amex 4 on front)</span>
              </div>
            </div>

            <div className='col-md-8'>
              <p className='border-bottom fs-3 pb-1'>Terms of Use</p>
            </div>
            <p>
              <label type='checked'>
                <input
                  type='checkbox'
                  className='me-3'
                  onChange={(e) => setTermsOfUse(e.target.checked)}
                />
                <span>I have read and agree to BizOwnerSell's</span>
              </label>
              <Link to='#' data-bs-toggle='modal' data-bs-target='#exampleModal11'>
                Terms of Use
              </Link>
              .
              <div>
                <div
                  className='modal fade'
                  id='exampleModal11'
                  tabIndex={-1}
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog modal-dialog-scrollable'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>
                          TERMS OF USE
                        </h5>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        />
                      </div>
                      <div className='modal-body'>
                        Last Modified: June 24, 2017 The submission of information to, and use of,
                        the business listing service ("Service") available through the BizOwnerSell or
                        any other similar website (the "Websites") relating to a business for sale
                        marketplace owned, operated, or powered by CoStar Realty Information, Inc.
                        ("Company") is subject to the following Terms of Use. BY SUBMITTING
                        INFORMATION to, or accessing information from, the Service, YOU, the end
                        user customer ("Customer" or "you") AGREE TO THE FOLLOWING TERMS OF USE and
                        represent and warrant that you have the right, power and authority to agree
                        to and be bound by such terms. These Terms of Use are a legal agreement
                        between Company and you (the "Agreement"). If you do not agree to these
                        Terms of Use, do not submit information to, or access information from, the
                        Service. All questions concerning this Agreement should be directed to:
                        BizOwnerSell General Manager, CoStar Realty Information, Inc., 101 California
                        St, 43rd Floor, San Francisco, CA 94111. Company may update these Terms of
                        Use at any time and without notice.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </p>
            <p>
              <label type='checked'>
                <input
                  type='checkbox'
                  className='me-3'
                  onChange={(e) => setTermsOfUse2(e.target.checked)}
                />
                <span>
                  Yes, send me the SellerNewsletter, which contains advice on selling a business and
                  email only promotions.
                </span>
              </label>
            </p>
            <p>
              <label type='checked'>
                <input
                  type='checkbox'
                  className='me-3'
                  onChange={(e) => setTermsOfUse3(e.target.checked)}
                />
                <span>
                  Yes, send me the Buyer Newsletter for popular businesses, tips & email promotions.
                </span>
              </label>
            </p>
            <div className=' my-4'>
              <Link to={'#'} onClick={saveDataHandler}>
                <div className='text-light d-inline-block bg-primary p-2 px-3 fs-6'>
                  Complete Purchase
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-md-4 '>
          <div className='border p-5'>
            <h2>Is My Information Safe?</h2>
            <p>
              Absolutely. We work very hard to earn and keep your trust. BizOwnerSell will never send
              you spam or sell your personal information. It's all in our
            </p>

            <p>
              <Link to='/privacy-notice'>Privacy Notice</Link> .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValRpt

// import React, {useState} from 'react'
// import {Link} from 'react-router-dom'
// import {BsBoxArrowUpRight} from 'react-icons/bs'
// // import visa from '../../assets/media/cards/visa.png'
// import visa from '../../../assets/media/cards/visa.png'
// import mastercard from '../../../assets/media/cards/mastercard.png'
// import amex from '../../../assets/media/cards/amex.png'
// import discover from '../../../assets/media/cards/discover.png'
// import cvn from '../../../assets/media/cards/cvn.png'
// import '../../buy-a-business/Upgrade.css'
// const ValRpt = () => {
//   // const [options, setOptions] = useState('')
//   const [toggle, setToggle] = useState(false)
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [ownBusiness, setOwnBusiness] = useState('')
//   const [memberShipTerm, setMemberShipTerm] = useState('')
//   const [promoCode, setPromoCode] = useState('')
//   const [purchaseTimeframe, setPurchaseTimeframe] = useState('')
//   const [businessLocation, setBusinessLocation] = useState('')
//   const [paymentFirstName, setPaymentFirstName] = useState('')
//   const [paymentLastName, setPaymentLastName] = useState('')
//   const [paymentPhone, setPaymentPhone] = useState('')
//   const [paymentStreetAddress1, setPaymentStreetAddress1] = useState('')
//   const [paymentStreetAddress2, setPaymentStreetAddress2] = useState('')
//   const [city, setCity] = useState('')
//   const [country, setCountry] = useState('')
//   const [state, setState] = useState('')
//   const [creditCardNumber, setCreditCardNumber] = useState('')
//   const [month, setMonth] = useState('')
//   const [year, setYear] = useState('')
//   const [securityCode, setSecurityCode] = useState('')
//   const [termsOfUse, setTermsOfUse] = useState('')
//   const promoCodeHandler = () => {
//     setToggle(true)
//   }
//   const [agriculture, setAgriculture] = useState('Select a Category')
//   const handleChange = (e) => {
//     const {name, value} = e.target
//     console.log('hgfsahgdfmsahd', name, value)
//     setAgriculture(value)
//   }
//   const BeautyAndPersonals = [
//     {Beauty: 'Hair Salons and Barber Shops'},
//     {Beauty: 'Message'},
//     {Beauty: 'Nail Salons'},
//   ]
//   const buildingConstructions = [
//     {title: 'Building Material and Hardware S...'},
//     {title: 'Concrete'},
//     {title: 'Electrical and Mechanical'},
//     {title: 'Heavy Construction'},
//   ]
//   const CommunicationMedias = [
//     {title: 'Magazines and Newspapers'},
//     {title: 'Production Companies'},
//     {title: 'Other Communication and Media'},
//   ]
//   const EducationChildrens = [
//     {title: 'Day Care and Child Care Centers'},
//     {title: 'Schools'},
//     {title: 'Preschools'},
//     {title: 'Other Education'},
//   ]
//   const EntertainmentRecreations = [
//     {title: 'Art Galleries'},
//     {title: 'Banquet Hall'},
//     {title: 'Bowling Alleys'},
//     {title: 'Casinos'},
//   ]
//   const BeautyAndPersonalCare = BeautyAndPersonals.map((BeautyAndPersonal, index) => (
//     <div
//       className='form-check form-check-custom form-check-solid mb-5'
//       key={index}
//       value={BeautyAndPersonal.Beauty}
//     >
//       <input
//         className='form-check-input'
//         name='radio_input'
//         type='radio'
//         defaultValue={1}
//         value={BeautyAndPersonal.Beauty}
//         onChange={(e) => {
//           handleChange(e)
//         }}
//         id='kt_docs_formvalidation_radio_option_1'
//       />
//       <label
//         className='form-check-label upgrade_label '
//         htmlFor='kt_docs_formvalidation_radio_option_1 '
//       >
//         <div className='fw-bolder text-gray-800 me-3'>{BeautyAndPersonal.Beauty}</div>
//       </label>
//     </div>
//   ))
//   const BuildingAndConstruction = buildingConstructions.map((buildingConstruction, index) => (
//     <div
//       className='form-check form-check-custom form-check-solid mb-5'
//       key={index}
//       value={buildingConstruction.title}
//     >
//       <input
//         className='form-check-input'
//         name='radio_input'
//         type='radio'
//         defaultValue={1}
//         value={buildingConstruction.title}
//         onChange={(e) => {
//           handleChange(e)
//         }}
//         id='kt_docs_formvalidation_radio_option_1'
//       />
//       <label
//         className='upgrade_label form-check-label'
//         htmlFor='kt_docs_formvalidation_radio_option_1 '
//       >
//         <div className='fw-bolder text-gray-800 me-3'>{buildingConstruction.title}</div>
//       </label>
//     </div>
//   ))
//   const CommunicationAndMedia = CommunicationMedias.map((CommunicationMedia, index) => (
//     <div
//       className='form-check form-check-custom form-check-solid mb-5'
//       key={index}
//       value={CommunicationMedia.title}
//     >
//       <input
//         className='form-check-input'
//         name='radio_input'
//         type='radio'
//         value={CommunicationMedia.title}
//         onChange={(e) => {
//           handleChange(e)
//         }}
//         defaultValue={1}
//         id='kt_docs_formvalidation_radio_option_1'
//       />
//       <label
//         className='upgrade_label form-check-label'
//         htmlFor='kt_docs_formvalidation_radio_option_1 '
//       >
//         <div className='fw-bolder text-gray-800 me-3'>{CommunicationMedia.title}</div>
//       </label>
//     </div>
//   ))
//   const EducationAndChildren = EducationChildrens.map((EducationChildren, index) => (
//     <div
//       className='form-check form-check-custom form-check-solid mb-5'
//       key={index}
//       value={EducationChildren.title}
//     >
//       <input
//         className='form-check-input'
//         name='radio_input'
//         type='radio'
//         value={EducationChildren.title}
//         onChange={(e) => {
//           handleChange(e)
//         }}
//         defaultValue={1}
//         id='kt_docs_formvalidation_radio_option_1'
//       />
//       <label
//         className='upgrade_label form-check-label'
//         htmlFor='kt_docs_formvalidation_radio_option_1 '
//       >
//         <div className='fw-bolder text-gray-800 me-3'>{EducationChildren.title}</div>
//       </label>
//     </div>
//   ))
//   const EntertainmentAndRecreation = EntertainmentRecreations.map(
//     (EntertainmentRecreation, index) => (
//       <div
//         className='form-check form-check-custom form-check-solid mb-5'
//         key={index}
//         value={EntertainmentRecreation.title}
//       >
//         <input
//           className='form-check-input'
//           name='radio_input'
//           type='radio'
//           value={EntertainmentRecreation.title}
//           onChange={(e) => {
//             handleChange(e)
//           }}
//           defaultValue={1}
//           id='kt_docs_formvalidation_radio_option_1'
//         />
//         <label
//           className='upgrade_label form-check-label'
//           htmlFor='kt_docs_formvalidation_radio_option_1 '
//         >
//           <div className='fw-bolder text-gray-800 me-3'>{EntertainmentRecreation.title}</div>
//         </label>
//       </div>
//     )
//   )
//   const saveDataHandler = () => {
//     console.log('firstName==>', firstName)
//     console.log('lastName==>', lastName)
//     console.log('email==>', email)
//     console.log('password==>', password)
//     console.log('ownBusiness==>', ownBusiness)
//     console.log('memberShipTerm==>', memberShipTerm)
//     console.log('promoCode==>', promoCode)
//     console.log('purchaseTimeframe==>', purchaseTimeframe)
//     console.log('businessLocation==>', businessLocation)
//     console.log('paymentFirstName==>', paymentFirstName)
//     console.log('paymentLastName==>', paymentLastName)
//     console.log('paymentPhone==>', paymentPhone)
//     console.log('paymentStreetAddress1==>', paymentStreetAddress1)
//     console.log('paymentStreetAddress2==>', paymentStreetAddress2)
//     console.log('city==>', city)
//     console.log('country==>', country)
//     console.log('security code==>', securityCode)
//     console.log('state==>', state)
//     console.log('creditCardNumber==>', creditCardNumber)
//     console.log('month==>', month)
//     console.log('year==>', year)
//     console.log('termsOfUse==>', termsOfUse)
//   }
//   return (
//     <div className='container'>
//       <div className=' lh-3'>
//         <h1 className='py-4 m-0 fw-normal text-black' style={{fontSize: '2.5rem'}}>
//           Sign Up For BizOwnerSell Edge
//         </h1>
//         <div className='pb-3 border-bottom '>
//           <span className=' fs-3 fw-normal pe-2'>Create your account</span>
//           <Link className='border-start px-2' to='/auth/login'>
//             Already have an account? Sign in here.
//           </Link>
//         </div>
//       </div>

//       <div>
//         <div className='my-3 row pt-2 '>
//           <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//             First Name
//           </label>
//           <div className='col-12 col-md-4 '>
//             <input
//               type='text'
//               className='form-control'
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className='mb-3 row'>
//           <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//             Last Name
//           </label>
//           <div className='col-12 col-md-4'>
//             <input
//               type='text'
//               className='form-control '
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className='mb-3 row'>
//           <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//             Email Address
//           </label>
//           <div className='col-12 col-md-4'>
//             <input
//               type='email'
//               className='form-control '
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className='mb-3 row'>
//           <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//             Password
//           </label>
//           <div className='col-12 col-md-4'>
//             <input
//               type='password'
//               className='form-control '
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className='mb-3 row'>
//           <label htmlFor='inputPassword' className='col-12 col-md-2 col-form-label' />
//           <div className='col-12 col-md-4'>
//             <select
//               className='form-select '
//               aria-label='Default select example'
//               onChange={(e) => setOwnBusiness(e.target.value)}
//               value={ownBusiness}
//             >
//               <option value='DEFAULT' selected disabled hidden>
//                 Do you own a business?
//               </option>
//               <option>Yes, I own a business</option>
//               <option>No, I own a business</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div>
//         <p className='border-bottom col-md-8 fs-2 pb-2'>Select your plan</p>

//         <div className='mb-3 row'>
//           <p className=' fs-6'>
//             Choose an annual plan at $179.95 (<span className='text-danger'>25% Savings!</span>) or
//             a monthly plan at $19.95 a month.
//           </p>
//           <label htmlFor='inputPassword' className='col-12 col-md-2 col-form-label upgrade_label'>
//             Membership Term
//           </label>
//           <div className='col-12 col-md-4'>
//             <select
//               className='form-select '
//               onChange={(e) => setMemberShipTerm(e.target.value)}
//               defaultvalue={memberShipTerm}
//               aria-label='Default select example'
//             >
//               <option>Monthly @ $19.95</option>
//               <option value={memberShipTerm} selected>
//                 Annual @ $179.95 (25% OFF)
//               </option>
//             </select>
//           </div>
//         </div>

//         {!toggle && (
//           <div className='mb-3 row'>
//             <div>
//               <label className='upgrade_label col-12 col-md-2 col-form-label'>
//                 <Link to='#' onClick={promoCodeHandler}>
//                   Have a promo code?
//                 </Link>
//               </label>
//             </div>
//             <div className='col-12 col-md-4'></div>
//           </div>
//         )}
//         {toggle && (
//           <div className='mb-3 row'>
//             <label className='upgrade_label col-12 col-md-2 col-form-label upgrade_label'>
//               Promo Code
//             </label>
//             <div className='col-12 col-md-4'>
//               <input
//                 type='text'
//                 className='form-control '
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 id='inputPassword'
//               />
//             </div>
//           </div>
//         )}
//       </div>
//       <div>
//         <p className='border-bottom fs-2 col-md-8'>Basic Information</p>

//         <div className='mb-3 row'>
//           <label
//             htmlFor='Purchase Timeframe'
//             className='col-12 col-md-2 col-form-label upgrade_label'
//           >
//             Purchase Timeframe
//           </label>
//           <div className='col-12 col-md-4'>
//             <select
//               className='form-select '
//               onChange={(e) => setPurchaseTimeframe(e.target.value)}
//               defaultValue={purchaseTimeframe}
//               aria-label='Default select example'
//             >
//               <option value='DEFAULT' selected>
//                 I plan to purchase within...
//               </option>
//               <option>0-3 months</option>
//               <option>6-12 months</option>
//               <option>1 year mores</option>
//             </select>
//           </div>
//         </div>
//         <div className='mb-3 row'>
//           <label htmlFor='inputPassword' className='col-12 col-md-2 col-form-label upgrade_label'>
//             Business Location
//           </label>
//           <div className='col-12 col-md-4'>
//             <select
//               className='form-select select_scroll '
//               onChange={(e) => setBusinessLocation(e.target.value)}
//               defaultValue={businessLocation}
//               aria-label='Default select example'
//             >
//               <option value='DEFAULT' selected>
//                 Delaware
//               </option>
//               <option>District of Columbia</option>
//             </select>
//           </div>
//         </div>

//         <div className='mb-3 row'>
//           <label className=' col-12 col-md-2 col-form-label upgrade_label'>
//             Primary Business Interest
//           </label>

//           <div className='col-12 col-md-4'>
//             <div className='d-flex align-items-center justify-content-end position-relative'>
//               <BsBoxArrowUpRight
//                 size={15}
//                 className=' position-absolute  mx-3'
//                 data-bs-toggle='modal'
//                 data-bs-target='#kt_modal_1'
//               />
//               <input
//                 disabled
//                 id='model-click'
//                 type='text'
//                 className='form-control w-100'
//                 onChange={(e) => setAgriculture(e.target.value)}
//                 value={agriculture}
//                 data-bs-toggle='modal'
//                 data-bs-target='#kt_modal_1'
//                 aria-label='send'
//               />
//             </div>
//           </div>
//           <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
//             <div className='modal-dialog modal-lg'>
//               <div className='modal-content'>
//                 <div className='modal-header'>
//                   <h5 className='modal-title'>Choose a Category</h5>

//                   <div
//                     className='btn btn-icon btn-sm btn-active-light-primary ms-2'
//                     data-bs-dismiss='modal'
//                     aria-label='Close'
//                   >
//                     <span className='svg-icon svg-icon-2x' />
//                   </div>
//                 </div>
//                 <div className='modal-body'>
//                   <div className='accordion' id='kt_accordion_1'>
//                     {/* <div className='accordion-item'>
//                       <h2 className='accordion-header' id='kt_accordion_1_header_1'>
//                         <button
//                           className='accordion-button fs-4 fw-bold'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_1_body_1'
//                           aria-expanded='true'
//                           aria-controls='kt_accordion_1_body_1'
//                         >
//                           Agriculture
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_1_body_1'
//                         className='accordion-collapse collapse show'
//                         aria-labelledby='kt_accordion_1_header_1'
//                         data-bs-parent='#kt_accordion_1'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>
//                                     Tree Farms and Orchards
//                                   </div>
//                                 </label>
//                               </div>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>
//                                     Vineyards and Wineries
//                                   </div>
//                                 </label>
//                               </div>
//                             </div>
//                             <div className='col-6'>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>Greenhouses</div>
//                                 </label>
//                               </div>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>
//                                     Other Agriculture
//                                   </div>
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className='accordion-item'>
//                       <h2 className='accordion-header' id='kt_accordion_1_header_2'>
//                         <button
//                           className='accordion-button fs-4 fw-bold collapsed'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_1_body_2'
//                           aria-expanded='false'
//                           aria-controls='kt_accordion_1_body_2'
//                         >
//                           Automotive and Boat
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_1_body_2'
//                         className='accordion-collapse collapse'
//                         aria-labelledby='kt_accordion_1_header_2'
//                         data-bs-parent='#kt_accordion_1'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>
//                                     Auto Repair and Service Shops
//                                   </div>
//                                 </label>
//                               </div>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>
//                                     Car Dealerships
//                                   </div>
//                                 </label>
//                               </div>
//                             </div>
//                             <div className='col-6'>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>Car Washes</div>
//                                 </label>
//                               </div>
//                               <div className='form-check form-check-custom form-check-solid mb-5'>
//                                 <input
//                                   className='form-check-input'
//                                   name='radio_input'
//                                   type='radio'
//                                   defaultValue={1}
//                                   id='kt_docs_formvalidation_radio_option_1'
//                                 />

//                                 <label
//                                    className='form-check-label'
//                                   htmlFor='kt_docs_formvalidation_radio_option_1 '
//                                 >
//                                   <div className='fw-bolder text-gray-800 me-3'>
//                                     Equipment Rental and Dealers
//                                   </div>
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div> */}
//                     <div className='accordion-item accordion_item_hover'>
//                       <h2 className='accordion-header' id='kt_accordion_3_header_3'>
//                         <button
//                           className='accordion-button fs-4 fw-bold collapsed'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_3_body_3'
//                           aria-expanded='false'
//                           aria-controls='kt_accordion_3_body_3'
//                         >
//                           Beauty and Personal Care
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_3_body_3'
//                         className='accordion-collapse collapse'
//                         aria-labelledby='kt_accordion_3_header_3'
//                         data-bs-parent='#kt_accordion_3'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>{BeautyAndPersonalCare}</div>
//                             <div className='col-6'>{BeautyAndPersonalCare}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className='accordion-item'>
//                       <h2 className='accordion-header' id='kt_accordion_4_header_4'>
//                         <button
//                           className='accordion-button fs-4 fw-bold collapsed'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_4_body_4'
//                           aria-expanded='false'
//                           aria-controls='kt_accordion_4_body_4'
//                         >
//                           Building and Construction
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_4_body_4'
//                         className='accordion-collapse collapse'
//                         aria-labelledby='kt_accordion_4_header_4'
//                         data-bs-parent='#kt_accordion_4'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>{BuildingAndConstruction}</div>
//                             <div className='col-6'>{BuildingAndConstruction}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className='accordion-item'>
//                       <h2 className='accordion-header' id='kt_accordion_5_header_5'>
//                         <button
//                           className='accordion-button fs-4 fw-bold collapsed'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_5_body_5'
//                           aria-expanded='false'
//                           aria-controls='kt_accordion_5_body_5'
//                         >
//                           Communication and Media
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_5_body_5'
//                         className='accordion-collapse collapse'
//                         aria-labelledby='kt_accordion_5_header_5'
//                         data-bs-parent='#kt_accordion_5'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>{CommunicationAndMedia}</div>
//                             <div className='col-6'>{CommunicationAndMedia}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className='accordion-item'>
//                       <h2 className='accordion-header' id='kt_accordion_6_header_6'>
//                         <button
//                           className='accordion-button fs-4 fw-bold collapsed'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_6_body_6'
//                           aria-expanded='false'
//                           aria-controls='kt_accordion_6_body_6'
//                         >
//                           Education And Children
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_6_body_6'
//                         className='accordion-collapse collapse'
//                         aria-labelledby='kt_accordion_6_header_6'
//                         data-bs-parent='#kt_accordion_6'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>{EducationAndChildren}</div>
//                             <div className='col-6'>{EducationAndChildren}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className='accordion-item'>
//                       <h2 className='accordion-header' id='kt_accordion_7_header_7'>
//                         <button
//                           className='accordion-button fs-4 fw-bold collapsed'
//                           type='button'
//                           data-bs-toggle='collapse'
//                           data-bs-target='#kt_accordion_7_body_7'
//                           aria-expanded='false'
//                           aria-controls='kt_accordion_7_body_7'
//                         >
//                           Entertainment And Recreation
//                         </button>
//                       </h2>
//                       <div
//                         id='kt_accordion_7_body_7'
//                         className='accordion-collapse collapse'
//                         aria-labelledby='kt_accordion_7_header_7'
//                         data-bs-parent='#kt_accordion_7'
//                       >
//                         <div className='accordion-body'>
//                           <div className='row'>
//                             <div className='col-6'>{EntertainmentAndRecreation}</div>
//                             <div className='col-6'>{EntertainmentAndRecreation}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/*end::Accordion*/}
//                 </div>
//                 <div className='modal-footer'>
//                   <button type='button' className='btn btn-warning' data-bs-dismiss='modal'>
//                     Close
//                   </button>
//                   <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
//                     Continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='col-md-8'>
//         <p className='border-bottom fs-2 pb-1'>Purchase Summary</p>
//         <p className='d-flex justify-content-between bg-secondary text-black mb-2  px-2 fs-6 mb-0'>
//           <span>Product Description:</span>
//           <span>Price</span>
//         </p>
//         <p className='d-flex justify-content-between fs-6  px-2 mb-0'>
//           <span>
//             Monthly BizOwnerSell Edge Membership – ($19.95/month) Your membership will be renewed
//             automatically at the selected rate until canceled.
//           </span>
//           <span>$19.95</span>
//         </p>
//         <h5 className='d-flex justify-content-end  px-2 '>
//           <span className='fw-bold me-20'>Total</span>
//           <span>$19.95</span>
//         </h5>
//       </div>
//       <div className='col-md-8'>
//         <p className='border-bottom fs-2 pb-1'>Payment Information</p>
//       </div>

//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           First Name
//         </label>
//         <div className='col-12 col-md-4'>
//           <input
//             type='text'
//             className='form-control '
//             onChange={(e) => setPaymentFirstName(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Last Name
//         </label>
//         <div className='col-12 col-md-4'>
//           <input
//             type='text'
//             className='form-control '
//             onChange={(e) => setPaymentLastName(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Phone Number
//         </label>
//         <div className='col-12 col-md-4'>
//           <input
//             type='text'
//             className='form-control '
//             onChange={(e) => setPaymentPhone(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Street Address
//         </label>
//         <div className='col-12 col-md-4'>
//           <input
//             type='text'
//             className='form-control '
//             onChange={(e) => setPaymentStreetAddress1(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label'></label>
//         <div className='col-12 col-md-4'>
//           <span>
//             <input
//               type='text'
//               className='form-control'
//               onChange={(e) => setPaymentStreetAddress2(e.target.value)}
//             />
//           </span>
//         </div>
//         <div className='col-12 col-md-4 d-flex align-items-center'>
//           <span>Optional</span>
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           City
//         </label>
//         <div className='col-12 col-md-4'>
//           <input type='text' className='form-control ' onChange={(e) => setCity(e.target.value)} />
//         </div>
//       </div>

//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Country
//         </label>
//         <div className='col-12 col-md-4'>
//           <select
//             onChange={(e) => setCountry(e.target.value)}
//             className='form-select '
//             defaultValue={country}
//             aria-label='Default select example'
//           >
//             <option value='DEFAULT' selected>
//               United State
//             </option>
//             <option>Turkey</option>
//             <option>Spain</option>
//             <option>U.A.E</option>
//             <option>United Kingdom</option>
//             <option>Thailand</option>
//             <option>Sweden</option>
//           </select>
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           State/Province
//         </label>
//         <div className='col-12 col-md-4'>
//           <select
//             className='form-select '
//             onChange={(e) => setState(e.target.value)}
//             defaultValue={state}
//             aria-label='Default select example'
//           >
//             <option value='DEFAULT' selected>
//               Select State
//             </option>
//             <option>Turkey</option>
//             <option>Spain</option>
//             <option>Hawaii</option>
//             <option>lowa</option>
//             <option>Taxes</option>
//             <option>Florida</option>
//           </select>
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label'></label>
//         <div className='col-12 col-md-4 py-2'>
//           <span>
//             <img src={visa} alt='' className='me-1' />
//             <img src={mastercard} alt='' />
//             <img src={amex} alt='' className='mx-1' />
//             <img src={discover} alt='' />
//           </span>
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Credit Card Number
//         </label>
//         <div className='col-12 col-md-4'>
//           <input
//             type='text'
//             className='form-control '
//             onChange={(e) => setCreditCardNumber(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Expiration Date
//         </label>
//         <div className='col-12 col-md-4 d-flex'>
//           <select
//             className='form-select w-75 me-2 '
//             onChange={(e) => setMonth(e.target.value)}
//             defaultValue={month}
//             aria-label='Default select example'
//           >
//             <option value='DEFAULT' selected>
//               Month
//             </option>
//             <option>01</option>
//             <option>02</option>
//             <option>03</option>
//             <option>04</option>
//             <option>05</option>
//             <option>06</option>
//             <option>07</option>
//             <option>08</option>
//             <option>09</option>
//             <option>10</option>
//             <option>12</option>
//           </select>

//           <select
//             className='form-select w-75'
//             onChange={(e) => setYear(e.target.value)}
//             defaultValue={year}
//             aria-label='Default select example'
//           >
//             <option value='DEFAULT' selected>
//               Year
//             </option>
//             <option>2022</option>
//             <option>2023</option>
//             <option>2024</option>
//             <option>2025</option>
//             <option>2026</option>
//             <option>2027</option>
//             <option>2028</option>
//             <option>2029</option>
//             <option>2030</option>
//             <option>2031</option>
//             <option>2032</option>
//           </select>
//         </div>
//       </div>
//       <div className='mb-3 row'>
//         <label htmlFor='inputFName' className='col-12 col-md-2 col-form-label upgrade_label'>
//           Security Code
//         </label>
//         <div className='col-3 col-md-1'>
//           <input
//             type='text'
//             className='form-control'
//             maxlength='3'
//             onChange={(e) => setSecurityCode(e.target.value)}
//           />
//         </div>
//         <div className='col-7 mt-1 mt-2'>
//           <img src={cvn} alt='' />
//           <span className='ms-2'>(3 digits on back. Amex 4 on front)</span>
//         </div>
//       </div>

//       <div className='col-md-8'>
//         <p className='border-bottom fs-2  pb-2'>Terms of Use</p>
//         <p className='py-3 checkbox'>
//           <label>
//             <input
//               type='checkbox'
//               className='me-3'
//               onChange={(e) => setTermsOfUse(e.target.checked)}
//             />
//             I have read and agree to BizOwnerSell's
//             <Link to='/terms-of-use'>
//               <b>Terms of Use</b>
//             </Link>
//             .
//           </label>
//         </p>

//         <div className=' my-4 d-flex justify-content-center'>
//           <Link to={'#'}>
//             <button
//               className='text-light d-inline-block btn btn-primary p-2 px-3 fs-6'
//               onClick={saveDataHandler}
//             >
//               Continue
//             </button>
//           </Link>
//           <Link to='#' className='ms-2 text-decoration-none d-flex align-items-center'>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ValRpt
