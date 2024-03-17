import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'

import {MdDelete, MdModeEdit} from 'react-icons/md'

import {
  createReasons,
  deleteReason,
  getReasons,
  updateReason,
} from '../../components/services/admin-services/manage-reasons'
import {KTCardBody, KTCard} from '../../_metronic/helpers'
import './ManageReasons.css'
import addReasonsIcon from '../../assets/addReasonsIcon.svg'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Pagination from '../../common component/Pagination'
const ManageReasons = () => {
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [reportType, setReportType] = useState('')
  const [reportError, setReportError] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [selectedReasonID, setSelectedReasonID] = useState()
  const [allReasons, setAllReasons] = useState([])
  const [lastPage, setLastPage] = useState([])
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  useEffect(() => {
    getAllReasons()
  }, [])

  const getAllReasons = async () => {
    try {
      setLoader(false)
      const result = await getReasons(accessToken)

      if (result.status === true) {
        setLoader(true)

        setAllReasons(result.report_reason)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(true)
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
  const addReason = async () => {
    try {
      if (title.length < 1) {
        setTitleError(true)
      } else {
        setTitleError(false)
      }
      if (reportType.length < 1) {
        setReportError(true)
      } else {
        setReportError(false)
      }
      if (
        title != '' &&
        title != undefined &&
        titleError == false &&
        reportType != '' &&
        reportType != undefined &&
        reportError == false
      ) {
        setLoading(true)
        const result = await createReasons(title, reportType, accessToken)
        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Reason added successfully',
          })
          setOpenModel(false)
          let reasonsArray = [...allReasons]
          reasonsArray.unshift(result.report_reason)
          setAllReasons(reasonsArray)
          setTitle('')
          setReportType('')
        } else {
          setLoading(false)
        }
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const editReason = async () => {
    try {
      if (title.length < 1) {
        setTitleError(true)
      } else {
        setTitleError(false)
      }
      if (reportType.length < 1) {
        setReportError(true)
      } else {
        setReportError(false)
      }
      if (
        title !== '' &&
        title !== undefined &&
        titleError == false &&
        reportType !== '' &&
        reportType !== undefined &&
        reportError == false
      ) {
        setLoading(true)

        const result = await updateReason(selectedReasonID, title, reportType, accessToken)

        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Reason updated successfully',
          })
          setLoading(false)
          setOpenEditModel(false)
          let reasonsArray = [...allReasons]
          reasonsArray.map((item, index) => {
            if (item.id === result.report_reason.id) {
              reasonsArray[index] = result?.report_reason
            }
          })
          setAllReasons(reasonsArray)
          setTitle('')
          setReportType('')
        } else {
          setOpenEditModel(false)
          setLoading(false)
        }
      }
    } catch (err) {
      setOpenEditModel(false)
      setLoading(false)
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const removeReason = async (id) => {
    try {
      const result = await Swal.fire({
        text: 'Are you sure you want to delete this?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (result.isConfirmed) {
        const reasonResult = await deleteReason(accessToken, id)
        if (reasonResult.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Reason remove successfully',
          })
          let reasonArray = [...allReasons]

          reasonArray.map((item, index) => {
            if (item.id === id) {
              reasonArray.splice(index, 1)
            }
          })

          setAllReasons(reasonArray)
        }
      } else if (result.isDismissed) {
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const handleChange = (e, valueName) => {
    if (valueName == 'title') {
      setTitle(e.target.value)
      if (e.target.value.length < 1) {
        setTitleError(true)
      } else setTitleError(false)
    } else if (valueName == 'reportType') {
      setReportType(e.target.value)
      if (e.target.value.length < 1) {
        setReportError(true)
      } else setReportError(false)
    }
  }
  const setInitialValues = (id, title, reptType) => {
    let report
    if (reptType == 1) {
      report = 'Business'
    } else if (reptType == 2) {
      report = 'Franchise'
    }
    setTitleError(false)
    setReportError(false)
    setOpenEditModel(true)
    setSelectedReasonID(id)
    setTitle(title)
    setReportType(report)
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
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      addReason()
    }
  }
  const onKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      editReason()
    }
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
                    <h3> Manage Reasons</h3>
                  </div>
                </div>

                <div
                  className='d-flex justify-content-end align-items-center'
                  data-kt-user-table-toolbar='base'
                >
                  <img
                    src={addReasonsIcon}
                    title='Add reason'
                    className='cursor-pointer w-40px h-40px'
                    onClick={() => {
                      setOpenModel(true)
                      setTitle('')
                      setReportType('')
                      setTitleError(false)
                      setReportError(false)
                    }}
                    alt='addReasonsIcon'
                  />
                </div>
              </div>

              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive'>
                  {loader ? (
                    allReasons?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>Title</th>
                            <th className='text-center min-w-100px'>Report Type</th>
                            <th className='text-center min-w-100px'>Date</th>
                            <th className='text-end min-w-100px'>Action</th>
                          </tr>
                        </thead>

                        <tbody className='text-gray-600 fw-bold'>
                          {allReasons?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>
                                <div className='d-flex align-items-center'>{item?.title}</div>
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.report_type == 1
                                  ? 'Business'
                                  : item?.report_type == 2
                                  ? 'Franchise'
                                  : 'No Type'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {dateFormateHandler(item?.created_at) ?? 'NO Date'}
                              </td>
                              <td className='text-end min-w-100px'>
                                <MdModeEdit
                                  size={23}
                                  title='Edit reason'
                                  color='#009ef7'
                                  className='cursor-pointer me-2'
                                  onClick={() =>
                                    setInitialValues(item.id, item.title, item.report_type)
                                  }
                                />
                                <MdDelete
                                  size={26}
                                  color='gray'
                                  title='Delete reason'
                                  className='cursor-pointer'
                                  onClick={() => removeReason(item.id)}
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
                          <h1>REASONS NOT FOUND</h1>
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
              </KTCardBody>
            </KTCard>
            {/*Add Model Start */}
            <Modal size='md' isOpen={openModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenModel(!openModel)}>
                <h5 className='modal-title'>Add Reason</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-md-12 '>
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
                </div>
                <div className='row '>
                  <div className='mb-3 col-md-12 '>
                    <label className='required form-label'>Report Type</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'reportType')}
                      defaultValue={reportType}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                    >
                      <option selected hidden>
                        Select Report Type
                      </option>
                      <option>Business</option>
                      <option>Franchise</option>
                    </select>

                    {reportError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'> Select report type </div>
                      </div>
                    )}
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

                <button type='submit' className='btn btn-primary' onClick={addReason}>
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
            {/*edit Model Start */}
            <Modal size='md' isOpen={openEditModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenEditModel(!openEditModel)}>
                <h5 className='modal-title'>Edit Reason</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-md-12 '>
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
                </div>
                <div className='row '>
                  <div className='mb-3 col-md-12 '>
                    <label className='required form-label'>Report Type</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'reportType')}
                      defaultValue={reportType}
                      onKeyPress={(e) => onKeyPressEdit(e)}
                      value={reportType}
                    >
                      <option hidden>Select Type</option>
                      <option>Business</option>
                      <option>Franchise</option>
                    </select>

                    {reportError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Select report type</div>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setOpenEditModel(!openEditModel)
                    // setThrowEmailError(false)
                  }}
                >
                  Discard
                </button>

                <button type='submit' className='btn btn-primary' onClick={editReason}>
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
            {/* edit Model End */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageReasons
