import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logOutUser} from '../../../../components/services/auth-services/AuthServices'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search} from '../../../partials'
import {useLayout} from '../../core'
import profileImage from '../../../../assets/images/profile-image.png'
import {
  profileOverView,
  brokerProfileOverView,
} from '../../../../components/services/profile-services'
import buttonLoader from '../../../../assets/Loader/ButtonLoader.gif'
import './MenuInner.css'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  const {config} = useLayout()

  const tokenData = localStorage.getItem('userData')

  const [hearder, setHeader] = useState(true)
  const [ProfileImg, setProfileImage] = useState(null)
  const [loader, setLoader] = useState(false)
  const userData = localStorage.getItem('userData')
  const trasData = userData ? JSON.parse(userData) : ''
  const {accessToken} = trasData

  const {role} = trasData
  let data = useSelector((state) => {
    return state
  })
  useEffect(() => {
    if (role == 'user' || role == 'agent') {
      getProfileListingTypes()
    } else if (role == 'broker') {
      getBrokerProfileListing()
    }
    if (hearder == true) {
      setHeader(false)
    } else {
      setHeader(true)
    }
  }, [data])

  const getProfileListingTypes = async () => {
    const response = await profileOverView(accessToken)

    if (response.status == true) {
      // setPhone(response?.users?.phone)
      if (response?.users?.profile_image != null) {
        setProfileImage(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
      }
    }
  }
  //////////////////////broker//////////////
  const getBrokerProfileListing = async () => {
    const response = await brokerProfileOverView(accessToken)

    if (response.status == true) {
      setLoader(true)
      if (response?.users?.profile_image != null) {
        setProfileImage(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
      }
    }
  }

  let dispatch = useDispatch()
  const navigate = useNavigate()
  const signOut = async () => {
    setLoader(true)
    let btnId = false
    const response = await logOutUser(accessToken)
    if (response.status == 'success') {
      localStorage.clear()
      dispatch({
        type: 'SUBMITTED',
        payload: {
          btnId,
        },
      })
      localStorage.clear()
      navigate('/')
      window.location.reload()
    }
  }
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}

      {/* NOTIFICATIONS */}
      {/* {role == 'user' ? (
        <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom',
              toolbarButtonHeightClass
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen022.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div>
        <HeaderNotificationsMenu /> 

        </div>
      ) : null} */}

      {/* Quick links */}

      {role == 'user' || role == 'broker' ? (
        <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          {/* begin::Menu wrapper */}
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom',
              toolbarButtonHeightClass
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen025.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div>
          <QuickLinks />
        </div>
      ) : null}

      {role == 'user' || role == 'broker' || role == 'agent' ? (
        <div
          className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          <div
            className={clsx('cursor-pointer symbol ', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            {ProfileImg != null && ProfileImg != undefined && ProfileImg != '' ? (
              <img
                src={ProfileImg}
                className='image-fluid'
                alt='Profile image'
                style={{borderRadius: '50%'}}
              />
            ) : (
              <img
                src={profileImage}
                className='image-fluid'
                alt='Profile image'
                style={{borderRadius: '50%'}}
              />
            )}
          </div>
          <HeaderUserMenu />
        </div>
      ) : (
        <div className='text-center  my-auto'>
          {loader ? (
            <span
              className='btn  px-md-10 d-flex align-items-center  rounded-pill active-class btn-active-dark'
              style={{marginLeft: '-20px', backgroundColor: 'black', color: 'white'}}
              // onClick={() => signOut()}
            >
              <img src={buttonLoader} alt='' className='logOutLoader ' />
            </span>
          ) : (
            <span
              className='btn  d-flex align-items-center px-md-8 py-2 py-md-3 rounded-pill active-class btn-active-dark'
              style={{backgroundColor: 'black', color: 'white'}}
              onClick={() => signOut()}
            >
              <span className='  px-0 '> Sign Out</span>
            </span>
          )}
        </div>
      )}

      {/* end::User */}

      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
