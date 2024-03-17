import React, {useState, useEffect} from 'react'
import './MultiImages.css'
import deleteIcon from '../../../../../../../assets/icons/delete-icon.svg'
import Swal from 'sweetalert2'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import ButtonLoader from '../../../../../../../assets/Loader/ButtonLoader.gif'
import uploadIcon from '../../../../../../../assets/icons/img-upload-icon.svg'

import {updateBrokerFifthStep} from '../../../../../../../components/services/broker-services/Index'
import {height} from '@mui/system'
const MultiImages = (props) => {
  const [selectedImages, setSelectedImages] = useState([])
  const [imagesValidation, setImagesValidation] = useState(false)

  const data = localStorage.getItem('BrokerAuth')

  const [isContinue, setIsContinue] = useState(false)
  const [imagesForDB, setImagesForDB] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  let token
  if (location?.state) {
    const {accessToken} = JSON.parse(data || '')
    token = accessToken
  } else {
    token = localStorage.getItem('brokerID')
  }

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }, [])
  const propImgStepStep5 = async (e) => {
    e.preventDefault()
    if (selectedImages.length != 0 && selectedImages != undefined) {
      setIsContinue(true)

      const result = await updateBrokerFifthStep(imagesForDB, token)
      if (result.status == true) {
        setIsContinue(false)
        props.imgStepStep5()
      }
    } else {
      setImagesValidation(true)
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

    event.target.value = ''
    setImagesValidation(false)
  }
  function deleteHandler(e, image, index) {
    e.preventDefault()
    setSelectedImages(selectedImages.filter((e) => e !== image))
    imagesForDB.splice(index, 1)

    URL.revokeObjectURL(image)
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

  return (
    <>
      <div className='container d-flex flex-wrap px-md-10'>
        <div
          className='row mx-auto p-2'
          style={{
            backgroundColor: '#fafafa',
            border: '2px dashed #818285',
            minHeight: '60vh',
            width: '100%',
          }}
        >
          <div className=' ' style={{minHeight: '15vh', maxHeight: '80vh', overflowY: 'scroll'}}>
            <div className='row'>
              {selectedImages &&
                selectedImages?.map((image, index) => {
                  return (
                    <div className='bizOwner-images col-3 mx-0 h-180px' key={image}>
                      <img
                        src={image}
                        className='   '
                        alt='upload'
                        style={{width: '100%', height: '180px'}}
                      />
                      <button onClick={(e) => deleteHandler(e, image, index)} className='cross-btn'>
                        <img src={deleteIcon} alt='delete' className='w-30px h-30px' />
                        {/* <deleteIcon className='multi-img-bg' /> */}
                      </button>
                    </div>
                  )
                })}
            </div>
          </div>
          {selectedImages?.length > 0 ? null : (
            <img
              src={uploadIcon}
              width='290'
              height='150'
              className='mx-auto'
              alt=''
              style={{position: 'relative', bottom: '-17px'}}
            />
          )}

          <section
            className='multi-img-body container broker-btn-upload'
            style={{height: 'fit-content'}}
          >
            <label className='upload-bg cursor-pointer  '>
              <input
                className='bizOwner-input'
                type='file'
                name='images'
                onChange={onSelectFile}
                multiple
                accept='image/png , image/jpeg, image/webp'
              />
            </label>
          </section>
          <input type='file' multiple className='bizOwner-input' />

          {imagesValidation ? (
            <div className='biz_owner_input_validation mt-2 col-3 text-center mx-auto fw-bolder fs-2'>
              Please upload your company images
            </div>
          ) : null}
          <h6 className='text-center mx-auto mt-0 text-muted fs-3'>
            Upload images of your company
          </h6>
        </div>
      </div>
      <div className='col-8 mx-auto d-flex justify-content-end me-8 my-10'>
        {isContinue == true ? (
          <span className='btn btn-primary'>
            <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
          </span>
        ) : (
          <button className='btn btn-primary ' onClick={(e) => propImgStepStep5(e)}>
            Submit
          </button>
        )}
      </div>
    </>
  )
}

export default MultiImages
