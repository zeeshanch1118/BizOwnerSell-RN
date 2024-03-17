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
import {getAgentDashboard} from '../services/dashboard-services'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import AdminStatistics from './Components/AdminStatistics'
function BrokerDashBoard() {
  const tokenData = localStorage.getItem('userData')
  const [agentsDetail, setAgentsDetail] = useState([])
  const [loader, setLoader] = useState(false)
  const transformTokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transformTokenData
  useEffect(() => {
    getAgentsDashboard()
  }, [])

  const getAgentsDashboard = async () => {
    const result = await getAgentDashboard(accessToken)
    if (result?.status == true) {
      setAgentsDetail(result)
      setLoader(true)
    }
  }
  return (
    <>
      {loader ? (
        <div className='mx-md-8'>
          {console.log('agentsDetail', agentsDetail)}
          <div className='row'>
            <div className='col-md-4'>
              <h5 className='mb-1'>Welcome</h5>
              <h1 className='mb-1'>
                {agentsDetail?.user?.first_name + ' ' + agentsDetail?.user?.last_name ?? ''}
              </h1>
              <div className='mb-1'>
                <p className='text-muted mb-1'>
                  Agent of {agentsDetail.broke.first_name} {agentsDetail.broke.last_name} (
                  {agentsDetail.broke.company_name})
                </p>
              </div>
              <div className='d-flex'>
                {agentsDetail?.user?.location !== '' &&
                  agentsDetail?.user?.location !== undefined &&
                  agentsDetail?.user?.location !== null &&
                  agentsDetail?.user?.location?.formatted_address !== '' &&
                  agentsDetail?.user?.location?.formatted_address !== undefined &&
                  agentsDetail?.user?.location?.formatted_address !== null && (
                    <img src={locationIcon} alt='' className='mb-4' />
                  )}
                <p className='ps-2 text-muted'>{agentsDetail?.user?.location?.formatted_address}</p>
              </div>
            </div>
            <div className='col-md-8'>
              <div className=' px-5 py-6 total-listing-section border-primary border border-top-0 border-bottom-0 border-right-0 border-left-5'>
                <div className='d-flex justify-content-between pb-1 border border-gray border-top-0 border-left-0 border-right-0 border-bottom-2'>
                  <h3 className='mt-1 mb-0'>Allow Listings</h3>
                  <p className='bg-primary d-inline-block py-1 px-4 rounded mb-0 text-light'>
                    {agentsDetail?.subscription?.subscription_feature_value[0]?.total_value}
                  </p>
                </div>
                <div className='row justify-content-between py-5'>
                  <div className='col-md-6 col-12 listing-section-border d-flex justify-content-between '>
                    <p className='listing-inner-heading mb-0'>Used</p>
                    <p className='listing-numbers text-primary me-7 mb-0'>
                      <p>{agentsDetail?.used}</p>
                    </p>
                  </div>
                  <div className='col-md-6 col-12 d-flex justify-content-between '>
                    <p className='listing-inner-heading mb-0'>Available</p>
                    <p className='listing-numbers text-primary me-7 mb-0'>
                      {agentsDetail?.subscription.subscription_feature_value[0]?.total_value -
                        (agentsDetail?.subscription.subscription_feature_value[0]?.total_value -
                          agentsDetail?.subscription?.subscription_feature_value[0]?.value)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <RecommendedBusinesses similarBusinesses={agentsDetail?.samilerBusiness} /> */}
          <ListingRecord
            title={'Total Listings'}
            AssetsValue={agentsDetail?.assestBusiness}
            FranchisesValue={agentsDetail?.totalfranchise}
            businessesValue={agentsDetail?.totalbusiness}
            img={totalIcon}
            imgType={'total'}
          />
          <ListingRecord
            title={'Active '}
            AssetsValue={agentsDetail?.totalActiveAssestBusiness}
            FranchisesValue={agentsDetail?.totalActiveFranchise}
            businessesValue={agentsDetail?.totalActiveBusiness}
            img={active}
            imgType={'active'}
          />
          <ListingRecord
            title={'Deactive '}
            AssetsValue={agentsDetail?.totalDeactiveAssestBusiness}
            FranchisesValue={agentsDetail?.totaldeactiveFranchise}
            businessesValue={agentsDetail?.totalDeactiveBusiness}
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
