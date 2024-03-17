/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

// import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
// import {useAuth} from '../core/Auth'
import {Button} from 'react-bootstrap'
import {loginUser} from '../../../../components/services/auth-services/AuthServices'
import {Modal} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import LeavePageBlocker from '../../../../_metronic/layout/components/LeavePageBlocker'
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}
/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const navigate = useNavigate()
  // const [Prompt, setLeavePage] = LeavePageBlocker()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [modalBody, setModalBody] = useState('')
  let dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }, [])

  const handleClose = () => setShow(false)
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        setLoading(true)
        const result = await loginUser(values.email, values.password)
        if (result.status === true) {
          let btnId = true
          setLoading(false)
          localStorage.removeItem('BrokerAuth')
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

          document.location.reload()
        } else if (result.status == false) {
          if (result.key == 'Invalid') {
            setLoading(false)
            setModalBody(result.message)
            setShow(true)
          } else if (result.key == 'Incompelted') {
            const unableToComplete = await Swal.fire({
              allowOutsideClick: false,
              title: 'Error',
              text: "You've not completed all the steps, please complete them to proceed further.",
              icon: 'error',
              confirmButtonColor: '#009ef7',
              confirmButtonText: 'Ok',
            })
            if (unableToComplete.isConfirmed) {
              if (result.userStep) {
                localStorage.setItem(
                  'BrokerAuth',
                  JSON.stringify({
                    accessToken: result.token,
                  })
                )
                navigate('/auth/registration/broker', {state: {id: result.userStep}})
              }
              setLoading(false)
            }
          } else if (result.key == 'Block') {
            setLoading(false)
            // setModalBody()
            const unableToComplete = await Swal.fire({
              allowOutsideClick: false,
              text: 'Your account has been temporarily blocked, please contact our support services team',
              icon: 'warning',
              confirmButtonColor: '#009ef7',
              confirmButtonText: 'Ok',
            })
            // setShow(true)
          }
        }
      } catch (error) {
        console.error(error)

        setStatus('The login detail is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <>
      <form
        className='form w-100'
        // formik.handleSubmit
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        <div className='text-center mb-10'>
          <div className='text-gray-400 fw-bold fs-4'>
            New Here?{' '}
            <Link to='/auth/registration' className='link-primary fw-bolder'>
              Create an Account
            </Link>
          </div>
        </div>

        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            // onChange={(e) =>setUser({...user, email:e.target.value})}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <span role='alert' className='text-danger'>
                {formik.errors.email}
              </span>
            </div>
          )}
        </div>

        <div className='fv-row mb-10'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            </div>
          </div>
          <input
            placeholder='Password'
            type='password'
            autoComplete='off'
            // onChange={(e)=>setUser({...user, password:e.target.value})}
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

          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert' className='text-danger'>
                  {formik.errors.password}
                </span>
              </div>
            </div>
          )}
          <div className='mt-3'>
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {Prompt} */}
    </>
  )
}
