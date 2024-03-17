import React, {Component} from 'react'
// import './App.css'
import './ImageUpload.css'
export class ImageUpload extends Component {
  state = {
    profileImg: 'http://localhost:3011/media/avatars/300-1.jpg',
  }
  imageHandler = async (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  render() {
    const {profileImg} = this.state
    return (
      <div className=''>
        <div className='img-holder mb-10'>
          <label
            className=' rounded-circle text-center'
            htmlFor='input'
            style={{
              width: '30px',
              marginLeft: '130px',
            }}
          >
            <i className='bi bi-pencil-fill fs-4 cursor-pointer' />
          </label>
          <img src={profileImg} alt='' id='img' className='img' />
          {/* <label
            className='shadow-lg rounded-circle text-center'
            htmlFor='input'
            style={{
              width: '25px',
              marginLeft: '130px',
            }}
          >
            <i className='bi bi-x fs-1' />
          </label> */}
        </div>
        <input
          type='file'
          accept='image/*'
          name='image-upload'
          id='input'
          onChange={this.imageHandler}
        />
      </div>
    )
  }
}

export default ImageUpload
