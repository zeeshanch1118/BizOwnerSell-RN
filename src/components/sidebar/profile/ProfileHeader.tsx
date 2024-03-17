/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router-dom'
import {profileOverView, brokerProfileOverView} from '../../services/profile-services'
import {useSelector} from 'react-redux'
import profileImage from '../../../assets/images/profile-image.png'
import icon1 from '../../../assets/broker-icons/01.svg'
import icon2 from '../../../assets/broker-icons/02.svg'
import icon3 from '../../../assets/broker-icons/03.svg'
import icon4 from '../../../assets/broker-icons/04.svg'

const ProfileHeader: React.FC = () => {
  const location = useLocation()

  const [fullName, setFullName] = useState('')
  // const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [ProfileImg, setProfileImage] = useState(null)
  const [loader, setLoader] = useState(false)
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData ?? ''

  let data = useSelector((state) => {
    return state
  })

  useEffect(() => {
    if (role == 'user' || role == 'agent') {
      getProfileListingTypes()
    } else {
      getBrokerProfileListing()
    }
  }, [data])

  const getProfileListingTypes = async () => {
    const response = await profileOverView(accessToken)

    if (response.status == true) {
      setLoader(true)
      setFullName(response?.users?.first_name + ' ' + response?.users?.last_name)
      // setPhone(response?.users?.phone)
      setCountry(response?.users?.location?.country)
      setEmail(response?.users?.email)
      if (response?.users?.profile_image != null) {
        setProfileImage(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
      }
    }
  }
  //////////////////////////Broker/////////////////////
  const getBrokerProfileListing = async () => {
    const response = await brokerProfileOverView(accessToken)

    if (response.status == true) {
      setLoader(true)
      setFullName(response?.users?.first_name + ' ' + response?.users?.last_name)
      // setPhone(response?.users?.phone)
      setCountry(response?.users?.location?.country)
      setEmail(response?.users?.email)
      if (response?.users?.profile_image != null) {
        setProfileImage(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
      }
    }
  }

  return (
    <>
      {loader ? (
        role == 'user' || role == 'agent' ? (
          <div className=' mb-5 mb-xl-10'>
            <div className='card-body pt-9 pb-0'>
              <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                <div className='me-7 mb-4'>
                  <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    {ProfileImg != null && ProfileImg != undefined && ProfileImg != '' ? (
                      <img src={ProfileImg} className='w-175px h-175px' alt='Profile Image' />
                    ) : (
                      <img src={profileImage} className='w-175px h-175px' alt='Profile Image' />
                    )}

                    <div className='position-absolute translate-middle bottom-0 start-100  bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center mb-2'>
                        <span className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                          {fullName}
                        </span>
                      </div>

                      <div className=' flex-wrap fw-bold fs-6 mb-4 pe-2'>
                        <span className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/communication/com011.svg'
                            className='svg-icon-4 me-1'
                          />
                          {email}
                        </span>
                        {country != '' && country != undefined && (
                          <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                            <KTSVG
                              path='/media/icons/duotune/general/gen018.svg'
                              className='svg-icon-4 me-1'
                            />
                            {country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='d-flex overflow-auto h-55px'>
                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/dashboard/my-account/overview' && 'active')
                      }
                      to='/dashboard/my-account/overview'
                    >
                      Overview
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/dashboard/my-account/settings' && 'active')
                      }
                      to='/dashboard/my-account/settings'
                    >
                      Settings
                    </Link>
                  </li>
                  {role !== 'agent' && (
                    <li className='nav-item'>
                      <Link
                        className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === '/dashboard/my-account/listings' && 'active')
                        }
                        to='/dashboard/my-account/listings'
                      >
                        Listings
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : role == 'broker' ? (
          <div className='card mb-5 mb-xl-10'>
            <div className='card-body pt-9 pb-0'>
              <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                <div className='me-7 mb-4'>
                  <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    {ProfileImg != null && ProfileImg != undefined && ProfileImg != '' ? (
                      <img src={ProfileImg} className='w-175px h-175px' alt='Profile Image' />
                    ) : (
                      <img src={profileImage} className='w-175px h-175px' alt='Profile Image' />
                    )}
                    {/* <img src={profileImage} alt='Metornic' /> */}
                    <div className='position-absolute translate-middle  start-100  bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center mb-2'>
                        <span className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                          {fullName}
                        </span>
                      </div>

                      <div className=' flex-wrap fw-bold fs-6 mb-4 pe-2'>
                        {/* <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        {role}
                      </span> */}
                        <span className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                          <KTSVG
                            path='/media/icons/duotune/communication/com011.svg'
                            className='svg-icon-4 me-1'
                          />
                          {email}
                        </span>
                        {country != '' && country != undefined && (
                          <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                            <KTSVG
                              path='/media/icons/duotune/general/gen018.svg'
                              className='svg-icon-4 me-1'
                            />
                            {country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=''>
                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder d-flex flex-wrap'>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 text-nowrap ` +
                        (location.pathname === '/dashboard/my-account/overview' && 'active')
                      }
                      to='/dashboard/my-account/overview'
                    >
                      <span className='d-none d-xl-block no-wrap'>Basic Information</span>
                      <span className='d-xl-none d-block'>
                        {
                          <img
                            title='Basic Information'
                            src={icon1}
                            className='w-50px h-50px'
                            alt='Profile Image'
                          />
                        }
                      </span>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link
                      className={
                        `nav-link text-active-primary me-6  text-nowrap ` +
                        ((location.pathname === '/dashboard/my-account/profile-subscription' ||
                          location.pathname === '/dashboard/my-account/package' ||
                          location.pathname === '/dashboard/my-account/payment') &&
                          'active')
                      }
                      to='/dashboard/my-account/profile-subscription'
                    >
                      <span className='d-none d-xl-block no-wrap'>Subscription</span>
                      <span className='d-xl-none d-block'>
                        {
                          <img
                            title='Subscription'
                            src={icon2}
                            className='w-50px h-50px'
                            alt='Profile Image'
                          />
                        }
                      </span>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 text-nowrap  ` +
                        (location.pathname === '/dashboard/my-account/broker-detail-information' &&
                          'active')
                      }
                      to='/dashboard/my-account/broker-detail-information'
                    >
                      <span className='d-none d-xl-block no-wrap'> Detail Information</span>
                      <span className='d-xl-none d-block'>
                        {
                          <img
                            title='Detail Information'
                            src={icon3}
                            className='w-50px h-50px'
                            alt='Profile Image'
                          />
                        }
                      </span>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 text-nowrap ` +
                        (location.pathname === '/dashboard/my-account/company-images' && 'active')
                      }
                      to='/dashboard/my-account/company-images'
                    >
                      <span className='d-none d-xl-block no-wrap'> Company Images</span>
                      <span className='d-xl-none d-block'>
                        {
                          <img
                            title=' Company Images'
                            src={icon4}
                            className='w-50px h-50px px-0 mx-0'
                            alt='Profile Image'
                          />
                        }
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </>
  )
}

export {ProfileHeader}
