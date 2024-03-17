import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import visa from '../../assets/media/cards/visa.png'
import mastercard from '../../assets/media/cards/mastercard.png'
import amex from '../../assets/media/cards/amex.png'
import discover from '../../assets/media/cards/discover.png'
import cvn from '../../assets/media/cards/cvn.png'
import './Upgrade.css'
import {toAbsoluteUrl} from '../../_metronic/helpers'
const Upgrade = () => {
  // const [options, setOptions] = useState('')
  const [toggle, setToggle] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ownBusiness, setOwnBusiness] = useState('')
  const [memberShipTerm, setMemberShipTerm] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [purchaseTimeframe, setPurchaseTimeframe] = useState('')
  const [businessLocation, setBusinessLocation] = useState('')
  const [paymentFirstName, setPaymentFirstName] = useState('')
  const [paymentLastName, setPaymentLastName] = useState('')
  const [paymentPhone, setPaymentPhone] = useState('')
  const [paymentStreetAddress1, setPaymentStreetAddress1] = useState('')
  const [paymentStreetAddress2, setPaymentStreetAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [securityCode, setSecurityCode] = useState('')
  const [termsOfUse, setTermsOfUse] = useState('')
  const promoCodeHandler = () => {
    setToggle(true)
  }
  const [agriculture, setAgriculture] = useState('Select a Category')
  const handleChange = (e) => {
    const {name, value} = e.target
    setAgriculture(value)
  }
  const BeautyAndPersonals = [
    {Beauty: 'Hair Salons and Barber Shops'},
    {Beauty: 'Message'},
    {Beauty: 'Nail Salons'},
  ]
  const buildingConstructions = [
    {title: 'Building Material and Hardware S...'},
    {title: 'Concrete'},
    {title: 'Electrical and Mechanical'},
    {title: 'Heavy Construction'},
  ]
  const CommunicationMedias = [
    {title: 'Magazines and Newspapers'},
    {title: 'Production Companies'},
    {title: 'Other Communication and Media'},
  ]
  const EducationChildrens = [
    {title: 'Day Care and Child Care Centers'},
    {title: 'Schools'},
    {title: 'Preschools'},
    {title: 'Other Education'},
  ]
  const EntertainmentRecreations = [
    {title: 'Art Galleries'},
    {title: 'Banquet Hall'},
    {title: 'Bowling Alleys'},
    {title: 'Casinos'},
  ]
  const BeautyAndPersonalCare = BeautyAndPersonals.map((BeautyAndPersonal, index) => (
    <div
      className='form-check form-check-custom form-check-solid mb-5'
      key={index}
      value={BeautyAndPersonal.Beauty}
    >
      <input
        className='form-check-input'
        name='radio_input'
        type='radio'
        defaultValue={1}
        value={BeautyAndPersonal.Beauty}
        onChange={(e) => {
          handleChange(e)
        }}
        id='kt_docs_formvalidation_radio_option_1'
      />
      <label
        className='form-check-label upgrade_label '
        htmlFor='kt_docs_formvalidation_radio_option_1 '
      >
        <div className='fw-bolder text-gray-800 me-3'>{BeautyAndPersonal.Beauty}</div>
      </label>
    </div>
  ))
  const BuildingAndConstruction = buildingConstructions.map((buildingConstruction, index) => (
    <div
      className='form-check form-check-custom form-check-solid mb-5'
      key={index}
      value={buildingConstruction.title}
    >
      <input
        className='form-check-input'
        name='radio_input'
        type='radio'
        defaultValue={1}
        value={buildingConstruction.title}
        onChange={(e) => {
          handleChange(e)
        }}
        id='kt_docs_formvalidation_radio_option_1'
      />
      <label
        className='upgrade_label form-check-label'
        htmlFor='kt_docs_formvalidation_radio_option_1 '
      >
        <div className='fw-bolder text-gray-800 me-3'>{buildingConstruction.title}</div>
      </label>
    </div>
  ))
  const CommunicationAndMedia = CommunicationMedias.map((CommunicationMedia, index) => (
    <div
      className='form-check form-check-custom form-check-solid mb-5'
      key={index}
      value={CommunicationMedia.title}
    >
      <input
        className='form-check-input'
        name='radio_input'
        type='radio'
        value={CommunicationMedia.title}
        onChange={(e) => {
          handleChange(e)
        }}
        defaultValue={1}
        id='kt_docs_formvalidation_radio_option_1'
      />
      <label
        className='upgrade_label form-check-label'
        htmlFor='kt_docs_formvalidation_radio_option_1 '
      >
        <div className='fw-bolder text-gray-800 me-3'>{CommunicationMedia.title}</div>
      </label>
    </div>
  ))
  const EducationAndChildren = EducationChildrens.map((EducationChildren, index) => (
    <div
      className='form-check form-check-custom form-check-solid mb-5'
      key={index}
      value={EducationChildren.title}
    >
      <input
        className='form-check-input'
        name='radio_input'
        type='radio'
        value={EducationChildren.title}
        onChange={(e) => {
          handleChange(e)
        }}
        defaultValue={1}
        id='kt_docs_formvalidation_radio_option_1'
      />
      <label
        className='upgrade_label form-check-label'
        htmlFor='kt_docs_formvalidation_radio_option_1 '
      >
        <div className='fw-bolder text-gray-800 me-3'>{EducationChildren.title}</div>
      </label>
    </div>
  ))
  const EntertainmentAndRecreation = EntertainmentRecreations.map(
    (EntertainmentRecreation, index) => (
      <div
        className='form-check form-check-custom form-check-solid mb-5'
        key={index}
        value={EntertainmentRecreation.title}
      >
        <input
          className='form-check-input'
          name='radio_input'
          type='radio'
          value={EntertainmentRecreation.title}
          onChange={(e) => {
            handleChange(e)
          }}
          defaultValue={1}
          id='kt_docs_formvalidation_radio_option_1'
        />
        <label
          className='upgrade_label form-check-label'
          htmlFor='kt_docs_formvalidation_radio_option_1 '
        >
          <div className='fw-bolder text-gray-800 me-3'>{EntertainmentRecreation.title}</div>
        </label>
      </div>
    )
  )
  const saveDataHandler = () => {
    console.log('')
  }
  return (
    <div className='container'>
      <div className='mx-20'>
        <div className=' lh-3 border-bottom pb-4'>
          <h1 className='py-4 mt-3 text-center fw-normal text-black' style={{fontSize: '2.2rem'}}>
            Sign Up For BizOwnerSell Edge
          </h1>
          <div className='pb-3  text-center'>
            <span className=' fs-4 fw-normal pe-2'>Create your account</span>
            <Link className='border-start px-2 fs-6' to='/auth/login'>
              Already have an account? Sign in here.
            </Link>
          </div>
        </div>

        <div>
          <div className='g-5 row pt-2'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='inputFName' className=' col-form-label upgrade_label text-start fs-4'>
                First Name
              </label>
              <div className=' text-center'>
                <input
                  type='text'
                  placeholder='First Name'
                  className='form-control form-control-solid'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='inputFName' className=' col-form-label upgrade_label text-start fs-4'>
                Last Name
              </label>
              <div className=''>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Last Name'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='inputFName' className=' col-form-label upgrade_label fs-4'>
                Email Address
              </label>
              <div className=''>
                <input
                  type='email'
                  placeholder='Email'
                  className='form-control form-control-solid'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='inputFName' className=' col-form-label upgrade_label fs-4'>
                Password
              </label>
              <div className=''>
                <input
                  type='password'
                  placeholder='Password'
                  className='form-control form-control-solid'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='mb-3 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='inputPassword' className=' col-form-label' />
              <div className=''>
                <select
                  style={{
                    backgroundColor: '#f5f8fa',
                  }}
                  className='form-select fs-4 form-control-solid'
                  placeholder=' Do you own a business?'
                  aria-label='Default select example'
                  onChange={(e) => setOwnBusiness(e.target.value)}
                  value={ownBusiness}
                >
                  <option value='DEFAULT' selected disabled hidden className='fs-4'>
                    Do you own a business?
                  </option>
                  <option className='fs-4'>Yes, I own a business</option>
                  <option className='fs-4'>No, I own a business</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className='mb-3 row'> */}

          {/* </div> */}
        </div>

        <div>
          <p className='border-bottom fs-1 pb-4 pt-5'>Select your plan</p>

          <div className='mb-3 row mt-4'>
            <p className=' fs-5 py-3'>
              Choose an annual plan at $179.95 (<span className='text-danger'>25% Savings!</span>)
              or a monthly plan at $19.95 a month.
            </p>
            <label
              htmlFor='inputPassword'
              className='col-12 col-md-2 col-form-label upgrade_label fs-4 text-start'
            >
              Membership Term
            </label>
            <div className='col-lg-6 col-md-6 col-sm-12 text-start' style={{marginLeft: '-15px'}}>
              <select
                style={{
                  backgroundColor: '#f5f8fa',
                }}
                className='form-select form-control-solid'
                onChange={(e) => setMemberShipTerm(e.target.value)}
                defaultvalue={memberShipTerm}
                aria-label='Default select example'
              >
                <option>Monthly @ $19.95</option>
                <option value={memberShipTerm} selected>
                  Annual @ $179.95 (25% OFF)
                </option>
              </select>
            </div>
          </div>

          {!toggle && (
            <div className='mb-3 row'>
              <div>
                <label className='upgrade_label col-12 col-md-2 col-form-label fs-5 text-start'>
                  <Link to='#' onClick={promoCodeHandler}>
                    Have a promo code?
                  </Link>
                </label>
              </div>
              <div className='col-12 col-md-4'></div>
            </div>
          )}
          {toggle && (
            <div className='mb-3 row'>
              <label className='upgrade_label col-12 col-md-2 col-form-label upgrade_label'>
                Promo Code
              </label>
              <div className='col-12 col-md-4'>
                <input
                  type='text'
                  className='form-control '
                  onChange={(e) => setPromoCode(e.target.value)}
                  id='inputPassword'
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <p className='border-bottom fs-1 pb-4 pt-5'>Basic Information</p>

          <div className=' row'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='Purchase Timeframe' className='col-form-label upgrade_label fs-4'>
                Purchase Timeframe
              </label>
              <div className=''>
                <select
                  style={{
                    backgroundColor: '#f5f8fa',
                  }}
                  className='form-select form-control-solid'
                  onChange={(e) => setPurchaseTimeframe(e.target.value)}
                  defaultValue={purchaseTimeframe}
                  aria-label='Default select example'
                >
                  <option value='DEFAULT' selected>
                    I plan to purchase within...
                  </option>
                  <option>0-3 months</option>
                  <option>6-12 months</option>
                  <option>1 year mores</option>
                </select>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='inputPassword' className=' col-form-label upgrade_label fs-4'>
                Business Location
              </label>
              <div className=''>
                <select
                  style={{
                    backgroundColor: '#f5f8fa',
                  }}
                  className='form-select select_scroll form-control-solid'
                  onChange={(e) => setBusinessLocation(e.target.value)}
                  defaultValue={businessLocation}
                  aria-label='Default select example'
                >
                  <option value='DEFAULT' selected>
                    Delaware
                  </option>
                  <option>District of Columbia</option>
                </select>
              </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12 mt-4'>
              <label className=' col-form-label upgrade_label fs-4'>
                Primary Business Interest
              </label>
              <div className=''>
                <div className='d-flex align-items-center justify-content-end position-relative'>
                  <BsBoxArrowUpRight
                    size={15}
                    className=' position-absolute  mx-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_1'
                  />
                  <input
                    disabled
                    id='model-click'
                    type='text'
                    className='form-control form-control-solid w-100'
                    onChange={(e) => setAgriculture(e.target.value)}
                    value={agriculture}
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_1'
                    aria-label='send'
                  />
                </div>
                <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
                  <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title fs-2 fw-normal'>Choose a Category</h5>

                        <div
                          className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        >
                          <span className='svg-icon svg-icon-2x' />
                        </div>
                      </div>
                      <div className='modal-body'>
                        <div className='accordion' id='kt_accordion_1'>
                          {/* <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_1_header_1'>
                        <button
                          className='accordion-button fs-4 fw-bold'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_1_body_1'
                          aria-expanded='true'
                          aria-controls='kt_accordion_1_body_1'
                        >
                          Agriculture
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_1_body_1'
                        className='accordion-collapse collapse show'
                        aria-labelledby='kt_accordion_1_header_1'
                        data-bs-parent='#kt_accordion_1'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>
                                    Tree Farms and Orchards
                                  </div>
                                </label>
                              </div>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>
                                    Vineyards and Wineries
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className='col-6'>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>Greenhouses</div>
                                </label>
                              </div>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>
                                    Other Agriculture
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_1_header_2'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_1_body_2'
                          aria-expanded='false'
                          aria-controls='kt_accordion_1_body_2'
                        >
                          Automotive and Boat
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_1_body_2'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_1_header_2'
                        data-bs-parent='#kt_accordion_1'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>
                                    Auto Repair and Service Shops
                                  </div>
                                </label>
                              </div>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>
                                    Car Dealerships
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className='col-6'>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>Car Washes</div>
                                </label>
                              </div>
                              <div className='form-check form-check-custom form-check-solid mb-5'>
                                <input
                                  className='form-check-input'
                                  name='radio_input'
                                  type='radio'
                                  defaultValue={1}
                                  id='kt_docs_formvalidation_radio_option_1'
                                />

                                <label
                                   className='form-check-label'
                                  htmlFor='kt_docs_formvalidation_radio_option_1 '
                                >
                                  <div className='fw-bolder text-gray-800 me-3'>
                                    Equipment Rental and Dealers
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                          <div className='accordion-item accordion_item_hover'>
                            <h2 className='accordion-header' id='kt_accordion_3_header_3'>
                              <button
                                className='accordion-button fs-4 fw-bold collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#kt_accordion_3_body_3'
                                aria-expanded='false'
                                aria-controls='kt_accordion_3_body_3'
                              >
                                Beauty and Personal Care
                              </button>
                            </h2>
                            <div
                              id='kt_accordion_3_body_3'
                              className='accordion-collapse collapse'
                              aria-labelledby='kt_accordion_3_header_3'
                              data-bs-parent='#kt_accordion_3'
                            >
                              <div className='accordion-body'>
                                <div className='row'>
                                  <div className='col-6'>{BeautyAndPersonalCare}</div>
                                  <div className='col-6'>{BeautyAndPersonalCare}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='accordion-item'>
                            <h2 className='accordion-header' id='kt_accordion_4_header_4'>
                              <button
                                className='accordion-button fs-4 fw-bold collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#kt_accordion_4_body_4'
                                aria-expanded='false'
                                aria-controls='kt_accordion_4_body_4'
                              >
                                Building and Construction
                              </button>
                            </h2>
                            <div
                              id='kt_accordion_4_body_4'
                              className='accordion-collapse collapse'
                              aria-labelledby='kt_accordion_4_header_4'
                              data-bs-parent='#kt_accordion_4'
                            >
                              <div className='accordion-body'>
                                <div className='row'>
                                  <div className='col-6'>{BuildingAndConstruction}</div>
                                  <div className='col-6'>{BuildingAndConstruction}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='accordion-item'>
                            <h2 className='accordion-header' id='kt_accordion_5_header_5'>
                              <button
                                className='accordion-button fs-4 fw-bold collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#kt_accordion_5_body_5'
                                aria-expanded='false'
                                aria-controls='kt_accordion_5_body_5'
                              >
                                Communication and Media
                              </button>
                            </h2>
                            <div
                              id='kt_accordion_5_body_5'
                              className='accordion-collapse collapse'
                              aria-labelledby='kt_accordion_5_header_5'
                              data-bs-parent='#kt_accordion_5'
                            >
                              <div className='accordion-body'>
                                <div className='row'>
                                  <div className='col-6'>{CommunicationAndMedia}</div>
                                  <div className='col-6'>{CommunicationAndMedia}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='accordion-item'>
                            <h2 className='accordion-header' id='kt_accordion_6_header_6'>
                              <button
                                className='accordion-button fs-4 fw-bold collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#kt_accordion_6_body_6'
                                aria-expanded='false'
                                aria-controls='kt_accordion_6_body_6'
                              >
                                Education And Children
                              </button>
                            </h2>
                            <div
                              id='kt_accordion_6_body_6'
                              className='accordion-collapse collapse'
                              aria-labelledby='kt_accordion_6_header_6'
                              data-bs-parent='#kt_accordion_6'
                            >
                              <div className='accordion-body'>
                                <div className='row'>
                                  <div className='col-6'>{EducationAndChildren}</div>
                                  <div className='col-6'>{EducationAndChildren}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='accordion-item'>
                            <h2 className='accordion-header' id='kt_accordion_7_header_7'>
                              <button
                                className='accordion-button fs-4 fw-bold collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#kt_accordion_7_body_7'
                                aria-expanded='false'
                                aria-controls='kt_accordion_7_body_7'
                              >
                                Entertainment And Recreation
                              </button>
                            </h2>
                            <div
                              id='kt_accordion_7_body_7'
                              className='accordion-collapse collapse'
                              aria-labelledby='kt_accordion_7_header_7'
                              data-bs-parent='#kt_accordion_7'
                            >
                              <div className='accordion-body'>
                                <div className='row'>
                                  <div className='col-6'>{EntertainmentAndRecreation}</div>
                                  <div className='col-6'>{EntertainmentAndRecreation}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*end::Accordion*/}
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                          Close
                        </button>
                        <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=' mt-10'>
          <p className='border-bottom fs-1 pb-4'>Purchase Summary</p>
          <div className='col-8'>
            <p className='d-flex justify-content-between bg-secondary text-black mb-2 py-2 px-2 fs-6 mb-0'>
              <span>Product Description:</span>
              <span>Price</span>
            </p>
            <p className='d-flex justify-content-between fs-6  px-2 mb-0 lh-lg'>
              <span>
                Monthly BizOwnerSell Edge Membership – ($19.95/month) Your membership will be renewed
                automatically at the selected rate until canceled.
              </span>
              <span>$19.95</span>
            </p>
            <h5 className='d-flex justify-content-end  px-2 '>
              <span className=' me-20'>Total</span>
              <span>$19.95</span>
            </h5>
          </div>
        </div>
        <div className=''>
          <p className='border-bottom fs-1 pb-4'>Payment Information</p>
        </div>

        <div className=' row pb-4 g-5'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className=' col-form-label upgrade_label fs-4'>
              First Name
            </label>
            <div className=''>
              <input
                type='text'
                placeholder='First Name'
                className='form-control form-control-solid'
                onChange={(e) => setPaymentFirstName(e.target.value)}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='col-form-label upgrade_label fs-4'>
              Last Name
            </label>
            <div className=''>
              <input
                type='text'
                placeholder='Last Name '
                className='form-control form-control-solid'
                onChange={(e) => setPaymentLastName(e.target.value)}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 col-form-label upgrade_label'>
              Phone Number
            </label>
            <div className=''>
              <input
                placeholder='Phone Number'
                type='text'
                className='form-control form-control-solid'
                onChange={(e) => setPaymentPhone(e.target.value)}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 col-form-label upgrade_label'>
              Street Address
            </label>
            <div className=''>
              <input
                placeholder='Street Address'
                type='text'
                className='form-control form-control-solid'
                onChange={(e) => setPaymentStreetAddress1(e.target.value)}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 fw-lighter col-form-label'>
              Optional
            </label>
            <div className=''>
              <span>
                <input
                  placeholder='Optional'
                  type='text'
                  className='form-control form-control-solid'
                  onChange={(e) => setPaymentStreetAddress2(e.target.value)}
                />
              </span>
            </div>
            {/* <div className='d-flex align-items-center'>
          <span>Optional</span>
        </div> */}
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 col-form-label upgrade_label'>
              City
            </label>
            <div className=''>
              <input
                type='text'
                placeholder='City'
                className='form-control form-control-solid'
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='col-form-label upgrade_label fs-4'>
              Country
            </label>
            <div className=''>
              <select
                style={{
                  backgroundColor: '#f5f8fa',
                }}
                onChange={(e) => setCountry(e.target.value)}
                className='form-select form-control-solid'
                defaultValue={country}
                aria-label='Default select example'
              >
                <option value='DEFAULT' selected>
                  United States
                </option>
                <option>Turkey</option>
                <option>Spain</option>
                <option>U.A.E</option>
                <option>United Kingdom</option>
                <option>Thailand</option>
                <option>Sweden</option>
              </select>
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 col-form-label upgrade_label'>
              State/Province
            </label>
            <div className=''>
              <select
                style={{
                  backgroundColor: '#f5f8fa',
                }}
                className='form-select form-control-solid'
                onChange={(e) => setState(e.target.value)}
                defaultValue={state}
                aria-label='Default select example'
              >
                <option value='DEFAULT' selected>
                  Select State
                </option>
                <option>Turkey</option>
                <option>Spain</option>
                <option>Hawaii</option>
                <option>lowa</option>
                <option>Taxes</option>
                <option>Florida</option>
              </select>
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12 pt-5'>
            <label className='form-label fs-4'>Credit card number</label>

            <div className='position-relative'>
              <input
                type='number'
                className='form-control form-control-solid py-3'
                placeholder='Enter card number'
                name='creditCard'
                id='cr_no'
                value={creditCardNumber}
                //   onChange={(e) => billingSubmit(e)}
                onChange={(e) => setCreditCardNumber(e.target.value)}
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

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 col-form-label upgrade_label'>
              Expiration Date
            </label>
            <div className='d-flex'>
              <select
                style={{
                  backgroundColor: '#f5f8fa',
                }}
                className='form-select w-75 me-2 form-control-solid'
                onChange={(e) => setMonth(e.target.value)}
                defaultValue={month}
                aria-label='Default select example'
              >
                <option value='DEFAULT' selected>
                  Month
                </option>
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
                style={{
                  backgroundColor: '#f5f8fa',
                }}
                className='form-select w-75 form-control-solid'
                onChange={(e) => setYear(e.target.value)}
                defaultValue={year}
                aria-label='Default select example'
              >
                <option value='DEFAULT' selected>
                  Year
                </option>
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
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label htmlFor='inputFName' className='fs-4 col-form-label upgrade_label'>
              Security Code
            </label>
            <div className=''>
              <input
                type='text'
                className='form-control form-control-solid'
                maxlength='3'
                onChange={(e) => setSecurityCode(e.target.value)}
              />
            </div>
            <div className='col-7 mt-1 mt-3'>
              <img src={cvn} alt='' />
              <span className='ms-2'>(3 digits on back. Amex 4 on front)</span>
            </div>
          </div>
        </div>

        <p className=' fs-1 pb-4 border-bottom mt-5'>Terms of Use</p>

        <div className='d-flex justify-content-between '>
          <div>
            <p className='py-3 checkbox'>
              <label>
                <input
                  type='checkbox'
                  className='me-3 fs-5'
                  onChange={(e) => setTermsOfUse(e.target.checked)}
                />
                I have read and agree to BizOwnerSell's
                <Link to='/terms-of-use'>
                  <b> Terms of Use</b>
                </Link>
                .
              </label>
            </p>
          </div>
          <div className='d-flex mt-2'>
            <Link to={'#'} onClick={saveDataHandler}>
              <button className='text-white d-inline-block btn-primary border-0 rounded text-center p-2 text-center me-5 fs-6'>
                Continue
              </button>
            </Link>
            <Link to='#' className=' text-decoration-none'>
              <button className='text-white d-inline-block btn-dark border-0 rounded text-center p-2 text-center fs-6'>
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upgrade
