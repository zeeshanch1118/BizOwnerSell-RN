import React, {useEffect, useState} from 'react'
import {KTCardBody, KTCard} from '../../../_metronic/helpers'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import listingsIcon from '../../../assets/addListingsIcon.svg'
import Swal from 'sweetalert2'
import './style.css'
import Pagination from '../../../common component/Pagination'
import {
  createListings,
  UpdateListings,
  deleteListings,
  getListings,
} from '../../../components/services/admin-services/businesses-category'
const BusinessListing = () => {
  // Array States
  const [lastPage, setLastPage] = useState([])
  const [allListing, setAllListing] = useState([])
  // Input Value States
  const [listingID, setListingID] = useState('')
  const [listingTitle, setListingTitle] = useState('')
  const [listingSlug, setListingSlug] = useState('')
  // Condition States
  const [loading, setLoading] = useState(false)
  const [errorListingSlug, setErrorListingSlug] = useState('')
  const [businessCount, setBusinessCount] = useState('')
  const [loader, setLoader] = useState(false)
  const [userForm, setUserForm] = useState(true)
  const [firstNameForm, setFirstNameForm] = useState(true)
  const [statusModel, setStatusModel] = useState(false)
  const [statusModelDelete, setStatusModelDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [alternativeId, setAlternativeId] = useState('')
  const [statusEditModel, setStatusEditModel] = useState(false)
  const [alternativeValidation, setAlternativeValidation] = useState(false)
  // Get accessToken
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  useEffect(() => {
    getAllListing()
  }, [])

  // Toast Message
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
  // Clear states
  const clear = () => {
    setListingTitle('')
    setListingSlug('')
    setErrorListingSlug('')
    setFirstNameForm(true)
    setLoading(false)
  }
  // HandleChange States
  const UserNameFunction = (e) => {
    setListingTitle(e.target.value)
    if (e.target.value.length < 1) {
      setUserForm(false)
    } else {
      setUserForm(true)
    }
  }
  const FirstNameFunction = (e) => {
    setListingSlug(e.target.value)
    if (e.target.value.length < 1) {
      setFirstNameForm(false)
      setErrorListingSlug('Slug is required')
    } else {
      setFirstNameForm(true)
    }
  }
  // Get Listings
  const getAllListing = async (page) => {
    try {
      const result = await getListings(accessToken, page)
      if (result.status === true) {
        setLoader(true)
        setAllListing(result?.data?.data)
        setLastPage(result?.data?.last_page)
      }
    } catch (err) {
      setLoader(false)
      console.log('getListings err', err)
    }
  }
  // Add Listing
  const addAllListing = async () => {
    try {
      if (listingTitle.length < 1) {
        setUserForm(false)
      }
      if (listingSlug.length < 1) {
        setFirstNameForm(false)
        setErrorListingSlug('Slug is required')
      }
      if (
        listingTitle !== '' &&
        listingTitle !== 'undefined' &&
        userForm &&
        listingSlug !== '' &&
        listingSlug !== 'undefined' &&
        firstNameForm
      ) {
        setLoading(true)
        const result = await createListings(listingTitle, listingSlug, accessToken)
        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Listing Added successfully',
          })
          setLoading(false)
          setStatusModel(false)
          let industryArray = [...allListing]
          industryArray.push(result.business_listing_type)
          setAllListing(industryArray)
          clear()
        } else {
          setLoading(false)
          setFirstNameForm(false)
          setErrorListingSlug(result.errors.slug)
        }
      }
    } catch (err) {
      setLoading(false)
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }

  // Update Listing
  const editAllListing = async () => {
    try {
      if (listingTitle.length < 1) {
        setUserForm(false)
      }
      if (listingSlug.length < 1) {
        setFirstNameForm(false)
      }
      if (
        listingTitle !== '' &&
        listingTitle !== 'undefined' &&
        userForm &&
        listingSlug !== '' &&
        listingSlug !== 'undefined' &&
        firstNameForm
      ) {
        setLoading(true)
        const result = await UpdateListings(listingTitle, listingSlug, accessToken, listingID)

        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Listing Updated Successfully',
          })
          setLoading(false)
          setStatusEditModel(false)
          let industryArray = [...allListing]

          industryArray.map((item, index) => {
            if (item.id === result.business_listing_type.id) {
              industryArray[index] = result.business_listing_type
            }
          })

          setAllListing(industryArray)
          clear()
        } else {
          setErrorListingSlug(result.errors.slug)
          setLoading(false)
          setFirstNameForm(false)
        }
      }
    } catch (err) {
      setLoading(false)
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  // Delete Listing
  const removeAllListingDelete = async (id) => {
    try {
      const userResult = await Swal.fire({
        text: 'Are you sure you want to delete this category?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (userResult.isConfirmed) {
        const result = await deleteListings(accessToken, alternativeId, id)

        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Listing remove Successfully',
          })
          let industryArray = [...allListing]

          industryArray.map((item, index) => {
            if (item.id === id) {
              industryArray.splice(index, 1)
            }
          })

          setAllListing(industryArray)
        }
      } else if (userResult.isDismissed) {
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const removeAllListing = async (business_delete, business_count) => {
    setBusinessCount(business_count)
    setStatusModelDelete(true)
    clear()
  }

  // Pagination
  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllListing(page)
  }
  // Initialize edit value
  const setInitialValues = (id, name, slug) => {
    setStatusEditModel(true)
    setListingID(id)
    setListingTitle(name)
    setListingSlug(slug)
    setUserForm(true)
    setFirstNameForm(true)
  }
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      addAllListing()
    }
  }
  const onKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      editAllListing()
    }
  }
  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row  rounded' style={{minHeight: '90vh'}}>
            {/* Header Start */}
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Business Listings</h3>
                  </div>
                </div>

                <div className='d-flex justify-content-end align-items-center'>
                  <img
                    src={listingsIcon}
                    alt=''
                    className='cursor-pointer  w-40px h-40px'
                    onClick={() => {
                      setStatusModel(true)
                      setUserForm(true)
                      clear()
                    }}
                  />
                </div>
              </div>
              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4'>
                <div className='table-responsive pb-4'>
                  {loader ? (
                    allListing?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='min-w-100px'>Name</th>
                            <th className='text-center min-w-100px'>Slug</th>
                            <th className='text-end min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allListing
                            .map((industryItem, industryIndex) => (
                              <>
                                <tr key={industryIndex}>
                                  <td className=' min-w-100px'>{industryItem.type}</td>
                                  <td className='text-center min-w-100px'>{industryItem.slug}</td>

                                  <td className='text-end min-w-100px'>
                                    <MdModeEdit
                                      size={23}
                                      title='Edit'
                                      color='#009ef7'
                                      data-bs-toggle='modal'
                                      className='cursor-pointer me-2'
                                      data-bs-target='#kt_modal_edit_industry'
                                      onClick={() => {
                                        setInitialValues(
                                          industryItem.id,
                                          industryItem.type,
                                          industryItem.slug
                                        )
                                      }}
                                    />
                                    {industryItem.business_count == 0 ? (
                                      <MdDelete
                                        size={26}
                                        color='gray'
                                        title='Delete'
                                        className='cursor-pointer'
                                        onClick={() => {
                                          removeAllListingDelete(industryItem.id)
                                        }}
                                      />
                                    ) : (
                                      <MdDelete
                                        size={26}
                                        color='gray'
                                        className='cursor-pointer'
                                        title='Delete'
                                        onClick={() => {
                                          setAlternativeId('')
                                          removeAllListing(
                                            industryItem.id,
                                            industryItem.business_count
                                          )
                                          setDeleteId(industryItem.id)
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              </>
                            ))
                            .reverse()}
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

                  {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
                </div>
              </KTCardBody>
            </KTCard>
            {statusModel ? (
              <Modal
                size='md'
                id='kt_modal_Add_industry'
                isOpen={statusModel}
                centered={true}
                toggle={null}
              >
                <ModalHeader toggle={() => setStatusModel(!statusModel)}>
                  <h5 className='modal-title'>Add Listing</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12'>
                    <div>
                      <div className='mb-3'>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Name
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          placeholder='Name'
                          onKeyPress={(e) => onKeyPressAdd(e)}
                          onChange={UserNameFunction}
                          value={listingTitle}
                        />

                        {!userForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>Name is required</div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor='FormControlInput2' className=' form-label required'>
                          Slug
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          placeholder='Slug'
                          onChange={FirstNameFunction}
                          onKeyPress={(e) => onKeyPressAdd(e)}
                          value={listingSlug}
                        />
                        {!firstNameForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>{errorListingSlug}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <button
                    type='reset'
                    className='btn btn-light me-3'
                    onClick={() => {
                      clear()
                      setStatusModel(!statusModel)
                    }}
                  >
                    Discard
                  </button>

                  <button type='button' className='btn btn-primary' onClick={addAllListing}>
                    {!loading && <span className='indicator-label'>Save</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </ModalFooter>
              </Modal>
            ) : null}
            {statusModelDelete ? (
              <Modal
                size='md'
                id='kt_modal_Add_industry'
                isOpen={statusModelDelete}
                centered={true}
                toggle={null}
              >
                <ModalHeader
                  toggle={() => {
                    setStatusModelDelete(!statusModelDelete)
                    setAlternativeValidation(false)
                  }}
                >
                  <h5 className='modal-title'>Delete Listing</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12'>
                    <div>
                      <div className='mb-8'>
                        <h5>Please select alternative business to delete this listing</h5>
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Alternative business
                        </label>
                        <select
                          name=''
                          id=''
                          className='form-control form-control-solid'
                          onChange={(e) => {
                            setAlternativeValidation(false)

                            setAlternativeId(e.target.value)
                          }}
                        >
                          <option
                            selected={alternativeId == '' || alternativeId == undefined}
                            disabled
                          >
                            Select Alternative business
                          </option>
                          {allListing.map((industryItem, industryIndex) => (
                            <>
                              {industryItem.id != deleteId ? (
                                <option value={industryItem.id} key={industryIndex}>
                                  {industryItem.type}
                                </option>
                              ) : null}
                            </>
                          ))}
                        </select>
                        {alternativeValidation ? (
                          <div style={{borderTop: '1.5px solid red', color: 'red'}}>
                            Please select alternative business
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <button
                    type='reset'
                    className='btn btn-light me-3'
                    onClick={() => {
                      clear()
                      setAlternativeValidation(false)

                      setStatusModelDelete(!statusModelDelete)
                    }}
                  >
                    Discard
                  </button>
                  {alternativeId != '' && alternativeId != null && alternativeId != undefined ? (
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => {
                        removeAllListingDelete(deleteId)
                        setAlternativeValidation(false)
                        setStatusModelDelete(!statusModelDelete)
                      }}
                    >
                      <span className='indicator-label'>Delete</span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => {
                        setAlternativeValidation(true)
                      }}
                    >
                      <span className='indicator-label'>Delete</span>
                    </button>
                  )}
                </ModalFooter>
              </Modal>
            ) : null}

            {statusEditModel ? (
              <Modal
                size='md'
                id='kt_modal_Add_industry'
                isOpen={statusEditModel}
                centered={true}
                toggle={null}
              >
                <ModalHeader toggle={() => setStatusEditModel(!statusEditModel)}>
                  <h5 className='modal-title'>Edit Listing</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12'>
                    <div>
                      <div className='mb-3'>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Name
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          placeholder='Name'
                          onChange={UserNameFunction}
                          onKeyPress={(e) => onKeyPressEdit(e)}
                          value={listingTitle}
                        />

                        {!userForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>Name is required</div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor='FormControlInput2' className=' form-label required'>
                          Slug
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          placeholder='Slug'
                          onChange={FirstNameFunction}
                          onKeyPress={(e) => onKeyPressEdit(e)}
                          value={listingSlug}
                        />
                        {!firstNameForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>{errorListingSlug}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <button
                    type='reset'
                    className='btn btn-light me-3'
                    onClick={() => setStatusEditModel(!statusEditModel)}
                  >
                    Discard
                  </button>

                  <button type='button' className='btn btn-primary' onClick={editAllListing}>
                    {!loading && <span className='indicator-label'>Update</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </ModalFooter>
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessListing
