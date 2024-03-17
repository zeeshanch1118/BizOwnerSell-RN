import React, {useEffect, useState, useRef} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import Select from 'react-select'
import {useParams} from 'react-router-dom'
import ButtonLoader from '../../../../../../assets/Loader/ButtonLoader.gif'
import './detailinfo.css'
import Swal from 'sweetalert2'
import '../../../../../../components/BuyBizzOwner.css'
// import Tags from './Tags'
import Content from './Content'
import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
import './tags.css'
import {getRealEastType} from '../../../../../services/get-fields-data'
import JoditEditor from 'jodit-react'
import './content.css'
import {GoCalendar} from 'react-icons/go'
import {
  updateListingFourthStep,
  getSingleBusinessesListings,
} from '../../../../../services/business-services/index'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import deleteIcon from '../../../../../../assets/icons/delete-icon.svg'

import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
const config = {
  buttons: ['bold', 'italic', 'link', 'unlink', 'underline'],
}
const DetailInformation = (props) => {
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const getBusinessID = localStorage.getItem('businessID')
  const transformedBusinessID = JSON?.parse(getBusinessID)
  const {businessID} = transformedBusinessID ?? ''
  const [recordedBusinessID, setRecordedBusinessID] = useState('')
  const [financing, setFinancing] = useState(0)
  const {biz_id} = useParams()
  const [isContinue, setIsContinue] = useState(false)
  const [listingStatus, setListingStatus] = useState(null)
  // const city = [
  //   {value: 'Islamabad', label: 'Islamabad'},
  //   {value: 'Hyderabad', label: 'Hyderabad'},
  //   {value: 'Peshawar', label: 'Peshawar'},
  //   {value: 'Quetta', label: 'Quetta'},
  //   {value: '	Karachi', label: '	Karachi'},
  // ]
  const [tags, setTags] = useState([])
  const addTag = (e) => {
    let tagArray = []
    if (e.key === 'Enter' || e.key == ',') {
      e.preventDefault()

      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value])

        e.target.value = ''
      }
    }
    setTagsValidation(false)
  }
  const removeApiTag = (id, index) => {
    let apisTags = [...apiTags]

    apisTags.map((item, index) => {
      if (item.id === id) {
        apisTags.splice(index, 1)
      }
    })

    setApiTags(apisTags)

    // const newTags = tags.filter((tag, ind) => ind !== index)
  }
  const removeTag = (removedTag, index) => {
    const newTags = tags.filter((tag, ind) => ind !== index)
    setTags(newTags)
  }
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [reasonForSelling, setReasonForSelling] = useState('')
  const [supporTraining, setSupporTraining] = useState('')
  const [growthExpansion, setGrowthExpansion] = useState('')
  const [competation, setCompetation] = useState('')
  const [inventoryDescription, setInventoryDescription] = useState('')
  const [realEstatePrice, setRealEstatePrice] = useState('')
  const [totalEmployees, setTotalEmployees] = useState('')
  const [leaseExpiration, setLeaseExpiration] = useState('')
  const [EBITDA, setEBITDA] = useState('')
  const [buildingSquareFeet, setBuildingSquareFeet] = useState('')

  const [inventoryFee, setIinventoryFee] = useState('')
  const [FurnitureFixtures, setFurnitureFixtures] = useState('')

  const [establishedAt, setEstablishedAt] = useState('')

  // const [tags, setTags] = useState('')
  const [businessContent, setBusinessContent] = useState('')
  const [realEstate, setRealEstate] = useState('')
  const [cashFlow, setCashFlow] = useState('')
  const [grossRevenue, setGrossRevenue] = useState('')
  const [calenderModel, setCalenderModel] = useState(false)
  const [calenderModelExp, setCalenderModelExp] = useState(false)

  const [date, setDate] = useState('')
  const [titleValidation, setTitleValidation] = useState(false)
  // validation

  const [allListings, setAllListings] = useState([])
  const [loaderScreen, setLoaderScreen] = useState(false)

  const [priceValidation, setPriceValidation] = useState(false)
  const [establishedAtValidation, setEstablishedAtValidation] = useState(false)
  const [cashFlowValidation, setCashFlowValidation] = useState(false)
  const [grossRevenueValidation, setGrossRevenueValidation] = useState(false)
  const [tagsValidation, setTagsValidation] = useState(false)
  const [businessContentValidation, setBusinessContentValidation] = useState(false)
  const [realEstateValidation, setRealEstateValidation] = useState(false)
  const [reasonForSellingValidation, setReasonForSellingValidation] = useState(false)
  const [supporTrainingValidation, setSupporTrainingValidation] = useState(false)
  const [growthExpansionValidation, setGrowthExpansionValidation] = useState(false)
  const [competationValidation, setCompetationValidation] = useState(false)
  const [inventoryDescriptionValidation, setInventoryDescriptionValidation] = useState(false)
  const [realEstatePriceValidation, setRealEstatePriceValidation] = useState(false)
  const [totalEmployeesValidation, setTotalEmployeesValidation] = useState(false)
  const [leaseExpirationValidation, setLeaseExpirationValidation] = useState(false)
  const [EBITDAValidation, setEBITDAValidation] = useState('')
  const [buildingSquareFeetValidation, setBuildingSquareFeetValidation] = useState(false)
  const [calenderMaxDate, setCalenderMaxDate] = useState('')

  const [inventoryFeeValidation, setIinventoryFeeValidation] = useState(false)
  const [FurnitureFixturesValidation, setFurnitureFixturesValidation] = useState(false)
  useEffect(() => {
    var d = new Date()
    d.setMonth(d.getMonth() - 36)
    setCalenderMaxDate(d)
    setEstablishedAt(d.toLocaleDateString('zh-Hans-CN'))
    window.scrollTo(0, 0)
    RealEastType()
  }, [])
  useEffect(() => {
    if (biz_id) {
      setRecordedBusinessID(biz_id)
      getSingleBusiness(accessToken, biz_id)
    } else if (businessID) {
      setRecordedBusinessID(businessID)
      getSingleBusiness(accessToken, businessID)
    }
  }, [biz_id, businessID])
  const [apiTags, setApiTags] = useState([])
  const getSingleBusiness = async (accessToken, ID) => {
    let tagArray = []
    try {
      setLoaderScreen(true)
      const result = await getSingleBusinessesListings(accessToken, ID)
      console.log('result', result)
      if (result.status === true) {
        if (
          result.business?.finance !== undefined &&
          result.business?.finance !== null &&
          result.business?.finance !== 'null'
        ) {
          setFinancing(result.business?.finance ?? 0)
        }
        setListingStatus(result.business?.status)
        realEstateChange({
          value: result.business?.real_estate_listing_type?.id,
          label: result.business?.real_estate_listing_type?.type,
        })

        if (
          result.business?.asking_price !== undefined &&
          result.business?.asking_price !== null &&
          result.business?.asking_price !== 'null'
        ) {
          setPrice(result.business?.asking_price)
        }
        if (
          result.business?.cash_flow !== undefined &&
          result.business?.cash_flow !== null &&
          result.business?.cash_flow !== 'null'
        ) {
          setCashFlow(result.business?.cash_flow)
        }
        setPriceValidation(false)
        if (
          result.business?.gross_revenue !== undefined &&
          result.business?.gross_revenue !== null &&
          result.business?.gross_revenue !== 'null'
        ) {
          setGrossRevenue(result.business?.gross_revenue)
        }
        //  setBusinessContent(result.business?.description)
        setBusinessContentValidation(false)
        if (
          result.business?.business_meta?.inventory !== undefined &&
          result.business?.business_meta?.inventory !== null &&
          result.business?.business_meta?.inventory !== 'null'
        ) {
          setIinventoryFee(result.business?.business_meta?.inventory)
        }
        if (
          result.business?.business_meta?.building_sf !== undefined &&
          result.business?.business_meta?.building_sf !== null &&
          result.business?.business_meta?.building_sf !== 'null'
        ) {
          setBuildingSquareFeet(result.business?.business_meta?.building_sf)
        }

        if (
          result.business?.business_meta?.ffe !== undefined &&
          result.business?.business_meta?.ffe !== null &&
          result.business?.business_meta?.ffe !== 'null'
        ) {
          setFurnitureFixtures(result.business?.business_meta?.ffe)
        }
        if (
          result.business?.established_at !== null &&
          result.business?.established_at !== 'null' &&
          result.business?.established_at !== undefined &&
          result.business?.established_at !== ''
        ) {
          setEstablishedAt(result.business?.established_at)
        } else {
          var d = new Date()
          var year = d.setMonth(d.getMonth() - 36)
          var newDate = new Date(year)
          setEstablishedAt(newDate.toLocaleDateString('zh-Hans-CN'))
        }

        if (
          result.business?.business_meta?.ebitda !== undefined &&
          result.business?.business_meta?.ebitda !== null &&
          result.business?.business_meta?.ebitda !== 'null'
        ) {
          setEBITDA(result.business?.business_meta?.ebitda)
        }
        if (
          result.business?.business_meta?.lease_expiration !== undefined &&
          result.business?.business_meta?.lease_expiration !== null &&
          result.business?.business_meta?.lease_expiration !== 'null'
        ) {
          setLeaseExpiration(result.business?.business_meta?.lease_expiration)
        }
        if (
          result.business?.business_meta?.total_employees !== undefined &&
          result.business?.business_meta?.total_employees !== 'null' &&
          result.business?.business_meta?.total_employees !== null
        ) {
          setTotalEmployees(result.business?.business_meta?.total_employees)
        }
        if (
          result.business?.real_estate_price !== undefined &&
          result.business?.real_estate_price !== null &&
          result.business?.real_estate_price !== 'null'
        ) {
          setRealEstatePrice(result.business?.real_estate_price)
        }
        if (
          result.business?.business_meta?.inventory_description !== 'null' &&
          result.business?.business_meta?.inventory_description !== null &&
          result.business?.business_meta?.inventory_description !== undefined
        ) {
          setInventoryDescription(result.business?.business_meta?.inventory_description)
        }
        if (
          result.business?.business_meta?.competition !== undefined &&
          result.business?.business_meta?.competition !== 'null' &&
          result.business?.business_meta?.competition !== null
        ) {
          setCompetation(result.business?.business_meta?.competition)
        }
        if (
          result.business?.business_meta?.growth_expansion !== undefined &&
          result.business?.business_meta?.growth_expansion !== 'null' &&
          result.business?.business_meta?.growth_expansion !== null
        ) {
          setGrowthExpansion(result.business?.business_meta?.growth_expansion)
        }
        if (
          result.business?.business_meta?.support_training !== undefined &&
          result.business?.business_meta?.support_training !== 'null' &&
          result.business?.business_meta?.support_training !== null
        ) {
          setSupporTraining(result.business?.business_meta?.support_training)
        }
        if (
          result.business?.business_meta?.reason_for_selling !== undefined &&
          result.business?.business_meta?.reason_for_selling !== 'null' &&
          result.business?.business_meta?.reason_for_selling !== null
        ) {
          setReasonForSelling(result.business?.business_meta?.reason_for_selling)
        }
        if (
          result.business?.description !== undefined &&
          result.business?.description !== null &&
          result.business?.description !== 'null'
        ) {
          setContent(result.business?.description)
        }
        if (
          result.business?.tags !== undefined &&
          result.business?.tags !== null &&
          result.business?.tags !== 'null'
        ) {
          setApiTags(result.business?.tags)
        }
        setLoaderScreen(false)

        setEstablishedAtValidation(false)
      }
    } catch (err) {
      setLoaderScreen(false)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const RealEastType = async () => {
    let mapRealEastType = []
    try {
      const result = await getRealEastType()
      // console.log('yayyayayccc', result)
      if (result.status === true) {
        result.data.map((item, index) => mapRealEastType.push({value: item.id, label: item.type}))
        setAllListings(mapRealEastType)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  const onChangeDate = async (e) => {
    setDate(e)

    setEstablishedAt(e.toLocaleDateString('zh-Hans-CN'))
    setEstablishedAtValidation(false)
  }

  const onChangeDateExp = async (e) => {
    setDate(e)

    setLeaseExpiration(e.toLocaleDateString('zh-Hans-CN'))
    setLeaseExpirationValidation(false)
  }

  const realEstateChange = async (e) => {
    await setRealEstate(e)
    setRealEstateValidation(false)
  }

  const onInputChange = async (event, files) => {
    event.preventDefault()
    switch (event.target.name) {
      case 'title':
        await setTitle(event.target.value)

        break
      case 'price':
        await setPrice(event.target.value)
        setPriceValidation(false)
        break

      case 'cash-flow':
        await setCashFlow(event.target.value)
        setCashFlowValidation(false)
        // setPriceValidation(false)
        break
      case 'grossRevenue':
        await setGrossRevenue(event.target.value)
        setGrossRevenueValidation(false)
        break
      //
      //
      //
      case 'reason-for-selling':
        await setReasonForSelling(event.target.value)
        // setReasonForSellingValidation(false)
        break
      case 'support-training':
        await setSupporTraining(event.target.value)
        // setSupporTrainingValidation(false)
        break
      case 'growth-expansion':
        await setGrowthExpansion(event.target.value)
        // setGrowthExpansionValidation(false)
        break
      case 'competation':
        await setCompetation(event.target.value)
        // setCompetationValidation(false)
        break
      case 'inventory-description':
        await setInventoryDescription(event.target.value)
        // setInventoryDescriptionValidation(false)
        break
      case 'real-estate-price':
        await setRealEstatePrice(event.target.value)
        setRealEstatePriceValidation(false)
        break

      case 'total-employees':
        await setTotalEmployees(event.target.value)
        setTotalEmployeesValidation(false)
        break
      case 'lease-expiration':
        await setLeaseExpiration(event.target.value)
        break
      case 'EBITDA':
        await setEBITDA(event.target.value)
        setEBITDAValidation(false)
        // setPriceValidation(false)
        break
      case 'building-square-feet':
        await setBuildingSquareFeet(event.target.value)
        // setPriceValidation(false)
        break
      case 'inventory-fee':
        await setIinventoryFee(event.target.value)
        setIinventoryFeeValidation(false)
        // setPriceValidation(false)
        break
      case 'furniture-fixtures':
        await setFurnitureFixtures(event.target.value)
        setFurnitureFixturesValidation(false)
        // setPriceValidation(false)
        break

      case 'businessContent':
        await setBusinessContent(event.target.value)
        setBusinessContentValidation(false)
        break
    }
  }

  // const [detailInformation, setDetailInformation] = useState(4)

  const detailInformationStep4 = async (e) => {
    e.preventDefault()
    if (realEstate.value == '' || realEstate.value == undefined) {
      setRealEstateValidation(true)
      window.scrollTo(0, 100)
    }
    if (price == '' || price == undefined) {
      setPriceValidation(true)
      window.scrollTo(0, 100)
    }
    if (establishedAt == '' || establishedAt == undefined) {
      setEstablishedAtValidation(true)
      window.scrollTo(0, 100)
    }
    if (cashFlow == '' || cashFlow == undefined) {
      setCashFlowValidation(true)
      window.scrollTo(0, 200)
    }
    if (grossRevenue == '' || grossRevenue == undefined) {
      setGrossRevenueValidation(true)
      window.scrollTo(0, 200)
    }
    if (leaseExpiration == '' || leaseExpiration == undefined) {
      setLeaseExpirationValidation(true)
      window.scrollTo(0, 200)
    }
    if (totalEmployees == '' || totalEmployees == undefined) {
      setTotalEmployeesValidation(true)
      window.scrollTo(0, 500)
    }
    // if (tags == '' || tags == undefined) {
    //   setTagsValidation(true)
    // }

    if (content == '' || content == undefined) {
      setBusinessContentValidation(true)
    }
    if (FurnitureFixtures == '' || FurnitureFixtures == undefined) {
      setFurnitureFixturesValidation(true)
    }
    if (inventoryFee == '' || inventoryFee == undefined) {
      setIinventoryFeeValidation(true)
    }
    if (EBITDA == '' || EBITDA == undefined) {
      setEBITDAValidation(true)
    }

    if (
      realEstate != '' &&
      realEstate != undefined &&
      establishedAt != '' &&
      establishedAt != undefined &&
      cashFlow != ' ' &&
      cashFlow != undefined &&
      price != undefined &&
      price != '' &&
      grossRevenue != '' &&
      grossRevenue != undefined &&
      leaseExpiration != '' &&
      leaseExpiration != undefined &&
      totalEmployees != '' &&
      totalEmployees != undefined &&
      FurnitureFixtures != '' &&
      FurnitureFixtures != undefined &&
      inventoryFee != '' &&
      inventoryFee != undefined &&
      EBITDA != '' &&
      EBITDA != undefined &&
      // establishedAt !=" "&& undefined &&
      // establishedAt !=" "&& undefined &&
      // establishedAt !=" "&& undefined &&

      content != '' &&
      content != undefined
    ) {
      setIsContinue(true)
      console.log('financing', financing)
      const result = await updateListingFourthStep(
        realEstate.value,
        price,
        establishedAt,
        tags,
        content,
        recordedBusinessID,
        cashFlow,
        grossRevenue,
        accessToken,
        ////////////////
        reasonForSelling,
        supporTraining,
        growthExpansion,
        competation,
        inventoryDescription,
        realEstatePrice,
        totalEmployees,
        leaseExpiration,
        EBITDA,
        buildingSquareFeet,
        inventoryFee,
        FurnitureFixtures,
        financing,
        listingStatus
      )
      if (result.status === true) {
        setIsContinue(false)
        props.detailInformationStep4()
      } else {
        setIsContinue(false)
        console.log('Error in Fourth step', result)
      }
    } else {
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Please fill all fields',
      //   icon: 'error',
      //   // showCancelButton: true,
      //   confirmButtonColor: '#009ef7',
      //   confirmButtonText: 'Ok',
      // })
      // alert('plz fill all fields')
    }
  }

  const detailStepBack4 = (e) => {
    e.preventDefault()
    props.detailStepBack4()
  }

  const financingHandler = (e) => {
    if (e == true) {
      setFinancing(1)
    } else if (e == false) {
      setFinancing(0)
    }
  }

  return (
    <>
      {!loaderScreen ? (
        <div className='container px-md-10 '>
          <div className='row mx-auto'>
            {/* <div className='mt-10 mx-auto'>
              <div className='pb-3 pb-lg-10'>
                <h2 className=' bizOwner-add-new-listing-heading'>Detail information</h2>
              </div>
            </div> */}
            <div className='col-md-6 '>
              <label className='form-label mb-3 required'>Select real estate listing type</label>

              <Select
                type='search'
                options={allListings}
                value={realEstate}
                placeholder='Select Real Estate Listing Type'
                onChange={realEstateChange}
              />
              {realEstateValidation ? (
                <div className='biz_owner_input_validation'>Select real estate listing type</div>
              ) : null}
            </div>{' '}
            <div className='  col-md-3 mt-7 mt-md-1'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span className='required'>Price</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter price'
                name='price'
                value={price}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {priceValidation ? (
                <div className='biz_owner_input_validation'>Enter price</div>
              ) : null}
            </div>
            <div className='  col-md-3 mt-7 mt-md-1'>
              <label className='d-flex align-items-center  fw-bold form-label '>
                <span className='required'>Established at</span>
              </label>
              <div
                onClick={() => setCalenderModel(true)}
                style={{cursor: 'pointer', backgroundColor: '#f3f7fb'}}
                className='py-3 rounded px-3 '
              >
                <div className='d-flex justify-content-between '>
                  <div
                    style={{color: '#5e6278', paddingTop: '3px', fontWeight: '500'}}
                    className=' font-weight-bolder'
                  >
                    {' '}
                    {establishedAt ?? 'Select Date'}
                  </div>
                  <div>
                    <GoCalendar size={25} />
                  </div>
                </div>
              </div>

              {establishedAtValidation ? (
                <div className='biz_owner_input_validation'>Select established_at</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Cash flow</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Cash Flow'
                name='cash-flow'
                value={cashFlow}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {cashFlowValidation ? (
                <div className='biz_owner_input_validation'>Enter cash flow</div>
              ) : null}

              {/* 
          
          
          // 
          */}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Gross revenue</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Gross Revenue'
                name='grossRevenue'
                value={grossRevenue}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {grossRevenueValidation ? (
                <div className='biz_owner_input_validation'>Enter gross revenue</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Furniture fixtures equipment fee</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Furniture Fixtures Equipment Fee'
                name='furniture-fixtures'
                value={FurnitureFixtures}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {FurnitureFixturesValidation ? (
                <div className='biz_owner_input_validation'>
                  Enter furniture fixtures equipment fee
                </div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Inventory fee</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Inventory Fee'
                name='inventory-fee'
                value={inventoryFee}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {inventoryFeeValidation ? (
                <div className='biz_owner_input_validation'>Enter inventory fee</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>EBITDA</span>
              </label>
              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter EBITDA'
                name='EBITDA'
                value={EBITDA}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />

              {EBITDAValidation ? (
                <div className='biz_owner_input_validation'>Enter EBITDA</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label '>
                <span className='required'>Lease expiration</span>
              </label>
              <div
                onClick={() => setCalenderModelExp(true)}
                style={{cursor: 'pointer', backgroundColor: '#f3f7fb'}}
                className='py-3 rounded px-3 '
              >
                <div className='d-flex justify-content-between '>
                  <div
                    style={{color: '#5e6278', paddingTop: '3px', fontWeight: '500'}}
                    className=' font-weight-bold'
                  >
                    {' '}
                    {leaseExpiration ?? 'Select Date'}
                  </div>
                  <div>
                    <GoCalendar size={25} />
                  </div>
                </div>
              </div>

              {leaseExpirationValidation ? (
                <div className='biz_owner_input_validation'>Enter lease expiration</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Total employees</span>
              </label>
              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Total Employees'
                name='total-employees'
                value={totalEmployees}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />

              {totalEmployeesValidation ? (
                <div className='biz_owner_input_validation'>Enter total employees</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Building square feet</span>
              </label>
              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Building Square Feet'
                name='building-square-feet'
                value={buildingSquareFeet}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />

              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Real estate price</span>
              </label>
              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Real Estate Price'
                name='real-estate-price'
                value={realEstatePrice}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />

              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Inventory description</span>
              </label>
              <textarea
                id='w3review'
                rows='4'
                cols='50'
                // placeholder='Enter Inventory Description'
                name='inventory-description'
                value={inventoryDescription}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Competition</span>
              </label>
              <textarea
                id='w3review'
                rows='4'
                cols='50'
                // placeholder='Enter Competition'
                name='competation'
                value={competation}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Growth & expansion</span>
              </label>
              <textarea
                id='w3review'
                rows='4'
                cols='50'
                // placeholder='Enter growth & expansion'
                name='growth-expansion'
                value={growthExpansion}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Support training</span>
              </label>
              <textarea
                id='w3review'
                rows='4'
                cols='50'
                // placeholder='Enter Support Training'
                name='support-training'
                value={supporTraining}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Reason for selling</span>
              </label>
              <textarea
                id='w3review'
                rows='4'
                cols='50'
                // placeholder='Enter Reason For Selling'
                name='reason-for-selling'
                value={reasonForSelling}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className=' mt-7 col-12 '>
              <label className='d-flex align-items-center  fw-bold form-label mb-2'>
                <span className=''>Enter tags</span>
              </label>

              <div>
                <div className='tag-container'>
                  {apiTags?.map((item, i) => (
                    <div key={i} className='tag'>
                      {item.name}

                      <img
                        src={deleteIcon}
                        alt=''
                        className='d-inline ps-2 cursor-pointer'
                        onClick={() => removeApiTag(item.id, i)}
                        style={{width: '23px'}}
                      />
                    </div>
                  ))}
                  {tags?.map((tag, index) => {
                    return (
                      <div key={index} className='tag'>
                        {tag}

                        <img
                          src={deleteIcon}
                          alt=''
                          className='d-inline ps-2 cursor-pointer'
                          onClick={() => removeTag(tag, index)}
                          style={{width: '23px'}}
                        />
                        {/* <span >X</span> */}
                      </div>
                    )
                  })}

                  <input
                    placeholder={`${
                      tags?.length < 1 ? 'Enter tags with comma separator or press enter' : ''
                    }`}
                    onKeyDown={addTag}
                  />
                </div>
              </div>
              {/* {tagsValidation ? <div className='biz_owner_input_validation'>Enter tags</div> : null} */}
            </div>
            <div className=' mt-7 col-12 '>
              <label className='d-flex align-items-center  fw-bold form-label mb-2'>
                <span className='required'>Business content</span>
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {
                  setBusinessContentValidation(false)
                }}
              />
              {businessContentValidation ? (
                <div className='biz_owner_input_validation'>Enter business content</div>
              ) : null}
            </div>
            <div className=' mt-7 col-12 financing '>
              {financing == 1 ? (
                <input
                  className='form-check-input me-2 cursor-pointer'
                  type='checkbox'
                  checked={true}
                  /* eslint-disable jsx-a11y/anchor-is-valid */
                  id='Financing'
                  onChange={(e) => financingHandler(e.target.checked)}
                />
              ) : (
                <input
                  className='form-check-input me-2 cursor-pointer'
                  type='checkbox'
                  checked={false}
                  id='Financing'
                  onChange={(e) => financingHandler(e.target.checked)}
                />
              )}
              <label htmlFor='Financing' className='  fw-bold form-label mb-2 cursor-pointer'>
                Seller financing available
              </label>
            </div>
            <div className=' col-12 mx-auto d-flex justify-content-between my-10'>
              <button className='btn btn-primary ' onClick={detailStepBack4}>
                Back
              </button>

              {isContinue == true ? (
                <span className='btn btn-primary'>
                  <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
                </span>
              ) : (
                <button className='btn btn-primary ' onClick={(e) => detailInformationStep4(e)}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
      <Modal size='md' isOpen={calenderModel} centered={true} toggle={null}>
        <ModalHeader toggle={() => setCalenderModel(!calenderModel)} className='py-4'>
          Select Date
        </ModalHeader>
        <ModalBody className='d-flex justify-content-center'>
          <Calendar
            onChange={onChangeDate}
            defaultValue={new Date(establishedAt)}
            maxDate={new Date(calenderMaxDate)}
          />
        </ModalBody>
        <ModalFooter className='py-3'>
          {/* <div className='text-end'>
            <Button color='secondary' onClick={() => setCalenderModel(!calenderModel)}>
              Cancel
            </Button>
          </div> */}
          <div className='text-end'>
            <Button type='button' color='primary' onClick={() => setCalenderModel(!calenderModel)}>
              OK
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal size='md' isOpen={calenderModelExp} centered={true} toggle={null}>
        <ModalHeader toggle={() => setCalenderModelExp(!calenderModelExp)}>Select Date</ModalHeader>
        <ModalBody className='d-flex justify-content-center'>
          <Calendar onChange={onChangeDateExp} value={date} minDate={new Date()} />
        </ModalBody>
        <ModalFooter>
          {/* <div className='text-end'>
            <Button color='secondary' onClick={() => setCalenderModelExp(!calenderModelExp)}>
              Cancel
            </Button>
          </div> */}
          <div className='text-end'>
            <Button
              type='button'
              color='primary'
              onClick={() => setCalenderModelExp(!calenderModelExp)}
            >
              OK
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DetailInformation
