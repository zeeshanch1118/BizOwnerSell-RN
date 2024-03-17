import React from 'react'
import {AiFillTwitterSquare} from 'react-icons/ai'
import {FaFacebookF, FaFacebookSquare, FaLinkedin, FaLinkedinIn, FaTwitter} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Logo from '../../../assets/logo/logo.png'
import '../../../components/Landing-screen/LandingScreen.css'
const Footer = () => {
  return (
    <>
      <div className='' style={{backgroundColor: '#2F4467'}}>
        <div className='container'>
          <div className='row justify-content-between py-15'>
            <div className='col-lg-4 col-md-4 col-sm-12 mt-8'>
              <img src={Logo} />
              <div className='fs-1 mt-20 ms-2'>
                <Link to='#'>
                  <FaFacebookF className='text-white p-1 mx-2 icon-bg' />
                </Link>

                <Link to='#'>
                  <FaLinkedinIn className='text-white p-1 mx-2 icon-bg' />
                </Link>
                <Link to='#'>
                  <FaTwitter className='text-white p-1 mx-2 icon-bg' />
                </Link>
              </div>
            </div>
            <div className='col-lg-8 col-md-8 col-sm-12'>
              <div className='row justify-content-between'>
                <div className='col-lg-2 col-md-2 col-sm-6 text-white text-nowrap'>
                  <p className='text-white footer-heading'>Search</p>
                  <p className='footer-para'>Established Business</p>
                  <p className='footer-para'>Franchises for Sale</p>
                  <p className='footer-para'>Asset Sales</p>
                  <p className='footer-para'>Business Real Estate</p>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-6 text-white text-nowrap'>
                  <h4 className='text-white footer-heading'>Advertise</h4>
                  <p className='footer-para'>List a Business for Sale</p>
                  <p className='footer-para'>Become an Advertiser</p>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-6 text-white text-nowrap'>
                  <h4 className='text-white footer-heading'>Resources</h4>
                  <p className='footer-para'>Value a Business</p>
                  <p className='footer-para'>Learning Center</p>
                  <p className='footer-para'>Finance Center</p>
                  <p className='footer-para'>Blog</p>
                  <p className='footer-para'>BizOwnerSell Edge</p>
                  <p className='footer-para'>Insight Report</p>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-6 text-white text-nowrap'>
                  <h4 className='text-white footer-heading'>Company</h4>
                  <p className='footer-para'>About Us</p>
                  <p className='footer-para'>Contact Us</p>
                  <p className='footer-para'>Terms of Use</p>
                  <p className='footer-para'>Privacy Policy</p>
                  <p className='footer-para'>Sitemap</p>
                  <p className='footer-para'>Insight Report</p>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-6 text-white text-nowrap'>
                  <h4 className='text-white footer-heading'>BizQuest</h4>
                  <p className='footer-para'>Find a Franchise</p>
                  <p className='footer-para'>Apartments.com</p>
                  <p className='footer-para'>LoopNet</p>

                  <p className='footer-para'>Lands of America</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{backgroundColor: '#091220'}}>
          <div className='container'>
            <div
              className='d-flex justify-content-between pt-3'
              style={{color: '#999999', fontSize: '12px'}}
            >
              <div className='d-flex'>
                <p>Copyright 2023 all rights reserved</p>
                <p className='ms-20'>
                  <a className='text-footer' target='_blank' href='https://www.webicosoft.com/'>
                    Powered by (Webicosoft)
                  </a>
                  {/* Website by (Webicosoft) */}
                </p>
              </div>
              <div className='d-flex'>
                <p className='me-20'>Privacy Policy</p>
                <p>Terms and conditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
