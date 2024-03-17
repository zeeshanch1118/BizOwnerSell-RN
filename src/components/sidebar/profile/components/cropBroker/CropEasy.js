import {Box, Button, DialogActions, DialogContent, Slider, Typography} from '@mui/material'
import React, {useState} from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './utils/cropImage'

const CropEasy = ({cropImg, setOpenCrop, setShowProfileImage, setFile}) => {
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const cropImage = async () => {
    // setLoading(true)
    try {
      const {file, url} = await getCroppedImg(cropImg, croppedAreaPixels, rotation)
      setShowProfileImage(url)
      setFile(file)
      setOpenCrop(false)
    } catch (error) {
      console.log(error)
    }

    // setLoading(false)
  }
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          height: 300,
          width: '100%',
          //   minWidth: {sm: 500},
        }}
      >
        <Cropper
          image={cropImg}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={140 / 152}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{flexDirection: 'column', mx: 3, my: 2}}>
        <Box sx={{width: '100%', mb: 1}}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay='auto'
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + '°'}</Typography>
            <Slider
              valueLabelDisplay='auto'
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button variant='outlined' onClick={() => setOpenCrop(false)}>
            Cancel
          </Button>
          <Button
            // variant='contained'
            className='btn btn-primary '
            onClick={cropImage}
          >
            Ok
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default CropEasy

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`
}
