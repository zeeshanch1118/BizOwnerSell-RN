import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {ImLocation} from 'react-icons/im'
import Swal from 'sweetalert2'

import {
  getLocation,
  updateLocationStatus,
} from '../../components/services/admin-services/manage-locations'
import {getCountries} from '../../components/services/get-fields-data'

import './ManageLocation.css'
import {KTCardBody, KTCard} from '../../_metronic/helpers'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import blockLocationIcon from '../../assets/blockLocationIcon.svg'
import Pagination from '../../common component/Pagination'

const ManageLocation = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countryError, setCountryError] = useState(false)
  const [countryErrorValue, setCountryErrorValue] = useState('')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const [allLocation, setAllLocation] = useState([])
  const [allCountry, setAllCountry] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const {accessToken} = transformedData
  const [loader, setLoader] = useState(false)
  const [lastPage, setLastPage] = useState([])
  useEffect(() => {
    getAllBusinessLocation()
    getAllCountries()
  }, [])
  const getAllCountries = async () => {
    let mapCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()

      if (result.status === true) {
        result?.countries.map((item, index) =>
          mapCountries.push({value: item.id, label: item.name})
        )
        filterCountries = mapCountries.filter((x) => {
          return x.value !== 39 && x.value !== 233
        })
        filterCountries.unshift({value: 233, label: 'United States'}, {value: 39, label: 'Canada'})
        setAllCountry(filterCountries)
      }
    } catch (err) {
      console.log('get Locations err', err)
    }
  }
  const getAllBusinessLocation = async (page) => {
    try {
      const result = await getLocation(accessToken, page)

      if (result.status === true) {
        setLastPage(result.locations.last_page)
        setLoader(true)
        setAllLocation(result.locations)
      } else {
        setLoader(false)
      }
    } catch (err) {
      setLoader(false)
    }
  }

  ///////////Toast Message Function///////////

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
  const addLocation = async () => {
    setLoading(true)
    if (selectedCountry === '' || selectedCountry === undefined || selectedCountry.length < 1) {
      setCountryError(true)
      setCountryErrorValue('Country is required')
      setLoading(false)
    }
    if (selectedCountry != '' && selectedCountry != undefined && countryError == false) {
      let country = [selectedCountry.label]
      const result = await updateLocationStatus(country[0], 'inactive', accessToken)

      if (result.status === true) {
        Toast.fire({
          icon: 'success',
          title: 'Location block successfully',
        })
        setLoading(false)
        let locationsArray = [...allLocation]
        locationsArray.unshift(result.locations)
        setAllLocation(locationsArray)
        setOpenModel(false)
      } else {
        setLoading(false)
        setCountryError(true)
        setCountryErrorValue(result.locations)
        Toast.fire({
          icon: 'error',
          title: 'Please try again',
        })
      }
    }
  }
  const updateStatus = async (country, status) => {
    try {
      const resultLocation = await Swal.fire({
        text: 'Are you sure you want to active this location?',
        icon: 'warning',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, active!',
        reverseButtons: true,
      })
      if (resultLocation.isConfirmed) {
        const result = await updateLocationStatus(country, status, accessToken)

        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Location unblock successfully',
          })
          let locationsArray = [...allLocation]
          locationsArray.map((item, index) => {
            if (item.name === country) {
              locationsArray.splice(index, 1)
            }
          })
          setAllLocation(locationsArray)
        } else {
          setLoading(false)
          Toast.fire({
            icon: 'error',
            title: 'Please try again',
          })
        }
      } else if (resultLocation.isDismissed) {
        // console.log('isDenied')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllBusinessLocation(page)
  }

  const listingTypesChange = async (e) => {
    await setSelectedCountry(e)
    setCountryError(false)
    setLoading(false)
  }
  const dateFormateHandler = (createdAt) => {
    let today = new Date(createdAt)
    let date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
    }).format(today)
    return date
  }
  const onKeyPressBlock = (e) => {
    if (e.key === 'Enter') {
      addLocation()
    }
  }
  return (
    <>
      {/* Header Start */}

      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Manage Locations</h3>
                  </div>
                </div>

                <div
                  className='d-flex justify-content-end align-items-center'
                  data-kt-user-table-toolbar='base'
                >
                  <img
                    src={blockLocationIcon}
                    title='Add location'
                    className='cursor-pointer  w-40px h-40px'
                    alt='addFeaturesIcon'
                    onClick={() => {
                      setOpenModel(true)
                      setCountryError(false)
                      setSelectedCountry('')
                      setLoading(false)
                    }}
                  />
                </div>
              </div>

              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    allLocation?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-125px'>Location</th>
                            <th className='text-center min-w-125px'>Status</th>
                            <th className='text-center min-w-125px'>Block Date</th>
                            <th className='text-center min-w-125px'>Action</th>
                          </tr>
                        </thead>

                        <tbody className='text-gray-600 fw-bold'>
                          {allLocation?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-125px'>{item?.name}</td>
                              <td className='text-center min-w-125px'>
                                <div>
                                  {item.status === 'active' ? (
                                    <span className='badge badge-success'>Active</span>
                                  ) : item.status === 'inactive' ? (
                                    <span className='badge badge-danger me-1 mb-1'>Inactive</span>
                                  ) : (
                                    'No Status'
                                  )}
                                </div>
                              </td>
                              <td className='text-center min-w-125px'>
                                {dateFormateHandler(item?.created_at) ?? 'NO Date'}
                              </td>
                              <td className='text-center min-w-100px'>
                                <ImLocation
                                  size={25}
                                  title='Active'
                                  color='#0000FF'
                                  className='text-primary cursor-pointer'
                                  onClick={() => updateStatus(item?.name, 'active')}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center'
                        style={{height: '70vh'}}
                      >
                        <div>
                          <h1>There are no records to display</h1>
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
      {/*Add Model Start */}
      <Modal size='md' isOpen={openModel} centered={true} toggle={null}>
        <ModalHeader toggle={() => setOpenModel(!openModel)}>
          <h5 className='modal-title'>Block Location</h5>
        </ModalHeader>

        <ModalBody>
          <div className='mb-3 col-md-12'>
            <label htmlFor='exampleFormControlInput1' className='required form-label'>
              Select Country
            </label>
            <Select
              type='search'
              value={selectedCountry}
              name='listing'
              options={allCountry}
              onKeyPress={(e) => onKeyPressBlock(e)}
              placeholder='Select Country'
              onChange={listingTypesChange}
            />

            {countryError && <p className='text-danger myError'>{countryErrorValue}</p>}
          </div>
        </ModalBody>

        <ModalFooter className='text-center py-5'>
          <button
            type='reset'
            className='btn btn-light me-3'
            onClick={() => {
              setOpenModel(!openModel)
            }}
          >
            Discard
          </button>

          <button type='button' className='btn btn-primary' onClick={addLocation}>
            {!loading && <span className='indicator-label'>Block</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ManageLocation
