import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'

import {MdDelete, MdModeEdit} from 'react-icons/md'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
} from '../../components/services/admin-services/manage-coupon'
import {BsFillEyeFill} from 'react-icons/bs'
import {KTCardBody, KTCard} from '../../_metronic/helpers'
import './ManageCoupon.css'
import couponIcon from '../../assets/aside-icons/couponIcon.svg'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import Pagination from '../../common component/Pagination'
const ManageCoupon = () => {
  const [name, setName] = useState('')
  const [calenderModel, setCalenderModel] = useState(false)
  const [percentageRange, setPercentageRange] = useState(50)
  const [amountOFF, setAmountOFF] = useState(null)
  const [duration, setDuration] = useState('')
  const [title, setTitle] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [minSpend, setMinSpend] = useState('')
  const [maxSpend, setMaxSpend] = useState('')
  const [usagePerCoupon, setUsagePerCoupon] = useState('')
  const [usagePerUser, setUsagePerUser] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [percentageError, setPercentageError] = useState(false)
  const [amountOFFError, setAmountOFFError] = useState(false)
  const [showData, setShowData] = useState([])
  const [typeOfListing, setTypeOfListing] = useState('Percentage discount')
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [selectedReasonID, setSelectedReasonID] = useState()
  const [allCoupon, setAllCoupon] = useState([])
  const [lastPage, setLastPage] = useState([])
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [minSpendError, setMinSpendError] = useState(false)
  const [minSpendErrorValue, setMinSpendErrorValue] = useState('')
  const [maxSpendError, setMaxSpendError] = useState(false)
  const [maxSpendErrorValue, setMaxSpendErrorValue] = useState('')
  const [couponCodeError, setCouponCodeError] = useState(false)
  const [couponCodeErrorValue, setCouponCodeErrorValue] = useState('')
  const [usagePerCouponError, setUsagePerCouponError] = useState(false)
  const [usagePerCouponValue, setUsagePerCouponValue] = useState('')
  const [usagePerUserError, setUsagePerUserError] = useState(false)
  const [usagePerUserValue, setUsagePerUserValue] = useState('')
  const [durationError, setDurationError] = useState(false)
  const [usagePerCouponErrorValue, setUsagePerCouponErrorValue] = useState('')
  const [usagePerUserErrorValue, setUsagePerUserErrorValue] = useState('')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  var regExp = /^\d*(\.)?(\d{0,2})?$/
  useEffect(() => {
    getAllCoupon()
  }, [])
  /////////////////// model funtion start///////////////////
  const [style, setStyle] = useState('sideMenu')
  const [menuStatus, setMenuStatus] = useState('open')
  const myFunction = (data) => {
    setShowData(data)
    switch (menuStatus) {
      case 'open':
        setMenuStatus('close')
        setStyle('sideMenu activeSideMenu')
        break
    }
  }
  const getAllCoupon = async (page) => {
    try {
      setLoader(false)
      const result = await getCoupons(accessToken, page)

      if (result.status === true) {
        setLoader(true)
        setAllCoupon(result.coupons.data)
        setLastPage(result.coupons.last_page)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(true)
    }
  }
  const onChangeDate = async (e) => {
    setDate(e)
    setDurationError(false)
    setDuration(e.toLocaleDateString('zh-Hans-CN'))
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
  const addCoupon = async () => {
    try {
      if (name == '' || name == undefined) {
        setTitleError(true)
      }
      if (duration == '' || duration == undefined) {
        setDurationError(true)
      }
      if (usagePerCoupon == '' || usagePerCoupon == undefined) {
        setUsagePerCouponError(true)
        setUsagePerCouponValue('Coupon limit is required')
      }
      if (usagePerUser == '' || usagePerUser == undefined) {
        setUsagePerUserError(true)
        setUsagePerUserValue('User limit is required')
      }
      if (minSpend == '' || minSpend == undefined) {
        setMinSpendError(true)
        setMinSpendErrorValue('Minimum spend is required')
      }
      if (maxSpend == '' || maxSpend == undefined) {
        setMaxSpendError(true)
        setMaxSpendErrorValue('Maximum spend is required')
      }
      if (couponCode == '' || couponCode == undefined) {
        setCouponCodeError(true)
        setCouponCodeErrorValue('Coupon code is required')
      }
      if (typeOfListing == 'Percentage discount') {
        if (percentageRange == null || percentageRange == 0 || percentageRange.length < 1) {
          setPercentageError(true)
        }
      } else if (typeOfListing == 'Fixed discount') {
        if (amountOFF == null || amountOFF == '') {
          setAmountOFFError(true)
        }
      }

      if (
        (name !== '' &&
          name !== undefined &&
          duration !== '' &&
          duration !== undefined &&
          minSpend !== '' &&
          minSpend !== undefined &&
          maxSpend !== '' &&
          maxSpend !== undefined &&
          duration !== '' &&
          duration !== undefined &&
          couponCode !== '' &&
          couponCode !== undefined &&
          percentageRange !== null &&
          percentageRange != 0 &&
          titleError == false &&
          durationError == false &&
          usagePerCouponError == false &&
          usagePerUserError == false &&
          minSpendError == false &&
          maxSpendError == false &&
          couponCodeError == false &&
          percentageError == false) ||
        (name !== '' &&
          name !== undefined &&
          duration !== '' &&
          duration !== undefined &&
          minSpend !== '' &&
          minSpend !== undefined &&
          maxSpend !== '' &&
          maxSpend !== undefined &&
          duration !== '' &&
          duration !== undefined &&
          couponCode !== '' &&
          couponCode !== undefined &&
          amountOFF !== null &&
          amountOFF !== undefined &&
          titleError == false &&
          durationError == false &&
          usagePerCouponError == false &&
          usagePerUserError == false &&
          minSpendError == false &&
          maxSpendError == false &&
          couponCodeError == false &&
          amountOFFError == false)
      ) {
        setLoading(true)
        const result = await createCoupon(
          accessToken,
          typeOfListing,
          name,
          couponCode,
          minSpend,
          maxSpend,
          usagePerCoupon,
          usagePerUser,
          description,
          duration,
          amountOFF,
          percentageRange
        )

        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Coupon added successfully',
          })
          setOpenModel(false)
          let couponsArray = [...allCoupon]
          couponsArray.unshift(result?.coupon)
          setAllCoupon(couponsArray)
          clear()
        } else {
          if (result.error) {
            setCouponCodeError(true)
            setCouponCodeErrorValue(result.error)
          }
          setLoading(false)
        }
      }
    } catch (err) {
      setLoading(false)
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }

  const removeCoupon = async (code) => {
    try {
      const result = await Swal.fire({
        // title: 'Are you sure?',
        text: 'Are you sure you want to delete this coupon code?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (result.isConfirmed) {
        const couponResult = await deleteCoupon(accessToken, code)

        if (couponResult.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Coupon remove successfully',
          })
          let couponArray = [...allCoupon]

          couponArray.map((item, index) => {
            if (item.code === code) {
              couponArray.splice(index, 1)
            }
          })

          setAllCoupon(couponArray)
        }
      } else if (result.isDismissed) {
        // console.log('isDenied')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'title':
        setName(e.target.value)
        setTitleError(false)
        break
      case 'per_off':
        setPercentageRange(parseInt(e.target.value))
        setPercentageError(false)

        if (e.target.value > 100) {
          setPercentageRange(100)
        } else if (e.target.value < 1) {
          // setPercentageRange(0)
          setPercentageError(true)
        }
        break
      case 'amountOFF':
        setAmountOFF(e.target.value)
        setAmountOFFError(false)
        break
      case 'duration':
        setDuration(e.target.value)
        if (e.target.value !== '') {
          setDurationError(false)
        }
        break
      case 'percentage_range':
        setPercentageError(false)
        setPercentageRange(e.target.value)

        break

      case 'couponCode':
        if (e.target.value == '') {
          setCouponCodeError(true)
          setCouponCodeErrorValue('Minimum spend is required')
        } else {
          setCouponCodeError(false)
          setCouponCode(e.target.value)
        }
        break
      case 'minSpend':
        if (e.target.value == '') {
          setMinSpendError(true)
          setMinSpendErrorValue('Minimum spend is required')
        } else if (regExp.test(e.target.value) == true) {
          setMinSpendError(false)
          setMinSpend(e.target.value)
        } else {
          setMinSpendError(true)
          setMinSpendErrorValue('Enter valid number')
        }

        break

      case 'maxSpend':
        if (e.target.value == '') {
          setMaxSpendError(true)
          setMaxSpendErrorValue('Maximum spend is required')
        } else if (regExp.test(e.target.value) == true) {
          setMaxSpendError(false)
          setMaxSpend(e.target.value)
        } else {
          setMaxSpendError(true)
          setMaxSpendErrorValue('Enter valid number')
        }
        break
      case 'usagePerCoupon':
        if (e.target.value == '') {
          setUsagePerCouponError(true)
          setUsagePerCouponValue('Maximum spend is required')
        } else if (regExp.test(e.target.value) == true) {
          setUsagePerCouponError(false)
          setUsagePerCoupon(e.target.value)
        } else {
          setUsagePerCouponError(true)
          setUsagePerCouponValue('Enter valid number')
        }

        break
      case 'usagePerUser':
        if (e.target.value == '') {
          setUsagePerUserError(true)
          setUsagePerUserValue('Maximum spend is required')
        } else if (regExp.test(e.target.value) == true) {
          setUsagePerUserError(false)
          setUsagePerUser(e.target.value)
        } else {
          setUsagePerUserError(true)
          setUsagePerUserValue('Enter valid number')
        }

        break
      case 'description':
        setDescription(e.target.value)
        break
      default:
        break
    }
  }

  const dateFormateHandler = (createdAt) => {
    let d = new Date(createdAt),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [day, month, year].join('/')
  }
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      getAllCoupon()
    }
  }

  const WhichTypeOfDiscountChange = async (e) => {
    if (e.target.id == 'percentage') {
      setTypeOfListing('Percentage discount')
      setAmountOFF(null)
    } else if (e.target.id == 'amount') {
      setTypeOfListing('Fixed discount')
      setPercentageRange(null)
    }
  }
  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllCoupon(page)
  }
  const clear = () => {
    setName('')

    setPercentageRange(50)
    setAmountOFF(null)
    setDuration('')
    setTitleError(false)
    setDurationError(false)
    setUsagePerCouponError(false)
    setUsagePerUserError(false)
    setMinSpendError(false)
    setMaxSpendError(false)
    setCouponCodeError(false)
    setPercentageError(false)
    setAmountOFFError(false)
    setCouponCode('')
    setMinSpend('')
    setMaxSpend('')
    setUsagePerCoupon('')
    setUsagePerUser('')
    setDescription('')
  }
  const handleClick = () => {
    if (menuStatus == 'close') {
      setStyle('sideMenu')
      setMenuStatus('open')
    }
  }

  return (
    <>
      <div
        className='dashboard-bg py-0'
        onClick={() => handleClick()}
        style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}
      >
        <div className='container p-0 p-md-10'>
          <div className='row rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3> Manage Coupon</h3>
                  </div>
                </div>

                <div
                  className='d-flex justify-content-end align-items-center'
                  data-kt-user-table-toolbar='base'
                >
                  <img
                    src={couponIcon}
                    className='cursor-pointer w-40px h-40px'
                    onClick={() => {
                      setOpenModel(true)
                      setLoading(false)
                      clear()
                    }}
                    alt='addCouponIcon'
                  />
                </div>
              </div>

              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive'>
                  {loader ? (
                    allCoupon?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>title</th>
                            <th className='text-center min-w-100px'>code</th>

                            <th className='text-center min-w-100px'>Discount</th>

                            <th className='text-center min-w-100px'>expiry date</th>
                            <th className='text-end min-w-100px'>Action</th>
                          </tr>
                        </thead>

                        <tbody className='text-gray-600 fw-bold'>
                          {allCoupon?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>{item.title ?? 'No title'}</td>
                              <td className='text-center min-w-100px'>{item.code ?? '123243'}</td>

                              <td className='text-center min-w-100px'>
                                {item?.type == 'Percentage discount' ? (
                                  <div>{item.amount + '%'}</div>
                                ) : item?.type == 'Fixed discount' ? (
                                  <div>{'$' + item.amount}</div>
                                ) : null}
                              </td>

                              <td className='text-center min-w-100px'>
                                {dateFormateHandler(item?.expiry_date) ?? 'No Date'}
                              </td>

                              <td className='text-end min-w-100px'>
                                <BsFillEyeFill
                                  size={22}
                                  className='text-primary cursor-pointer me-2'
                                  onClick={() => myFunction(item)}
                                />
                                <MdDelete
                                  size={26}
                                  color='gray'
                                  className='cursor-pointer'
                                  onClick={() => removeCoupon(item.code)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center'
                        style={{height: '70vh'}}
                      >
                        <div>
                          <h1>RECORD NOT FOUND</h1>
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className='d-flex justify-content-center align-items-center'
                      style={{height: '70vh'}}
                    >
                      <div>
                        <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
                      </div>
                    </div>
                  )}
                </div>

                {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
              </KTCardBody>
            </KTCard>
            {/*Add Model Start */}
            <Modal size='lg' isOpen={openModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenModel(!openModel)}>
                <h5 className='modal-title'>Add Coupon</h5>
              </ModalHeader>

              <ModalBody>
                <div className='d-flex justify-content-center mb-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='percentage'
                      onClick={(e) => WhichTypeOfDiscountChange(e)}
                      checked={typeOfListing == 'Percentage discount'}
                    />
                    <label className='form-check-label me-3' htmlFor='percentage'>
                      Percentage OFF
                    </label>
                  </div>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='amount'
                      onClick={(e) => WhichTypeOfDiscountChange(e)}
                      checked={typeOfListing == 'Fixed discount'}
                    />
                    <label className='form-check-label' htmlFor='amount'>
                      Amount OFF
                    </label>
                  </div>
                </div>
                <div className='row '>
                  <div className='mb-3 col-md-6 '>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Title'
                      required
                    />
                    {titleError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Title is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Coupon Code
                    </label>
                    <input
                      type='text'
                      name='couponCode'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Coupon Code'
                      required
                    />
                    {couponCodeError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{couponCodeErrorValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Minimum Spend
                    </label>
                    <input
                      type='text'
                      name='minSpend'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Minimum Spend'
                      required
                    />
                    {minSpendError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{minSpendErrorValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Maximum Spend
                    </label>
                    <input
                      type='text'
                      name='maxSpend'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Maximum Spend'
                      required
                    />
                    {maxSpendError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{maxSpendErrorValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6'>
                    <label className='required form-label'>Usage Limit Per Coupon</label>
                    <input
                      type='text'
                      name='usagePerCoupon'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Usage'
                      required
                    />
                    {usagePerCouponError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{usagePerCouponValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6'>
                    <label className='required form-label'>Usage Limit Per User</label>
                    <input
                      type='text'
                      name='usagePerUser'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Usage'
                      required
                    />
                    {usagePerUserError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{usagePerUserValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-12'>
                    <label className=' form-label'>Description</label>
                    <textarea
                      type='text'
                      name='description'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      placeholder='Enter Description'
                      required
                    />
                  </div>
                  <div className=' mb-3 col-md-6'>
                    <label className='required form-label'>Duration</label>

                    <input
                      type='text'
                      className='form-control form-control-solid pt-4 cursor-pointer'
                      placeholder='Enter Duration'
                      name='duration'
                      onClick={() => setCalenderModel(true)}
                      value={duration}
                    />
                    {durationError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Duration is required </div>
                      </div>
                    )}
                  </div>
                  {typeOfListing === 'Percentage discount' ? (
                    <>
                      <div className='mb-3 col-md-6 '>
                        <label className='required form-label'>Percentage OFF %</label>
                        <input
                          type='number'
                          name='per_off'
                          className='form-control form-control-solid '
                          onChange={(e) => handleChange(e)}
                          onKeyPress={(e) => onKeyPressAdd(e)}
                          placeholder='Enter Percentage'
                          value={percentageRange}
                          required
                        />
                        {percentageError && (
                          <div className='d-flex myError'>
                            <br />
                            <div className='fw-lighter'>Percentage is required </div>
                          </div>
                        )}

                        <div className='col-12 mt-2 '>
                          <input
                            className=''
                            type='range'
                            name='percentage_range'
                            value={percentageRange}
                            style={{width: '100%'}}
                            id='range_weight'
                            min={0}
                            max={100}
                            onChange={(e) => handleChange(e)}
                            oninput='range_weight_disp.value = range_weight.value'
                          />
                        </div>
                      </div>
                    </>
                  ) : typeOfListing === 'Fixed discount' ? (
                    <div className='mb-3 col-md-6 '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Amount OFF
                      </label>
                      <input
                        type='number'
                        name='amountOFF'
                        className='form-control form-control-solid '
                        onChange={(e) => handleChange(e)}
                        onKeyPress={(e) => onKeyPressAdd(e)}
                        placeholder='Enter Amount'
                        required
                      />
                      {amountOFFError && (
                        <div className='d-flex myError'>
                          <br />
                          <div className='fw-lighter'>Amount is required </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setOpenModel(!openModel)
                    // setThrowEmailError(false)
                  }}
                >
                  Discard
                </button>

                <button type='submit' className='btn btn-primary' onClick={addCoupon}>
                  {!loading && <span className='indicator-label'>Save</span>}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </ModalFooter>
            </Modal>
            {/* Add Model End */}
          </div>
        </div>
      </div>

      {/* //////////////////////Side Model start/////////////// */}
      <div>
        {/* {modelControl ? ( */}
        <div className={`${style} shadow-sm p-5 pb-20`}>
          <div className='d-flex justify-content-between align-items-center '>
            <div></div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={() => {
                setMenuStatus('open')
                setStyle('sideMenu')
              }}
            ></button>
          </div>

          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Title</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.title ?? 'No title'}</p>
            </div>
          </div>

          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Description</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.description ?? 'No description'}</p>
            </div>
          </div>
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Minimum Spend</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.min_spend ?? 'No Minimum spend'}</p>
            </div>
          </div>
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Maximum Spend</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.max_spend ?? 'No Maximum spend'}</p>
            </div>
          </div>
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Limit Per User</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.limit_user ?? 'no limit user'}</p>
            </div>
          </div>
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Limit Per Coupon</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.limit_coupon ?? 'no limit coupon'}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal size='md' isOpen={calenderModel} centered={true} toggle={null}>
        <ModalHeader toggle={() => setCalenderModel(!calenderModel)}>Select Date</ModalHeader>
        <ModalBody className='d-flex justify-content-center'>
          <Calendar onChange={onChangeDate} minDate={new Date()} value={date} />
        </ModalBody>
        <ModalFooter>
          <div className='text-end'>
            <Button color='secondary' onClick={() => setCalenderModel(!calenderModel)}>
              Cancel
            </Button>
          </div>
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

export default ManageCoupon
