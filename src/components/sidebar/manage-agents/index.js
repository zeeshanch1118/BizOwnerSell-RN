import React, {useEffect, useState} from 'react'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
import profileImage from '../../../assets/profile/Bob-House.jpg'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import {MdModeEdit} from 'react-icons/md'
import activeIcon from '../../../assets/active-user-icon.svg'
import inactiveIcon from '../../../assets/inactive-user-icon.svg'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Select from 'react-select'
import addUsersIcon from '../../../assets/addUserIcon.svg'
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete'

import {
  getUsers,
  deleteUser,
  updateUser,
  updateStatus,
  createAgent,
  getAgent,
  updateAgent,
} from '../../../components/services/manage-agents/index'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import './AgentManagement.css'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Pagination from '../../../common component/Pagination'
import {Button} from 'react-bootstrap'
// import { createIndustry, getIndustry, deleteIndustry, updateIndustry } from '../../../components/services/admin-services/manage-industries'
const UserManagement = () => {
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  const [isFilterModal, setIsFilterModal] = useState(false)
  const [selectMultiValue, setSelectMultiValue] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [listingTitle, setListingTitle] = useState('')
  const [loader, setLoader] = useState('')
  const [openModel, setOpenModel] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [EditListingTitle, setEditListingTitle] = useState('')
  const [userForm, setUserForm] = useState(true)
  const [editListingPassword, setEditListingPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [address, setAddress] = useState('')
  const [addressObj, setAddressObj] = useState('')
  const [found, setFound] = useState(false)
  const [EditUserForm, setEditUserForm] = useState(true)
  const [compeletCheckTitle, setcompeletCheckTitle] = useState(true)
  const [filterLoader, setFilterLoader] = useState(false)
  const [editEmail, setEditEmail] = useState('')
  const [emailForm, setEmailForm] = useState(true)
  const [editEmailForm, setEditEmailForm] = useState(true)
  const [listingSlug, setListingPassword] = useState('')
  const [firstNameForm, setFirstNameForm] = useState(true)
  const [editPasswordForm, setEditPasswordForm] = useState(true)
  const [compeletCheck, setcompeletCheck] = useState(true)
  const [cashForm, setCashForm] = useState(true)
  const [editCashForm, setEditCashForm] = useState(true)
  const [cash, setCash] = useState('')
  const [editCash, setEditCash] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [userName, setUserName] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [isShowClearFilterBtn, setIsShowClearFilterBtn] = useState(false)
  const [date, setDate] = useState(new Date())
  const [date2, setDate2] = useState(new Date())
  const [toDate, setToDate] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [CpasswordError, setCpasswordError] = useState(false)
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [emailErrorValue, setEmailErrorValue] = useState('')
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [statusError, setStatusError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorValue, setUsernameErrorValue] = useState('')
  const [phoneErrorValue, setPhoneErrorValue] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [lastPage, setLastPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  let search

  const statusData = [
    {label: ' Broker', value: 'broker'},
    {label: ' User(seller/buyer)', value: 'user'},
  ]

  const [options] = useState(statusData)
  ///////////////////////
  useEffect(() => {
    getAllAgents(1, '')
  }, [])
  const clear = () => {
    setUserName('')
    setFirstName('')
    setLastName('')
    setPhone('')
    setPassword('')
    setStatus('')
    setEmail('')
    setEmailErrorValue('')
    setUsernameErrorValue('')
    setPhoneErrorValue('')
    setFirstNameError(false)
    setLastNameError(false)
    setPasswordError(false)
    setEmailError(false)
    setPhoneError(false)
    setStatusError(false)
    setUsernameError(false)
    setCpasswordError(false)
  }

  const getAllAgents = async (page, search) => {
    try {
      setLoader(false)
      const result = await getAgent(accessToken, page, search)
      if (result.status === true) {
        setLoader(true)
        setFilterLoader(false)
        setAllUsers(result.users.data)
        setLastPage(result.users.last_page)
        // setCurrentPage(result.users.current_page)
      } else {
        setLoader(true)
      }
    } catch (err) {
      console.log(err)
      setLoader(true)
    }
  }
  const handleChange = (e, valueName) => {
    if (valueName == 'firstName') {
      setFirstName(e.target.value)
      if (e.target.value.length < 1) {
        setFirstNameError(true)
      } else setFirstNameError(false)
    } else if (valueName == 'username') {
      setUserName(e.target.value)
      if (e.target.value.length < 1) {
        setUsernameError(true)
      } else setUsernameError(false)
    } else if (valueName == 'lastName') {
      setLastName(e.target.value)
      if (e.target.value.length < 1) {
        setLastNameError(true)
      } else setLastNameError(false)
    } else if (valueName == 'password') {
      setPassword(e.target.value)
      if (e.target.value.length < 1) {
        setPasswordError(true)
      } else setPasswordError(false)
    } else if (valueName == 'Cpassword') {
      setCPassword(e.target.value)

      if (e.target.value.length < 1) {
        setCpasswordError(true)
      } else setCpasswordError(false)
    } else if (valueName == 'status') {
      setStatus(e.target.value)
      if (e.target.value.length < 1) {
        setStatusError(true)
      } else setStatusError(false)
    } else if (valueName == 'phone') {
      if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength)
      }
      setPhone(e.target.value)
      if (e.target.value.length < 1) {
        setPhoneError(true)
        setPhoneErrorValue('Invalid phone number')
      } else {
        setPhoneError(false)
        setPhoneErrorValue('')
      }
    }
  }

  const addUser = async () => {
    try {
      if (userName == '' || userName == undefined) {
        setUsernameError(true)
        setUsernameErrorValue('Username is required')
      }
      if (firstName == '' || firstName == undefined) {
        setFirstNameError(true)
      }
      if (lastName == '' || lastName == undefined) {
        setLastNameError(true)
      }
      if (phone == '' || phone == undefined) {
        setPhoneError(true)
        setPhoneErrorValue('Phone number is required')
      } else if (phone?.length < 7) {
        setPhoneError(true)
        setPhoneErrorValue('Invalid phone number')
      }
      if (password == '' || password == undefined || password?.length < 8) {
        setPasswordError(true)
      }
      if (email == '' || email == undefined) {
        setEmailError(true)
        setEmailErrorValue('Email is required')
      }
      if (status == '' || status == undefined) {
        setStatusError(true)
      }
      if (cPassword == '' || cPassword == undefined || cPassword !== password) {
        setCpasswordError(true)
      } else {
        setCpasswordError(false)
      }
      if (
        userName != '' &&
        userName != undefined &&
        usernameError == false &&
        firstName != '' &&
        firstName != undefined &&
        firstNameError == false &&
        lastName != '' &&
        lastName != undefined &&
        lastNameError == false &&
        password != '' &&
        password != undefined &&
        passwordError == false &&
        password?.length > 7 &&
        status != '' &&
        status != undefined &&
        statusError == false &&
        email != '' &&
        email != undefined &&
        emailError == false &&
        phone != '' &&
        phone != undefined &&
        phone?.length > 6 &&
        cPassword != '' &&
        cPassword != undefined &&
        password == cPassword &&
        phoneError == false
      ) {
        setLoading(true)
        const result = await createAgent(
          userName,
          firstName,
          lastName,
          phone,
          password,
          status,
          email,
          accessToken
        )
        console.log('object', result)
        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'User added successfully',
          })

          let usersArray = [...allUsers]
          usersArray.unshift(result.users)
          setAllUsers(usersArray)
          setOpenModel(false)
          clear()
        } else {
          if (result.errors?.email) {
            setEmailError(true)
            setEmailErrorValue(result.errors.email[0])
          } else {
            setEmailError(false)
          }
          if (result.errors?.username) {
            setUsernameError(true)
            setUsernameErrorValue(result.errors.username[0])
          } else {
            setUsernameError(false)
          }
          if (result.errors?.phone) {
            setPhoneError(true)
            setPhoneErrorValue(result.errors.phone[0])
          } else {
            setPhoneError(false)
          }
          if (result?.limit_enough) {
            console.log('asdasdasdasd')
            Swal.fire({
              text: result?.limit_enough,
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#009ef7',
            })
          }
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
      setOpenModel(false)
    }
  }
  const editAgent = async () => {
    try {
      if (userName == '' || userName == undefined) {
        setUsernameError(true)
        setUsernameErrorValue('Username is required')
      }
      if (firstName == '' || firstName == undefined) {
        setFirstNameError(true)
      }
      if (lastName == '' || lastName == undefined) {
        setLastNameError(true)
      }
      if (phone == '' || phone == undefined) {
        setPhoneError(true)
        setPhoneErrorValue('Phone number is required')
      } else if (phone?.length < 7) {
        setPhoneError(true)
        setPhoneErrorValue('Invalid phone number')
      }

      if (status == '' || status == undefined) {
        setStatusError(true)
      }

      if (
        userName != '' &&
        userName != undefined &&
        usernameError == false &&
        firstName != '' &&
        firstName != undefined &&
        firstNameError == false &&
        lastName != '' &&
        lastName != undefined &&
        lastNameError == false &&
        phone != '' &&
        phone != undefined &&
        phoneError == false &&
        phone?.length > 6 &&
        status != '' &&
        status != undefined &&
        statusError == false
      ) {
        setLoading(true)
        const result = await updateAgent(
          selectedId,
          userName,
          firstName,
          lastName,
          phone,
          status,
          accessToken
        )
        if (result.status === true) {
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'User updated successfully',
          })
          setOpenEditModel(false)
          let usersArray = [...allUsers]

          usersArray.map((item, index) => {
            if (item.id === result.user.id) {
              usersArray[index] = result?.user
            }
          })
          setAllUsers(usersArray)
          clear()
        } else {
          if (result.errors?.email) {
            setEmailError(true)
            setEmailErrorValue(result.errors.email[0])
          } else {
            setEmailError(false)
          }
          if (result.errors?.username) {
            setUsernameError(true)
            setUsernameErrorValue(result.errors.username[0])
          } else {
            setUsernameError(false)
          }
          if (result.errors?.phone) {
            setPhoneError(true)
            setPhoneErrorValue(result.errors.phone[0])
          } else {
            setPhoneError(false)
          }
          setLoading(false)
        }
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
      setLoading(false)
    }
  }
  const removeUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true,
      })
      if (result.isConfirmed) {
        const reasonResult = await deleteUser(accessToken, id)
        if (reasonResult.status === true) {
          let usersArray = [...allUsers]

          usersArray.map((item, index) => {
            if (item.id === id) {
              usersArray.splice(index, 1)
            }
          })

          setAllUsers(usersArray)
        }
      } else if (result.isDismissed) {
        // console.log('isDenied')
      }
    } catch (err) {
      console.log('deleteUser err', err)
    }
  }
  const setInitialValues = (
    id,
    dbusername,
    dbfirst_name,
    dblast_name,
    dbemail,
    dbphone,
    dbstatus
  ) => {
    setSelectedId(id)
    setUserName(dbusername)
    setFirstName(dbfirst_name)
    setLastName(dblast_name)
    setEmail(dbemail)
    setPhone(dbphone)
    setStatus(dbstatus)
    setFirstNameError(false)
    setLastNameError(false)
    setPasswordError(false)
    setEmailError(false)
    setStatusError(false)
    setUsernameError(false)
    setPhoneError(false)
  }

  /////////////////////
  const EmailFunction = (e) => {
    const regex = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)+@[a-z]{4,9}[\.][a-z]{2,5}/g
    if (regex.test(e.target.value) == true) {
      setEmail(e.target.value)
      setEmailError(false)
    } else {
      setEmail(e.target.value)
      setEmailError(true)
      setEmailErrorValue('Enter valid email')
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
    await getAllAgents(page, '')
  }
  const changeStatusHandler = async (id, status) => {
    const result = await Swal.fire({
      text: `Are you sure you want to ${status} this profile status?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    })
    if (result.isConfirmed) {
      const statusResult = await updateStatus(id, status, accessToken)
      if (statusResult.status === true) {
        Toast.fire({
          icon: 'success',
          title: `User ${status} successfully`,
        })
        let usersArray = [...allUsers]

        usersArray.map((item, index) => {
          if (item.id === statusResult.user.id) {
            usersArray[index].status = statusResult.user.status
          }
        })
        setAllUsers(usersArray)
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Please try again',
        })
      }
    } else if (result.isDismissed) {
      // console.log('isDenied')
    }
  }
  const userTypeFunction = (name) => {
    return name.toUpperCase()
  }
  const onChangeFromDate = async (e) => {
    setDate(e)
    setFromDate(e.toLocaleDateString('zh-Hans-CN'))

    // getDashboardData()
  }

  const onChangeToDate = async (e) => {
    setDate2(e)
    setToDate(e.toLocaleDateString('zh-Hans-CN'))
  }

  // const data = {
  //   allUsers: allUsers.filter((item) =>
  //     item.first_name.toLowerCase().includes(search.toLowerCase())
  //   ),
  // }
  const changeMultiSelectHandler = (e) => {
    setSelectMultiValue(e)
  }
  const searchHandler = (e) => {
    search = e.target.value
    setSearchFilter(e.target.value)
    getAllAgents(1, e.target.value)
    if (e.target.value.length > 0) {
      setIsShowClearFilterBtn(true)
    } else if (
      e.target.value.length < 1 &&
      fromDate?.length < 1 &&
      toDate?.length < 1 &&
      selectMultiValue?.length < 1
    ) {
      setIsShowClearFilterBtn(false)
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
  return (
    <>
      {/* Header Start */}

      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row  rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              {/* <div className='d-flex align-items-center position-relative my-1'>
                <h3>Manage Users</h3>
              </div> */}
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className=''>
                    <div className='d-flex align-items-center position-relative my-1'>
                      <KTSVG
                        path='/media/icons/duotune/general/gen021.svg'
                        className='svg-icon-1 position-absolute ms-6'
                      />
                      <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid  ps-14'
                        placeholder='Search users'
                        value={searchFilter}
                        onChange={(e) => searchHandler(e)}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className='d-flex justify-content-end align-items-center'
                  data-kt-user-table-toolbar='base'
                >
                  <img
                    src={addUsersIcon}
                    className='cursor-pointer  w-40px h-40px'
                    onClick={() => {
                      setOpenModel(true)
                      clear()
                    }}
                    alt='user'
                  />
                </div>
              </div>

              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    allUsers?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>Name</th>
                            <th className='text-center min-w-100px'>Email</th>
                            <th className='text-center min-w-100px'>Phone</th>
                            <th className='text-center min-w-100px'>Request</th>
                            <th className='text-center min-w-100px'>Agent</th>
                            <th className='text-end me-9 min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allUsers?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>
                                {item?.first_name ?? ''} {item?.last_name ?? '---'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.email ?? 'No Email'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.phone == null ? 'No phone' : item?.phone}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.agent_meta?.status === 'accept' ? (
                                  <span className='badge badge-success'>Accept</span>
                                ) : item?.agent_meta?.status === 'pending' ? (
                                  <span className='badge badge-warning me-1 mb-1'>Pending</span>
                                ) : (
                                  '---'
                                )}
                              </td>
                              <td className='text-center min-w-100px'>
                                <div>
                                  {item.status === 'active' ? (
                                    <span className='badge badge-success'>Active</span>
                                  ) : item.status === 'inactive' ? (
                                    <span className='badge badge-danger me-1 mb-1'>Inactive</span>
                                  ) : (
                                    'No Status'
                                  )}
                                </div>
                              </td>

                              <td className='text-end min-w-100px'>
                                {item.status === 'inactive' ? (
                                  <img
                                    src={activeIcon}
                                    alt=''
                                    title='Active'
                                    className='me-3 cursor-pointer'
                                    onClick={() => changeStatusHandler(item?.id, 'active')}
                                  />
                                ) : item.status === 'active' ? (
                                  <img
                                    src={inactiveIcon}
                                    alt=''
                                    title='Inactive'
                                    className='cursor-pointer me-3'
                                    onClick={() => changeStatusHandler(item?.id, 'inactive')}
                                  />
                                ) : null}

                                <MdModeEdit
                                  size={23}
                                  color='#009ef7'
                                  className='cursor-pointer'
                                  onClick={() => {
                                    setOpenEditModel(true)
                                    setInitialValues(
                                      item.id,
                                      item.username,
                                      item?.first_name,
                                      item?.last_name,
                                      item?.email,
                                      item?.phone,
                                      item?.status
                                    )
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center '
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
            {/* Table End */}
            {/*Add Model Start */}
            <Modal size='lg' isOpen={openModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenModel(!openModel)}>
                <h5 className='modal-title'>Add Agent</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>First Name</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'firstName')}
                      placeholder='Enter First Name'
                      required
                    />
                    {firstNameError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>First name is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Last Name</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'lastName')}
                      placeholder='Enter Last Name'
                      required
                    />
                    {lastNameError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Last name is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Username</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'username')}
                      placeholder='Enter Username'
                      required
                    />

                    {usernameError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{usernameErrorValue} </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Email</label>
                    <input
                      type='email'
                      id='userEmail'
                      className='form-control form-control-solid '
                      onChange={(e) => EmailFunction(e)}
                      placeholder='Enter Email'
                      required
                    />
                    {emailError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{emailErrorValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Password</label>
                    <div className='row'>
                      <div className='col-11 pe-0'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className='form-control form-control-solid '
                          onChange={(e) => handleChange(e, 'password')}
                          placeholder='Enter Password'
                          required
                        />
                      </div>
                      <div className='col-1 mb-0 form-control-password-toggle manage-margin-top'>
                        <span
                          className=' my-auto cursor-pointer'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
                        </span>
                      </div>
                    </div>
                    {passwordError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>
                          {password == '' || password == undefined
                            ? 'Password is required '
                            : 'Minimum 8 symbols'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Confirm Password</label>
                    <div className='row'>
                      <div className='col-11 pe-0'>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className='form-control form-control-solid '
                          onChange={(e) => handleChange(e, 'Cpassword')}
                          placeholder='Confirm Password'
                          required
                        />
                      </div>

                      <div className='col-1 mb-0 form-control-password-toggle manage-margin-top'>
                        <span
                          className=' my-auto cursor-pointer'
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <i className={showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
                        </span>
                      </div>
                    </div>
                    {CpasswordError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>
                          {cPassword == '' || cPassword == undefined
                            ? 'Confirm password is required'
                            : "Password and confirm password didn't match"}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Phone</label>
                    <input
                      type='number'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'phone')}
                      placeholder='Enter Phone'
                      required
                      maxLength={15}
                    />
                    {phoneError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{phoneErrorValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Status</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'status')}
                      // defaultValue={status}
                    >
                      <option selected hidden>
                        Select Status
                      </option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>

                    {statusError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Select user status </div>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setOpenModel(!openModel)
                  }}
                >
                  Discard
                </button>

                <button type='button' className='btn btn-primary' onClick={addUser}>
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

            {/*Edit Model Start */}
            <Modal size='lg' isOpen={openEditModel} centered={true} toggle={null}>
              <ModalHeader toggle={() => setOpenEditModel(!openEditModel)}>
                <h5 className='modal-title'>Edit Agent</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>First Name</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      value={firstName}
                      onChange={(e) => handleChange(e, 'firstName')}
                      placeholder='Enter First Name'
                      required
                    />
                    {firstNameError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>First name is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Last Name</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      value={lastName}
                      onChange={(e) => handleChange(e, 'lastName')}
                      placeholder='Enter Last Name'
                      required
                    />
                    {lastNameError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Last name is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Username</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'username')}
                      value={userName}
                      placeholder='Enter Username'
                      required
                    />
                    {usernameError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{usernameErrorValue} </div>
                      </div>
                    )}
                  </div>
                  {/* <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Email</label>
                    <input
                      type='email'
                      className='form-control form-control-solid '
                      value={email}
                      onChange={(e) => EmailFunction(e)}
                      placeholder='Enter Email'
                      required
                    />
                    {emailError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{emailErrorValue}</div>
                      </div>
                    )}
                  </div> */}

                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Phone</label>
                    <input
                      type='number'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'phone')}
                      value={phone}
                      placeholder='Enter Phone'
                      maxLength={15}
                      required
                    />
                    {phoneError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>{phoneErrorValue}</div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-md-6 '>
                    <label className='required form-label'>Status</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'status')}
                      defaultValue={status}
                      value={status}
                    >
                      <option selected hidden>
                        Select Status
                      </option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>

                    {statusError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Select user status </div>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setOpenEditModel(!openEditModel)
                  }}
                >
                  Discard
                </button>

                <button type='button' className='btn btn-primary' onClick={editAgent}>
                  {!loading && <span className='indicator-label'>Update</span>}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </ModalFooter>
            </Modal>
            {/* Edit Model End */}
          </div>
        </div>
      </div>

      <Modal
        size='lg'
        isOpen={isFilterModal}
        centered={true}
        toggle={() => setIsFilterModal(!isFilterModal)}
      >
        <ModalHeader toggle={() => setIsFilterModal(!isFilterModal)}>Filter Users</ModalHeader>
        <ModalBody>
          <div className='px-10 py-1'>
            {/* <div className='row'>
              <div className='col'>
                <input
                  className='form-control form-control-solid  '
                  // disabled={true}
                  // onClick={() => setIsOpenFromDateModal(true)}
                  placeholder='From'
                  value={fromDate}
                  type='text'
                />
              </div>
              <div className='col'>
                <input
                  className='form-control form-control-solid '
                  // disabled={true}
                  placeholder='To'
                  value={toDate}
                  onClick={() => setIsOpenToDateModal(true)}
                  type='text'
                />
              </div>
            </div> */}
            <div className='row mt-3'>
              <div className='col-md-6'>
                <h6 className='mb-2'>Filter By Start Date</h6>
                <div className='w-100'>
                  {fromDate !== '' ? (
                    <Calendar onChange={onChangeFromDate} value={date} />
                  ) : (
                    <Calendar onChange={onChangeFromDate} />
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <h6 className='mb-2'>Filter By End Date</h6>
                <div className='w-100'>
                  {toDate !== '' ? (
                    <Calendar onChange={onChangeToDate} value={date2} />
                  ) : (
                    <Calendar onChange={onChangeToDate} />
                  )}
                </div>
              </div>
            </div>

            <div className='row mt-6'>
              <h6 className='mb-2'>Filter By Role</h6>
              <div className='col'>
                <Select
                  type='search'
                  value={selectMultiValue}
                  isMulti={false}
                  options={options}
                  placeholder='Select status'
                  onChange={changeMultiSelectHandler}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='text-end'>
            <button
              type='button'
              className='btn btn-light  fw-bold me-2 px-6'
              // data-kt-menu-dismiss='true'
              // data-kt-user-table-filter='reset'
              onClick={() => setIsFilterModal(!isFilterModal)}
            >
              Close
            </button>
          </div>
          <div className='text-end'>
            <button
              type='button'
              className='btn btn-primary  fw-bold px-6'
              // data-kt-menu-dismiss='true'
              // data-kt-user-table-filter='filter'
              onClick={() => {
                setIsShowClearFilterBtn(true)
                setFilterLoader(true)
                setIsFilterModal(false)
                getAllAgents(1, searchFilter)
              }}
            >
              {!filterLoader && <span className='indicator-label'> Apply</span>}
              {filterLoader && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UserManagement
