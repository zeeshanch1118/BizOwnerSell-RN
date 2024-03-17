import React, {useEffect, useState} from 'react'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import {Link} from 'react-router-dom'
import '../../../components/BuyBizzOwner.css'
import Swal from 'sweetalert2'
import {
  getAllfranchisesListings,
  deletefranchisesListing,
} from '../../services/franchise-services/index'
import Pagination from '../../../common component/Pagination'
import dummyImg from '../../../assets/dummy.jpg'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import btnLoader from '../../../assets/Loader/ButtonLoader.gif'
import {updateFranchiseListingStatus} from '../../services/business-services'
import {updateFranchiseStatus, updateFranchiseStatusUser} from '../../services/buy-a-franchises'
import {Modal} from 'react-bootstrap'
import {modalText} from '../../alert-text'
const Listings = () => {
  const [loader, setLoader] = useState(false)
  const [listingStatusCheckBox, setListingStatusCheckBox] = useState('')
  const [lastPage, setLastPage] = useState(0)
  const [listingStatus, setListingStatus] = useState('')
  const [franchiseId, setFranchiseId] = useState('')
  const [soldPrice, setSoldPrice] = useState('')
  const [isStatusLoader, SetStatusLoader] = useState(false)
  const [isShowStatusModal, setIsShowStatusModal] = useState(false)
  const [soldPriceValidation, SetSoldPriceValidation] = useState(false)
  const [showListings, setShowListings] = useState(false)
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const {role} = transformedData
  const [allFranchise, setAllFranchise] = useState([])
  useEffect(() => {
    getFranchiseListings(1)
  }, [])
  const getFranchiseListings = async (page) => {
    try {
      const result = await getAllfranchisesListings(accessToken, page)

      if (result.status == true) {
        setLoader(true)
        setAllFranchise(result.franchises.data)
        setLastPage(result.franchises.last_page)
        console.log('getFranchiseListings', result)
      }
    } catch (e) {
      console.log('error getAllfranchisesListings', e)
    }
  }
  const removeBusinessListings = async (franchiseID) => {
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
        const result = await deletefranchisesListing(accessToken, franchiseID)
        if (result.status == true) {
          let franchiseArray = [...allFranchise]

          franchiseArray.map((item, index) => {
            if (item.id === franchiseID) {
              franchiseArray.splice(index, 1)
            }
          })

          setAllFranchise(franchiseArray)
          // setAllFranchise(result.businesses)
        }
      }
    } catch (e) {
      console.log('error deletefranchisesListings', e)
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

  const editFranchise = (e, status) => {
    localStorage.removeItem('stepSkipAble')

    localStorage.setItem('editBtn', 'franchiseBtn')
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
    await getFranchiseListings(page)
  }

  const listingStatusHandler = async (e) => {
    if (listingStatus != '') {
      SetStatusLoader(true)
      try {
        const result = await updateFranchiseListingStatus(
          franchiseId,
          listingStatus,
          soldPrice,
          accessToken
        )
        console.log('result', result)
        if (result.status == true) {
          Swal.fire({
            text: 'Status updated successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
          SetStatusLoader(false)
          let allFranchiseArray = [...allFranchise]

          allFranchiseArray.map((item, index) => {
            if (item.id === franchiseId) {
              allFranchiseArray[index] = result?.franchise
            }
          })

          setAllFranchise(allFranchiseArray)

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
      // setFinancing(true)
      setListingStatusCheckBox('inactive')
      const statusResult = await updateFranchiseStatusUser(franchiseId, 'inactive', accessToken)
      if (statusResult.status == true) {
        getFranchiseListings(1)
      } else if (statusResult.status == false) {
        if (statusResult.franchise) {
          setIsShowStatusModal(false)
          const resultRemove = await Swal.fire({
            allowOutsideClick: true,
            // title: 'danger',
            text: statusResult?.franchise,
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
      // setFinancing(false)
      setListingStatusCheckBox('active')
      const statusResult = await updateFranchiseStatusUser(franchiseId, 'active', accessToken)
      if (statusResult.status == true) {
        getFranchiseListings(1)
      } else if (statusResult.status == false) {
        if (statusResult.franchise) {
          setIsShowStatusModal(false)
          const resultRemove = await Swal.fire({
            allowOutsideClick: true,
            // title: 'danger',
            text: statusResult?.franchise,
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
      {loader ? (
        <div className='row bg-white pb-4    rounded '>
          {/* <h4 className='bizOwner-inner-heading'>Franchise</h4> */}
          {console.log('first', allFranchise)}
          {allFranchise.length > 0 ? (
            allFranchise.map((franchise, franchiseIndex) => (
              <div key={franchiseIndex}>
                <div className='row py-6 m-auto border-1 border-bottom'>
                  <div
                    className='col-md-3 px-0 '
                    style={{height: '150px', overflow: 'hidden', border: '.2px solid #f1e6e6'}}
                  >
                    {franchise.slider_images[0]?.full_path ? (
                      <img
                        className='d-block m-auto  img-fluid'
                        src={
                          franchise.slider_images[0]?.full_path +
                          'medium/' +
                          franchise.slider_images[0]?.file_name
                        }
                        alt=''
                        // style={{ objectFit: "contain" }}
                        style={{height: '100%', width: '100%'}}
                      />
                    ) : (
                      <img style={{height: '100%', width: '100%'}} src={dummyImg} alt='' />
                    )}
                  </div>
                  <div className='col-md-6 mt-5 mt-md-0'>
                    <Link
                      to={
                        franchise.active_by_user == 'active'
                          ? `/my-franchise/${franchise.slug}/${franchise.id}`
                          : '#'
                      }
                      className={`bizOwner-dashboard-details my-2 ${
                        franchise.active_by_user == 'active' ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <b> Title: </b> {franchise.title.substring(0, 50)}
                    </Link>
                    <span className='d-block bizOwner-dashboard-details my-2'>
                      <b>Listing: </b> {franchise.id} —{' '}
                      <span
                        className={`${
                          franchise.active_by_user == 'pending' ? 'badge badge-warning' : ''
                        }  ${franchise.active_by_user == 'active' ? 'badge badge-success' : ''} ${
                          franchise.active_by_user == 'inactive' ? 'badge badge-danger' : ''
                        } `}
                      >
                        {franchise.active_by_user}
                      </span>
                    </span>
                    {franchise.created_at !== '' &&
                      franchise.created_at !== null &&
                      franchise.created_at !== undefined && (
                        <span className='d-block bizOwner-dashboard-details my-2'>
                          <b>Published at: </b> {dateFormateHandler(franchise.created_at)}
                        </span>
                      )}
                    {franchise.cash_required !== '' &&
                      franchise.cash_required !== undefined &&
                      franchise.cash_required !== null && (
                        <span className='d-block bizOwner-dashboard-details my-2'>
                          <b>Price: $</b>
                          {franchise?.cash_required}
                        </span>
                      )}
                    {franchise.frenchise_since !== '' &&
                      franchise.frenchise_since !== null &&
                      franchise.frenchise_since !== undefined && (
                        <span className='d-block bizOwner-dashboard-details my-2'>
                          <b>Franchise since: </b>
                          {dateFormateHandler(franchise.frenchise_since)}
                        </span>
                      )}
                    {franchise.agent !== '' &&
                      franchise.agent !== null &&
                      franchise.agent !== undefined && (
                        <span className='d-block bizOwner-dashboard-details my-2'>
                          <b>Created by: </b>
                          {franchise.agent?.username ?? ''}
                        </span>
                      )}
                  </div>
                  {console.log('franchise', franchise)}
                  <div className='col-md-3 text-end'>
                    {franchise.active_by_user == 'active' ||
                    franchise.active_by_user == 'inactive' ? (
                      <>
                        {franchise?.id == franchiseId && isStatusLoader ? (
                          <>
                            <img src={btnLoader} alt='' style={{height: '25px', width: '25px'}} />
                          </>
                        ) : (
                          role !== 'agent' && (
                            <>
                              {franchise?.sold == 'sale' ? (
                                <span
                                  className='pe-md-3 cursor-pointer badge badge-secondary'
                                  onClick={(e) => {
                                    setFranchiseId(franchise?.id)
                                    setListingStatus('for sale')
                                    setIsShowStatusModal(true)
                                    setListingStatusCheckBox(franchise.active_by_user)
                                  }}
                                >
                                  <span className='pe-1'>
                                    <MdModeEdit
                                      size={12}
                                      color='black'
                                      onClick={(e) => {
                                        setFranchiseId(franchise?.id)
                                        setListingStatus('for sale')
                                        setIsShowStatusModal(true)
                                        setListingStatusCheckBox(franchise.active_by_user)
                                      }}
                                    />
                                  </span>
                                  For Sale
                                </span>
                              ) : franchise?.sold == 'sold' ? (
                                <span
                                  className='pe-md-3 cursor-pointer badge badge-success'
                                  data-bs-toggle='modal'
                                  data-bs-target='#exampleModal'
                                  onClick={(e) => {
                                    setFranchiseId(franchise?.id)
                                    setListingStatus('sold')
                                    setIsShowStatusModal(true)
                                    setListingStatusCheckBox(franchise.active_by_user)
                                  }}
                                >
                                  <span className='pe-2'>
                                    <MdModeEdit
                                      size={12}
                                      color='white'
                                      onClick={(e) => {
                                        setFranchiseId(franchise?.id)
                                        setListingStatus('sold')
                                        setIsShowStatusModal(true)
                                        setListingStatusCheckBox(franchise.active_by_user)
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

                    {franchise.active_by_user !== 'inactive' && (
                      <span className='mx-2'>
                        <Link to={`/dashboard/add-to-new-listing/${franchise.id}`}>
                          <i className='cursor-pointer text-dark border-1' title='Edit Listing'>
                            <MdModeEdit
                              size={23}
                              color='#009ef7'
                              onClick={(e) => editFranchise(e, franchise.payment_status)}
                            />
                          </i>
                        </Link>
                      </span>
                    )}
                    {role !== 'agent' && (
                      <span>
                        <Link to='#'>
                          <i className='cursor-pointer text-dark   border-1' title='Delete Listing'>
                            <MdDelete
                              size={26}
                              style={{color: 'gray'}}
                              onClick={() => removeBusinessListings(franchise.id)}
                            />
                          </i>
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
                onClick={(e) => SetSoldPriceValidation(false)}
              />
            </div>
            <div className='modal-body'>
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
                {listingStatusCheckBox == 'active' ? (
                  <input
                    className='form-check-input me-2 cursor-pointer'
                    type='checkbox'
                    onChange={(e) => showListing(e.target.checked)}
                    checked={false}
                  />
                ) : (
                  <input
                    className='form-check-input me-2 cursor-pointer'
                    type='checkbox'
                    onChange={(e) => showListing(e.target.checked)}
                    checked={true}
                  />
                )}

                <label className='  fw-bold form-label mb-2'>
                  <span className=''>Hide this list from public</span>
                </label>
              </div>
            </div>
            <div className='modal-footer py-3'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={(e) => SetSoldPriceValidation(false)}
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
                      onClick={(e) => listingStatusHandler(e)}
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
                  onClick={(e) => listingStatusHandler(e)}
                >
                  Save
                </button>
              )}
            </div>
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

export default Listings
