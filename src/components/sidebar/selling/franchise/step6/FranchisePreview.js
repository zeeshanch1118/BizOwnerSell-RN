import React, {useState, useEffect} from 'react'
import {FaCircle} from 'react-icons/fa'
import './Preview.css'
import {useNavigate, useParams} from 'react-router-dom'
import ButtonLoader from '../../../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../../../assets/Loader/MainScreenLoader.gif'
import {getSinglefranchises, finalUploadStep} from '../../../../services/franchise-services/index'
import ReactApexChart from 'react-apexcharts'
import dollar from '../../../../../assets/icons/dollarIcon.svg'
import sellerFinancing from '../../../../../assets/icons/sellerFinancing.svg'

const FranchisePreview = (props) => {
  const navigate = useNavigate()
  const [isFranchiseUnits, setIsFranchiseUnits] = useState(true)
  const [isCompanyOwnedUnits, setIsCompanyOwnedUnits] = useState(false)
  const [companyOwned, setCompanyOwned] = useState('')
  const [frenchiseUnits, setFrenchiseUnits] = useState('')
  const [companyRevenue, setCompanyRevenue] = useState('')
  const [totalCompanyUnits, setTotalCompanyUnits] = useState('')
  const [companyYear, setCompanyYear] = useState('')
  const [data, setData] = useState(props.listingObj)
  const [planPreview, setPlanPreview] = useState(props.choosePlanObj)
  const [billPreview, setBillPreview] = useState(props.billingObj)
  const [detailsPreview, setDetailsPreview] = useState(props.detailObj)
  const [imagesPreview, setImagesPreview] = useState(props.imagesObj)
  const [previewBack, setPreviewBack] = useState(4)
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const [loaderScreen, setLoaderScreen] = useState(false)
  const {accessToken} = transformedData
  const getFranchiseID = localStorage.getItem('franchiseID')
  const transformedFranchiseID = JSON?.parse(getFranchiseID !== 'undefined' ? getFranchiseID : '')
  const {franchiseID} = transformedFranchiseID ?? ''
  const [previewData, setPreviewData] = useState('')
  const [isContinue, setIsContinue] = useState(false)
  const previewStepBack = () => {
    props.previewStepBack(previewBack)
  }
  useEffect(() => {
    getPreviewBusinessData()
  }, [])
  const getPreviewBusinessData = async () => {
    try {
      let selectedFrencID
      if (franchiseID) {
        console.log('fayyyyyyyyaz', franchiseID)
        selectedFrencID = franchiseID
      } else if (biz_id) {
        console.log('biz_id', biz_id)
        selectedFrencID = biz_id
      }
      setLoaderScreen(true)
      const result = await getSinglefranchises(accessToken, selectedFrencID)
      console.log('franchiseaa', result)

      if (result.status == true) {
        setPreviewData(result.franchise)
        let companyOwned = []
        let frenchiseUnits = []
        let revenue = []
        let totalUnits = []
        let year = []

        result.franchise?.franchise_overview?.map((item, index) => {
          companyOwned.push(item.company_owned)
          frenchiseUnits.push(item.frenchise_units)
          revenue.push(item.revenue)
          totalUnits.push(item.total_units)
          year.push(item.year)
        })
        setCompanyOwned(companyOwned)
        setFrenchiseUnits(frenchiseUnits)
        setCompanyRevenue(revenue)
        setTotalCompanyUnits(totalUnits)
        setCompanyYear(year)

        setLoaderScreen(false)

        console.log('yes this one is for previewData', result.franchise)
      } else {
        setLoaderScreen(false)
        console.log('error in preview screen', result)
      }
    } catch (e) {
      setLoaderScreen(false)
      console.log('error in preview screen', e)
    }
  }
  function UnsafeComponent({html}) {
    return <div dangerouslySetInnerHTML={{__html: html}} />
  }
  const {biz_id} = useParams()
  const uploadListings = async (e) => {
    e.preventDefault()
    try {
      let selectedFrencID
      if (franchiseID) {
        console.log('fayyyyyyyyaz', franchiseID)
        selectedFrencID = franchiseID
      } else if (biz_id) {
        console.log('biz_id', biz_id)
        selectedFrencID = biz_id
      }
      setIsContinue(true)

      const result = await finalUploadStep(selectedFrencID, previewData?.finance, accessToken)
      if (result.status == true) {
        setIsContinue(false)
        localStorage.removeItem('franchiseID')
        localStorage.removeItem('stepSkipAble')
        localStorage.removeItem('listingStatus')
        navigate('/dashboard/my-listings')
        // setPreviewData(result.business)
        // console.log('yes this one is finalUploadStep ', result)
      } else {
        setIsContinue(false)
        console.log('error in finalUploadStep', result)
      }
    } catch (e) {
      setIsContinue(false)
      console.log('catch error in finalUploadStep', e)
    }
  }
  const FranchiseUnitsState = {
    series: [
      {
        name: 'Franchise Units',
        data: frenchiseUnits,
      },
    ],

    options: {
      colors: ['#2962ff'],
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true,
        },
        toolbar: {
          show: false,
        },
        // foreColor: 'red'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          // colors: {
          //   backgroundBarColors: ['#f5f5f5'],
          // },
          barHeight: '80%',
        },
      },
      xaxis: {
        type: 'category',
        categories: companyYear,
      },
      yaxis: {
        show: true,
        showAlways: true,
        // tickAmount: 8,
        tooltip: {
          enabled: true,
          offsetX: 0,
        },
      },
    },
  }
  const CompanyOwnedUnitsState = {
    series: [
      {
        name: 'Company Owned Units',
        data: companyOwned,
      },
    ],
    options: {
      colors: ['#181C32'],
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true,
        },
        toolbar: {
          show: false,
        },
        // foreColor: 'red'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          // colors: {
          //   backgroundBarColors: ['#f5f5f5'],
          // },
          barHeight: '80%',
        },
      },
      xaxis: {
        type: 'category',
        categories: companyYear,
      },
      yaxis: {
        show: true,
        showAlways: true,
        // tickAmount: 8,
        tooltip: {
          enabled: true,
          offsetX: 0,
        },
      },
    },
  }
  return (
    <>
      {!loaderScreen ? (
        <div className='container'>
          <div className='row px-md-10 '>
            <div className='mx-2 my-5 ps-0'>
              <h4 className='biz-owner-business-detail-heading-preview mb-0 text-wrap'>
                {previewData?.title ?? 'NaN'}
              </h4>
              <h5 className='bizOwner-inner-bottom-heading mb-0'>
                {/* <img src={location} alt='' className='biz-owner-location-icon ' /> */}
                {previewData?.location?.lat ? (
                  previewData?.location.formatted_address
                ) : (
                  <>
                    {previewData?.location?.country ?? ''},{previewData?.location?.city ?? ''},
                    {previewData?.location?.address ?? ''}
                  </>
                )}
              </h5>
            </div>
            <div
              id='carouselExampleCaptions'
              className='carousel slide  position-relative'
              data-bs-ride='carousel'
            >
              {previewData?.finance == 1 && (
                <div className='badge-container'>
                  <img src={sellerFinancing} width='130px' alt='' />
                  {/* <span class='badge badge-success py-2'> Seller Financing Available</span> */}
                </div>
              )}
              <div className='carousel-inner inner-screen-carousel '>
                {previewData?.slider_images?.length > 0 ? (
                  previewData?.slider_images?.map((item, ind) => (
                    <div className={`carousel-item h-100  ${ind == 0 ? 'active' : ''} `} key={ind}>
                      <img
                        src={item?.full_path + 'large/' + item?.file_name}
                        className='d-block mx-auto img-fluid inner-screen-carousel-img'
                        alt='...'
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <div className='carousel-item active'>
                      <img
                        src='https://images.bizbuysell.com/shared/listings/198/1981969/4e0fcf0f-05dd-412a-a72b-e7ebf0e37479-W768.jpg'
                        className='d-block w-100 biz-owner-detail-carousel-img'
                        alt='...'
                      />
                    </div>
                  </>
                )}
              </div>
              {previewData?.slider_images?.length > 1 ? (
                <>
                  <button
                    className='carousel-control-prev biz-owner-carousel-btn-images my-auto'
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide='prev'
                  >
                    <span
                      className='carousel-control-prev-icon detail-page-carousel-btn biz-owner-detail-carousel-left-btn'
                      aria-hidden='true'
                    />
                    <span className='visually-hidden'>Previous</span>
                  </button>
                  <button
                    className='carousel-control-next biz-owner-carousel-btn-images my-auto'
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide='next'
                  >
                    <span
                      className='carousel-control-next-icon detail-page-carousel-btn'
                      aria-hidden='true'
                    />
                    <span className='visually-hidden'>Next</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className='row mt-3 px-md-10  pt-md-7  '>
            <div className='col-md-3  '>
              <h2 className='my-auto'>Price</h2>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h3 className='biz-owner-detail-price my-auto pe-20'>
                <span className='mx-md-0 '>
                  <img src={dollar} alt='' width={19} className='mb-1' />
                </span>
                <span className='mx-md-2 biz-owner-detail-price-preview'>
                  {previewData?.cash_required ?? 'NaN'}
                </span>
              </h3>
            </div>

            <div className='ps-md-10 col-md-3'>
              <h2 className='my-auto'>Investment</h2>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h3 className='biz-owner-detail-price my-auto biz-owner-detail-price-preview'>
                {/* <span className='mx-md-2 '>
                </span> */}
                <span className='mx-md-0 '>
                  <img src={dollar} alt='' width={19} className='mb-1' />
                </span>
                {previewData?.total_investment ?? 'Nan'}
              </h3>
            </div>
          </div>
          <div className='row mt-md-3 px-md-10  pt-md-7  '>
            <div className='col-md-3 '>
              <h5 className='my-auto business-preview-table'>Franchise Units:</h5>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h6 className='biz-owner-detail-price my-auto pe-20 business-preview-table biz-owner-detail-price-preview'>
                ${previewData?.total_frenchise_units ?? 'NaN'}
              </h6>
            </div>

            <div className='ps-md-10 col-md-3'>
              <h5 className='my-auto business-preview-table'> Royalty Fee:</h5>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h6 className='biz-owner-detail-price my-auto business-preview-table biz-owner-detail-price-preview'>
                ${previewData?.royalty_fee ?? 'NaN'}
              </h6>
            </div>
          </div>
          <div className='row mt-md-3 px-md-10  pt-md-7  '>
            <div className='col-md-3  '>
              <h5 className='my-auto business-preview-table'>Fund Fee:</h5>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h6 className='biz-owner-detail-price my-auto pe-20 business-preview-table biz-owner-detail-price-preview'>
                ${previewData?.ad_fund_fee ?? 'NaN'}
              </h6>
            </div>

            <div className='ps-md-10 col-md-3'>
              <h5 className='my-auto business-preview-table'>Net Worth :</h5>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h6 className='biz-owner-detail-price my-auto business-preview-table biz-owner-detail-price-preview'>
                ${previewData?.net_worth_required ?? 'NaN'}
              </h6>
            </div>
          </div>
          <div className='row mt-md-3 px-md-10  pt-md-7  '>
            <div className='col-md-3  '>
              <h5 className='my-auto business-preview-table'>Min Franchise Fee:</h5>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h6 className='biz-owner-detail-price my-auto pe-20 business-preview-table biz-owner-detail-price-preview'>
                ${previewData?.min_frenchise_fee ?? 'NaN'}
              </h6>
            </div>

            <div className='ps-md-10 col-md-3'>
              <h5 className='my-auto business-preview-table'>Franchise Since:</h5>
            </div>
            <div className=' col-md-3 mt-md-0'>
              <h6 className='biz-owner-detail-price my-auto business-preview-table biz-owner-detail-price-preview'>
                {/* <span className='mx-md-2 '>
                  {' '}
                </span> */}
                {previewData?.frenchise_since ?? 'NaN'}
              </h6>
            </div>
          </div>
          {previewData?.short_description != null &&
          previewData?.short_description != 'null' &&
          previewData?.short_description != undefined &&
          previewData?.short_description != 'undefined' &&
          previewData?.short_description != '' ? (
            <div className='row mt-3 px-md-10 '>
              <div className='card biz-owner-decription-preview'>
                <div className='card-header border-2 px-0  pt-10 mt-2 '>
                  <h3 className=''>Franchise Description</h3>
                </div>
                <p className='py-5 px-0 biz-owner-paragraph'>
                  <UnsafeComponent html={previewData?.short_description ?? 'NaN'} />
                </p>
              </div>
            </div>
          ) : null}

          {previewData?.franchise_meta != null &&
          previewData?.franchise_meta != 'null' &&
          previewData?.franchise_meta != undefined &&
          previewData?.franchise_meta != 'undefined' &&
          previewData?.franchise_meta != '' ? (
            <div className='row px-md-10 '>
              <div className='card biz-owner-decription-preview'>
                <div className='card-header border-2 px-0 d-block pt-10 my-2 '>
                  <h3 className=' pb-5 '>Detailed Information</h3>
                </div>

                <div className='py-3 px-0'>
                  <div className='row'>
                    {previewData?.location ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Location:{' '}
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.location?.country ?? ''}
                        </div>
                      </>
                    ) : null}

                    {previewData?.real_estate_listing_type != null &&
                    previewData?.real_estate_listing_type != 'null' &&
                    previewData?.real_estate_listing_type != undefined &&
                    previewData?.real_estate_listing_type != '' &&
                    previewData?.real_estate_listing_type != 'undefined' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Real Estate:{' '}
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.real_estate_listing_type?.type ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.ceo_name != null &&
                    previewData?.ceo_name != 'null' &&
                    previewData?.ceo_name != undefined &&
                    previewData?.ceo_name != '' &&
                    previewData?.ceo_name != 'undefined' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          CEO Name:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.ceo_name ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.created_at != null &&
                    previewData?.created_at != 'null' &&
                    previewData?.created_at != undefined &&
                    previewData?.created_at != 'undefined' &&
                    previewData?.created_at != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Created At:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.created_at ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.franchise_category?.name != null &&
                    previewData?.franchise_category?.name != 'null' &&
                    previewData?.franchise_category?.name != undefined &&
                    previewData?.franchise_category?.name != 'undefined' &&
                    previewData?.franchise_category?.name != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Franchise Category:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.franchise_category?.name ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.about != null &&
                    previewData?.about != 'null' &&
                    previewData?.about != undefined &&
                    previewData?.about != 'undefined' &&
                    previewData?.about != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          About:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.about ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.franchise_meta?.history != null &&
                    previewData?.franchise_meta?.history != 'null' &&
                    previewData?.franchise_meta?.history != undefined &&
                    previewData?.franchise_meta?.history != '' &&
                    previewData?.franchise_meta?.history != 'undefined' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          History:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.franchise_meta?.history ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.franchise_meta?.ideal_candidate != null &&
                    previewData?.franchise_meta?.ideal_candidate != 'null' &&
                    previewData?.franchise_meta?.ideal_candidate != undefined &&
                    previewData?.franchise_meta?.ideal_candidate != 'undefined' &&
                    previewData?.franchise_meta?.ideal_candidate != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Ideal Candidate:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.franchise_meta?.ideal_candidate ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.franchise_meta?.training_support != null &&
                    previewData?.franchise_meta?.training_support != 'null' &&
                    previewData?.franchise_meta?.training_support != undefined &&
                    previewData?.franchise_meta?.training_support != 'undefined' &&
                    previewData?.franchise_meta?.training_support != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Training Support:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.franchise_meta?.training_support ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.franchise_meta?.why_choose != null &&
                    previewData?.franchise_meta?.why_choose != 'null' &&
                    previewData?.franchise_meta?.why_choose != undefined &&
                    previewData?.franchise_meta?.why_choose != 'undefined' &&
                    previewData?.franchise_meta?.why_choose != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Why Choose:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.franchise_meta?.why_choose ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.corporate_headquarter != null &&
                    previewData?.corporate_headquarter != 'null' &&
                    previewData?.corporate_headquarter != undefined &&
                    previewData?.corporate_headquarter != 'undefined' &&
                    previewData?.corporate_headquarter != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Corporate Headquarters:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.corporate_headquarter ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.location_visibitiy?.name != null &&
                    previewData?.location_visibitiy?.name != 'null' &&
                    previewData?.location_visibitiy?.name != undefined &&
                    previewData?.location_visibitiy?.name != 'undefined' &&
                    previewData?.location_visibitiy?.name != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Location Visibility:
                        </div>
                        <div className='col-md-8 my-3 biz-owner-paragraph'>
                          {previewData?.location_visibitiy?.name ?? ''}{' '}
                        </div>
                      </>
                    ) : null}

                    {previewData?.phone != null &&
                    previewData?.phone != 'null' &&
                    previewData?.phone != undefined &&
                    previewData?.phone != 'undefined' &&
                    previewData?.phone != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Phone:
                        </div>
                        <div className='col-md-8 col-7 my-3 biz-owner-paragraph'>
                          {previewData?.phone ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                    {previewData?.email != null &&
                    previewData?.email != 'null' &&
                    previewData?.email != undefined &&
                    previewData?.email != 'undefined' &&
                    previewData?.email != '' ? (
                      <>
                        <div className='col-md-4 my-md-3 biz-owner-detail-para-heading-preview '>
                          Email Address:
                        </div>
                        <div className='col-md-8 col-7 my-3 biz-owner-paragraph'>
                          {previewData?.email ?? ''}{' '}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className='row px-md-10 mt-md-10  py-5'>
            <div className='card biz-owner-decription-preview'>
              <div className=' px-0 d-block pt-4 my-2 '>
                <h3 className=' '>
                  <span className='pe-1'>
                    {/* <img className='mb-1' src={businessLocation} alt='' width={17} /> */}
                  </span>{' '}
                  Franchise Location
                </h3>
              </div>
              {previewData?.location?.lat ? (
                <div className='py-5 px-0 mx-auto w-100'>
                  <iframe
                    title='iframe'
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU&q=${previewData?.location.lat},${previewData?.location.lng}`}
                    // src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU=${previewData?.location.formatted_address}`}
                    className='w-100 biz-owner-preview-map'
                    //   style={border:"1px"}

                    allowFullscreen=''
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </div>
              ) : (
                <>
                  <div className='d-flex'>
                    <span className='pe-1'>{previewData?.location?.address ?? ''},</span>
                    <span className='pe-1'>{previewData?.location?.city ?? ''},</span>
                    <span className='pe-1'>{previewData?.location?.country ?? ''}</span>
                  </div>
                </>
              )}

              {/* <div className='card-footer px-0'>
                    <h3 className='py23'>Attached Documents</h3>
                    <Link to='#'>
                      <span>
                        <img src={carbonIcon} alt='' className=' px-2 pb-1 ' />
                      </span>{' '}
                      Get lit 1 Page Summary p...
                    </Link>
                    <Link to='#' className='ms-10'>
                      <span>
                        <img src={carbonIcon} alt='' className=' px-2 pb-1 ' />
                      </span>{' '}
                      Get lit 1 Page Summary p...
                    </Link>
                  </div> */}
            </div>
          </div>
          <div className='row px-md-10 mt-md-10  py-5'>
            <div className='card biz-owner-decription-preview'>
              <div className=' px-0 d-block pt-4 my-2 '>
                <h3 className=' '>
                  <span className='pe-1'></span> Franchise Overview
                </h3>
              </div>
              <div>
                {isFranchiseUnits && (
                  <ReactApexChart
                    options={FranchiseUnitsState.options}
                    series={FranchiseUnitsState.series}
                    type='bar'
                    height={245}
                  />
                )}
                {isCompanyOwnedUnits && (
                  <ReactApexChart
                    options={CompanyOwnedUnitsState.options}
                    series={CompanyOwnedUnitsState.series}
                    type='bar'
                    height={245}
                  />
                )}

                <div className='d-flex justify-content-center '>
                  <p
                    className='mx-2 cursor-pointer'
                    onClick={() => {
                      setIsFranchiseUnits(true)
                      setIsCompanyOwnedUnits(false)
                    }}
                  >
                    {' '}
                    {isCompanyOwnedUnits ? (
                      <>
                        <span className='mx-2 '>
                          <FaCircle size={15} color={'#2962ff'} />
                        </span>
                        <s> Franchise Units</s>
                      </>
                    ) : (
                      <>
                        <span className='mx-2 '>
                          <FaCircle size={15} color={'#2962ff'} />
                        </span>{' '}
                        Franchise Units
                      </>
                    )}
                  </p>
                  <p
                    className='mx-2 cursor-pointer'
                    onClick={() => {
                      setIsCompanyOwnedUnits(true)
                      setIsFranchiseUnits(false)
                    }}
                  >
                    {' '}
                    {isFranchiseUnits ? (
                      <>
                        <span className='mx-2 '>
                          <FaCircle size={15} color={'#181C32'} />
                        </span>
                        <s>Company Owned Units</s>
                      </>
                    ) : (
                      <>
                        <span className='mx-2 '>
                          <FaCircle size={15} color={'#181C32'} />
                        </span>
                        Company Owned Units
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='row  px-md-10 '>
            {' '}
            <div className='  d-flex justify-content-between my-10'>
              <button className='btn btn-primary ' onClick={previewStepBack}>
                Back
              </button>
              {isContinue == true ? (
                <span className='btn btn-primary'>
                  <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
                </span>
              ) : (
                <button className='btn btn-primary' onClick={(e) => uploadListings(e)}>
                  Publish
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
    </>
  )
}

export default FranchisePreview
