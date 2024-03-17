import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getSingleBroker} from '../../services/broker-services/Index'
import Detail from './Detail'
// import SimilarBrokers from './SimilarBrokers'
import ContactForm from './ContactForm'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {getSellerProfile} from '../../services/seller-profile'

const SellerInnerScreen = () => {
  const [showSingleBusinessData, setShowSingleBusinessData] = useState(false)
  const [singleBusinessData, setSingleBusinessData] = useState([])
  const [saleBusiness, setSaleBusiness] = useState([])
  const [similarBusiness, setSimilarBusiness] = useState([])
  const [soldBusiness, setSoldBusiness] = useState([])
  const [soldFranchise, setSoldFranchise] = useState([])
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {id} = useParams()
  useEffect(() => {
    setShowSingleBusinessData(false)
    getSingleBusinessData()
  }, [id])

  const getSingleBusinessData = async () => {
    let singleBrokerArray = []
    let similarBrokerArray = []
    let saleBusinessArray = []
    let soldBusinessArray = []
    let soldFranchiseArray = []

    try {
      const result = await getSellerProfile(id, accessToken)

      if (result.status === true) {
        console.log(result)
        singleBrokerArray.push(result?.users)
        similarBrokerArray.push(result)
        saleBusinessArray.push(result)
        soldBusinessArray.push(result?.soldbusiness)
        soldFranchiseArray.push(result?.soldFranchise)

        setSingleBusinessData(singleBrokerArray)
        setSimilarBusiness(similarBrokerArray)
        setSaleBusiness(saleBusinessArray)
        setSoldBusiness(soldBusinessArray)
        setSoldFranchise(soldFranchiseArray)

        if (singleBrokerArray.length > 0) {
          // singleBusinessData.push(true)
          setShowSingleBusinessData(true)
        }
      }
    } catch (err) {
      console.log('etBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  return (
    <>
      {showSingleBusinessData ? (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8'>
                <Detail
                  data={singleBusinessData}
                  saleBusiness={saleBusiness}
                  soldBusiness={soldBusiness}
                  soldFranchise={soldFranchise}
                />
              </div>
              <div className='col-sm-8 col-lg-4 px-0 px-md-3  mx-auto' style={{marginTop: '2px'}}>
                <ContactForm data={singleBusinessData} />
              </div>
            </div>
          </div>
          {/* {similarBusiness?.length > 0 ? (
            <div className=' px-md-10 ' style={{boxShadow: '0px 0px 8px rgb(0 0 0 / 5%)'}}>
              <SimilarBrokers data={similarBusiness} />
            </div>
          ) : null} */}
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

export default SellerInnerScreen
