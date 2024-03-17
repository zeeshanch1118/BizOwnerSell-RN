import React, {useState, useEffect} from 'react'
import {BsHeart, BsSearch} from 'react-icons/bs'
import {FaEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import '../../components/BuyBizzOwner.css'
// import './dashboard.css'
import {getAdminDashboard} from '../services/dashboard-services'
import AdminStatistics from './Components/AdminStatistics'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
function AdminDashBoard() {
  const tokenData = localStorage.getItem('userData')
  const transformTokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transformTokenData
  const [adminsData, setAdminsData] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    getAllAdminDashboard()
  }, [])

  const getAllAdminDashboard = async () => {
    const result = await getAdminDashboard(accessToken)
    if (result.status == true) {
      setLoader(true)
      setAdminsData(result)
    }
  }
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'
    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num < 900) {
      return num
    }
  }
  return (
    <div className='px-md-5'>
      {loader ? (
        <div className='row g-3 justify-content-between mb-5'>
          <AdminStatistics
            title='Users (seller/buyer)'
            active={adminsData?.totalActiveUser ?? '0'}
            deactive={adminsData?.totalInactiveUser ?? '0'}
            total={adminsData?.totalUser ?? '0'}
          />
          <AdminStatistics
            title='Users (broker)'
            active={adminsData?.totalActiveBroker ?? '0'}
            deactive={adminsData?.totalInactiveBroker ?? '0'}
            total={adminsData?.totalBrokerUser ?? '0'}
          />
          <AdminStatistics
            title=' Listings (business)'
            active={adminsData?.totalActiveBusiness ?? '0'}
            deactive={adminsData?.totalDeactiveBusiness ?? '0'}
            total={adminsData.totalBusiness ?? '0'}
          />
          <AdminStatistics
            title='  Listings (franchise)'
            active={adminsData?.totalActiveFranchise ?? '0'}
            deactive={adminsData?.totalDeactiveFranchise ?? '0'}
            total={adminsData.totalfranchise ?? '0'}
          />
          <AdminStatistics
            title={'Offers'}
            active={adminsData?.activePackgeCoupone ?? '0'}
            deactive={adminsData?.inActivePackgeCoupone ?? '0'}
            total={adminsData.totalPackageCoupone ?? '0'}
          />
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '70vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashBoard
