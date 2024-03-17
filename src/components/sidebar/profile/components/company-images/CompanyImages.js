import React, {useEffect, useState} from 'react'
import {ImCross} from 'react-icons/im'
import Swal from 'sweetalert2'
import {
  brokerCompanyImage,
  updateBrokerProfileOverView5,
  deleteImage,
} from '../../../../services/profile-services'
import MainScreenLoader from '../../../../../assets/Loader/MainScreenLoader.gif'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import './MultiImages.css'
import deleteIcon from '../../../../../assets/icons/delete-icon.svg'
import uploadIcon from '../../../../../assets/icons/img-upload-icon.svg'

import ButtonLoader from '../../../../../assets/Loader/ButtonLoader.gif'
const CompanyImages = () => {
  const [loader, setLoader] = useState(false)
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData ?? ''
  const [images, setImages] = useState([])
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [imagesValidation, setImagesValidation] = useState(false)
  const [imagesForDB, setImagesForDB] = useState([])
  //////////////////////broker//////////////
  useEffect(() => {
    getBrokerCompanyImage()
  }, [])
  const getBrokerCompanyImage = async () => {
    setLoader(false)
    const response = await brokerCompanyImage(accessToken)

    if (response.status == true) {
      setLoader(true)
      setImages(response?.users?.broker_images)
    } else {
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
  const updateImages = async (e) => {
    e.preventDefault()
    //   let selectedBizID

    setIsContinueBtn(true)
    // if (
    //   (selectedImages.length != 0 && selectedImages != undefined) ||
    //   (uploadedImages.length != 0 && uploadedImages != undefined)
    // ) {
    const result = await updateBrokerProfileOverView5(imagesForDB, accessToken)

    if (result.status == true) {
      Toast.fire({
        icon: 'success',
        title: 'Image updated successfully',
      })
      setIsContinueBtn(false)
      setOpenEditModel(false)
      getBrokerCompanyImage()
      setSelectedImages([])
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
      setLoader(false)
      setIsContinueBtn(false)
      setOpenEditModel(false)
    }
    // } else {
    //   setOpenEditModel(false)
    //   setImagesValidation(true)
    // }
  }
  const removeImage = async (e, id) => {
    try {
      const userResult = await Swal.fire({
        text: 'Are you sure you want to delete this image?',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        // confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
        reverseButtons: true,
      })
      // #f5f8fa;
      if (userResult.isConfirmed) {
        const result = await deleteImage(accessToken, id)
        if (result.status === true) {
          let ImagesArray = [...images]
          Toast.fire({
            icon: 'success',
            title: 'image remove successfully',
          })
          ImagesArray.map((item, index) => {
            if (item.id === id) {
              ImagesArray.splice(index, 1)
            }
          })

          setImages(ImagesArray)
        }
      } else if (userResult.isDismissed) {
        // console.log('isDismis')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    imagesForDB.push(...selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
    setIsContinueBtn(false)
    event.target.value = ''
    setImagesValidation(false)
  }
  function deleteHandler(e, image, index) {
    e.preventDefault()
    setSelectedImages(selectedImages.filter((e) => e !== image))
    imagesForDB.splice(index, 1)

    URL.revokeObjectURL(image)
  }

  return (
    <>
      {loader ? (
        <div className='mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='d-flex justify-content-end cursor-pointer'>
            <button
              className='btn btn-primary mt-5 mt-md-0 align-self-center'
              onClick={() => {
                setOpenEditModel(true)
                // setValueFromDb()
              }}
            >
              Edit Your Company Image
            </button>
          </div>
          {images.length > 0 ? (
            <div
              className='card-body px-4 py-2 mt-2'
              style={{
                backgroundColor: '#fafafa',
                border: '2px dashed #818285',
                width: '100%',
                minHeight: '60vh',
                maxHeight: '80vh',
                overflowY: 'scroll',
              }}
            >
              <div className=' row  '>
                {images?.map((item, index) => (
                  <div key={index} className='col-3 mb-4'>
                    <img
                      src={item.full_path + item.file_name}
                      className='  h-150px '
                      alt='upload'
                      style={{width: '100%'}}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{height: '50vh', width: '100%'}}
            >
              <h1>COMPANY IMAGE NOT FOUND</h1>
            </div>
          )}
        </div>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '50vh', width: '140%'}}
        >
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
      {/*edit Model Start */}
      <Modal size='lg' isOpen={openEditModel} centered={true}>
        <ModalHeader className='py-4' toggle={() => setOpenEditModel(!openEditModel)}>
          {/* <h5 className='modal-title'> Edit</h5> */}
        </ModalHeader>

        <ModalBody>
          <div className='container  px-md-5'>
            <div
              className='  p-2'
              style={{
                backgroundColor: '#fafafa',
                border: '2px dashed #818285',
                minHeight: '40vh',
                width: '100%',
              }}
            >
              <div
                className='row px-3'
                style={{minHeight: '15vh', maxHeight: '100vh', overflowY: 'scroll'}}
              >
                {images &&
                  images.map((image, index) => {
                    return (
                      <div
                        className='bizOwner-images col-3 mx-0 px-1 position-relative'
                        key={image}
                      >
                        <img
                          src={image.full_path + image.file_name}
                          className='biz-owner-img-upload-update image-fluid'
                          alt='upload'
                        />
                        <button
                          onClick={(e) => removeImage(e, image.id)}
                          className='cross-btn position-absolute'
                        >
                          {/* <ImCross className='multi-img-bg' /> */}
                          <img
                            src={deleteIcon}
                            alt='delete'
                            className='w-30px h-30px multi-img-bg'
                          />
                        </button>
                      </div>
                    )
                  })}
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <div className='bizOwner-images col-3 mx-0 px-1' key={image}>
                        <img
                          src={image}
                          className=' biz-owner-img-upload-update image-fluid'
                          alt='upload'
                        />
                        <button
                          onClick={(e) => deleteHandler(e, image, index)}
                          className='cross-btn'
                        >
                          <img
                            src={deleteIcon}
                            alt='delete'
                            className='w-30px h-30px multi-img-bg'
                          />
                        </button>
                      </div>
                    )
                  })}
              </div>
              {selectedImages?.length > 0 || images?.length > 0 ? (
                <div style={{height: '70px'}}></div>
              ) : (
                <div className='d-flex justify-content-center'>
                  <img
                    src={uploadIcon}
                    width='290'
                    height='150'
                    className='mx-auto'
                    alt=''
                    // style={{position: 'relative', bottom: '-17px'}}
                  />
                </div>
              )}

              <section className='multi-img-body container'>
                <label className='upload-bg cursor-pointer '>
                  <input
                    className='bizOwner-input'
                    type='file'
                    name='images'
                    onChange={onSelectFile}
                    multiple
                    accept='image/png , image/jpeg, image/webp'
                  />
                </label>
                <br />
              </section>
              <h6 className='text-center mx-auto mt-5 text-muted fs-3'>
                Upload images of your company
              </h6>
              <input type='file' multiple className='bizOwner-input' />

              {/* {selectedImages.length > 0 &&
              (selectedImages.length > 10 ? (
                <p className='error'>
                  You can't upload more than 10 images! <br />
                  <span>
                    please delete <b> {selectedImages.length - 10} </b> of them{' '}
                  </span>
                </p>
              ) : null)} */}
              {imagesValidation ? (
                <div className='biz_owner_input_validation mt-2 col-3 text-center mx-auto fw-bolder fs-2'>
                  Upload image
                </div>
              ) : null}
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

          <div className=' d-flex justify-content-end'>
            {isContinueBtn == true ? (
              <span className='btn btn-primary'>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </span>
            ) : (
              <button className='btn btn-primary ' onClick={(e) => updateImages(e)}>
                Update
              </button>
            )}
          </div>
        </ModalFooter>
      </Modal>
      {/* edit Model End */}
    </>
  )
}

export default CompanyImages
