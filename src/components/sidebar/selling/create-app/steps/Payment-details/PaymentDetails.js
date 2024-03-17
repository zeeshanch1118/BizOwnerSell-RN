import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import ButtonLoader from '../../../../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
import {getPaymentData, getBrokerPaymentData} from '../../../../../services/business-services'
import UnlockSubscription from '../../../../../unlock-subscription/UnlockSubscription'
import ChoosePlan from '../Step2/ChoosePlan'

const PaymentDetails = (props) => {
  const {biz_id} = useParams()
  const Navigate = useNavigate()
  const [btnLoader, setBtnLoader] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [payMentDetails, setPayMentDetails] = useState([])
  const userData = localStorage.getItem('userData')
  const listingType = localStorage.getItem('listingBtn')
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const [message, setMessage] = useState('')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const {role} = transformedData
  useEffect(() => {
    window.scrollTo(0, 0)
    getUserPaymentDetails()
  }, [])
  const getUserPaymentDetails = async (e) => {
    let type = listingType.toLowerCase()
    let ListingID
    if (biz_id !== undefined && biz_id !== null) {
      ListingID = biz_id
    } else if (listingType == 'franchise') {
      const franchiseType = localStorage.getItem('franchiseID')
      const franchise = JSON?.parse(franchiseType || '')
      const {franchiseID} = franchise
      ListingID = franchiseID
    } else if (listingType == 'Business') {
      const businessType = localStorage.getItem('businessID')
      const Business = JSON?.parse(businessType || '')
      const {businessID} = Business
      ListingID = businessID
    }
    setIsContinue(false)
    if (role == 'user') {
      try {
        const result = await getPaymentData(accessToken, biz_id, type)
        if (result.status == true) {
          console.log('result', result)
          setPayMentDetails(result?.subscription)
          setIsContinue(true)
        }
      } catch (error) {
        console.log('error on payment details', error)
      }
    } else if (role == 'broker' || role == 'agent') {
      try {
        const result = await getBrokerPaymentData(accessToken, ListingID, type)
        console.log('result', result)
        if (result.status == true) {
          setPayMentDetails(result?.subscription)
          setIsContinue(true)
        } else if (result.status == false) {
          if (result?.message) {
            setMessage(result?.message)
            setIsContinue(true)
          }
        }
      } catch (error) {
        console.log('error on payment details', error)
      }
    }
  }
  const paymentDetails = (e) => {
    e.preventDefault()
    setBtnLoader(true)
    props.PaymentDetailsStep()
  }
  const paymentDetailsStepBack = (e) => {
    e.preventDefault()
    props.paymentDetailsStepBack()
  }
  const dateFormateHandler = (createdAt) => {
    // let today = new Date(createdAt)
    // let date = new Intl.DateTimeFormat('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // }).format(today)
    var date = new Date(createdAt)
    var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0]
    return dateString
  }
  const updateModalTitle = (newTitle) => {
    if (newTitle == 'close') {
      setIsShowPackageModal(false)
    } else {
      setModalTitle(newTitle)
    }
  }
  const agentPackageUpdateMessage = (newTitle) => {
    const resultRemove = Swal.fire({
      allowOutsideClick: false,
      text: 'your are agent',
      icon: 'warning',
      confirmButtonColor: '#009ef7',

      confirmButtonText: 'Ok',
    })
  }
  return (
    <>
      {isShowPackageModal && role == 'broker' ? (
        <div className='p-3'>
          <UnlockSubscription
            updateModalTitle={updateModalTitle}
            paymentDetails={props.PaymentDetailsStep}
            forBroker={'ShowBrokerPackage'}
          />
        </div>
      ) : (
        <>
          {isContinue ? (
            <>
              {message !== '' && message !== undefined ? (
                <div className='px-md-10 mt-5' style={{height: '100vh'}}>
                  <div className='shadow-none p-12 mb-5 bg-light rounded w-50 mx-auto'>
                    <h3 className='text-center'>Upgrade Plan</h3>

                    <h6 className='d-inline mt-4 pt-5'>
                      {' '}
                      {role == 'agent'
                        ? 'You don’t have enough listing in your subscribed package, please contact your broker.'
                        : message}{' '}
                    </h6>

                    <div className='mt-10 d-flex justify-content-between'>
                      {role == 'agent' ? (
                        <button
                          type='btn'
                          className='btn btn-primary mx-auto'
                          onClick={() => Navigate('/dashboard/my-listings')}
                        >
                          Ok
                        </button>
                      ) : (
                        <>
                          <button
                            type='btn'
                            className='btn btn-secondary'
                            onClick={() => Navigate('/dashboard/my-listings')}
                          >
                            Later
                          </button>
                          <button
                            type='btn'
                            className='btn btn-primary'
                            onClick={(e) => {
                              e.preventDefault()
                              role == 'agent'
                                ? agentPackageUpdateMessage()
                                : setIsShowPackageModal(true)
                            }}
                          >
                            Click here
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='container ' style={{minHeight: '95vh'}}>
                  <div className='row ps-md-20  px-md-15 py-7'>
                    <div className='col-md-4 my-md-3'>
                      <h4>Package Title</h4>
                    </div>
                    <div className='col-md-8 my-md-3'>{payMentDetails?.name ?? 'NaN'}</div>
                    <div className='col-md-4 my-md-3'>
                      <h4>Price</h4>
                    </div>

                    <div className='col-md-8 my-md-3'>${payMentDetails?.price ?? 'NaN'}</div>
                    {payMentDetails?.created_at != null &&
                    payMentDetails?.created_at != undefined ? (
                      <>
                        <div className='col-md-4 my-md-3'>
                          <h4>Start Date</h4>
                        </div>

                        <div className='col-md-8 my-md-3'>
                          {payMentDetails?.created_at != null &&
                          payMentDetails?.created_at != undefined
                            ? dateFormateHandler(payMentDetails?.created_at) ?? ''
                            : 'NaN'}

                          {/* {payMentDetails?.start_at ?? 'NaN'} */}
                        </div>
                      </>
                    ) : null}

                    {payMentDetails?.expire_at != null && payMentDetails?.expire_at != undefined ? (
                      <>
                        <div className='col-md-4 my-md-3'>
                          <h4>Expiry Date</h4>
                        </div>

                        <div className='col-md-8 my-md-3'>
                          {payMentDetails?.expire_at != null &&
                          payMentDetails?.expire_at != undefined
                            ? dateFormateHandler(payMentDetails?.expire_at) ?? ''
                            : 'NaN'}

                          {/* {payMentDetails?.exprie_at ?? 'NaN'} */}
                        </div>
                      </>
                    ) : null}

                    <div className='col-md-4 my-md-3'>
                      <h4>Duration</h4>
                    </div>

                    <div className='col-md-8 my-md-3'>{payMentDetails?.duration ?? 'NaN'}</div>
                    {role == 'broker' || role == 'agent' ? (
                      <>
                        <div className='col-md-4 my-md-3'>
                          <h4>Allowed Listings</h4>
                        </div>
                        <div className='col-md-8 my-md-3'>
                          {payMentDetails?.subscription_feature_value?.length > 0 &&
                            payMentDetails?.subscription_feature_value?.map((item, index) =>
                              item?.feature == '2' || item?.feature == 2 ? (
                                <span>{item?.total_value}</span>
                              ) : null
                            )}
                        </div>
                        <div className='col-md-4 my-md-3'>
                          <h4>Remaining Listings</h4>
                        </div>
                        <div className='col-md-8 my-md-3'>
                          {payMentDetails?.subscription_feature_value?.length > 0 &&
                            payMentDetails?.subscription_feature_value?.map((item, index) =>
                              item?.feature == '2' || item?.feature == 2 ? (
                                <span>
                                  {Number(item?.total_value) -
                                    (Number(item?.total_value) - Number(item?.value))}
                                </span>
                              ) : null
                            )}
                        </div>
                      </>
                    ) : null}

                    {role == 'user' && (
                      <>
                        {payMentDetails?.stripe_status != null &&
                        payMentDetails?.stripe_status != undefined ? (
                          <>
                            <div className='col-md-4 my-md-3'>
                              <h4>Status</h4>
                            </div>

                            <div className='col-md-8 my-md-3 '>
                              {payMentDetails?.stripe_status == 'active' ? (
                                <span className='badge badge-success'>
                                  {payMentDetails?.stripe_status ?? 'NaN'}
                                </span>
                              ) : (
                                <span className='badge badge-danger'>
                                  {payMentDetails?.stripe_status ?? 'NaN'}
                                </span>
                              )}
                            </div>
                          </>
                        ) : null}
                      </>
                    )}
                    {role == 'broker' || role == 'agent' ? (
                      <>
                        {payMentDetails?.stripe_status != null &&
                        payMentDetails?.stripe_status != undefined ? (
                          <>
                            <div className='col-md-4 my-md-3'>
                              <h4>Status</h4>
                            </div>

                            <div className='col-md-8 my-md-3 '>
                              {payMentDetails?.stripe_status == 'active' ? (
                                <span className='badge badge-success'>
                                  {payMentDetails?.stripe_status ?? 'NaN'}
                                </span>
                              ) : (
                                <span className='badge badge-danger'>
                                  {payMentDetails?.stripe_status ?? 'NaN'}
                                </span>
                              )}
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}

                    {payMentDetails?.package_details?.description != null &&
                    payMentDetails?.package_details?.description != undefined ? (
                      <>
                        <div className='col-md-4 my-md-3'>
                          <h4>Package Description</h4>
                        </div>

                        <div className='col-md-8 my-md-3'>
                          {payMentDetails?.package_details?.description ?? ''}
                        </div>
                      </>
                    ) : null}
                    {role == 'broker' && payMentDetails?.package_details?.features?.length > 0 ? (
                      <>
                        <div className='row mb-7'>
                          <div className='col-md-4 my-md-3'>
                            <h4> Features</h4>
                          </div>

                          <div className='col-md-8'>
                            <ul>
                              {payMentDetails?.package_details?.features?.map(
                                (item, index) =>
                                  item?.id != 2 && (
                                    <li className='mb-1 text-start ' key={index}>
                                      {item?.title ?? '---'}
                                    </li>
                                  )
                              )}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className='col-12 mx-auto d-flex justify-content-between pt-20'>
                      <button
                        className='btn btn-primary '
                        onClick={(e) => paymentDetailsStepBack(e)}
                      >
                        Back
                      </button>
                      <button className='btn btn-primary ' onClick={(e) => paymentDetails(e)}>
                        {btnLoader ? (
                          <span className=''>
                            <img
                              src={ButtonLoader}
                              className='mx-7'
                              alt=''
                              style={{height: '1.8rem'}}
                            />
                          </span>
                        ) : (
                          <span className=''>Continue</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{height: '100vh'}}
            >
              <div>
                <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
              </div>
            </div>
          )}
        </>
      )}

      {/* <Modal
        show={isShowPackageModal}
        size='xl'
        onHide={() => setIsShowPackageModal(!isShowPackageModal)}
      >
        <Modal.Header closeButton>
          {' '}
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
      </Modal> */}
    </>
  )
}

export default PaymentDetails
