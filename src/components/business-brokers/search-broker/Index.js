import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
//
import {baseURL} from '../../services/BaseURL'
import Add from './Add'
import BrokerDetails from './BrokerDetails'
import TopBar from '../TopBar/TopBar'
import Pagination from '../../../common component/Pagination'
import {getFilteredData} from '../../services/broker-services/Index'
//
import {getBizOwnerAdds} from '../../services/advertisement/Add'

import MainScreenLoader from '../../../../src/assets/Loader/MainScreenLoader.gif'
import imageIcon from '../../../assets/icons/add.png'
const Index = (props) => {
  const {pathname} = useLocation()

  const [forBrokerData, setForBrokerData] = useState([])
  const [loader, setLoader] = useState(false)
  const [showPerPage, setShowPerPage] = useState(8)
  const [isShowModal, setIsShowModal] = useState(false)
  const [midScreenAdd, setMidScreenAdd] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [lastPage, setLastPage] = useState([])
  const [totalRecord, setTotalRecord] = useState('')
  //
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const localStorageCityID = localStorage.getItem('brokerCityID')
  const cityID = JSON?.parse(localStorageCityID)
  const localStorageCountryID = localStorage.getItem('brokerCountryID')
  const countryID = JSON?.parse(localStorageCountryID)
  const localStorageStateID = localStorage.getItem('brokerStateID')
  const stateID = JSON?.parse(localStorageStateID)
  const tag = localStorage.getItem('brokerKeyword')
  const brokerMoreFilter = localStorage.getItem('brokerMoreFilters')
  const MoreFilter = JSON?.parse(brokerMoreFilter)
  let filterData = []

  let pageCount = lastPage
  const [sideBarAdd, setSideBarAdd] = useState('')
  useEffect(() => {
    getAdds()
  }, [])
  const getAdds = async () => {
    const result = await getBizOwnerAdds()

    if (result.status == true) {
      result?.advertise?.data?.map((item) => {
        if (item?.location == 'sidebar') {
          setSideBarAdd(item?.advertise)
        }
      })
    }
  }
  useEffect(() => {
    getBrokerSearch()
    getForSearchBusinessData(1)
  }, [])
  useEffect(() => {}, [pathname])
  const getBrokerSearch = async (accessToken) => {
    const response = await fetch(`${baseURL}/get-advertise`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })

    const result = await response.json()

    result?.advertise?.data?.map((item) => {
      if (item?.location == 'middle') {
        setMidScreenAdd(item?.advertise)
      }
    })
  }

  const getFilterData = async (filterResultData, page) => {
    // setLoader(false)
    getForSearchBusinessData(page)
  }

  const getForSearchBusinessData = async (page) => {
    setLoader(false)

    const keyword = localStorage.getItem('brokerKeyword')
    const brokerFilter = localStorage.getItem('brokerMoreFilters')

    const localStorageCityID = localStorage.getItem('brokerCityID')
    const cityID = JSON?.parse(localStorageCityID)

    const localStorageCountryID = localStorage.getItem('brokerCountryID')
    const countryID = JSON?.parse(localStorageCountryID)

    const localStorageStateID = localStorage.getItem('brokerStateID')
    const stateID = JSON?.parse(localStorageStateID)
    let businessData = []
    try {
      const result = await getFilteredData(
        page,
        cityID,
        countryID,
        stateID,
        keyword,
        brokerFilter,
        accessToken
      )

      if (result?.status === true) {
        console.log(result)
        setLoader(true)
        setForBrokerData([])
        setCurrentPage(result?.users?.current_page)
        setLastPage(result?.users?.last_page)
        setTotalRecord(result?.users?.total)
        result?.users?.data?.map((item, index) => {
          businessData.push({
            id: item.id,
            title: item.title,
            firstName: item?.first_name,
            lastName: item?.last_name,
            location: item.location?.country
              ? item.location?.country
              : item.location?.formatted_address,

            service_offered: item?.broker_detail?.service_offered,
            company_name: item?.broker_detail?.company_name,
            description: item?.broker_detail?.about_personal,
            licenses: item?.broker_detail?.licenses,
            img: item?.profile_image?.full_path + 'thumb/' + item?.profile_image?.file_name,
            slug: item.slug,
            memberShipImgs: item.membershipe_description,
            certiFication: item.certification_description,
            // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
            imgId: 'bizOwner' + item.id + 'imgId',
          })
        })

        setForBrokerData(businessData)

        if (businessData?.length > 0) {
          setLoader(true)
        }
      }
    } catch (err) {
      console.log('search broker page err', err)
    }
  }
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getForSearchBusinessData(page)
  }

  const cityName = cityID?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })
  const countryName = countryID?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })
  const stateName = stateID?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })

  ////////////////
  return (
    <>
      <div style={{backgroundColor: '#081C3D'}}>
        <div className='container'>
          <TopBar getFilterData={getFilterData} page={pageCount} />
        </div>
      </div>

      <div className='container'>
        {loader ? (
          <div className='row'>
            <div className='col-lg-9'>
              {(countryName?.length > 0 ||
                stateName?.length > 0 ||
                cityName?.length > 0 ||
                tag?.length > 0 ||
                MoreFilter?.length > 0) &&
                loader && (
                  <>
                    {totalRecord > 0 ? (
                      <div className='container justify-content-center pt-5'>
                        <div className='row p-3 rounded' style={{backgroundColor: '#eff4f5'}}>
                          <div className='col-12'>
                            <b>{totalRecord}</b> <span> records found</span>
                            {!countryName?.length > 1 &&
                              !stateName?.length > 1 &&
                              !cityName?.length > 1 && (
                                <b style={{color: 'rgb(8, 28, 61)'}}> Any </b>
                              )}
                            {(countryName?.length > 0 ||
                              stateName?.length > 0 ||
                              cityName?.length > 0) &&
                              ' from locations:'}
                            {countryName?.length > 0 && <span>Country: {countryName} </span>}
                            {stateName?.length > 0 && <span>State:{stateName} </span>}
                            {cityName?.length > 0 && <span>City: {cityName}</span>}
                            {tag?.length > 0 && (
                              <>
                                <span>in tag: </span>
                                <b style={{color: 'rgb(8, 28, 61)'}}>{tag}</b>
                              </>
                            )}
                            {MoreFilter?.length > 0 && (
                              <>
                                <span> More Filters: </span>
                                <b style={{color: 'rgb(8, 28, 61)'}}>
                                  {MoreFilter?.map((item, index) => (
                                    <b className='mx-2' key={index}>
                                      {item?.name}
                                    </b>
                                  ))}
                                </b>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='container justify-content-center pt-5'>
                        <div className='row '>
                          <div
                            className='col-12 p-3 py-5 rounded'
                            style={{backgroundColor: '#eff4f5'}}
                          >
                            <h4>
                              Sorry, but there are no brokers matching your search criteria Please
                              start a new search and expand your search criteria.
                            </h4>

                            <li className='pt-5'>
                              Modify your search criteria to broaden your results or clear your
                              filters.
                            </li>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

              {forBrokerData?.length > 0 ? (
                forBrokerData?.map((postData, index) => (
                  <>
                    <div className=' my-5 ms-2 ' key={index}>
                      <div className='' key={index + 1}>
                        <div className=' ' key={index + 3}>
                          <BrokerDetails
                            postData={postData}
                            id={postData?.id}
                            title={postData?.title}
                            firstName={postData?.firstName}
                            lastName={postData?.lastName}
                            dec={postData?.description}
                            location={postData?.location}
                            service_offered={postData?.service_offered}
                            company_name={postData?.company_name}
                            licenses={postData?.licenses}
                            img={postData?.img}
                            fullIndex={postData}
                            slug={postData?.slug}
                            memberShipImgs={postData?.memberShipImgs}
                            certiFication={postData?.certiFication}
                          />
                        </div>
                        {index == 5 ? (
                          <div className='col-12 px-0 my-4 px-0 '>
                            {midScreenAdd != '' && midScreenAdd != undefined ? (
                              <img
                                src={midScreenAdd}
                                className='img-fluid w-100 px-0'
                                alt=''
                                style={{height: '80px'}}
                              />
                            ) : (
                              <img src={imageIcon} className='img-fluid w-100 px-0' alt='' />
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div
                  className='d-flex  justify-content-center  align-items-center'
                  style={{height: '100vh', width: '100%'}}
                >
                  <div>
                    <h1>RECORD NOT FOUND</h1>
                  </div>
                </div>
              )}
            </div>

            <div className='col-3 d-none d-none d-lg-block px-0'>
              <Add my={'my-5'} sideBarAdd={sideBarAdd} />
            </div>
          </div>
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '90vh', width: '100%'}}
          >
            <div>
              <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
            </div>
          </div>
        )}
        <div className='my-9'>
          {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
        </div>
      </div>
    </>
  )
}

export default Index
