import React, {useEffect, useState} from 'react'
import Multiselect from 'multiselect-react-dropdown'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

function ListingTypes() {
  const firstOptions = [
    {name: ' Established  Businesses (1120)', id: ' Established  Businesses (1120)'},
    {name: ' Asset Sales (28)', id: ' Asset Sales (28)'},
    {name: ' Real  Estate (56)', id: '  Real  Estate (56)'},

    {name: '  Start-up  Businesses (209)', id: ' Start-up  Businesses (209)'},
  ]

  const [listing, setListing] = useState(null)

  const listingChange = async (e) => {
    await setListing(e)
    console.log(listing.length)
  }
  const SaveListingData = async () => {
    localStorage.setItem('listingFilters', JSON.stringify(listing))
  }

  useEffect(() => {
    const items = JSON?.parse(localStorage.getItem('listingFilters'))
    if (items) {
      setListing(items)
      console.log(items)
    }
  }, [])

  return (
    <>
      <div>
        <div>
          <button
            style={{color: '#808080'}}
            className='btn btn-white fs-4'
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_listingTypes'
          >
            Listing Types
            <MdOutlineKeyboardArrowDown className='ms-10 fs-2 text-primary' />
            {listing ? (
              <span>{listing.length > 0 ? <span>({listing.length})</span> : null}</span>
            ) : null}
          </button>
        </div>
        {/* Modal  */}

        <div className='modal fade ' tabIndex={-1} id='kt_modal_listingTypes'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header p-3'>
                <h5 className='modal-title ps-4'> listing Types</h5>

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
                <Multiselect
                  options={firstOptions}
                  selectedValues={listing}
                  onSelect={listingChange}
                  onRemove={listingChange}
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
                    onClick={() => SaveListingData()}
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
    </>
  )
}

export default ListingTypes
