import React, {useState, useEffect} from 'react'

import Multiselect from 'multiselect-react-dropdown'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {useDispatch} from 'react-redux'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import {KTCard, KTCardBody, KTSVG} from '../../_metronic/helpers'
import {useParams, useLocation, Link, useNavigate} from 'react-router-dom'
import ClearIcon from '../../assets/landing-bg/clear-black.svg'
import SaveSearchesIcon from '../../assets/landing-bg/saveSearches.png'
import filterIcon from '../../assets/adminIcons/filterIcon.svg'
import activeFranchise from '../../assets/activeFranchiseIcon.svg'
import inactiveFranchise from '../../assets/inactiveFranchiseIcon.svg'
import {
  getCountries,
  getStates,
  getCities,
  getFranchisesTypes,
} from '../../components/services/get-fields-data'
import {
  getFilteredData,
  updateFranchiseStatus,
} from '../../components/services/buy-a-franchises/index'
import activeIcon from '../../assets/active-user-icon.svg'
import inactiveIcon from '../../assets/inactive-user-icon.svg'
import filterLocation from '../../assets/topbar/location.svg'
import listingFilterIcon from '../../assets/topbar/listing-type.svg'
import priceFilterIcon from '../../assets/topbar/price-range.svg'
import clear from '../../assets/topbar/clear.svg'
import './Searchbar.css'
import './multiselect.css'
import Swal from 'sweetalert2'
import {BsFillEyeFill} from 'react-icons/bs'
import {getFranchiseListingData} from '../../components/services/admin-services/manage-listings/Index'
import Pagination from '../../common component/Pagination'
const Franchises = (props) => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const {franchiseID} = useParams()
  const [paramFranchiseID, setParamFranchiseID] = useState([])

  const [industry, setIndustry] = useState('')
  const [allFranchises, setAllFranchises] = useState([])
  const [listing, setListing] = useState([])
  const [minPriceRange, setMinPriceRange] = useState('')
  const [maxPriceRange, setMaxPriceRange] = useState('')
  const [buttonTopbar, setButtonTopbar] = useState(false)

  const [isShowSearchButton, setIsShowSearchButton] = useState([])
  const [locationValue, setLocationValue] = useState(null)
  const [statesValue, setStatesValue] = useState(null)
  const [citiesValue, setCitiesValue] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [minCond, setMinCond] = useState(true)
  const [maxCond, setMaxCond] = useState(true)
  const [value, setValue] = useState(false)
  const [isShowFilterTopBar, setIsShowFilterTopBar] = useState(false)
  const [countryValue, setCountryValue] = useState(false)
  const [stateValue, setStateValue] = useState(false)
  const [cityValue, setCityValue] = useState(false)
  const [title, setTitle] = useState('')
  const [franchiseIDForDB, setFranchiseIDForDB] = useState([])
  let page = 1

  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  let industryName = JSON?.parse(localStorage.getItem('industriesName'))
  let franchiseMaxPrice1 = JSON?.parse(localStorage.getItem('f_maxPrice'))
  let franchiseMinPrice1 = JSON?.parse(localStorage.getItem('f_minPrice'))
  let franchiseListingName = JSON?.parse(localStorage.getItem('franchiseListingName'))
  const localStoragefranchisesID = localStorage.getItem('franchisesID')
  const transformedfranchisesID = JSON?.parse(localStoragefranchisesID)
  const {franchisesID} = transformedfranchisesID ?? ''

  const localStorageMinPrice = localStorage.getItem('f_minPrice')
  const transformedminPrice = JSON?.parse(localStorageMinPrice)
  const {f_minPrice} = transformedminPrice ?? ''

  const localStoragemaxPrice = localStorage.getItem('f_maxPrice')
  const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)
  const {f_maxPrice} = transformedmaxPrice ?? ''

  const localStorageCityID = localStorage.getItem('franchiseCityID')
  const transformedcityID = JSON?.parse(localStorageCityID)
  let cityID = transformedcityID ?? ''

  const localStorageCountryID = localStorage.getItem('franchiseCountryID')
  const transformedcountryID = JSON?.parse(localStorageCountryID)
  let countryID = transformedcountryID ?? ''

  const localStorageStateID = localStorage.getItem('franchiseStateID')
  const transformedstateID = JSON?.parse(localStorageStateID)
  let stateID = transformedstateID ?? ''

  const filterValue = JSON?.parse(localStorage.getItem('franchiseLocationFilter'))
  const [loader, setLoader] = useState('')

  const [allUsers, setAllUsers] = useState([])

  const [lastPage, setLastPage] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [forFranchiseData, setForFranchiseData] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  useEffect(() => {
    let ID = parseInt(franchiseID)
    setParamFranchiseID([ID])
  }, [franchiseID])
  useEffect(() => {
    if (
      filterValue ||
      industryName ||
      f_minPrice ||
      f_maxPrice ||
      franchiseListingName ||
      franchiseMaxPrice1 ||
      franchiseMinPrice1
    ) {
      setIsShowFilterTopBar(true)
    }

    if (filterValue) {
      setLocationValue(filterValue.locationValue)

      setStatesValue(filterValue.statesValue)
      setCitiesValue(filterValue.citiesValue)

      // var last = items.slice(-1)[0]
      // setInputValue(last.name)
    }
    if (industryName) {
      setIndustry(industryName)
    }

    if (f_minPrice) {
      setMinPriceRange(f_minPrice)
    }
    if (f_maxPrice) {
      setMaxPriceRange(f_maxPrice)
    }
    if (franchiseListingName) {
      setListing(franchiseListingName)
    }
    if (franchiseMaxPrice1) {
      setMaxPriceRange(franchiseMaxPrice1.maxPrice)
    }
    if (franchiseMinPrice1) {
      setMinPriceRange(franchiseMinPrice1.minPrice)
    }
    getFranchiseTypes()
    getAllCountries()
  }, [])

  useEffect(() => {
    getAllFranchiseListings(1, '', f_minPrice, f_maxPrice, cityID, countryID, stateID, franchisesID)
  }, [])

  const getAllFranchiseListings = async (
    page,
    search,
    minRange,
    maxRange,
    city,
    country,
    state,
    franchiseIDs
  ) => {
    setForFranchiseData([])
    try {
      setLoader(false)
      const result = await getFranchiseListingData(
        page,
        search,
        minRange,
        maxRange,
        city,
        country,
        state,
        franchiseIDs ?? [],
        accessToken
      )
      console.log('result', result)
      if (result.status === true) {
        setLoader(true)

        setLastPage(result.franchises.last_page)
        setForFranchiseData(result.franchises?.data)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }

  const getAllCountries = async () => {
    let mapCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result.countries.map((item, index) => mapCountries.push({id: item.id, name: item.name}))
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
        result.states.map((item, index) => mapStates.push({id: item.id, name: item.name}))
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
        result.cities.map((item, index) => mapCities.push({id: item.id, name: item.name}))
        setAllCities(mapCities)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const getFranchiseTypes = async () => {
    let mapFranchises = []
    try {
      const result = await getFranchisesTypes()
      if (result.status === true) {
        result.data.map((item, index) => mapFranchises.push({id: item.id, name: item.name}))
        setAllFranchises(mapFranchises)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const listingChange = async (e) => {
    await setListing(e)
    setValue(true)
  }
  const SaveListingData = async () => {
    setValue(false)
    let franchiseIdies = []
    listing.map((listID, index) => {
      franchiseIdies.push(listID.id)
    })

    localStorage.setItem(
      'franchisesID',
      JSON.stringify({
        franchisesID: franchiseIdies,
      })
    )

    localStorage.setItem('franchiseListingName', JSON.stringify(listing))

    const localStoragefranchisesID = localStorage.getItem('franchisesID')
    const transformedfranchisesID = JSON?.parse(localStoragefranchisesID)
    const {franchisesID} = transformedfranchisesID ?? ''
    setIsShowSearchButton(franchisesID)
    setFranchiseIDForDB(franchiseIdies)
    getAllFranchiseListings(
      1,
      title,
      minPriceRange,
      maxPriceRange,
      cityID,
      countryID,
      stateID,
      franchiseIdies
    )
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
  }
  const SavePricesRange = async () => {
    localStorage.setItem(
      'f_minPrice',
      JSON.stringify({
        f_minPrice: minPriceRange,
      })
    )
    localStorage.setItem(
      'f_maxPrice',
      JSON.stringify({
        f_maxPrice: maxPriceRange,
      })
    )

    getAllFranchiseListings(
      1,
      title,
      minPriceRange,
      maxPriceRange,
      cityID,
      countryID,
      stateID,
      franchiseIDForDB
    )
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
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
    countryID = countryIDArray
    localStorage.setItem('franchiseCountryID', JSON.stringify(countryNameArray))
    if (e?.length == 0 || e == null) {
      setCitiesValue(null)
      setStatesValue(null)
      localStorage.setItem('franchiseCityID', JSON.stringify([]))
      localStorage.setItem('franchiseStateID', JSON.stringify([]))
    }
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
    stateID = stateIDArray

    localStorage.setItem('franchiseStateID', JSON.stringify(stateNameArray))
    if (e?.length == 0 || e == null) {
      setCitiesValue(null)
      localStorage.setItem('franchiseCityID', JSON.stringify([]))
    }
    getAllCities(stateIDArray)
  }
  const citiesLocationHandler = async (e) => {
    setCityValue(true)
    setStateValue(false)
    setCountryValue(false)
    let cityNameArray = []
    let cityArray = []
    await setCitiesValue(e)
    cityArray = e.map((item, index) => {
      return item.id
    })
    cityNameArray = e.map((item, index) => {
      return item.name
    })
    cityID = cityArray
    localStorage.setItem('franchiseCityID', JSON.stringify(cityNameArray))
  }
  const SaveLocationValue = async () => {
    setValue(false)
    let locations = {locationValue, statesValue, citiesValue}

    await localStorage.setItem('franchiseLocationFilter', JSON.stringify(locations))
    const localStorageCityID = localStorage.getItem('franchiseCityID')
    const transformedcityID = JSON?.parse(localStorageCityID)
    const cityIDs = transformedcityID ?? ''

    const localStorageCountryID = localStorage.getItem('franchiseCountryID')
    const transformedcountryID = JSON?.parse(localStorageCountryID)
    const countryIDs = transformedcountryID ?? ''

    const localStorageStateID = localStorage.getItem('franchiseStateID')
    const transformedstateID = JSON?.parse(localStorageStateID)
    const stateIDs = transformedstateID ?? ''

    getAllFranchiseListings(
      1,
      title,
      minPriceRange,
      maxPriceRange,
      cityIDs,
      countryIDs,
      stateIDs,
      franchiseIDForDB
    )

    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
  }

  const ClearStates = async () => {
    cityID = ''
    countryID = ''
    stateID = ''
    setMinPriceRange('')
    setMaxPriceRange('')
    localStorage.removeItem('franchiseLocationFilter')
    localStorage.removeItem('f_minPrice')
    localStorage.removeItem('f_maxPrice')
    localStorage.removeItem('franchiseListingName')
    localStorage.removeItem('franchiseCountryID')
    localStorage.removeItem('franchisesID')
    localStorage.removeItem('franchiseStateID')
    localStorage.removeItem('franchiseCityID')

    setListing('')
    setLocationValue('')
    setStatesValue('')
    setCitiesValue('')
    setTitle('')
    await getAllFranchiseListings(1, '', '', '', '', '', '', '')
    setIsShowFilterTopBar(false)
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
  }

  const minRange = [
    // {value: 'Any Min'},
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  ]
  const maxRange = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000]
  const showDropDown = () => {}
  const styles = {
    fontSize: 140,
    color: 'blue',
    with: 230,
  }
  const [min, setMin] = useState(minRange)
  const [max, setMax] = useState(maxRange)

  const MinPricesOnChangeHandler = (e) => {
    const minInputRange = e.target.value.replace(/\D/g, '')

    if (maxPriceRange && Number(maxPriceRange) < Number(minInputRange)) {
      setMaxCond(false)
      setMinCond(true)
    }
    if (maxPriceRange && Number(maxPriceRange) >= Number(minInputRange)) {
      setMaxCond(true)
      setMinCond(true)
    }
    if (minInputRange === null) {
      setMaxCond(true)
      setMinCond(true)
    }

    setMinPriceRange(minInputRange)
  }
  const MaxPricesOnChangeHandler = (e) => {
    const maxInputRange = e.target.value.replace(/\D/g, '')

    if (minPriceRange && Number(minPriceRange) > Number(maxInputRange)) {
      setMinCond(false)
      setMaxCond(true)
    }
    if (minPriceRange && Number(minPriceRange) <= Number(maxInputRange)) {
      setMaxCond(true)
      setMinCond(true)
    }
    if (e.nativeEvent.data === null && maxInputRange === '') {
      setMaxCond(true)
      setMinCond(true)
    }

    setMaxPriceRange(maxInputRange)
  }
  const MaxClickHandler = (e) => {
    let maxClick = e.target.value
    setMaxPriceRange(maxClick)
  }

  const MinClickHandler = (e) => {
    let minBe = e.target.value
    if (
      e.target.value <= maxPriceRange ||
      maxPriceRange == '' ||
      maxPriceRange == undefined ||
      e.target.value == 50000
    ) {
      setMinPriceRange(minBe)

      if (minBe) {
        let maxBe = max.map((maxVal, i) => parseInt(maxVal * 0) + minBe * (i + 2))
        setMax(maxBe)
      }
    }
  }

  ///////////////////////

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    getAllFranchiseListings(page, '', '', '', '', '', '', '')
  }
  const changeStatusHandler = async (id, status) => {
    const userData = localStorage.getItem('userData')
    const transformedData = JSON.parse(userData || '')
    const {accessToken} = transformedData
    console.log('accessToken', accessToken)
    const result = await Swal.fire({
      text: `Are you sure you want to ${status} this list?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Yes',
    })
    if (result.isConfirmed) {
      const statusResult = await updateFranchiseStatus(id, status, accessToken)
      if (statusResult.status === true) {
        Toast.fire({
          icon: 'success',
          title: `User ${status} successfully`,
        })
        let franchiseArray = [...forFranchiseData]
        console.log(statusResult)
        franchiseArray.map((item, index) => {
          if (item.id === statusResult.franchise.id) {
            franchiseArray[index].status = statusResult.franchise.status
          }
        })
        setForFranchiseData(franchiseArray)
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Please try again',
        })
      }
    } else if (result.isDismissed) {
      // console.log('isDenied')
    }
  }
  const userTypeFunction = (name) => {
    return name.toUpperCase()
  }
  const formateDate = (published) => {
    if (published) {
      const date = new Date(published)
      const options = {year: 'numeric', month: 'short', day: 'numeric'}
      const formatter = new Intl.DateTimeFormat('en-US', options)
      const formattedDate = formatter.format(date)
      return formattedDate
    } else {
      return `---`
    }
  }

  const searchHandler = (e) => {
    setTitle(e.target.value)
    getAllFranchiseListings(
      1,
      e.target.value,
      minPriceRange,
      maxPriceRange,
      cityID,
      countryID,
      stateID,
      franchiseIDForDB
    )
  }
  return (
    <>
      <>
        {isShowFilterTopBar ? (
          <div style={{marginTop: '-3%'}}>
            <KTCard className='rounded-0' backgroundColor='#081C3D'>
              <KTCardBody className='py-1 mb-0'>
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
                                className='btn btn-white bg-white pe-0'
                                type='button'
                                title='Filter by locations'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_all-locations'
                                onMouseDown={() => setValue(false)}
                                onClick={() => {
                                  setButtonTopbar(!buttonTopbar)
                                  setCountryValue(false)
                                  setStateValue(false)
                                  setCityValue(false)
                                }}
                              >
                                <span className='ps-7 text-nowrap px-6 pe-20'>All Locations</span>
                                {locationValue ? (
                                  <>
                                    {locationValue?.length > 0 ||
                                    statesValue?.length > 0 ||
                                    citiesValue?.length > 0 ? (
                                      <span>
                                        (
                                        <span>
                                          {locationValue.length > 0 ? (
                                            <span>{locationValue.length},</span>
                                          ) : null}
                                          {statesValue ? (
                                            <>
                                              <span>
                                                {statesValue.length > 0 ? (
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
                                      </span>
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
                                  <h5 className='modal-title ps-4'> Locations</h5>

                                  <button
                                    type='button'
                                    className='btn-close me-1'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div
                                  className='px-7 pt-5 pb-3'
                                  style={{overflowY: 'scroll', maxHeight: '50vh'}}
                                >
                                  <div
                                    className={`  `}
                                    // onMouseDown={() => {
                                    //   setCountryValue(false)
                                    //   setStateValue(false)
                                    //   setCityValue(false)
                                    // }}
                                  >
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
                                          locationValue?.length == 0 || locationValue == null
                                            ? true
                                            : false
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
                                          statesValue?.length == 0 || statesValue == null
                                            ? true
                                            : false
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
                                  className=' d-flex justify-content-between px-7 py-5'
                                  onClick={() => {
                                    setCountryValue(false)
                                    setStateValue(false)
                                    setCityValue(false)
                                  }}
                                >
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
                              className='btn btn-white text-nowrap px-3'
                              type='button'
                              data-bs-toggle='modal'
                              title='Filter by franchise catagories'
                              data-bs-target='#kt_modal_listingTypes'
                              onClick={() => {
                                setButtonTopbar(!buttonTopbar)
                                setValue(false)
                              }}
                            >
                              Franchise Catagories
                              {listing ? (
                                <span className='ms-md-7 '>
                                  {listing.length > 0 ? <span>({listing.length})</span> : null}
                                </span>
                              ) : null}
                              <MdOutlineKeyboardArrowDown className=' fs-2 text-primary' />
                            </button>
                          </div>
                          {/* Modal  */}
                          <img
                            src={listingFilterIcon}
                            className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_listingTypes'
                          />
                          <div className='modal fade ' tabIndex={-1} id='kt_modal_listingTypes'>
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header p-3' onClick={() => setValue(false)}>
                                  <h5 className='modal-title ps-4'> Franchise Catagories</h5>

                                  <button
                                    type='button'
                                    className='btn-close me-1'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                  {/*end::Close*/}
                                </div>
                                <div className='px-7 pt-5 pb-3' onClick={() => setValue(false)}>
                                  <div className={` ${value == true ? 'pading ' : ''} `}>
                                    <Multiselect
                                      options={allFranchises}
                                      selectedValues={listing}
                                      onSelect={(e) => listingChange(e)}
                                      onRemove={(e) => listingChange(e)}
                                      // Options to display in the dropdown
                                      // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                      // onSelect={this.onSelect} // Function will trigger on select event
                                      // onRemove={this.onRemove} // Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                      placeholder='Select Catagories '
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
                                        },
                                        optionContainer: {
                                          // To change css for option container
                                          border: '2 solid',
                                        },
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className=' d-flex justify-content-between py-5 px-7'
                                  onClick={() => setValue(false)}
                                >
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
                                    onClick={(e) => SaveListingData(e)}
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
                        <div className='d-none d-lg-block px-2'>
                          <div>
                            <button
                              style={{color: '#808080'}}
                              className='btn btn-white text-nowrap px-3'
                              type='button'
                              title='Filter by price range'
                              onClick={() => {
                                showDropDown()

                                setButtonTopbar(!buttonTopbar)
                              }}
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_price'
                            >
                              Price Range
                              <MdOutlineKeyboardArrowDown className='ms-10 fs-2 text-primary' />
                            </button>
                          </div>
                          {/* Price Modal  */}
                        </div>
                        <img
                          src={priceFilterIcon}
                          id='biz-owner-filter-icons-price'
                          className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons-price '
                          data-bs-toggle='modal'
                          data-bs-target='#kt_modal_price'
                          style={{width: '25px'}}
                        />
                        <div className='modal fade ' tabIndex={-1} id='kt_modal_price'>
                          <div className='modal-dialog'>
                            <div className='modal-content'>
                              <div className='modal-header p-3'>
                                <h5 className='modal-title fw-normal ps-4'>Prices Range</h5>

                                <button
                                  type='button'
                                  className='btn-close me-1'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                ></button>
                              </div>
                              <div className='modal-body pb-0'>
                                <div className='row'>
                                  <div className='container d-flex justify-content-center pb-10'>
                                    <div className='col-5 '>
                                      <input
                                        type='text'
                                        placeholder='Min'
                                        className='p-3 ms-auto form-control form-control-solid '
                                        onChange={(e) => MinPricesOnChangeHandler(e)}
                                        value={minPriceRange}
                                      />
                                      {min.map((minOptions, i) => {
                                        return (
                                          <option
                                            key={i}
                                            // style={{cursor: 'pointer'}}
                                            disabled={
                                              minOptions > maxPriceRange &&
                                              maxPriceRange != '' &&
                                              minOptions != maxPriceRange
                                            }
                                            className={`ms-2 mt-3 ${
                                              minOptions <= maxPriceRange || maxPriceRange == ''
                                                ? 'text-primary cursor-pointer'
                                                : 'text-secondary cursor-block'
                                            }  fs-4 fw-light lh-lg`}
                                            onClick={(e) => MinClickHandler(e)}
                                          >
                                            {minOptions}
                                          </option>
                                        )
                                      })}
                                    </div>
                                    <span className='mt-4 ms-3 fs-4 text-black-50'>to</span>
                                    <div className='col-5 '>
                                      <input
                                        type='text'
                                        className='p-3 ms-5 form-control form-control-solid '
                                        onChange={(e) => MaxPricesOnChangeHandler(e)}
                                        placeholder='Max'
                                        value={maxPriceRange}
                                      />
                                      {/* <option value='Any Max' className='ms-8 mt-3 text-primary' onClick={(e)=>MaxClickHandler(e)}> */}
                                      {max.map((maxOptions, i) => {
                                        return (
                                          <option
                                            key={i}
                                            style={{cursor: 'pointer'}}
                                            className='ms-7 mt-3 text-primary fs-4 fw-light lh-lg'
                                            onClick={(e) => MaxClickHandler(e)}
                                          >
                                            {maxOptions}
                                          </option>
                                        )
                                      })}
                                      {/* </option> */}
                                    </div>
                                  </div>
                                </div>
                                <div className='modal-footer d-flex justify-content-between p-3'>
                                  <button
                                    type='button'
                                    className='btn btn-light'
                                    data-bs-dismiss='modal'
                                  >
                                    Close
                                  </button>

                                  {maxCond && minCond ? (
                                    <button
                                      type='button'
                                      className='btn btn-primary ms-auto'
                                      data-bs-dismiss='modal'
                                      onClick={SavePricesRange}
                                    >
                                      Apply
                                    </button>
                                  ) : (
                                    <button
                                      type='button'
                                      className='btn btn-secondary ms-auto disabled'
                                      data-bs-dismiss='modal'
                                      // onClick={SavePricesRange}
                                    >
                                      Incorrect Range
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=' px-2 ms-auto'>
                      <button
                        style={{backgroundColor: '#DDDDDD', color: '#808080'}}
                        className='btn text-nowrap px-7 ms-auto d-none d-lg-block'
                        type='button'
                        title='Clear all filters'
                        onClick={() => {
                          ClearStates()
                        }}
                      >
                        <img
                          src={ClearIcon}
                          onClick={() => {
                            ClearStates()
                          }}
                        />
                        Clear
                      </button>
                      <img
                        src={clear}
                        className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons biz-owner-filter-icons-clear'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_filters'
                      />
                    </div>
                    {/* {pathname == '/franchise-for-sale' ? ( */}

                    {/* ):(null)

          } */}
                  </div>
                </div>
              </KTCardBody>
            </KTCard>
          </div>
        ) : null}
      </>

      <div
        className='dashboard-bg py-0'
        style={{backgroundColor: '#f5f5f5', marginTop: isShowFilterTopBar ? '-1%' : '-3%'}}
      >
        <div className='container p-0 p-md-10'>
          <div className='row  rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen021.svg'
                      className='svg-icon-1 position-absolute ms-6'
                    />
                    <input
                      type='text'
                      data-kt-user-table-filter='search'
                      className='form-control form-control-solid  ps-14'
                      placeholder='Search '
                      value={title}
                      onChange={(e) => searchHandler(e)}
                    />
                  </div>
                </div>
                <div
                  className='ms-auto'
                  // data-bs-toggle='modal'
                  // data-bs-target='#kt_modal_Add_industry'
                  // onClick={() => setIsFilterModal(true)}
                >
                  <img
                    title='Filter '
                    className='cursor-pointer mx-2 pt-3'
                    src={filterIcon}
                    width='25px'
                    height='30px'
                    alt=''
                    onClick={() => setIsShowFilterTopBar(true)}
                  />
                </div>
              </div>

              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    forFranchiseData?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>Title</th>
                            <th className='text-center min-w-100px'>Published Date</th>
                            <th className='text-center min-w-100px'>Price</th>
                            {/* <th className='text-center min-w-100px'>Type</th> */}
                            <th className='text-center min-w-100px'>Status</th>
                            <th className='text-end me-9 min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {forFranchiseData?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>
                                {item?.title?.length > 40
                                  ? item.title.substring(0, 40) + '...'
                                  : item.title ?? '---'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.created_at ? formateDate(item?.created_at) : `---`}
                                {/* {item?.created_at ?? '---'} */}
                              </td>
                              <td className='text-center min-w-100px'>
                                ${item?.cash_required ?? '0'}
                              </td>
                              {/* <td className='text-center min-w-100px'>
                                {item?.type != '' && item?.type != undefined && item?.type != null
                                  ? userTypeFunction(item?.type)
                                  : 'NO TYPE'}
                              </td> */}
                              <td className='text-center min-w-100px'>
                                {' '}
                                <div>
                                  {item.status === 'active' ? (
                                    <span className='badge badge-success'>
                                      {' '}
                                      {item.status ? item.status.toUpperCase() : '---'}
                                    </span>
                                  ) : item.status === 'inactive' ? (
                                    <span className='badge badge-danger me-1 mb-1'>
                                      {' '}
                                      {item.status ? item.status.toUpperCase() : '---'}
                                    </span>
                                  ) : item.status === 'pending' || item.status === 'Pending' ? (
                                    <span className='badge badge-warning me-1 mb-1'>
                                      {' '}
                                      {item.status ? item.status.toUpperCase() : '---'}
                                    </span>
                                  ) : (
                                    'No Status'
                                  )}
                                </div>
                              </td>

                              <td className='text-end min-w-100px'>
                                <Link to={`/franchise/${item?.slug}/${item?.id}`}>
                                  <BsFillEyeFill
                                    className='text-primary cursor-pointer me-2'
                                    title='View'
                                    size={18}
                                  />
                                </Link>
                                {item.status === 'inactive' ? (
                                  <img
                                    src={activeFranchise}
                                    alt=''
                                    width='25px'
                                    title='Active'
                                    className='me-3 cursor-pointer'
                                    onClick={() => changeStatusHandler(item?.id, 'active')}
                                  />
                                ) : item.status === 'active' ? (
                                  <img
                                    src={inactiveFranchise}
                                    alt=''
                                    width='25px'
                                    title='Inactive'
                                    className='cursor-pointer me-3'
                                    onClick={() => changeStatusHandler(item?.id, 'inactive')}
                                  />
                                ) : item.status === 'pending' || item.status === 'Pending' ? (
                                  <>
                                    <img
                                      src={inactiveFranchise}
                                      alt=''
                                      width='25px'
                                      title='Inactive'
                                      className='cursor-pointer me-3'
                                      onClick={() => changeStatusHandler(item?.id, 'inactive')}
                                    />
                                    <img
                                      src={activeFranchise}
                                      alt=''
                                      width='25px'
                                      title='Active'
                                      className='me-3 cursor-pointer'
                                      onClick={() => changeStatusHandler(item?.id, 'active')}
                                    />
                                  </>
                                ) : null}

                                {/* <MdModeEdit size={23} color='#009ef7' className='cursor-pointer' /> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center '
                        style={{height: '70vh'}}
                      >
                        <div>
                          <h1>RECORD NOT FOUND</h1>
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className='d-flex justify-content-center align-items-center'
                      style={{height: '70vh'}}
                    >
                      <div>
                        <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                      </div>
                    </div>
                  )}
                </div>
                {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
              </KTCardBody>
            </KTCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default Franchises
