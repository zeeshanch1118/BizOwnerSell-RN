import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import Group251 from '../../../assets/landing-bg/question-mark.jpg'
import Analytics from '../../../assets/landing-bg/Analytics.svg'
import Comma from '../../../assets/landing-bg/comma.png'
import Comma2 from '../../../assets/landing-bg/comma2.png'
import Comma3 from '../../../assets/landing-bg/comma3.png'
import Sale from '../../../assets/landing-bg/sale.svg'
import Listing from '../../../assets/landing-bg/listing.png'
import vectorImg3 from '../../../assets/landing-bg/Vector3.png'
import Dot from '../../../assets/landing-bg/dot.png'
import pImage1 from '../../../assets/profile/Bob-House.jpg'
import pImage2 from '../../../assets/profile/bfs.jpg'
import image from '../../../assets/landing-bg/ribbon-img.png'
import cloths from '../../../assets/images/1952c652-8799-4eaf-a489-99feaf359652-W768.jpg'
import waterDrink from '../../../assets/images/2e8d9680-ff65-4f58-851b-ec3f71447488-W768.jpg'
import fish from '../../../assets/images/d5633df0-4b60-4659-932b-18eb19b4c3b7-W768.jpg'
import restaurant from '../../../assets/images/1c6e0302-00d1-4be3-a242-f94328adf6e2-W768.jpg'
import machines from '../../../assets/images/846cfd13-f7e3-4e13-96ee-6e01b1963ff8-W768.png'
import store from '../../../assets/images/382d71dc-5a29-4593-827e-d6404412c559-W768.jpg'
import {RiDoubleQuotesL} from 'react-icons/ri'
import {FaListAlt} from 'react-icons/fa'
import Slider from 'react-slick'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md'
import FeatureSlider from './FeatureSlider'
import ListingSlider from './ListingSlider'
import ClientSlider from './ClientSlider'
import {getHomeSesvices} from '../../services/home-services/index'
const Body = () => {
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getHomeData()
  }, [])

  const getHomeData = async () => {
    try {
      setLoader(false)
      const result = await getHomeSesvices()
      if (result.status === true) {
        setLoader(true)
        setCities(result.top_cities.data)
        setStates(result.top_provinces.data)
      }
    } catch (err) {
      setLoader(false)
      console.log('getBusinessListingTypes err', err)
    }
  }
  function setStateData(state) {
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
    localStorage.setItem('stateID', JSON.stringify([state]))

    // navigate('/search-businesses-for-sale')
  }
  function setCityData(city) {
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
    localStorage.setItem('cityID', JSON.stringify([city]))

    // navigate('/search-businesses-for-sale')
  }
  return (
    <>
      <div className='container border-bottom border-1 pb-5 family-font'>
        <div className='row mb-5 d-flex g-5 align-items-center justify-content-md-center'>
          <div className='col-lg-6 col-md-12 text-lg-start text-sm-center mt-20'>
            <h2 className=' fw-bolder my-6 sell-text'>
              Sell Your
              <br /> Business Online
            </h2>

            <span className=' lh-lg text-color mb-0 fs-4 '>
              BizOwnerSell has facilitated hundreds of{' '}
              <span className='text-primary'>thousands of </span> <b />
              <br /> <span className='text-primary'>successful business sales </span>
              and is visited over{' '}
              <span className='text-primary'>
                3 Million times
                <br /> each month
              </span>
              <span className='ps-1'>by potential business buyers.</span>
            </span>
            <div className='text-lg-start pt-6 mb-15'>
              <Link to='/sell-a-business' className='btn btn-primary rounded-pill py-2 px-7'>
                Get Started Now
              </Link>
            </div>
            <Link to='/how-to-sell-a-business' className='fs-5 fw-lighter '>
              Learn more about the sales process
            </Link>
          </div>
          <div className='col-lg-6 col-md-12 text-lg-end text-md-center text-sm-center'>
            <img src={image} className='img-fluid' width='397' height='405' />
          </div>
        </div>
      </div>
      <div className='container border-bottom family-font'>
        <div className='row justify-content-center mb-5'>
          <div className='col-lg-10 text-center '>
            <h1 className='fw-lighter mt-7 listed-heading'>
              Get your business listed on our entire Partner Network{' '}
              <Link to='#' className='fw-normal'>
                Learn more
              </Link>
              .
            </h1>
          </div>
        </div>
      </div>

      <div
        style={{backgroundColor: '#DEE9F1', height: '400px', marginTop: '20px'}}
        className='pt-15 pb-20 h-auto'
      >
        <div className='container family-font mt-4'>
          <FeatureSlider />
        </div>
      </div>
      <div
        style={{backgroundColor: '#00A3EF'}}
        className='py-8 d-flex justify-content-center align-items-center'
      >
        <h4 className='mx-2 heading-sell fw-lighter'>
          Sell Your Business on <span className='fw-bolder'>BizOwnerSell</span>
        </h4>
        <Link
          to='/sell-a-business'
          className='py-2 px-6 fs-3 sell-btn bg-transparent rounded-pill text-nowrap ms-8 text-white'
        >
          Learn More
        </Link>
      </div>
      {/* What our Client say about us */}
      <div className='container text-center py-13'>
        <div className='row justify-lg-content-between align-items-center'>
          <p className='testies' style={{fontSize: '20px', color: '#C0C0C0'}}>
            Testimonials
          </p>
          <h1 className='clients-heading'>What Our Clients Say About Us</h1>
          <ClientSlider />
          <span className='border-bottom mt-20 pb-8'></span>
        </div>
      </div>

      <div className='container mt-5 pb-10 text-lg-start text-sm-center font-family-bizOwner'>
        <div className='row g-5'>
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <img src={Group251} className='img-fluid' />
          </div>
          <div className='col-lg-6 col-md-12 col-sm-12 text-end'>
            <div className='accordion accordion-flush ' id='accordionFlushExample'>
              <div className='accordion-item border-bottom'>
                <h2 className='accordion-header' id='flush-headingOne'>
                  <button
                    className='accordion-button cara-btn-landing collapsed  fw-normal'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseOne'
                    aria-expanded='false'
                    aria-controls='flush-collapseOne'
                  >
                    Buying A Small Business
                  </button>
                </h2>
                <div
                  id='flush-collapseOne'
                  className='accordion-collapse collapse '
                  aria-labelledby='flush-headingOne'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div className='accordion-body text-start cara-heading'>
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters, as opposed to using
                    'Content here, content here', making it look like readable English.
                  </div>
                </div>
              </div>
              <div className='accordion-item border-bottom'>
                <h2 className='accordion-header' id='flush-headingTwo'>
                  <button
                    className='accordion-button cara-btn-landing collapsed  fw-normal'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseTwo'
                    aria-expanded='false'
                    aria-controls='flush-collapseTwo'
                  >
                    Buy And Sell Business
                  </button>
                </h2>
                <div
                  id='flush-collapseTwo'
                  className='accordion-collapse collapse'
                  aria-labelledby='flush-headingTwo'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div className='accordion-body text-start cara-heading'>
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters, as opposed to using
                    'Content here, content here', making it look like readable English..
                  </div>
                </div>
              </div>
              <div className='accordion-item border-bottom'>
                <h2 className='accordion-header' id='flush-headingThree'>
                  <button
                    className='accordion-button cara-btn-landing collapsed  fw-normal'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseThree'
                    aria-expanded='false'
                    aria-controls='flush-collapseThree'
                  >
                    Buying A Business
                  </button>
                </h2>
                <div
                  id='flush-collapseThree'
                  className='accordion-collapse collapse'
                  aria-labelledby='flush-headingThree'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div className='accordion-body text-start cara-heading'>
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters, as opposed to using
                    'Content here, content here', making it look like readable English..
                  </div>
                </div>
              </div>
              <div className='accordion-item border-bottom'>
                <h2 className='accordion-header' id='flush-headingFour'>
                  <button
                    className='accordion-button cara-btn-landing collapsed  fw-normal'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseFour'
                    aria-expanded='false'
                    aria-controls='flush-collapseFour'
                  >
                    How To Buy A Business
                  </button>
                </h2>
                <div
                  id='flush-collapseFour'
                  className='accordion-collapse collapse '
                  aria-labelledby='flush-headingFour'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div className='accordion-body text-start cara-heading'>
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters, as opposed to using
                    'Content here, content here', making it look like readable English.
                  </div>
                </div>
              </div>
              <div className='accordion-item border-bottom'>
                <h2 className='accordion-header' id='flush-headingFive'>
                  <button
                    className='accordion-button cara-btn-landing collapsed  fw-normal'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseFive'
                    aria-expanded='false'
                    aria-controls='flush-collapseFive'
                  >
                    Buy And Sell Business
                  </button>
                </h2>
                <div
                  id='flush-collapseFive'
                  className='accordion-collapse collapse'
                  aria-labelledby='flush-headingFive'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div className='accordion-body text-start cara-heading'>
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters, as opposed to using
                    'Content here, content here', making it look like readable English..
                  </div>
                </div>
              </div>

              <div className='text-start mt-6'>
                <Link to='/feedback' className='rounded-pill px-8 py-3 ms-5 contact-btn'>
                  Contact Us{' '}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{backgroundColor: '#DEE9F1', height: '400px'}} className='pt-15 pb-20 h-auto'>
        <div className='container m-auto family-font mt-4'>
          <ListingSlider />
        </div>
      </div>

      <div className='container mt-10 locations-font text-start'>
        <div className='row g-1 py-5'>
          <h1 className='fw-normal  border-bottom border-primary pb-1 d-flex align-items-center '>
            <img className='me-2' src={Sale} style={{height: 'fit-content'}} />
            <span className=' listing-heading'>
              Browse business for sale <br className='d-block d-md-none ' />
              <span className='family-font' style={{color: '#081C3D', fontWeight: '900'}}>
                LISTINGS BY STATE
              </span>
            </span>
          </h1>

          {loader ? (
            states.map((item, i) => (
              <div className='col-lg-2 col-md-4 col-6 text-color-bizowner text-nowrap mb-2' key={i}>
                <Link
                  className='text-link'
                  to='/search-businesses-for-sale'
                  onClick={() => setStateData(item.province)}
                >
                  {item.province}
                </Link>
              </div>
            ))
          ) : (
            <div
              className='d-flex justify-content-center align-items-center'
              // style={{height: '100vh'}}
            >
              <div>
                <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
              </div>
            </div>
          )}
        </div>
        <div className='row g-1 py-5 mt-4 pb-15'>
          <h1 className='fw-normal  border-bottom border-primary pb-1 d-flex align-items-center '>
            <img className='me-2' src={Analytics} style={{height: 'fit-content'}} />
            <span className=' listing-heading'>
              Browse business for sale <br className='d-block d-md-none ' />
              <span className=' family-font' style={{color: '#081C3D', fontWeight: '900'}}>
                LISTINGS BY TOP CITIES
              </span>{' '}
            </span>
          </h1>
          {loader ? (
            cities.map((item, index) => (
              <div
                className='col-lg-2 col-md-4 col-6 text-color-bizowner text-nowrap mb-2'
                key={index}
              >
                <Link
                  className='text-link'
                  to='/search-businesses-for-sale'
                  onClick={() => setCityData(item.city)}
                >
                  {item.city}
                </Link>
              </div>
            ))
          ) : (
            <div
              className='d-flex justify-content-center align-items-center'
              // style={{height: '100vh'}}
            >
              <div>
                <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Body
