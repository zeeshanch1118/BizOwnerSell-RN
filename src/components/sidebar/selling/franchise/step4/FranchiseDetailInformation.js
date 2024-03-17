import React, {useEffect, useState, useRef} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import Select from 'react-select'
import {useParams} from 'react-router-dom'
import Calendar from 'react-calendar'
import './detailinfo.css'
import Swal from 'sweetalert2'
import ButtonLoader from '../../../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../../../assets/Loader/MainScreenLoader.gif'
import '../../../../../components/BuyBizzOwner.css'
// import Tags from './Tags'
// import Content from './Content'
import {GoCalendar} from 'react-icons/go'
import './tags.css'
import {getRealEastType} from '../../../../services/get-fields-data/index'
import JoditEditor from 'jodit-react'
import './content.css'
import {
  updatefranchiseFourthStep,
  getSinglefranchises,
} from '../../../../services/franchise-services/index'
import 'react-calendar/dist/Calendar.css'
import {MdAddCircle, MdDelete} from 'react-icons/md'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
const config = {
  buttons: ['bold', 'italic', 'link', 'unlink', 'underline'],
}
const FranchiseDetailInformation = (props) => {
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const getFranchiseID = localStorage.getItem('franchiseID')
  const transformedFranchiseID = JSON?.parse(getFranchiseID)
  const {franchiseID} = transformedFranchiseID ?? ''
  const [recordedFranchiseID, setRecordedFranchiseID] = useState('')
  const {biz_id} = useParams()
  const [isContinue, setIsContinue] = useState(false)
  const [isShowYearCurrent, setIsShowYearCurrent] = useState(false)
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [establishedAt, setEstablishedAt] = useState('')
  const [netWorth, setNetWorth] = useState('')

  // const [tags, setTags] = useState('')
  const [businessContent, setBusinessContent] = useState('')
  const [realEstate, setRealEstate] = useState()
  // const [cashFlow, setCashFlow] = useState('')
  // const [grossRevenue, setGrossRevenue] = useState('')
  const [calenderModel, setCalenderModel] = useState(false)
  const [date, setDate] = useState('')
  const [totalInvesment, setTotalInvesment] = useState('')
  const [minfranchiseFee, setMinfranchiseFee] = useState('')
  const [royaltyFee, setRoyaltyFee] = useState('')
  const [AddFundFee, setAddFundFee] = useState('')
  const [totalFranchiseUnit, setTotalFranchiseUnit] = useState('')
  const [corporateHeadquater, setCorporateHeadquater] = useState('')
  const [ceoName, setCeoName] = useState('')
  const [titleValidation, setTitleValidation] = useState(false)
  const [loaderScreen, setLoaderScreen] = useState(false)
  const [allListings, setAllListings] = useState([])
  const [franchiseOverview, setFranchiseOverview] = useState('')
  const [year, setYear] = useState('')
  const [history, setHistory] = useState('')
  const [idealCandidate, setIdealCandidate] = useState('')
  const [trainingSupport, setTrainingSupport] = useState('')
  const [whyChoose, setWhyChoose] = useState('')
  const [aboutFranchise, setAboutFranchise] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [calenderMaxDate, setCalenderMaxDate] = useState('')
  const [overViewYearIndex, setOverViewYearIndex] = useState('')
  const [financing, setFinancing] = useState(0)
  const [franchiseInputToggler, setFranchiseInputToggler] = useState([])

  // validations
  const [priceValidation, setPriceValidation] = useState(false)
  const [establishedAtValidation, setEstablishedAtValidation] = useState(false)
  const [businessContentValidation, setBusinessContentValidation] = useState(false)
  const [realEstateValidation, setRealEstateValidation] = useState(false)
  const [totalInvesmentValidation, setTotalInvesmentValidation] = useState(false)
  const [minfranchiseFeeValidation, setMinfranchiseFeeValidation] = useState(false)
  const [royaltyFeeValidation, setRoyaltyFeeValidation] = useState(false)
  const [AddFundFeeValidation, setAddFundFeeValidation] = useState(false)
  const [totalFranchiseUnitValidation, setTotalFranchiseUnitValidation] = useState(false)
  const [corporateHeadquaterValidation, setCorporateHeadquaterValidation] = useState(false)
  const [ceoNameValidation, setCeoNameValidation] = useState(false)
  const [netWorthValidation, setNetWorthValidation] = useState(false)
  const [yearValidation, setYearValidation] = useState(false)
  const [companyOwnedValidation, setCompanyOwnedValidation] = useState(false)
  const [franchiseUnitValidation, setFranchiseUnitValidation] = useState(false)
  const [revenueValidation, setRevenueValidation] = useState(false)
  const [listingStatus, setListingStatus] = useState(null)
  const [showFranchiseOverviewValidation, setShowFranchiseOverviewValidation] = useState(false)

  const [shortDescriptionValidation, setShortDescriptionValidation] = useState(false)
  let franchiseOverViewValidation = null
  const today = new Date()
  const fullYear = today.getFullYear()
  useEffect(() => {
    var d = new Date()
    d.setMonth(d.getMonth() - 36)
    setCalenderMaxDate(d)
    RealEastType()
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (biz_id) {
      setRecordedFranchiseID(biz_id)
      getSingleBusiness(accessToken, biz_id)
    } else if (franchiseID) {
      setRecordedFranchiseID(franchiseID)
      getSingleBusiness(accessToken, franchiseID)
    }
  }, [biz_id, franchiseID])

  const getSingleBusiness = async (accessToken, ID) => {
    try {
      setLoaderScreen(true)
      const result = await getSinglefranchises(accessToken, ID)
      if (result.status === true) {
        setLoaderScreen(false)
        setPrice(result.franchise?.cash_required)
        // setEstablishedAt(result.franchise?.frenchise_since)
        setFinancing(result.franchise?.finance ?? 0)
        setListingStatus(result.franchise?.status)
        if (
          result.franchise?.frenchise_since !== null &&
          result.franchise?.frenchise_since !== 'null' &&
          result.franchise?.frenchise_since !== undefined &&
          result.franchise?.frenchise_since !== ''
        ) {
          setEstablishedAt(result.franchise?.frenchise_since)
        } else {
          var d = new Date()
          var year = d.setMonth(d.getMonth() - 36)
          var newDate = new Date(year)
          setEstablishedAt(newDate.toLocaleDateString('zh-Hans-CN'))
        }
        if (
          result.franchise?.net_worth_required !== undefined &&
          result.franchise?.net_worth_required !== 'null' &&
          result.franchise?.net_worth_required !== null
        ) {
          setNetWorth(result.franchise?.net_worth_required)
        }
        if (
          result.franchise?.total_investment !== undefined &&
          result.franchise?.total_investment !== 'null' &&
          result.franchise?.total_investment !== null
        ) {
          setTotalInvesment(result.franchise?.total_investment)
        }
        if (
          result.franchise?.min_frenchise_fee !== undefined &&
          result.franchise?.min_frenchise_fee !== null &&
          result.franchise?.min_frenchise_fee !== 'null'
        ) {
          setMinfranchiseFee(result.franchise?.min_frenchise_fee)
        }
        if (
          result.franchise?.royalty_fee !== undefined &&
          result.franchise?.royalty_fee !== null &&
          result.franchise?.royalty_fee !== 'null'
        ) {
          setRoyaltyFee(result.franchise?.royalty_fee)
        }
        if (
          result.franchise?.ad_fund_fee !== undefined &&
          result.franchise?.ad_fund_fee !== null &&
          result.franchise?.ad_fund_fee !== 'null'
        ) {
          setAddFundFee(result.franchise?.ad_fund_fee)
        }
        if (
          result.franchise?.total_frenchise_units !== undefined &&
          result.franchise?.total_frenchise_units !== 'null' &&
          result.franchise?.total_frenchise_units !== null
        ) {
          setTotalFranchiseUnit(result.franchise?.total_frenchise_units)
        }
        if (
          result.franchise?.corporate_headquarter !== undefined &&
          result.franchise?.corporate_headquarter !== 'null' &&
          result.franchise?.corporate_headquarter !== null
        ) {
          setCorporateHeadquater(result.franchise?.corporate_headquarter)
        }
        if (
          result.franchise?.ceo_name !== undefined &&
          result.franchise?.ceo_name !== null &&
          result.franchise?.ceo_name !== 'null'
        ) {
          setCeoName(result.franchise?.ceo_name)
        }
        if (
          result.franchise?.short_description !== undefined &&
          result.franchise?.short_description !== 'null' &&
          result.franchise?.short_description !== null
        ) {
          setShortDescription(result.franchise?.short_description)
        }
        if (
          result.franchise?.about !== undefined &&
          result.franchise?.about !== null &&
          result.franchise?.about !== 'null'
        ) {
          setAboutFranchise(result.franchise?.about)
        }
        if (
          result.franchise?.franchise_meta?.why_choose !== undefined &&
          result.franchise?.franchise_meta?.why_choose !== 'null' &&
          result.franchise?.franchise_meta?.why_choose !== null
        ) {
          setWhyChoose(result.franchise?.franchise_meta?.why_choose)
        }
        if (
          result.franchise?.franchise_meta?.training_support !== undefined &&
          result.franchise?.franchise_meta?.training_support !== 'null' &&
          result.franchise?.franchise_meta?.training_support !== null
        ) {
          setTrainingSupport(result.franchise?.franchise_meta?.training_support)
        }
        if (
          result.franchise?.franchise_meta?.ideal_candidate !== undefined &&
          result.franchise?.franchise_meta?.ideal_candidate !== 'null' &&
          result.franchise?.franchise_meta?.ideal_candidate !== null
        ) {
          setIdealCandidate(result.franchise?.franchise_meta?.ideal_candidate)
        }
        if (
          result.franchise?.franchise_meta?.history !== undefined &&
          result.franchise?.franchise_meta?.history !== 'null' &&
          result.franchise?.franchise_meta?.history !== null
        ) {
          setHistory(result.franchise?.franchise_meta?.history)
        }

        if (result.franchise?.franchise_overview.length > 0) {
          setFranchiseInputToggler(result.franchise?.franchise_overview)
        } else {
          setFranchiseInputToggler([
            {
              year: '',
              company_owned: '',
              frenchise_units: '',
              total_units: '',
              revenue: '',
            },
          ])

          setYearValidation(true)
          setCompanyOwnedValidation(true)
          setFranchiseUnitValidation(true)
          setRevenueValidation(true)
        }

        setPriceValidation(false)
        setBusinessContentValidation(false)
        setEstablishedAtValidation(false)

        console.log('this data from api DetailInformation', result)
      }
    } catch (err) {
      setLoaderScreen(false)
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  const RealEastType = async () => {
    let mapRealEastType = []
    try {
      const result = await getRealEastType()
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

  const onChangeDateYear = async (e) => {
    const index = overViewYearIndex
    setYear(e.getFullYear())
    setIsShowYearCurrent(true)
    setFranchiseInputToggler((s) => {
      const newArr = s.slice()
      let year = e.getFullYear()
      newArr[index].year = year
      console.log(year)

      // newArr[index] = !yearValidation
      if (year != '' && year != undefined) {
        setYearValidation(false)
      } else {
        setYearValidation(true)
      }

      return newArr
    })
  }
  const onChangeDefaultDateYear = async (e) => {
    setYear('')
    setIsShowYearCurrent(false)
    const index = overViewYearIndex
    setYearValidation(false)
    if (year == null || year == '' || year == fullYear) {
      setFranchiseInputToggler((s) => {
        const newArr = s.slice()
        let year = fullYear
        newArr[index].year = year
        console.log(year)

        // newArr[index] = !yearValidation
        if (year != '' && year != undefined) {
          setYearValidation(false)
        } else {
          setYearValidation(true)
        }

        return newArr
      })
    }
  }
  const onChangeDate = async (e) => {
    setDate(e)
    setEstablishedAt(e.toLocaleDateString('zh-Hans-CN'))
    setEstablishedAtValidation(false)
  }
  const onInputChange = async (event, files) => {
    switch (event.target.name) {
      case 'title':
        await setTitle(event.target.value)

        break
      case 'price':
        await setPrice(event.target.value)
        setPriceValidation(false)
        break

      // case 'cash-flow':
      //   await setCashFlow(event.target.value)
      //   break
      // case 'grossRevenue':
      //   await setGrossRevenue(event.target.value)
      //   break
      case 'net-worth':
        await setNetWorth(event.target.value)
        setNetWorthValidation(false)

        break
      case 'franchise-overview':
        await setFranchiseOverview(event.target.value)

        break
      case 'history':
        await setHistory(event.target.value)

        break
      case 'ideal-candidate':
        await setIdealCandidate(event.target.value)
        break
      case 'training-support':
        await setTrainingSupport(event.target.value)

        break
      case 'why-choose':
        await setWhyChoose(event.target.value)

        break
      case 'about-franchise':
        await setAboutFranchise(event.target.value)

        break
      case 'short-description':
        await setShortDescription(event.target.value)
        setShortDescriptionValidation(false)

        break

      //
      //

      case 'businessContent':
        await setBusinessContent(event.target.value)
        setBusinessContentValidation(false)
        break
      case 'total-investment':
        await setTotalInvesment(event.target.value)
        setTotalInvesmentValidation(false)
        break
      case 'min-franchise-fee':
        await setMinfranchiseFee(event.target.value)
        setMinfranchiseFeeValidation(false)
        break
      case 'royalty-fee':
        await setRoyaltyFee(event.target.value)
        setRoyaltyFeeValidation(false)
        break
      case 'add-fund-fee':
        await setAddFundFee(event.target.value)
        setAddFundFeeValidation(false)
        break
      case 'total-franchise-unit':
        await setTotalFranchiseUnit(event.target.value)
        setTotalFranchiseUnitValidation(false)
        break

      case 'corporate-headquater':
        await setCorporateHeadquater(event.target.value)
        setCorporateHeadquaterValidation(false)
        break
      case 'ceo-name':
        await setCeoName(event.target.value)
        setCeoNameValidation(false)
        break
    }
  }

  const detailInformationStep4 = async (e) => {
    e.preventDefault()
    setShowFranchiseOverviewValidation(true)

    if (price == '' || price == undefined) {
      setPriceValidation(true)
      window.scrollTo(0, 100)
    }
    if (establishedAt == '' || establishedAt == undefined) {
      setEstablishedAtValidation(true)
      window.scrollTo(0, 100)
    }
    if (netWorth == '' || netWorth == undefined) {
      setNetWorthValidation(true)
      window.scrollTo(0, 100)
    }
    if (totalInvesment == '' || totalInvesment == undefined) {
      setTotalInvesmentValidation(true)
      window.scrollTo(0, 100)
    }
    if (minfranchiseFee == '' || minfranchiseFee == undefined) {
      setMinfranchiseFeeValidation(true)
      window.scrollTo(0, 100)
    }
    if (royaltyFee == '' || royaltyFee == undefined) {
      setRoyaltyFeeValidation(true)
      window.scrollTo(0, 100)
    }
    if (AddFundFee == '' || AddFundFee == undefined) {
      setAddFundFeeValidation(true)
      if (
        priceValidation == false &&
        establishedAtValidation == false &&
        totalInvesmentValidation == false &&
        minfranchiseFeeValidation == false &&
        royaltyFeeValidation == false
      ) {
        window.scrollTo(0, 20)
      }
    }
    if (totalFranchiseUnit == '' || totalFranchiseUnit == undefined) {
      setTotalFranchiseUnitValidation(true)
      if (
        priceValidation == false &&
        establishedAtValidation == false &&
        totalInvesmentValidation == false &&
        minfranchiseFeeValidation == false &&
        royaltyFeeValidation == false
      ) {
        window.scrollTo(0, 20)
      }
    }

    if (corporateHeadquater == '' || corporateHeadquater == undefined) {
      setCorporateHeadquaterValidation(true)
      if (
        priceValidation == false &&
        establishedAtValidation == false &&
        totalInvesmentValidation == false &&
        minfranchiseFeeValidation == false &&
        royaltyFeeValidation == false
      ) {
        window.scrollTo(0, 20)
      }
    }
    if (ceoName == '' || ceoName == undefined) {
      setCeoNameValidation(true)
      if (
        priceValidation == false &&
        establishedAtValidation == false &&
        totalInvesmentValidation == false
      ) {
        window.scrollTo(0, 400)
      }
    }
    if (shortDescription == '' || shortDescription == undefined) {
      setShortDescriptionValidation(true)
      if (
        priceValidation == false &&
        establishedAtValidation == false &&
        totalInvesmentValidation == false
      ) {
        window.scrollTo(0, 400)
      }
    }
    franchiseOverViewValidation = franchiseInputToggler.find(
      (obj) =>
        obj.year == '' ||
        obj.year == undefined ||
        obj.company_owned == '' ||
        obj.company_owned == undefined ||
        obj.frenchise_units == '' ||
        obj.frenchise_units == undefined ||
        obj.revenue == '' ||
        obj.revenue == undefined
    ) // { val: 2}

    if (franchiseOverViewValidation != undefined) {
      if (franchiseOverViewValidation.year == '' || franchiseOverViewValidation.year == undefined) {
        console.log(franchiseOverViewValidation)
      }
      // franchise-overView-validation
    }

    franchiseInputToggler.map((item, index) =>
      item.year != null && item.year != '' && item.year != undefined
        ? setYearValidation(false)
        : setYearValidation(true)
    )
    franchiseInputToggler.map((item, index) =>
      item.company_owned != null &&
      item.company_owned != '' &&
      item.company_owned != undefined &&
      item.company_owned.length > 1
        ? setCompanyOwnedValidation(false)
        : setCompanyOwnedValidation(true)
    )
    franchiseInputToggler.map((item, index) =>
      item.frenchise_units != null &&
      item.frenchise_units != '' &&
      item.frenchise_units != undefined &&
      item.frenchise_units.length > 1
        ? setFranchiseUnitValidation(false)
        : setFranchiseUnitValidation(true)
    )
    franchiseInputToggler.map((item, index) => {
      if (
        item.revenue != null &&
        item.revenue != '' &&
        item.revenue != undefined &&
        item.revenue > 1
      ) {
        setRevenueValidation(false)
      } else {
        setRevenueValidation(true)
      }
      // item.revenue != null && item.revenue != '' && item.revenue != undefined && item.revenue > 1
      //   ? setRevenueValidation(false)
      //   : setRevenueValidation(true)
    })

    if (
      price != '' &&
      establishedAt != undefined &&
      totalInvesment != '' &&
      totalInvesment != undefined &&
      minfranchiseFee != '' &&
      minfranchiseFee != undefined &&
      royaltyFee != '' &&
      royaltyFee != undefined &&
      AddFundFee != '' &&
      AddFundFee != undefined &&
      totalFranchiseUnit != '' &&
      totalFranchiseUnit != undefined &&
      corporateHeadquater != '' &&
      corporateHeadquater != undefined &&
      ceoName != '' &&
      ceoName != undefined &&
      netWorth != '' &&
      netWorth != undefined &&
      yearValidation == false &&
      companyOwnedValidation == false &&
      franchiseUnitValidation == false &&
      franchiseOverViewValidation == undefined &&
      // franchiseInputToggler[0].year != undefined &&

      yearValidation == false &&
      revenueValidation == false &&
      shortDescription != '' &&
      shortDescription != undefined &&
      companyOwnedValidation == false &&
      franchiseUnitValidation == false &&
      revenueValidation == false
    ) {
      setIsContinue(true)
      const result = await updatefranchiseFourthStep(
        price,
        establishedAt,
        recordedFranchiseID,
        totalInvesment,
        minfranchiseFee,
        royaltyFee,
        AddFundFee,
        totalFranchiseUnit,
        corporateHeadquater,
        ceoName,
        accessToken,
        /////////////
        netWorth,
        franchiseInputToggler,
        history,
        idealCandidate,
        trainingSupport,
        whyChoose,
        aboutFranchise,
        shortDescription,
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
    }
  }
  const detailStepBack4 = () => {
    props.detailStepBack4()
  }
  ///////////////////////////////////////////////////
  const addInput = async (e) => {
    setShowFranchiseOverviewValidation(false)
    setFranchiseInputToggler((s) => {
      return [
        ...s,
        {
          year: null,
          company_owned: null,
          frenchise_units: null,
          total_units: 0,

          revenue: null,
        },
      ]
    })
    setYearValidation(true)
    setCompanyOwnedValidation(true)
    setFranchiseUnitValidation(true)
    setRevenueValidation(true)
  }
  const removeRow = async (index) => {
    setFranchiseInputToggler(franchiseInputToggler.filter((item, i) => index !== i))
    setYearValidation(false)
    setCompanyOwnedValidation(false)
    setFranchiseUnitValidation(false)
    setRevenueValidation(false)
  }
  const handleChange = (e, inputYear) => {
    e.preventDefault()

    const index = e.target.id
    if (e.target.name == 'year') {
      setFranchiseInputToggler((s) => {
        const newArr = s.slice()
        let year = e.target.value
        newArr[index].year = year

        // newArr[index] = !yearValidation
        if (year.length > 0) {
          setYearValidation(false)
        } else {
          setYearValidation(true)
        }

        return newArr
      })
    } else if (e.target.name === 'company-owned') {
      if (inputYear !== '' && inputYear !== undefined && inputYear !== null) {
        setYearValidation(false)
      }
      setFranchiseInputToggler((s) => {
        const newArr = s.slice()
        let companyOwned = e.target.value
        newArr[index].company_owned = companyOwned
        if (companyOwned.length > 0) {
          setCompanyOwnedValidation(false)
        } else {
          setCompanyOwnedValidation(true)
        }
        return newArr
      })
    } else if (e.target.name === 'frenchise-unites') {
      if (inputYear !== '' && inputYear !== undefined && inputYear !== null) {
        setYearValidation(false)
      }
      setFranchiseInputToggler((s) => {
        const newArr = s.slice()
        let frenchiseUnits = e.target.value
        newArr[index].frenchise_units = frenchiseUnits
        if (frenchiseUnits.length > 0) {
          setFranchiseUnitValidation(false)
        } else {
          setFranchiseUnitValidation(true)
        }

        return newArr
      })
    } else if (e.target.name === 'revenue') {
      if (inputYear !== '' && inputYear !== undefined && inputYear !== null) {
        setYearValidation(false)
      }
      setShowFranchiseOverviewValidation(false)
      setFranchiseInputToggler((s) => {
        const newArr = s.slice()
        let revenue = e.target.value
        newArr[index].revenue = revenue
        if (revenue.length > 0) {
          setRevenueValidation(false)
        } else {
          setRevenueValidation(true)
        }
        return newArr
      })
    }
  }

  franchiseInputToggler.map(
    (item) => (item.total_units = Number(item.company_owned) * Number(item.frenchise_units))
  )
  const financingHandler = (e) => {
    if (e == true) {
      setFinancing(1)
    } else if (e == false) {
      setFinancing(0)
    }
  }

  /////////////////////////////////////////
  return (
    <>
      {!loaderScreen ? (
        <div className='container px-md-10 '>
          <div className='row mx-auto'>
            <div className='  col-md-6'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span className='required'>Required cash </span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Required Cash'
                name='price'
                value={price}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {priceValidation ? (
                <div className='biz_owner_input_validation'>Enter required cash</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7 mt-md-0'>
              <label className='d-flex align-items-center  fw-bold form-label '>
                <span className='required'>Franchise since</span>
              </label>
              <div
                onClick={() => setCalenderModel(true)}
                style={{cursor: 'pointer', backgroundColor: '#f3f7fb'}}
                className='py-3 rounded px-3 '
              >
                <div className='d-flex justify-content-between '>
                  <div
                    style={{color: '#5e6278', paddingTop: '3px', fontWeight: '500'}}
                    className=' font-weight-bold'
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
                <div className='biz_owner_input_validation'>Enter franchise since</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Net worth required</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Net Worth '
                name='net-worth'
                value={netWorth}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {netWorthValidation ? (
                <div className='biz_owner_input_validation'>Enter net worth</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Total investment</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter total Investment'
                name='total-investment'
                value={totalInvesment}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {totalInvesmentValidation ? (
                <div className='biz_owner_input_validation'>Enter total investment</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Min franchise fee</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Min Franchise Fee'
                name='min-franchise-fee'
                value={minfranchiseFee}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {minfranchiseFeeValidation ? (
                <div className='biz_owner_input_validation'>Enter min franchise fee</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Royalty fee</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Royalty Fee'
                name='royalty-fee'
                value={royaltyFee}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {royaltyFeeValidation ? (
                <div className='biz_owner_input_validation'>Enter royalty fee</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Add fund fee</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Add Fund Fee'
                name='add-fund-fee'
                value={AddFundFee}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {AddFundFeeValidation ? (
                <div className='biz_owner_input_validation'>Enter add fund fee</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Total franchise unit</span>
              </label>

              <input
                type='number'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Total Franchise Unit'
                name='total-franchise-unit'
                value={totalFranchiseUnit}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {totalFranchiseUnitValidation ? (
                <div className='biz_owner_input_validation'>Enter total franchise unit</div>
              ) : null}
            </div>

            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Corporate headquarter</span>
              </label>

              <input
                type='text'
                className='form-control form-control-solid pt-4'
                placeholder='Enter Corporate Headquarter'
                name='corporate-headquater'
                value={corporateHeadquater}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {corporateHeadquaterValidation ? (
                <div className='biz_owner_input_validation'>Enter corporate headquarter</div>
              ) : null}
            </div>
            <div className='  col-md-6 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>CEO Name</span>
              </label>

              <input
                type='text'
                className='form-control form-control-solid pt-4'
                placeholder='John Doe'
                name='ceo-name'
                value={ceoName}
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
              />
              {ceoNameValidation ? (
                <div className='biz_owner_input_validation'>Enter CEO name</div>
              ) : null}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Short description</span>
              </label>
              <textarea
                id='bizownersell'
                rows='4'
                cols='50'
                // placeholder='Enter Short Description'
                name='short-description'
                value={shortDescription}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {shortDescriptionValidation ? (
                <div className='biz_owner_input_validation'>Enter franchise description</div>
              ) : null}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>About franchise</span>
              </label>
              <textarea
                id='bizownersell'
                rows='4'
                cols='50'
                // placeholder='Enter About Franchise'
                name='about-franchise'
                value={aboutFranchise}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Why choose</span>
              </label>
              <textarea
                id='bizownersell'
                rows='4'
                cols='50'
                // placeholder='Enter Why Choose'
                name='why-choose'
                value={whyChoose}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Training support</span>
              </label>
              <textarea
                id='bizownersell'
                rows='4'
                cols='50'
                // placeholder='Enter Training Support'
                name='training-support'
                value={trainingSupport}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>Ideal candidate</span>
              </label>
              <textarea
                id='bizownersell'
                rows='4'
                cols='50'
                // placeholder='Ideal Candidate'
                name='ideal-candidate'
                value={idealCandidate}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label'>
                <span>History</span>
              </label>
              <textarea
                id='bizownersell'
                rows='4'
                cols='50'
                // placeholder='Enter History'
                name='history'
                value={history}
                onChange={(e) => onInputChange(e)}
                style={{minHeight: '30px'}}
              ></textarea>
              {/* {/ {priceValidation ? <div className='biz_owner_input_validation'>Enter price</div > : null} /} */}
            </div>
            <div className='  col-12 mt-7'>
              <label className='d-flex align-items-center  fw-bold form-label required'>
                <span>Franchise overview</span>
              </label>
              {franchiseInputToggler
                ? franchiseInputToggler.map((input, index) => (
                    <div className='col-12 mt-3 mt-md-7' key={index}>
                      <div className='modal fade ' tabIndex={-1} id={`kt_modal_${index}year`}>
                        <div className='modal-dialog modal-md'>
                          <div className='modal-content'>
                            <div className='modal-header p-3'>
                              <h5 className='modal-title ps-4'>Select year</h5>

                              <button
                                type='button'
                                className='btn-close me-1'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                              {/*end::Close*/}
                            </div>

                            <div className='modal-body p-8 d-flex justify-content-center'>
                              {input.year !== '' &&
                              input.year !== undefined &&
                              input.year !== null ? (
                                <Calendar
                                  onChange={onChangeDateYear}
                                  value={input.year}
                                  defaultActiveStartDate={input.year}
                                  maxDate={new Date()}
                                  maxDetail='decade'
                                />
                              ) : (
                                <Calendar
                                  onChange={onChangeDateYear}
                                  maxDate={new Date()}
                                  defaultValue={fullYear}
                                  defaultActiveStartDate={fullYear}
                                  maxDetail='decade'
                                />
                              )}
                            </div>
                            <div className='pb-5 px-7 d-flex justify-content-between'>
                              <button
                                type='button'
                                className='btn btn-light'
                                data-bs-dismiss='modal'
                              >
                                Close
                              </button>

                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => onChangeDefaultDateYear()}
                                data-bs-dismiss='modal'
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table className='table  '>
                        <thead className='franchise-over-view-table '>
                          <tr>
                            <th scope='col' className='py-0 '>
                              Year
                            </th>
                            <th scope='col' className='py-0 '>
                              Company owned
                            </th>
                            <th scope='col' className='py-0 '>
                              Franchise units
                            </th>
                            <th scope='col' className='py-0 '>
                              Total units
                            </th>
                            <th scope='col' className='py-0 '>
                              Revenue
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className='franchise-over-view-table-body'>
                            {/* <td>{val.productType}</td>
                        <td>{val.productName}</td> */}

                            <td className='px-0 pe-md-3'>
                              <input
                                type='number'
                                className='form-control form-control-solid cursor-pointer  '
                                name='year'
                                value={input.year}
                                // onChange={(e) => handleChange(e)}
                                data-bs-toggle='modal'
                                data-bs-target={`#kt_modal_${index}year`}
                                id={index}
                                placeholder='Year'
                                onClick={() => {
                                  console.log(input.year)
                                  setOverViewYearIndex(index), setYear(input.year)
                                }}
                                // onChange={(e) => setPrice(e.target.value)}
                                // disabled='disabled'
                              />
                              {showFranchiseOverviewValidation ? (
                                <>
                                  {(showFranchiseOverviewValidation == true && input.year == '') ||
                                  input.year == undefined
                                    ? franchiseOverViewValidation?.year == '' ||
                                      (franchiseOverViewValidation?.year == undefined && (
                                        <div className='biz_owner_input_validation'>Enter year</div>
                                      ))
                                    : null}
                                </>
                              ) : null}

                              {/* <button onClick={priceEdit}>Edit</button> */}
                            </td>
                            <td className='px-0 px-md-3'>
                              <input
                                className='form-control form-control-solid'
                                name='company-owned'
                                type='number'
                                value={input.company_owned}
                                onChange={(e) => handleChange(e, input.year)}
                                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                                id={index}
                                placeholder='Company Owned'
                                //   value=""
                                // onChange={(e) => setQuantity(e.target.value)}
                                // disabled='disabled'
                              ></input>
                              {showFranchiseOverviewValidation ? (
                                <>
                                  {(showFranchiseOverviewValidation == true &&
                                    input.company_owned == '') ||
                                  input.company_owned == undefined
                                    ? franchiseOverViewValidation?.company_owned == '' ||
                                      (franchiseOverViewValidation?.company_owned == undefined && (
                                        <div className='biz_owner_input_validation'>
                                          Enter company owned
                                        </div>
                                      ))
                                    : null}
                                </>
                              ) : null}
                            </td>
                            <td className='px-0 px-md-3'>
                              <input
                                className='form-control form-control-solid'
                                name='frenchise-unites'
                                id={index}
                                type='number'
                                onChange={(e) => handleChange(e, input.year)}
                                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                                value={input.frenchise_units}
                                placeholder='Franchise Units'

                                // onChange={(e) => setDiscount(e.target.value)}
                              ></input>
                              {showFranchiseOverviewValidation ? (
                                <>
                                  {(showFranchiseOverviewValidation == true &&
                                    input.frenchise_units == '') ||
                                  input.frenchise_units == undefined
                                    ? franchiseOverViewValidation?.frenchise_units == '' ||
                                      (franchiseOverViewValidation?.frenchise_units ==
                                        undefined && (
                                        <div className='biz_owner_input_validation'>
                                          Enter frenchise-units
                                        </div>
                                      ))
                                    : null}
                                </>
                              ) : null}
                            </td>
                            <td className='px-0 px-md-3'>
                              <input
                                className='form-control form-control-solid'
                                name='total-unites'
                                id={index}
                                type='number'
                                onChange={(e) => handleChange(e, input.year)}
                                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                                //   value=""
                                disabled
                                value={input.total_units}
                                // onChange={(e) => setDiscount(e.target.value)}
                              ></input>
                            </td>
                            <td className='px-0 px-md-3'>
                              <input
                                className='form-control form-control-solid'
                                name='revenue'
                                id={index}
                                type='number'
                                onChange={(e) => handleChange(e, input.year)}
                                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                                //   value=""
                                placeholder='Revenue'
                                value={input.revenue}

                                // onChange={(e) => setDiscount(e.target.value)}
                              ></input>
                              {showFranchiseOverviewValidation ? (
                                <>
                                  {(showFranchiseOverviewValidation && input.revenue == '') ||
                                  input.revenue == undefined
                                    ? franchiseOverViewValidation?.revenue == '' ||
                                      (franchiseOverViewValidation?.revenue == undefined && (
                                        <div className='biz_owner_input_validation'>
                                          Enter revenue
                                        </div>
                                      ))
                                    : null}
                                </>
                              ) : null}
                            </td>
                            {franchiseInputToggler.length > 1 && (
                              <td className='text-end'>
                                <MdDelete
                                  size={30}
                                  className='text-danger cursor-pointer'
                                  onClick={() => removeRow(index)}
                                />
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))
                : null}
              {yearValidation == false &&
                companyOwnedValidation == false &&
                franchiseUnitValidation == false &&
                revenueValidation == false && (
                  <span className='d-flex justify-content-end '>
                    <MdAddCircle
                      size={35}
                      color='#009ef7'
                      className='cursor-pointer'
                      onClick={(e) => {
                        addInput(e)
                        setYear('')
                        setShowFranchiseOverviewValidation(false)
                      }}
                    />
                  </span>
                )}
            </div>
            <div className=' mt-7 col-12 financing '>
              {financing == 1 ? (
                <input
                  className='form-check-input me-2 cursor-pointer'
                  type='checkbox'
                  checked={true}
                  id='financing'
                  onChange={(e) => financingHandler(e.target.checked)}
                />
              ) : (
                <input
                  className='form-check-input me-2 cursor-pointer'
                  type='checkbox'
                  checked={false}
                  id='financing'
                  onChange={(e) => financingHandler(e.target.checked)}
                />
              )}

              <label htmlFor='financing' className='cursor-pointer  fw-bold form-label mb-2'>
                Seller financing available
              </label>
            </div>
            <div className=' col-md-12 mx-auto d-flex justify-content-between my-10'>
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
          {/* <div className='row mx-auto mt-7'>
          <div className=' mb-9 col-12 '>
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
              <div className='biz_owner_input_validation'>Enter price</div>
            ) : null}
          </div>
        </div> */}
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
      <Modal size='md' isOpen={calenderModel} centered={true} toggle={null}>
        <ModalHeader toggle={() => setCalenderModel(!calenderModel)}>Select Date</ModalHeader>
        <ModalBody className='d-flex justify-content-center'>
          <Calendar
            onChange={onChangeDate}
            maxDate={new Date(calenderMaxDate)}
            defaultValue={new Date(establishedAt)}
          />
        </ModalBody>
        <ModalFooter>
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
    </>
  )
}

export default FranchiseDetailInformation
