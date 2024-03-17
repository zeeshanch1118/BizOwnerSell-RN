import React, {useEffect, useState} from 'react'
///////////////////ThirdParty Import/////////////////
import Swal from 'sweetalert2'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

///////////////////Services Import/////////////////
import {
  createIndustry,
  getIndustry,
  deleteIndustry,
  updateIndustry,
} from '../../../components/services/admin-services/manage-industries'

///////////////////Helping Files Import////////////////
import Pagination from '../../../common component/Pagination'
import './style.css'
import {KTCardBody, KTCard} from '../../../_metronic/helpers'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import industriesIcon from '../../../assets/addIndustryIcon.svg'
const BusinessIndustry = () => {
  const [allIndustries, setAllIndustries] = useState([])

  /////////////Inputs////////////////
  const [industryID, setIndustryID] = useState('')
  const [industryTitle, setIndustryTitle] = useState('')
  const [industrySlug, setIndustrySlug] = useState('')
  const [errorSlugValue, setErrorSlugValue] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [alternativeId, setAlternativeId] = useState('')

  ////////////////Conditions///////////////
  const [userForm, setUserForm] = useState(true)
  const [firstNameForm, setFirstNameForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [alternativeModal, setAlternativeModal] = useState(false)
  const [alternativeValidation, setAlternativeValidation] = useState(false)

  const [statusModel, setStatusModel] = useState(false)
  const [statusEditModel, setStatusEditModel] = useState(false)
  const [lastPage, setLastPage] = useState([])

  ////////////LocalStorage Data////////////////
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  useEffect(() => {
    getAllIndustries(1)
  }, [])
  //////////////Get Data////////////////
  const getAllIndustries = async (page) => {
    try {
      const result = await getIndustry(accessToken, page)
      if (result.status === true) {
        setAllIndustries(result.data?.data)
        setLastPage(result.data?.last_page)
        setLoader(true)
      }
    } catch (err) {
      setLoader(false)
    }
  }
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
  const addIndustry = async () => {
    try {
      if (industryTitle.length < 1) {
        setUserForm(false)
      }
      if (industrySlug.length < 1) {
        setErrorSlugValue('Slug is required')
        setFirstNameForm(false)
      }
      if (
        industryTitle !== '' &&
        industryTitle !== 'undefined' &&
        userForm &&
        industrySlug !== '' &&
        industrySlug !== 'undefined' &&
        firstNameForm
      ) {
        setLoading(true)
        const result = await createIndustry(industryTitle, industrySlug, accessToken)

        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Industry added successfully',
          })

          setLoading(false)
          setStatusModel(false)
          let industryArray = [...allIndustries]
          industryArray.push(result.business_industry)
          setAllIndustries(industryArray)
          clear()
        } else {
          setFirstNameForm(false)
          setErrorSlugValue(result.errors.slug[0])
          setLoading(false)
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
  const editIndustry = async () => {
    try {
      if (industryTitle.length < 1) {
        setUserForm(false)
      }
      if (industrySlug.length < 1) {
        setErrorSlugValue('Slug is required')
        setFirstNameForm(false)
      }
      if (
        industryTitle !== '' &&
        industryTitle !== 'undefined' &&
        userForm &&
        industrySlug !== '' &&
        industrySlug !== 'undefined' &&
        firstNameForm
      ) {
        setLoading(true)
        const result = await updateIndustry(industryTitle, industrySlug, accessToken, industryID)

        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Industry Edit successfully',
          })
          setStatusEditModel(false)
          let industryArray = [...allIndustries]

          industryArray.map((item, index) => {
            if (item.id === result.business_industry.id) {
              industryArray[index] = result?.business_industry
            }
          })

          setAllIndustries(industryArray)
          clear()
        } else {
          setFirstNameForm(false)
          setErrorSlugValue(result.errors.slug[0])
          setLoading(false)
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
  const removeIndustry = async (id) => {
    try {
      const userResult = await Swal.fire({
        text: 'Are you sure you want to delete this category?',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        reverseButtons: true,
      })
      // #f5f8fa;
      if (userResult.isConfirmed) {
        const result = await deleteIndustry(accessToken, alternativeId, id)
        if (result.status === true) {
          let industryArray = [...allIndustries]
          Toast.fire({
            icon: 'success',
            title: 'Industry remove successfully',
          })
          industryArray.map((item, index) => {
            if (item.id === id) {
              industryArray.splice(index, 1)
            }
          })

          setAllIndustries(industryArray)
        }
      } else if (userResult.isDismissed) {
        console.log('isDismiss')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      addIndustry()
    }
  }
  const onKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      editIndustry()
    }
  }
  const UserNameFunction = (e) => {
    setIndustryTitle(e.target.value)
    if (e.target.value.length < 1) {
      setUserForm(false)
    } else {
      setUserForm(true)
    }
  }
  const FirstNameFunction = (e) => {
    setIndustrySlug(e.target.value)
    if (e.target.value.length < 1) {
      setFirstNameForm(false)
      setErrorSlugValue('Slug is required')
    } else setFirstNameForm(true)
  }

  const clear = () => {
    setIndustryTitle('')
    setIndustrySlug('')
    setErrorSlugValue('')
    setFirstNameForm(true)
    setUserForm(true)
    setLoading(false)
  }
  const setInitialValues = (id, name, slug) => {
    setStatusEditModel(true)
    setIndustryID(id)
    setIndustryTitle(name)
    setIndustrySlug(slug)
    setUserForm(true)
    setFirstNameForm(true)
  }

  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllIndustries(page)
  }

  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Business Industries</h3>
                  </div>
                </div>
                <div className='d-flex justify-content-end align-items-center'>
                  <img
                    src={industriesIcon}
                    className='cursor-pointer  w-40px h-40px'
                    alt=''
                    onClick={() => {
                      setStatusModel(true)
                      clear()
                    }}
                  />
                </div>
              </div>

              <KTCardBody className='py-4'>
                <div className='table-responsive pb-5'>
                  {loader ? (
                    allIndustries?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='min-w-100px'>Name</th>
                            <th className='text-center min-w-100px'>Slug</th>
                            <th className='text-end min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allIndustries
                            ?.map((industryItem, industryIndex) => (
                              <>
                                <tr key={industryIndex}>
                                  <td className=' min-w-100px'>{industryItem.name}</td>
                                  <td className='text-center min-w-100px'>{industryItem.slug}</td>
                                  <td className='text-end min-w-100px'>
                                    <MdModeEdit
                                      size={23}
                                      title='Edit'
                                      color='#009ef7'
                                      className='cursor-pointer me-2'
                                      onClick={() =>
                                        setInitialValues(
                                          industryItem.id,
                                          industryItem.name,
                                          industryItem.slug
                                        )
                                      }
                                    />
                                    {industryItem.businesses_count == 0 ? (
                                      <MdDelete
                                        size={26}
                                        title='Delete'
                                        color='gray'
                                        className='cursor-pointer'
                                        onClick={() => removeIndustry(industryItem.id)}
                                      />
                                    ) : (
                                      <MdDelete
                                        size={26}
                                        color='gray'
                                        title='Delete'
                                        className='cursor-pointer'
                                        onClick={() => {
                                          setAlternativeModal(true)
                                          setDeleteId(industryItem.id)
                                          setAlternativeId('')
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
                  <h5 className='modal-title'>Add Industry</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12 '>
                    <div>
                      <div className='mb-3'>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Name
                        </label>
                        <input
                          type='text'
                          onPre
                          onKeyPress={onKeyPressAdd}
                          className='form-control form-control-solid'
                          placeholder='Name'
                          onChange={UserNameFunction}
                          value={industryTitle}
                        />
                        {!userForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>Name is required</div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor='FormControlInput2 ' className=' form-label required'>
                          Slug
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          placeholder='Slug'
                          onChange={FirstNameFunction}
                          value={industrySlug}
                          onKeyPress={onKeyPressAdd}
                        />
                        {!firstNameForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>{errorSlugValue}</div>
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
                    onClick={() => setStatusModel(!statusModel)}
                  >
                    Discard
                  </button>

                  <button type='button' className='btn btn-primary' onClick={addIndustry}>
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

            {statusEditModel ? (
              <Modal
                size='md'
                id='kt_modal_Add_industry'
                isOpen={statusEditModel}
                centered={true}
                toggle={null}
              >
                <ModalHeader
                  toggle={() => {
                    setStatusEditModel(!statusEditModel)
                    clear()
                  }}
                >
                  <h5 className='modal-title'>Edit Industry</h5>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-start'>
                  <div className='row col-12 '>
                    <div className=''>
                      <div className='mb-3 '>
                        <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                          Name
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          placeholder='Name'
                          onKeyPress={onKeyPressEdit}
                          onChange={UserNameFunction}
                          value={industryTitle}
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
                          onKeyPress={onKeyPressEdit}
                          value={industrySlug}
                        />
                        {!firstNameForm && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>{errorSlugValue}</div>
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
                      setStatusEditModel(!statusEditModel)
                      clear()
                    }}
                  >
                    Discard
                  </button>

                  <button type='button' className='btn btn-primary' onClick={editIndustry}>
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

            <Modal
              size='md'
              id='kt_modal_Add_industry'
              isOpen={alternativeModal}
              centered={true}
              toggle={null}
            >
              <ModalHeader
                toggle={() => {
                  setAlternativeModal(!alternativeModal)
                  clear()
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
                          setAlternativeId(e.target.value)
                          setAlternativeValidation(false)
                        }}
                      >
                        <option
                          selected={alternativeId == '' || alternativeId == undefined}
                          disabled
                        >
                          Select Alternative business
                        </option>
                        {allIndustries.map((industryItem, industryIndex) => (
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
                    setAlternativeModal(!alternativeModal)
                    clear()
                  }}
                >
                  Discard
                </button>
                {alternativeId != '' && alternativeId != null && alternativeId != undefined ? (
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      removeIndustry(deleteId)
                      setAlternativeValidation(false)
                      setAlternativeModal(false)
                      setAlternativeId(!alternativeId)
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
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessIndustry
