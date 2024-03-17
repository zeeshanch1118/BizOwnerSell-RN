import React, {useState} from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {changePasswordRequest} from '../../../../components/services/auth-services/AuthServices'
import './style.css'

const ResetPass = () => {
  const Navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordValidation, setNewPasswordValidation] = useState(false)
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const tokenData = localStorage.getItem('userData')
  const forgetPassEmail = localStorage.getItem('forgetPassEmail')
  const {token} = useParams()
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const onInputChange = async (e) => {
    switch (e.target.name) {
      case 'newPassword':
        setNewPassword(e.target.value)
        setNewPasswordValidation(false)
        break
      case 'confirmPassword':
        setConfirmPassword(e.target.value)
        setConfirmPasswordValidation(false)

        break
      case 'email':
        setEmail(e.target.value)
        setEmailValidation(false)

        break

      default:
        break
    }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const ChangePassword = async () => {
    if (newPassword == '' || newPassword == undefined || newPassword?.length < 8) {
      setNewPasswordValidation(true)
    }
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValidation(true)
    }
    if (confirmPassword == '' || confirmPassword == undefined) {
      setConfirmPasswordValidation(true)
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordValidation(true)
    }
    if (
      newPassword != '' &&
      newPassword != undefined &&
      newPassword != newPassword?.length > 7 &&
      email != '' &&
      email != undefined &&
      isValidEmail(email) &&
      confirmPassword != '' &&
      confirmPassword != undefined &&
      newPassword === confirmPassword
    ) {
      setLoading(true)
      const response = await changePasswordRequest(token, email, newPassword, confirmPassword)
      console.log('response', response)
      if (response.status == true || response.status == 200 || response.status == '200') {
        setLoading(false)
        const successPayment = await Swal.fire({
          allowOutsideClick: false,
          title: 'Success',
          text: 'Your password has been successfully reset',
          icon: 'success',
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'Ok',
        })
        if (successPayment.isConfirmed) {
          //   setBtnLoader(false)
          Navigate('/auth/login')
        }
      } else if (response.status == false && response.message) {
        setLoading(false)
        const unableToComplete = await Swal.fire({
          allowOutsideClick: false,
          title: 'Error',
          text: response.message,
          icon: 'error',
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'Ok',
        })
      } else {
        setLoading(false)

        Swal.fire({
          title: 'Something wrong please try again',
          timer: 1000,
        })
      }
    }
  }
  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='row'>
            <div className='col-12 my-5'>
              <label className='form-label required'>Enter Email</label>

              <input
                type='email'
                placeholder='Enter Email'
                className='form-control form-control-lg form-control-solid'
                name='email'
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              {emailValidation ? <div className='text-danger'>Invalid email</div> : null}
            </div>
            <div className='col-12 my-5'>
              <label className='form-label required'>New Password</label>
              <div className='row'>
                <div className='col-11 pe-0'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter New Password'
                    className='form-control form-control-lg form-control-solid'
                    name='newPassword'
                    value={newPassword}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className='col-1 mb-0 form-control-password-toggle'>
                  <span
                    className=' my-auto cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
                  </span>
                </div>
              </div>
              {newPasswordValidation ? (
                <div className='text-danger'>
                  {newPassword == '' || newPassword == undefined
                    ? 'Password Required'
                    : 'Minimum 8 symbols'}
                </div>
              ) : null}
            </div>
            <div className='col-12 my-5'>
              <label className='form-label required'>Confirm Password</label>
              <div className='row'>
                <div className='col-11 pe-0'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    className='form-control form-control-lg form-control-solid'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className='col-1 mb-0 form-control-password-toggle'>
                  <span
                    className=' my-auto cursor-pointer'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
                  </span>
                </div>
              </div>
              {confirmPasswordValidation ? (
                <div className='text-danger'>
                  {confirmPassword == '' || confirmPassword == undefined
                    ? 'Minimum 8 symbols'
                    : "Password and confirm password didn't match"}{' '}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='  mt-5 justify-content-start pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            {!loading && (
              <span className='indicator-label' onClick={(e) => ChangePassword(e)}>
                Change Password
              </span>
            )}

            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default ResetPass
