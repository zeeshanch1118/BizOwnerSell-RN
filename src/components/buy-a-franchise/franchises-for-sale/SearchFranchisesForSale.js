import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ClientSlider from './ClientSlider'
import './Searchfranchises.css'
import TopBar from './TopBar/TopBar'
import add from '../../../assets/icons/sideAdd.svg'

import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'

import Group251 from '../../../assets/landing-bg/question-mark.jpg'
import Analytics from '../../../assets/landing-bg/Analytics.svg'
import Sale from '../../../assets/landing-bg/sale.svg'
import {getFranchiseCategoriesHome} from '../../services/franchise-categories'
import Add from '../../buy-a-business/searchBusinesses/Add'
import {height} from '@mui/system'
import {baseURL} from '../../services/BaseURL'
import {getBizOwnerAdds} from '../../services/advertisement/Add'
const SearchFranchisesForSale = () => {
  const [loader, setLoader] = useState(false)
  const EmailFunction = (e) => {
    setEmail(e.target.value)
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/
    setEmailForm(regex.test(email))
  }
  const [email, setEmail] = useState('')
  const [emailForm, setEmailForm] = useState(true)

  const SearchRequests = (e) => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/
    setEmailForm(regex.test(email))
  }
  //////////////////End email//////////////////

  const [childData, setChildData] = useState('')
  const [franchiseCategories, setFranchiseCategories] = useState([])
  const [lowFranchiseCategories, setLowFranchiseCategories] = useState([])
  // getFranchiseCategories
  useEffect(() => {
    getAllUsers()
  }, [])
  const getAllUsers = async () => {
    try {
      const result = await getFranchiseCategoriesHome()
      if (result.status === true) {
        setFranchiseCategories(result?.franchise_top_categories)
        setLowFranchiseCategories(result?.franchise_low_categories)

        setLoader(true)
      }
    } catch (err) {}
  }

  const [sideBarAdd, setSideBarAdd] = useState('')
  useEffect(() => {
    getAdds()
  }, [])
  const getAdds = async (accessToken) => {
    const result = await getBizOwnerAdds()

    if (result.status == true) {
      result?.advertise?.data?.map((item) => {
        if (item?.location == 'sidebar') {
          setSideBarAdd(item?.advertise)
        }
      })
    }
  }

  return (
    <>
      <div className='inner-header-bg'>
        <div className='container'>
          <TopBar />
        </div>
      </div>
      {/* ////////////////////  Top Franchises ////// POpular Franchises //////// */}
      {loader ? (
        <>
          <div className='container mt-7 locations-font text-start'>
            <div className='row g-5 pb-5 justify-content-between'>
              <div className='col-lg-9'>
                <h1 className='fw-normal  border-bottom border-primary pb-2'>
                  <img src={Sale} style={{marginTop: '-1%'}} />
                  <span className='ms-4 listing-heading-franchise'>
                    Browse franchise for sale
                    <span
                      className='family-font ps-2'
                      style={{color: '#081C3D', fontWeight: '900'}}
                    >
                      TOP CATEGORIES
                    </span>
                  </span>
                </h1>
                {/* <div className='col-lg-2 col-md-4 col-sm-6 text-color-bizowner text-nowrap'> */}
                <div className='flex-wrap row  mx-auto mt-1'>
                  {franchiseCategories?.map(
                    (item, index) =>
                      index <= 6 && (
                        <div
                          className='text-start border-0 col-6 col-sm-4 py-3 text-color-bizowner '
                          key={index}
                        >
                          <Link to={`/${item.slug}/${item.id}`}>
                            <h6
                              key={index}
                              className=' text-link d-inline text-color-bizowner border-0  mb-0 '
                            >
                              {item.name}
                            </h6>
                          </Link>
                        </div>
                      )
                  )}
                </div>
                <div className=' pt-5 pb-1 justify-content-between mt-8'>
                  <h1 className='fw-normal  border-bottom border-primary pb-2'>
                    <img src={Analytics} style={{marginTop: '-1%'}} />
                    <span className='ms-4 listing-heading-franchise'>
                      Browse franchise for sale
                      <span
                        className='family-font ps-2'
                        style={{color: '#081C3D', fontWeight: '800'}}
                      >
                        POPULAR CATEGORIES
                      </span>
                    </span>
                  </h1>
                </div>
                <div className='row flex-wrap mx-auto mt-1'>
                  {lowFranchiseCategories.map(
                    (item, index) =>
                      index > 6 && (
                        <div
                          className='text-start border-0 col-6 col-sm-4 py-3  text-color-bizowner  '
                          key={index}
                        >
                          <Link
                            className=''
                            // FranchiseCategories
                            // onClick={() => <FranchiseCategories />}
                            to={`/${item.slug}/${item.id}`}
                            // data-bs-toggle='tooltip'
                            // data-bs-placement='top'
                            // title='Restaurant and Food'
                          >
                            <h6
                              key={index}
                              className=' text-link text-color-bizowner border-0 d-inline me-2  mb-0'
                            >
                              {item.name}
                            </h6>
                          </Link>
                        </div>
                      )
                  )}
                </div>

                {/* /////////////// FAQ ///////////// */}
                <div className=' mt-5 pb-10 text-lg-start text-sm-center font-family-bizOwner'>
                  <div className='row g-5 align-items-md-center py-3'>
                    <div className=' col-8 col-md-4 mx-auto '>
                      <img src={Group251} className='img-fluid w-100' />
                    </div>
                    <div className='col-md-8  text-md-end'>
                      <div
                        className='accordion accordion-flush biz-owner-accordion mx-auto mx-md-0 ms-md-auto'
                        id='accordionFlushExample'
                      >
                        <div className='accordion-item border-bottom'>
                          <h2 className='accordion-header' id='flush-headingOne'>
                            <button
                              className='accordion-button cara-btn collapsed  fw-normal'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#flush-collapseOne'
                              aria-expanded='false'
                              aria-controls='flush-collapseOne'
                            >
                              Buying A Small Franchise
                            </button>
                          </h2>
                          <div
                            id='flush-collapseOne'
                            className='accordion-collapse collapse '
                            aria-labelledby='flush-headingOne'
                            data-bs-parent='#accordionFlushExample'
                          >
                            <div className='accordion-body text-start cara-heading'>
                              It is a long established fact that a reader will be distracted by the
                              readable content of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less normal distribution of
                              letters, as opposed to using 'Content here, content here', making it
                              look like readable English.
                            </div>
                          </div>
                        </div>
                        <div className='accordion-item border-bottom'>
                          <h2 className='accordion-header' id='flush-headingTwo'>
                            <button
                              className='accordion-button cara-btn collapsed  fw-normal'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#flush-collapseTwo'
                              aria-expanded='false'
                              aria-controls='flush-collapseTwo'
                            >
                              Buy And Sell Franchises
                            </button>
                          </h2>
                          <div
                            id='flush-collapseTwo'
                            className='accordion-collapse collapse'
                            aria-labelledby='flush-headingTwo'
                            data-bs-parent='#accordionFlushExample'
                          >
                            <div className='accordion-body text-start cara-heading'>
                              It is a long established fact that a reader will be distracted by the
                              readable content of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less normal distribution of
                              letters, as opposed to using 'Content here, content here', making it
                              look like readable English..
                            </div>
                          </div>
                        </div>
                        <div className='accordion-item border-bottom'>
                          <h2 className='accordion-header' id='flush-headingThree'>
                            <button
                              className='accordion-button cara-btn collapsed  fw-normal'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#flush-collapseThree'
                              aria-expanded='false'
                              aria-controls='flush-collapseThree'
                            >
                              Buying A Franchise
                            </button>
                          </h2>
                          <div
                            id='flush-collapseThree'
                            className='accordion-collapse collapse'
                            aria-labelledby='flush-headingThree'
                            data-bs-parent='#accordionFlushExample'
                          >
                            <div className='accordion-body text-start cara-heading'>
                              It is a long established fact that a reader will be distracted by the
                              readable content of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less normal distribution of
                              letters, as opposed to using 'Content here, content here', making it
                              look like readable English..
                            </div>
                          </div>
                        </div>
                        <div className='accordion-item border-bottom'>
                          <h2 className='accordion-header' id='flush-headingFour'>
                            <button
                              className='accordion-button cara-btn collapsed  fw-normal'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#flush-collapseFour'
                              aria-expanded='false'
                              aria-controls='flush-collapseFour'
                            >
                              How To Buy A Franchise
                            </button>
                          </h2>
                          <div
                            id='flush-collapseFour'
                            className='accordion-collapse collapse '
                            aria-labelledby='flush-headingFour'
                            data-bs-parent='#accordionFlushExample'
                          >
                            <div className='accordion-body text-start cara-heading'>
                              It is a long established fact that a reader will be distracted by the
                              readable content of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less normal distribution of
                              letters, as opposed to using 'Content here, content here', making it
                              look like readable English.
                            </div>
                          </div>
                        </div>
                        <div className='accordion-item border-bottom'>
                          <h2 className='accordion-header' id='flush-headingFive'>
                            <button
                              className='accordion-button cara-btn collapsed  fw-normal'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#flush-collapseFive'
                              aria-expanded='false'
                              aria-controls='flush-collapseFive'
                            >
                              Buy And Sell Franchises
                            </button>
                          </h2>
                          <div
                            id='flush-collapseFive'
                            className='accordion-collapse collapse'
                            aria-labelledby='flush-headingFive'
                            data-bs-parent='#accordionFlushExample'
                          >
                            <div className='accordion-body text-start cara-heading'>
                              It is a long established fact that a reader will be distracted by the
                              readable content of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less normal distribution of
                              letters, as opposed to using 'Content here, content here', making it
                              look like readable English..
                            </div>
                          </div>
                        </div>

                        <div className='text-start mt-6'>
                          <Link to='/feedback' className='rounded-pill px-7 py-3 ms-5 contact-btn'>
                            Contact Us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 d-none d-lg-block'>
                <div style={{width: '90%', marginLeft: 'auto'}}>
                  {sideBarAdd != '' && sideBarAdd != undefined ? (
                    <img
                      src={sideBarAdd}
                      alt=''
                      className='img-fluid w-100  h-100'
                      style={{height: '100%'}}
                    />
                  ) : (
                    <img src={add} alt='' className='img-fluid w-100  h-100' />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* /////////////// seller btn ///////////// */}
          <div
            style={{backgroundColor: '#00A3EF'}}
            className='py-8 d-flex justify-content-center align-items-center'
          >
            <h2 className='mx-2 heading-sell fw-lighter'>
              Sell Your Franchise on <span className='fw-bolder'>BizOwnerSell</span>
            </h2>
            <Link
              to='/sell-a-business'
              className='py-3 px-6 fs-3 sell-btn bg-transparent rounded-pill text-nowrap ms-8 text-white'
            >
              Learn More
            </Link>
          </div>

          {/* /////////////////////// Testimonial ///////////////// */}
          <div className='container text-center py-13'>
            <div className='row justify-lg-content-between align-items-center'>
              <p className='testies' style={{fontSize: '20px', color: '#C0C0C0'}}>
                Testimonials
              </p>
              <h1 className='clients-heading'>What Our Clients Say About Us</h1>
              <ClientSlider />
              <span className='mt-20'></span>
            </div>
          </div>
        </>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </>
  )
}
export default SearchFranchisesForSale
