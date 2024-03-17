import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import './SiteMap.css'
import {
  getFranchisesTypesForSiteMap,
  getIndustryTypesForSiteMap,
  getListingTypesForSiteMap,
} from '../services/site-map'
import {getHomeSesvices} from '../services/home-services'
const SiteMap = () => {
  const [allIndustries, setAllIndustries] = useState([])
  const [allListings, setAllListings] = useState([])
  const [isIndustryLoader, setIsIndustryLoader] = useState(true)
  const [isFranchiseLoader, setIsFranchiseLoader] = useState(true)
  const [isListingLoader, setIsListingLoader] = useState(true)
  const [IsHomeLoader, setIsHomeLoader] = useState(true)

  const [allFranchises, setAllFranchises] = useState([])
  const [papularIndustry, setPapularIndustry] = useState([])

  const userData = localStorage.getItem('userData')

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    getIndustries()
    getFranchiseTypes()
    getListings()
    HomeSesvices()
  }, [])
  const getIndustries = async () => {
    let mapIndustries = []
    try {
      const result = await getIndustryTypesForSiteMap()
      console.log('getIndustries', result)
      if (result.status === true) {
        result.data.map((item, index) => mapIndustries.push({id: item.id, name: item.name}))
        setAllIndustries(mapIndustries)
        setIsIndustryLoader(false)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const getListings = async () => {
    let mapListings = []
    try {
      const result = await getListingTypesForSiteMap()
      console.log('getListings', result)
      if (result.status === true) {
        result.data.map((item, index) => mapListings.push({id: item.id, name: item.type}))
        setAllListings(mapListings)
        setIsListingLoader(false)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const getFranchiseTypes = async () => {
    let mapFranchises = []
    try {
      const result = await getFranchisesTypesForSiteMap()
      console.log('getFranchiseTypes', result)
      if (result.status === true) {
        result.data.map((item, index) => mapFranchises.push({id: item?.id, name: item?.name}))
        setAllFranchises(mapFranchises)
        setIsFranchiseLoader(false)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const HomeSesvices = async () => {
    let papularIndustry = []
    try {
      const result = await getHomeSesvices()
      console.log('getFranchiseTypes', result)
      if (result.status === true) {
        result?.top_business_industries?.map((item, index) =>
          papularIndustry.push({id: item?.id, name: item?.name})
        )
        setPapularIndustry(papularIndustry)
        setIsHomeLoader(false)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  return (
    <>
      <div className='container pb-15'>
        <div className='row mt-8'>
          <div className='col-12'>
            <h1 className='site-map-heading'>BizOwnerSell Site Map</h1>
          </div>
        </div>
        <div className='row mt-1'>
          <div className='col-md-4 pt-2'>
            <Link to='/' className='title-heading py-1'>
              Homepage
            </Link>
            <Link className='d-block site-links text-truncate' to={'#'}>
              About Us
            </Link>
            <Link className='d-block site-links text-truncate' to={'/privacy-notice'}>
              Privacy Notice
            </Link>
            <Link className='d-block site-links text-truncate' to={'/terms-of-use'}>
              Terms of Use
            </Link>
          </div>
          <div className='col-md-4 pt-2'>
            <Link to='/business-brokers' className='title-heading py-1'>
              For Brokers
            </Link>
            <Link className='d-block site-links text-truncate' to={'/business-brokers'}>
              Find a Broker
            </Link>
            <Link className='d-block site-links text-truncate' to={'/auth/registration/broker'}>
              Join BrokerWorks
            </Link>
            {!userData && (
              <Link className='d-block site-links text-truncate' to={'/auth/login'}>
                Log In
              </Link>
            )}
          </div>
          <div className='col-md-4 pt-2'>
            <div className='col-12'>
              <Link to='/search-businesses-for-sale' className='title-heading py-1'>
                Buy a Business
              </Link>
              {!isListingLoader ? (
                <>
                  {allListings?.map((item, index) => (
                    <div className='col-md-12 pt-2' key={index}>
                      <Link
                        to='/search-businesses-for-sale'
                        className='d-block site-links text-truncate'
                        onClick={() => {
                          localStorage.setItem(
                            'listingsID',
                            JSON.stringify({
                              listingsID: item?.id ? [item?.id] : [],
                            })
                          )

                          localStorage.setItem('listingName', JSON.stringify([item]))
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <div className='col-12'>
                  <div
                    className='d-flex justify-content-center align-items-center'
                    style={{height: '20vh'}}
                  >
                    <div>
                      <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='row mb-5'>
          <div className='col-md-4'>
            <Link to='/how-to-sell-a-business' className='title-heading py-1'>
              Buyer's Resources
            </Link>

            <>
              <div className='col-md-12 pt-2'>
                <Link to='/sell-a-business' className='d-block site-links text-truncate'>
                  Understand Your Buying Options
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link
                  to='/stepper/prepare-for-your-exit'
                  className='d-block site-links text-truncate'
                >
                  Finding the Right Business
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link
                  to='/stepper/set-an-asking-price'
                  className='d-block site-links text-truncate'
                >
                  Making an Offer
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link to='/stepper/attract-buyers' className='d-block site-links text-truncate'>
                  Financing Your Business
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link to='/stepper/finalize-the-deal' className='d-block site-links text-truncate'>
                  Purchase
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link to='/stepper/finalize-the-deal' className='d-block site-links text-truncate'>
                  Closing a Business
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link
                  to='/learning-center/seller-articles'
                  className='d-block site-links text-truncate'
                >
                  Acquisition
                </Link>
              </div>
            </>
          </div>
          <div className='col-md-4'>
            <Link to='/sell-a-business' className='title-heading py-1'>
              Sell Your Business
            </Link>

            <>
              <div className='col-md-12 pt-2'>
                <Link to='/how-to-sell-a-business' className='d-block site-links text-truncate'>
                  Business Seller Resources
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link
                  to='/stepper/prepare-for-your-exit'
                  className='d-block site-links text-truncate'
                >
                  Preparing to Exit Your Business
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link
                  to='/stepper/set-an-asking-price'
                  className='d-block site-links text-truncate'
                >
                  Setting an Asking Price
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link to='/stepper/attract-buyers' className='d-block site-links text-truncate'>
                  Finding Business Buyers
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link
                  to='/stepper/negotiating-strategies'
                  className='d-block site-links text-truncate'
                >
                  Negotiating Strategies
                </Link>
              </div>
              <div className='col-md-12 pt-2'>
                <Link to='/stepper/finalize-the-deal' className='d-block site-links text-truncate'>
                  Finalizing the Sale
                </Link>
              </div>
            </>
          </div>
        </div>
        <div className='row mt-1'>
          <div className='col-12'>
            <Link to='/search-businesses-for-sale' className='title-heading py-1'>
              Businesses For Sale Categories
            </Link>
          </div>
          {!isIndustryLoader ? (
            <>
              {allIndustries?.map((item, index) => (
                <div className='col-md-4 pt-2' key={index}>
                  <Link
                    to='/search-businesses-for-sale'
                    className='d-block site-links text-truncate'
                    onClick={() => {
                      localStorage.setItem(
                        'industriesID',
                        JSON.stringify({
                          industriesID: item?.id ? [item?.id] : [],
                        })
                      )

                      localStorage.setItem('industriesName', JSON.stringify([item]))
                    }}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div className='col-12'>
              <div
                className='d-flex justify-content-center align-items-center'
                style={{height: '20vh'}}
              >
                <div>
                  <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='row mt-8'>
          <div className='col-12'>
            <Link to='/search-franchises' className='title-heading py-1'>
              Find a Franchise
            </Link>
          </div>
          {!isFranchiseLoader ? (
            <>
              {' '}
              {allFranchises?.map((item, index) => (
                <div className='col-md-4 pt-2' key={index}>
                  <Link
                    to='/search-franchises'
                    className='d-block site-links text-truncate'
                    onClick={() => {
                      localStorage.setItem(
                        'franchisesID',
                        JSON.stringify({
                          franchisesID: item?.id ? [item?.id] : [],
                        })
                      )
                      localStorage.setItem('franchiseListingName', JSON.stringify([item]))
                    }}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div className='col-12'>
              <div
                className='d-flex justify-content-center align-items-center'
                style={{height: '20vh'}}
              >
                <div>
                  <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='row mt-8'>
          <div className='col-12'>
            <Link to='/search-businesses-for-sale' className='title-heading py-1'>
              Popular Businesses For Sale Categories
            </Link>
          </div>
          {!IsHomeLoader ? (
            <>
              {' '}
              {papularIndustry?.map(
                (item, index) =>
                  index < 11 && (
                    <div className='col-md-4 pt-2' key={index}>
                      <Link
                        to='/search-businesses-for-sale'
                        className='d-block site-links text-truncate'
                        onClick={() => {
                          localStorage.setItem(
                            'industriesID',
                            JSON.stringify({
                              industriesID: item?.id ? [item?.id] : [],
                            })
                          )

                          localStorage.setItem('industriesName', JSON.stringify([item]))
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  )
              )}
            </>
          ) : (
            <div className='col-12'>
              <div
                className='d-flex justify-content-center align-items-center'
                style={{height: '20vh'}}
              >
                <div>
                  <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SiteMap
