import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getTopBrokers} from '../../services/broker-services/Index'
import BrowseBroker from '../browseBrokers/BrowseBroker'
import Hero from '../Hero-section/Hero'
import WhyUseBroker from '../Hero-section/Side-bar-content/WhyUseBroker'
import TopBar from '../TopBar/TopBar'
import MainLoader from '../../../assets/Loader/MainScreenLoader.gif'
import TopBrokers from '../top-broker/TopBrokers'

const Index = () => {
  const [topBroker, setTopBroker] = useState([])
  const [loader, setLoader] = useState(false)
  const {id} = useParams()
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  useEffect(() => {
    getTopBroker()
  }, [id])

  const getTopBroker = async (filterResultData) => {
    setLoader(true)
    try {
      const result = await getTopBrokers(accessToken)
      if (result.status == true) {
        setTopBroker(result?.topbroker)

        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  return (
    <>
      {loader ? (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '100vh', width: '100%'}}
        >
          <img src={MainLoader} alt='BizOwnerSell' width='80' height='80' />
        </div>
      ) : (
        <>
          <div style={{backgroundColor: '#081C3D'}}>
            <div className='container'>
              <TopBar />
            </div>
          </div>

          <div className='container py-5'>
            {topBroker?.length > 0 ? (
              <div className='row mt-md-10'>
                <TopBrokers topBroker={topBroker} />
              </div>
            ) : null}

            <div className='row mt-10'>
              <div className='col-md-8 ps-0'>
                <Hero />
              </div>
              <div className='col-md-4'>
                <WhyUseBroker />
              </div>
              <div className='col-12 mb-3'>
                <BrowseBroker />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Index
