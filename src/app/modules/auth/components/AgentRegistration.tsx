/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
// import { register} from '../core/_requests'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import MainScreenLoader from '../../../../assets/Loader/MainScreenLoader.gif'
import {
  getAgentData,
  loginUser,
  registerUser,
} from '../../../../components/services/auth-services/AuthServices'
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import './style.css'
import mainLogoImage from '../../../../assets/images/mainLogoImage.png'

import {updateAgent, updateProfile} from '../../../../components/services/profile-services'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  number: '',
  userId: '',
  username: '',
  acceptTerms: false,
}
const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters')
    .required('Please fill the required field'),
  number: Yup.string()
    .min(7, 'Minimum 7 digits')
    .max(16, 'Maximum 12 digits')
    .required('Please fill the required field'),

  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(20, 'Maximum 20 symbols')
    .required('Please fill the required field'),
  email: Yup.string()
    .email('Wrong email format')
    .min(10, 'Minimum 10 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Please fill the required field'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(20, 'Maximum 20 symbols')
    .required('Please fill the required field'),

  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Please fill the required field'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Confirm password and password must be same'),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function AgentRegistration() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [show, setShow] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [userError, setUserError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [error, setError] = useState('')
  const {token} = useParams()
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')

  const handleClose = () => setShow(false)
  const {saveAuth, setCurrentUser} = useAuth()
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    if (token) {
      localStorage.clear()

      checkAgentSignUp()
    }
  }, [token])

  const checkAgentSignUp = async () => {
    setLoader(true)
    const response = await getAgentData(token)
    console.log(response)
    if (response.status == true) {
      setFName(response?.user?.first_name)
      setLName(response?.user?.last_name)
      initialValues.firstname = response?.user?.first_name
      initialValues.lastname = response?.user?.last_name
      initialValues.email = response?.user?.email
      initialValues.number = response?.user?.phone
      initialValues.username = response?.user?.username
      initialValues.password = response?.user?.password
      initialValues.changepassword = response?.user?.password
      initialValues.userId = response?.user?.id
      setLoader(false)
    } else {
      setLoader(false)
    }

    console.log('initialValues', initialValues)
  }

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)

      try {
        const response = await updateAgent(
          values.firstname,
          values.lastname,
          values.number,

          values?.email,
          values.username,

          values.userId,
          values.password
        )
        if (response?.status === true) {
          const result = await loginUser(values?.email, values.password)
          if (result.status === true) {
            localStorage.setItem(
              'userData',
              JSON.stringify({
                accessToken: result.token,
                userName: result.user.username,
                role: result.role[0].name,
                userID: result.user.id,
                subscription: result?.subscription,
              })
            )

            navigate('/dashboard')

            document.location.reload()
            setLoading(false)
          }
        } else {
          if (
            response?.errors?.email &&
            response?.errors?.username &&
            response?.errors?.phone &&
            response?.errors?.email[0] == 'The email has already been taken.' &&
            response?.errors?.username[0] == 'The username has already been taken.' &&
            response?.errors?.phone[0] == 'The phone has already been taken.'
          ) {
            setError('The email/username/phone has already been taken.')
            // setEmailError(registerResult.errors.email[0])
          } else if (
            response?.errors?.username &&
            response?.errors?.phone &&
            response?.errors?.username[0] == 'The username has already been taken.' &&
            response?.errors?.phone[0] == 'The phone has already been taken.'
          ) {
            setError('The username/phone has already been taken.')

            // setEmailError('')
          } else if (
            response?.errors?.email &&
            response?.errors?.phone &&
            response?.errors?.email[0] == 'The email has already been taken.' &&
            response?.errors?.phone[0] == 'The phone has already been taken.'
          ) {
            setError('The email/phone has already been taken.')
          } else if (
            response?.errors?.email &&
            response?.errors?.username &&
            response?.errors?.email[0] == 'The email has already been taken.' &&
            response?.errors?.username[0] == 'The username has already been taken.'
          ) {
            setError('The email/username has already been taken.')
          } else if (
            response?.errors?.email &&
            response?.errors?.email[0] == 'The email has already been taken.'
          ) {
            setError('The email has already been taken.')
          } else if (
            response?.errors?.username &&
            response?.errors?.username[0] == 'The username has already been taken.'
          ) {
            setError('The username has already been taken.')
          } else if (
            response?.errors?.phone &&
            response?.errors?.phone[0] == 'The phone has already been taken.'
          ) {
            setError('The phone has already been taken.')
          }

          setLoading(false)
          setShow(true)
        }
        // console.log('registerResult', registerResult)
        // const {data: user} = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        // setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <>
      <div
        className='container  bg-white rounded p-5 px-lg-15 my-15 shadow-sm'
        style={{width: '40%'}}
      >
        {!loader ? (
          <>
            <div className=' border-primary border-bottom mb-10'>
              <img src={mainLogoImage} width='auto' height='53' className='mb-5' />
              <h1 className='text-primary'>Welcome, Dear {fName + ' ' + lName}</h1>
              <p className='text-muted'>
                As a new agent, you've an option of changing account detail, or click on submit
                button to create your account by default
              </p>
            </div>
            <form
              className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
              noValidate
              id='kt_login_signup_form'
              onSubmit={formik.handleSubmit}
            >
              {formik.status && (
                <div className='mb-lg-15 alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}

              {/* begin::Form group Firstname */}
              <div className='row fv-row mb-2'>
                <div className='col-xl-6'>
                  <label className='class="form-label fw-bolder text-dark fs-6 required'>
                    First Name
                  </label>
                  <input
                    placeholder='John'
                    type='text'
                    autoComplete='off'
                    {...formik.getFieldProps('firstname')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid': formik.touched.firstname && formik.errors.firstname,
                      },
                      {
                        'is-valid': formik.touched.firstname && !formik.errors.firstname,
                      }
                    )}
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {formik.errors.firstname}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-xl-6'>
                  {/* begin::Form group Lastname */}
                  <div className='fv-row mb-5'>
                    <label className='form-label mb-0 fw-bolder text-dark fs-6 required'>
                      Last Name
                    </label>
                    <input
                      placeholder='Doe'
                      type='text'
                      autoComplete='off'
                      {...formik.getFieldProps('lastname')}
                      className={clsx(
                        'form-control form-control-lg form-control-solid',
                        {
                          'is-invalid': formik.touched.lastname && formik.errors.lastname,
                        },
                        {
                          'is-valid': formik.touched.lastname && !formik.errors.lastname,
                        }
                      )}
                    />
                    {formik.touched.lastname && formik.errors.lastname && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>
                            {formik.errors.lastname}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}
                </div>
              </div>
              {/* end::Form group */}

              {/* begin::Form group Email */}
              <div className='fv-row mb-7'>
                <label className='form-label fw-bolder text-dark fs-6 required'>Email</label>
                <input
                  placeholder='johndoe@email.com'
                  type='email'
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik.touched.email && formik.errors.email},
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.email}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}
              <div className='fv-row mb-7'>
                <label className='form-label fw-bolder text-dark fs-6 required'>
                  Contact Number
                </label>
                <input
                  placeholder='+1(453)123-4567'
                  type='number'
                  autoComplete='off'
                  {...formik.getFieldProps('number')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik.touched.number && formik.errors.number},
                    {
                      'is-valid': formik.touched.number && !formik.errors.number,
                    }
                  )}
                  style={{MozAppearance: 'textfield'}}
                />
                {formik.touched.number && formik.errors.number && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.number}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className='fv-row mb-7'>
                <label className='form-label fw-bolder text-dark fs-6 required'>Username</label>
                <input
                  placeholder='John Doe'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('username')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik.touched.username && formik.errors.username},
                    {
                      'is-valid': formik.touched.username && !formik.errors.username,
                    }
                  )}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.username}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* begin::Form group Password */}
              <div className='mb-10 fv-row' data-kt-password-meter='true'>
                <div className='mb-1'>
                  <label className='form-label fw-bolder text-dark fs-6 required'>Password</label>
                  <div className='row'>
                    <div className='col-11 mb-3 pe-0'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        autoComplete='off'
                        {...formik.getFieldProps('password')}
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          {
                            'is-invalid': formik.touched.password && formik.errors.password,
                          },
                          {
                            'is-valid': formik.touched.password && !formik.errors.password,
                          }
                        )}
                      />
                    </div>

                    <div className='col-1 mb-3 form-control-password-toggle'>
                      <span
                        className=' my-auto cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>
                            {formik.errors.password}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* begin::Meter */}
                  <div
                    className='d-flex align-items-center mb-3'
                    data-kt-password-meter-control='highlight'
                  >
                    <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                    <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                    <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                    <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                  </div>
                  {/* end::Meter */}
                </div>
                <div className='text-muted'>
                  Use 8 or more characters with a mix of letters, numbers & symbols.
                </div>
              </div>
              {/* end::Form group */}

              {/* begin::Form group Confirm password */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-6 required'>
                  Confirm Password
                </label>
                <div className='row'>
                  <div className='col-11 mb-3 pe-0'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Password Confirmation'
                      autoComplete='off'
                      {...formik.getFieldProps('changepassword')}
                      className={clsx(
                        'form-control form-control-lg form-control-solid',
                        {
                          'is-invalid':
                            formik.touched.changepassword && formik.errors.changepassword,
                        },
                        {
                          'is-valid':
                            formik.touched.changepassword && !formik.errors.changepassword,
                        }
                      )}
                    />
                  </div>
                  <div className='col-1 mb-3 form-control-password-toggle'>
                    <span
                      className=' my-auto cursor-pointer'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
                    </span>
                  </div>

                  {formik.touched.changepassword && formik.errors.changepassword && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {formik.errors.changepassword}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Do you have a business</label>
        <select className="form-select form-select-solid" aria-label="Select example">
          <option value="1">Yes, I own a Business</option>
          <option value="2">No, I do not a Business </option>
        </select> */}
              {/* {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )} */}
              {/* </div> */}
              {/* <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Phone Number</label>
        <input
          type='number'
          placeholder='Phone Number'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div> */}
              {/* end::Form group */}

              {/* begin::Form group */}
              <div className='fv-row mb-10'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='kt_login_toc_agree'
                    {...formik.getFieldProps('acceptTerms')}
                  />
                  <label
                    className='form-check-label fw-bold text-gray-700 fs-6'
                    htmlFor='kt_login_toc_agree'
                  >
                    I Agree the{' '}
                    <a href='/terms-of-use' target={'_blank'} className='ms-1 link-primary'>
                      terms and conditions
                    </a>
                    .
                  </label>
                  {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {formik.errors.acceptTerms}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* end::Form group */}

              {/* begin::Form group */}
              <div className='text-center'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
                >
                  {!loading && <span className='indicator-label'>Submit</span>}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
              {/* end::Form group */}
            </form>
          </>
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '90vh', width: '100%'}}
          >
            <div>
              <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
            </div>
          </div>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Something went wrong !</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
