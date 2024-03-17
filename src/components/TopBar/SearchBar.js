import Multiselect from 'multiselect-react-dropdown'
import React, {useEffect} from 'react'
import {useState} from 'react'
import {KTSVG} from '../../_metronic/helpers'
import './Searchbar.css'

function SearchBar() {
  const countries = [
    {name: ' United States ', id: ' United States '},
    {name: ' Dominica', id: ' Dominica'},
    {name: '  Brazil', id: ' Brazil'},

    {name: ' Canada', id: ' Canada'},
    {name: ' Jamaica', id: ' Jamaica'},
    {name: ' United States Virgin Islands ', id: '  United States Virgin Islands '},
    {name: 'Falkland Islands', id: ' Falkland Islands'},
  ]
  const states = [
    {name: ' United States ', id: ' United States '},
    {name: ' Dominica', id: ' Dominica'},
    {name: '  Brazil', id: ' Brazil'},

    {name: ' Canada', id: ' Canada'},
    {name: ' Jamaica', id: ' Jamaica'},
    {name: ' United States Virgin Islands (US)', id: '  United States Virgin Islands (US)'},
    {name: 'Falkland Islands', id: ' Falkland Islands'},
  ]
  const cities = [
    {name: ' Alexander City ', id: 'Alexander City '},
    {name: ' Andalusia', id: ' Andalusia'},
    {name: '  Anniston', id: 'Anniston'},

    {name: ' Birmingham', id: ' Birmingham'},
    {name: ' Chickasaw', id: 'Chickasaw'},
    {name: ' Clanton', id: '  Clanton'},
    {name: 'Cullman', id: 'Cullman'},
  ]
  const [locationValue, setLocationValue] = useState(null)
  const [statesValue, setStatesValue] = useState(null)
  const [citiesValue, setCitiesValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  // const [items, setItems] = useState([])

  // const [industry, setIndustry] = useState(null)

  const locationChange = async (e) => {
    await setLocationValue(e)
    // console.log(industry.length)
  }
  const stateLocationChange = async (e) => {
    await setStatesValue(e)
    // console.log(industry.length)
  }
  const citiesLocationHandler = async (e) => {
    await setCitiesValue(e)
    // console.log(industry.length)
  }
  const SaveLocationValue = async () => {
    let locations = {locationValue, statesValue, citiesValue}
    await localStorage.setItem('locationFilter', JSON.stringify(locations))
    // var last = locationValue.slice(-1)[0]
    // setInputValue(last.name)
  }

  const items = JSON?.parse(localStorage.getItem('locationFilter'))
  useEffect(() => {
    if (items) {
      setLocationValue(items.locationValue)

      setStatesValue(items.statesValue)
      setCitiesValue(items.citiesValue)

      // var last = items.slice(-1)[0]
      // setInputValue(last.name)
    }
  }, [])

  return (
    <>
      <div className='search-container h-100'>
        <div className='d-flex align-items-center position-relative  h-100 pb-0'>
          <KTSVG
            path='/media/icons/duotune/general/gen021.svg'
            className='svg-icon-1 text-primary position-absolute  ps-2'
          />
          <button
            style={{color: '#808080'}}
            className='btn btn-white  px-15'
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_all-locations'
          >
            <span className='ps-3'>All Locations</span>
            {locationValue ? (
              <>
                <span>
                  ({locationValue.length > 0 ? <span>{locationValue.length},</span> : null}
                  {statesValue ? (
                    <>
                      <span>
                        {statesValue.length > 0 ? <span>{statesValue.length},</span> : null}
                        {citiesValue ? (
                          <>
                            <span>
                              {citiesValue.length > 0 ? <span>{citiesValue.length}</span> : null}
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
                      )
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
        {/* Search Modal  */}
        {/* {searchToggler ? ( */}

        {/* <div className='search_modal ' id='big_modal'> */}
        {/* <div
            className='d-flex align-items-center position-relative  h-100 pb-0'
            id='biz_owner_search_input'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-1 position-absolute ms-5 '
            />
            <input
              type='text'
              name='search'
              placeholder='All locations'
              className='w-100 h-100 biz_owner_search_bar ps-13 '
              onChange={(e) => onChangeHandler(e)}
              value={value}
            />
          </div>
          <div
            className=' pt-2   w-100 '
            style={{backgroundColor: '#f5f8fa'}}
            id='biz_owner_search_options'
          >
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase()
                const fullName = item.country.toLowerCase()
                return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm
              })
              .slice(0, 10)
              .map((item, index) => (
                <>
                  <div
                    onClick={(e) => onSearch(item.country, e)}
                    className='biz_owner_search_options_value cursor-pointer search_items py-1 px-5'
                    key={item.country}
                  >
                    <div>{item.country.length > 0 ? item.country : 'aaaaaaaaaaaaa'}</div>
                  </div>
                </>
              ))}
          </div> */}
        <div className='modal fade ' tabIndex={-1} id='kt_modal_all-locations'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header p-3'>
                <h5 className='modal-title ps-4'> Locations</h5>

                <div
                  className='btn btn-icon btn-sm text-dark ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <span className='fs-2'>🗙</span>
                </div>
                {/*end::Close*/}
              </div>
              <div className='modal-body pb-0'>
                <label htmlFor=''>Countries</label>
                <Multiselect
                  options={countries}
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
                <label htmlFor='' className='mt-4'>
                  States
                </label>
                <Multiselect
                  options={states}
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
                <label htmlFor='' className='mt-4'>
                  Cities
                </label>
                <Multiselect
                  options={cities}
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
                <div className='modal-footer px-0 d-flex justify-content-between p-3'>
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

        {/* ) : null} */}
      </div>
    </>
  )
}

export default SearchBar
