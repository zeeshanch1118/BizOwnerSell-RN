import React, {useEffect, useState} from 'react'
import {BsHeart, BsSearch} from 'react-icons/bs'
import {FaEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import '../../components/BuyBizzOwner.css'
import ListingRecord from './Components/ListingRecord'
import RecommendedBrokers from './Components/RecommendedBrokers'
import active from '../../assets/Dashboard/active.svg'
import deActive from '../../assets/Dashboard/deActive.svg'
import totalIcon from '../../assets/Dashboard/total.svg'
import ListingBox from './Components/ListingBox'
import locationIcon from '../../assets/icons/location.svg'
import packageIcon from '../../assets/Dashboard/elite.svg'
import {getUserDashboard} from '../services/dashboard-services'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
function UserDashBoard() {
  const tokenData = localStorage.getItem('userData')
  const transformTokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transformTokenData
  const [loader, setLoader] = useState(false)
  const [usersData, setUsersData] = useState([])
  useEffect(() => {
    getAllUserDashboard()
  }, [])

  const getAllUserDashboard = async () => {
    const result = await getUserDashboard(accessToken)
    console.log('ss', result)
    if (result.status == true) {
      setLoader(true)
      setUsersData(result)
    }
  }

  return (
    <>
      {loader ? (
        <div className='mx-md-8'>
          <div className='col-12'>
            <h3>{usersData?.user?.first_name + ' ' + usersData?.user?.last_name ?? ''}</h3>
            <div className='d-flex'>
              {usersData?.user?.location !== '' &&
                usersData?.user?.location !== undefined &&
                usersData?.user?.location !== null &&
                usersData?.user?.location?.formatted_address !== null &&
                usersData?.user?.location?.formatted_address != '' &&
                usersData?.user?.location?.formatted_address !== undefined && (
                  <img src={locationIcon} alt='' className='mb-4' />
                )}
              <p className='ps-2'>{usersData?.user?.location?.formatted_address}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='row'>
                <div className='col-6'>
                  <ListingBox title={'Sold Businesses'} number={usersData?.totalSoldBusiness} />
                </div>
                <div className='col-6'>
                  <ListingBox title={'Sold Franchises'} number={usersData?.totalSoldFranchise} />
                </div>
                <div className='col-6'>
                  <ListingBox title={'My Saved Searches'} number={usersData?.totalSearcheSave} />
                </div>
                <div className='col-6'>
                  <ListingBox title={'My Saved Listings'} number={usersData?.mySaveListing} />
                </div>
              </div>
            </div>
          </div>

          {/* <RecommendedBrokers similarBroker={usersData?.samilerBroker} /> */}
          <ListingRecord
            title={'Total Listings'}
            AssetsValue={usersData?.assestBusiness}
            FranchisesValue={usersData?.totalfranchise}
            businessesValue={usersData?.totalbusiness}
            img={totalIcon}
            imgType={'total'}
          />
          <ListingRecord
            title={'Active '}
            AssetsValue={usersData?.totalActiveAssestBusiness}
            FranchisesValue={usersData?.totalActiveFranchise}
            businessesValue={usersData?.totalActiveBusiness}
            img={active}
            imgType={'active'}
          />
          <ListingRecord
            title={'Deactive '}
            AssetsValue={usersData?.totalDeactiveAssestBusiness}
            FranchisesValue={usersData?.totaldeactiveFranchise}
            businessesValue={usersData?.totalDeactiveBusiness}
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

export default UserDashBoard
