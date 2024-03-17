import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './PopularIndustries.css'
import {BsFillStarFill, BsNewspaper, BsPersonSquare, BsSearch} from 'react-icons/bs'
import {
  MdDirectionsBoatFilled,
  MdHealthAndSafety,
  MdOutlineMiscellaneousServices,
  MdPrecisionManufacturing,
  MdRestaurant,
} from 'react-icons/md'
import {FaLaughBeam, FaShopware} from 'react-icons/fa'
import {RiBuildingFill} from 'react-icons/ri'
import {getFilteredData} from '../../services/forSearchBusiness/Index'
import MainScreenLoader from '../../../../src/assets/Loader/MainScreenLoader.gif'

import {getHomeSesvices} from '../../services/home-services'
import {useDispatch, useSelector} from 'react-redux'
const PopularIndustries = (props) => {
  let industryFilterData = useSelector((state) => {
    return state
  })
  const [allTopIndustries, setAllTopIndustries] = useState([])
  // const [allIndutries, setAllTopIndustries] = useState([])
  const [allIndustries, setallIndustries] = useState([])
  const [allIndustriesFilterData, setAllIndustriesFilterData] = useState([])
  // const [allIndustriesFilter, setAllIndustriesFilter] = useState([])
  const [allIndustriesFilter, setAllIndustriesFilter] = useState([])
  const [allIndustriesIDFilter, setAllIndustriesIDFilter] = useState([])
  let filterDataId = JSON.parse(localStorage.getItem('industriesID'))
  const [isMoreIndustries, setIsMoreIndustries] = useState(false)
  let dispatch = useDispatch()

  const localStorageIndustriesID = localStorage.getItem('industriesID')
  const transformedIndustriesID = JSON.parse(localStorageIndustriesID)

  const [industriesLength, setIndustriesLength] = useState(8)

  useEffect(() => {
    console.log('objectlll')
    let filterData = JSON.parse(localStorage.getItem('industriesName'))
    if (filterData) {
      setAllTopIndustries(filterData)
    }
  }, [])
  useEffect(() => {
    getTopIndustries()
    let filterData = JSON.parse(localStorage.getItem('industriesName'))

    // let array=[]
    if (filterData) {
      // array.push()
      setAllIndustriesFilter(filterData)
      console.log('filterDataId', allIndustriesFilter)
    } else {
      setAllIndustriesFilter([])
    }
  }, [props.papularIndustry])
  const getTopIndustries = async () => {
    let mapTopIndustries = []
    try {
      const result = await getHomeSesvices()
      if (result.status === true) {
        result.top_business_industries.map((item, index) => {
          if (index < 11) {
            mapTopIndustries.push({id: item.id, name: item.name})
          }
        })
        setAllTopIndustries(mapTopIndustries)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
    }
  }

  const spliceItemIndustries = () => {
    console.log('spliceItemIndustries')
  }
  const [isActive, setIsActive] = useState(false)
  const addItemIndustries = (e, item) => {
    // let industriesId = []
    // let industriesN = []
    window.scrollTo(0, 0)
    let updateTopbar = 'industry'
    if (e == true) {
      setIsActive(true)
      let industriesId = []
      let industriesN = []
      const localStorageIndustriesID = localStorage.getItem('industriesID')
      const transformedIndustriesID = JSON.parse(localStorageIndustriesID)
      let indusName = JSON.parse(localStorage.getItem('industriesName'))
      if (transformedIndustriesID) {
        industriesId = transformedIndustriesID.industriesID
      }
      if (indusName) {
        industriesN = indusName
      }

      function checkAdult(age) {
        return age === item.id
      }
      let valueCom = industriesId.some(checkAdult)

      if (valueCom === false) {
        industriesId.push(item.id)
        industriesN.push(item)

        localStorage.setItem(
          'industriesID',
          JSON.stringify({
            industriesID: industriesId,
          })
        )
        localStorage.setItem('industriesName', JSON.stringify(industriesN))
        setallIndustries(industriesN)
        getSearchData()
      } else {
        console.log('sorrrrrrrrrrrrrrry')
      }
      console.log('industriesId', industriesId)

      console.log('industriesId', industriesId)
    } else if (e == false) {
      let industriesId = []
      let industriesN = []
      const localStorageIndustriesID = localStorage.getItem('industriesID')
      const transformedIndustriesID = JSON.parse(localStorageIndustriesID)
      let indusName = JSON.parse(localStorage.getItem('industriesName'))
      industriesId = transformedIndustriesID.industriesID
      industriesId = transformedIndustriesID.industriesID
      var filteredArrayName = indusName.filter((e) => e.id !== item.id)
      var filteredArray = industriesId.filter((e) => e !== item.id)
      // function checkAdult(age) {
      //   return age === item.id
      // }
      localStorage.setItem(
        'industriesID',
        JSON.stringify({
          industriesID: filteredArray,
        })
      )

      localStorage.setItem('industriesName', JSON.stringify(filteredArrayName))

      // let valueCom = industriesId.some(checkAdult)

      // if (valueCom === true) {
      //   industriesId.push(item.id)
      //   localStorage.setItem(
      //     'industriesID',
      //     JSON.stringify({
      //       industriesID: industriesId,
      //     })
      //   )
      // } else {
      //   console.log('sorrrrrrrrrrrrrrry')
      // }
      // console.log('industriesId', industriesId)

      // console.log('industriesId', industriesId)
      getSearchData()
    }

    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     updateTopbar,
    //   },
    // })
  }

  const moreIndustriesHandler = () => {
    const items = allTopIndustries.length
    setIndustriesLength(items)
    setIsMoreIndustries(true)
  }
  const lessIndustriesHandler = () => {
    const items = 8
    setIndustriesLength(items)
    setIsMoreIndustries(false)
  }
  let indusName = JSON.parse(localStorage.getItem('industriesName'))

  const getSearchData = async () => {
    const localStorageIndustriesID = localStorage.getItem('industriesID')
    const transformedIndustriesID = JSON.parse(localStorageIndustriesID)
    const {industriesID} = transformedIndustriesID ?? ''

    const localStoragelistingsID = localStorage.getItem('listingsID')
    const transformedlistingsID = JSON.parse(localStoragelistingsID)
    const {listingsID} = transformedlistingsID ?? ''

    const localStorageMinPrice = localStorage.getItem('minPrice')
    const transformedminPrice = JSON.parse(localStorageMinPrice)
    const {minPrice} = transformedminPrice ?? ''

    const localStoragemaxPrice = localStorage.getItem('maxPrice')
    const transformedmaxPrice = JSON.parse(localStoragemaxPrice)
    const {maxPrice} = transformedmaxPrice ?? ''

    const localStorageGrossMaxPrice = localStorage.getItem('grossMaxPrice')
    const transformedGrossMaxPrice = JSON.parse(localStorageGrossMaxPrice)
    const {grossMaxPrice} = transformedGrossMaxPrice ?? ''

    const localStorageGrossMinPrice = localStorage.getItem('grossMinPrice')
    const transformedGrossMinPrice = JSON.parse(localStorageGrossMinPrice)
    const {grossMinPrice} = transformedGrossMinPrice ?? ''

    const localStorageCashMaxPrice = localStorage.getItem('cashMaxPrice')
    const transformedCashMaxPrice = JSON.parse(localStorageCashMaxPrice)
    const {cashMaxPrice} = transformedCashMaxPrice ?? ''

    const localStorageCashMinPrice = localStorage.getItem('cashMinPrice')
    const transformedCashMinPrice = JSON.parse(localStorageCashMinPrice)
    const {cashMinPrice} = transformedCashMinPrice ?? ''

    const localStoragetag = localStorage.getItem('tag')
    const transformedtag = JSON.parse(localStoragetag)
    const {tag} = transformedtag ?? ''

    const localStorageAddDate = localStorage.getItem('addDate')
    const transformedAddDate = JSON.parse(localStorageAddDate)
    const {addDates} = transformedAddDate ?? ''

    const localStorageYear = localStorage.getItem('year')
    const transformedYear = JSON.parse(localStorageYear)
    const {years} = transformedYear ?? ''
    const localStorageCityID = localStorage.getItem('cityID')
    const cityID = JSON.parse(localStorageCityID)

    const localStorageCountryID = localStorage.getItem('countryID')
    const countryID = JSON.parse(localStorageCountryID)

    const localStorageStateID = localStorage.getItem('stateID')
    const stateID = JSON.parse(localStorageStateID)

    await props.getFilterData('result', 1)
  }
  const allTopIndustriesArray = allTopIndustries?.map((i) => i.id)
  const allIndustriesFilterArray = allIndustriesFilter?.map((i) => i.id)
  let difference = allTopIndustriesArray?.map((x) => allIndustriesFilterArray.includes(x))
  let ab = difference?.map((item) => item)

  return (
    <div
      className='container popular-section mt-8 mx-0 ms-auto mb-10'
      style={{width: `${props.width}`, marginLeft: 'auto'}}
    >
      {allTopIndustries?.length > 0 ? (
        <div className='row '>
          <div className='col-lg-12 '>
            <div className='row g-4'>
              <div className={`col-12 border-0 ${props.px} py-5`}>
                <h3
                  className='text-start fs-2 py-3'
                  style={{borderBottom: '1px solid #00A3EF', color: '#081C3D'}}
                >
                  Top Industries
                </h3>
                <div
                  className='text-start side-tools-text'
                  style={{maxHeight: '35rem', overflowY: 'scroll'}}
                >
                  {allTopIndustries?.slice(0, industriesLength)?.map((outer, index) => {
                    return (
                      <>
                        {allIndustriesFilterArray.includes(outer.id) ? (
                          <li className='list-unstyled side-tools-text pb-3 pb-2 pt-2' key={index}>
                            <label
                              htmlFor={outer.id}
                              className=' me-3 side-tools-text text-truncate'
                              style={{maxWidth: '74%'}}
                              // onClick={() => addItemIndustries(outer)}
                            >
                              {outer.name}
                            </label>
                            {console.log(outer.id, outer.name)}
                            <input
                              className='form-check-input check-box-style'
                              type='checkbox'
                              value='Restaurant & Food'
                              onChange={(e) => addItemIndustries(e.target.checked, outer)}
                              id={outer.id}
                              defaultChecked={
                                allIndustriesFilterArray.includes(outer.id) && ab.includes(true)
                              }
                            />
                            {/* {console.log('true', ab, outer.id)} */}
                          </li>
                        ) : (
                          <li className='list-unstyled side-tools-text pb-3 pb-2 pt-2' key={index}>
                            <label
                              className=' me-3 side-tools-text text-truncate'
                              htmlFor={outer.id}
                              style={{maxWidth: '74%'}}
                              // onClick={() => addItemIndustries(outer)}
                            >
                              {outer.name}
                            </label>

                            <input
                              className='form-check-input check-box-style'
                              type='checkbox'
                              value='Restaurant & Food'
                              onChange={(e) => addItemIndustries(e.target.checked, outer)}
                              id={outer.id}
                              // defaultChecked
                            />
                          </li>
                        )}
                      </>
                    )
                  })}
                  {/* {allTopIndustries.slice(0, industriesLength)?.map((outer, index) => {
                  return (
                    <>
                     
                      <li className='list-unstyled side-tools-text pb-3 pb-2 pt-2' key={index}>
                        <label
                          className=' me-3 side-tools-text'
                          htmlFor={outer.id}
                          onClick={addItemIndustries}
                        >
                          {outer.name}
                        </label>
                        <input
                          className='form-check-input check-box-style'
                          type='checkbox'
                          value='Restaurant & Food'
                          id={outer.id}
                        />
                      </li>
                    </>
                  )
                })} */}
                  <div className='text-center pt-3'>
                    {!isMoreIndustries ? (
                      <button
                        className='bg-transparent text-primary fs-5 border-0'
                        onClick={moreIndustriesHandler}
                      >
                        More Industries
                      </button>
                    ) : (
                      <button
                        className='bg-transparent text-primary fs-5 border-0'
                        onClick={lessIndustriesHandler}
                      >
                        Less Industries
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className='text-start side-tools-text'>
                {allTopIndustries.slice(0, industriesLength)?.map((outer, index) => {
                  return (
                    <>
                      {allIndustriesFilter?.map((data, index) => {
                        const a = allIndustriesFilter.some((s) => {
                          return s.id == outer.id
                        })
                        const b = allIndustriesFilter.every((s) => {
                          return s.id !== outer.id
                        })

                        return (
                          <>
                            {data.id == outer.id && a == true ? (
                              <li
                                className='form-check list-unstyled ps-0 d-flex justify-content-between side-tools-text  pb-2 pt-2'
                                key={index}
                              >
                                <label
                                  className='form-check-label side-tools-text'
                                  htmlFor={data.id}
                                  onClick={spliceItemIndustries}
                                >
                                  {outer.name}
                                </label>
                                <input
                                  className='form-check-input check-box-style'
                                  type='checkbox'
                                  defaultValue
                                  id={outer.id}
                                  defaultChecked
                                />
                              </li>
                            ) : data.id !== outer.id && b == true && a == false && index == 0 ? (
                              <li
                                className='list-unstyled side-tools-text pb-3 pb-2 pt-2'
                                key={index}
                              >
                                <label
                                  className=' me-3 side-tools-text'
                                  htmlFor={data.id}
                                  onClick={addItemIndustries}
                                >
                                  {outer.name}
                                </label>
                                <input
                                  className='form-check-input check-box-style'
                                  type='checkbox'
                                  value='Restaurant & Food'
                                
                                  id={outer.id}
                                />
                              </li>
                            ) : null}
                          </>
                        )
                      })}
                    </>
                  )
                })}

                <div className='text-center pt-3'>
                  {!isMoreIndustries ? (
                    <button
                      className='bg-transparent text-primary fs-5 border-0'
                      onClick={moreIndustriesHandler}
                    >
                      More Industries
                    </button>
                  ) : (
                    <button
                      className='bg-transparent text-primary fs-5 border-0'
                      onClick={lessIndustriesHandler}
                    >
                      Less Industries
                    </button>
                  )}
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '20vh', width: '100%'}}
        >
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </div>
  )
}

export default PopularIndustries
