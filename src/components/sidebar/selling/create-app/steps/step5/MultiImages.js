import React, {useState, useEffect} from 'react'
import './MultiImages.css'
import Swal from 'sweetalert2'
import {useParams} from 'react-router-dom'
import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
import uploadIcon from '../../../../../../assets/icons/img-upload-icon.svg'
import {
  deleteBusinessImages,
  getSingleBusinessesListings,
} from '../../../../../services/business-services/index'
import ButtonLoader from '../../../../../../assets/Loader/ButtonLoader.gif'
import {updateListingFifthStep} from '../../../../../services/business-services/index'
import deleteIcon from '../../../../../../assets/icons/delete-icon.svg'
import {Modal} from 'react-bootstrap'
import CropEasy from '../../../franchise/step5/crop/CropEasy'
const MultiImages = (props) => {
  const {biz_id} = useParams()
  const [selectedImages, setSelectedImages] = useState([])
  const [imagesValidation, setImagesValidation] = useState(false)
  const [listingStatus, setListingStatus] = useState(null)
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData)
  const {accessToken} = transformedData
  const getBusinessID = localStorage.getItem('businessID')
  const transformedBusinessID = JSON?.parse(getBusinessID)
  const {businessID} = transformedBusinessID ?? ''
  const [isContinue, setIsContinue] = useState(false)
  const [loaderScreen, setLoaderScreen] = useState(false)
  const [recordedBusinessID, setRecordedBusinessID] = useState('')
  const [openCrop, setOpenCrop] = useState(false)
  const [file, setFile] = useState(null)
  const [imagesForDB, setImagesForDB] = useState([])
  const [cropImg, setCropImage] = useState()

  const onSelectFile = (event) => {
    // var reader = new FileReader()
    // reader.readAsDataURL(event.target.files[0])
    // reader.onload = function (e) {
    //   //Initiate the JavaScript Image object.
    //   var image = new Image()

    //   //Set the Base64 string return from FileReader as source.
    //   image.src = e.target.result

    //   //Validate the File Height and Width.
    //   image.onload = function () {
    //     var height = this.height
    //     var width = this.width
    //     var xRatio = Math.floor(width / 1.984)
    //     console.log('width', width, 'width / 1.984', width / 1.984, 'height', height)
    //     if (xRatio < height + 10 && xRatio > height - 10) {
    //       alert('GOOD GOOD')
    //       return false
    //     }
    //     alert('NONONONONONO')
    //     return true
    //   }
    // }
    setOpenCrop(true)
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    imagesForDB.push(...selectedFiles)
    // setFile(imagesForDB)
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    // setSelectedImages((previousImages) => previousImages.concat(imagesArray))
    setCropImage(imagesArray)
    // FOR BUG IN CHROME
    event.target.value = ''
    setImagesValidation(false)
  }
  function deleteHandler(e, image, index) {
    e.preventDefault()
    setSelectedImages(selectedImages.filter((e) => e !== image))
    setFile(selectedImages.filter((e) => e !== image))
    imagesForDB.splice(index, 1)

    URL.revokeObjectURL(image)
  }
  function apiDeleteHandler(e, image, index) {
    e.preventDefault()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (biz_id) {
      setRecordedBusinessID(biz_id)
      getSingleBusiness(accessToken, biz_id)
    } else if (businessID) {
      setRecordedBusinessID(businessID)
      getSingleBusiness(accessToken, businessID)
    }
  }, [biz_id, businessID])
  const [uploadedImages, setUploadedImages] = useState([])
  const getSingleBusiness = async (accessToken, ID) => {
    try {
      setLoaderScreen(true)
      const result = await getSingleBusinessesListings(accessToken, ID)
      if (result.status === true) {
        setLoaderScreen(false)
        setIsContinue(false)

        // imgArray.push()
        setUploadedImages(result.business?.slider_images)
        setListingStatus(result.business?.status)

        setFile(result.business?.slider_images)
        // setSelectedImages(abc)
      }
    } catch (err) {
      console.log('imgsssss err', err)
      setLoaderScreen(false)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const imgStepStep5 = async (e) => {
    e.preventDefault()
    let selectedBizID
    if (
      (selectedImages.length != 0 && selectedImages != undefined) ||
      (uploadedImages.length != 0 && uploadedImages != undefined)
    ) {
      setIsContinue(true)
      if (businessID) {
        selectedBizID = businessID
      } else if (biz_id) {
        selectedBizID = biz_id
      }
      console.log('object', file)

      const result = await updateListingFifthStep(file, selectedBizID, accessToken, listingStatus)
      if (result.status == true) {
        setIsContinue(false)
        props.imgStepStep5()
      } else {
        setIsContinue(false)
      }
    } else {
      setImagesValidation(true)
    }
  }

  const imgStepBack = () => {
    props.imgStepBack()
  }
  const removeBusinessListingsImages = async (e, imageId, index) => {
    e.preventDefault()
    try {
      const resultRemove = await Swal.fire({
        text: 'Are you sure you want to delete this image?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#009ef7',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true,
      })
      if (resultRemove.isConfirmed) {
        const result = await deleteBusinessImages(accessToken, imageId)
        if (result.status == true) {
          // setAllBusinesses(result.businesses)
          let franchiseImages = [...uploadedImages]

          franchiseImages.map((item, index) => {
            if (item.id === imageId) {
              franchiseImages.splice(index, 1)
            }
          })

          setUploadedImages(franchiseImages)
        }
      }
    } catch (e) {
      console.log('error deleteBusinessesListings', e)
    }
  }
  const modalClose = () => {
    setOpenCrop(false)
  }
  return (
    <>
      {!loaderScreen ? (
        <div className='container  '>
          <div
            className=' p-3 '
            style={{backgroundColor: '#fafafa', border: '2px dashed #818285', minHeight: '90vh'}}
          >
            <div
              className='row'
              style={{minHeight: '25vh', maxHeight: '60vh', overflowY: 'scroll'}}
            >
              {uploadedImages.map((item, i) => (
                <div key={i} className='bizOwner-images col-3 mx-0 '>
                  <img
                    src={item.full_path + item.file_name}
                    style={{height: 200, width: '100%'}}
                    alt='upload'
                  />
                  <button
                    onClick={(e) => removeBusinessListingsImages(e, item.id, i)}
                    className='cross-btn'
                  >
                    {/* <ImCross className='multi-img-bg' /> */}
                    <img src={deleteIcon} alt='delete' className='w-30px h-30px pe-2' />
                  </button>
                </div>
              ))}
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <div className='bizOwner-images col-3 mx-0 ' key={index}>
                      <img src={image} style={{height: 200, width: '100%'}} alt='upload' />
                      <button onClick={(e) => deleteHandler(e, image, index)} className='cross-btn'>
                        {/* <ImCross className='multi-img-bg' /> */}
                        <img src={deleteIcon} alt='delete' className='w-30px h-30px pe-2' />
                      </button>
                    </div>
                  )
                })}
            </div>
            {selectedImages?.length > 0 || uploadedImages?.length > 0 ? (
              <div style={{height: '120px'}}></div>
            ) : (
              <div className='d-flex justify-content-center'>
                <img
                  src={uploadIcon}
                  width='290'
                  height='150'
                  className='mx-auto'
                  alt=''
                  // style={{position: 'relative', bottom: '-25px'}}
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
                  multiple={false}
                  accept='image/png , image/jpeg, image/webp'
                />
              </label>
              <br />
            </section>
            <input type='file' multiple={false} className='bizOwner-input' />

            {/* 
          {selectedImages.length > 0 &&
            (selectedImages.length > 10 ? (
              <p className='error'>
                You can't upload more than 10 images! <br />
                <span>
                  please delete <b> {selectedImages.length - 10} </b> of them{' '}
                </span>
              </p>
            ) : null)} */}
            {imagesValidation ? (
              <div className='mt-2 col-12 text-center mx-auto fw-bolder fs-2'>
                <span className='biz_owner_input_validation '>Please upload image</span>
              </div>
            ) : null}
            <h6 className='text-center mx-auto mt-2 text-muted fs-3'>
              Please upload images one by one and customize according to best visibility.{' '}
            </h6>
          </div>
          <div className='col-12' style={{minHeight: '2vh'}}></div>
          <div className='col-12 mx-auto d-flex justify-content-between my-10'>
            <button className='btn btn-primary ' onClick={imgStepBack}>
              Back
            </button>
            {isContinue == true ? (
              <span className='btn btn-primary'>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </span>
            ) : (
              <button className='btn btn-primary ' onClick={(e) => imgStepStep5(e)}>
                Continue
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}

      {openCrop && (
        <Modal size='xl' show={openCrop} onHide={modalClose}>
          <Modal.Header className='py-4' closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CropEasy {...{cropImg, setOpenCrop, setSelectedImages, setFile}} />
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default MultiImages
