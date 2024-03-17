import React, {useEffect, useState} from 'react'
import ContactForm from './ContactForm'
import Detail from './Detail'
import {useParams, useLocation} from 'react-router-dom'
import {getSingleBusiness} from '../../../services/forSearchBusiness/Index'
import MainScreenLoader from '../../../../assets/Loader/MainScreenLoader.gif'
import SimilarListings from './SimilarListings'

const MyBusiness = () => {
  const [showSingleBusinessData, setShowSingleBusinessData] = useState(false)
  const [singleBusinessData, setSingleBusinessData] = useState([])
  const [similarBusiness, setSimilarBusiness] = useState([])
  const [subscription, setSubscription] = useState([])

  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const {id} = useParams()
  useEffect(() => {
    setShowSingleBusinessData(false)

    getSingleBusinessData()
  }, [id])

  const getSingleBusinessData = async () => {
    let singleBusinessArray = []
    let similarBusinessArray = []

    try {
      const result = await getSingleBusiness(id, accessToken)
      if (result.status === true) {
        singleBusinessArray.push(result.business)
        similarBusinessArray.push(result.samilerBusiness)
        setSingleBusinessData(singleBusinessArray)
        setSimilarBusiness(similarBusinessArray)
        setSubscription(result?.subscription)

        if (singleBusinessArray.length > 0) {
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
            <div className='row pb-7'>
              <div className={`col-12`}>
                <Detail data={singleBusinessData} subscription={subscription} />
              </div>
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

export default MyBusiness
