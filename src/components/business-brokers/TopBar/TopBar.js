import React, {useState, useEffect} from 'react'

import Multiselect from 'multiselect-react-dropdown'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

import {KTSVG} from '../../../_metronic/helpers'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import ClearIcon from '../../../assets/landing-bg/clear-black.svg'
import SaveSearchesIcon from '../../../assets/landing-bg/saveSearches.png'
import {
  getCountries,
  getStates,
  getCities,
  getFranchisesTypes,
} from '../../services/get-fields-data'
import {GrLocation} from 'react-icons/gr'
import {useDispatch} from 'react-redux'
import {getFilteredData, saveBrokerSearch} from '../../services/broker-services/Index'
import filterLocation from '../../../assets/topbar/location.svg'
import priceFilterIcon from '../../../assets/topbar/more-filters.svg'
import brokerTag from '../../../assets/topbar/broker-tag-icon.svg'
import clear from '../../../assets/topbar/clear.svg'
import './Searchbar.css'
import './multiselect.css'
const TopBar = (props) => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  let dispatch = useDispatch()
  const [countryValue, setCountryValue] = useState(false)
  const [stateValue, setStateValue] = useState(false)
  const [cityValue, setCityValue] = useState(false)
  const [buttonTopbar, setButtonTopbar] = useState(false)
  const [locationValue, setLocationValue] = useState(null)
  const [statesValue, setStatesValue] = useState(null)
  const [citiesValue, setCitiesValue] = useState(null)
  const [keyword, setKeyWord] = useState('')
  const [BrokerMoreFilters, setBrokerMoreFilters] = useState([
    {id: 'Member of Broker Association', name: 'Member of Broker Association'},
    {id: 'Certified Broker', name: 'Certified Broker'},
    {id: 'Licensed Broker', name: 'Licensed Broker'},
  ])
  const [brokerFilter, setBrokerFilter] = useState([])

  const localStorageCityID = localStorage.getItem('brokerCityID')
  const transformedcityID = JSON?.parse(localStorageCityID)
  const cityID = transformedcityID ?? ''

  const localStorageCountryID = localStorage.getItem('brokerCountryID')
  const transformedcountryID = JSON?.parse(localStorageCountryID)
  const countryID = transformedcountryID ?? ''

  const localStorageStateID = localStorage.getItem('brokerStateID')
  const transformedstateID = JSON?.parse(localStorageStateID)
  const stateID = transformedstateID ?? ''

  const brokerLocationObj = JSON?.parse(localStorage.getItem('brokerLocationFilter'))
  const brokerKeyword = localStorage.getItem('brokerKeyword')
  const brokerMoreFilterValue = JSON?.parse(localStorage.getItem('brokerMoreFilters'))

  const [allCountries, setAllCountries] = useState([])
  const [value, setValue] = useState(false)

  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  let page = 1
  useEffect(() => {
    if (brokerLocationObj) {
      setLocationValue(brokerLocationObj?.locationValue)

      setStatesValue(brokerLocationObj?.statesValue)
      setCitiesValue(brokerLocationObj?.citiesValue)
    }
    setKeyWord(brokerKeyword)
    setBrokerFilter(brokerMoreFilterValue)
    getAllCountries()
    // getSearchData()
  }, [])

  const getAllCountries = async () => {
    let mapCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result?.countries?.map((item, index) => mapCountries.push({id: item.id, name: item.name}))
        filterCountries = mapCountries.filter((x) => {
          return x.id !== 39 && x.id !== 233
        })
        filterCountries.unshift({id: 233, name: 'United States'}, {id: 39, name: 'Canada'})
        setAllCountries(filterCountries)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getAllStates = async (countryID) => {
    let mapStates = []

    try {
      const result = await getStates(countryID)

      if (result.status === true) {
        result?.states?.map((item, index) => mapStates.push({id: item.id, name: item.name}))
        setAllStates(mapStates)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getAllCities = async (stateID) => {
    let mapCities = []
    try {
      const result = await getCities(stateID)

      if (result.status === true) {
        result?.cities?.map((item, index) => mapCities.push({id: item.id, name: item.name}))
        setAllCities(mapCities)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getSearchData = async (page, cityID, countryID, stateID, keyword, brokerFilter) => {
    await props.getFilterData('result', 1)
  }

  const locationChange = async (e) => {
    let countryIDArray = []
    let countryNameArray = []
    await setLocationValue(e)
    setCountryValue(true)
    setCityValue(false)
    setStateValue(false)
    countryIDArray = e.map((item, index) => {
      return item.id
    })
    countryNameArray = e.map((item, index) => {
      return item.name
    })

    if (e?.length == 0 || e == null) {
      setCitiesValue('')
      setStatesValue('')
      countryNameArray = []
      localStorage.setItem('brokerStateID', JSON.stringify([]))
      localStorage.setItem('brokerCityID', JSON.stringify([]))
    }
    localStorage.setItem('brokerCountryID', JSON.stringify(countryNameArray))
    getAllStates(countryIDArray)
  }
  const stateLocationChange = async (e) => {
    let stateIDArray = []
    let stateNameArray = []
    await setStatesValue(e)
    setStateValue(true)
    setCountryValue(false)
    setCityValue(false)
    stateIDArray = e.map((item, index) => {
      return item.id
    })
    stateNameArray = e.map((item, index) => {
      return item.name
    })

    if (e?.length == 0 || e == null) {
      setCitiesValue('')
      stateNameArray = []
      localStorage.setItem('brokerCityID', JSON.stringify([]))
    }
    localStorage.setItem('brokerStateID', JSON.stringify(stateNameArray))
    getAllCities(stateIDArray)
  }
  const citiesLocationHandler = async (e) => {
    let cityNameArray = []
    let cityArray = []
    await setCitiesValue(e)
    setCityValue(true)
    setStateValue(false)
    setCountryValue(false)
    cityArray = e.map((item, index) => {
      return item.id
    })
    cityNameArray = e.map((item, index) => {
      return item.name
    })

    localStorage.setItem('brokerCityID', JSON.stringify(cityNameArray))
  }

  const MoreFilterValueHandler = async (e) => {
    await setBrokerFilter(e)
    setValue(true)
  }
  const brokerKeyWordHandler = async () => {
    localStorage.setItem('brokerKeyword', keyword)

    getSearchData(page, cityID, countryID, stateID, keyword, brokerFilter)
    if (pathname == '/business-brokers') {
      navigate('/search-for-broker')
    }
  }
  const saveBrokerMoreFilters = async () => {
    localStorage.setItem('brokerMoreFilters', JSON.stringify(brokerFilter))
    getSearchData(page, cityID, countryID, stateID, keyword, brokerFilter)
    if (pathname == '/business-brokers') {
      navigate('/search-for-broker')
    }
  }
  const SaveLocationValue = async () => {
    let locations = {locationValue, statesValue, citiesValue}
    setValue(false)
    await localStorage.setItem('brokerLocationFilter', JSON.stringify(locations))
    const localStorageCityID = localStorage.getItem('brokerCityID')
    const transformedcityID = JSON?.parse(localStorageCityID)
    const cityID = transformedcityID ?? ''

    const localStorageCountryID = localStorage.getItem('brokerCountryID')
    const transformedcountryID = JSON?.parse(localStorageCountryID)
    const countryID = transformedcountryID ?? ''

    const localStorageStateID = localStorage.getItem('brokerStateID')
    const transformedstateID = JSON?.parse(localStorageStateID)
    const stateID = transformedstateID ?? ''

    const result = saveBrokerSearch(locationValue)

    getSearchData(page, cityID, countryID, stateID, keyword, brokerFilter)

    if (pathname == '/business-brokers') {
      navigate('/search-for-broker')
    }
  }
  const searchForBrokers = async () => {
    let locations = {locationValue, statesValue, citiesValue}

    await localStorage.setItem('brokerLocationFilter', JSON.stringify(locations))
    const localStorageCityID = localStorage.getItem('brokerCityID')
    const transformedcityID = JSON?.parse(localStorageCityID)
    const cityID = transformedcityID ?? ''

    const localStorageCountryID = localStorage.getItem('brokerCountryID')
    const transformedcountryID = JSON?.parse(localStorageCountryID)
    const countryID = transformedcountryID ?? ''

    const localStorageStateID = localStorage.getItem('brokerStateID')
    const transformedstateID = JSON?.parse(localStorageStateID)
    const stateID = transformedstateID ?? ''

    const result = saveBrokerSearch(locationValue)

    getSearchData(page, cityID, countryID, stateID, keyword, brokerFilter)

    if (pathname == '/business-brokers') {
      navigate('/search-for-broker')
    }
  }

  const ClearStates = () => {
    localStorage.removeItem('brokerLocationFilter')
    localStorage.removeItem('brokerKeyword')
    localStorage.removeItem('brokerStateID')
    localStorage.removeItem('brokerCityID')
    localStorage.removeItem('brokerCountryID')
    localStorage.removeItem('brokerMoreFilters')

    setLocationValue('')
    setStatesValue('')
    setCitiesValue('')
    setKeyWord('')
    setBrokerFilter('')

    getSearchData(page, '', '', '', '', '')
  }

  return (
    <>
      <div className='container py-3 ' style={{fontSize: '12px'}}>
        <div className=' d-flex gap-4 align-items-center justify-content-between'>
          <div className='text-start d-flex justify-content-between'>
            <div className=' px-2'>
              <div>
                <div className='search-container h-100 bg-white all-location px-2 d-none d-lg-block'>
                  <div className='d-flex align-items-center position-relative  h-100 pb-0'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen021.svg'
                      className='svg-icon-1 text-primary position-absolute  ps-3'
                    />
                    <button
                      style={{color: '#808080'}}
                      className='btn btn-white bg-white'
                      type='button'
                      data-bs-toggle='modal'
                      title='Filter by locations'
                      data-bs-target='#kt_modal_all-locations'
                      onClick={() => {
                        setButtonTopbar(!buttonTopbar)
                        setCountryValue(false)
                        setStateValue(false)
                        setCityValue(false)
                      }}
                    >
                      <span className='ps-7 text-nowrap px-6 pe-20'>Search By Locations</span>
                      {locationValue ? (
                        <>
                          {locationValue?.length > 0 ||
                          statesValue?.length > 0 ||
                          citiesValue?.length > 0 ? (
                            <>
                              (
                              <span>
                                {locationValue?.length > 0 ? (
                                  <span>{locationValue.length},</span>
                                ) : null}
                                {statesValue ? (
                                  <>
                                    <span>
                                      {statesValue?.length > 0 ? (
                                        <span>{statesValue.length},</span>
                                      ) : null}
                                      {citiesValue ? (
                                        <>
                                          <span>
                                            {citiesValue.length > 0 ? (
                                              <span>{citiesValue.length}</span>
                                            ) : null}
                                          </span>
                                        </>
                                      ) : null}
                                    </span>
                                  </>
                                ) : null}
                              </span>
                              )
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </button>
                  </div>
                </div>
                <img
                  src={filterLocation}
                  className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_all-locations'
                />
                <div className='modal fade ' tabIndex={-1} id='kt_modal_all-locations'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div
                        className='modal-header p-3'
                        onClick={() => {
                          setCountryValue(false)
                          setStateValue(false)
                          setCityValue(false)
                        }}
                      >
                        <h5 className='modal-title ps-4'>All Locations</h5>

                        <button
                          type='button'
                          className='btn-close me-1'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                      </div>
                      <div
                        className='px-7 pt-5 pb-3'
                        style={{overflowY: 'scroll', maxHeight: '70vh'}}
                      >
                        <div className={` pb-0 `}>
                          <label htmlFor=''>Countries</label>
                          <div
                            className={` ${countryValue == true ? 'pading1 ' : ''} `}
                            onMouseDown={() => {
                              setStateValue(false)
                              setCityValue(false)
                              setCountryValue(true)
                            }}
                          >
                            <Multiselect
                              options={allCountries}
                              selectedValues={locationValue}
                              onSelect={locationChange} // Options to display in the dropdown
                              // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                              // onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={locationChange} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                              placeholder='Countries  '
                              showArrow={false}
                              singleSelect={false}
                              closeIcon={false}
                              showCheckbox={true}
                              style={{
                                searchBox: {
                                  // To change search box element look
                                  fontSize: 12,
                                  // minHeight: 34,
                                  // maxHeight: 35,
                                  backgroundColor: '#e7f3fc',
                                },
                                option: {
                                  // To change css for dropdown options

                                  color: 'black',
                                  // backgroundColor: '#f5f8fa',
                                },
                              }}
                            />
                          </div>
                          <label htmlFor='' className='mt-4'>
                            States
                          </label>
                          <div
                            className={` ${stateValue == true ? 'pading2' : ''} `}
                            onMouseDown={() => {
                              setCountryValue(false)
                              setCityValue(false)
                              setStateValue(true)
                            }}
                          >
                            <Multiselect
                              disable={
                                locationValue?.length == 0 || locationValue == null ? true : false
                              }
                              options={allStates}
                              selectedValues={statesValue}
                              onSelect={stateLocationChange} // Options to display in the dropdown
                              // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                              // onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={stateLocationChange} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                              placeholder='States  '
                              showArrow={false}
                              singleSelect={false}
                              closeIcon={false}
                              showCheckbox={true}
                              style={{
                                searchBox: {
                                  // To change search box element look
                                  fontSize: 12,
                                  // minHeight: 34,
                                  // maxHeight: 35,
                                  backgroundColor: '#e7f3fc',
                                },
                                option: {
                                  // To change css for dropdown options

                                  color: 'black',
                                  // backgroundColor: '#f5f8fa',
                                },
                              }}
                            />
                          </div>
                          <label htmlFor='' className='mt-4'>
                            Cities
                          </label>
                          <div
                            className={` ${cityValue == true ? 'pading3' : ''} `}
                            onMouseDown={() => {
                              setCountryValue(false)
                              setStateValue(false)
                              setCityValue(true)
                            }}
                          >
                            <Multiselect
                              disable={
                                statesValue?.length == 0 || statesValue == null ? true : false
                              }
                              options={allCities}
                              selectedValues={citiesValue}
                              onSelect={citiesLocationHandler} // Options to display in the dropdown
                              // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                              // onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={citiesLocationHandler} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                              placeholder='Cities  '
                              showArrow={false}
                              singleSelect={false}
                              closeIcon={false}
                              showCheckbox={true}
                              style={{
                                searchBox: {
                                  // To change search box element look
                                  fontSize: 12,
                                  // minHeight: 34,
                                  // maxHeight: 35,
                                  backgroundColor: '#e7f3fc',
                                },
                                option: {
                                  // To change css for dropdown options

                                  color: 'black',
                                  // backgroundColor: '#f5f8fa',
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className=' d-flex justify-content-between py-5 px-7'
                        onClick={() => {
                          setCountryValue(false)
                          setStateValue(false)
                          setCityValue(false)
                        }}
                      >
                        <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                          Close
                        </button>
                        <button
                          type='button'
                          className='btn btn-primary'
                          onClick={(e) => SaveLocationValue(e)}
                          data-bs-dismiss='modal'
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className='d-none d-lg-block px-2'>
                  <button
                    style={{color: '#808080'}}
                    className='btn btn-white text-nowrap '
                    type='button'
                    title='Filter by keywords'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_listingTypes'
                    onClick={() => {
                      setButtonTopbar(!buttonTopbar)
                      setValue(false)
                    }}
                  >
                    Search By Keyword
                    <MdOutlineKeyboardArrowDown className='ms-2 fs-2 text-primary' />
                  </button>
                </div>
                {/* Modal  */}
                <img
                  src={brokerTag}
                  className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_listingTypes'
                />
                <div className='modal fade ' tabIndex={-1} id='kt_modal_listingTypes'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header p-3'>
                        <h5 className='modal-title ps-4'>Keyword</h5>

                        <button
                          type='button'
                          className='btn-close me-1'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                        {/*end::Close*/}
                      </div>
                      <div className={`modal-body pb-0 ${value ? 'close-menu' : ''} `}>
                        <div className='mb-10 col-12 mt-5 '>
                          <label htmlFor='exampleFormControlInput1' className=' form-label'>
                            Keyword
                          </label>
                          <input
                            type='text'
                            name='keyWord'
                            value={keyword}
                            className='form-control form-control-solid'
                            placeholder='Search By Keyword'
                            onChange={(e) => setKeyWord(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className=' d-flex justify-content-between py-4 px-7'>
                        <button
                          type='button'
                          className='btn btn-light'
                          data-bs-dismiss='modal'
                          onClick={() => setValue(true)}
                        >
                          Close
                        </button>
                        <button
                          type='button'
                          className='btn btn-primary'
                          onClick={(e) => brokerKeyWordHandler(e)}
                          data-bs-dismiss='modal'
                          onMouseDown={() => setValue(true)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='d-none d-lg-block px-2'>
                <div>
                  <button
                    style={{color: '#808080'}}
                    className='btn btn-white text-nowrap'
                    type='button'
                    title='Filter by cash flow'
                    onClick={() => {
                      setButtonTopbar(!buttonTopbar)
                      setValue(false)
                    }}
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_More_Filter'
                  >
                    More Filters
                    <span className='ms-17'></span>
                    {brokerFilter?.length > 0 ? (
                      <span className='text-end '>({brokerFilter?.length})</span>
                    ) : null}
                    <MdOutlineKeyboardArrowDown className=' fs-2 text-primary' />
                  </button>
                </div>
                {/* Price Modal  */}
              </div>
              <img
                src={priceFilterIcon}
                className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons-price biz-owner-filter-icon'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_More_Filter'
                style={{width: '25px'}}
              />
              <div className='modal fade ' tabIndex={-1} id='kt_modal_More_Filter'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header p-3'>
                      <h5 className='modal-title fw-normal ps-4'>More Filters</h5>

                      <button
                        type='button'
                        className='btn-close me-1'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className={`modal-body pb-0 ${value ? 'pading' : ''} `}>
                      <div className='row'>
                        <div className='col-12'>
                          <Multiselect
                            options={BrokerMoreFilters}
                            selectedValues={brokerFilter}
                            onSelect={MoreFilterValueHandler} // Options to display in the dropdown
                            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            // onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={MoreFilterValueHandler} // Function will trigger on remove event
                            displayValue='name' // Property name to display in the dropdown options
                            placeholder='More Filters  '
                            showArrow={false}
                            singleSelect={false}
                            closeIcon={false}
                            showCheckbox={true}
                            style={{
                              searchBox: {
                                // To change search box element look
                                fontSize: 12,
                                // minHeight: 34,
                                // maxHeight: 35,
                                backgroundColor: '#e7f3fc',
                              },
                              option: {
                                // To change css for dropdown options

                                color: 'black',
                                // backgroundColor: '#f5f8fa',
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className='modal-footer d-flex justify-content-between p-3'>
                        <button
                          type='button'
                          className='btn btn-light'
                          data-bs-dismiss='modal'
                          onMouseDown={() => setValue(true)}
                        >
                          Close
                        </button>

                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-dismiss='modal'
                          onMouseDown={() => setValue(true)}
                          onClick={saveBrokerMoreFilters}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=' px-2'>
              <button
                style={{backgroundColor: '#DDDDDD', color: '#808080'}}
                className='btn text-nowrap px-7 d-none d-lg-block'
                type='button'
                title='Clear all filters'
                onClick={() => {
                  setButtonTopbar(!buttonTopbar)
                  ClearStates()
                }}
              >
                <img
                  src={ClearIcon}
                  onClick={() => {
                    setButtonTopbar(!buttonTopbar)
                    ClearStates()
                  }}
                />{' '}
                Clear
              </button>
              <img
                src={clear}
                className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons biz-owner-filter-icons-clear'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_filters'
              />
            </div>
          </div>
          {/* {pathname == '/franchise-for-sale' ? ( */}
          <div className='dropdown  d-md-block '>
            <Link to='/search-for-broker'>
              <button
                type='button'
                className='btn btn-primary  px-sm-12 rounded-pill py-1 py-sm-3'
                data-bs-toggle='modal'
                title='Search'
                data-bs-target='#kt_modal_Save_Search'
                onClick={(e) => searchForBrokers(e)}
              >
                Search
              </button>
            </Link>
          </div>
          {/* ):(null)

          } */}
        </div>
      </div>
    </>
  )
}

export default TopBar
