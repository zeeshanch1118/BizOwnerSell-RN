import React from 'react'
import {useState, useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
// import {KTSVG} from '../../../_metronic/helpers'
import './Searchbar.css'
import Select from 'react-select'
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete'
import {getIndustryTypes, getFranchisesTypes} from '../../services/get-fields-data'
import {useNavigate} from 'react-router-dom'
function SearchBar(props) {
  const [address, setAddress] = useState('')
  const [addressObj, setAddressObj] = useState('')
  const [industries, setIndustries] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [selectFranchiseValue, setSelectFranchiseValue] = useState([])

  const [franchises, setFranchises] = useState([])
  useEffect(() => {
    getAllIndustries()
    getAllFranchises()
  }, [])
  const navigate = useNavigate()
  const getAllIndustries = async () => {
    try {
      const result = await getIndustryTypes()
      if (result.status === true) {
        setIndustries(result.data)
      }
    } catch (err) {
      console.log('getBusinessListingTypeses err', err)
    }
  }
  const getAllFranchises = async () => {
    try {
      const result = await getFranchisesTypes()
      if (result.status === true) {
        setFranchises(result.data)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
    }
  }
  const [value, setValue] = useState('')

  // const onChange = (event) => {
  //   setValue(event.target.value)
  // }

  const onSearch = (searchTerm) => {
    setValue(searchTerm)
    // our api to fetch the search result
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
  let industriesArray = industries?.map((item, i) => ({value: item.id, label: item.name}))
  let franchise = franchises?.map((item, i) => ({value: item.id, label: item.name}))

  function searchIndustries() {
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
    let id
    id = parseInt(selectValue.value)
    let industriesArray = []
    if (selectValue.label !== undefined) {
      industriesArray.push({
        id: selectValue.value,
        name: selectValue.label,
      })
    } else {
      industriesArray = []
    }

    localStorage.setItem(
      'industriesID',
      JSON.stringify({
        industriesID: id ? [id] : [],
      })
    )

    localStorage.setItem('industriesName', JSON.stringify(industriesArray))

    console.log('id', id)
    localStorage.setItem(
      'countryID',
      JSON.stringify(addressObj.country ? [addressObj.country] : [])
    )
    localStorage.setItem(
      'stateID',
      JSON.stringify(addressObj.province ? [addressObj.province] : [])
    )
    localStorage.setItem('cityID', JSON.stringify(addressObj.city ? [addressObj.city] : []))

    navigate('/search-businesses-for-sale')
  }
  function searchFranchises() {
    localStorage.removeItem('franchiseLocationFilter')
    localStorage.removeItem('f_minPrice')
    localStorage.removeItem('f_maxPrice')
    localStorage.removeItem('franchiseListingName')
    localStorage.removeItem('franchiseCountryID')
    localStorage.removeItem('franchisesID')
    localStorage.removeItem('franchiseStateID')
    localStorage.removeItem('franchiseCityID')
    let franchiseArray = []
    if (selectFranchiseValue.label !== undefined) {
      franchiseArray.push({
        id: selectFranchiseValue.value,
        name: selectFranchiseValue.label,
      })
    } else {
      franchiseArray = []
    }
    let id
    id = parseInt(selectFranchiseValue.value)
    localStorage.setItem(
      'franchisesID',
      JSON.stringify({
        franchisesID: id ? [id] : [],
      })
    )

    localStorage.setItem('franchiseListingName', JSON.stringify(franchiseArray))
    localStorage.setItem(
      'franchiseCountryID',
      JSON.stringify(addressObj.country ? [addressObj.country] : [])
    )
    localStorage.setItem(
      'franchiseStateID',
      JSON.stringify(addressObj.province ? [addressObj.province] : [])
    )
    localStorage.setItem(
      'franchiseCityID',
      JSON.stringify(addressObj.city ? [addressObj.city] : [])
    )

    navigate(`/search-franchises`)
  }
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: '100%',
      minHeight: '100%',
      border: 'none',
      // background: '#f5f8fa',
      boxShadow: 'none',
      padding: '3px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '28px',
    }),
    container: (base, state) => ({
      ...base,
      // display: 'flex',
      marginTop: '5px',
      alignItems: 'center',
      width: '100%',
    }),
    dropdownIndicator: (base, state) => {
      return {
        ...base,
        // display: 'none',
      }
    },
    placeholder: (base, state) => ({
      ...base,
      fontWeight: 'normal !important',
      fontFamily: "Helvetica 25 UltraLight', sans-serif !important",
      // color: '#a1a5b7 !important',
    }),
    singleValue: (base, state) => ({
      ...base,
    }),
    menu: (base, state) => ({
      ...base,
      border: 'none',
      onMouseLeave: {
        display: 'none',
      },
      // boxShadow: "none"
    }),
    indicatorSeparator: (base, state) => ({
      ...base,
      display: 'none',
      // boxShadow: "none"
    }),
    crossIcon: (base, state) => ({
      ...base,
      display: 'none',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused && '#f5f8fa',
      color: state.isFocused && 'black',
    }),
  }
  return (
    <>
      <div className='row justify-content-center align-items-center m-0 search-bar-margin px-0'>
        <div className='col-lg-12 d-flex justify-content-center mt-md-4 search-bar px-0'>
          <div className='input-group inputs_border_radius '>
            {/* <input
              type='text' 
              className='form-control text-muted border-input fs-5 my-2'
              placeholder=' Search City, County or State '
              aria-label='Username'
              // value={value}
              // onChange={onChange}
            /> */}
            <div
              className='col-md-5 col-12   bg-white'
              id='gApi'
              onClick={(e) => {
                e.target.classList?.value == ` css-1uccc91-singleValue` ? setAddress('') : null
              }}
            >
              <GooglePlacesAutocomplete
                fetchDetails={true}
                minLength={2}
                apiKey='AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU'
                selectProps={{
                  value: address,
                  placeholder: 'Search City, County or State',
                  onChange: (e) => {
                    setAddress(e)
                    setAddressObj('')
                    // setLocationsValidation(false)
                  },
                  noOptionsMessage: (e) => 'Search Location',
                  // isDisabled: found ? true : false,
                  isClearable: true,

                  // components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
                }}
              />
            </div>
            {!props?.isBusinessToggle ? (
              <>
                <div
                  className='col-md-4 col-9 select_bg_color bg-white border-2 border-start place'
                  id='lading-id'
                >
                  <Select
                    // closeMenuOnSelect={false}
                    options={industriesArray}
                    styles={customStyles}
                    placeholder='Select Industry'
                    onChange={(e) => setSelectValue(e)}
                    value={selectValue}
                    // defaultValue={selectValue}
                    // isMulti
                    // className="basic-multi-select"
                    isClearable={false}
                    // isSearchable={false}
                  />
                  {/* <select
                    className='form-select option-text sm-style border-0 shadow-none py-4 fs-4 text-muted my-2 select_radius '
                    // data-kt-repeater='select2'
                    // data-placeholder='Select an option'
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option className=' fs-5 text-muted' hidden>
                      All Industries
                    </option>
                    <option className=' fs-5 text-muted'>All</option>
                    {industrye}
                  </select> */}
                </div>
                <button
                  className='border-0 search-back-btn bg-white col-3  border-1 border-start m-0 border_radius button_padding'
                  onClick={searchIndustries}
                >
                  <BsSearch
                    size={15}
                    className='btn btn-primary search-btn mt-0 fs-1 text-center my-1 mt-1 '
                  />
                </button>
              </>
            ) : props?.isFranchiseToggle ? (
              <>
                <div
                  className='col-md-4 col-9 select_bg_color bg-white border-2 border-start'
                  id='lading-id'
                >
                  <Select
                    // closeMenuOnSelect={false}
                    options={franchise}
                    styles={customStyles}
                    placeholder='Select Franchise'
                    onChange={(e) => setSelectFranchiseValue(e)}
                    value={selectFranchiseValue}
                    // isMulti
                    // className="basic-multi-select"
                    isClearable={false}
                    // isSearchable={false}
                  />
                </div>
                <button
                  className='border-0 search-back-btn bg-white col-3  border-1 border-start m-0 border_radius button_padding'
                  onClick={searchFranchises}
                >
                  <BsSearch
                    size={15}
                    className='btn btn-primary search-btn mt-0 fs-1 text-center my-1 mt-1 '
                  />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
