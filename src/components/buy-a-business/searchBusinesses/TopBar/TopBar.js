import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import {Button, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'
import {
  getCountries,
  getStates,
  getCities,
  getIndustryTypes,
  getBusinessListingTypes,
} from '../../../services/get-fields-data'

import {KTSVG} from '../../../../_metronic/helpers'

import {getFilteredData} from '../../../services/forSearchBusiness/Index'
import {getSaveSearches, saveSearch, singleSaveSearch} from '../../../services/save-searches/Index'
import {loginUser} from '../../../services/auth-services/AuthServices'
import btnLoader from '../../../../assets/Loader/ButtonLoader.gif'
import filterLocation from '../../../../assets/topbar/location.svg'
import industryFilterIcon from '../../../../assets/topbar/industry.svg'
import listingFilterIcon from '../../../../assets/topbar/listing-type.svg'
import priceFilterIcon from '../../../../assets/topbar/price-range.svg'
import ClearIcon from '../../../../assets/landing-bg/clear-black.svg'
import SaveSearchesIcon from '../../../../assets/landing-bg/saveSearches.png'
import moreFilterIcon from '../../../../assets/topbar/more-filters.svg'
import clear from '../../../../assets/topbar/clear.svg'
import './Searchbar.css'
import './multiselect.css'
import {modalText} from '../../../alert-text'
const TopBar = (props) => {
  const navigate = useNavigate()
  let dispatch = useDispatch()
  const [countryValue, setCountryValue] = useState(false)
  const [stateValue, setStateValue] = useState(false)
  const [isShowMoreFilterModal, setIsShowMoreFilterModal] = useState(false)
  const [cityValue, setCityValue] = useState(false)
  const [allIndutries, setAllIndutries] = useState([])
  const [industry, setIndustry] = useState('')
  const [allListings, setAllListings] = useState([])
  const [listing, setListing] = useState([])
  const [saveSearchButtonToggler, setSaveSearchButtonToggler] = useState('')
  const [minPriceRange, setMinPriceRange] = useState('')
  const [maxPriceRange, setMaxPriceRange] = useState('')
  const [loading, setLoading] = useState(false)
  const [userSearchNameValidation, setUserSearchNameValidation] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [userSearchName, setUserSearchName] = useState('')
  const [isModalShow, setShow] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [ButtonLoader, setButtonLoader] = useState(false)
  const [loginButtonLoader, setLoginButtonLoader] = useState(false)
  const [buttonTopbar, setButtonTopbar] = useState(false)
  const [grossMax, setGrossMax] = useState('')
  const [grossMin, setGrossMin] = useState('')
  const [cashMax, setCashMax] = useState('')
  const [cashMin, setCashMin] = useState('')
  const [keyword, setKeyWord] = useState('')
  const [year, setYear] = useState('')
  const [addDate, setAddDate] = useState('Add any Time')
  const [filterResultData, setFilterResultData] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState('')

  //////////////////////////////////
  const [locationValue, setLocationValue] = useState(null)
  const [statesValue, setStatesValue] = useState(null)
  const [citiesValue, setCitiesValue] = useState(null)
  const [saveSearchData, setSaveSearchData] = useState([])
  const minRange = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000]
  const maxRange = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000]

  const moreFilterMinRange = [
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  ]
  const moreFilterMaxRange = [
    100000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000,
  ]

  const [min, setMin] = useState(minRange)
  const [max, setMax] = useState(maxRange)
  //
  // alerts
  const [daily, setDaily] = useState('daily')
  const [weekly, setWeekly] = useState('')
  const [monthly, setMonthly] = useState('')
  const [minCond, setMinCond] = useState(true)
  const [maxCond, setMaxCond] = useState(true)
  const [value, setValue] = useState(false)
  const [error, setError] = useState('')
  const [errorCashMin, setErrorCashMin] = useState('')

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
  const {role} = transtokenData

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
  const LocationFilterState = JSON?.parse(localStorage.getItem('locationFilter'))
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  const [instantAlert, setInstantAlert] = useState('yes')
  const [directly, setDirectly] = useState('yes')
  let updateTopbar = 'industry'
  let industryName = JSON?.parse(localStorage.getItem('industriesName'))
  let listingName = JSON?.parse(localStorage.getItem('listingName'))
  let industryFilterData = useSelector((state) => {
    return state
  })
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
    if (listingName) {
      setListing(listingName)
    }
  }, [props.listingType])
  useEffect(() => {
    if (LocationFilterState) {
      setLocationValue(LocationFilterState.locationValue)

      setStatesValue(LocationFilterState.statesValue)
      setCitiesValue(LocationFilterState.citiesValue)
    }
    getIndustries()
    getListingTypes()
    getAllCountries()
  }, [])

  useEffect(() => {
    setSaveSearchButtonToggler(industryFilterData?.saveSearch)

    let industriesName = JSON?.parse(localStorage.getItem('industriesName'))
    if (industriesName) {
      setIndustry(industriesName)
    }
  }, [industryFilterData])

  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
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
    } catch (err) {
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
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getSearchData = async (page, save) => {
    setSaveSearchButtonToggler(save)
    await props.getFilterData('result', page)
  }

  const getIndustries = async () => {
    let mapIndustries = []
    try {
      const result = await getIndustryTypes()
      console.log('getIndustryTypes', result)
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

  const SaveIndustryData = async () => {
    setValue(false)
    let industriesIdies = []
    // setButtonTopbar(!buttonTopbar)

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
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
    await getSearchData(page, 'save')
    // updateTopbar = 'setIndustry'
    let toggler = localStorage.getItem('saveSearches')
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
    // console.log("listingIdies",listingIdies,
    //   industriesID);
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
    await getSearchData(page.toExponential, 'save')
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
    getSearchData(page, 'save')
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
      // dispatch({
      //   type: 'INDUSTRY',
      //   payload: {
      //     buttonTopbar,
      //     save: 'save',
      //   },
      // })
      setIsShowMoreFilterModal(false)
      getSearchData(page, 'save')
    }
  }

  const industryChange = async (e) => {
    await setIndustry(e)
    setValue(true)
  }

  const locationChange = async (e) => {
    setCountryValue(true)
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

    localStorage.setItem('saveSearchBtn', 'save')
    await localStorage.setItem('locationFilter', JSON.stringify(locations))
    const localStorageCityID = localStorage.getItem('cityID')
    const cityID = JSON?.parse(localStorageCityID)

    const localStorageCountryID = localStorage.getItem('countryID')
    const countryID = JSON?.parse(localStorageCountryID)

    const localStorageStateID = localStorage.getItem('stateID')
    const stateID = JSON?.parse(localStorageStateID)
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar,
    //     save: 'save',
    //   },
    // })
    getSearchData(page, 'save')
  }

  const ClearStates = () => {
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

    getSearchData(page, 'savesave')
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     buttonTopbar: 'not',
    //     save: 'notSave',
    //   },
    // })
  }

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

  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'keyWord':
        await setKeyWord(e.target.value)
        break

      case 'year':
        await setYear(e.target.value)
        break

      case 'daily':
        await setDaily(e.target.name)
        break
      case 'weekly':
        await setDaily(e.target.name)
        break
      case 'monthly':
        await setDaily(e.target.name)
        break
      case 'login-email':
        await setLoginEmail(e.target.value)
        setLoginEmailValidation(false)
        break
      case 'login-password-modal':
        await setLoginPassword(e.target.value)
        setLoginPasswordValidation(false)
        break
    }
  }

  const saveSearchesInput = (e, selected) => {
    if (selected == true && e.target.name == 'instant') {
      setInstantAlert(1)
    } else {
      setInstantAlert(0)
    }
    if (selected == true && e.target.name == 'directly') {
      setDirectly('yes')
    } else {
      setDirectly('No')
    }
  }

  const submitSearchData = async () => {
    if (userSearchName == '' || userSearchName == undefined) {
      setUserSearchNameValidation(true)
    }
    if (transformedData != null && transformedData != undefined) {
      if (userSearchName !== '' && userSearchName !== undefined) {
        setLoading(true)
        const response = await saveSearch(
          userSearchName,
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
          userID
        )
        if (response.status == true) {
          setUserSearchName('')
          Swal.fire({
            text: ' Search save successfully',
            timer: 1500,
            icon: 'success',

            confirmButtonColor: '#009ef7',

            confirmButtonText: 'Ok',
          })
          setLoading(false)
          setIsOpen(false)
          setSaveSearchButtonToggler('notSave')
        }
      }
    } else {
      setShow(true)
      setIsOpen(false)
    }
  }

  const getSearchDataSave = async () => {
    setButtonLoader(true)
    let mapIndustries = []
    try {
      const result = await getSaveSearches(accessToken)
      if (result.status === true) {
        setSaveSearchData(result?.search_save?.data)
        setButtonLoader(false)
      } else {
        setButtonLoader(false)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)

      setButtonLoader(false)
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  function closeMoreFilterModalModal() {
    setIsShowMoreFilterModal(false)
  }

  const modalClose = () => {
    setLoginStatus(false)
    setShow(false)
  }
  const loginHandler = async (e) => {
    if (loginEmail == '' || loginEmail == undefined || !isValidEmail(loginEmail)) {
      setLoginEmailValidation(true)
    }
    if (loginPassword == '' || loginPassword == undefined) {
      setLoginPasswordValidation(true)
    }
    if (
      loginEmail != '' &&
      loginEmail != undefined &&
      isValidEmail(loginEmail) &&
      loginPassword != '' &&
      loginPassword != undefined
    ) {
      setLoginButtonLoader(true)
      try {
        const result = await loginUser(loginEmail, loginPassword)

        if (result.status === true) {
          setShow(false)

          localStorage.setItem(
            'userData',
            JSON.stringify({
              accessToken: result.token,
              userName: result.user.first_name,
              role: result.role[0].name,
              userID: result.user.id,
            })
          )
          window.location.reload()

          const response = await saveSearch(
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
            userID
          )
          if (response.status == true) {
            Swal.fire({
              text: 'saved successfully',
              timer: 1500,
              icon: 'success',

              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
            setSaveSearchButtonToggler('notSave')
          }
        } else {
          setLoginButtonLoader(false)

          // console.log('else false', result.message)
          setLoginStatus(true)
        }
      } catch (error) {
        setLoginButtonLoader(false)

        console.error(error)

        setLoginStatus(true)
      }
    }
  }

  const getSingleSaveSearch = async (
    e,
    id,
    countries,
    industries,
    listings,
    keywords,
    establish_year,
    min_price,
    max_price,
    min_gross,
    max_gross,
    add_data,
    locations_states,
    locations_cities,
    max_cash,
    min_cash
  ) => {
    let countriesArray = []
    let countryId = []
    let countryID = []
    let statesArray = []
    let statesId = []
    let stateID = []
    let cityArray = []
    let cityId = []
    let cityID = []
    let industriesArray = []
    let industriesIdies = []

    let listingsArray = []
    let listingsId = []

    if (keywords) {
      localStorage.setItem(
        'tag',
        JSON.stringify({
          tag: keywords,
        })
      )

      setKeyWord(keywords)
    }
    if (establish_year) {
      setYear(establish_year)
      localStorage.setItem(
        'years',
        JSON.stringify({
          years: establish_year,
        })
      )
    }

    if (min_price != null && min_price != '' && min_price != undefined) {
      setMinPriceRange(min_price)
      localStorage.setItem(
        'minPrice',
        JSON.stringify({
          minPrice: min_price,
        })
      )
    }

    if (max_price != null && max_price != '' && max_price != undefined) {
      localStorage.setItem(
        'maxPrice',
        JSON.stringify({
          maxPrice: max_price,
        })
      )
      setMaxPriceRange(max_price)
    }
    if (min_cash != null && min_cash != '' && min_cash != undefined) {
      localStorage.setItem(
        'cashMinPrice',
        JSON.stringify({
          cashMinPrice: min_cash,
        })
      )
      setCashMin(min_cash)
    }
    if (max_cash != null && max_cash != '' && max_cash != undefined) {
      localStorage.setItem(
        'cashMaxPrice',
        JSON.stringify({
          cashMaxPrice: max_cash,
        })
      )
      setCashMax(max_cash)
    }
    if (min_gross != null && min_gross != '' && min_gross != undefined) {
      setGrossMin(min_gross)
      localStorage.setItem(
        'grossMinPrice',
        JSON.stringify({
          grossMinPrice: min_gross,
        })
      )
    }
    if (max_gross != null && max_gross != '' && max_gross != undefined) {
      setGrossMax(max_gross)
      localStorage.setItem(
        'grossMaxPrice',
        JSON.stringify({
          grossMaxPrice: max_gross,
        })
      )
    }
    if (add_data != null && add_data != '' && add_data != undefined) {
      setAddDate(add_data)

      localStorage.setItem(
        'addDates',
        JSON.stringify({
          addDates: add_data,
        })
      )
    }

    await countries?.map((item) => {
      countriesArray.push({
        id: item?.id,
        name: item?.name,
      })
      countryId.push(item?.id)
      countryID.push(item?.name)
    })
    await locations_states?.map((item) => {
      statesArray.push({
        id: item?.id,
        name: item?.name,
      })
      statesId.push(item?.id)
      stateID.push(item?.name)
    })
    await locations_cities?.map((item) => {
      cityArray.push({
        id: item?.id,
        name: item?.name,
      })
      cityId.push(item?.id)
      cityID.push(item?.name)
    })
    await industries?.map((item) => {
      industriesArray.push({
        id: item?.id,
        name: item?.name,
      })
      industriesIdies.push(item?.id)
    })

    await listings?.map((item) => {
      listingsArray.push({
        id: item?.id,
        name: item?.type,
      })
      listingsId.push(item?.id)
    })

    setLocationValue(countriesArray)
    setIndustry(industriesArray)
    setListing(listingsArray)
    setStatesValue(statesArray)
    setCitiesValue(cityArray)

    try {
      const result = await getFilteredData(
        page,
        listingsId,
        industriesIdies,
        min_price,
        max_price,
        grossMinPrice,
        grossMaxPrice,
        min_cash,
        max_cash,
        tag,
        addDates,
        years,
        cityId,
        countryId,
        statesId
      )
      setFilterResultData(result)
      await props.getFilterData(result)

      localStorage.setItem(
        'listingsID',
        JSON.stringify({
          listingsID: listingsId,
        })
      )
      localStorage.setItem('listingName', JSON.stringify(listingsArray))
      localStorage.setItem(
        'industriesID',
        JSON.stringify({
          industriesID: industriesIdies,
        })
      )
      let locationValue = countriesArray
      let statesValue = statesArray
      let citiesValue = cityArray
      localStorage.setItem('industriesName', JSON.stringify(industriesArray))
      let locations = {locationValue, statesValue, citiesValue}
      await localStorage.setItem('locationFilter', JSON.stringify(locations))

      localStorage.setItem('countryID', JSON.stringify(countryID))
      localStorage.setItem('stateID', JSON.stringify(stateID))
      localStorage.setItem('cityID', JSON.stringify(cityID))
    } catch (err) {}
    dispatch({
      type: 'INDUSTRY',
      payload: {
        updateTopbar,
      },
    })
  }
  const onChangeDate = async (e) => {
    setDate(e)
    setYear(e.getFullYear())
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
  function agentAlertHandler() {
    Swal.fire({
      text: modalText,

      icon: 'warning',
      // timer: 2000,
      confirmButtonColor: '#009ef7',

      confirmButtonText: 'Ok',
    })
  }
  return (
    <>
      <div className='container  py-3 '>
        <div className=' d-flex biz-owner-filter-top-bar gap-lg-4 gap-1   align-items-center  justify-content-lg-start'>
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
                          {locationValue?.length > 0 ? <span>{locationValue?.length},</span> : null}
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
                </div>
              </div>
              <img
                src={filterLocation}
                className='text-white cursor-pointer mx-2 mx-sm-5 d-lg-none biz-owner-filter-icons'
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
                            disable={statesValue?.length == 0 || statesValue == null ? true : false}
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
                    className={`ms-lg-10 ${
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
                    <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
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
                    {listing ? listing?.length > 0 ? <span>({listing.length})</span> : null : null}
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
                      <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
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
              <Modal.Footer className='py-4 d-flex justify-content-between'>
                <button type='button' className='btn btn-light' onClick={closeMoreFilterModalModal}>
                  Close
                </button>

                <button type='button' className='btn btn-primary' onClick={() => submitData()}>
                  Apply
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className=''>
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
          <div className='ms-auto '>
            <div>
              {transformedData ? (
                <>
                  <div className='text-nowrap '>
                    {saveSearchButtonToggler == 'save' ? (
                      <>
                        <button
                          type='button'
                          title='Save your filter result'
                          className='btn  btn-primary  px-1 py-1 py-sm-3 px-lg-4  biz-save-searches'
                          onClick={() => {
                            role == 'agent' ? agentAlertHandler() : openModal()
                          }}
                        >
                          Save Search
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type='button'
                          title='Saved searches'
                          className='btn btn-primary saved-btn px-3 py-1 py-sm-3 px-lg-7 biz-save-searches '
                        >
                          Saved
                        </button>
                        <span
                          className=' pb-2 pt-1 pb-md-4 pt-md-3 biz-drop-down-border d-none d-md-inline'
                          style={{
                            backgroundColor: 'black',
                            height: '41px',
                            width: '1px',
                            position: 'absolute',
                            zIndex: '2',
                          }}
                        ></span>
                        <button
                          type='button'
                          className='btn btn-primary  py-1 py-sm-3 text-white dropdown-toggle-split px-3 px-lg-5 biz-save-searches-drop-down'
                          id={role == 'agent' ? '' : 'dropdownMenuReference'}
                          data-bs-toggle={role == 'agent' ? null : 'dropdown'}
                          aria-expanded='false'
                          data-bs-reference='parent'
                          onClick={(e) => {
                            role == 'agent' ? agentAlertHandler() : getSearchDataSave(e)
                          }}
                          style={{
                            borderTopRightRadius: '5px',
                            borderBottomRightRadius: '5px',
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                          }}
                        >
                          <MdOutlineKeyboardArrowDown className=' fs-2 text-white' />
                        </button>

                        <ul
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuReference'
                          style={{maxHeight: '45vh', overflowY: 'scroll'}}
                        >
                          {ButtonLoader ? (
                            <li
                              className='px-3 py-1 cursor-pointer'
                              // onClick={(e) => getSingleSaveSearch(e, item?.id)}
                            >
                              <img src={btnLoader} alt='' />
                            </li>
                          ) : (
                            <>
                              {saveSearchData?.length ? (
                                saveSearchData?.map((item, index) => (
                                  <>
                                    <li
                                      key={index}
                                      className='px-3 py-1 cursor-pointer'
                                      onClick={(e) =>
                                        getSingleSaveSearch(
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
                                          item?.search_save_cities,
                                          item?.max_cash,
                                          item?.min_cash
                                        )
                                      }
                                    >
                                      <>
                                        {item?.title?.substring(0, 30)}
                                        {item?.title?.length >= 30 && '...'}
                                      </>
                                    </li>
                                  </>
                                ))
                              ) : (
                                <li className='ps-4'>No Record</li>
                              )}
                            </>
                          )}
                          {/* {saveSearchData?.length < 1 && <li className='ps-4'>No record</li>} */}
                        </ul>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className='dropdown '>
                    <button
                      type='button'
                      className='btn btn-primary px-4 rounded-pill py-1 py-sm-3'
                      onClick={() => openModal()}
                      title='Save your filter result'
                    >
                      <img className='d-none d-sm-inline mb-1' src={SaveSearchesIcon} /> Save{' '}
                      <span className='d-none d-sm-inline'>Search</span>
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                      <li className='d-none d-lg-block'>
                        <button className='btn btn-primary'>My Save Searches</button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
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
              <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header className='py-4 fs-3' closeButton>
          Save This Search
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column  '>
            {/*begin::Label*/}
            <label className='d-flex align-items-center mb-1 fs-6 fw-bold  required'>
              <span className=''>Name of Your Search</span>
            </label>
            <div className=''>
              <input
                type='text'
                className='form-control form-control-solid'
                placeholder='Name of Your Search'
                value={userSearchName}
                onChange={(e) => {
                  setUserSearchName(e.target.value)
                  setUserSearchNameValidation(false)
                }}
              />
              {userSearchNameValidation ? (
                <div className='' style={{color: 'red', borderTop: '.5px solid red'}}>
                  Please enter a name for your saved search.
                </div>
              ) : null}
            </div>
            <label className='d-flex align-items-center fs-6 fw-bold mb-4 mt-4'>
              <span className=''>Email Notification Preferences</span>
            </label>
            {/*end::Label*/}
            {/*begin::Buttons*/}
            <div className='d-flex flex-stack gap-5 mb-3'>
              {daily == 'daily' ? (
                <button
                  type='button'
                  className={`btn btn-primary w-100  `}
                  name='daily'
                  onClick={(e) => inputChange(e)}
                >
                  Daily
                </button>
              ) : (
                <button
                  type='button'
                  className={`btn  btn-light-primary w-100 `}
                  name='daily'
                  onClick={(e) => inputChange(e)}
                >
                  Daily
                </button>
              )}
              {daily == 'weekly' ? (
                <button
                  type='button'
                  className={`btn btn-primary w-100  `}
                  name='weekly'
                  onClick={(e) => inputChange(e)}
                >
                  Weekly
                </button>
              ) : (
                <button
                  type='button'
                  className={`btn btn-light-primary w-100 `}
                  name='weekly'
                  onClick={(e) => inputChange(e)}
                >
                  Weekly
                </button>
              )}
              {daily == 'monthly' ? (
                <button
                  type='button'
                  className={`btn btn-primary w-100  `}
                  name='monthly'
                  onClick={(e) => inputChange(e)}
                >
                  Monthly
                </button>
              ) : (
                <button
                  type='button'
                  className={`btn btn-light-primary w-100 `}
                  name='monthly'
                  onClick={(e) => inputChange(e)}
                >
                  Monthly
                </button>
              )}
            </div>
          </div>

          <div className='form-check form-switch my-5'>
            <input
              className='form-check-input'
              type='checkbox'
              id='flexSwitchCheckChecked'
              defaultChecked
              name='instant'
              value={instantAlert}
              onChange={(e) => saveSearchesInput(e, e.target.checked)}
            />
            <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
              {' '}
              Instant Alerts{' '}
            </label>
          </div>
          <div className='form-check form-switch my-5'>
            <input
              className='form-check-input'
              type='checkbox'
              id='flexSwitchCheckChecked'
              defaultChecked
              name='directly'
              value={directly}
              onChange={(e) => saveSearchesInput(e, e.target.checked)}
            />
            <label className='form-check-label fs-8' htmlFor='flexSwitchCheckChecked'>
              Allow sellers with businesses matching your criteria to contact you directly, your
              email address will not be revealed
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer className='py-2'>
          <Button variant='primary' onClick={() => submitSearchData()}>
            {!loading && <span className='indicator-label '>Save Search</span>}
            {loading && (
              <span className='indicator-progress px-4' style={{display: 'block'}}>
                <img src={btnLoader} alt='' style={{height: '20px'}} />
              </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isModalShow} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='col-12'>
            <h4 className='text-center my-3'>Sign in to save this search</h4>
            <p className='text-center mb-4'>
              Don't have an account?{' '}
              <span
                className='text-primary cursor-pointer'
                onClick={() => navigate('/auth/registration')}
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                {' '}
                Create one here.
              </span>
            </p>
            {loginStatus == true && (
              <p className='text-center text-danger mt-4'>Invalid login credentials</p>
            )}
            <div className='mb-10 my-5'>
              <input
                type='email'
                name='login-email'
                value={loginEmail}
                className='form-control form-control-solid '
                placeholder='Email Address'
                onChange={(e) => inputChange(e)}
              />
              {loginEmailValidation ? (
                <div className='biz_owner_input_validation'>Invalid email</div>
              ) : null}
            </div>
            <div className='mb-10'>
              <input
                type='password'
                name='login-password-modal'
                value={loginPassword}
                className='form-control form-control-solid required'
                placeholder='Password'
                onChange={(e) => inputChange(e)}
              />
              {loginPasswordValidation ? (
                <div className='biz_owner_input_validation'>Invalid password</div>
              ) : null}
            </div>
          </div>

          <div className=' text-center d-flex flex-column pb-4'>
            {loginEmail != '' &&
            loginEmail != undefined &&
            isValidEmail(loginEmail) &&
            loginPassword != '' &&
            loginPassword != undefined ? (
              <div>
                {loginButtonLoader ? (
                  <button
                    type='button'
                    className='btn btn-primary  px-10'
                    // onClick={(e) => loginHandler(e)}
                  >
                    {/* Sign In */}
                    <img src={btnLoader} alt='' style={{height: '20px'}} />
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='btn btn-primary  px-10'
                    id='kt_sign_in_submit'
                    onClick={(e) => loginHandler(e, props?.id, props?.favorite)}
                  >
                    Sign In
                  </button>
                )}
              </div>
            ) : (
              <div>
                <button
                  type='button'
                  className='btn btn-primary  px-10'
                  onClick={(e) => loginHandler(e)}
                >
                  Sign In
                  {/* <img src={btnLoader} alt='' /> */}
                </button>
              </div>
            )}

            {/* <p className='my-3 pb-3'>            
                  <Link                              
                    to='#'                           
                    data-bs-toggle='modal'           
                    data-bs-target='#kt_modal_forgot'
                    data-bs-dismiss='modal'          
                  >                                  
                    Forgot Your Password             
                  </Link>                            
                </p> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TopBar
