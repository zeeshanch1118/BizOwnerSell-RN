import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {soldListing, soldFranchise} from '../../services/broker-services/Index'
import SingleBrokerContact from './SingleBrokerContact'
import SoldListingInner from './SoldListingInner'

const SoldListingScreen = () => {
  const [soldListingData, setSoldListingData] = useState([])
  const {id} = useParams()
  const {slug} = useParams()

  useEffect(() => {
    getSingleSoldListingData()
  }, [id])

  const getSingleSoldListingData = async () => {
    let soldListingArray = []
    if (slug == 'franchise') {
      try {
        const result = await soldFranchise(id)
        console.log('result', result)
        if (result.status === true) {
          soldListingArray.push(result?.franchise)
        }

        setSoldListingData(soldListingArray)
      } catch (err) {
        console.log('etBusinessListingTypes err', err)
        // setErrorModelText(err.response.data.message)
        // setErrorModel(true);
      }
    } else if (slug == 'businesses') {
      try {
        const result = await soldListing(id)
        console.log('result', result)
        if (result.status === true) {
          soldListingArray.push(result?.business)
        }

        setSoldListingData(soldListingArray)
      } catch (err) {
        console.log('etBusinessListingTypes err', err)
        // setErrorModelText(err.response.data.message)
        // setErrorModel(true);
      }
    }
  }
  return (
    <>
      {soldListingData?.length > 0 ? (
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <SoldListingInner data={soldListingData} />
            </div>
            <div className='col-md-4 px-0 px-md-5'>
              <SingleBrokerContact data={soldListingData} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SoldListingScreen
