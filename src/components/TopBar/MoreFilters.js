import React, {useState} from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import './abc.css'

const MoreFilters = () => {
  const [keyword, setKeyWord] = useState()
  const [year, setYear] = useState()
  const [listingId, setListingId] = useState()
  const [addDate, setAddDate] = useState('Add any Time')
  const [realEstateListings, setRealEstateListings] = useState('Showing All')
  const [brokerMember, setBrokerMember] = useState('No preference')
  const [brokerCertificate, setBrokerCertificate] = useState('No preference')
  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'keyWord':
        await setKeyWord(e.target.value)
        break

      case 'year':
        await setYear(e.target.value)
        break
      case 'listingId':
        await setListingId(e.target.value)
        break
    }
  }
  const multiSelectChange = async (e) => {
    switch (e.target.name) {
      case 'add-date':
        await setAddDate(e.target.value)
        break

      case 'real-estate-listing':
        await setRealEstateListings(e.target.value)
        break
      case 'broker-member-ship':
        await setBrokerMember(e.target.value)
        break
      case 'broker-certificate':
        await setBrokerCertificate(e.target.value)
        break
    }
  }

  const submit = () => {
    console.log(
      keyword,
      year,
      addDate,
      realEstateListings,
      brokerMember,
      brokerCertificate,
      listingId
    )
  }

  return (
    <>
      <div>
        <button
         style={{color:"#808080"}}
          type='button'
          className='btn btn-white'
          data-bs-toggle='modal'
          data-bs-target='#kt_modal_filters'
        >
          More Files<MdOutlineKeyboardArrowDown className='ms-10 fs-2 text-primary'/>
        </button>
        <div className='modal fade' tabIndex={-1} id='kt_modal_filters'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header p-3'>
                <h5 className='modal-title ps-4'>More Filters</h5>
                {/*begin::Close*/}
                <div
                  className='btn btn-icon btn-sm text-dark ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <span className='fs-2'>🗙</span>
                </div>
                {/*end::Close*/}
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='mb-10 col-12'>
                      <label htmlFor='exampleFormControlInput1' className=' form-label'>
                        Keyword
                      </label>
                      <input
                        type='text'
                        name='keyWord'
                        value={keyword}
                        className='form-control form-control-solid'
                        placeholder='ex. FedEx, Relocatable, etc.'
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                    <div className='mb-10 col-12'>
                      <label htmlFor='exampleFormControlInput1' className=' form-label'>
                        Add Date
                      </label>
                      <div>
                        {/*begin::Input group*/}
                        <div>
                          <select
                            className='form-select form-select-solid'
                            id='floatingSelect'
                            name='add-date'
                            aria-label='Floating label select example'
                            onChange={(e) => multiSelectChange(e)}
                          >
                            <option selected>Add any Time</option>

                            <option value='Last 3 days'>Last 3 days</option>

                            <option value='Last 7 days'>Last 7 days</option>
                            <option value='Last 30 days'>Last 30 days</option>
                          </select>
                        </div>
                        {/*end::Input group*/}
                      </div>
                    </div>
                    <div className='mb-10 col-12'>
                      <label htmlFor='exampleFormControlInput1' className=' form-label'>
                        Established After Year
                      </label>
                      <input
                        type='number'
                        name='year'
                        value={year}
                        className='form-control form-control-solid'
                        placeholder='YYYY'
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                  </div>
                  <div className='col-6 '>
                    <label htmlFor='exampleFormControlInput1' className=' form-label'>
                      Additional Filters
                    </label>

                    <div className='form-check form-switch mb-7 mt-4'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                        defaultChecked
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Hide listings without price
                      </label>
                    </div>
                    <div className='form-check form-switch my-7'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                        defaultChecked
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Hide home-based businesses
                      </label>
                    </div>
                    <div className='form-check form-switch my-7'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                        defaultChecked
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Must have seller financing
                      </label>
                    </div>
                    <div className='form-check form-switch my-7'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Must have real estate included
                      </label>
                    </div>
                    <div className='form-check form-switch my-7'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                        defaultChecked
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Must allow absentee owner
                      </label>
                    </div>
                    <div className='form-check form-switch mt-7'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Include relocatable listings
                      </label>
                    </div>
                    {/* <div className='form-check form-switch my-7'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                      />
                      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                        Hide new franchise opportunities
                      </label>
                    </div> */}
                  </div>
                </div>
                <div className='row'>
                  <div className='mb-10 col-6'>
                    <label htmlFor='exampleFormControlInput1' className=' form-label'>
                      Real Estate Listings
                    </label>
                    <div>
                      {/*begin::Input group*/}
                      <div>
                        <select
                          className='form-select form-select-solid'
                          id='floatingSelect'
                          name='real-estate-listing'
                          aria-label='Floating label select example'
                          onChange={(e) => multiSelectChange(e)}
                        >
                          <option selected>Showing All</option>
                          <option value='For Sale'>For Sale</option>
                          <option value='For Lease'>For Lease</option>
                        </select>
                      </div>
                      {/*end::Input group*/}
                    </div>
                  </div>
                  <div className=' col-6'>
                    <label htmlFor='exampleFormControlInput1' className=' form-label'>
                      Listing id
                    </label>
                    <input
                      type='text'
                      name='listingId'
                      value={listingId}
                      className='form-control form-control-solid'
                      placeholder='Enter listing number'
                      onChange={(e) => inputChange(e)}
                    />
                  </div>
                  <label htmlFor='exampleFormControlInput1' className=' form-label d-block'>
                    Gross Revenue
                  </label>
                  <div className='  col-6  d-flex'>
                    <select className=' form-select form-select-solid'>
                      <option value>Min Price</option>

                      <option value={1}>$50,000</option>
                      <option value={2}> $100,000</option>
                      <option value={4}> $150,000</option>
                      <option value={5}> $200,000</option>
                      <option value={6}> $300,000</option>
                      <option value={7}> $500,000</option>
                      <option value={8}>$750,000</option>
                      <option value={8}> $1,000,000</option>

                      <option value={8}>$2,000,000</option>

                      <option value={8}> $3,000,000</option>
                    </select>
                    {/* <span className='mx-auto my-auto'>to</span> */}
                  </div>
                  <div className='col-6'>
                    <select className=' form-select form-select-solid'>
                      <option value>Max Price</option>
                      <option value={1}>$50,000</option>
                      <option value={2}> $100,000</option>
                      <option value={4}> $150,000</option>
                      <option value={5}> $200,000</option>
                      <option value={6}> $300,000</option>
                      <option value={7}> $500,000</option>
                      <option value={8}>$750,000</option>
                      <option value={8}> $1,000,000</option>

                      <option value={8}>$2,000,000</option>

                      <option value={8}> $3,000,000</option>
                    </select>
                  </div>
                  <label htmlFor='exampleFormControlInput1' className='mt-5 form-label d-block'>
                    Cash Flow
                  </label>
                  <div className='col-6   '>
                    <select className=' form-select form-select-solid'>
                      <option value>Min Price</option>
                      <option value={1}>$50,000</option>
                      <option value={2}> $100,000</option>
                      <option value={4}> $150,000</option>
                      <option value={5}> $200,000</option>
                      <option value={6}> $300,000</option>
                      <option value={7}> $500,000</option>
                      <option value={8}>$750,000</option>
                      <option value={8}> $1,000,000</option>

                      <option value={8}>$2,000,000</option>

                      <option value={8}> $3,000,000</option>
                    </select>
                    {/* <span className='my-auto'>to</span> */}
                  </div>
                  <div className='col-6'>
                    <select className=' form-select form-select-solid'>
                      <option value>Max Price</option>
                      <option value={1}>$50,000</option>
                      <option value={2}> $100,000</option>
                      <option value={4}> $150,000</option>
                      <option value={5}> $200,000</option>
                      <option value={6}> $300,000</option>
                      <option value={7}> $500,000</option>
                      <option value={8}>$750,000</option>
                      <option value={8}> $1,000,000</option>

                      <option value={8}>$2,000,000</option>

                      <option value={8}> $3,000,000</option>
                    </select>
                  </div>
                  <div className='mt-5 pt-3 col-6'>
                    <label htmlFor='exampleFormControlInput1' className=' form-label'>
                      Broker Membership Preference
                    </label>
                    <div>
                      {/*begin::Input group*/}
                      <div>
                        <select
                          className='form-select form-select-solid'
                          id='floatingSelect'
                          name='broker-member-ship'
                          aria-label='Floating label select example'
                          onChange={(e) => multiSelectChange(e)}
                        >
                          <option selected>No preference</option>
                          <option value='IBBA membership only'>IBBA membership only</option>
                          <option value='M&A Source membership only'>
                            M&A Source membership only
                          </option>
                        </select>
                      </div>
                      {/*end::Input group*/}
                    </div>
                  </div>{' '}
                  <div className='mt-5 pt-3 col-6 '>
                    <label htmlFor='exampleFormControlInput1' className=' form-label'>
                      Broker Certification Preference
                    </label>
                    <div>
                      {/*begin::Input group*/}
                      <div>
                        <select
                          className='form-select form-select-solid'
                          id='floatingSelect'
                          name='broker-certificate'
                          aria-label='Floating label select example'
                          onChange={(e) => multiSelectChange(e)}
                        >
                          <option selected>No preference</option>
                          <option value='Certified Business Intermediary (CBI)'>
                            Certified Business Intermediary (CBI)
                          </option>
                          <option value='Merger & Acq. Master Intermediary (M&AMI)'>
                            Merger & Acq. Master Intermediary (M&AMI)
                          </option>
                        </select>
                      </div>
                      {/*end::Input group*/}
                    </div>
                  </div>
                </div>
              </div>

              <div className='modal-footer d-flex justify-content-between'>
                <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => submit()}
                  data-bs-dismiss='modal'
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoreFilters
