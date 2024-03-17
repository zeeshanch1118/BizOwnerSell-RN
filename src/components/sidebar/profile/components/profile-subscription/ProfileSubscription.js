import React, {useEffect, useState} from 'react'
import {brokerSubscription, unsubscriptionPackage} from '../../../../services/profile-services'
import MainScreenLoader from '../../../../../assets/Loader/MainScreenLoader.gif'
import btnLoader from '../../../../../assets/Loader/ButtonLoader.gif'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
const tokenData = localStorage.getItem('userData')
const transtokenData = tokenData ? JSON.parse(tokenData) : ''
const {accessToken} = transtokenData
const {role} = transtokenData ?? ''
const ProfileSubscription = () => {
  const navigate = useNavigate()
  useEffect(() => {
    getBrokerSubscription()
  }, [])
  const [loader, setLoader] = useState(false)
  const [isBtnLoader, setBtnLoader] = useState(false)
  const [packageID, setPackageID] = useState('')
  const [packageStatus, setPackageStatus] = useState('')

  const [subscriptionData, setSubscriptionData] = useState([])
  const getBrokerSubscription = async () => {
    try {
      const response = await brokerSubscription(accessToken)
      console.log('response', response)

      if (response.status == true) {
        setLoader(true)
        setSubscriptionData(response?.subscription)
        setPackageID(response?.subscription?.id)
        setPackageStatus(response?.subscription?.stripe_status)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  const UnsubscriptionPackage = async () => {
    setBtnLoader(true)

    const result = await unsubscriptionPackage(accessToken, packageID)

    if (result.status === true) {
      Swal.fire({
        text: 'Subscription canceled successfully',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        reverseButtons: true,
      })
      setBtnLoader(false)

      getBrokerSubscription()
    } else if (result.status === false) {
      Swal.fire({
        text: 'Subscription already canceled',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        reverseButtons: true,
      })
      setBtnLoader(false)
    }
  }
  const removeSubscription = async (e, id) => {
    try {
      const userResult = await Swal.fire({
        text: 'Are you sure you want to unsubscribe your package?',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        reverseButtons: true,
      })
      if (userResult.isConfirmed) {
        UnsubscriptionPackage()
      }
    } catch (err) {
      //   Toast.fire({
      //     icon: 'error',
      //     title: 'Please try again',
      //   })
    }
  }

  const dateFormateHandler = (createdAt) => {
    var d = new Date(createdAt),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year].join('-')
  }
  return (
    <>
      {loader ? (
        <div className='mb-5 mb-xl-10' id='kt_profile_details_view'>
          {packageStatus !== 'canceled' && (
            <div className='d-flex justify-content-end cursor-pointer'>
              <button
                className='btn btn-primary mt-5 mt-md-0 align-self-center'
                onClick={() => {
                  removeSubscription()
                }}
              >
                {isBtnLoader ? (
                  <img src={btnLoader} width={15} height={15} alt='' />
                ) : (
                  <span>Cancel Subscription</span>
                )}
              </button>
            </div>
          )}

          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Name
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6  profile-overview-biz-owner'>
                  {subscriptionData.name ?? 'No Name'}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Price
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6  profile-overview-biz-owner'>
                  ${subscriptionData.price ?? 'No Price'}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Duration
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6  profile-overview-biz-owner'>
                  {subscriptionData.duration ?? 'No Duration'}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Status
              </label>
              {console.log('subscriptionData', subscriptionData)}
              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6  profile-overview-biz-owner'>
                  {subscriptionData.stripe_status == 'active' ? (
                    <span className='badge badge-success'>
                      {subscriptionData.package_details?.status}
                    </span>
                  ) : (
                    <span className='badge badge-danger'>{subscriptionData.stripe_status}</span>
                  )}
                </span>
              </div>
            </div>

            {role == 'broker' || role == 'agent' ? (
              <>
                <div className='row mb-7'>
                  <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                    Allowed Listings
                  </label>
                  {console.log('subscriptionData', subscriptionData)}
                  <div className='col-md-8'>
                    {subscriptionData?.subscription_feature_value?.length > 0 &&
                      subscriptionData?.subscription_feature_value?.map((item, index) =>
                        item?.feature == '2' || item?.feature == 2 ? (
                          <span>{item?.total_value}</span>
                        ) : null
                      )}
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                    Remaining Listings
                  </label>

                  <div className='col-md-8'>
                    {subscriptionData?.subscription_feature_value?.length > 0 &&
                      subscriptionData?.subscription_feature_value?.map((item, index) =>
                        item?.feature == '2' || item?.feature == 2 ? (
                          <span>
                            {Number(item?.total_value) -
                              (Number(item?.total_value) - Number(item?.value))}
                          </span>
                        ) : null
                      )}
                  </div>
                </div>
              </>
            ) : null}

            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Subscription Start Date
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6  profile-overview-biz-owner'>
                  {dateFormateHandler(subscriptionData.created_at) ?? 'No Date'}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Subscription End Date
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6  profile-overview-biz-owner'>
                  {dateFormateHandler(subscriptionData.expire_at) ?? 'No Date'}
                </span>
              </div>
            </div>
            {/* <div className='row mb-7'> */}

            {role == 'broker' && subscriptionData?.package_details?.features?.length > 0 ? (
              <>
                <div className='row mb-4'>
                  <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                    Features
                  </label>

                  <div className='col-md-8'>
                    <ul>
                      {subscriptionData?.package_details?.features?.map(
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
            {packageStatus == 'canceled' && (
              <div className='row mb-7'>
                <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                  Subscription Status
                </label>
                <div className='col-sm-6 col-md-8'>
                  <span className='fw-normal fs-6  profile-overview-biz-owner'>
                    The subscription package will keep working until its time limit is reached, or
                    you can subscribe to another one by
                    <Link to='/dashboard/my-account/package'> clicking here.</Link>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '50vh', width: '140%'}}
        >
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileSubscription
