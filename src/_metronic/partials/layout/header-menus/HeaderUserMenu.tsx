/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'
import {useDispatch, useSelector} from 'react-redux'
import {logOutUser} from '../../../../components/services/auth-services/AuthServices'
import {
  profileOverView,
  brokerProfileOverView,
} from '../../../../components/services/profile-services'
import profileImage from '../../../../assets/images/profile-image.png'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineProfile} from 'react-icons/ai'
import {BiLogOutCircle} from 'react-icons/bi'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState()
  const tokenData = localStorage.getItem('userData')
  const [ProfileImg, setProfileImage] = useState(null)
  const [userName, setUserName] = useState('')
  const [userSecondtName, setUserSecondName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [country, setCountry] = useState('')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  let dispatch = useDispatch()

  let data = useSelector((state) => {
    return state
  })
  useEffect(() => {
    getProfileListingTypes()

    const userData = localStorage.getItem('userData')
    const trasData = userData ? JSON?.parse(userData) : ''
    const {role} = trasData
    setRole(role)
    if (role == 'user') {
      getProfileListingTypes()
    } else if (role == 'broker') {
      getBrokerProfileListing()
    }
  }, [data])
  //////////////////////broker//////////////
  const getBrokerProfileListing = async () => {
    const response = await brokerProfileOverView(accessToken)
    if (response.status == true) {
      // setLoader(true)
      if (response?.users?.profile_image != null) {
        setProfileImage(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
      }
      setUserName(response?.users?.first_name)
      setUserSecondName(response?.users?.last_name)
      setUserEmail(response?.users?.email)
      setCountry(response?.users?.location.country)
    }
  }

  const getProfileListingTypes = async () => {
    const response = await profileOverView(accessToken)

    if (response.status == true) {
      // setPhone(response?.users?.phone)
      if (response?.users?.profile_image != null) {
        setProfileImage(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
      }
      setUserName(response?.users?.first_name)
      setUserSecondName(response?.users?.last_name)
      setUserEmail(response?.users?.email)
      setCountry(response?.users?.location?.country)
    }
  }

  const signOut = async () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
    const response = await logOutUser(accessToken)
    // if (response.status == 'success') {
    //   dispatch({
    //     type: 'SUBMITTED',
    //     payload: {
    //       btnId,
    //     },
    //   })
    //   window.location.reload()
    // }
  }
  return (
    <>
      <div
        className='menu menu-sub menu-sub-dropdown  menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 '
        data-kt-menu='true'
        style={{
          minWidth: '250px',
        }}
      >
        <div className='menu-item px-3'>
          <div className='menu-content d-flex align-items-center px-3'>
            <div className='me-5 rounded'>
              {ProfileImg != null && ProfileImg != undefined && ProfileImg != '' ? (
                <img
                  src={ProfileImg}
                  width='50px'
                  height='57px'
                  alt='Logo'
                  style={{borderRadius: '5px'}}
                />
              ) : (
                <img src={profileImage} alt='Logo' width='50px' height='57px' />
              )}
            </div>

            <div className='d-flex flex-column'>
              <div className='fw-bolder d-flex align-items-center fs-5'>{userName}</div>
              <span className='fw-bold text-muted text-hover-primary fs-7 '>
                <KTSVG
                  path='/media/icons/duotune/communication/com011.svg'
                  className='svg-icon-4 me-1'
                />
                {userEmail}
              </span>
              {country != undefined && country != '' && country != null ? (
                <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                  <KTSVG
                    path='/media/icons/duotune/general/gen018.svg'
                    className='svg-icon-4 me-1'
                  />
                  {country}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className='separator my-1'></div>

        <div className='menu-item px-2'>
          <Link to={'/dashboard/my-account'} className='menu-link px-5'>
            <span>
              <CgProfile size={15} />
              <span className='px-2'>My Profile</span>
            </span>
          </Link>
        </div>
        {role !== 'admin' && (
          <div className='menu-item px-2'>
            <Link to={'/dashboard/my-listings'} className='menu-link px-5'>
              <AiOutlineProfile size={15} />
              <span className='px-2'>My Listings</span>
            </Link>
          </div>
        )}

        <div className='separator my-1'></div>
        {/* <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div> */}

        <div className='menu-item px-2'>
          <a onClick={() => signOut()} className='menu-link px-5'>
            <BiLogOutCircle size={15} />
            <span className='px-2'>Sign Out</span>
          </a>
        </div>
      </div>
    </>
  )
}

export {HeaderUserMenu}
