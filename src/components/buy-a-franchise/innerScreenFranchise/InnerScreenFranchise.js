import React, {useEffect, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {getSingleFranchise} from '../../services/buy-a-franchises'
import ContactFormFranchise from './ContactFormFranchise'
import DetailFranchise from './DetailFranchise'

import SimilarListingsFranchise from './SimilarListingsFranchise'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'

const InnerScreenFranchise = () => {
  const [showSingleBusinessData, setShowSingleBusinessData] = useState(false)
  const [singleBusinessData, setSingleBusinessData] = useState([])
  const [similarFranchise, setSimilarFranchise] = useState([])
  const {franchiseID} = useParams()
  const {pathname} = useLocation()
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData

  useEffect(() => {
    setShowSingleBusinessData(false)

    getSingleBusinessData()
  }, [franchiseID, pathname])

  const getSingleBusinessData = async () => {
    let singleFranchiseArray = []
    let similarFranchiseArray = []

    try {
      const result = await getSingleFranchise(franchiseID, accessToken)

      if (result.status === true) {
        singleFranchiseArray.push(result.franchise)
        similarFranchiseArray.push(result.samilerFranchise)
        setSingleBusinessData(singleFranchiseArray)
        setSimilarFranchise(similarFranchiseArray)
        if (singleFranchiseArray.length > 0) {
          singleBusinessData.push(true)
          setShowSingleBusinessData(true)
        }
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  return (
    <>
      {showSingleBusinessData ? (
        <>
          <div className='container pb-7'>
            <div className='row'>
              <div className={`${role == 'admin' ? 'col-12' : 'col-lg-8'}`}>
                <DetailFranchise data={singleBusinessData} />
              </div>
              {role !== 'admin' && (
                <div className='col-lg-4 px-0 px-md-2 ' style={{marginTop: '2px'}}>
                  <ContactFormFranchise data={singleBusinessData} />
                </div>
              )}
            </div>
          </div>
          {role !== 'admin' && similarFranchise?.length > 0 ? (
            <div className='px-0'>
              <SimilarListingsFranchise data={similarFranchise} />
            </div>
          ) : null}
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

export default InnerScreenFranchise
