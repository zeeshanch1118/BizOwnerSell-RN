import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
// import './style.css'

import {getBrokerSearch, saveBrokerSearch} from '../../services/broker-services/Index'
import Sale from '../../../assets/landing-bg/sale.svg'

const BrowseBroker = () => {
  const [country, setCountry] = useState([])
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getSaveBrokerSearch()
  }, [])

  const getSaveBrokerSearch = async () => {
    try {
      setLoader(true)
      const result = await getBrokerSearch()

      if (result.status === true) {
        // setLoader(false)
        setCountry(result?.country)
      }
    } catch (err) {
      setLoader(false)
      console.log('getSaveBrokerSearch err', err)
    }
  }
  const filterDataByCountry = async (e, country) => {
    localStorage.removeItem('brokerLocationFilter')
    localStorage.removeItem('brokerKeyword')
    localStorage.removeItem('brokerMoreFilters')
    localStorage.removeItem('brokerKeyword')
    let location = {locationValue: [{id: country, name: country}]}
    let countryId = [country]
    await localStorage.setItem('brokerLocationFilter', JSON.stringify(location))
    await localStorage.setItem('brokerCountryID', JSON.stringify(countryId))
    // console.log('resultresult', result)
    navigate('/search-for-broker')
  }

  return (
    <>
      {loader ? (
        country?.length > 0 ? (
          <div className='container mt-10 locations-font text-start'>
            <div className='row g-1 py-5'>
              <h1 className='fw-normal  border-bottom border-primary pb-1 d-flex align-items-center '>
                <img className='me-2' src={Sale} style={{height: 'fit-content'}} />
                <span className=' listing-heading'>
                  Browse Brokers By <br className='d-block d-md-none ' />
                  <span className='family-font' style={{color: '#081C3D', fontWeight: '700'}}>
                    State/Region
                  </span>
                </span>
              </h1>
              {country?.length > 0 ? (
                <div className='d-flex flex-wrap  mt-5' style={{columnGap: '30px', rowGap: '15px'}}>
                  {country?.map((item, index) => (
                    <div className='text-color-bizowner text-nowrap ' key={index}>
                      <span
                        className='text-link text-primary cursor-pointer '
                        // to='/search-for-broker'
                        onClick={(e) => filterDataByCountry(e, item?.search)}
                      >
                        {item?.search}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null
      ) : null}
    </>
  )
}

export default BrowseBroker
