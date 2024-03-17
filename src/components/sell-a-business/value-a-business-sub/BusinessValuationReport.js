import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import VR_sample from '../../../assets/images/VR_sample.png'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import './BusinessValuationReport.css'
const BusinessValuationReport = () => {
  // const [beautyPersonalCare, setBeautyPersonalCare] = useState([])
  const [toggle, setToggle] = useState(false)
 const [allSlectedLocations, setAllSlectedLocations] = useState([])
  const [agriculture, setAgriculture] = useState('Choose a Category ')
  const [location, setLocation] = useState('Select location(s)')
  const handleChange = (e) => {
    const {value} = e.target
    setAgriculture(value)
  }
  let locationArray=[
    {
      location:"abc"
    },{
      location: "abc",
    },
    {
      location: "abc"
    }, {
      location: "abc",
    },
   
  ]
  const getArray=(e)=>{
    const {value,checked}=e.target
    if(checked===true){
      setAllSlectedLocations([...allSlectedLocations,value])
    }else{
      setAllSlectedLocations(allSlectedLocations.filter((e)=>e!==value))
      // console.log("SDFd", allSlectedLocations);
    }

  }
  const locationChange = locationArray.map((item,index)=>(
    <div className='form-check form-check-custom mb-3' key={index}>
      <input
        className='form-check-input'
        type='checkbox'
        value={item.location}
        defaultValue
      onChange={(e)=>getArray(e)}
        id={index}
      />
      <label
        className='form-check-label '
        htmlFor={index}
      >
        {item.location}
      </label>
    </div>
    
  ))
  
  // const mainCat = [
  //   {
  //     name: 'Agricultures',
  //     row: [
  //       {title: 'Tree Farms and Orchards'},
  //       {title: 'VineYards and Wineries'},
  //       {title: 'VineYards and Wineries'},
  //     ],
  //   },
  //   {
  //     name: 'BeautyAndPersonals',
  //     row: [{title: 'Hair Salons and Barber Shops'}, {title: 'Message'}, {title: 'Nail Salons'}],
  //   },
  // ]

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
      <label className='form-check-label' htmlFor=''>
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
      <label className='form-check-label fw-bolder text-gray-800 '>
        <input
          className='form-check-input me-3'
          name='radio_input'
          type='radio'
          value={buildingConstruction.title}
          defaultValue={1}
          onChange={(e) => {
            handleChange(e)
          }}
        />

        {buildingConstruction.title}
      </label>
    </div>
  ))
  const CommunicationAndMedia = CommunicationMedias.map((CommunicationMedia, index) => (
    <div
      className='form-check form-check-custom form-check-solid mb-5'
      key={index}
      value={CommunicationMedia.title}
    >
      <label className='form-check-label fw-bolder text-gray-800 '>
        <input
          className='form-check-input me-3'
          name='radio_input'
          type='radio'
          value={CommunicationMedia.title}
          onChange={(e) => {
            handleChange(e)
          }}
          defaultValue={1}
          id='kt_docs_formvalidation_radio_option_1'
        />

        {CommunicationMedia.title}
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
        defaultValue={1}
        onChange={(e) => {
          handleChange(e)
        }}
        id='kt_docs_formvalidation_radio_option_1'
      />
      <label className='form-check-label' htmlFor='kt_docs_formvalidation_radio_option_1 '>
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
          defaultValue={1}
          onChange={(e) => {
            handleChange(e)
          }}
          value={EntertainmentRecreation.title}
          id='kt_docs_formvalidation_radio_option_1'
        />
        <label className='form-check-label' htmlFor='kt_docs_formvalidation_radio_option_1 '>
          <div className='fw-bolder text-gray-800 me-3'>{EntertainmentRecreation.title}</div>
        </label>
      </div>
    )
  )
  const navigate = useNavigate()
  const toggleHandler = () => {
    setToggle(true)
  }
  return (
    <>
      <div className='container text-center body_bg rounded mt-5 pt-5'>
        {toggle && (
          <div>
            <h1 className='fs-1 mb-5 fw-bold'>Business Valuation Report</h1>
            <div className='row mb-5 justify-content-center'>
              <div className='col-8 '>
                <div className='row'>
                  <div className='col-md-4'>
                    <p>
                      Easy-to-use tools calculate the value of a business using 3 data‑rich methods.
                    </p>
                  </div>
                  <div className='col-md-4'>
                    <p>
                      Includes current information on "for sale" and sold businesses to show how
                      prices compare.
                    </p>
                  </div>
                  <div className='col-md-4'>
                    <p>
                      Gives you access to detailed sale data for businesses included in your report.
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        )}
        <h1 className='fs-1 fw-normal '>Customize your Valuation Report</h1>
        <div className='p-2 mx-5 '>
          <div className='container w-lg-75'>
            <div className=' rounded header_bg  py-4 px-2'>
              <div className='row justify-content-center '>
                <div className='col-md-6 col-12 '>
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
                      className='form-control w-100'
                      value={agriculture}
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_1'
                      aria-label='send'
                    />
                  </div>
                </div>
              </div>
            </div>{' '}
            {toggle && (
              <div className=' mt-5 text-center'>
                <b>Based on your Selections, your Report will analyze:</b>
                <div className='row mt-5 justify-content-center'>
                  <div className='col-3 border-end'>
                    <p className='fs-5'>100+</p>
                    <p>Sold Businesses</p>
                  </div>

                  <div className='col-3'>
                    <p>100+</p>
                    <p>For Sale Businesses</p>
                  </div>
                </div>
                <div className=' row justify-content-center mt-3'>
                  <div className='col-lg-8 col-12  header_bg rounded'>
                    <div className='row justify-content-center  p-5 '>
                      <div className='col-12 align-items-center justify-content-center d-flex  '>
                        <span className='text-dark'>Refine Your Report:</span>
                        <select
                          className='form-select w-md-50  mx-3'
                          data-bs-toggle='modal'
                          data-bs-target='#staticBackdrop'
                          aria-label='Default select example'
                        >
                          <option selected hidden>
                            {location}
                          </option>
                        </select>
                        <span>optional</span>
                      </div>
                      <div>
                        {/* Modal */}
                        <div
                          className='modal fade'
                          id='staticBackdrop'
                          data-bs-backdrop='static'
                          data-bs-keyboard='false'
                          tabIndex={-1}
                          aria-labelledby='staticBackdropLabel'
                          aria-hidden='true'
                        >
                          <div className='modal-dialog modal-lg'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h5 className='modal-title' id='staticBackdropLabel'>
                                  Select locations
                                </h5>
                                <button
                                  type='button'
                                  className='btn-close'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                />
                              </div>
                              <div className='modal-body'>
                                <div className='row text-start'>
                                  <div className='col-4'>
                                    {locationChange}
                                    <div className='form-check form-check-custom mb-5'>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                      
                                        id='flexCheckDefault'
                                      />
                                      <label
                                        className='form-check-label '
                                        htmlFor='flexCheckDefault'
                                      >
                                        Alabama
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault'
                                      >
                                        Arizona
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault3'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault3'
                                      >
                                        Alaska
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault4'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault4'
                                      >
                                        California
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                      />
                                      <label className='form-check-label text-start'>
                                        Colorado
                                      </label>
                                    </div>
                                  </div>
                                  <div className='col-4'>
                                    <div className='form-check pb-2'>
                                      <input
                                        className='form-check-input '
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault1'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault1'
                                      >
                                        Alabama
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault'
                                      >
                                        Arizona
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault3'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault3'
                                      >
                                        Alaska
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault4'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault4'
                                      >
                                        California
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault5'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault5'
                                      >
                                        Colorado
                                      </label>
                                    </div>
                                  </div>
                                  <div className='col-4'>
                                    <div className='form-check pb-2'>
                                      <input
                                        className='form-check-input '
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault1'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault1'
                                      >
                                        Alabama
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault'
                                      >
                                        Arizona
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault3'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault3'
                                      >
                                        Alaska
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault4'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault4'
                                      >
                                        California
                                      </label>
                                    </div>
                                    <div className='form-check pb-2 '>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue
                                        // id='flexCheckDefault5'
                                      />
                                      <label
                                        className='form-check-label text-start'
                                        // htmlFor='flexCheckDefault5'
                                      >
                                        Colorado
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='modal-footer'>
                                <button
                                  type='button'
                                  className='btn btn-secondary'
                                  data-bs-dismiss='modal'
                                >
                                  Close
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-warning'
                                  data-bs-dismiss='modal'
                                  onClick={() => setLocation('2 selected')}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='fs-5 mb-0 py-3'>
                  Total Price: <span className='fs-3'>$59.95*</span>{' '}
                </p>
                <button className='btn btn-primary  mb-1' onClick={() => navigate('/valrpt')}>
                  Continue to Checkout
                </button>
                <p>
                  *Pricing depends on the total number of available For Sale and Sold Businesses
                  that will be analyzed in your report
                </p>
              </div>
            )}
            <hr />
          </div>
          <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
            <div className='modal-dialog modal-lg modal-dialog-scrollable'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Choose a Category</h5>
                </div>
                <div className='modal-body '>
                  {/*begin::Accordion*/}
                  <div className='accordion' id='kt_accordion_1'>
                    <div className='accordion-item'>
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
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_8_header_8'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_8_body_8'
                          aria-expanded='false'
                          aria-controls='kt_accordion_8_body_8'
                        >
                          Financial Services
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_8_body_8'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_8_header_8'
                        data-bs-parent='#kt_accordion_8'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_9_header_9'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_9_body_9'
                          aria-expanded='false'
                          aria-controls='kt_accordion_9_body_9'
                        >
                          Health Care and Fitness
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_9_body_9'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_9_header_9'
                        data-bs-parent='#kt_accordion_9'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_10_header_10'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_10_body_10'
                          aria-expanded='false'
                          aria-controls='kt_accordion_10_body_10'
                        >
                          Manufacturing
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_10_body_10'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_10_header_10'
                        data-bs-parent='#kt_accordion_10'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_11_header_11'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_11_body_11'
                          aria-expanded='false'
                          aria-controls='kt_accordion_11_body_11'
                        >
                          Non-classifiable Establishments
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_11_body_11'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_11_header_11'
                        data-bs-parent='#kt_accordion_11'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_12_header_12'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_12_body_12'
                          aria-expanded='false'
                          aria-controls='kt_accordion_12_body_12'
                        >
                          Online and Technology
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_12_body_12'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_12_header_12'
                        data-bs-parent='#kt_accordion_12'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_13_header_13'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_13_body_13'
                          aria-expanded='false'
                          aria-controls='kt_accordion_13_body_13'
                        >
                          Pet Services
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_13_body_13'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_13_header_13'
                        data-bs-parent='#kt_accordion_13'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_14_header_14'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_14_body_14'
                          aria-expanded='false'
                          aria-controls='kt_accordion_14_body_14'
                        >
                          Restaurants and Food
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_14_body_14'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_14_header_14'
                        data-bs-parent='#kt_accordion_14'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_15_header_15'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_15_body_15'
                          aria-expanded='false'
                          aria-controls='kt_accordion_15_body_15'
                        >
                          Retail
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_15_body_15'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_15_header_15'
                        data-bs-parent='#kt_accordion_15'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_16_header_16'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_16_body_16'
                          aria-expanded='false'
                          aria-controls='kt_accordion_16_body_16'
                        >
                          Service Businesses
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_16_body_16'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_16_header_16'
                        data-bs-parent='#kt_accordion_16'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_17_header_17'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_17_body_17'
                          aria-expanded='false'
                          aria-controls='kt_accordion_17_body_17'
                        >
                          Transportation and Storage
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_17_body_17'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_17_header_17'
                        data-bs-parent='#kt_accordion_17'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_18_header_18'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_18_body_18'
                          aria-expanded='false'
                          aria-controls='kt_accordion_18_body_18'
                        >
                          Travel
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_18_body_18'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_18_header_18'
                        data-bs-parent='#kt_accordion_18'
                      >
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                            <div className='col-6'>{EntertainmentAndRecreation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='kt_accordion_19_header_19'>
                        <button
                          className='accordion-button fs-4 fw-bold collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_19_body_19'
                          aria-expanded='false'
                          aria-controls='kt_accordion_19_body_19'
                        >
                          Wholesale and Distributors
                        </button>
                      </h2>
                      <div
                        id='kt_accordion_19_body_19'
                        className='accordion-collapse collapse'
                        aria-labelledby='kt_accordion_19_header_19'
                        data-bs-parent='#kt_accordion_19'
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
                  <button type='button' className='btn btn-warning' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    data-bs-dismiss='modal'
                    onClick={toggleHandler}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img src={VR_sample} alt='' className='img-fluid w-100' />
      </div>
    </>
  )
}

export default BusinessValuationReport
