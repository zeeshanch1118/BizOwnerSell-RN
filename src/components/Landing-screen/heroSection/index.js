import React, {useState, useEffect} from 'react'
import {AiFillHome, AiFillShop} from 'react-icons/ai'
import {FiTrendingUp} from 'react-icons/fi'
import {
  MdBusinessCenter,
  MdHotel,
  MdLocalGasStation,
  MdLocalLaundryService,
  MdLocalPharmacy,
  MdOutlineRestaurantMenu,
  MdOutlineStorage,
  MdSell,
} from 'react-icons/md'
import {SiInternetarchive} from 'react-icons/si'
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'
import Buyers from '../../../assets/seach-field-icons/buyers.svg'
import Sellers from '../../../assets/seach-field-icons/sellers.svg'
import Business from '../../../assets/seach-field-icons/business.svg'
import Traffic from '../../../assets/seach-field-icons/traffic.svg'
import FinanceIcon from '../../../assets/seach-field-icons/sale-finance.svg'
import HomeIcon from '../../../assets/seach-field-icons/home.png'
import FranchiseIcon from '../../../assets/seach-field-icons/stars.png'
import GasIcon from '../../../assets/seach-field-icons/gas.png'
import WarehouseIcon from '../../../assets/seach-field-icons/warehouse.png'
import HotelIcon from '../../../assets/seach-field-icons/hotel.png'
import WebsiteIcon from '../../../assets/seach-field-icons/website.png'
import RestaurantIcon from '../../../assets/seach-field-icons/restaurant.png'
import PharmacyIcon from '../../../assets/seach-field-icons/pharmacy.png'
import CarIcon from '../../../assets/seach-field-icons/car.png'
import RouteIcon from '../../../assets/seach-field-icons/routes.png'
import CoinIcon from '../../../assets/seach-field-icons/coinlandaury.png'
import './HeroSection.css'
import MainScreenLoader from '../../../assets/Loader/ButtonLoader.gif'
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri'
import {BsStars} from 'react-icons/bs'
import {FaCar, FaCreativeCommonsSampling, FaRoute} from 'react-icons/fa'
import {getHomeSesvices} from '../../services/home-services/index'
import {useNavigate} from 'react-router-dom'
const HeroSection = () => {
  const [toggle, setToggle] = useState(false)
  const [franchiseToggle, setFranchiseToggle] = useState(false)
  const [assetsToggle, setAssetsToggle] = useState(false)
  const [franchises, setFranchises] = useState([])
  const [businesses, setBusinesses] = useState([])
  const [isMoreBusinesses, setIsMoreBusinesses] = useState(true)
  const [businessesLength, setBusinessesLength] = useState(12)
  const [isMoreFranchises, setIsMoreFranchises] = useState(true)
  const [franchiseLength, setFranchiseLength] = useState(12)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    getHomeData()
  }, [])
  useEffect(() => {
    const status = localStorage.getItem('fStatus')
    const statusData = status ? JSON.parse(status) : ''
    const {HomeFranchiseToggler} = statusData ?? ''
    const {HomeBusinessToggler} = statusData ?? ''
    console.log(HomeBusinessToggler, HomeFranchiseToggler, 'HomeBusinessToggler')
    // if (HomeBusinessToggler == true) {
    //   setToggle(false)
    //   setFranchiseToggle(false)
    //   setAssetsToggle(false)
    // } else {
    //   setFranchiseToggle(true)
    //   setToggle(true)
    //   setAssetsToggle(false)
    // }
  }, [])

  function setBusinessesData(id) {
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
      'industriesID',
      JSON.stringify({
        industriesID: [id],
      })
    )
    // navigate('/search-businesses-for-sale')
  }
  function setFranchisesData() {
    localStorage.removeItem('franchiseLocationFilter')
    localStorage.removeItem('f_minPrice')
    localStorage.removeItem('f_maxPrice')
    localStorage.removeItem('franchiseListingName')
    localStorage.removeItem('franchiseCountryID')
    localStorage.removeItem('franchisesID')
    localStorage.removeItem('franchiseStateID')
    localStorage.removeItem('franchiseCityID')
  }
  const getHomeData = async () => {
    try {
      setLoader(false)
      const result = await getHomeSesvices()
      if (result.status === true) {
        setLoader(true)
        setFranchises(result.top_franchises)
        setBusinesses(result.top_business_industries)
      }
    } catch (err) {
      setLoader(false)
      console.log('getBusinessListingTypes err', err)
    }
  }

  const toggleHandlerBusiness = () => {
    setToggle(false)
    setFranchiseToggle(false)
    setAssetsToggle(false)
    localStorage.setItem(
      'fStatus',
      JSON.stringify({
        HomeFranchiseToggler: false,
        HomeBusinessToggler: true,
      })
    )
  }
  const toggleHandlerFranchise = () => {
    setFranchiseToggle(true)
    setToggle(true)
    setAssetsToggle(false)
    localStorage.setItem(
      'fStatus',
      JSON.stringify({
        HomeFranchiseToggler: true,
        HomeBusinessToggler: false,
      })
    )
  }
  const toggleHandlerAssets = () => {
    setAssetsToggle(true)
    setFranchiseToggle(false)
    setToggle(true)
    // setToggle(null)
  }
  const moreBusinessesHandler = () => {
    const items = businesses.length
    setBusinessesLength(items)
    setIsMoreBusinesses(false)
  }
  const lessBusinessesHandler = () => {
    const items = 12
    setBusinessesLength(items)
    setIsMoreBusinesses(true)
  }
  const moreFranchisesHandler = () => {
    const items = franchises.length
    setFranchiseLength(items)
    setIsMoreFranchises(false)
  }
  const lessFranchisesHandler = () => {
    const items = 12
    setFranchiseLength(items)
    setIsMoreFranchises(true)
  }
  return (
    <React.Fragment>
      <div className='hero-main d-flex flex-column container-fluid px-0 font-family-bizOwner'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-12'>
              <div className='inner-hero'>
                <div className='row justify-content-center align-items-center landing-screen-bg text-center'>
                  {!toggle && (
                    <div>
                      <h1 className='text-center landing-front-text mb-0'>
                        Find a business for sale
                      </h1>
                    </div>
                  )}
                  {franchiseToggle && (
                    <div>
                      <h1 className='text-center landing-front-text mb-0'>
                        Find a franchise for sale
                      </h1>
                    </div>
                  )}

                  <div className='my-4 chose-category'>
                    <div className='inner-category d-flex justify-content-between'>
                      <div className=' serachSection'>
                        <label className=''>
                          <input
                            type='radio'
                            className='btn-check'
                            name='attachment'
                            value='has'
                            defaultChecked
                          />
                          <span
                            className=' btn owner-btn rounded-pill btn-active btn-active-primary'
                            style={{marginLeft: '-12px'}}
                            onClick={toggleHandlerBusiness}
                          >
                            <span className='  text-white fs-2 btn-active btn-active-primary family-font'>
                              Businesses
                            </span>
                          </span>
                        </label>
                      </div>
                      <div className='text-center serachSection'>
                        <label>
                          <input type='radio' className='btn-check' name='attachment' value='any' />
                          <span
                            className='btn owner-btn rounded rounded-pill btn-active btn-active-primary'
                            onClick={toggleHandlerFranchise}
                          >
                            <span className=' text-white fs-2 family-font'>Franchises</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <SearchBar isBusinessToggle={toggle} isFranchiseToggle={franchiseToggle} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* style={{minhight: '100px'}} */}
        <div className='HeroSection_box  align-items-bottom'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3 col-6 px-0 end-border-business'>
                <div className='box px-2 py-7  text-center'>
                  <img src={Business} className='hero-icon fs-1 mb-5' />
                  <h3 className='card-title text-light headings '>
                    <span>Business</span>
                  </h3>
                  <span className='hero-inner-footer lh-1 '>for sale Marketplace </span>
                </div>
              </div>
              <div className='col-md-3 col-6 px-0 end-border-business'>
                <div className='box px-2 py-7  text-center'>
                  <img src={Buyers} className='hero-icon fs-1 mb-5' />
                  <h3 className='card-title text-light headings '>
                    <span className='d-md-none d-block'>Buyers</span>
                    <span className='d-none d-md-block'>The Most Buyers</span>
                  </h3>

                  <span className='hero-inner-footer lh-1 '>100,000+ successful sales</span>
                </div>
              </div>
              <div className='col-md-3 col-6 end-border-business px-0'>
                <div className='box px-2 py-7  text-center'>
                  <img src={Sellers} className='hero-icon fs-1 mb-5' />
                  <h3 className='card-title text-light headings   '>
                    <span className='d-md-none d-block'>Sellers</span>
                    <span className='d-none d-md-block'>The Most Sellers</span>
                  </h3>
                  <span className='hero-inner-footer  lh-1  '>
                    65,000+ business listed annually
                  </span>
                </div>
              </div>
              <div className='col-md-3 col-6 px-0'>
                <div className='box px-2 py-7 d-flex flex-column justify-content-center align-items-center none-border-md text-center'>
                  <img src={Traffic} className='hero-icon fs-1 mb-5' />

                  <h3 className='card-title text-light headings  '>
                    {' '}
                    <span className='d-md-none d-block'>Traffic</span>
                    <span className='d-none d-md-block'>The Most Traffic</span>
                  </h3>
                  <span className='hero-inner-footer lh-1 '>15m monthly page views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!toggle ? (
        <div className=' g-bg-color1 py-7 d-lg-block'>
          <div className='container font-family-bizOwner text-start'>
            <div className='row'>
              <div className='border-bottom-color pb-5'>
                <h2 className='business-heading text-white d-inline'>Top Business Categories</h2>
                <br className='d-block d-md-none' />
                {isMoreBusinesses ? (
                  <Link to='#' className='ms-3' onClick={moreBusinessesHandler}>
                    <span className='text-secondary fs-7 family-font'> See more categories </span>
                    <RiArrowDropDownLine className='fs-2' />
                  </Link>
                ) : (
                  <Link to='#' className='ms-3' onClick={lessBusinessesHandler}>
                    <span className='text-secondary fs-7 family-font'> See less categories </span>
                    <RiArrowDropUpLine className='fs-2' />
                  </Link>
                )}
              </div>
            </div>
            {loader ? (
              <div className='row pt-3'>
                {businesses?.slice(0, businessesLength)?.map((item, index) => {
                  return index < 20 ? (
                    <div className='col-6 col-md-3  ' key={index}>
                      <div className='row g-1 mt-3 text-start'>
                        <div className='col-10  '>
                          <Link
                            onClick={() => setBusinessesData(item.id)}
                            to='/search-businesses-for-sale'
                            className=' text-colors text-secondary'
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            ) : (
              <div className='d-flex justify-content-center align-items-center'>
                <div>
                  <img src={MainScreenLoader} className='' alt='' />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : franchiseToggle ? (
        <div className=' g-bg-color1 py-7 d-lg-block'>
          <div className='container font-family-bizOwner text-start'>
            <div className='row'>
              <div className=' border-bottom-color pb-5'>
                <h2 className='business-heading text-white d-inline'>
                  Top Franchise Opportunities
                </h2>
                <br className='d-block d-md-none' />
                {isMoreFranchises ? (
                  <Link to='#' className='ms-3' onClick={moreFranchisesHandler}>
                    <span className='text-secondary fs-7 family-font'> See more categories </span>
                    <RiArrowDropDownLine className='fs-2' />
                  </Link>
                ) : (
                  <Link to='#' className='ms-3' onClick={lessFranchisesHandler}>
                    <span className='text-secondary fs-7 family-font'> See less categories </span>
                    <RiArrowDropUpLine className='fs-2' />
                  </Link>
                )}
              </div>
            </div>
            {loader ? (
              <div className='row pt-3'>
                {franchises?.slice(0, franchiseLength)?.map((item, index) => {
                  return index < 20 ? (
                    <div className='col-6 col-md-3 ' key={index}>
                      <div className='row g-1 mt-3 text-start'>
                        <div className='col-10  ps-2 '>
                          <Link
                            to={`/${item.slug}/${item.id}`}
                            onClick={setFranchisesData}
                            className=' text-colors text-secondary'
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            ) : (
              <div className='d-flex justify-content-center align-items-center'>
                <div>
                  <img src={MainScreenLoader} className='' alt='' />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default HeroSection
