import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap'
import {KTCard, KTCardBody} from '../../_metronic/helpers'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import './ManageAds.css'
import {createAddsImage, getAllAdd} from '../../components/services/admin-services/manage-ads'
const ManageAds = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [allManageAdds, setAllManageAdds] = useState([])
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [imageUrlValidation, setImageUrlValidation] = useState(false)
  const [idStatusModel, setIdStatusModel] = useState(true)
  const [statusModel, setStatusModel] = useState(false)
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  useEffect(() => {
    getAllAdds()
  }, [])
  const imageUrlFunction = (e) => {
    setImageUrl(e.target.value)
    setImageUrlValidation(false)
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

  const getAllAdds = async (page = 1) => {
    try {
      setLoader(false)
      const result = await getAllAdd(accessToken, page)
      if (result.status === true) {
        setLoader(true)
        setAllManageAdds(result.advertise.data)
      }
    } catch (err) {
    
    }
  }

  const addImageFunc = async () => {
    if (imageUrl == '' || imageUrl == 'undefined') {
      setImageUrlValidation(true)
    }
    try {
      if (imageUrl !== '' && imageUrl !== 'undefined') {
        setLoading(true)
        const result = await createAddsImage(imageUrl, accessToken, idStatusModel)
        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Ads update successfully',
          })
          setLoading(false)
          setStatusModel(false)
          getAllAdds()
        } else {
          setLoading(false)
        }
      }
    } catch (err) {
      setLoading(false)
   
    }
  }

  return (
    <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
      <div className='container p-0 p-md-10'>
        <div className='row rounded' style={{minHeight: '90vh'}}>
          <KTCard>
            <div className='card-header border-1 border-bottom pt-6'>
              <div className='card-title'>
                <div className='d-flex align-items-center position-relative my-1'>
                  <h3>Manage Ads</h3>
                </div>
              </div>
            </div>
            <KTCardBody className='py-4'>
              {loader ? (
                allManageAdds?.length > 0 ? (
                  <div className='row mt-5 g-3'>
                    {allManageAdds.map((item, i) => (
                      <div className='col-lg-4 col-md-6 col-12' key={i}>
                        {item.location == 'sidebar' ? (
                          <>
                            <div className='d-flex justify-content-between'>
                              <h5 className='mb-5 '>Ad For Right Side Bar</h5>
                              <i
                                className='bi bi-pencil cursor-pointer text-primary'
                                onClick={() => {
                                  setStatusModel(true)
                                  setIdStatusModel(item.id)
                                  setImageUrlValidation(false)
                                  
                                }}
                              ></i>
                            </div>
                            <img
                              src={item.advertise}
                              alt=''
                              className='w-100'
                              style={{
                                height: '54 % ',
                              }}
                            />
                          </>
                        ) : item.location == 'bottom' ? (
                          <>
                            <div className='d-flex justify-content-between'>
                              <h5 className=' mb-5  '>Ad For Bottom Listings</h5>
                              <i
                                className='bi bi-pencil cursor-pointer text-primary'
                                onClick={() => {
                                  setStatusModel(true)
                                  setIdStatusModel(item.id)
                                  setImageUrlValidation(false)
                                
                                }}
                              ></i>
                            </div>
                            <img
                              src={item.advertise}
                              alt=''
                              className='w-100'
                              style={{
                                height: '54 % ',
                              }}
                            />
                          </>
                        ) : item.location == 'middle' ? (
                          <>
                            <div className='d-flex justify-content-between'>
                              <h5 className='mb-5'>Ad For Middle Listings</h5>
                              <i
                                className='bi bi-pencil cursor-pointer text-primary'
                                onClick={() => {
                                  setStatusModel(true)
                                  setIdStatusModel(item.id)
                                  setImageUrlValidation(false)
                               
                                }}
                              ></i>
                            </div>
                            <img
                              src={item.advertise}
                              alt=''
                              className='w-100 '
                              style={{
                                height: '54 % ',
                              }}
                            />
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className='d-flex  justify-content-center  align-items-center'
                    style={{height: '70vh'}}
                  >
                    <div>
                      <h1>NO ADS FOUND</h1>
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
                <h5 className='modal-title'>Edit Ads</h5>
              </ModalHeader>
              <ModalBody className='d-flex justify-content-start'>
                <div className='row col-12'>
                  <div>
                    <div>
                      <input
                        type='text'
                        className='form-control form-control-solid w-100'
                        placeholder='Enter Url'
                        onChange={imageUrlFunction}
                        value={imageUrl}
                      />

                      {imageUrlValidation && (
                        <div className='d-flex myError'>
                          {' '}
                          <br />
                          <div className='fw-lighter'>Image url is required</div>
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
                    setStatusModel(!statusModel)
                  }}
                >
                  Discard
                </button>

                <button type='button' className='btn btn-primary' onClick={addImageFunc}>
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
  )
}

export default ManageAds
