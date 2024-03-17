import React, {useEffect, useState} from 'react'
import {BsHeart, BsSearch} from 'react-icons/bs'
import {FaEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import '../../components/BuyBizzOwner.css'
import ListingRecord from './Components/ListingRecord'

import active from '../../assets/Dashboard/active.svg'
import deActive from '../../assets/Dashboard/deActive.svg'

import totalIcon from '../../assets/Dashboard/total.svg'
import ListingBox from './Components/ListingBox'
import locationIcon from '../../assets/icons/location.svg'
import packageIcon from '../../assets/Dashboard/elite.svg'
import {getBrokerDashboard} from '../services/dashboard-services'
import RecommendedBrokers from './Components/RecommendedBrokers'
import RecommendedBusinesses from './Components/RecommendedBusinesses'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
function BrokerDashBoard() {
  const tokenData = localStorage.getItem('userData')
  const [brokersDetail, setBrokersDetail] = useState([])
  const [loader, setLoader] = useState(false)
  const transformTokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transformTokenData
  useEffect(() => {
    getAllBrokerDashboard()
  }, [])

  const getAllBrokerDashboard = async () => {
    const result = await getBrokerDashboard(accessToken)
    if (result?.status == true) {
      console.log('result', result)
      setBrokersDetail(result)
      setLoader(true)
    }
  }
  return (
    <>
      {loader ? (
        <div className='mx-md-8'>
          <div className='col-12'>
            <h3>{brokersDetail?.user?.first_name + ' ' + brokersDetail?.user?.last_name ?? ''}</h3>
            <div className='d-flex'>
              {brokersDetail?.user?.location !== '' &&
                brokersDetail?.user?.location !== undefined &&
                brokersDetail?.user?.location !== null &&
                brokersDetail?.user?.location?.formatted_address !== '' &&
                brokersDetail?.user?.location?.formatted_address !== undefined &&
                brokersDetail?.user?.location?.formatted_address !== null && (
                  <img src={locationIcon} alt='' className='mb-4' />
                )}
              <p className='ps-2'>{brokersDetail?.user?.location?.formatted_address}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <div className='listing-box-broker my-3 px-4 px-md-8 w-100'>
                <div className='row h-100'>
                  <div className='col-md-12 my-auto'>
                    <p className='listing-inner-heading d-flex align-items-center justify-content-center'>
                      Current Profile Subscription
                    </p>
                    <p className='text-primary package-heading d-flex align-items-center justify-content-center '>
                      {brokersDetail?.subscription?.name !== '' &&
                        brokersDetail?.subscription?.name !== null &&
                        brokersDetail?.subscription?.name !== undefined && (
                          <span>
                            <img src={packageIcon} alt='' className='package-icon' />
                          </span>
                        )}
                      <span className='text-truncate'>{brokersDetail?.subscription?.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <div className='row'>
                <div className='col-6'>
                  <ListingBox title={'Sold Businesses'} number={brokersDetail?.totalSoldBusiness} />
                </div>
                <div className='col-6'>
                  <ListingBox
                    title={'Sold Franchises'}
                    number={brokersDetail?.totalSoldFranchise}
                  />
                </div>
                <div className='col-6'>
                  <ListingBox
                    title={'My Saved Searches'}
                    number={brokersDetail?.totalSearcheSave}
                  />
                </div>
                <div className='col-6'>
                  <ListingBox title={'My Saved Listings'} number={brokersDetail?.mySaveListing} />
                </div>
              </div>
            </div>
          </div>

          {/* <RecommendedBusinesses similarBusinesses={brokersDetail?.samilerBusiness} /> */}
          <ListingRecord
            title={'Total Listings'}
            AssetsValue={brokersDetail?.assestBusiness}
            FranchisesValue={brokersDetail?.totalfranchise}
            businessesValue={brokersDetail?.totalbusiness}
            img={totalIcon}
            imgType={'total'}
          />
          <ListingRecord
            title={'Active '}
            AssetsValue={brokersDetail?.totalActiveAssestBusiness}
            FranchisesValue={brokersDetail?.totalActiveFranchise}
            businessesValue={brokersDetail?.totalActiveBusiness}
            img={active}
            imgType={'active'}
          />
          <ListingRecord
            title={'Deactive '}
            AssetsValue={brokersDetail?.totalDeactiveAssestBusiness}
            FranchisesValue={brokersDetail?.totaldeactiveFranchise}
            businessesValue={brokersDetail?.totalDeactiveBusiness}
            img={deActive}
            imgType={'deactive'}
          />
          <br />
          <br />
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '70vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </>
  )
}

export default BrokerDashBoard
