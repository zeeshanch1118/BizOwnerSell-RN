import {useEffect, useState} from 'react'

import {MdDelete, MdModeEdit} from 'react-icons/md'
import {Link} from 'react-router-dom'
import '../../../components/BuyBizzOwner.css'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import btnLoader from '../../../assets/Loader/ButtonLoader.gif'
import {
  getAllBusinessesListings,
  deleteBusinessesListing,
  updateListingStatus,
} from '../../services/business-services/index'
import dummyImg from '../../../assets/dummy.jpg'

import Swal from 'sweetalert2'
import Pagination from '../../../common component/Pagination'
import {
  updateBusinessStatus,
  updateBusinessStatusUser,
} from '../../services/forSearchBusiness/Index'
import {Modal} from 'react-bootstrap'
const Business = () => {
  const [loader, setLoader] = useState(false)
  const [soldPriceValidation, SetSoldPriceValidation] = useState(false)
  const [isStatusLoader, SetStatusLoader] = useState(false)
  const [isShowStatusModal, setIsShowStatusModal] = useState(false)

  const [lastPage, setLastPage] = useState([])
  const [listingStatus, setListingStatus] = useState('')
  const [businessId, setBusinessId] = useState('')
  const [soldPrice, setSoldPrice] = useState('')
  const [listingStatusCheckBox, setListingStatusCheckBox] = useState(null)
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const {role} = transformedData
  const [allBusinesses, setAllBusinesses] = useState([])
  const [isListingStatusModal, setIsListingStatusModal] = useState(true)

  useEffect(() => {
    getBusinessListings(1)
  }, [])

  const getBusinessListings = async (page) => {
    try {
      const result = await getAllBusinessesListings(accessToken, page)
      if (result.status == true) {
        setAllBusinesses(result.businesses.data)
        setLastPage(result.businesses.last_page)
        setLoader(true)
        console.log('getAllBusinessesListings ', result)
      }
    } catch (e) {
      console.log('error getAllBusinessesListings', e)
    }
  }
  const removeBusinessListings = async (businessID) => {
    try {
      const resultRemove = await Swal.fire({
        text: 'Are you sure you want to delete this list?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (resultRemove.isConfirmed) {
        const result = await deleteBusinessesListing(accessToken, businessID)
        if (result.status == true) {
          // setAllBusinesses(result.businesses)
          let businessesArray = [...allBusinesses]

          businessesArray.map((item, index) => {
            if (item.id === businessID) {
              businessesArray.splice(index, 1)
            }
          })

          setAllBusinesses(businessesArray)
        }
      }
    } catch (e) {
      console.log('error deleteBusinessesListings', e)
    }
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
  const editBusiness = (e, status) => {
    localStorage.removeItem('stepSkipAble')
    localStorage.setItem('editBtn', 'businessBtn')
    localStorage.setItem('listingStatus', status)
  }

  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getBusinessListings(page)
  }
  const closeModal = () => {
    setIsListingStatusModal(false)
  }
  const listingStatusHandler = async (e) => {
    if (listingStatus != '') {
      SetStatusLoader(true)
      try {
        const result = await updateListingStatus(businessId, listingStatus, soldPrice, accessToken)

        if (result.status == true) {
          Swal.fire({
            text: 'Status updated successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
          SetStatusLoader(false)
          let businessesArray = [...allBusinesses]

          businessesArray.map((item, index) => {
            if (item.id === businessId) {
              businessesArray[index] = result?.business
            }
          })

          setAllBusinesses(businessesArray)

          setSoldPrice('')
          setListingStatus('')
        } else {
          setSoldPrice('')
          setListingStatus('')
          Swal.fire({
            text: `${result.message ?? 'Please try again'}`,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
          SetStatusLoader(false)
        }
      } catch (error) {
        SetStatusLoader(false)
      }
    }
  }
  const showListing = async (e) => {
    if (e == true) {
      setListingStatusCheckBox('inactive')
      const statusResult = await updateBusinessStatusUser(businessId, 'inactive', accessToken)
      console.log('statusResult', statusResult)
      if (statusResult.status == true) {
        getBusinessListings(1)
      } else if (statusResult.status == false) {
        if (statusResult.business) {
          setIsShowStatusModal(false)
          const resultRemove = await Swal.fire({
            allowOutsideClick: true,
            // title: 'danger',
            text: statusResult?.business,
            icon: 'warning',
            confirmButtonColor: '#009ef7',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Ok',
            reverseButtons: true,
          })
        }
      }
    } else if (e == false) {
      setListingStatusCheckBox('active')
      const statusResult = await updateBusinessStatusUser(businessId, 'active', accessToken)
      console.log('statusResult', statusResult)
      if (statusResult.status == true) {
        getBusinessListings(1)
      } else if (statusResult.status == false) {
        if (statusResult.business) {
          setIsShowStatusModal(false)
          const resultRemove = await Swal.fire({
            allowOutsideClick: true,
            // title: 'danger',
            text: statusResult?.business,
            icon: 'warning',
            confirmButtonColor: '#009ef7',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Ok',
            reverseButtons: true,
          })
        }
      }
    }
  }
  return (
    <>
      {loader ? (
        <div className='row bg-white pb-4  rounded '>
          {/* <h4 className='bizOwner-inner-heading'>Businesses</h4> */}
          {console.log('first', allBusinesses)}
          {allBusinesses.length > 0 ? (
            allBusinesses?.map((business, businessIndex) => (
              <>
                <div key={businessIndex}>
                  <div className='row py-6 m-auto border-1 border-bottom'>
                    <div
                      className='col-md-3 px-0'
                      style={{height: '150px', overflow: 'hidden', border: '.2px solid #f1e6e6'}}
                    >
                      {business.slider_images[0]?.full_path ? (
                        <img
                          className='d-block m-auto  img-fluid'
                          src={
                            business.slider_images[0]?.full_path +
                            'medium/' +
                            business.slider_images[0]?.file_name
                          }
                          alt=''
                          style={{height: '100%', width: '100%'}}
                        />
                      ) : (
                        <img style={{height: '100%', width: '100%'}} src={dummyImg} alt='' />
                      )}
                    </div>

                    <div className='col-md-6 mt-5 mt-md-0'>
                      <Link
                        to={
                          business?.status == 'active'
                            ? `/my-business/${business.slug}/${business.id}`
                            : '#'
                        }
                        className={`bizOwner-dashboard-details my-2 ${
                          business.active_by_user == 'active' ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <b> Title: </b> {business?.title.substring(0, 50)}
                      </Link>
                      <span className='d-block bizOwner-dashboard-details my-2'>
                        <b>Listing: </b> {business?.id} —{' '}
                        <span
                          className={`${
                            business?.active_by_user == 'pending' ? 'badge badge-warning' : ''
                          }  ${business?.active_by_user == 'active' ? 'badge badge-success' : ''} ${
                            business?.active_by_user == 'inactive' ? 'badge badge-danger' : ''
                          } `}
                        >
                          {business.active_by_user}
                        </span>
                      </span>
                      <span className='d-block bizOwner-dashboard-details my-2'>
                        <b>Published: </b> {dateFormateHandler(business.created_at)}
                      </span>
                      {business.asking_price !== null &&
                        business.asking_price !== undefined &&
                        business.asking_price !== '' && (
                          <span className='d-block bizOwner-dashboard-details my-2'>
                            <b>Price: $</b>
                            {business.asking_price}
                          </span>
                        )}
                      {business.established_at !== '' &&
                        business.established_at !== null &&
                        business.established_at !== undefined && (
                          <span className='d-block bizOwner-dashboard-details my-2'>
                            <b>Established at: </b>
                            {business.established_at}
                            {/* {dateFormateHandler(business.established_at)}  */}
                          </span>
                        )}
                      {business.agent !== '' &&
                        business.agent !== null &&
                        business.agent !== undefined && (
                          <span className='d-block bizOwner-dashboard-details my-2'>
                            <b>Created by: </b>
                            {business.agent?.username ?? ''}
                          </span>
                        )}
                    </div>

                    <div className='col-md-3 text-end'>
                      {business.active_by_user == 'active' ||
                      business.active_by_user == 'inactive' ? (
                        <>
                          {business?.id == businessId && isStatusLoader ? (
                            <>
                              <img src={btnLoader} alt='' style={{height: '25px', width: '25px'}} />
                            </>
                          ) : (
                            role !== 'agent' && (
                              <>
                                {business?.sold == 'sale' ? (
                                  <span
                                    className='pe-md-3 cursor-pointer badge badge-secondary'
                                    data-bs-toggle='modal'
                                    data-bs-target='#exampleModal'
                                    onClick={(e) => {
                                      setBusinessId(business?.id)
                                      setListingStatusCheckBox(business.active_by_user)
                                      setIsShowStatusModal(true)
                                    }}
                                  >
                                    <span className='pe-1'>
                                      <MdModeEdit
                                        size={12}
                                        color='black'
                                        onClick={(e) => {
                                          setBusinessId(business?.id)
                                          setListingStatusCheckBox(business.active_by_user)
                                          setIsShowStatusModal(true)
                                        }}
                                      />
                                    </span>
                                    For Sale
                                  </span>
                                ) : business?.sold == 'sold' ? (
                                  <span
                                    className='pe-md-3 cursor-pointer badge badge-success'
                                    data-bs-toggle='modal'
                                    data-bs-target='#exampleModal'
                                    onClick={(e) => {
                                      setBusinessId(business?.id)
                                      setIsShowStatusModal(true)
                                      setListingStatusCheckBox(business.active_by_user)
                                    }}
                                  >
                                    <span className='pe-1'>
                                      <MdModeEdit
                                        size={12}
                                        color='white'
                                        onClick={(e) => {
                                          setBusinessId(business?.id)
                                          setListingStatusCheckBox(business.active_by_user)
                                          setIsShowStatusModal(true)
                                        }}
                                      />
                                    </span>
                                    Sold
                                  </span>
                                ) : null}
                              </>
                            )
                          )}
                        </>
                      ) : null}

                      {business.active_by_user !== 'inactive' && (
                        <span className='mx-2'>
                          <Link to={`/dashboard/add-to-new-listing/${business.id}`}>
                            <i className='cursor-pointer text-dark border-1' title='Edit Listing'>
                              <MdModeEdit
                                size={23}
                                color='#009ef7'
                                onClick={(e) => editBusiness(e, business.payment_status)}
                              />
                            </i>
                          </Link>
                        </span>
                      )}
                      {role !== 'agent' && (
                        <span>
                          <Link to='#'>
                            <i
                              className='cursor-pointer text-dark   border-1'
                              title='Delete Listing'
                            >
                              <MdDelete
                                size={26}
                                style={{color: 'gray'}}
                                onClick={() => removeBusinessListings(business.id)}
                              />
                            </i>
                          </Link>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div
              className='d-flex  justify-content-center  align-items-center'
              style={{height: '50vh', width: '140%'}}
            >
              <div>
                <h1>RECORD NOT FOUND</h1>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
      <div className='my-3'>
        {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
      </div>

      {/* <div
        className='modal fade'
        id='exampleModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header py-5'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Listing Status
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              
              />
            </div>
            <div className='modal-body'></div>
            <div className='modal-footer py-3'></div>
          </div>
        </div>
      </div> */}

      <Modal
        show={isShowStatusModal}
        onHide={() => {
          setIsShowStatusModal(!isShowStatusModal)
          SetSoldPriceValidation(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title> Listing Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='col-sm-12 mx-auto'>
            <select
              name=''
              id=''
              className='form-select form-select-solid'
              value={listingStatus}
              onChange={(e) => setListingStatus(e.target.value)}
            >
              <option hidden>Select Listing Status</option>

              <option value='sold'>Sold</option>
              <option value='sale'>For Sale</option>
            </select>
          </div>
          {listingStatus == 'sold' ? (
            <>
              <div className='col-md-12 mx-auto mt-5'>
                <label htmlFor='' className='required'>
                  Enter Sold Price
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Price'
                  onChange={(e) => {
                    setSoldPrice(e.target.value)

                    SetSoldPriceValidation(false)
                  }}
                />
                {soldPriceValidation ? (
                  <div style={{borderTop: '1px solid red', color: 'red'}}>required input</div>
                ) : null}
              </div>
            </>
          ) : // <div className='col-md-8 mx-auto mt-20'></div>
          null}
          <div className='col-md-12 mx-auto mt-5 userListingStatus'>
            {' '}
            {listingStatusCheckBox == 'active' ? (
              <input
                className='form-check-input me-2 cursor-pointer'
                type='checkbox'
                onChange={(e) => showListing(e.target.checked)}
                // defaultChecked={allIndustriesFilterArray.includes(outer.id) && ab.includes(true)}
                checked={false}
              />
            ) : (
              <input
                className='form-check-input me-2 cursor-pointer'
                type='checkbox'
                onChange={(e) => showListing(e.target.checked)}
                // defaultChecked={allIndustriesFilterArray.includes(outer.id) && ab.includes(true)}
                checked={true}
              />
            )}
            <label className='  fw-bold form-label mb-2'>
              <span className=''>Hide this list from public</span>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-dismiss='modal'
            onClick={(e) => {
              SetSoldPriceValidation(false)
              setIsShowStatusModal(!isShowStatusModal)
            }}
          >
            Close
          </button>
          {listingStatus == 'sold' ? (
            <>
              {soldPrice != '' && soldPrice != undefined ? (
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={(e) => {
                    listingStatusHandler(e)

                    setIsShowStatusModal(!isShowStatusModal)
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={(e) => SetSoldPriceValidation(true)}
                >
                  Save Changes
                </button>
              )}
            </>
          ) : (
            <button
              type='button'
              className='btn btn-primary'
              data-bs-dismiss='modal'
              onClick={(e) => {
                listingStatusHandler(e)

                setIsShowStatusModal(!isShowStatusModal)
              }}
            >
              Save
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Business
