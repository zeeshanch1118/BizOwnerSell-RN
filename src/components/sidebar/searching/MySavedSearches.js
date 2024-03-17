import Multiselect from 'multiselect-react-dropdown'
import React, {useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {Button, Modal} from 'react-bootstrap'
import {MdDelete, MdModeEdit, MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../_metronic/helpers'
import filterLocation from '../../../assets/topbar/location.svg'
import industryFilterIcon from '../../../assets/topbar/industry.svg'
import listingFilterIcon from '../../../assets/topbar/listing-type.svg'
import priceFilterIcon from '../../../assets/topbar/price-range.svg'
import moreFilterIcon from '../../../assets/topbar/more-filters.svg'
import ButtonLoader from '../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import './SaveSearch.css'
import deleteIcon from '../../../assets/icons/delete-icon.svg'

import {
  getBusinessListingTypes,
  getCities,
  getCountries,
  getIndustryTypes,
  getStates,
} from '../../services/get-fields-data'
import {
  deleteSaveSearches,
  emailDurationSave,
  getSaveSearches,
  updateSaveSearch,
} from '../../services/save-searches/Index'
import Swal from 'sweetalert2'
import Pagination from '../../../common component/Pagination'

const MySavedSearches = (props) => {
  let navigate = useNavigate()
  const [allIndutries, setAllIndutries] = useState([])
  const [industry, setIndustry] = useState([])
  const [allListings, setAllListings] = useState([])
  const [listing, setListing] = useState([])
  const [saveSearchButtonToggler, setSaveSearchButtonToggler] = useState(false)
  const [updateBtnLoader, setUpdateBtnLoader] = useState(false)
  const [minPriceRange, setMinPriceRange] = useState('')
  const [maxPriceRange, setMaxPriceRange] = useState('')
  const [isShowMoreFilterModal, setIsShowMoreFilterModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [countryValue, setCountryValue] = useState(false)
  const [isShowTitleInput, setShowTitleInput] = useState(false)
  const [stateValue, setStateValue] = useState(false)
  const [cityValue, setCityValue] = useState(false)
  const [grossMax, setGrossMax] = useState('')
  const [grossMin, setGrossMin] = useState('')
  const [cashMax, setCashMax] = useState('')
  const [cashMin, setCashMin] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  const [date, setDate] = useState('')
  const [updateTitle, setUpdateTitle] = useState('')
  const [error, setError] = useState('')
  const [errorCashMin, setErrorCashMin] = useState('')
  const [keyword, setKeyWord] = useState()
  const [year, setYear] = useState()
  const [listingId, setListingId] = useState()
  const [saveSearchData, setSaveSearchData] = useState([])
  const [addDate, setAddDate] = useState('Add any Time')
  const [realEstateListings, setRealEstateListings] = useState('Showing All')
  const [filterResultData, setFilterResultData] = useState(null)
  const [locationValue, setLocationValue] = useState(null)
  const [statesValue, setStatesValue] = useState(null)
  const [citiesValue, setCitiesValue] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [searchName, setSearchName] = useState('')
  const [daily, setDaily] = useState('')
  const [weekly, setWeekly] = useState('')
  const [monthly, setMonthly] = useState('')
  const [instantAlert, setInstantAlert] = useState('')
  const [directly, setDirectly] = useState('')
  const [minCond, setMinCond] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [updateTitleValidation, setUpdateTitleValidation] = useState(false)
  const [lastPage, setLastPage] = useState([])
  const minRange = [
    // {value: 'Any Min'},
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  ]
  const maxRange = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000]
  const showDropDown = () => {
    // setButtonTopbar(!buttonTopbar)
  }

  const [min, setMin] = useState(minRange)
  const [max, setMax] = useState(maxRange)

  let page = 1

  const moreFilterMinRange = [
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  ]
  const moreFilterMaxRange = [
    100000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000,
  ]

  const [moreFilterMinPriceRange, setMoreFilterMinPriceRange] = useState(moreFilterMinRange)
  const [moreFilterMaxPriceRange, setMoreFilterMaxPriceRange] = useState(moreFilterMaxRange)

  const tokenData = localStorage.getItem('userData')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(JSON.stringify(userData) || '')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {userID} = transtokenData

  useEffect(() => {
    getIndustries()
    getListingTypes()
    getAllCountries()
    getSearchDataSave(1)
  }, [])

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

  const getIndustries = async () => {
    let mapIndustries = []
    try {
      const result = await getIndustryTypes()

      if (result.status === true) {
        result.data.map((item, index) => mapIndustries.push({id: item.id, name: item.name}))
        setAllIndutries(mapIndustries)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getSearchDataSave = async (page) => {
    let mapIndustries = []

    try {
      const result = await getSaveSearches(accessToken, page)
      if (result.status === true) {
        console.log('result', result)
        setLastPage(result?.search_save?.last_page)
        setLoader(true)

        setSaveSearchData(result?.search_save?.data)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  let pageCount = lastPage
  const paginate = (data) => {
    let current = data.selected + 1
    setLoader(false)

    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: 'smooth',
    })
    getSearchDataSave(current)
    // window.scrollTo(0, 1000)
  }
  const SaveIndustryData = async () => {
    let industriesIdies = []
    industry?.length > 0 ? setSaveSearchButtonToggler(true) : setSaveSearchButtonToggler(false)

    industry.map((indsID, index) => {
      industriesIdies.push(indsID.id)
    })
    localStorage.setItem(
      'industriesID',
      JSON.stringify({
        industriesID: industriesIdies,
      })
    )
    localStorage.setItem('industriesName', JSON.stringify(industry))
    // console.log("industriesIdies",industriesIdies);

    // localStorage.setItem('industriesID', industriesIdies)
  }
  const getListingTypes = async () => {
    // let getListings = []
    let mapListings = []
    try {
      const result = await getBusinessListingTypes()
      if (result.status === true) {
        // getListings = result.data
        result.data.map((item, index) => mapListings.push({id: item.id, name: item.type}))
        setAllListings(mapListings)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const listingChange = async (e) => {
    await setListing(e)
  }
  const SaveListingData = async () => {
    let listingIdies = []

    listing?.length > 0 ? setSaveSearchButtonToggler(true) : setSaveSearchButtonToggler(false)

    listing.map((listID, index) => {
      listingIdies.push(listID.id)
    })

    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: listingIdies,
      })
    )
    localStorage.setItem('listingName', JSON.stringify(listing))
    // console.log("listingIdies",listingIdies,
    //   industriesID);
  }

  const submitData = () => {
    if (Number(grossMin) > Number(grossMax)) {
      if (grossMax !== '' && grossMax !== undefined && grossMax !== null) {
        setError('Gross Minimum cannot be greater than Gross Maximum')
      }
    } else {
      setError('')
    }
    if (Number(cashMin) > Number(cashMax)) {
      if (cashMax !== '' && cashMax !== undefined && cashMax !== null) {
        setErrorCashMin('Cash Minimum cannot be greater than Cash Maximum')
      }
    } else {
      setErrorCashMin('')
    }

    if (
      (Number(grossMax) >= Number(grossMin) || grossMax === '') &&
      (Number(cashMax) >= Number(cashMin) || cashMax === '')
    ) {
      localStorage.setItem(
        'tag',
        JSON.stringify({
          tag: keyword,
        })
      )
      localStorage.setItem(
        'addDates',
        JSON.stringify({
          addDates: addDate,
        })
      )
      localStorage.setItem(
        'years',
        JSON.stringify({
          years: year,
        })
      )

      localStorage.setItem(
        'grossMinPrice',
        JSON.stringify({
          grossMinPrice: grossMin,
        })
      )
      localStorage.setItem(
        'grossMaxPrice',
        JSON.stringify({
          grossMaxPrice: grossMax,
        })
      )

      localStorage.setItem(
        'cashMinPrice',
        JSON.stringify({
          cashMinPrice: cashMin,
        })
      )
      localStorage.setItem(
        'cashMaxPrice',
        JSON.stringify({
          cashMaxPrice: cashMax,
        })
      )
      setIsShowMoreFilterModal(false)
    }
  }

  const industryChange = async (e) => {
    await setIndustry(e)
  }

  //////////////////////////////////

  // const [items, setItems] = useState([])

  // const [industry, setIndustry] = useState(null)
  // let indusName = JSON?.parse(localStorage.getItem('industriesName'))
  // let listingName = JSON?.parse(localStorage.getItem('listingName'))

  const locationChange = async (e) => {
    let countryIDArray = []
    let countryNameArray = []
    await setLocationValue(e)

    countryIDArray = e.map((item, index) => {
      return item.id
    })
    countryNameArray = e.map((item, index) => {
      return item.name
    })
    // console.log('countryNameArray', countryNameArray)
    // localStorage.setItem('countryID', JSON.stringify(countryNameArray))
    if (e?.length == 0 || e == null) {
      setCitiesValue('')
      setStatesValue('')
    }
    getAllStates(countryIDArray)
  }
  const stateLocationChange = async (e) => {
    let stateIDArray = []
    let stateNameArray = []
    await setStatesValue(e)
    stateIDArray = e.map((item, index) => {
      return item.id
    })
    stateNameArray = e.map((item, index) => {
      return item.name
    })

    // localStorage.setItem('stateID', JSON.stringify(stateNameArray))
    if (e?.length == 0 || e == null) {
      setCitiesValue('')
    }
    getAllCities(stateIDArray)
  }
  const citiesLocationHandler = async (e) => {
    let cityNameArray = []
    let cityArray = []
    await setCitiesValue(e)
    cityArray = e.map((item, index) => {
      return item.id
    })
    cityNameArray = e.map((item, index) => {
      return item.name
    })

    // localStorage.setItem('cityID', JSON.stringify(cityNameArray))
  }
  const SaveLocationValue = async () => {
    locationValue?.length > 0 || statesValue?.length > 0 || citiesValue?.length > 0
      ? setSaveSearchButtonToggler(true)
      : setSaveSearchButtonToggler(false)

    let locations = {locationValue, statesValue, citiesValue}
    await localStorage.setItem('locationFilter', JSON.stringify(locations))
    const localStorageCityID = localStorage.getItem('cityID')
    const cityID = JSON?.parse(localStorageCityID)

    const localStorageCountryID = localStorage.getItem('countryID')
    const countryID = JSON?.parse(localStorageCountryID)

    const localStorageStateID = localStorage.getItem('stateID')
    const stateID = JSON?.parse(localStorageStateID)
  }

  // const minRange = [
  //   // {value: 'Any Min'},
  //   50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  // ]
  // const maxRange = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000]
  // const showDropDown = () => {}
  // const styles = {
  //   fontSize: 140,
  //   color: 'blue',
  //   with: 230,
  // }
  // const [min, setMin] = useState(minRange)
  // const [max, setMax] = useState(maxRange)
  const [searchID, setSearchID] = useState()

  const deleteHandler = async (e, id) => {
    try {
      const resultRemove = await Swal.fire({
        text: 'Are you sure you want to delete your saved search?',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (resultRemove.isConfirmed) {
        const result = await deleteSaveSearches(id, accessToken)

        if (result.status == true) {
          // setAllBusinesses(result.businesses)
          let data = [...saveSearchData]

          data.map((item, index) => {
            if (item.id === id) {
              data.splice(index, 1)
            }
          })

          setSaveSearchData(data)
          console.log('deleteBusinessesListings', result)
        } else {
          console.log('error deleteBusinessesListings', result)
        }
      }
    } catch (e) {
      console.log('error deleteBusinessesListings', e)
    }
  }

  const editSaveSearch = async (
    e,
    id,
    countries,
    industries,
    listings,
    keyword,
    establish_year,
    min_cash,
    max_cash,
    min_gross,
    max_gross,
    add_data,
    locations_states,
    locations_cities,
    title
  ) => {
    setDaily(e.target.name)
    setUpdateTitle(title)
    setShowTitleInput(false)
    let countriesArray = []
    let statesArray = []
    let cityArray = []
    let industriesArray = []
    let listingsArray = []
    setSearchID(id)
    await countries.map((item) =>
      countriesArray.push({
        id: item?.id,
        name: item?.name,
      })
    )
    await locations_states?.map((item) =>
      statesArray.push({
        id: item?.id,
        name: item?.name,
      })
    )
    await locations_cities?.map((item) =>
      cityArray.push({
        id: item?.id,
        name: item?.name,
      })
    )
    await industries?.map((item) =>
      industriesArray.push({
        id: item?.id,
        name: item?.name,
      })
    )
    await listings?.map((item) =>
      listingsArray.push({
        id: item?.id,
        name: item?.type,
      })
    )

    // console.log(countries)

    // if (e.target.name != 'daily' && e.target.name != 'weekly' && e.target.name != 'monthly') {
    setIsOpen(true)
    // }
    if (keyword != null && keyword != '' && keyword != undefined) {
      setKeyWord(keyword)
    }
    if (establish_year != null && establish_year != '' && establish_year != undefined) {
      setYear(establish_year)
    }
    if (min_cash != null && min_cash != '' && min_cash != undefined) {
      setCashMin(min_cash)
    }
    if (max_cash != null && max_cash != '' && max_cash != undefined) {
      setCashMax(max_cash)
    }
    if (min_gross != null && min_gross != '' && min_gross != undefined) {
      setGrossMin(min_gross)
    }
    if (max_gross != null && max_gross != '' && max_gross != undefined) {
      setGrossMax(max_gross)
    }
    if (add_data != null && add_data != '' && add_data != undefined) {
      setAddDate(add_data)
    }
    setLocationValue(countriesArray)
    setIndustry(industriesArray)
    setListing(listingsArray)
    setStatesValue(statesArray)
    setCitiesValue(cityArray)
  }
  const getMySaveSearch = async (
    e,
    id,
    countries,
    industries,
    listings,
    keyword,
    establish_year,
    min_cash,
    max_cash,
    min_gross,
    max_gross,
    add_data,
    locations_states,
    locations_cities,
    max_price,
    min_price
  ) => {
    let industriesIdies = []
    let industrieses = []

    industries?.map((indsID, index) => {
      industriesIdies.push(indsID.id)
      industrieses.push({id: indsID.id, name: indsID.name})
    })
    localStorage.setItem(
      'industriesID',
      JSON.stringify({
        industriesID: industriesIdies,
      })
    )
    localStorage.setItem('industriesName', JSON.stringify(industrieses))

    // listing types
    localStorage.setItem(
      'maxPrice',
      JSON.stringify({
        maxPrice: max_price,
      })
    )
    localStorage.setItem(
      'minPrice',
      JSON.stringify({
        minPrice: min_price,
      })
    )
    let listingIdies = []
    let listingName = []

    listings.map((listID, index) => {
      listingIdies.push(listID.id)

      listingName.push({id: listID.id, name: listID.type})
    })

    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: listingIdies,
      })
    )
    localStorage.setItem('listingName', JSON.stringify(listingName))

    // locations

    let citiesValue = []
    let cityArray = []

    locations_cities.map((item, index) => {
      cityArray.push(item.name)
    })
    locations_cities.map((item, index) => {
      citiesValue.push({id: item.id, name: item.name})
    })

    localStorage.setItem('cityID', JSON.stringify(cityArray))

    // states
    let stateIDArray = []
    let statesValue = []
    await setStatesValue(e)
    // stateIDArray = e.map((item, index) => {
    //   return item.id
    // })
    locations_states?.map((item, index) => {
      statesValue.push({id: item.id, name: item.name})
    })
    stateIDArray = locations_states?.map((item, index) => {
      return item.name
    })

    localStorage.setItem('stateID', JSON.stringify(stateIDArray))

    // country

    let countryIDArray = []
    let locationValue = []
    // await setLocationValue(e)

    countryIDArray = countries.map((item, index) => {
      return item.name
    })
    countries?.map((item, index) => {
      locationValue.push({id: item.id, name: item.name})
    })
    // console.log('countryNameArray', countryNameArray)
    localStorage.setItem('countryID', JSON.stringify(countryIDArray))

    let locations = {locationValue, statesValue, citiesValue}
    await localStorage.setItem('locationFilter', JSON.stringify(locations))

    // moreFilters

    localStorage.setItem(
      'tag',
      JSON.stringify({
        tag: keyword,
      })
    )
    localStorage.setItem(
      'addDates',
      JSON.stringify({
        addDates: add_data,
      })
    )
    localStorage.setItem(
      'years',
      JSON.stringify({
        years: establish_year,
      })
    )

    localStorage.setItem(
      'grossMinPrice',
      JSON.stringify({
        grossMinPrice: min_gross,
      })
    )
    localStorage.setItem(
      'grossMaxPrice',
      JSON.stringify({
        grossMaxPrice: max_gross,
      })
    )

    localStorage.setItem(
      'cashMinPrice',
      JSON.stringify({
        cashMinPrice: min_cash,
      })
    )
    localStorage.setItem(
      'cashMaxPrice',
      JSON.stringify({
        cashMaxPrice: max_cash,
      })
    )

    navigate('/search-businesses-for-sale')
  }

  const closeModal = async () => {
    if (updateTitle == '' || updateTitle == undefined) {
      setUpdateTitleValidation(true)
    } else {
      setUpdateBtnLoader(true)
      setShowTitleInput(false)
    }
    if (updateTitle !== '' && updateTitle !== undefined) {
      const response = await updateSaveSearch(
        locationValue,
        statesValue,
        citiesValue,
        industry,
        instantAlert,
        listing,
        minPriceRange,
        maxPriceRange,
        grossMin,
        grossMax,
        cashMin,
        cashMax,
        keyword,
        addDate,
        year,
        directly,
        daily,
        accessToken,
        userID,
        searchID,
        updateTitle
      )
      if (response.status == true) {
        setUpdateBtnLoader(false)
        let filterData = [...saveSearchData]

        filterData.map((item, index) => {
          if (item.id === response.user.id) {
            filterData[index] = response?.user
            // packageArray[index].description = result.package.description
            // packageArray[index].status = result.package.status
            // packageArray[index].package_prices = result.package.package_prices
            // packageArray[index].features = result.package.features
          }
        })
        setSaveSearchData(filterData)
        Swal.fire({
          title: 'Update successfully',
          timer: 1500,
          icon: 'success',

          confirmButtonColor: '#009ef7',

          confirmButtonText: 'Ok',
        })
        // setLoading(false)
        setIsOpen(false)
        setSaveSearchButtonToggler(false)
      }

      setIsOpen(false)
    }
  }
  function closeMoreFilterModalModal() {
    setIsShowMoreFilterModal(false)
  }
  function handleValidationForMinMax(e) {
    if (e.target.name === 'grossMin') {
      setError('')
      setGrossMin(e.target.value)
    } else if (e.target.name === 'grossMax') {
      setGrossMax(e.target.value)
      if (Number(e.target.value) >= grossMin) {
        setError('')
      }
    } else if (e.target.name === 'cashMin') {
      setCashMin(e.target.value)
    } else if (e.target.name === 'cashMax') {
      setCashMax(e.target.value)
      if (Number(e.target.value) >= cashMin) {
        setErrorCashMin('')
      }
    }
  }
  const alertsDuration = async (e, id) => {
    let filterData = [...saveSearchData]

    let duration = e.target.name
    // setDaily(e.target.name)
    const response = await emailDurationSave(id, accessToken, duration, instantAlert)

    filterData.map((item, index) => {
      if (item.id === response.user.id) {
        filterData[index].email_duration = response?.user?.email_duration
        // packageArray[index].description = result.package.description
        // packageArray[index].status = result.package.status
        // packageArray[index].package_prices = result.package.package_prices
        // packageArray[index].features = result.package.features
      }
    })
    setSaveSearchData(filterData)
  }
  const instantAlertsDuration = async (e, id, email) => {
    let instant
    if (e == true) {
      instant = 'yes'
    } else {
      instant = 'No'
    }
    // setDaily(e.target.name)
    const response = await emailDurationSave(id, accessToken, email, instant)
  }
  const modalClose = () => {
    setIsOpen(false)
  }
  const onChangeDate = async (e) => {
    // const today = new Date(e)
    // const year = today.getFullYear()
    // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', year)
    setDate(e)
    setYear(e.getFullYear())

    // (locale, date) =>
  }
  return (
    <>
      <div className=' p-10 pt-10' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='dashboard-bg py-0' style={{marginTop: '0%'}}>
          <div className='container  bg-white rounded  p-10' style={{minHeight: '90vh'}}>
            {loader ? (
              <>
                {saveSearchData?.length > 0 ? (
                  <div className='row   '>
                    <div className='col-md-3'>
                      <h5 className='text-start  pb-3 save-search-heading-alert'>
                        Saved Searches
                        {/* <i
                      className='fas fa-exclamation-circle ps-3 cursor-pointer'
                      data-bs-toggle='modal'
                      data-bs-target='#tolTip_saved_listings'
                    ></i> */}
                      </h5>{' '}
                    </div>
                    <div className='col-md-5'>
                      <h5 className='text-md-end ps-md-4 pb-3 save-search-heading-alert'>
                        Recurring Alerts{' '}
                        {/* <i
                      className='fas fa-exclamation-circle ps-3 cursor-pointer'
                      data-bs-toggle='modal'
                      data-bs-target='#tolTip_saved_listings'
                    ></i> */}
                      </h5>{' '}
                    </div>
                    <div className='col-4 text-end d-none d-md-inline'>
                      <h5 className='text-nowrap save-search-heading-alert ps-0'>
                        Instant Alerts{' '}
                        {/* <i
                      className='fas fa-exclamation-circle ps-3 cursor-pointer'
                      data-bs-toggle='modal'
                      data-bs-target='#tolTip_saved_listings'
                    ></i> */}
                      </h5>
                    </div>
                    {saveSearchData?.map((item, index) => (
                      <>
                        <div
                          className='col-md-5 d-flex justify-content-between mt-md-5'
                          key={index + 3}
                        >
                          <div className=''>
                            <span
                              className='text-primary cursor-pointer save-search-heading-title'
                              onClick={(e) =>
                                getMySaveSearch(
                                  e,

                                  item?.id,
                                  item?.search_save_countries,

                                  item?.business_industries,
                                  item?.business_listings,
                                  item?.keyword,
                                  item?.establish_year,
                                  item?.min_cash,
                                  item?.max_cash,
                                  item?.min_gross,
                                  item?.max_gross,
                                  item?.add_data,
                                  item?.search_save_states,
                                  item?.search_save_cities,
                                  item?.max_price,
                                  item?.min_price
                                )
                              }
                            >
                              {item.title ? item?.title?.substring(0, 40) : 'NaN'}
                              {item?.title?.length >= 40 && '...'}
                            </span>
                            {/* <p className='py-1'>Asking Price: Any Min - N/A</p> */}
                          </div>
                          <div>
                            <span
                              className='cursor-pointer mx-2'
                              onClick={(e) =>
                                editSaveSearch(
                                  e,
                                  item?.id,
                                  item?.search_save_countries,
                                  item?.business_industries,
                                  item?.business_listings,
                                  item?.keyword,
                                  item?.establish_year,
                                  item?.min_cash,
                                  item?.max_cash,
                                  item?.min_gross,
                                  item?.max_gross,
                                  item?.add_data,
                                  item?.search_save_states,
                                  item?.search_save_cities,
                                  item?.title
                                )
                              }
                            >
                              <MdModeEdit
                                size={23}
                                color='#009ef7'
                                onClick={(e) =>
                                  editSaveSearch(
                                    e,
                                    item?.id,
                                    item?.search_save_countries,
                                    item?.business_industries,
                                    item?.business_listings,
                                    item?.keyword,
                                    item?.establish_year,
                                    item?.min_price,
                                    item?.max_price,
                                    item?.min_gross,
                                    item?.max_gross,
                                    item?.add_data,
                                    item?.search_save_states,
                                    item?.search_save_cities
                                  )
                                }
                              />
                            </span>
                            <span
                              className='cursor-pointer'
                              onClick={(e) => deleteHandler(e, item?.id)}
                            >
                              <MdDelete size={26} color='gray' />
                            </span>
                          </div>
                        </div>
                        <div className=' col-md-5' key={index + 4}>
                          <div className='d-flex my-2 justify-content-md-center align-items-center gap-2 '>
                            <button
                              type='button'
                              className={`btn save-search-btn-alert ${
                                item?.email_duration == 'daily'
                                  ? 'btn-primary disabled'
                                  : 'biz-owner-save-search-btn'
                              }  `}
                              data-kt-docs-advanced-forms='interactive'
                              name='daily'
                              onClick={
                                (e) => alertsDuration(e, item?.id)
                                // editSaveSearch(
                                //   e,
                                //   item?.id,
                                //   item?.locations_countries,
                                //   item?.business_industries,
                                //   item?.business_listings,
                                //   item?.keyword,
                                //   item?.establish_year,
                                //   item?.min_price,
                                //   item?.max_price,
                                //   item?.min_gross,
                                //   item?.max_gross,
                                //   item?.add_data
                                // )
                              }
                            >
                              Daily
                            </button>
                            <button
                              type='button'
                              className={`btn save-search-btn-alert ${
                                item?.email_duration == 'weekly'
                                  ? 'btn-primary disabled'
                                  : 'biz-owner-save-search-btn'
                              }  `}
                              data-kt-docs-advanced-forms='interactive'
                              name='weekly'
                              onClick={
                                (e) => alertsDuration(e, item?.id)

                                // editSaveSearch(
                                //   e,
                                //   item?.id,
                                //   item?.locations_countries,
                                //   item?.business_industries,
                                //   item?.business_listings,
                                //   item?.keyword,
                                //   item?.establish_year,
                                //   item?.min_price,
                                //   item?.max_price,
                                //   item?.min_gross,
                                //   item?.max_gross,
                                //   item?.add_data
                                // )
                              }
                            >
                              Weekly
                            </button>
                            <button
                              type='button'
                              className={`btn save-search-btn-alert ${
                                item?.email_duration == 'monthly'
                                  ? 'btn-primary disabled'
                                  : 'biz-owner-save-search-btn'
                              }  `}
                              data-kt-docs-advanced-forms='interactive'
                              name='monthly'
                              onClick={
                                (e) => alertsDuration(e, item?.id)

                                // editSaveSearch(
                                //   e,
                                //   item?.id,
                                //   item?.locations_countries,
                                //   item?.business_industries,
                                //   item?.business_listings,
                                //   item?.keyword,
                                //   item?.establish_year,
                                //   item?.min_price,
                                //   item?.max_price,
                                //   item?.min_gross,
                                //   item?.max_gross,
                                //   item?.add_data
                                // )
                              }
                            >
                              Monthly
                            </button>
                          </div>
                        </div>

                        <div className='col-md-2 d-flex justify-content-md-end' key={index + 5}>
                          <div className='form-check form-switch  my-5'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              id='flexSwitchCheckChecked'
                              defaultChecked={item?.instance == 'yes'}
                              onChange={(e) =>
                                instantAlertsDuration(
                                  e.target.checked,
                                  item?.id,
                                  item?.email_duration
                                )
                              }
                            />
                            <label
                              className='form-check-label save-search-alert-switch-label'
                              htmlFor='flexSwitchCheckChecked'
                            >
                              {' '}
                              Instant alerts{' '}
                            </label>
                          </div>
                        </div>
                        <hr />
                      </>
                    ))}
                  </div>
                ) : (
                  <div className='row bg-white rounded  p-5'>
                    <div
                      className='d-flex justify-content-center align-items-center'
                      style={{minHeight: '90vh'}}
                    >
                      <h2>No Record</h2>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                className='d-flex justify-content-center align-items-center'
                style={{height: '100vh'}}
              >
                <div>
                  <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                </div>
              </div>
            )}
            {lastPage > 1 && (
              <div className='mt-auto'>
                <Pagination pageCount={pageCount} paginate={paginate} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* toltips modal */}

      <div
        className='modal fade'
        id='tolTip_saved_listings'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-md modal-dialog-centered px-0'>
          <div className='modal-content'>
            <div className='modal-header py-3'>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <h3 className='mb-4'>Recurring Alerts</h3>

              <p>
                Recurring Alert emails contain all businesses that match your selected criteria.
                They are sent out daily, weekly or monthly.
              </p>
              <h5>Instant Alerts</h5>

              <p>
                Instant Alert emails are sent the moment a business owner sends notification of
                their business which matches your criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* edit input  */}
      <div className='modal fade ' tabIndex={-1} id='kt_modal_edit-listing'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              {/* <h5 className='modal-title ps-4'> Industries</h5> */}

              <div
                className='btn btn-icon btn-sm text-dark ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span className='fs-2'>🗙</span>
              </div>
              {/*end::Close*/}
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={modalClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Update Save Searches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-6 mt-0 row'>
            <div className=' d-flex'>
              {isShowTitleInput ? (
                <>
                  <div className=' col-8 col-md-4'>
                    <input
                      type='text'
                      placeholder='Update title'
                      className='form-control d-inline '
                      value={updateTitle}
                      onChange={(e) => {
                        setUpdateTitle(e.target.value)
                        setUpdateTitleValidation(false)
                      }}
                      // onBlur={(e) => setShowTitleInput(false)}
                      autoFocus
                      style={{
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px',
                        backgroundColor: '#ecf1f4',
                        border: 'none',
                        paddingBottom: '12px',
                      }}
                    />
                    {updateTitleValidation ? (
                      <div style={{color: 'red', borderTop: '1px solid red'}}>
                        Enter save search title
                      </div>
                    ) : null}
                  </div>
                  <div className='col-2 ' style={{marginLeft: '0px'}}>
                    <img
                      src={deleteIcon}
                      width={30}
                      alt=''
                      className='py-2 cursor-pointer'
                      onClick={() => setShowTitleInput(false)}
                      style={{
                        backgroundColor: '#ecf1f4',
                        borderRadius: '3px',
                        borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span
                    className='p-2 d-flex justify-content-between'
                    style={{
                      backgroundColor: '#f7f8fa',
                      border: '.5px solid #c5c5c5',
                      borderRadius: '3px',
                      minWidth: '29rem',
                    }}
                  >
                    <span
                      className='text-align-center  fs-4 fw-2 '
                      style={{
                        minWidth: '25rem',
                      }}
                    >
                      {/* {updateTitle} */}
                      {updateTitle?.substring(0, 45)}
                      {updateTitle?.length >= 45 && '...'}
                    </span>
                    <span className='ms-3  cursor-pointer'>
                      <MdModeEdit
                        size={23}
                        color='#009ef7'
                        backgroundColor='#f5f8fa'
                        onClick={(e) => setShowTitleInput(true)}
                      />
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
          <div
            className='container-fluid  py-3 '
            style={{fontSize: '12px', overflowX: 'hidden', backgroundColor: 'black'}}
          >
            <div className=' d-flex biz-owner-filter-top-bar gap-lg-4 gap-1   align-items-center  justify-content-lg-center'>
              <div className=''>
                <div>
                  <div className='search-container h-100 bg-white all-location px-2 d-none d-lg-block'>
                    <div className='d-flex align-items-center position-relative  h-100 pb-0 '>
                      <KTSVG
                        path='/media/icons/duotune/general/gen021.svg'
                        className='svg-icon-1 text-primary position-absolute  ps-lg-3'
                      />
                      <button
                        style={{color: '#808080'}}
                        className='btn btn-white bg-white biz-owner-topbar-btn-padding'
                        type='button'
                        data-bs-toggle='modal'
                        title='Filter by locations'
                        data-bs-target='#kt_modal_all-locations'
                      >
                        <span className='ps-lg-7 text-nowrap pe-lg-9'>All Locations</span>
                        {(locationValue && locationValue.length > 0) ||
                        statesValue?.length > 0 ||
                        citiesValue?.length > 0 ? (
                          <>
                            <span>
                              (
                              {locationValue?.length > 0 ? (
                                <span>{locationValue?.length},</span>
                              ) : null}
                              {statesValue ? (
                                <>
                                  <span>
                                    {statesValue?.length > 0 ? (
                                      <span>{statesValue?.length},</span>
                                    ) : null}
                                    {citiesValue ? (
                                      <>
                                        <span>
                                          {citiesValue.length > 0 ? (
                                            <span>{citiesValue.length}</span>
                                          ) : null}
                                        </span>
                                        {/* <span>
                  {items.statesValue.length > 0 ? <span>({items.statesValue})</span> : null}
                </span>
                <span>
                  {items.citiesValue.length > 0 ? <span>({items.citiesValue})</span> : null}
                </span> */}
                                      </>
                                    ) : null}
                                  </span>
                                  {/* <span>
                  {items.statesValue.length > 0 ? <span>({items.statesValue})</span> : null}
                </span>
                <span>
                  {items.citiesValue.length > 0 ? <span>({items.citiesValue})</span> : null}
                </span> */}
                                </>
                              ) : null}
                              ){' '}
                            </span>
                            {/* <span>
                  {items.statesValue.length > 0 ? <span>({items.statesValue})</span> : null}
                </span>
                <span>
                  {items.citiesValue.length > 0 ? <span>({items.citiesValue})</span> : null}
                </span> */}
                          </>
                        ) : null}
                      </button>

                      {/* <KTSVG
            path='/media/icons/duotune/general/gen021.svg'
            className='svg-icon-1 position-absolute ms-6 pt-1'
          />
          <input
            type='text'
            className='form-control form-control-solid cursor-pointer w-250px ps-14 h-100 search_box'
            placeholder='All Locations'
            // value={items ? `${locationValue.length}` : null}
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_all-locations'
            // onChange={onChange}
            // onClick={() => modalToggel()}
          /> */}
                    </div>
                    {/* ) : null} */}
                  </div>
                  <img
                    src={filterLocation}
                    className='text-white cursor-pointer mx-3 mx-md-5 d-lg-none biz-owner-filter-icons'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_all-locations'
                  />
                  {/* Search Modal  */}
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
                          {/*end::Close*/}
                        </div>
                        <div
                          className='px-7 pt-5 pb-3'
                          style={{overflowY: 'scroll', maxHeight: '70vh'}}
                        >
                          <div className='pb-0'>
                            <label htmlFor=''>Countries</label>
                            <div
                              className={` ${countryValue == true ? 'pading1 ' : ''} `}
                              onClick={() => {
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
                              onClick={() => {
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
                              onClick={() => {
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
                          className='d-flex justify-content-between py-5 px-10'
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
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {transformedData ? (
          <>
            <div>
              <button type='button' className='btn rounded-0 rounded-left  btn-light text-primary '>
                Saved
              </button>
              <button
                type='button'
                className='btn btn-light rounded-0 text-primary dropdown-toggle dropdown-toggle-split'
                id='dropdownMenuReference'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                data-bs-reference='parent'
              ></button>
              <ul className='dropdown-menu' aria-labelledby='dropdownMenuReference p-4'>
                <li>
                  <Link className='dropdown-item' to='/search-businesses-for-sale'>
                    Arizona Businesses For Sale
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className='dropdown d-none d-md-block'>
              <button
                type='button'
                className='btn btn-primary px-3 rounded-pill'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_Save_Search'
              >
               <img src={SaveSearchesIcon}/> Save Searches
              </button>
              <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                <li className='d-none d-lg-block'>
                  <button className='btn btn-primary'>My Save Searches</button>
                </li>
              </ul>
            </div>
          </>
        )} */}
                </div>
              </div>
              <div>
                <div className='d-none d-lg-block '>
                  {/* <button onClick={()=>businessIndustries()}>API</button> */}
                  <div className=''>
                    <button
                      style={{color: '#808080'}}
                      className='btn btn-white text-nowrap biz-owner-topbar-btn-padding'
                      type='button'
                      data-bs-toggle='modal'
                      title='Filter by industries'
                      data-bs-target='#kt_modal_industry'
                    >
                      Industries
                      <span className='ms-lg-10'>
                        {industry ? (
                          industry.length > 0 ? (
                            <span>({industry.length})</span>
                          ) : null
                        ) : null}
                      </span>
                      <MdOutlineKeyboardArrowDown className=' fs-2 text-primary' />
                    </button>
                  </div>
                </div>
                <img
                  src={industryFilterIcon}
                  className='text-white cursor-pointer mx-3 mx-md-5 d-lg-none biz-owner-filter-icons'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_industry'
                />
                <div className='modal fade ' tabIndex={-1} id='kt_modal_industry'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header p-3'>
                        <h5 className='modal-title ps-4'> Industries</h5>

                        <button
                          type='button'
                          className='btn-close me-1'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                      </div>
                      <div className='modal-body pb-0'>
                        <Multiselect
                          options={allIndutries}
                          selectedValues={industry}
                          onSelect={(e) => industryChange(e)}
                          onRemove={(e) => industryChange(e)}
                          displayValue='name'
                          placeholder='Enter an Industry '
                          showArrow={false}
                          singleSelect={false}
                          closeIcon={false}
                          showCheckbox={true}
                          style={{
                            searchBox: {
                              fontSize: 12,

                              backgroundColor: '#e7f3fc',
                            },
                            option: {
                              color: 'black',
                            },
                          }}
                        />
                        <div className='modal-footer d-flex justify-content-between p-3'>
                          <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                            Close
                          </button>
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={(e) => SaveIndustryData(e)}
                            data-bs-dismiss='modal'
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='d-none d-lg-block'>
                  <div>
                    <button
                      style={{color: '#808080'}}
                      className='btn btn-white text-nowrap biz-owner-topbar-btn-padding'
                      type='button'
                      title='Filter by listing types'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_listingTypes'
                    >
                      Listing Types
                      <span className='ms-lg-10 '>
                        {listing ? (
                          listing.length > 0 ? (
                            <span>({listing.length})</span>
                          ) : null
                        ) : null}
                      </span>
                      <MdOutlineKeyboardArrowDown className=' fs-2 text-primary' />
                    </button>
                  </div>
                  {/* Modal  */}
                </div>
                <img
                  src={listingFilterIcon}
                  className='text-white mx-3 mx-md-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_listingTypes'
                />
                <div className='modal fade ' tabIndex={-1} id='kt_modal_listingTypes'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header p-3'>
                        <h5 className='modal-title ps-4'> listing Types</h5>

                        <button
                          type='button'
                          className='btn-close me-1'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                        {/*end::Close*/}
                      </div>
                      <div className='modal-body pb-0'>
                        <Multiselect
                          options={allListings}
                          selectedValues={listing}
                          onSelect={(e) => listingChange(e)}
                          onRemove={(e) => listingChange(e)}
                          // Options to display in the dropdown
                          // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                          // onSelect={this.onSelect} // Function will trigger on select event
                          // onRemove={this.onRemove} // Function will trigger on remove event
                          displayValue='name' // Property name to display in the dropdown options
                          placeholder='Listing types '
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
                        <div className='modal-footer d-flex justify-content-between p-3'>
                          <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                            Close
                          </button>
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={(e) => SaveListingData(e)}
                            data-bs-dismiss='modal'
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='d-none d-lg-block'>
                  <button
                    style={{color: '#808080'}}
                    type='button'
                    className='btn btn-white text-nowrap biz-owner-topbar-btn-padding'
                    data-bs-toggle='modal'
                    title='Filter by cash flow'
                    onClick={() => setIsShowMoreFilterModal(true)}
                  >
                    More Filters
                    <MdOutlineKeyboardArrowDown
                      className='ms-lg-10 fs-2 text-primary'
                      onClick={() => setIsShowMoreFilterModal(true)}
                    />
                  </button>
                </div>
                <img
                  src={moreFilterIcon}
                  className='text-white mx-3 mx-md-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_filters'
                />
                <Modal show={isShowMoreFilterModal} onHide={closeMoreFilterModalModal} size='lg'>
                  <Modal.Header className='py-4 fs-3' closeButton>
                    More Filters
                  </Modal.Header>
                  <Modal.Body>
                    <div className='row'>
                      <label htmlFor='exampleFormControlInput1' className=' form-label d-block'>
                        Gross Revenue
                      </label>
                      <div className='  col-6  '>
                        <input
                          name='grossMin'
                          type='number'
                          value={grossMin}
                          onChange={handleValidationForMinMax}
                          placeholder='Min'
                          className='form-control form-control-solid'
                        />
                        {error && <div style={{color: 'red'}}>{error}</div>}
                      </div>
                      <div className='col-6'>
                        <input
                          name='grossMax'
                          type='number'
                          value={grossMax}
                          onChange={handleValidationForMinMax}
                          placeholder='Max'
                          className='form-control form-control-solid'
                        />
                      </div>
                      <label htmlFor='exampleFormControlInput1' className='mt-5 form-label d-block'>
                        Cash Flow
                      </label>
                      <div className='col-6   '>
                        <input
                          name='cashMin'
                          type='number'
                          value={cashMin}
                          onChange={handleValidationForMinMax}
                          placeholder='Min'
                          className='form-control form-control-solid'
                        />
                        {errorCashMin && <div style={{color: 'red'}}>{errorCashMin}</div>}
                      </div>
                      <div className='col-6'>
                        <input
                          name='cashMax'
                          type='number'
                          value={cashMax}
                          onChange={handleValidationForMinMax}
                          placeholder='Max'
                          className='form-control form-control-solid'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='mb-10 col-6 mt-5 '>
                        <label htmlFor='exampleFormControlInput1' className=' form-label'>
                          Keyword
                        </label>
                        <input
                          type='text'
                          name='keyWord'
                          value={keyword}
                          className='form-control form-control-solid'
                          placeholder='ex. FedEx, Relocatable, etc.'
                          onChange={(e) => setKeyWord(e.target.value)}
                        />
                      </div>
                      <div className='mb-10 col-6 mt-5 '>
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
                              onChange={(e) => setAddDate(e.target.value)}
                            >
                              {addDate != '' && addDate != undefined && addDate != null ? (
                                <option hidden>{addDate}</option>
                              ) : (
                                <option selected disabled>
                                  Add any Time
                                </option>
                              )}
                              {/* <option selected>Add any Time</option> */}

                              <option value='Last 3 days'>Last 3 days</option>

                              <option value='Last 7 days'>Last 7 days</option>
                              <option value='Last 30 days'>Last 30 days</option>
                            </select>
                          </div>
                          {/*end::Input group*/}
                        </div>
                      </div>
                      <div className='mb-10 col-6  '>
                        <label htmlFor='exampleFormControlInput1' className=' form-label'>
                          Established After Year
                        </label>
                        <input
                          type='text'
                          name='year'
                          // onClick={(e) => setCalenderModel(true)}
                          value={year}
                          data-bs-toggle='modal'
                          data-bs-target='#kt_modal_year'
                          className='form-control form-control-solid cursor-pointer'
                          placeholder='Enter Year'
                          // onChange={(e) => setYear(e.target.value)}
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className='py-2'>
                    <button
                      type='button'
                      className='btn btn-light'
                      onClick={closeMoreFilterModalModal}
                    >
                      Close
                    </button>

                    <button type='button' className='btn btn-primary' onClick={() => submitData()}>
                      Apply
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={closeModal}>
            {updateBtnLoader ? (
              <span>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </span>
            ) : (
              <span>Update</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='modal fade ' tabIndex={-1} id='kt_modal_year' style={{zIndex: '9999'}}>
        <div className='modal-dialog modal-md'>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              <h5 className='modal-title ps-4'>Select Year</h5>

              <button
                type='button'
                className='btn-close me-1'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
              {/*end::Close*/}
            </div>
            <div className='modal-body p-8'>
              <Calendar
                onChange={onChangeDate}
                // defaultValue={new Date()}
                maxDetail='decade'
                maxDate={new Date()}
              />
            </div>
            <div className='pb-5 px-7 d-flex justify-content-between'>
              <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => submitData()}
                data-bs-dismiss='modal'
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MySavedSearches
