import React, {useEffect, useState} from 'react'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
import Swal from 'sweetalert2'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap'

import {
  createFranchises,
  UpdateFranchises,
  deleteFranchises,
  getFranchises,
} from '../../../components/services/admin-services/franchises-category'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import Pagination from '../../../common component/Pagination'
import addFranchise from '../../../assets/addFranchisesIcon.svg'
const FranchisesCatagory = () => {
  const [franchisesID, setFranchisesID] = useState('')
  const [errorFranchiseSlugValue, setErrorFranchiseSlugValue] = useState('')
  const [franchisesTitle, setFranchisesTitle] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [alternativeId, setAlternativeId] = useState('')
  const [franchisesSlug, setFranchisesSlug] = useState('')
  const [franchiseCount, setFranchiseCount] = useState('')
  const [allFranchises, setAllFranchises] = useState([])
  const [lastPage, setLastPage] = useState([])
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  const [userForm, setUserForm] = useState(true)
  const [firstNameForm, setFirstNameForm] = useState(true)
  const [statusModelDelete, setStatusModelDelete] = useState(false)
  const [alternativeValidation, setAlternativeValidation] = useState(false)

  const [errorSlug, setErrorSlug] = useState('')
  const [statusModel, setStatusModel] = useState(false)
  const [statusEditModel, setStatusEditModel] = useState(false)
  const clear = () => {
    setFranchisesTitle('')
    setFranchisesSlug('')
    setErrorFranchiseSlugValue('')
    setFirstNameForm(true)
    setLoading(false)
    setUserForm(true)
  }

  const UserNameFunction = (e) => {
    setFranchisesTitle(e.target.value)
    if (e.target.value.length < 1) {
      setUserForm(false)
    } else {
      setUserForm(true)
    }
  }
  const FirstNameFunction = (e) => {
    setFranchisesSlug(e.target.value)
    if (e.target.value.length < 1) {
      setFirstNameForm(false)
      setErrorFranchiseSlugValue('Slug is required')
      setErrorSlug('')
    } else {
      setErrorSlug('')
      setFirstNameForm(true)
    }
  }

  useEffect(() => {
    getAllFranchises()
  }, [])
  const getAllFranchises = async (page) => {
    try {
      const result = await getFranchises(accessToken, page)
      console.log('object', result)
      if (result.status === true) {
        setAllFranchises(result?.data?.data)
        setLastPage(result?.data?.last_page)
        setLoader(true)
      }
    } catch (err) {
      setLoader(false)
      console.log('getFranchises err', err)
    }
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  const addAllFranchises = async () => {
    try {
      if (franchisesTitle.length < 1) {
        setUserForm(false)
      }
      if (franchisesSlug.length < 1) {
        setFirstNameForm(false)
        setErrorFranchiseSlugValue('Slug is required')
      }
      if (
        franchisesTitle !== '' &&
        franchisesTitle !== 'undefined' &&
        userForm &&
        franchisesSlug !== '' &&
        franchisesSlug !== 'undefined' &&
        firstNameForm
      ) {
        setLoading(true)
        const result = await createFranchises(franchisesTitle, franchisesSlug, accessToken)
        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'franchise added successfully',
          })
          setStatusModel(false)
          setLoading(false)
          let franchisesArray = [...allFranchises]
          franchisesArray.push(result.franchise_category)
          setAllFranchises(franchisesArray)
          clear()
        } else {
          setLoading(false)
          setFirstNameForm(false)
          setErrorFranchiseSlugValue(result.errors.slug)
        }
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const editAllFranchises = async () => {
    try {
      if (franchisesTitle.length < 1) {
        setUserForm(false)
      }
      if (franchisesSlug.length < 1) {
        setFirstNameForm(false)
        setErrorFranchiseSlugValue('Slug is required')
      }
      if (
        franchisesTitle !== '' &&
        franchisesTitle !== 'undefined' &&
        userForm &&
        franchisesSlug !== '' &&
        franchisesSlug !== 'undefined' &&
        firstNameForm
      ) {
        setLoading(true)
        const result = await UpdateFranchises(
          franchisesTitle,
          franchisesSlug,
          accessToken,
          franchisesID
        )

        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Franchise updated Successfully',
          })

          setStatusEditModel(false)
          let franchisesArray = [...allFranchises]

          franchisesArray.map((item, index) => {
            if (item.id === result.franchise_category.id) {
              franchisesArray[index] = result?.franchise_category
            }
          })

          setAllFranchises(franchisesArray)
          clear()
        } else {
          setLoading(false)
          setFirstNameForm(false)
          setErrorFranchiseSlugValue(result.errors.slug)
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
  const removeAllFranchises = async (id) => {
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
        const result = await deleteFranchises(accessToken, alternativeId, id)
        console.log(result)

        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Franchise remove Successfully',
          })
          let franchisesArray = [...allFranchises]
          franchisesArray.map((item, index) => {
            if (item.id === id) {
              franchisesArray.splice(index, 1)
            }
          })
          setAllFranchises(franchisesArray)
        }
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const setInitialValues = (id, name, slug) => {
    setStatusEditModel(true)
    setFranchisesID(id)
    setFirstNameForm(true)
    setUserForm(true)
    setFranchisesTitle(name)
    setFranchisesSlug(slug)
  }
  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllFranchises(page)
  }
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      addAllFranchises()
    }
  }
  const onKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      editAllFranchises()
    }
  }
  const removeAllListing = async (id, franchises_count) => {
    setFranchiseCount(franchises_count)
    setStatusModelDelete(true)

    clear()
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
                    <h3>Franchise Categories</h3>
                  </div>
                </div>

                <div className='d-flex justify-content-end align-items-center'>
                  <img
                    src={addFranchise}
                    title='Add'
                    alt=''
                    className='cursor-pointer  w-40px h-40px'
                    onClick={() => {
                      setStatusModel(true)
                      clear()
                    }}
                  />
                </div>
              </div>
              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4'>
                <div className='table-responsive pb-5'>
                  {loader ? (
                    allFranchises?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='min-w-100px'>Name</th>
                            <th className='text-center min-w-100px'>Slug</th>
                            <th className='text-end min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allFranchises
                            ?.map((industryItem, industryIndex) => (
                              <>
                                <tr key={industryIndex}>
                                  <td className=' min-w-100px'>{industryItem.name}</td>
                                  <td className='text-center min-w-100px'>{industryItem.slug}</td>
                                  <td className='text-end min-w-100px'>
                                    <MdModeEdit
                                      size={23}
                                      color='#009ef7'
                                      title='Edit'
                                      data-bs-toggle='modal'
                                      className='cursor-pointer me-2'
                                      data-bs-target='#kt_modal_edit_industry'
                                      onClick={() =>
                                        setInitialValues(
                                          industryItem.id,
                                          industryItem.name,
                                          industryItem.slug
                                        )
                                      }
                                    />
                                    {industryItem.franchises_count == 0 ? (
                                      <MdDelete
                                        size={26}
                                        title='Delete'
                                        color='gray'
                                        className='cursor-pointer'
                                        onClick={() => {
                                          removeAllFranchises(industryItem.id)
                                        }}
                                      />
                                    ) : (
                                      <MdDelete
                                        size={26}
                                        color='gray'
                                        title='Delete'
                                        className='cursor-pointer'
                                        onClick={() => {
                                          setAlternativeId('')

                                          removeAllListing(
                                            industryItem.id,
                                            industryItem.franchises_count
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
            {/* Table End */}
            {/*Add Model Start */}

            {statusModel ? (
              <Modal
                size='md'
                id='kt_modal_Add_industry'
                isOpen={statusModel}
                centered={true}
                toggle={null}
              >
                <ModalHeader toggle={() => setStatusModel(!statusModel)}>
                  <h5 className='modal-title'>Add Category</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12 '>
                    <div className=''>
                      <div className='mb-3'>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Name
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          placeholder='Name'
                          onChange={UserNameFunction}
                          onKeyPress={(e) => onKeyPressAdd(e)}
                          value={franchisesTitle}
                        />
                        {!userForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>Name is required</div>
                          </div>
                        )}
                      </div>

                      <div className='mb-3'>
                        <label htmlFor='FormControlInput2' className=' form-label required'>
                          Slug
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          placeholder='Slug'
                          onKeyPress={(e) => onKeyPressAdd(e)}
                          onChange={FirstNameFunction}
                          value={franchisesSlug}
                        />
                        {!firstNameForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>{errorFranchiseSlugValue}</div>
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

                  <button type='button' className='btn btn-primary' onClick={addAllFranchises}>
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

            {/* /////////////edit model start */}
            {statusEditModel ? (
              <Modal
                size='md'
                id='kt_modal_Add_industry'
                isOpen={statusEditModel}
                centered={true}
                toggle={null}
              >
                <ModalHeader toggle={() => setStatusEditModel(!statusEditModel)}>
                  <h5 className='modal-title'>Edit Category</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12 '>
                    <div className=''>
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
                          value={franchisesTitle}
                        />
                        {!userForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>Name is required</div>
                          </div>
                        )}
                      </div>

                      <div className='mb-3'>
                        <label htmlFor='FormControlInput2' className=' form-label required'>
                          Slug
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          placeholder='Slug'
                          onChange={FirstNameFunction}
                          onKeyPress={(e) => onKeyPressEdit(e)}
                          value={franchisesSlug}
                        />
                        {!firstNameForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>{errorFranchiseSlugValue}</div>
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

                  <button type='button' className='btn btn-primary' onClick={editAllFranchises}>
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
                        <h5>Please select alternative franchise to delete this listing</h5>
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Alternative Franchise
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
                            Select Alternative Franchise
                          </option>

                          {allFranchises.map((industryItem, industryIndex) => (
                            <>
                              {industryItem.id != deleteId ? (
                                <option value={industryItem.id} key={industryIndex}>
                                  {industryItem.name}
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
                        removeAllFranchises(deleteId)
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
          </div>
        </div>
      </div>
    </>
  )
}

export default FranchisesCatagory
