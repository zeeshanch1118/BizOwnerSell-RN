import {useState, useEffect} from 'react'
import Multiselect from 'multiselect-react-dropdown'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import Select from 'react-select'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import filterIcon from '../../assets/adminIcons/filterIcon.svg'
import activeBusiness from '../../assets/activeBusinessIcon.svg'
import inactiveBusiness from '../../assets/inactiveBusinessIcon.svg'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {
  getCountries,
  getStates,
  getCities,
  getIndustryTypes,
  getBusinessListingTypes,
} from '../../components/services/get-fields-data'

import {
  getFilteredData,
  updateBusinessStatus,
} from '../../components/services/forSearchBusiness/Index'

import btnLoader from '../../assets/Loader/ButtonLoader.gif'
import filterLocation from '../../assets/topbar/location.svg'
import industryFilterIcon from '../../assets/topbar/industry.svg'
import listingFilterIcon from '../../assets/topbar/listing-type.svg'
import priceFilterIcon from '../../assets/topbar/price-range.svg'
import ClearIcon from '../../assets/landing-bg/clear-black.svg'
import moreFilterIcon from '../../assets/topbar/more-filters.svg'
import clear from '../../assets/topbar/clear.svg'
import './Searchbar.css'
import './multiselect.css'

import {KTSVG, KTCardBody, KTCard} from '../../_metronic/helpers'
import {MdModeEdit} from 'react-icons/md'
import activeIcon from '../../assets/active-user-icon.svg'
import inactiveIcon from '../../assets/inactive-user-icon.svg'
import {getUsers, updateStatus} from '../../components/services/admin-services/manage-users'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import './style.css'
import Pagination from '../../common component/Pagination'
import {BsFillEyeFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {updateReportStatus} from '../../components/services/admin-services/manage-reported-listing'
import {getBusinessListingData} from '../../components/services/admin-services/manage-listings/Index'
const Busniesses = (props) => {
  const [countryValue, setCountryValue] = useState(false)
  const [stateValue, setStateValue] = useState(false)
  const [cityValue, setCityValue] = useState(false)
  const [allIndutries, setAllIndutries] = useState([])
  const [industry, setIndustry] = useState('')
  const [compareIndustry, setCompareIndustry] = useState('')
  const [allListings, setAllListings] = useState([])
  const [listing, setListing] = useState([])
  const [compareListing, setCompareListing] = useState([])
  const [compareLocation, setCompareLocation] = useState([])
  const [saveSearchButtonToggler, setSaveSearchButtonToggler] = useState('')
  const [minPriceRange, setMinPriceRange] = useState('')
  const [maxPriceRange, setMaxPriceRange] = useState('')
  const [loading, setLoading] = useState(false)
  const [isShowMoreFilterModal, setIsShowMoreFilterModal] = useState(false)
  const [userSearchNameValidation, setUserSearchNameValidation] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [userSearchName, setUserSearchName] = useState('')
  const [isModalShow, setShow] = useState(false)
  const [ButtonLoader, setButtonLoader] = useState(false)
  const [loginButtonLoader, setLoginButtonLoader] = useState(false)
  const [buttonTopbar, setButtonTopbar] = useState(false)
  const [isShowFilterTopBar, setIsShowFilterTopBar] = useState(false)
  const [grossMax, setGrossMax] = useState('')
  const [grossMin, setGrossMin] = useState('')
  const [cashMax, setCashMax] = useState('')
  const [cashMin, setCashMin] = useState('')
  const [keyword, setKeyWord] = useState('')
  const [year, setYear] = useState('')
  const [listingId, setListingId] = useState()
  const [addDate, setAddDate] = useState('Add any Time')
  const [realEstateListings, setRealEstateListings] = useState('Showing All')
  const [filterResultData, setFilterResultData] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isLocationModalShow, setIsLocationModalShow] = useState(false)
  const [calenderModel, setCalenderModel] = useState(false)
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [errorCashMin, setErrorCashMin] = useState('')
  //////////////////////////////////
  const [locationValue, setLocationValue] = useState(null)
  const [statesValue, setStatesValue] = useState(null)
  const [citiesValue, setCitiesValue] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [saveSearchData, setSaveSearchData] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)

  const [minCond, setMinCond] = useState(true)
  const [maxCond, setMaxCond] = useState(true)
  const [value, setValue] = useState(false)
  const [currentPage, setcurrentPage] = useState(0)

  let page = 1

  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(JSON.stringify(userData) || '')

  const localStorageIndustriesID = localStorage.getItem('industriesID')
  const transformedIndustriesID = JSON?.parse(localStorageIndustriesID)
  const {industriesID} = transformedIndustriesID ?? ''
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {userID} = transtokenData

  const localStoragelistingsID = localStorage.getItem('listingsID')
  const transformedlistingsID = JSON?.parse(localStoragelistingsID)
  const {listingsID} = transformedlistingsID ?? ''

  const localStorageMinPrice = localStorage.getItem('minPrice')
  const transformedminPrice = JSON?.parse(localStorageMinPrice)
  const {minPrice} = transformedminPrice ?? ''

  const localStoragemaxPrice = localStorage.getItem('maxPrice')
  const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)
  const {maxPrice} = transformedmaxPrice ?? ''

  const localStorageGrossMaxPrice = localStorage.getItem('grossMaxPrice')
  const transformedGrossMaxPrice = JSON?.parse(localStorageGrossMaxPrice)
  const {grossMaxPrice} = transformedGrossMaxPrice ?? ''

  const localStorageGrossMinPrice = localStorage.getItem('grossMinPrice')
  const transformedGrossMinPrice = JSON?.parse(localStorageGrossMinPrice)
  const {grossMinPrice} = transformedGrossMinPrice ?? ''

  const localStorageCashMaxPrice = localStorage.getItem('cashMaxPrice')
  const transformedCashMaxPrice = JSON?.parse(localStorageCashMaxPrice)
  const {cashMaxPrice} = transformedCashMaxPrice ?? ''

  const localStorageCashMinPrice = localStorage.getItem('cashMinPrice')
  const transformedCashMinPrice = JSON?.parse(localStorageCashMinPrice)
  const {cashMinPrice} = transformedCashMinPrice ?? ''

  const localStoragetag = localStorage.getItem('tag')
  const transformedtag = JSON?.parse(localStoragetag)
  const {tag} = transformedtag ?? ''

  const localStorageAddDate = localStorage.getItem('addDates')
  const transformedAddDate = JSON?.parse(localStorageAddDate)
  const {addDates} = transformedAddDate ?? ''

  const localStorageYear = localStorage.getItem('years')
  const transformedYear = JSON?.parse(localStorageYear)
  const {years} = transformedYear ?? ''

  const localStorageCityID = localStorage.getItem('cityID')
  const cityID = JSON?.parse(localStorageCityID)

  const localStorageCountryID = localStorage.getItem('countryID')
  const countryID = JSON?.parse(localStorageCountryID)

  const localStorageStateID = localStorage.getItem('stateID')
  const stateID = JSON?.parse(localStorageStateID)
  const stateBe = JSON?.parse(localStorage.getItem('locationFilter'))
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])

  const [isActive, setIsActive] = useState(false)
  const [forBusinessData, setForBusinessData] = useState([])
  const [loader, setLoader] = useState('')
  const [title, setTitle] = useState('')

  const [allUsers, setAllUsers] = useState([])

  const [lastPage, setLastPage] = useState([])
  const [instantAlert, setInstantAlert] = useState('yes')
  const [directly, setDirectly] = useState('yes')
  let industryName = JSON?.parse(localStorage.getItem('industriesName'))
  let listingName = JSON?.parse(localStorage.getItem('listingName'))

  useEffect(() => {
    if (industryName) {
      setIndustry(industryName)
    }
    if (listingName) {
      setListing(listingName)
    }
    if (maxPrice) {
      setMaxPriceRange(maxPrice)
    }
    if (minPrice) {
      setMinPriceRange(minPrice)
    }
    if (grossMinPrice) {
      setGrossMin(grossMinPrice)
    }
    if (grossMaxPrice) {
      setGrossMax(grossMaxPrice)
    }

    if (cashMaxPrice) {
      setCashMax(cashMaxPrice)
    }
    if (cashMinPrice) {
      setCashMin(cashMinPrice)
    }
    if (addDates) {
      setAddDate(addDates)
    }
    if (tag) {
      setKeyWord(tag)
    }
    if (years) {
      setYear(years)
    }
  }, [props.papularIndustry])
  useEffect(() => {
    getIndustries()
    getListingTypes()
    getAllCountries()
  }, [])
  useEffect(() => {
    if (
      industryName ||
      listingName ||
      maxPrice ||
      minPrice ||
      grossMinPrice ||
      grossMaxPrice ||
      cashMaxPrice ||
      cashMinPrice ||
      addDates ||
      tag ||
      years ||
      cityID ||
      countryID ||
      stateBe
    ) {
      setIsShowFilterTopBar(true)
    }

    if (stateBe) {
      setLocationValue(stateBe.locationValue)

      setStatesValue(stateBe.statesValue)
      setCitiesValue(stateBe.citiesValue)
    }
  }, [])

  ///////////////////////
  useEffect(() => {
    getAllListings()
  }, [])

  const getAllListings = async (page, search) => {
    setForBusinessData([])
    try {
      // setForBusinessData([])
      setLoader(false)
      const result = await getBusinessListingData(
        page,
        search,
        listingsID,
        industriesID,
        minPrice,
        maxPrice,
        grossMinPrice,
        grossMaxPrice,
        cashMinPrice,
        cashMaxPrice,
        tag,
        addDates,
        years,
        cityID,
        countryID,
        stateID,
        accessToken
      )
      console.log(result)
      if (result.status === true) {
        setForBusinessData(result.businesses.data)

        setcurrentPage(result.businesses.current_page)
        setLastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)

        setLoader(true)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }

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
  const getAllCountries = async () => {
    let mapCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result?.countries.map((item, index) => mapCountries.push({id: item.id, name: item.name}))
        filterCountries = mapCountries.filter((x) => {
          return x.id !== 39 && x.id !== 233
        })
        filterCountries.unshift({id: 233, name: 'United States'}, {id: 39, name: 'Canada'})
        setAllCountries(filterCountries)
      }
    } catch (err) {}
  }
  const getAllStates = async (countryID) => {
    let mapStates = []

    try {
      const result = await getStates(countryID)

      if (result.status === true) {
        result.states.map((item, index) => mapStates.push({id: item.id, name: item.name}))
        setAllStates(mapStates)
      }
    } catch (err) {}
  }
  const getAllCities = async (stateID) => {
    let mapCities = []
    try {
      const result = await getCities(stateID)

      if (result.status === true) {
        result.cities.map((item, index) => mapCities.push({id: item.id, name: item.name}))
        setAllCities(mapCities)
      }
    } catch (err) {}
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
    }
  }

  const SaveIndustryData = async () => {
    setValue(false)
    let industriesIdies = []

    await industry.map((indsID, index) => {
      industriesIdies.push(indsID.id)
    })
    localStorage.setItem(
      'industriesID',
      JSON.stringify({
        industriesID: industriesIdies,
      })
    )
    localStorage.setItem('industriesName', JSON.stringify(industry))
    localStorage.setItem('saveSearches', 'saveSearch')

    try {
      setLoader(false)
      const result = await getBusinessListingData(
        page,
        title,
        listingsID,
        industriesIdies,
        minPrice,
        maxPrice,
        grossMinPrice,
        grossMaxPrice,
        cashMinPrice,
        cashMaxPrice,
        tag,
        addDates,
        years,
        cityID,
        countryID,
        stateID,
        accessToken
      )
      console.log(result)
      if (result.status === true) {
        setForBusinessData(result.businesses.data)

        setcurrentPage(result.businesses.current_page)
        setLastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)

        setLoader(true)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }
  const getListingTypes = async () => {
    let mapListings = []
    try {
      const result = await getBusinessListingTypes()
      if (result.status === true) {
        result.data.map((item, index) => mapListings.push({id: item.id, name: item.type}))
        setAllListings(mapListings)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
    }
  }

  const listingChange = async (e) => {
    await setListing(e)
    setValue(true)
  }
  const SaveListingData = async () => {
    let listingIdies = []

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
    try {
      setForBusinessData([])
      setLoader(false)
      const result = await getBusinessListingData(
        page,
        title,
        listingIdies,
        industriesID,
        minPrice,
        maxPrice,
        grossMinPrice,
        grossMaxPrice,
        cashMinPrice,
        cashMaxPrice,
        tag,
        addDates,
        years,
        cityID,
        countryID,
        stateID,
        accessToken
      )
      console.log(result)
      if (result.status === true) {
        setForBusinessData(result.businesses.data)

        setcurrentPage(result.businesses.current_page)
        setLastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)

        setLoader(true)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }

  const SavePricesRange = async () => {
    localStorage.setItem(
      'minPrice',
      JSON.stringify({
        minPrice: minPriceRange,
      })
    )
    localStorage.setItem(
      'maxPrice',
      JSON.stringify({
        maxPrice: maxPriceRange,
      })
    )

    try {
      setForBusinessData([])
      setLoader(false)
      const result = await getBusinessListingData(
        page,
        title,
        listingsID,
        industriesID,
        minPriceRange,
        maxPriceRange,
        grossMinPrice,
        grossMaxPrice,
        cashMinPrice,
        cashMaxPrice,
        tag,
        addDates,
        years,
        cityID,
        countryID,
        stateID,
        accessToken
      )
      console.log(result)
      if (result.status === true) {
        setForBusinessData(result.businesses.data)

        setcurrentPage(result.businesses.current_page)
        setLastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)

        setLoader(true)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }

  const submitData = async () => {
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

      try {
        setIsShowMoreFilterModal(false)
        setForBusinessData([])
        setLoader(false)
        const result = await getBusinessListingData(
          1,
          title,
          listingsID,
          industriesID,
          minPriceRange,
          maxPriceRange,
          grossMin,
          grossMax,
          cashMin,
          cashMax,
          keyword,
          addDate,
          year,
          cityID,
          countryID,
          stateID,
          accessToken
        )
        console.log(result)
        if (result.status === true) {
          setForBusinessData(result.businesses.data)

          setcurrentPage(result.businesses.current_page)
          setLastPage(result.businesses.last_page)
          setTotalRecord(result.businesses.total)

          setLoader(true)
        } else {
          setLoader(true)
        }
      } catch (err) {
        console.log('err', err)

        setLoader(true)
      }
    }
  }
  const industryChange = async (e) => {
    await setIndustry(e)
    setValue(true)
  }

  const locationChange = async (e) => {
    setCountryValue(true)
    setIsActive(true)
    setCityValue(false)
    setStateValue(false)
    let countryIDArray = []
    let countryNameArray = []

    await setLocationValue(e)

    countryIDArray = e.map((item, index) => {
      return item.id
    })
    countryNameArray = e.map((item, index) => {
      return item.name
    })
    localStorage.setItem('countryID', JSON.stringify(countryNameArray))
    if (e == null || e?.length == 0) {
      setStatesValue(null)
      setCitiesValue(null)
      localStorage.setItem('stateID', JSON.stringify([]))
      localStorage.setItem('cityID', JSON.stringify([]))
    }
    getAllStates(countryIDArray)
  }
  const stateLocationChange = async (e) => {
    setStateValue(true)
    setCountryValue(false)
    setCityValue(false)
    let stateIDArray = []
    let stateNameArray = []
    await setStatesValue(e)
    stateIDArray = e.map((item, index) => {
      return item.id
    })
    stateNameArray = e.map((item, index) => {
      return item.name
    })

    localStorage.setItem('stateID', JSON.stringify(stateNameArray))
    if (e == null || e?.length == 0) {
      setCitiesValue(null)
      localStorage.setItem('cityID', JSON.stringify([]))
    }
    getAllCities(stateIDArray)
  }
  const citiesLocationHandler = async (e) => {
    setCityValue(true)
    setStateValue(false)
    setCountryValue(false)
    await setCitiesValue(e)
    let cityNameArray = []
    let cityArray = []
    cityArray = e.map((item, index) => {
      return item.id
    })

    cityNameArray = e.map((item, index) => {
      return item.name
    })

    localStorage.setItem('cityID', JSON.stringify(cityNameArray))
  }

  const SaveLocationValue = async () => {
    setValue(false)
    let locations = {locationValue, statesValue, citiesValue}

    setIsLocationModalShow(false)
    localStorage.setItem('saveSearchBtn', 'save')
    await localStorage.setItem('locationFilter', JSON.stringify(locations))
    const localStorageCityID = localStorage.getItem('cityID')
    const cityIDs = JSON?.parse(localStorageCityID)

    const localStorageCountryID = localStorage.getItem('countryID')
    const countryIDs = JSON?.parse(localStorageCountryID)

    const localStorageStateID = localStorage.getItem('stateID')
    const stateIDs = JSON?.parse(localStorageStateID)
    try {
      setLoader(false)
      const result = await getBusinessListingData(
        page,
        title,
        listingsID,
        industriesID,
        minPrice,
        maxPrice,
        grossMinPrice,
        grossMaxPrice,
        cashMinPrice,
        cashMaxPrice,
        tag,
        addDates,
        years,
        cityIDs,
        countryIDs,
        stateIDs,
        accessToken
      )
      console.log(result)
      if (result.status === true) {
        setForBusinessData(result.businesses.data)

        setcurrentPage(result.businesses.current_page)
        setLastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)

        setLoader(true)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }

  const ClearStates = async () => {
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')
    setSaveSearchButtonToggler('notSave')

    setIndustry('')
    setListing('')
    setMinPriceRange('')
    setMaxPriceRange('')
    setKeyWord('')
    setAddDate('')
    setYear('')
    setAddDate('')
    setCashMax('')
    setCashMin('')
    setGrossMax('')
    setGrossMin('')
    setLocationValue('')
    setStatesValue('')
    setCitiesValue('')
    setTitle('')
    setForBusinessData([])
    try {
      setLoader(false)
      const result = await getBusinessListingData(
        page,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        accessToken
      )
      if (result.status === true) {
        setForBusinessData(result.businesses.data)

        setcurrentPage(result.businesses.current_page)
        setLastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)

        setLoader(true)
      } else {
        setLoader(true)
      }
      setIsShowFilterTopBar(false)
    } catch (err) {
      console.log('err', err)

      setLoader(true)
    }
  }

  const minRange = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000]
  const maxRange = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000]

  const moreFilterMinRange = [
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  ]
  const moreFilterMaxRange = [
    100000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000,
  ]
  const showDropDown = () => {
    // setButtonTopbar(!buttonTopbar)
  }

  const [min, setMin] = useState(minRange)
  const [max, setMax] = useState(maxRange)
  const [moreFilterMinPriceRange, setMoreFilterMinPriceRange] = useState(moreFilterMinRange)
  const [moreFilterMaxPriceRange, setMoreFilterMaxPriceRange] = useState(moreFilterMaxRange)

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
  const onChangeDate = async (e) => {
    setDate(e)
    setYear(e.getFullYear())
  }

  let pageCount = lastPage

  const paginate = async (data) => {
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllListings(page)
  }
  const changeStatusHandler = async (id, status) => {
    const result = await Swal.fire({
      text: `Are you sure you want to ${status} this list?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    })
    if (result.isConfirmed) {
      const statusResult = await updateBusinessStatus(id, status, accessToken)
      console.log('statusResult', statusResult)
      if (statusResult.status === true) {
        Toast.fire({
          icon: 'success',
          title: `List status successfully changed`,
        })
        let listingArray = [...forBusinessData]
        console.log(statusResult)
        listingArray.map((item, index) => {
          if (item.id === statusResult.business.id) {
            listingArray[index].status = statusResult.business.status
          }
        })
        setForBusinessData(listingArray)
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

  const searchHandler = (e) => {
    setTitle(e.target.value)
    getAllListings(1, e.target.value)
  }
  function closeMoreFilterModalModal() {
    setIsShowMoreFilterModal(false)
  }
  return (
    <>
      {isShowFilterTopBar ? (
        <div style={{marginTop: '-3%'}}>
          <KTCard className='rounded-0' backgroundColor='#081C3D'>
            <div className='container px-1'>
              <KTCardBody className='py-1 mb-0'>
                <div className='  py-3 ' style={{fontSize: '12px', overflowX: 'hiden'}}>
                  <div className=' d-flex biz-owner-filter-top-bar gap-lg-3 gap-1   align-items-center  justify-content-lg-start'>
                    <div className=''>
                      <div>
                        <div className='search-container h-100 bg-white all-location px-2 d-none d-lg-block'>
                          <div className='d-flex align-items-center position-relative  h-100 pb-0 '>
                            <KTSVG
                              path='/media/icons/duotune/general/gen021.svg'
                              className='svg-icon-1 text-primary position-absolute all-location-search-icon  ps-lg-3'
                            />
                            <button
                              style={{color: '#808080'}}
                              className='btn btn-white bg-white biz-owner-topbar-btn-padding'
                              type='button'
                              title='Filter by locations'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_all-locations'
                              onClick={() => {
                                {
                                  // let locations = {locationValue, statesValue, citiesValue}
                                  // setIsLocationModalShow(true)
                                  setCountryValue(false)
                                  setStateValue(false)
                                  setCityValue(false)
                                  setButtonTopbar(!buttonTopbar)
                                  // setCompareLocation(locations)
                                  // value.push(locationValue:locationValue, statesValue, citiesValue)
                                }
                              }}
                            >
                              <span className='ps-lg-7 text-nowrap pe-lg-9 '>All Locations</span>
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
                                            </>
                                          ) : null}
                                        </span>
                                      </>
                                    ) : null}
                                    ){' '}
                                  </span>
                                </>
                              ) : null}
                            </button>
                          </div>
                        </div>
                        <img
                          src={filterLocation}
                          className='text-white cursor-pointer mx-2 mx-sm-5 d-lg-none biz-owner-filter-icons'
                          // onClick={(e) => setIsLocationModalShow(true)}
                          data-bs-toggle='modal'
                          data-bs-target='#kt_modal_all-locations'
                        />
                        <div
                          className='modal fade '
                          tabIndex={-1}
                          id='kt_modal_all-locations'
                          // onClick={() => {
                          //   setCountryValue(false)
                          //   setStateValue(false)
                          //   setCityValue(false)
                          // }}
                        >
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
                                <div className={` pb-0 `}>
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
                                      onSelect={locationChange}
                                      // Options to display in the dropdown
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
                                    onClick={() => {
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
                                className='d-flex justify-content-between py-5 px-10'
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
                      <div className='d-none d-lg-block '>
                        <div className=''>
                          <button
                            style={{color: '#808080'}}
                            className='btn btn-white text-nowrap biz-owner-topbar-btn-padding'
                            type='button'
                            data-bs-toggle='modal'
                            title='Filter by industries'
                            data-bs-target='#kt_modal_industry'
                            onClick={() => {
                              setButtonTopbar(!buttonTopbar)
                              setValue(false)
                            }}
                          >
                            Industries
                            <span
                              className={`ms-lg-5 ${
                                industry.length > 0 ? 'biz-owner-topbar-icon-padding' : ''
                              }  `}
                            >
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
                        className='text-white cursor-pointer mx-2 mx-sm-5 d-lg-none biz-owner-filter-icons'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_industry'
                      />
                      <div className='modal fade ' tabIndex={-1} id='kt_modal_industry'>
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header p-3' onClick={() => setValue(false)}>
                              <h5 className='modal-title ps-4'> Industries</h5>

                              <button
                                type='button'
                                data-bs-dismiss='modal'
                                className='btn-close me-1'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='px-7 pt-5 pb-3' onClick={() => setValue(false)}>
                              <div className={` ${value == true ? 'pading ' : ''} `}>
                                <Multiselect
                                  options={allIndutries}
                                  selectedValues={industry}
                                  onSelect={(e) => industryChange(e)}
                                  onRemove={(e) => industryChange(e)}
                                  displayValue='name'
                                  placeholder='Select Industries '
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
                              >
                                Close
                              </button>

                              <button
                                type='button'
                                className='btn btn-primary'
                                data-bs-dismiss='modal'
                                onClick={(e) => SaveIndustryData(e)}
                              >
                                Apply
                              </button>
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
                            data-bs-toggle='modal'
                            title='Filter by listing types'
                            data-bs-target='#kt_modal_listingTypes'
                            onClick={() => {
                              setValue(false)
                              setButtonTopbar(!buttonTopbar)
                            }}
                          >
                            Listing Types
                            <span className='ms-lg-10 biz-owner-topbar-icon-padding  '>
                              {listing ? (
                                listing?.length > 0 ? (
                                  <span>({listing.length})</span>
                                ) : null
                              ) : null}
                            </span>
                            <MdOutlineKeyboardArrowDown
                              className={`fs-2 text-primary biz-owner-topbar-icon-padding ${
                                listing?.length > 0 ? 'biz-owner-topbar-icon-listing' : ''
                              } `}
                            />
                          </button>
                        </div>
                        {/* Modal  */}
                      </div>
                      <img
                        src={listingFilterIcon}
                        className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_listingTypes'
                      />
                      <div className={`modal fade `} tabIndex={-1} id='kt_modal_listingTypes'>
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header p-3' onClick={() => setValue(false)}>
                              <h5 className='modal-title ps-4'> Listing Types</h5>

                              <button
                                type='button'
                                className='btn-close me-1'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                              {/*end::Close*/}
                            </div>
                            <div className='px-7 pt-5 pb-3' onClick={() => setValue(false)}>
                              <div className={` ${value == true ? 'pading22 ' : ''}  `}>
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
                                  placeholder='Listing Types '
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
                                aria-label='Close'
                              >
                                Close
                              </button>
                              <button
                                type='button'
                                className='btn btn-primary'
                                data-bs-dismiss='modal'
                                onClick={(e) => SaveListingData(e)}
                              >
                                Apply
                              </button>
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
                            title='Filter by price range'
                            onClick={() => {
                              showDropDown()
                              setButtonTopbar(!buttonTopbar)
                            }}
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_price'
                          >
                            Price Range
                            <MdOutlineKeyboardArrowDown className='ms-lg-10 fs-2 text-primary biz-owner-topbar-icon-padding' />
                          </button>
                        </div>
                        {/* Price Modal  */}
                      </div>
                      <img
                        src={priceFilterIcon}
                        className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons-price'
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
                    <div>
                      <div className='d-none d-lg-block'>
                        <button
                          style={{color: '#808080'}}
                          type='button'
                          className='btn btn-white text-nowrap biz-owner-topbar-btn-padding'
                          data-bs-toggle='modal'
                          title='Filter by cash flow'
                          data-bs-target='#kt_modal_filters'
                          onClick={() => {
                            setButtonTopbar(!buttonTopbar)
                            setIsShowMoreFilterModal(true)
                          }}
                        >
                          More Filters
                          <MdOutlineKeyboardArrowDown className='ms-lg-10 fs-2 text-primary biz-owner-topbar-icon-padding' />
                        </button>
                      </div>
                      <img
                        src={moreFilterIcon}
                        className='text-white mx-2 mx-sm-5 cursor-pointer d-lg-none biz-owner-filter-icons'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_filters'
                      />
                      <Modal
                        show={isShowMoreFilterModal}
                        onHide={closeMoreFilterModalModal}
                        size='lg'
                      >
                        <Modal.Header className='py-4 fs-3' closeButton>
                          More Filters
                        </Modal.Header>
                        <Modal.Body>
                          <div className='row'>
                            <label
                              htmlFor='exampleFormControlInput1'
                              className=' form-label d-block'
                            >
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
                            <label
                              htmlFor='exampleFormControlInput1'
                              className='mt-5 form-label d-block'
                            >
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
                        <Modal.Footer className='py-4 d-flex justify-content-between'>
                          <button
                            type='button'
                            className='btn btn-light'
                            onClick={closeMoreFilterModalModal}
                          >
                            Close
                          </button>

                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => submitData()}
                          >
                            Apply
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div className='ms-auto'>
                      <button
                        style={{backgroundColor: '#DDDDDD', color: '#808080'}}
                        className='btn text-nowrap px-lg-4 d-none d-lg-block'
                        type='button'
                        title='Clear all filters'
                        onClick={() => ClearStates()}
                      >
                        <img src={ClearIcon} /> Clear
                      </button>
                      <img
                        src={clear}
                        className='text-white cursor-pointer mx-2 mx-sm-5 d-lg-none align-items-center biz-owner-filter-icons'
                        onClick={() => ClearStates()}
                        style={{width: '25px'}}
                      />
                    </div>
                  </div>
                </div>
                <div className='modal fade ' tabIndex={-1} id='kt_modal_year'>
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
                        <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </KTCardBody>
            </div>
          </KTCard>
        </div>
      ) : null}

      {/*  */}
      {/*  */}
      {/*  */}
      <div
        className='dashboard-bg py-0 '
        style={{backgroundColor: '#f5f5f5', marginTop: isShowFilterTopBar ? '-2%' : '-3.1%'}}
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
                    forBusinessData?.length > 0 ? (
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
                          {forBusinessData?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>
                                {item?.title?.length > 40
                                  ? item.title.substring(0, 40) + '...'
                                  : item.title ?? '---'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.established_at ?? '---'}
                              </td>
                              <td className='text-center min-w-100px'>
                                ${item?.asking_price ?? '0'}
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
                                <Link to={`/businesses/${item?.slug}/${item?.id}`}>
                                  <BsFillEyeFill
                                    className='text-primary cursor-pointer me-2 mt-1'
                                    title='View'
                                    size={18}
                                  />
                                </Link>

                                {item.status === 'inactive' ? (
                                  <img
                                    src={activeBusiness}
                                    alt=''
                                    width='25px'
                                    title='Active'
                                    className='me-3 cursor-pointer mb-1'
                                    onClick={() => changeStatusHandler(item?.id, 'active')}
                                  />
                                ) : item.status === 'active' ? (
                                  <img
                                    src={inactiveBusiness}
                                    alt=''
                                    width='25px'
                                    title='Inactive'
                                    className='cursor-pointer me-3 mb-1'
                                    onClick={() => changeStatusHandler(item?.id, 'inactive')}
                                  />
                                ) : item.status === 'pending' || item.status === 'Pending' ? (
                                  <>
                                    <img
                                      src={inactiveBusiness}
                                      alt=''
                                      width='25px'
                                      title='Inactive'
                                      className='cursor-pointer me-3 mb-1'
                                      onClick={() => changeStatusHandler(item?.id, 'inactive')}
                                    />
                                    <img
                                      src={activeBusiness}
                                      alt=''
                                      width='25px'
                                      title='Active'
                                      className='me-3 cursor-pointer mb-1'
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

export default Busniesses
