import React, {useEffect, useState} from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'
import {useAuth} from '../../../../app/modules/auth'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import mainLogoImage from '../../../../../src/assets/images/mainLogoImage.svg'
import {FaSignInAlt} from 'react-icons/fa'
import './MenuInner.css'
import SigninIcon from '../../../../assets/seach-field-icons/signin.svg'
import SigninBlackIcon from '../../../../assets/seach-field-icons/Sign in black.svg'
import buttonLoader from '../../../../assets/Loader/ButtonLoader.gif'
import {useDispatch, useSelector} from 'react-redux'
import {logOutUser} from '../../../../components/services/auth-services/AuthServices'

export function MenuInner() {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signin, SetSignIn] = useState(false)
  const [btnActive, SetBtnActive] = useState(false)
  const [role, seRole] = useState()
  const [join, SetJoin] = useState(false)

  const intl = useIntl()
  const {currentUser} = useAuth()
  const userData = localStorage.getItem('userData')
  const [hearder, setHeader] = useState(true)
  const [loader, setLoader] = useState(false)
  const [transformedData, setTransformedData] = useState()
  const trasData = userData ? JSON?.parse(userData) : ''
  const {accessToken} = trasData
  // let data = useSelector((state) => {
  //   return state
  // })
  useEffect(() => {
    const userData = localStorage.getItem('userData')
    const trasData = userData ? JSON?.parse(userData) : ''
    setTransformedData(trasData)
    if (trasData) {
      const {role} = trasData
      seRole(role)
    }
    if (hearder == true) {
      setHeader(false)
    } else {
      setHeader(true)
    }
  }, [])

  const [signStatus, setSignStatus] = useState(true)
  // const { accessToken, userName, role } = transformedData;
  const SetNavigation = () => {
    SetSignIn(true)
    SetBtnActive(false)
  }
  const SetJoinNavigation = () => {
    SetSignIn(false)
    SetBtnActive(true)
  }

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
      navigate('/')
      setLoader(false)
      window.location.reload()
    }
  }
  return (
    <>
      <Link to={`${role == 'admin' ? '/dashboard' : '/'}`} style={{marginTop: 10, marginRight: 40}}>
        <img
          id='bizowner-header-logo'
          className='d-none d-lg-inline'
          src={mainLogoImage}
          width='auto'
          height={53}
          alt='logo'
        ></img>
      </Link>
      {role !== 'admin' && (
        <>
          <MenuInnerWithSub
            title='Buy a Business'
            to='#'
            menuPlacement='bottom-start'
            // menuTrigger='click'
            menuTrigger={`{default:'click', lg: 'hover'}`}
            hasArrow={true}
          >
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/search-businesses-for-sale'
              title='Search for a Business'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/search-businesses/established-businesses-for-sale'
              title='Established Businesses'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/search-businesses/assets-for-sale'
              title='Asset Sale'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/how-to-buy-a-business'
              title='How to Buy a Business'
            />
            {/* <MenuItem
          icon='/media/icons/duotune/general/gen051.svg'
          to='/membership-biz-buy-sell-edge'
          title='BizOwnerSell Edge'
        /> */}
          </MenuInnerWithSub>

          <MenuInnerWithSub
            to='#'
            title='Buy a Franchise'
            menuTrigger={`{default:'click', lg: 'hover'}`}
            hasArrow={true}
            menuPlacement='bottom-start'
          >
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='franchise-for-sale'
              title='Search Franchises For Sale'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/low-cost-franchise/1'
              title='Low Cost Franchises'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/food-and-restaurant-franchise/2'
              title='Restaurant & Food Franchises'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/business-opportunities-franchise/3'
              title='Business Opportunities'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/retail-franchise/4'
              title='Retail Franchises'
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            to='#'
            title='Sell a Business'
            menuTrigger={`{default:'click', lg: 'hover'}`}
            hasArrow={true}
            menuPlacement='bottom-start'
          >
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/sell-a-business'
              title='Sell Business on BizOwnerSell'
            />
            {/* <MenuItem
          // icon='/media/icons/duotune/general/gen051.svg'
          to='/brokers'
          title='Sell Multiple Businesses'
        /> */}
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/how-to-sell-a-business'
              title='How to Sell a Business'
            />
            {/* <MenuItem
          icon='/media/icons/duotune/general/gen051.svg'
          to='/small-business-valuation'
          title='Value a Business'
        /> */}
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/business-brokers'
              title='Find a Broker'
            />
          </MenuInnerWithSub>

          <MenuInnerWithSub
            to='#'
            title='Tool & Advice'
            menuTrigger={`{default:'click', lg: 'hover'}`}
            hasArrow={true}
            menuPlacement='bottom-start'
          >
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/learning-center'
              title='Learning Center'
            />
            {/* <MenuItem
          to='/finance-center'
          title='Finance Center'
        /> */}
            {/* <MenuItem
          // icon='/media/icons/duotune/general/gen051.svg'
          to='/blog'
          title='Business for Sale Blog'
        /> */}
          </MenuInnerWithSub>
        </>
      )}

      {
        !transformedData ? (
          <>
            <div className='me-auto ms-20 lg-screen'></div>
            <div className='me-auto ms-20 lg-screen'></div>
            <div className='me-auto ms-10 lg-screen'></div>
            <div className='me-auto ms-20'></div>
            <div className='me-auto ms-10'></div>

            <div className=' ms-3 ms-lg-0 d-flex justify-content-lg-around justify-content-sm-center mt-3 rounded-pill signin-btn-bg'>
              <div className=''>
                <Link to='/auth/login' onClick={() => SetNavigation()}>
                  <input
                    type='radio'
                    className='btn-check'
                    name='attachment'
                    value='has'
                    defaultChecked
                  />
                  <span
                    className={`px-9 btn owner-btn-signin rounded-pill btn-active active-class ${
                      btnActive == false ? 'btn-active-dark btn-top-bar-Active' : ''
                    } `}
                    // style={{marginLeft:"-12px"}}
                    // onClick={toggleHandlerBusiness}
                    onMouseOver={() => SetBtnActive(false)}
                    onMouseLeave={() =>
                      pathname == '/auth/login' ? SetBtnActive(false) : SetBtnActive(true)
                    }
                    style={{marginLeft: '0px', height: '45px'}}
                  >
                    <span
                      className={` ${
                        btnActive == false ? 'btn-active-dark   pt-15 fs-5 btn-active' : ''
                      } `}
                    >
                      <span className='signIn_text'>
                        Sign in
                        {signin || signStatus ? (
                          <img src={SigninIcon} className='ms-2 fw-lighter' />
                        ) : (
                          <img src={SigninBlackIcon} className='ms-2 fw-lighter' />
                        )}
                      </span>
                      <span className='icon_signIn'>Signin</span>
                    </span>
                  </span>
                </Link>
              </div>
              <div className='text-center'>
                <Link to='/auth/registration' onClick={() => SetJoinNavigation()}>
                  <input type='radio' className='btn-check' name='attachment' value='any' />
                  <span
                    className={`${
                      btnActive == true ? ' btn-top-bar-Active' : ''
                    }  btn owner-btn-signin btn-join px-9 rounded-pill active-class btn-active-dark`}
                    style={{marginLeft: '-20px', height: '45px'}}
                    onMouseOver={() => SetBtnActive(true)}
                    onMouseLeave={() =>
                      pathname == '/auth/registration' ? SetBtnActive(true) : SetBtnActive(false)
                    }
                  >
                    <span
                      className={` ${
                        btnActive == true ? 'btn-active-dark    pt-15 fs-5 btn-active' : ''
                      } `}
                    >
                      <span className='joinNow_text'>Join now</span>
                      <span className='icon_join'>Join</span>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </>
        ) : role === 'user' || role === 'broker' || role == 'agent' ? (
          <MenuInnerWithSub
            title='My BizOwnerSell'
            menuTrigger={`{default:'click', lg: 'hover'}`}
            hasArrow={true}
            to='#'
            menuPlacement='bottom-start'
          >
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/dashboard/'
              title='Dashboard'
            />
            <MenuItem
              // icon='/media/icons/duotune/general/gen051.svg'
              to='/dashboard/my-listings'
              title='My Listing'
            />
            {role !== 'agent' && (
              <>
                <MenuItem
                  // icon='/media/icons/duotune/general/gen051.svg'
                  to='/dashboard/saved-listings'
                  title='My Saved Listing'
                />
                <MenuItem
                  // icon='/media/icons/duotune/general/gen051.svg'
                  to='/dashboard/saved-searches'
                  title='My Saved Searches'
                />
                <MenuItem
                  // icon='/media/icons/duotune/general/gen051.svg'
                  to='/dashboard/inbox'
                  title='My Mailbox'
                />
                <MenuItem
                  // icon='/media/icons/duotune/general/gen051.svg'
                  to='/dashboard/my-account'
                  title='My Account'
                />
              </>
            )}
          </MenuInnerWithSub>
        ) : null
        // <>
        //   <MenuItem
        //     // icon='/media/icons/duotune/general/gen051.svg'
        //     to='/dashboard/'
        //     title='Dashboard'
        //   />
        // </>
      }
    </>
  )
}
