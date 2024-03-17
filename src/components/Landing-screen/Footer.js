import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo/logo.png'
import fbIcon from '../../assets/social-icons/facebook icon.svg'
import linkedinIcon from '../../assets/social-icons/Linkedin Icon.svg'
import twitterIcon from '../../assets/social-icons/twitter icon.png'
import pinterestIcon from '../../assets/social-icons/pinterest icon.svg'
import behanceIcon from '../../assets/social-icons/behance icon.svg'
import './LandingScreen.css'
import {useDispatch} from 'react-redux'
const Footer = () => {
  let updateTopbar = 'topbar'

  let dispatch = useDispatch()
  const setEstablishedbusinessID = () => {
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')

    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: [1],
      })
    )
    dispatch({
      type: 'INDUSTRY',
      payload: {
        updateTopbar,
      },
    })
  }
  const setSearchBusinessID = () => {
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')
    dispatch({
      type: 'INDUSTRY',
      payload: {
        updateTopbar,
      },
    })
  }
  const setAssetSaleID = () => {
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')

    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: [2],
      })
    )

    dispatch({
      type: 'INDUSTRY',
      payload: {
        updateTopbar,
      },
    })
  }
  const userData = localStorage.getItem('userData')
  const trasData = userData ? JSON?.parse(userData) : ''
  const {role} = trasData
  return (
    <>
      <div className='' style={{backgroundColor: '#2F4467'}}>
        {role != 'admin' && (
          <div className='container text-start'>
            <div className='row g-5 justify-content-between py-15'>
              <div
                className={` ${role == 'admin' ? 'col-10' : 'col-lg-4 col-md-4 col-sm-12'} mt-0`}
              >
                <Link to='#'>
                  {' '}
                  <img src={Logo} />
                </Link>
                <div className='fs-1 mt-5  d-flex'>
                  <Link to='#' className=''>
                    <div className=' mx-2 icon-bg fb-icon'>
                      <img src={fbIcon} className='text-color pt-1' />
                    </div>
                  </Link>

                  <Link to='#' className=''>
                    <div className=' mx-2 icon-bg linkedin-icon'>
                      <img src={linkedinIcon} className='text-color pt-1' />
                    </div>
                  </Link>
                  <Link to='#' className=''>
                    <div className=' mx-2 icon-bg twitter-icon'>
                      <img src={twitterIcon} className='text-color pt-1' />
                    </div>
                  </Link>
                  <Link to='#' className=''>
                    <div className=' mx-2 icon-bg pint-icon'>
                      <img src={pinterestIcon} className='text-color pt-1' />
                    </div>
                  </Link>
                  <Link to='#' className=''>
                    <div className=' mx-2 icon-bg behance-icon'>
                      <img src={behanceIcon} className='text-color pt-1' />
                    </div>
                  </Link>
                </div>
              </div>
              <div className={`${role == 'admin' ? 'col-2' : 'col-lg-8 col-md-7 col-sm-12'}`}>
                <div className='row justify-content-between'>
                  {role !== 'admin' && (
                    <>
                      <div className='col-lg-2 col-md-4 col-sm-6 text-white text-nowrap'>
                        <h4 className='text-white footer-heading'>Search</h4>
                        <div className='row'>
                          <div className='col-6 col-md-12'>
                            <Link
                              className='text-footer'
                              to='/search-businesses/established-businesses-for-sale'
                            >
                              <p onClick={() => setEstablishedbusinessID()} className='footer-para'>
                                Established Business
                              </p>
                            </Link>
                          </div>
                          <div className='col-6 col-md-12'>
                            <Link className='text-footer' to='/franchise-for-sale'>
                              <p className='footer-para'>Franchises for Sale</p>
                            </Link>
                          </div>
                          <div className='col-6 col-md-12'>
                            <Link className='text-footer' to='/search-businesses/assets-for-sale'>
                              <p onClick={() => setAssetSaleID()} className='footer-para'>
                                Asset Sales
                              </p>
                            </Link>
                          </div>
                          {/* <div className='col-6 col-md-12'>
                     <Link 
                     className='text-footer' 
                     to='#'>
                       <p className='footer-para'>Business Real Estate</p>
                     </Link>
                   </div> */}
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 text-white text-nowrap'>
                        <h4 className='text-white footer-heading'>Advertise</h4>
                        <div className='row'>
                          <div className='col-6 col-md-12'>
                            <Link className='text-footer' to='/search-businesses-for-sale'>
                              <p onClick={() => setSearchBusinessID()} className='footer-para'>
                                List a Business for Sale
                              </p>
                            </Link>
                          </div>
                          <div className='col-6 col-md-12'>
                            <Link className='text-footer' to='#'>
                              <p className='footer-para'>Become an Advertiser</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 text-white text-nowrap'>
                        <h4 className='text-white footer-heading'>Resources</h4>
                        <div className='row'>
                          {/* <div className='col-6 col-md-12'>
                     <Link className='text-footer' to='/small-business-valuation'>
                       <p className='footer-para'>Value a Business</p>
                     </Link>
                   </div> */}

                          <div className='col-6 col-md-12'>
                            <Link className='text-footer' to='/learning-center'>
                              <p className='footer-para'>Learning Center</p>
                            </Link>
                          </div>
                          {/* <div className='col-6 col-md-12'>
                     <Link className='text-footer' to='/finance-center'>
                       <p className='footer-para'>Finance Center</p>
                     </Link>
                   </div> */}
                          {/* <div className='col-6 col-md-12'>
                     <Link className='text-footer' to='/membership-biz-buy-sell-edge'>
                       <p className='footer-para'>BizOwnerSell Edge</p>
                     </Link>
                   </div> */}
                        </div>
                      </div>
                    </>
                  )}

                  <div className='col-lg-2 col-md-4 col-sm-6 text-white text-nowrap'>
                    <h4 className='text-white footer-heading'>Company</h4>
                    <div className='row'>
                      <div className='col-md-12 col-6'>
                        <Link className='text-footer' to='#'>
                          <p className='footer-para'>About Us</p>
                        </Link>
                      </div>
                      <div className='col-md-12 col-6'>
                        <Link className='text-footer' to='/feedback'>
                          <p className='footer-para'>Contact Us</p>
                        </Link>
                      </div>
                      <div className='col-md-12 col-6'>
                        <Link className='text-footer' to='terms-of-use'>
                          <p className='footer-para'>Terms of Use</p>
                        </Link>
                      </div>
                      <div className='col-md-12 col-6'>
                        <Link className='text-footer' to='privacy-notice'>
                          <p className='footer-para'>Privacy Notice</p>
                        </Link>
                      </div>
                      <div className='col-md-12 col-6'>
                        <Link className='text-footer' to='site-map'>
                          <p className='footer-para'>Sitemap</p>
                        </Link>
                      </div>
                      {/* <div className='col-md-12 col-6'>
                     <Link className='text-footer' to='#'>
                       <p className='footer-para'>Sitemap</p>
                     </Link>
                   </div> */}
                      {/* <div className='col-md-12 col-6'>
                     <Link className='text-footer' to='#'>
                       <p className='footer-para'>Insight Report</p>
                     </Link>
                   </div> */}
                    </div>
                  </div>
                  {/* <div className='col-lg-2 col-md-4 col-sm-6 text-white text-nowrap'>
                 <h4 className='text-white footer-heading'>BizQuest</h4>
                 <div className='row'>
                   <div className='col-md-12 col-6'>
                     <Link className='text-footer' to='franchise-for-sale'>
                       <p className='footer-para'>Find a Franchise</p>
                     </Link>
                   </div>
                   <div className='col-md-12 col-6'>
                     <Link className='text-footer' to='#'>
                       <p className='footer-para'>Apartments.com</p>
                     </Link>
                   </div>
                   <div className='col-md-12 col-6'>
                     <Link className='text-footer' to='#'>
                       <p className='footer-para'>LoopNet</p>
                     </Link>
                   </div>
                   <div className='col-md-12 col-6'>
                     <Link className='text-footer' to='#'>
                       <p className='footer-para'>Lands of America</p>
                     </Link>
                   </div>
                 </div>
               </div> */}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='bottom_footer' style={{backgroundColor: '#091220', color: 'white'}}>
          <div className='container p-5'>
            <div className='row'>
              <div className='col-md-3'>
                <p className='mb-0'>Copyright 2023 all rights reserved</p>
              </div>
              <div className='col-md-3'>
                <p className='mb-0'>
                  <a className='text-footer' target='_blank' href='https://www.webicosoft.com/'>
                    Powered by (Webicosoft)
                  </a>
                </p>
              </div>
              <div className='col-md-3'></div>
              <div className='col-md-3 last d-flex'>
                <a className='text-footer' href='/privacy-notice'>
                  <p className='  mb-0 mx-3'>Privacy Policy</p>
                </a>
                <a className='text-footer' href='/terms-of-use'>
                  <p className='  mb-0'>Terms and Conditions</p>
                </a>
              </div>
            </div>
            {/* <div
              className='d-flex justify-content-between pt-3'
              style={{color: '#999999', fontSize: '12px'}}
            >    display: flex;
    margin: 0;
    padding: 0;
              <div className='d-flex'>
                <p>Copyright 2023 all rights reserved</p>
                <Link className='text-footer' to='#'>
                  <p className='ms-20 webico-border'>Website by (Webicosoft)</p>
                </Link>
              </div>
              <div className='d-flex'>
                <Link className='text-footer' to='#'>
                  <p className='me-20 webico-border'>Privacy Policy</p>
                </Link>
                <Link className='text-footer' to='#'>
                  <p className='webico-border'>Terms and Conditions</p>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
