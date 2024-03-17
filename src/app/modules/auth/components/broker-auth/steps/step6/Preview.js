// import React, {useState, useEffect} from 'react'
// import './Preview.css'

// import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
// import {useNavigate, useParams} from 'react-router-dom'
// import {
//   getSingleBusinessesListings,
//   finalUploadStep,
// } from '../../../../../services/business-services/index'
// import ButtonLoader from '../../../../../../assets/Loader/ButtonLoader.gif'

// const Preview = (props) => {
//   const navigate = useNavigate()

//   const [data, setData] = useState(props.listingObj)
//   const [planPreview, setPlanPreview] = useState(props.choosePlanObj)
//   const [billPreview, setBillPreview] = useState(props.billingObj)
//   const [detailsPreview, setDetailsPreview] = useState(props.detailObj)
//   const [imagesPreview, setImagesPreview] = useState(props.imagesObj)
//   const [previewBack, setPreviewBack] = useState(4)
//   const [loaderScreen, setLoaderScreen] = useState(false)
//   const userData = localStorage.getItem('userData')
//   const transformedData = JSON?.parse(userData || '')
//   const {accessToken} = transformedData
//   const getBusinessID = localStorage.getItem('businessID')

//   const transformedBusinessID = JSON?.parse(getBusinessID !== 'undefined' ? getBusinessID : '')
//   const {businessID} = transformedBusinessID ?? ''

//   const [previewData, setPreviewData] = useState('')
//   const [isContinue, setIsContinue] = useState(false)
//   const previewStepBack = () => {
//     props.previewStepBack(previewBack)
//   }
//   useEffect(() => {
//     getPreviewBusinessData()
//   }, [])
//   const {biz_id} = useParams()
//   const getPreviewBusinessData = async () => {
//     try {
//       let selectedBizID
//       if (businessID) {
//         console.log('fayyyyyyyyaz', businessID)
//         selectedBizID = businessID
//       } else if (biz_id) {
//         console.log('biz_id', biz_id)
//         selectedBizID = biz_id
//       }
//       console.log('biz_id', biz_id, businessID)
//       setLoaderScreen(true)
//       const result = await getSingleBusinessesListings(accessToken, selectedBizID)
//       if (result.status == true) {
//         setPreviewData(result.business)
//         setLoaderScreen(false)
//         console.log('yes this one is for previewData', result.business)
//       } else {
//         setLoaderScreen(false)
//         console.log('error in preview screen', result)
//       }
//     } catch (e) {
//       setLoaderScreen(false)
//       console.log('error in preview screen', e)
//     }
//   }
//   function UnsafeComponent({html}) {
//     return <div dangerouslySetInnerHTML={{__html: html}} />
//   }

//   const uploadListings = async (e) => {
//     e.preventDefault()
//     try {
//       let selectedFBizID
//       if (businessID) {
//         selectedFBizID = businessID
//       } else if (biz_id) {
//         selectedFBizID = biz_id
//       }
//       setIsContinue(true)
//       const result = await finalUploadStep(selectedFBizID, accessToken)
//       if (result.status == true) {
//         setIsContinue(false)
//         localStorage.removeItem('businessID')
//         navigate('/dashboard/my-listings')
//       } else {
//         setIsContinue(false)
//         console.log('error in finalUploadStep', result)
//       }
//     } catch (e) {
//       setIsContinue(false)
//       console.log('catch error in finalUploadStep', e)
//     }
//   }
//   console.log('previewData', previewData)
//   return (
//     <>
//       {!loaderScreen ? (
//         <div className='container'>
//           <div className='row px-md-10'>
//             <div className='mx-2  my-5'>
//               <h4 className='biz-owner-business-detail-heading-preview mb-0 text-wrap'>
//                 {previewData?.title ?? 'NaN'}
//               </h4>
//               <h6 className=' mb-0 pt-3'>
//                 {/* <img src={location} alt='' className='biz-owner-location-icon ' /> */}
//                 {previewData?.location?.lat ? (
//                   previewData?.location.formatted_address
//                 ) : (
//                   <>
//                     {previewData?.location?.country ?? ''},{previewData?.location?.city ?? ''},
//                     {/* {previewData?.location?.address ?? ''} */}
//                   </>
//                 )}

//                 {/* {previewData.location ?? 'Nan'} */}
//               </h6>
//             </div>
//             {/* carousel         */}
//             <div
//               id='carouselExampleCaptions'
//               className='carousel biz-owner-preview-carousel slide position-relative'
//               data-bs-ride='carousel'
//             >
//               <div className='carousel-inner w-100 h-100'>
//                 {previewData?.slider_images?.length > 0
//                   ? previewData?.slider_images?.map((item, ind) => (
//                       <div className={`carousel-item h-100 ${ind == 0 ? 'active' : ''} `}>
//                         <img
//                           src={item?.full_path + item?.file_name}
//                           className='d-block w-100 h-100 img-fluid'
//                           alt='...'
//                         />
//                       </div>
//                     ))
//                   : null}

//                 {/* <div className='carousel-item active'>
//                   <img
//                     src={detail}
//                     className='d-block w-100 biz-owner-detail-carousel-img'
//                     alt='...'
//                   />
//                 </div>
//                 <div className='carousel-item'>
//                   <img
//                     src='https://images.bizbuysell.com/shared/listings/198/1981969/4e0fcf0f-05dd-412a-a72b-e7ebf0e37479-W768.jpg'
//                     className='d-block w-100 biz-owner-detail-carousel-img'
//                     alt='...'
//                   />
//                 </div>
//                 <div className='carousel-item'>
//                   <img
//                     src='https://images.bizbuysell.com/shared/listings/195/1951559/2d34d055-d2bf-4ade-b700-428ba96501f0-W768.jpg'
//                     className='d-block w-100 biz-owner-detail-carousel-img'
//                     alt='...'
//                   />
//                 </div> */}
//               </div>
//               {previewData?.slider_images?.length > 1 ? (
//                 <>
//                   <button
//                     className='carousel-control-prev biz-owner-carousel-btn-images my-auto'
//                     type='button'
//                     data-bs-target='#carouselExampleCaptions'
//                     data-bs-slide='prev'
//                   >
//                     <span
//                       className='carousel-control-prev-icon detail-page-carousel-btn biz-owner-detail-carousel-left-btn'
//                       aria-hidden='true'
//                     />
//                     <span className='visually-hidden'>Previous</span>
//                   </button>
//                   <button
//                     className='carousel-control-next biz-owner-carousel-btn-images my-auto'
//                     type='button'
//                     data-bs-target='#carouselExampleCaptions'
//                     data-bs-slide='next'
//                   >
//                     <span
//                       className='carousel-control-next-icon detail-page-carousel-btn'
//                       aria-hidden='true'
//                     />
//                     <span className='visually-hidden'>Next</span>
//                   </button>
//                 </>
//               ) : null}
//             </div>
//             {/* <div className='pt-10'>ddddd</div> */}
//           </div>
//           <div className='row mt-3 px-md-10 pt-7  '>
//             <div className='col-md-3  '>
//               <h2 className='my-auto'>Asking Price</h2>
//             </div>
//             <div className='mt-3 col-md-3 mt-md-0'>
//               <h3 className='biz-owner-detail-price-preview my-auto pe-20'>
//                 <span className='mx-md-2 '>{previewData?.asking_price ?? 'NaN'}</span>
//               </h3>
//             </div>

//             <div className='ps-md-10 col-md-3'>
//               <h2 className='my-auto'>Cash Flow</h2>
//             </div>
//             <div className='mt-3 col-md-3 mt-md-0'>
//               <h3 className='biz-owner-detail-price-preview my-auto'>
//                 <span className='mx-md-2 '>{previewData?.cash_flow ?? 'Nan'}</span>
//               </h3>
//             </div>
//           </div>
//           <div className='row mt-3 px-md-10  pt-3  '>
//             <div className='col-md-3 '>
//               <h5 className='my-auto business-preview-table'>Gross Revenue:</h5>
//             </div>
//             <div className='mt-3 col-md-3 mt-md-0'>
//               <h6 className='biz-owner-detail-price-preview my-auto pe-20'>
//                 <span className='mx-md-2 business-preview-table'>
//                   {previewData?.gross_revenue ?? 'NaN'}
//                 </span>
//               </h6>
//             </div>

//             <div className='ps-md-10 col-md-3'>
//               <h5 className='my-auto business-preview-table'>Inventory:</h5>
//             </div>
//             <div className='mt-3 col-md-3 mt-md-0'>
//               <h6 className='biz-owner-detail-price-preview my-auto'>
//                 <span className='mx-md-2 business-preview-table'>
//                   {previewData?.business_meta?.inventory ?? 'NaN'}
//                 </span>
//               </h6>
//             </div>
//           </div>
//           <div className='row mt-3 px-md-10 pt-3  '>
//             <div className='col-md-3  '>
//               <h5 className='my-auto business-preview-table'>EBITDA:</h5>
//             </div>
//             <div className='mt-3 col-md-3 mt-md-0'>
//               <h6 className='biz-owner-detail-price-preview my-auto pe-20'>
//                 <span className='mx-md-2 business-preview-table'>
//                   {previewData?.business_meta?.ebitda ?? 'NaN'}
//                 </span>
//               </h6>
//             </div>
//             <div className='ps-md-10 col-md-3'>
//               <h5 className='my-auto business-preview-table'>Established:</h5>
//             </div>
//             <div className='mt-3 col-md-3 mt-md-0'>
//               <h6 className='biz-owner-detail-price-preview my-auto'>
//                 <span className='mx-md-2 business-preview-table'>
//                   {' '}
//                   {previewData?.established_at ?? 'NaN'}
//                 </span>
//               </h6>
//             </div>

//           </div>
//           {previewData?.description != null &&
//           previewData?.description != undefined &&
//           previewData?.description != 'null' &&
//           previewData?.description != 'undefined' ? (
//             <div className='row px-md-10 mt-8 '>
//               <div className='card biz-owner-decription-preview '>
//                 <div className='card-header border-2 px-0  pt-5 mt-2 '>
//                   <h3 className=''>Business Description</h3>
//                 </div>
//                 <p className='py-5 px-0 biz-owner-paragraph-preview'>
//                   <UnsafeComponent html={previewData?.description ?? 'NaN'} />
//                 </p>
//               </div>
//             </div>
//           ) : null}

//           <div className='row px-md-10'>
//             <div className='card biz-owner-decription-preview '>
//               <div className='card-header border-2 px-0 d-block pt-5 my-2 '>
//                 <h3 className=' pb-5 '>Detailed Information</h3>
//               </div>

//               <div className='py-3 px-0'>
//                 <div className='row'>
//                   {previewData?.location?.country != null &&
//                   previewData?.reviewData?.location?.country != undefined &&
//                   previewData?.reviewData?.location?.country != 'undefined' &&
//                   previewData?.reviewData?.location?.country != '' &&
//                   previewData?.reviewData?.location?.country != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Location:{' '}
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.location?.country ?? ''}
//                       </div>
//                     </>
//                   ) : null}

//                   {previewData?.real_estate_listing_type?.type != null &&
//                   previewData?.real_estate_listing_type?.type != undefined &&
//                   previewData?.real_estate_listing_type?.type != 'undefined' &&
//                   previewData?.real_estate_listing_type?.type != '' &&
//                   previewData?.real_estate_listing_type?.type != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Real Estate:{' '}
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.real_estate_listing_type?.type ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.building_sf != null &&
//                   previewData?.business_meta?.building_sf != undefined &&
//                   previewData?.business_meta?.building_sf != 'undefined' &&
//                   previewData?.business_meta?.building_sf != '' &&
//                   previewData?.business_meta?.building_sf != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Building SF:{' '}
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.building_sf ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.lease_expiration != null &&
//                   previewData?.business_meta?.lease_expiration != undefined &&
//                   previewData?.business_meta?.lease_expiration != 'undefined' &&
//                   previewData?.business_meta?.lease_expiration != '' &&
//                   previewData?.business_meta?.lease_expiration != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Lease Expiration:{' '}
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.lease_expiration ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.total_employees != null &&
//                   previewData?.business_meta?.total_employees != undefined &&
//                   previewData?.business_meta?.total_employees != 'undefined' &&
//                   previewData?.business_meta?.total_employees != '' &&
//                   previewData?.business_meta?.total_employees != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Employees:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.total_employees ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.listing_type?.slug != null &&
//                   previewData?.listing_type?.slug != undefined &&
//                   previewData?.listing_type?.slug != 'undefined' &&
//                   previewData?.listing_type?.slug != '' &&
//                   previewData?.listing_type?.slug != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Listing Type:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.listing_type?.slug ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.location_visibitiy?.name != null &&
//                   previewData?.location_visibitiy?.name != undefined &&
//                   previewData?.location_visibitiy?.name != 'undefined' &&
//                   previewData?.location_visibitiy?.name != '' &&
//                   previewData?.location_visibitiy?.name != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Location Visibility:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.location_visibitiy?.name ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.industry?.name != null &&
//                   previewData?.industry?.name != undefined &&
//                   previewData?.industry?.name != 'undefined' &&
//                   previewData?.industry?.name != '' &&
//                   previewData?.industry?.name != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Industry:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.industry.name ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}

//                   {previewData?.business_meta?.facilities != null &&
//                   previewData?.business_meta?.facilities != undefined &&
//                   previewData?.business_meta?.facilities != 'undefined' &&
//                   previewData?.business_meta?.facilities != '' &&
//                   previewData?.business_meta?.facilities != 'null' ? (
//                     <>
//                       <div className='col-md-4  my-3 biz-owner-detail-para-heading-preview '>
//                         Facilities:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.facilities ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.competition != null &&
//                   previewData?.business_meta?.competition != undefined &&
//                   previewData?.business_meta?.competition != 'undefined' &&
//                   previewData?.business_meta?.competition != '' &&
//                   previewData?.business_meta?.competition != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Competition:{' '}
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.competition ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.growth_expansion != null &&
//                   previewData?.business_meta?.growth_expansion != undefined &&
//                   previewData?.business_meta?.growth_expansion != 'undefined' &&
//                   previewData?.business_meta?.growth_expansion != '' &&
//                   previewData?.business_meta?.growth_expansion != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Growth & Expansion:{' '}
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.growth_expansion ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.support_training != null &&
//                   previewData?.business_meta?.support_training != undefined &&
//                   previewData?.business_meta?.support_training != 'undefined' &&
//                   previewData?.business_meta?.support_training != '' &&
//                   previewData?.business_meta?.support_training != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Support & Training:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.support_training ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.business_meta?.reason_for_selling != null &&
//                   previewData?.business_meta?.reason_for_selling != undefined &&
//                   previewData?.business_meta?.reason_for_selling != 'undefined' &&
//                   previewData?.business_meta?.reason_for_selling != '' &&
//                   previewData?.business_meta?.reason_for_selling != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Reason for Selling:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.business_meta?.reason_for_selling ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.tags?.length ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Tags:
//                       </div>
//                       <div className='col-md-8  my-3 biz-owner-paragraph'>
//                         {previewData?.tags.map((item, index) => (
//                           <span className='mx-3'>{item?.name ?? 'NaN'} </span>
//                         ))}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.phone != null &&
//                   previewData?.phone != undefined &&
//                   previewData?.phone != 'undefined' &&
//                   previewData?.phone != '' &&
//                   previewData?.phone != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Phone:
//                       </div>
//                       <div className='col-md-8 my-3 biz-owner-paragraph'>
//                         {previewData?.phone ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}
//                   {previewData?.email != null &&
//                   previewData?.email != 'undefined' &&
//                   previewData?.email != undefined &&
//                   previewData?.email != '' &&
//                   previewData?.email != 'null' ? (
//                     <>
//                       <div className='col-md-4 my-3 biz-owner-detail-para-heading-preview '>
//                         Email Address:
//                       </div>
//                       <div className='col-md-8 col-7 my-3 biz-owner-paragraph'>
//                         {previewData?.email ?? ''}{' '}
//                       </div>
//                     </>
//                   ) : null}

//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className='row mt-10 px-md-10  py-5'>
//             <div className='card biz-owner-decription-preview '>
//               <div className=' px-0 d-block pt-4 my-2 '>
//                 <h3 className=' '>
//                   <span className='pe-1'>
//                   </span>{' '}
//                   Business Location
//                 </h3>
//               </div>
//               {previewData?.location?.lat ? (
//                 <div className='py-5 px-0 mx-auto w-100'>
//                   <iframe
//                     src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU&q=${previewData?.location.lat},${previewData?.location.lng}`}
//                     className='w-100 biz-owner-preview-map'

//                     allowfullscreen=''
//                     loading='lazy'
//                     referrerPolicy='no-referrer-when-downgrade'
//                   ></iframe>
//                 </div>
//               ) : (
//                 <>
//                   {previewData?.location?.country ?? ''},{previewData?.location?.city ?? ''},
//                   {previewData?.location?.address ?? ''}
//                 </>
//               )}

//             </div>
//           </div>
//           <div className='row px-md-10'>
//             <div className='  d-flex justify-content-between my-10'>
//               <button className='btn btn-primary ' onClick={previewStepBack}>
//                 Back
//               </button>
//               {isContinue == true ? (
//                 <span className='btn btn-primary'>
//                   <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
//                 </span>
//               ) : (
//                 <button className='btn btn-primary' onClick={(e) => uploadListings(e)}>
//                   Upload
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className='d-flex justify-content-center align-items-top' style={{height: '100vh'}}>
//           <div>
//             <img src={MainScreenLoader} alt="BizOwnerSell" width="80" height="80" />
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Preview
import React from 'react'

const Preview = () => {
  return <div>Preview</div>
}

export default Preview
