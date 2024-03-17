import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {
  getFeatures,
  createFeatures,
  deleteFeature,
  updateFeatures,
} from '../../components/services/admin-services/manage-features'
import {KTCardBody, KTCard} from '../../_metronic/helpers'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import addFeaturesIcon from '../../assets/addFeaturesIcon.svg'
import './FeaturesManagement.css'
import Pagination from '../../common component/Pagination'
const FeaturesManagement = () => {
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  const [title, setTitle] = useState('')
  const [loader, setLoader] = useState('')
  const [openModel, setOpenModel] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allFeatures, setAllFeatures] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [status, setStatus] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [lastPage, setLastPage] = useState([])
  const [description, setDescription] = useState('')
  useEffect(() => {
    getAllFeatures()
  }, [])

  const getAllFeatures = async (page) => {
    try {
      setLoader(false)
      const result = await getFeatures(accessToken, page)

      if (result.status === true) {
        setLoader(true)
        setAllFeatures(result.features.data)
        setLastPage(result.features.last_page)
        // setCurrentPage(result.users.current_page)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(true)
    }
  }
  const handleChange = (e, valueName) => {
    if (valueName == 'title') {
      setTitle(e.target.value)
      if (e.target.value.length < 1) {
        setTitleError(true)
      } else setTitleError(false)
    } else if (valueName == 'description') {
      setDescription(e.target.value)
    } else if (valueName == 'status') {
      setStatus(e.target.value)
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
  const addFeature = async () => {
    try {
      if (title == '' || title == undefined) {
        setTitleError(true)
      }

      if (title != '' && title != undefined && titleError == false) {
        setLoading(true)
        const result = await createFeatures(title, description, status, accessToken)

        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Feature added successfully',
          })

          let featureArray = [...allFeatures]
          featureArray.unshift(result.features)
          setAllFeatures(featureArray)
          setOpenModel(false)
          clear()
        } else {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
      setOpenModel(false)
    }
  }
  const editFeatures = async () => {
    try {
      if (title == '' || title == undefined) {
        setTitleError(true)
      }
      if (title != '' && title != undefined && titleError == false) {
        setLoading(true)
        const result = await updateFeatures(selectedId, title, description, status, accessToken)

        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Feature updated successfully',
          })
          setOpenEditModel(false)
          let featureArray = [...allFeatures]

          featureArray.map((item, index) => {
            if (item.id === result.features.id) {
              featureArray[index] = result?.features
            }
          })
          setAllFeatures(featureArray)
          clear()
        } else {
          setLoading(false)
          setOpenEditModel(false)
        }
      }
    } catch (err) {
      setLoading(false)
      setOpenEditModel(false)
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const removeUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (result.isConfirmed) {
        const reasonResult = await deleteFeature(accessToken, id)

        if (reasonResult.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Feature remove successfully',
          })
          let featureArray = [...allFeatures]

          featureArray.map((item, index) => {
            if (item.id === id) {
              featureArray.splice(index, 1)
            }
          })

          setAllFeatures(featureArray)
        }
      } else if (result.isDismissed) {
        // console.log('isDenied')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const clear = () => {
    setTitle('')
    setDescription('')
    setStatus('')
    setTitleError(false)
  }
  const setInitialValues = (id, dbTitle, dbDescription, dbStatus) => {
    setSelectedId(id)
    setTitle(dbTitle)
    setDescription(dbDescription)
    setStatus(dbStatus)
    setTitleError(false)
  }
  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllFeatures(page)
  }
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      addFeature()
    }
  }
  const onKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      editFeatures()
    }
  }
  return (
    <>
      {/* Header Start */}

      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row  rounded'>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Features Management</h3>
                  </div>
                </div>

                <div
                  className='d-flex justify-content-end align-items-center'
                  data-kt-user-table-toolbar='base'
                >
                  <img
                    src={addFeaturesIcon}
                    className='cursor-pointer  w-40px h-40px'
                    alt='addFeaturesIcon'
                    onClick={() => {
                      setOpenModel(true)
                      clear()
                    }}
                  />
                </div>
              </div>

              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    allFeatures?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>Title</th>
                            <th className='text-center min-w-100px'>Description</th>
                            <th className='text-center min-w-100px'>Status</th>
                            <th className='text-end me-9 min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allFeatures?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>
                                {item?.title ?? 'No title'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.description ?? 'No description'}
                              </td>

                              <td className='text-center min-w-100px'>
                                {' '}
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

                              <td className='text-end min-w-100px'>
                                <MdModeEdit
                                  size={23}
                                  color='#009ef7'
                                  className='cursor-pointer me-2'
                                  onClick={() => {
                                    setOpenEditModel(true)
                                    setInitialValues(
                                      item.id,
                                      item.title,
                                      item.description,
                                      item.status
                                    )
                                  }}
                                />
                                <MdDelete
                                  size={26}
                                  color='gray'
                                  className='cursor-pointer'
                                  onClick={() => removeUser(item.id)}
                                />
                               
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center '
                        style={{height: '70vh'}}
                      >
                        <div>
                          <h1>FEATURES NOT FOUND</h1>
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
            {/* Table End */}
            {/*Add Model Start */}
            <Modal size='lg' isOpen={openModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenModel(!openModel)}>
                <h5 className='modal-title'>Add Feature</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Title</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'title')}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Title'
                      required
                    />
                    {titleError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Title is required </div>
                      </div>
                    )}
                  </div>

                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Status</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'status')}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                    >
                      <option selected hidden>
                        Select Status
                      </option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Description</label>
                    <textarea
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'description')}
                      style={{
                        marginTop: '3px',
                      }}
                      placeholder='Enter Description'
                      required
                    />
                  </div>
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

                <button type='button' className='btn btn-primary' onClick={addFeature}>
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
            {/* Add Model End */}

            {/*Add Model Start */}
            <Modal size='lg' isOpen={openEditModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenEditModel(!openEditModel)}>
                <h5 className='modal-title'>Edit Feature</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Title</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'title')}
                      onKeyPress={(e) => onKeyPressEdit(e)}
                      value={title}
                      placeholder='Enter Title'
                      required
                    />
                    {titleError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Title is required </div>
                      </div>
                    )}
                  </div>

                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Status</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'status')}
                      defaultValue={status}
                      value={status}
                      onKeyPress={(e) => onKeyPressEdit(e)}
                    >
                      <option selected hidden>
                        Select Status
                      </option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Description</label>
                    <textarea
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'description')}
                      value={description}
                      style={{
                        marginTop: '3px',
                      }}
                      placeholder='Enter Description'
                      required
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setOpenEditModel(!openEditModel)
                  }}
                >
                  Discard
                </button>

                <button type='button' className='btn btn-primary' onClick={editFeatures}>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturesManagement
