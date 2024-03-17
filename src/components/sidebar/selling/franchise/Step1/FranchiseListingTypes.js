import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import Select from 'react-select'
import Multiselect from 'multiselect-react-dropdown'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useNavigate, useParams} from 'react-router-dom'
import './ListingTypes.css'
import '../../../../../components/BuyBizzOwner.css'
import ButtonLoader from '../../../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../../../assets/Loader/MainScreenLoader.gif'
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete'
import {
  getBusinessListingTypes,
  getIndustryTypes,
  getCountries,
  getStates,
  getCities,
  getLocationVisibility,
  getFranchisesTypes,
} from '../../../../services/get-fields-data'
import {
  createfranchiseFirstStep,
  getSinglefranchises,
  updatefranchiseFirstStep,
} from '../../../../services/franchise-services/index'
import {MdOutlineCancel} from 'react-icons/md'
import Swal from 'sweetalert2'

const FranchiseListingTypes = (props) => {
  const {biz_id} = useParams()
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const [recordedFranchiseID, setRecordedFranchiseID] = useState('')

  const startup = [
    {name: ' Restaurants & Food', id: ' Restaurants & Food'},
    {name: ' Service Businesses', id: ' Service Businesses'},
    {name: '  Automotive & Boat', id: '  Automotive & Boat'},

    {name: '  Building & Construction', id: '  Building & Construction'},
    {name: ' Retail', id: ' Retail'},
    {name: '  Health Care & Fitness', id: '  Health Care & Fitness'},
    {name: ' Service Businesses', id: ' Service Businesses'},
  ]
  var country = [
    {country: 'Farrel Hoggin'},
    {country: 'Irma Olech'},
    {country: 'Irma Olech'},
    {country: 'Irma Olech'},
    {country: 'Emmit Gallacher'},
    {country: 'Dunn Astlet'},
    {country: 'Burg Peaddie'},

    {country: 'Darrelle Enevold'},
    {country: 'Wilmer Willmott'},
    {country: 'Kathryne Maytom'},
  ]
  const [selectedListing, setSelectedListing] = useState('')
  const [industryValue, setIndustryValue] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [locationValue, setLocationValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [toggleInput, setToggleInput] = useState(true)
  const [businessAddressValue, setBusinessAddressValue] = useState('')
  const [searchItems, setSearchItems] = useState(country)
  const [isContinue, setIsContinue] = useState(false)
  const [financing, setFinancing] = useState(0)
  const [addressValue, setAddressValue] = useState('')
  const [startuplocation, setStartuplocation] = useState('')
  const [allListings, setAllListings] = useState([])

  const [allCountries, setAllCountries] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  const [allVisibleLocations, setAllVisibleLocations] = useState([])

  const [headline, setHeadline] = useState('')
  const [street, setStreet] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [locationValidation, setLocationValidation] = useState(false)

  const [stateValidation, setStateValidation] = useState(false)
  const [addressValidation, setAddressValidation] = useState(false)

  // validation states
  const [listingValidation, setListingValidation] = useState(false)
  const [industryValidation, setIndustryValidation] = useState(false)
  const [headlineValiDation, setHeadlineValiDation] = useState(false)
  const [businessAddressValidation, setBusinessAddressValidation] = useState(false)
  const [cityValidation, setCityValidation] = useState(false)
  const [locationsValidation, setLocationsValidation] = useState(false)
  const [loaderScreen, setLoaderScreen] = useState(false)
  const [streetValiDation, setStreetValiDation] = useState(false)
  const [emailValiDation, setEmailValiDation] = useState(false)
  const [phoneValiDation, setPhoneValiDation] = useState(false)
  const [zipCodeValiDation, setZipCodeValiDation] = useState(false)
  const [streetValidation, setStreetValidation] = useState(false)
  const [address, setAddress] = useState('')
  const [addressObj, setAddressObj] = useState('')
  const [found, setFound] = useState(false)
  const [go, setGo] = useState(false)
  const [listingStatus, setListingStatus] = useState(null)
  const Navigate = useNavigate()
  let goNext = false

  const getfranchiseID = localStorage.getItem('franchiseID')
  const transformedfranchiseID = JSON?.parse(getfranchiseID)
  const {franchiseID} = transformedfranchiseID ?? ''
  ////////////////////
  useEffect(() => {
    getfranchisesTypes()
    getAllCountries()
    getAllLocationVisibility()
    getAllStates(242)
    getAllCities(5072)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (biz_id) {
      setRecordedFranchiseID(biz_id)
      getSingleFranchise(accessToken, biz_id)
    } else if (franchiseID) {
      setRecordedFranchiseID(franchiseID)
      getSingleFranchise(accessToken, franchiseID)
    }
  }, [biz_id, franchiseID])

  const getSingleFranchise = async (accessToken, ID) => {
    try {
      setLoaderScreen(true)
      const result = await getSinglefranchises(accessToken, ID)

      if (result.status === true) {
        setLoaderScreen(false)
        console.log('result', result)
        setFinancing(result.franchise?.finance ?? 0)
        setListingStatus(result.franchise?.status)
        if (
          result.franchise?.location?.place_id !== '' &&
          result.franchise?.location?.place_id !== null
        ) {
          setFound(false)
          setAddressObj(result.franchise?.location)

          setAddress({
            label: result.franchise?.location?.formatted_address,
            value: result.franchise?.location?.formatted_address,
          })
          // setGo(false)
          // setStreetValidation(false)
        } else {
          setFound(true)
          console.log('.location?.country', result.franchise?.location?.country)
          addressChange({
            value: result.franchise?.location?.country_id,
            label: result.franchise?.location?.country,
          })
          stateChange({
            value: result.franchise?.location?.state_id,
            label: result.franchise?.location?.province,
          })
          cityChange({
            value: result.franchise?.location?.city_id,
            label: result.franchise?.location?.city,
          })
          setGo(true)
          setStreetValidation(true)
          setStreet(result.franchise?.location?.address)

          setZipCode(result.franchise?.location?.postal_code)
        }
        listingTypesChange({
          value: result.franchise?.franchise_category?.id,
          label: result.franchise?.franchise_category?.name,
        })
        locationChange({
          value: result.franchise?.location_visibitiy?.id,
          label: result.franchise?.location_visibitiy?.name,
        })
        setAddressValue({
          value: result.franchise?.location?.country,
          label: result.franchise?.location?.country,
        })
        setHeadline(result.franchise?.title)
        setEmail(result.franchise?.email)
        setPhone(result.franchise?.phone)
        setHeadlineValiDation(false)
        // setEmailValiDation(false)
        // setPhoneValiDation(false)
        setGo(true)
        setStreetValidation(true)

        console.log('this data from api', result)
      } else {
        // setIsContinue(true)
      }
    } catch (err) {
      setLoaderScreen(false)
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const getfranchisesTypes = async () => {
    let mapFranchises = []
    try {
      const result = await getFranchisesTypes()
      if (result.status === true) {
        result.data.map((item, index) => mapFranchises.push({value: item.id, label: item.name}))
        setAllListings(mapFranchises)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const getAllCountries = async () => {
    let mapCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result.countries.map((item, index) => mapCountries.push({value: item.id, label: item.name}))
        filterCountries = mapCountries.filter((x) => {
          return x.value !== 39 && x.value !== 233
        })
        filterCountries.unshift({value: 233, label: 'United States'}, {value: 39, label: 'Canada'})
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
      const result = await getStates(countryID, accessToken)

      if (result.status === true) {
        result.states.map((item, index) => mapStates.push({value: item.id, label: item.name}))
        setAllStates(mapStates)
      }
      // mapStates.map((val) => {
      //   if (val.value == 5072) {
      //     setStateValue(val)
      //   }
      // })
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getAllCities = async (stateID) => {
    let mapCities = []
    try {
      const result = await getCities(stateID, accessToken)

      if (result.status === true) {
        result.cities.map((item, index) => mapCities.push({value: item.id, label: item.name}))
        setAllCities(mapCities)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getAllLocationVisibility = async () => {
    let mapLocations = []
    try {
      const result = await getLocationVisibility(accessToken)
      if (result.status === true) {
        result.location_visibilty.map((item, index) =>
          mapLocations.push({value: item.id, label: item.name})
        )
        setAllVisibleLocations(mapLocations)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const listingTypesChange = async (e) => {
    await setSelectedListing(e)
    setIsContinue(false)

    if (selectedListing.label == 'Startup Opportunity') {
      setToggleInput(false)
    } else {
      setToggleInput(true)
    }
    setListingValidation(false)

    // validation
  }

  const startUplocationChange = async (e) => {
    setIsContinue(false)

    await setStartuplocation(e)

    // validation
  }
  const industryChange = async (event) => {
    await setIndustryValue(event)
    setIsContinue(false)
    setIndustryValidation(false)
  }
  const stateChange = async (e) => {
    setStateValue(e)
    getAllCities(e.value)
    setStateValidation(false)
    setIsContinue(false)
  }
  const locationChange = async (e) => {
    setLocationValue(e)
    setLocationValidation(false)
    setIsContinue(false)
  }
  const addressChange = async (e) => {
    setAddressValue(e)
    getAllStates(e.value)
    setAddressValidation(false)
    setIsContinue(false)
  }
  const cityChange = async (e) => {
    await setCityValue(e)
    setIsContinue(false)

    setCityValidation(false)
  }
  const phoneNumberHandler = async (phone) => {
    await setPhone(phone)
    await setPhoneValiDation(false)
    setIsContinue(false)
  }
  const businessAddress = async (e) => {
    setIsContinue(false)

    await setBusinessAddressValue(e.target.value)
    setBusinessAddressValidation(false)
    if (e.target.value.length >= 1) {
      const filterData = country.filter((item) => {
        const searchTerm = businessAddressValue.toLowerCase()
        const fullName = item.country.toLowerCase()
        return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm
      })
      setSearchItems(filterData)
    }
    if (e.target.value.length >= 1 && searchItems.length < 1) {
      // console.log('heheehe')
    }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const onSearch = async (searchTerm, e) => {
    await setIndustryValue(searchTerm)
  }

  const onInputChange = async (event, files) => {
    // if (event.target.name == 'zipCode' && event.target.length < 6) {
    //   setZipCode(event.target.value)
    // }
    setIsContinue(false)

    switch (event.target.name) {
      case 'headline':
        await setHeadline(event.target.value)
        setHeadlineValiDation(false)
        break

      case 'street':
        let street_a = false
        await setStreet(event.target.value)
        await setStreetValiDation(false)
        if (event.target.value.length > 0) {
          street_a = true
          setStreetValidation(street_a)
        } else {
          street_a = false
          setStreetValidation(street_a)
        }

        break

      case 'email':
        setEmail(event.target.value)
        await setEmailValiDation(false)
        // const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/
        // console.log(regex)
        setEmailValiDation(false)
        // console.log(email)
        // if (!email.endsWith('gmail.com')) {
        //   setEmailValiDation(true)
        //   setGoNext(true)
        // } else {
        //   setGoNext(false)
        // }
        // if (email.endsWith('gmail.com')) {
        //   setEmailValiDation(false)
        //   setGoNext(true)
        // } else {
        //   setGoNext(false)
        // }

        break
      // case 'phone':
      //   await setPhone(event.target.value)
      //   await setPhoneValiDation(false)
      //   break
      case 'zipCode':
        if (event.target.value.length > event.target.maxLength) {
          event.target.value = event.target.value.slice(0, event.target.maxLength)
        }
        if (event.target.value.length > 0) {
          goNext = true
          setGo(goNext)
        } else {
          goNext = false
          setGo(goNext)
        }

        await setZipCode(event.target.value)

        await setZipCodeValiDation(false)
        break
    }
  }

  const propData = async (e) => {
    e.preventDefault()
    // if (found == false) {
    //   setStreetValiDation(false)
    //   setStateValidation(false)
    //   setCityValidation(false)
    //   setAddressValidation(false)
    //   setZipCodeValiDation(false)
    // } else {
    //   if (zipCode == '' || zipCode == undefined || zipCode.length <= 2) {
    //     setZipCodeValiDation(true)
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValiDation(true)
      console.log('emailval============>', emailValiDation)
      window.scrollTo(0, 300)
    }
    if (phone == '' || phone == undefined || phone.length <= 8) {
      setPhoneValiDation(true)
      window.scrollTo(0, 300)
    }
    //     window.scrollTo(0, 300)
    //   }
    //   if (street == '' || street == undefined) {
    //     setStreetValiDation(true)
    //     window.scrollTo(0, 300)
    //   }
    if (stateValue == '' || stateValue == undefined) {
      setStateValidation(true)
      window.scrollTo(0, 300)
    }
    //   if (cityValue == '' || cityValue == undefined) {
    //     setCityValidation(true)
    //     window.scrollTo(0, 300)
    //   }
    //   if (addressValue == '' || addressValue == undefined) {
    //     setAddressValidation(true)
    //     window.scrollTo(0, 300)
    //   }
    // }
    let locationAdd
    let country = addressValue?.label
    let province = stateValue?.label
    let city = cityValue?.label
    if (street == '' || street == undefined) {
      setStreetValiDation(true)
      window.scrollTo(0, 300)
    }
    if (zipCode == '' || zipCode == undefined) {
      setZipCodeValiDation(true)
    }
    if (address === '' || address === null) {
      setLocationsValidation(true)

      if (cityValue == '' || cityValue == undefined) {
        setCityValidation(true)
      }

      // if (addressValue == '' || addressValue == undefined) {
      //   setAddressValidation(true)
      // }
      // if (zipCode == '' || zipCode == undefined) {
      //   setZipCodeValiDation(true)
      // }

      locationAdd = {
        country: country,
        province: province,
        city: city,
        address: street,
        postal_code: zipCode,
      }
    } else if (address !== '' || address !== null) {
      setLocationsValidation(false)
      setStreetValidation(true)
      setGo(true)
      locationAdd = addressObj
    }
    if (selectedListing == '' || selectedListing == undefined) {
      setListingValidation(true)
      window.scrollTo(0, 300)
    }

    if (headline == '' || headline == undefined) {
      setHeadlineValiDation(true)
      window.scrollTo(0, 300)
    }

    // if (zipCode == '' || zipCode == undefined || zipCode.length <= 2) {
    //   setZipCodeValiDation(true)
    //   window.scrollTo(0, 300)
    // }
    if (locationValue == '' || locationValue == undefined) {
      setLocationValidation(true)
      window.scrollTo(0, 300)
    }

    if (
      found == false &&
      selectedListing != '' &&
      selectedListing != undefined &&
      headline != '' &&
      headline != undefined &&
      locationValue != '' &&
      locationValue != undefined &&
      phone != '' &&
      phone != undefined &&
      isValidEmail(email) &&
      // emailValiDation == false &&

      phone.length > 8 &&
      email != '' &&
      email != undefined &&
      address != '' &&
      address != undefined
      // zipCodeValiDation == false &&

      // go == true &&
      // streetValidation == false
    ) {
      console.log('true====>')
      if (biz_id || franchiseID) {
        setIsContinue(true)
        const result = await updatefranchiseFirstStep(
          locationAdd,
          locationValue.value,
          headline,
          selectedListing.value,
          phone,
          email,
          accessToken,
          recordedFranchiseID,
          financing,
          listingStatus
        )
        if (result.status === true) {
          setIsContinue(false)
          props.nextStep()
        } else {
          if (result.message) {
            const resultRemove = await Swal.fire({
              allowOutsideClick: false,

              text: result.message,
              icon: 'warning',
              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
          }
          setIsContinue(false)

          console.log('Error in first step businessID', result)
        }
      } else {
        setIsContinue(true)
        const result = await createfranchiseFirstStep(
          locationAdd,
          locationValue.value,
          headline,
          selectedListing.value,
          phone,
          email,
          accessToken
        )

        if (result.status === true) {
          setIsContinue(false)
          localStorage.setItem(
            'franchiseID',
            JSON.stringify({
              franchiseID: result.franchise.id,
            })
          )

          props.nextStep()
        } else {
          if (result.message) {
            const resultRemove = await Swal.fire({
              allowOutsideClick: false,

              text: result.message,
              icon: 'warning',
              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
          }
          setIsContinue(false)

          console.log('Error in first step ', result)
        }
        // }
      }
    } else if (
      found == true &&
      selectedListing != '' &&
      isValidEmail(email) &&
      phone.length > 8 &&
      selectedListing != undefined &&
      headline != '' &&
      headline != undefined &&
      locationValue != '' &&
      locationValue != undefined &&
      phone != '' &&
      phone != undefined &&
      phone.length > 7 &&
      email != '' &&
      email != undefined &&
      street != '' &&
      street != undefined &&
      zipCode != '' &&
      zipCode != undefined &&
      zipCode.length > 2 &&
      stateValue != '' &&
      stateValue != undefined &&
      cityValue != '' &&
      cityValue != undefined
    ) {
      if (biz_id || franchiseID) {
        setIsContinue(true)
        const result = await updatefranchiseFirstStep(
          locationAdd,
          locationValue.value,
          headline,
          selectedListing.value,
          phone,
          email,
          accessToken,
          recordedFranchiseID,
          financing,
          listingStatus
        )
        if (result.status === true) {
          setIsContinue(false)
          props.nextStep()
        } else {
          if (result.message) {
            const resultRemove = await Swal.fire({
              allowOutsideClick: false,

              text: result.message,
              icon: 'warning',
              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
          }
          setIsContinue(false)

          console.log('Error in first step businessID', result)
        }
      } else {
        setIsContinue(true)
        const result = await createfranchiseFirstStep(
          locationAdd,
          locationValue.value,
          headline,
          selectedListing.value,
          phone,
          email,
          accessToken
        )

        if (result.status === true) {
          setIsContinue(false)
          localStorage.setItem(
            'franchiseID',
            JSON.stringify({
              franchiseID: result.franchise.id,
            })
          )

          props.nextStep()
        } else {
          if (result.message) {
            const resultRemove = await Swal.fire({
              allowOutsideClick: false,

              text: result.message,
              icon: 'warning',
              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
          }
          setIsContinue(false)

          console.log('Error in first step ', result)
        }
        // }
      }
      setIsContinue(false)
    }
  }
  ///////////Get Address In Object Form///////////

  const getAddressObject = (address_components, place_id, geometry) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      street: ['street_address', 'route'],
      province: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    }

    let address = {
      street_number: '',
      postal_code: '',
      street: '',
      province: '',
      city: '',
      country: '',
      place_id: place_id,
      lat: geometry.location.lat(),
      lng: geometry.location.lng(),
    }

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'country') {
            address[shouldBe] = component.long_name
          } else {
            address[shouldBe] = component.long_name
          }
        }
      }
    })

    // Fix the shape to match our schema
    address.address = address.street_number + ' ' + address.street
    delete address.street_number
    delete address.street
    if (address.country === 'US') {
      address.state = address.province
      delete address.province
    }
    return address
  }
  ///////////useEffect For GeocodeByPlaceId  Record///////////
  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address && address.value && (await geocodeByPlaceId(address.value.place_id))
      const addressObject =
        geocodeObj &&
        getAddressObject(
          geocodeObj[0].address_components,
          geocodeObj[0].place_id,
          geocodeObj[0].geometry
        )

      setAddressObj(addressObject)
    }
    func()
  }, [address])
  return (
    <>
      {!loaderScreen ? (
        <div className='container mx-auto pb-20 px-md-10'>
          <div className='row'>
            <div className=' mt-md-5  mx-auto'>
              <h3 className='  bizOwner-add-new-listing-headings'>
                Tell us about your franchise
                <i
                  className='fas fa-exclamation-circle ps-3 cursor-pointer  d-none d-md-inline'
                  data-bs-toggle='modal'
                  data-bs-target='#tolTip'
                ></i>
              </h3>

              <p className='bizOwner-add-new-listing-inner-heading'>
                You may keep certain information confidential but keep in mind, the more details you
                provide the more effective your listing will be.
              </p>
            </div>
            <div className='col-md-6 mt-5 '>
              <div className=''>
                <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                  Choose an franchise for your listing
                </label>

                <div className=' '>
                  <Select
                    type='search'
                    value={selectedListing}
                    name='listing'
                    options={allListings}
                    placeholder='Please Select A Listing Type'
                    onChange={listingTypesChange}
                  />
                  {listingValidation ? (
                    <div className='biz_owner_input_validation'>Select listing type</div>
                  ) : null}
                </div>
              </div>
            </div>
            {/* listing industry  */}

            {/* headline  */}
            <div className='col-md-6 mt-5 headLine '>
              <label className='form-label required '>Headline for this listing</label>

              <input
                type='text'
                placeholder='Create An Attractive Title For Potential Buyers'
                className='form-control form-control-lg form-control-solid ps-lg-3'
                name='headline'
                value={headline}
                onChange={(e) => onInputChange(e)}
                required
              />
              {headlineValiDation ? (
                <div className='biz_owner_input_validation'>Enter headline for listing </div>
              ) : null}
            </div>
            {toggleInput ? (
              <>
                {/* location  */}
                <div className='mt-4 col-md-6  mt-5'>
                  <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                    Location visibility
                  </label>

                  <Select
                    type='search'
                    placeholder='Select Location Visibility'
                    options={allVisibleLocations}
                    value={locationValue}
                    onChange={(e) => locationChange(e)}
                  />
                  {locationValidation ? (
                    <div className='biz_owner_input_validation'>Select location</div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className=' col-12'>
                  <label className='form-label required'>
                    Which states is the startup available in?
                  </label>
                  <Multiselect
                    options={startup} // Options to display in the dropdown
                    selectedvalues={startuplocation} // Preselected value to persist in dropdown
                    onSelect={startUplocationChange} // Function will trigger on select event
                    // onRemove={startUplocationChange} // Function will trigger on remove event
                    displayValue='name' // Property name to display in the dropdown options
                    placeholder='Start Up Location'
                    showArrow={false}
                    // value={startuplocation}
                    singleSelect={false}
                    closeIcon={false}
                    showCheckbox={true}
                    // onChange={startUplocationChange}
                    style={{
                      searchBox: {
                        // To change search box element look
                        fontSize: 12,
                        minHeight: 48,
                        // maxHeight: 85,
                        backgroundColor: '#f5f8fa',
                      },
                      option: {
                        // To change css for dropdown options

                        color: 'black',
                        // backgroundColor: '#f5f8fa',
                      },
                    }}
                  />
                </div>
              </>
            )}

            {/* email  */}

            <div className=' col-md-6 mt-5 email'>
              <label for='validationCustomUsername ' className='form-label required'>
                Email address for buyer inquiries
              </label>

              <input
                type='email'
                placeholder='jhondoe@email.com'
                className='form-control form-control-lg form-control-solid ps-lg-3'
                name='email'
                value={email}
                id='validationCustomUsername'
                onChange={(e) => onInputChange(e)}
                aria-describedby='inputGroupPrepend'
                required
              />
              {emailValiDation ? (
                <div className='biz_owner_input_validation'>Invalid email address</div>
              ) : null}
            </div>
            {/* phone number  */}
            <div className='col-md-6 mt-5'>
              <label className='form-label required'>Phone number for listing</label>

              <PhoneInput country={'us'} value={phone} onChange={phoneNumberHandler} />
              {phoneValiDation ? (
                <div className='biz_owner_input_validation'>Enter correct phone number</div>
              ) : null}
            </div>
            {/* address  */}
            {found ? (
              <div className=' mt-5 d-flex justify-content-between'>
                <label className='form-label required '>Franchise address</label>
                <i
                  className='cursor-pointer'
                  onClick={() => {
                    setFound(false)
                    // setZipCodeValiDation(false)
                    // setZipCode('')
                    // setStreet('')
                  }}
                >
                  <MdOutlineCancel color={'red'} size={20} />
                </i>
              </div>
            ) : (
              <>
                {' '}
                <div className='col-12 mt-5'>
                  <div className=' d-flex justify-content-md-between'>
                    <label className='form-label required '>Franchise address</label>
                    <label
                      className=' form-label text-primary ps-3 cursor-pointer mt-1'
                      onClick={() => {
                        setFound(true)
                        setAddress('')
                        setAddressObj('')
                        setLocationsValidation(false)
                      }}
                    >
                      Add <span className='d-none d-md-inline'>location </span>
                      manually
                    </label>
                  </div>
                  <div
                    onClick={(e) => {
                      setFound(false)
                      e.target.classList?.value == ` css-1uccc91-singleValue`
                        ? setAddress('')
                        : null
                    }}
                    id='fgApi'
                  >
                    <GooglePlacesAutocomplete
                      fetchDetails={true}
                      minLength={2}
                      placeholder='Search Location'
                      apiKey='AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU'
                      selectProps={{
                        value: address,
                        onChange: (e) => {
                          setAddress(e)
                          setAddressObj('')
                          setLocationsValidation(false)
                          setIsContinue(false)
                        },
                        isDisabled: found ? true : false,
                        isClearable: true,
                      }}
                    />
                    {locationsValidation && !found ? (
                      <div className='biz_owner_input_validation'>Select location</div>
                    ) : null}
                  </div>
                  {businessAddressValidation ? (
                    <div className='biz_owner_input_validation'>Choose industry</div>
                  ) : null}
                  {businessAddressValue.length >= 1 ? (
                    <>
                      <div
                        id='biz_owner_industry_options'
                        className=' pt-2   w-100 '
                        style={{backgroundColor: '#f5f8fa'}}
                      >
                        {searchItems.slice(0, 10).map((item) => (
                          <div
                            onClick={(e) => onSearch(item.country, e)}
                            className='biz_owner_search_options_value cursor-pointer search_items py-1 px-5'
                            key={item.country}
                          >
                            <div>{item.country.length > 0 ? item.country : <p>ss</p>}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            )}
          </div>
          <div className={`${found ? 'row mx-0' : null}`} style={{backgroundColor: '#fafafa'}}>
            {/* street address  */}
            {found && (
              <div className=' col-md-6 street mt-5'>
                <label className='form-label required'>Street address</label>

                <input
                  type='text'
                  placeholder='Enter Street Address'
                  className='form-control form-control-lg form-control-solid ps-lg-3 '
                  name='street'
                  value={street}
                  onChange={(e) => onInputChange(e)}
                />
                {streetValiDation ? (
                  <div className='biz_owner_input_validation'>Enter street address</div>
                ) : null}
              </div>
            )}
            {/* city  */}
            {found && (
              <div className='col-md-6  mt-5'>
                <label className='form-label required'>City</label>

                <Select
                  type='search'
                  options={allCities}
                  placeholder='Select Franchise City'
                  value={cityValue}
                  onChange={cityChange}
                />
                {cityValidation ? (
                  <div className='biz_owner_input_validation'>Select city</div>
                ) : null}
              </div>
            )}
            {/* state  */}
            {found && (
              <div className='col-md-6 mt-5'>
                <label className='form-label required'>State</label>

                <Select
                  type='search'
                  options={allStates}
                  value={stateValue}
                  placeholder='Select State'
                  onChange={(e) => stateChange(e)}
                />
                {stateValidation ? (
                  <div className='biz_owner_input_validation'>Select state</div>
                ) : null}
              </div>
            )}
            {/* country  */}
            {found && (
              <div className='  col-md-6 mt-5'>
                <div className='  '>
                  <label className='form-label required'>Country</label>
                  <div className='col-12 '>
                    <Select
                      type='search'
                      options={allCountries}
                      value={addressValue}
                      placeholder='Select Country'
                      onChange={(e) => addressChange(e)}
                    />
                    {addressValidation ? (
                      <div className='biz_owner_input_validation'>Select franchise address</div>
                    ) : null}
                  </div>
                </div>{' '}
              </div>
            )}

            {/* zip code  */}
            {found && (
              <div className='col-md-6 zipCode my-5'>
                <label for='quantity' className='form-label required'>
                  Zip code
                </label>

                <input
                  type='number'
                  placeholder='Enter Zip Code'
                  className='form-control form-control-lg form-control-solid ps-lg-3'
                  name='zipCode'
                  id='quantity'
                  maxLength={6}
                  value={zipCode}
                  onChange={(e) => onInputChange(e)}
                />
                {zipCodeValiDation ? (
                  <div className='biz_owner_input_validation'>Invalid zip code</div>
                ) : null}
              </div>
            )}
          </div>
          <div>
            <div className=' d-flex justify-content-end  mt-10'>
              {isContinue == true ? (
                <span className='btn btn-primary'>
                  {/* <div className='spinner-border text-white' role='status'> */}
                  <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
                  {/* <span className='visually-hidden'></span> */}
                  {/* </div> */}
                </span>
              ) : (
                <button className='btn btn-primary ' onClick={(e) => propData(e)}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
      {/* toltips modal */}

      <div
        className='modal fade'
        id='tolTip'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-md modal-dialog-centered px-0'>
          <div className='modal-content'>
            <div className='modal-header py-5'>
              <h3 className=''>Listing Types</h3>

              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <h5>Established Business for Sale</h5>
              <p>
                Currently operating with clientele and a revenue history (with or without real
                estate included).
              </p>
              <h5>Asset Sale</h5>
              <p>Closed or a partially developed business with assets to sell.</p>
              <h5>Business Real Estate for Sale</h5>
              <p>Property for sale only.</p>
              <h5>Business Real Estate for Lease</h5>
              <p>Property for lease only.</p>
              <h5>Startup Opportunities</h5>
              <p>
                Distributorships, sales territories, inventions, new websites or a business that
                does not have a sufficient operating and revenue history to qualify as well
                established in the marketplace. We will also accept listings looking for business
                partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FranchiseListingTypes
