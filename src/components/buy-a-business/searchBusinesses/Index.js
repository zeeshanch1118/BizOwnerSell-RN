import React, {useEffect, useState} from 'react'
import {GrFormNext, GrFormPrevious, GrNext} from 'react-icons/gr'
import {Modal} from 'react-bootstrap'
import {baseURL} from '../../services/BaseURL'

import {Link, useLocation} from 'react-router-dom'
import {getFilteredData} from '../../services/forSearchBusiness/Index'
import PopularIndustries from './PopularIndustries'
import Pagination from '../../../common component/Pagination'
import BusinessDetail from './BusinessDetail'
import TopBar from './TopBar/TopBar'
//
import './BusinessDetail.css'
import MainScreenLoader from '../../../../src/assets/Loader/MainScreenLoader.gif'
import imageIcon from '../../../assets/icons/add.png'
import dummyImg from '../../../assets/dummy.jpg'

import Add from './Add'
const Index = (props) => {
  const {pathname} = useLocation()

  const [forBusinessData, setForBusinessData] = useState([])
  const [loader, setLoader] = useState(false)
  const [showPerPage, setShowPerPage] = useState(8)
  const [isShowModal, setIsShowModal] = useState(false)
  const [midScreenAdd, setMidScreenAdd] = useState('')
  const [papularIndustry, setPapularIndustry] = useState('')
  const [currentPage, setcurrentPage] = useState(0)
  const [lastPage, setlastPage] = useState([])
  const [listingType, setListingType] = useState([])
  const [isShowAllTopIndustry, setIsShowAllTopIndustry] = useState(false)

  const [totalRecord, setTotalRecord] = useState(null)
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  let pageCount = lastPage

  let filterData = []

  useEffect(() => {
    getForSearchBusinessData(1)
  }, [pathname])
  useEffect(() => {
    getBrokerSearch()
  }, [])
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
    setIsShowAllTopIndustry(true)
  }

  const getFilterData = async (filterResultData, page) => {
    // setLoader(false)
    getForSearchBusinessData(page)
  }

  const getForSearchBusinessData = async (page) => {
    setLoader(false)

    const localStorageIndustriesID = localStorage.getItem('industriesID')
    const transformedIndustriesID = JSON?.parse(localStorageIndustriesID)
    const {industriesID} = transformedIndustriesID ?? ''

    const localStoragelistingsID = localStorage.getItem('listingsID')
    const transformedlistingsID = JSON?.parse(localStoragelistingsID)
    const {listingsID} = transformedlistingsID ?? ''

    const localStorageMinPrice = localStorage.getItem('minPrice')
    const transformedminPrice = JSON?.parse(localStorageMinPrice)
    const {minPrice} = transformedminPrice ?? ''

    const localStoragemaxPrice = localStorage.getItem('maxPrice')
    const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)
    const {maxPrice} = transformedmaxPrice ?? ''

    const localStorageGrossMaxPrice = localStorage.getItem('grossMaxPrice')
    const transformedGrossMaxPrice = JSON?.parse(localStorageGrossMaxPrice)
    const {grossMaxPrice} = transformedGrossMaxPrice ?? ''

    const localStorageGrossMinPrice = localStorage.getItem('grossMinPrice')
    const transformedGrossMinPrice = JSON?.parse(localStorageGrossMinPrice)
    const {grossMinPrice} = transformedGrossMinPrice ?? ''

    const localStorageCashMaxPrice = localStorage.getItem('cashMaxPrice')
    const transformedCashMaxPrice = JSON?.parse(localStorageCashMaxPrice)
    const {cashMaxPrice} = transformedCashMaxPrice ?? ''

    const localStorageCashMinPrice = localStorage.getItem('cashMinPrice')
    const transformedCashMinPrice = JSON?.parse(localStorageCashMinPrice)
    const {cashMinPrice} = transformedCashMinPrice ?? ''

    const localStoragetag = localStorage.getItem('tag')
    const transformedtag = JSON?.parse(localStoragetag)
    const {tag} = transformedtag ?? ''

    const localStorageAddDate = localStorage.getItem('addDate')
    const transformedAddDate = JSON?.parse(localStorageAddDate)
    const {addDates} = transformedAddDate ?? ''

    const localStorageYear = localStorage.getItem('year')
    const transformedYear = JSON?.parse(localStorageYear)
    const {years} = transformedYear ?? ''
    const localStorageCityID = localStorage.getItem('cityID')
    const cityID = JSON?.parse(localStorageCityID)

    const localStorageCountryID = localStorage.getItem('countryID')
    const countryID = JSON?.parse(localStorageCountryID)

    const localStorageStateID = localStorage.getItem('stateID')
    const stateID = JSON?.parse(localStorageStateID)
    setPapularIndustry(industriesID)
    setListingType(listingsID)
    let businessData = []
    try {
      const result = await getFilteredData(
        page,
        listingsID,
        industriesID,
        minPrice,
        maxPrice,
        grossMinPrice,
        grossMaxPrice,
        cashMinPrice,
        cashMaxPrice,
        tag,
        addDates,
        years,
        cityID,
        countryID,
        stateID,
        accessToken
      )
      if (result.status === true) {
        console.log('result', result)
        setForBusinessData([])
        setLoader(true)
        setcurrentPage(result.businesses.current_page)
        setlastPage(result.businesses.last_page)
        setTotalRecord(result.businesses.total)
        console.log('result.businesses.data', result.businesses.data)
        result.businesses.data.map((item, index) => {
          businessData.push({
            id: item.id,
            title: item.title,
            location: item.location,
            favorite: item.favorite,
            price: item.asking_price,
            cashFlow: item.cash_flow,
            description: item.description,
            img: item?.slider_images,
            slug: item.slug,
            imgId: 'bizOwner' + item.id + 'imgId',
            location_visibitiy: item.location_visibitiy,
            username: item?.user?.username,
            listingType: item?.listing_type,
          })
        })

        setForBusinessData(businessData)

        if (businessData.length > 0) {
          setLoader(true)
        }
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
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
  ////////////////////////
  const localStorageMinPrice = localStorage.getItem('minPrice')
  const transformedminPrice = JSON?.parse(localStorageMinPrice)
  const {minPrice} = transformedminPrice ?? ''
  const localStoragemaxPrice = localStorage.getItem('maxPrice')
  const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)
  const {maxPrice} = transformedmaxPrice ?? ''
  const {grossMaxPrice} = JSON?.parse(localStorage.getItem('grossMaxPrice')) ?? ''
  const {grossMinPrice} = JSON?.parse(localStorage.getItem('grossMinPrice')) ?? ''
  const {addDates} = JSON?.parse(localStorage.getItem('addDates')) ?? ''
  const {years} = JSON?.parse(localStorage.getItem('years')) ?? ''
  const {cashMinPrice} = JSON?.parse(localStorage.getItem('cashMinPrice')) ?? ''
  const {cashMaxPrice} = JSON?.parse(localStorage.getItem('cashMaxPrice')) ?? ''
  const {tag} = JSON?.parse(localStorage.getItem('tag')) ?? ''
  const industriesName = JSON?.parse(localStorage.getItem('industriesName'))
  const cityID = JSON?.parse(localStorage.getItem('cityID'))
  const countryID = JSON?.parse(localStorage.getItem('countryID'))
  const stateID = JSON?.parse(localStorage.getItem('stateID'))
  const listingName = JSON?.parse(localStorage.getItem('listingName'))
  const industries = industriesName?.map((item, index) => {
    return (
      <>
        <b className='message-color' key={index}>
          {' ' + item.name + ','}
        </b>
      </>
    )
  })
  const listings = listingName?.map((item, index) => {
    return (
      <>
        <b className='message-color' key={index}>
          {' ' + item.name + ','}
        </b>
      </>
    )
  })
  const cityName = cityID?.map((item, index) => {
    return (
      <>
        <b className='message-color' key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })
  const countryName = countryID?.map((item, index) => {
    return (
      <>
        <b className='message-color' key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })
  const stateName = stateID?.map((item, index) => {
    return (
      <>
        <b className='message-color' key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })

  ////////////////
  return (
    <>
      <div className='container-fluid' style={{backgroundColor: '#081C3D'}}>
        <div className='row '>
          <div className='container'>
            <TopBar
              getFilterData={getFilterData}
              papularIndustry={papularIndustry}
              listingType={listingType}
            />
          </div>
        </div>
      </div>

      <div className='container'>
        {/* .slice(pagination.start, pagination.end) */}
        {loader ? (
          <div className='row'>
            <div className={'col-lg-9'}>
              {(countryName?.length > 0 ||
                stateName?.length > 0 ||
                cityName?.length > 0 ||
                industries?.length > 0 ||
                listings?.length > 0 ||
                addDates?.length > 0 ||
                years?.length > 0 ||
                tag?.length > 0 ||
                minPrice?.length > 0 ||
                maxPrice?.length > 0 ||
                grossMinPrice?.length > 0 ||
                grossMaxPrice?.length > 0 ||
                cashMinPrice?.length > 0 ||
                cashMaxPrice?.length > 0) &&
                loader && (
                  <>
                    {totalRecord > 0 ? (
                      <div className='container justify-content-center pt-5'>
                        <div
                          className='row p-3 rounded'
                          style={{backgroundColor: '#eff4f5', marginLeft: '.1px'}}
                        >
                          <div className='col-12'>
                            {countryName?.length > 0 ||
                              stateName?.length > 0 ||
                              cityName?.length > 0}
                            <b>{totalRecord}</b> <span> records found</span>
                            {!countryName?.length > 1 &&
                              !stateName?.length > 1 &&
                              !cityName?.length > 1 && <b className='message-color'> Any </b>}
                            {(countryName?.length > 0 ||
                              stateName?.length > 0 ||
                              cityName?.length > 0) &&
                              ' from '}
                            {countryName?.length > 0 && <span>Country: {countryName} </span>}
                            {stateName?.length > 0 && <span>State:{stateName} </span>}
                            {cityName?.length > 0 && <span>City: {cityName}</span>}
                            {industries?.length > 0 && (
                              <>
                                <span> in Industries:</span>
                                <b className='message-color'>{industries}</b>
                              </>
                            )}
                            {listings?.length > 0 && (
                              <>
                                <span> listing types:</span>
                                <b className='message-color'>{listings}</b>
                              </>
                            )}
                            {(minPrice?.length > 0 || maxPrice?.length > 0) && (
                              <>
                                <span> between Price Range: </span>
                                <b className='message-color'>{minPrice + '-' + maxPrice}</b>
                              </>
                            )}
                            {(grossMinPrice?.length > 0 || grossMaxPrice?.length > 0) && (
                              <>
                                <span> Gross Price: </span>
                                <b className='message-color'>
                                  {grossMinPrice + '-' + grossMaxPrice}
                                </b>
                              </>
                            )}
                            {addDates?.length > 0 && addDates != 'Add any Time' && (
                              <>
                                <span> Add Date: </span>
                                <b className='message-color'>{addDates}</b>
                              </>
                            )}
                            {years?.length > 0 && (
                              <>
                                <span> Years: </span>
                                <b className='message-color'>{years}</b>
                              </>
                            )}
                            {(cashMinPrice?.length > 0 || cashMaxPrice?.length > 0) && (
                              <>
                                <span> Cash Price: </span>
                                <b className='message-color'>{cashMinPrice + '-' + cashMaxPrice}</b>
                              </>
                            )}
                            {tag?.length > 0 && (
                              <>
                                <span> tag: </span>
                                <b className='message-color'>{tag}</b>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='container justify-content-center pt-5'>
                        <div className='row p-3 py-5 rounded' style={{backgroundColor: '#eff4f5'}}>
                          <div className='col-12'>
                            <h4>Sorry, no listings were found matching your search criteria</h4>

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

              {forBusinessData.length > 0 ? (
                forBusinessData.map((post, index) => (
                  <>
                    <div className=' my-5 ms-2' key={index}>
                      <div className='' key={index + 1}>
                        <div className=' ' key={index + 3}>
                          <BusinessDetail
                            id={post.id}
                            title={post.title}
                            location={post.location}
                            dec={post.description}
                            price={post.price}
                            cashFlow={post.cashFlow}
                            img={post.img}
                            slug={post.slug}
                            favorite={post.favorite}
                            // activeImg={post.activeImg}
                            // img2={postData[0].img2}
                            username={post.username}
                            fullIndex={post}
                            img3={dummyImg}
                            imgId={post.imgId}
                            listingType={post.listingType}
                            locationVisibility={post.location_visibitiy}
                            getFilterData={getFilterData}
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
                  style={{height: '70vh', width: '100%'}}
                >
                  <div>
                    <h1>RECORD NOT FOUND</h1>
                  </div>
                </div>
              )}
            </div>
            <div className={` col-3 d-none d-lg-block px-0`}>
              <Add my={'my-5'} />
              <PopularIndustries
                px={'px-9'}
                width={'95%'}
                getFilterData={getFilterData}
                papularIndustry={papularIndustry}
              />
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
