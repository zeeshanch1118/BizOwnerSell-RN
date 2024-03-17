import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import Multiselect from 'multiselect-react-dropdown'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import {BsFillEyeFill} from 'react-icons/bs'
import Select from 'react-select'
import {
  getPackages,
  createPackage,
  deletePackage,
  getPermission,
  updatePackage,
} from '../../components/services/admin-services/manage-package'
import {getFeatures} from '../../components/services/admin-services/manage-features'
import Pagination from '../../common component/Pagination'
import addPackageIcon from '../../assets/addPackagesIcon.svg'
import {KTSVG, KTCardBody, KTCard} from '../../_metronic/helpers'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import './ManagePackages.css'
const PackageManagement = () => {
  const [loading, setLoading] = useState(false)
  const [openModel, setOpenModel] = useState('')
  const [editOpenModel, setEditOpenModel] = useState('')
  const [numberOfListing, setNumberOfListing] = useState('')
  const [modelControl, setModelControl] = useState(true)
  const [feature, setFeature] = useState([])

  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  const [loader, setLoader] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [packageType, setPackageType] = useState('')

  const [packageDuration, setPackageDuration] = useState('')
  const [packageAmount, setPackageAmount] = useState('')
  const [status, setStatus] = useState('')
  const [permission, setPermission] = useState('')
  const [features, setFeatures] = useState([])

  const [oneMonthStatus, setOneMonthStatus] = useState('inactive')
  const [threeMonthStatus, setThreeMonthStatus] = useState('inactive')
  const [sixMonthStatus, setSixMonthStatus] = useState('inactive')
  const [nineMonthStatus, setNineMonthStatus] = useState('inactive')
  const [oneYearStatus, setOneYearStatus] = useState('inactive')
  const [oneMonthDuration, setOneMonthDuration] = useState('')
  const [threeMonthDuration, setThreeMonthDuration] = useState('')
  const [sixMonthDuration, setSixMonthDuration] = useState('')
  const [nineMonthDuration, setNineMonthDuration] = useState('')
  const [yearDuration, setYearDuration] = useState('')
  const [oneMonthValue, setOneMonthValue] = useState('')
  const [threeMonthValue, setThreeMonthValue] = useState('')
  const [sixMonthValue, setSixMonthValue] = useState('')
  const [nineMonthValue, setNineMonthValue] = useState('')
  const [yearValue, setYearValue] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [packageTypeError, setPackageTypeError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [packageDurationError, setPackageDurationError] = useState(false)
  const [packageAmountError, setPackageAmountError] = useState(false)
  const [permissionError, setPermissionError] = useState(false)
  const [featuresError, setFeaturesError] = useState(null)
  const [numberOfListingError, setNumberOfListingError] = useState(null)
  const [statusError, setStatusError] = useState(false)
  const [allPackages, setAllPackages] = useState([])
  const [allPermission, setAllPermission] = useState([])
  const [allFeatures, setAllFeatures] = useState([])
  const [featuresTitle, setFeaturesTitle] = useState([])
  const [showData, setShowData] = useState([])
  const [lastPage, setLastPage] = useState([])
  const [oneMonthError, setOneMonthError] = useState(false)

  /////////////////// model funtion start///////////////////
  const [style, setStyle] = useState('sideMenu')
  const [menuStatus, setMenuStatus] = useState('open')
  console.log(menuStatus, 'menuStatus')
  const myFunction = (data) => {
    setShowData(data)
    switch (menuStatus) {
      case 'open':
        setMenuStatus('close')
        setStyle('sideMenu activeSideMenu')
        break
    }
  }

  ///////////// model funtion end///////////////////
  useEffect(() => {
    getAllPackages()
    getAllPermission()
  }, [])
  useEffect(() => {
    getAllFeatures()
  }, [packageType])
  const clear = () => {
    setTitle('')
    setDescription('')
    setStatus('')
    setFeatures('')
    setOneMonthValue('')
    setNumberOfListing('')
    setThreeMonthValue('')
    setSixMonthValue('')
    setNineMonthValue('')
    setYearValue('')
    setPackageType('')
    setTitleError(false)
    setPackageTypeError(false)
    setDescriptionError(false)
    setStatusError(false)
    setOneMonthStatus('inactive')
    setThreeMonthStatus('inactive')
    setSixMonthStatus('inactive')
    setNineMonthStatus('inactive')
    setOneYearStatus('inactive')
    setLoading(false)
    setNumberOfListingError(false)
  }
  const getAllPackages = async (page) => {
    try {
      setLoader(false)
      const result = await getPackages(accessToken, page)
      console.log('resut', result)
      if (result.status === true) {
        setLoader(true)
        setLastPage(result.package.last_page)
        setAllPackages(result.package.data)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(true)
    }
  }
  const getAllPermission = async () => {
    try {
      // setLoader(false)
      const result = await getPermission(accessToken)

      if (result.status === true) {
        // setLoader(true)

        setAllPermission(result.permission)
      } else {
        // setLoader(true)
      }
    } catch (err) {
      // setLoader(true)
    }
  }
  const getAllFeatures = async () => {
    let mapFeatures = []

    const result = await getFeatures(accessToken)

    if (result.status === true) {
      setAllFeatures(result.features.data)
      if (packageType == 'broker') {
        result.features.data.map((item, index) =>
          item.id !== 1 ? mapFeatures.push({id: item.id, name: item.title}) : null
        )
      } else if (packageType == 'buyer') {
        result.features.data.map((item, index) =>
          item.id == 1 ? mapFeatures.push({id: item.id, name: item.title}) : null
        )
      }

      setFeaturesTitle(mapFeatures)
    } else {
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
  const addPackage = async () => {
    if (title === '' || title === undefined) {
      setTitleError(true)
    }
    if (description === '' || description === undefined) {
      setDescriptionError(true)
    }
    if (packageType === '' || packageType === undefined || packageType.length < 1) {
      setPackageTypeError(true)
    }
    if (packageType == 'buyer' || packageType == 'broker') {
      if (features === '' || features === undefined || features.length < 1) {
        setFeaturesError(true)
      }
    }
    if (packageType == 'broker') {
      if (numberOfListing === '' || numberOfListing === undefined) {
        setNumberOfListingError(true)
      }
    } else {
      setNumberOfListingError(false)
    }
    if (status === '' || status === undefined) {
      setStatusError(true)
    }
    if (packageType == 'broker') {
      if (
        title != '' &&
        title != undefined &&
        titleError == false &&
        description != '' &&
        description != undefined &&
        descriptionError == false &&
        status != '' &&
        status != undefined &&
        statusError == false &&
        packageType != '' &&
        features != '' &&
        features != undefined &&
        numberOfListing !== '' &&
        numberOfListing !== undefined &&
        packageType != undefined &&
        packageTypeError == false
      ) {
        let featuresId
        if (packageType == 'broker') {
          featuresId = numberOfListing
        } else if (packageType == 'buyer') {
          featuresId = 0
        }

        setLoading(true)
        try {
          const result = await createPackage(
            title,
            description,
            oneMonthValue,
            threeMonthValue,
            sixMonthValue,
            nineMonthValue,
            yearValue,
            status,
            packageType,
            featuresId,
            oneMonthStatus,
            threeMonthStatus,
            sixMonthStatus,
            nineMonthStatus,
            oneYearStatus,
            features,
            accessToken
          )
          if (result.status === true) {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'Package added successfully',
            })

            let packageArray = [...allPackages]
            packageArray.unshift(result.package)

            setAllPackages(packageArray)
            setOpenModel(false)
            clear()
          } else {
            setLoading(false)
          }
        } catch (err) {
          console.log('err', err)

          Toast.fire({
            icon: 'error',
            title: 'Please try again',
          })
          setOpenModel(false)
        }
      }
    } else if (packageType == 'buyer') {
      if (
        title != '' &&
        title != undefined &&
        titleError == false &&
        description != '' &&
        description != undefined &&
        descriptionError == false &&
        status != '' &&
        status != undefined &&
        statusError == false &&
        packageType != '' &&
        features != '' &&
        features != undefined &&
        packageType != undefined &&
        packageTypeError == false
      ) {
        let featuresId
        console.log('features111111', features)
        if (packageType == 'broker') {
          featuresId = numberOfListing
        } else if (packageType == 'buyer') {
          featuresId = 0
        }

        setLoading(true)
        try {
          const result = await createPackage(
            title,
            description,
            oneMonthValue,
            threeMonthValue,
            sixMonthValue,
            nineMonthValue,
            yearValue,
            status,
            packageType,
            featuresId,
            oneMonthStatus,
            threeMonthStatus,
            sixMonthStatus,
            nineMonthStatus,
            oneYearStatus,
            features,
            accessToken
          )

          if (result.status === true) {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'Package added successfully',
            })

            let packageArray = [...allPackages]
            packageArray.unshift(result.package)

            setAllPackages(packageArray)
            setOpenModel(false)
            clear()
          } else {
            setLoading(false)
          }
          console.log('resufdadsfadsfasdfafafaslt', result)
        } catch (error) {
          console.log('err', error)

          Toast.fire({
            icon: 'error',
            title: 'Please try again',
          })
          setOpenModel(false)
        }
      }
    } else if (packageType == 'seller') {
      if (
        title != '' &&
        title != undefined &&
        titleError == false &&
        description != '' &&
        description != undefined &&
        descriptionError == false &&
        status != '' &&
        status != undefined &&
        statusError == false &&
        packageType != '' &&
        packageType != undefined &&
        packageTypeError == false
      ) {
        let featuresId
        console.log('features111111', features)
        if (packageType == 'broker') {
          featuresId = numberOfListing
        } else if (packageType == 'buyer') {
          featuresId = 0
        }

        setLoading(true)
        try {
          const result = await createPackage(
            title,
            description,
            oneMonthValue,
            threeMonthValue,
            sixMonthValue,
            nineMonthValue,
            yearValue,
            status,
            packageType,
            featuresId,
            oneMonthStatus,
            threeMonthStatus,
            sixMonthStatus,
            nineMonthStatus,
            oneYearStatus,
            features,
            accessToken
          )
          if (result.status === true) {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'Package added successfully',
            })

            let packageArray = [...allPackages]
            packageArray.unshift(result.package)

            setAllPackages(packageArray)
            setOpenModel(false)
            clear()
          } else {
            setLoading(false)
          }
        } catch (error) {
          console.log('err', error)

          Toast.fire({
            icon: 'error',
            title: 'Please try again',
          })
          setOpenModel(false)
        }
      }
    }
  }
  const editPackage = async () => {
    try {
      if (title === '' || title === undefined || title == null) {
        setTitleError(true)
      }
      if (description === '' || description === undefined || description == null) {
        setDescriptionError(true)
      }
      if (packageType === '' || packageType === undefined || packageType.length < 1) {
        setPackageTypeError(true)
      }
      if (packageType == 'buyer' || packageType == 'broker') {
        if (features === '' || features === undefined || features.length < 1) {
          setFeaturesError(true)
        }
      }
      if (packageType == 'broker') {
        if (numberOfListing === '' || numberOfListing === undefined) {
          setNumberOfListingError(true)
        }
      } else {
        setNumberOfListingError(false)
      }
      if (status === '' || status === undefined || status == null) {
        setStatusError(true)
      }
      if (packageType == 'broker') {
        if (
          title != '' &&
          title != undefined &&
          titleError == false &&
          description != '' &&
          description != undefined &&
          descriptionError == false &&
          status != '' &&
          status != undefined &&
          statusError == false &&
          packageType != '' &&
          packageType != undefined &&
          packageTypeError == false &&
          numberOfListing !== '' &&
          numberOfListing !== undefined &&
          features !== '' &&
          features !== undefined
        ) {
          let featuresId
          console.log('features111111', features)
          if (packageType == 'broker') {
            featuresId = numberOfListing
          } else if (packageType == 'buyer') {
            featuresId = 0
          }

          setLoading(true)
          const result = await updatePackage(
            selectedId,
            title,
            description,
            oneMonthValue,
            threeMonthValue,
            sixMonthValue,
            nineMonthValue,
            yearValue,
            status,
            packageType,
            featuresId,
            oneMonthStatus,
            threeMonthStatus,
            sixMonthStatus,
            nineMonthStatus,
            oneYearStatus,
            features,
            accessToken
          )
          console.log(result, 'aaaa')
          if (result.status === true) {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'Package updated successfully',
            })
            setEditOpenModel(false)
            let packageArray = [...allPackages]
            packageArray.map((item, index) => {
              if (item.id === result.package.id) {
                packageArray[index] = result?.package
              }
            })
            setAllPackages(packageArray)
            clear()
          } else {
            setLoading(false)
          }
        }
      } else if (packageType == 'buyer') {
        if (
          title != '' &&
          title != undefined &&
          titleError == false &&
          description != '' &&
          description != undefined &&
          descriptionError == false &&
          status != '' &&
          status != undefined &&
          statusError == false &&
          packageType != '' &&
          packageType != undefined &&
          packageTypeError == false &&
          features !== '' &&
          features !== undefined
        ) {
          let featuresId
          console.log('features111111', features)
          if (packageType == 'broker') {
            featuresId = numberOfListing
          } else if (packageType == 'buyer') {
            featuresId = 0
          }

          setLoading(true)
          const result = await updatePackage(
            selectedId,
            title,
            description,
            oneMonthValue,
            threeMonthValue,
            sixMonthValue,
            nineMonthValue,
            yearValue,
            status,
            packageType,
            featuresId,
            oneMonthStatus,
            threeMonthStatus,
            sixMonthStatus,
            nineMonthStatus,
            oneYearStatus,
            features,
            accessToken
          )
          console.log(result, 'aaaa')
          if (result.status === true) {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'Package updated successfully',
            })
            setEditOpenModel(false)
            let packageArray = [...allPackages]
            packageArray.map((item, index) => {
              if (item.id === result.package.id) {
                packageArray[index] = result?.package
              }
            })
            setAllPackages(packageArray)
            clear()
          } else {
            setLoading(false)
          }
        }
      } else if (packageType == 'seller') {
        console.log("packageType == 'seller'")
        if (
          title != '' &&
          title != undefined &&
          description != '' &&
          description != undefined &&
          status != '' &&
          status != undefined &&
          packageType != '' &&
          packageType != undefined
        ) {
          let featuresId
          console.log('features111111', features)
          if (packageType == 'broker') {
            featuresId = numberOfListing
          } else if (packageType == 'buyer') {
            featuresId = 0
          }

          setLoading(true)
          const result = await updatePackage(
            selectedId,
            title,
            description,
            oneMonthValue,
            threeMonthValue,
            sixMonthValue,
            nineMonthValue,
            yearValue,
            status,
            packageType,
            featuresId,
            oneMonthStatus,
            threeMonthStatus,
            sixMonthStatus,
            nineMonthStatus,
            oneYearStatus,
            features,
            accessToken
          )
          console.log(result, 'aaaa')
          if (result.status === true) {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'Package updated successfully',
            })
            setEditOpenModel(false)
            let packageArray = [...allPackages]
            packageArray.map((item, index) => {
              if (item.id === result.package.id) {
                packageArray[index] = result?.package
              }
            })
            setAllPackages(packageArray)
            clear()
          } else {
            setLoading(false)
          }
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
  const removePackage = async (id, packageCount) => {
    try {
      const result = await Swal.fire({
        // title: 'Are you sure?',
        text: 'Are you sure you want to delete this package?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        const reasonResult = await deletePackage(accessToken, id)
        if (reasonResult.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Package remove successfully',
          })
          let reasonArray = [...allPackages]

          reasonArray.map((item, index) => {
            if (item.id === id) {
              reasonArray.splice(index, 1)
            }
          })

          setAllPackages(reasonArray)
        } else if (reasonResult.status === false) {
          Swal.fire({
            icon: 'error',
            // title: `${reasonResult.package}`,
            text: `${reasonResult.package}`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
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
  const featuresChange = (e) => {
    setFeatures(e)
    setFeaturesError(false)
  }
  /////////////////////////validation////////
  const handleChange = (e, valueName) => {
    if (valueName == 'title') {
      setTitle(e.target.value)
      if (e.target.value.length < 1) {
        setTitleError(true)
      } else setTitleError(false)
    } else if (valueName == 'description') {
      setDescription(e.target.value)
      if (e.target.value.length < 1) {
        setDescriptionError(true)
      } else setDescriptionError(false)
    } else if (valueName == 'packageDuration') {
      setPackageDuration(e.target.value)
      if (e.target.value.length < 1) {
        setPackageDurationError(true)
      } else setPackageDurationError(false)
    } else if (valueName == 'packageAmount') {
      setPackageAmount(e.target.value)
      if (e.target.value.length < 1) {
        setPackageAmountError(true)
      } else setPackageAmountError(false)
    } else if (valueName == 'status') {
      setStatus(e.target.value)
      if (e.target.value.length < 1) {
        setStatusError(true)
      } else setStatusError(false)
    } else if (valueName == 'packageType') {
      setPackageType(e.target.value)
      setFeatures('')
      if (e.target.value.length < 1) {
        setPackageTypeError(true)
      } else setPackageTypeError(false)
    } else if (valueName == '1monthDuration') {
      setOneMonthValue(e.target.value)

      if (e.target.value.length < 1) {
        setOneMonthError(true)
      } else setOneMonthError(false)
    } else if (valueName == '3monthDuration') {
      setThreeMonthValue(e.target.value)
    } else if (valueName == '6monthDuration') {
      setSixMonthValue(e.target.value)
    } else if (valueName == '9monthDuration') {
      setNineMonthValue(e.target.value)
    } else if (valueName == 'yearDuration') {
      setYearValue(e.target.value)
    }
  }
  const handleStatusChange = (value, valueInput) => {
    if (valueInput == 'oneMonthStatus') {
      if (value === true) {
        setOneMonthStatus('active')
        setOneMonthError(true)
      } else if (value === false) {
        setOneMonthStatus('inactive')
        setOneMonthError(false)
      }
    } else if (valueInput == 'threeMonthStatus') {
      if (value === true) {
        setThreeMonthStatus('active')
      } else if (value === false) {
        setThreeMonthStatus('inactive')
      }
    } else if (valueInput == 'sixMonthStatus') {
      if (value === true) {
        setSixMonthStatus('active')
      } else if (value === false) {
        setSixMonthStatus('inactive')
      }
    } else if (valueInput == 'nineMonthStatus') {
      if (value === true) {
        setNineMonthStatus('active')
      } else if (value === false) {
        setNineMonthStatus('inactive')
      }
    } else if (valueInput == 'oneYearStatus') {
      if (value === true) {
        setOneYearStatus('active')
      } else if (value === false) {
        setOneYearStatus('inactive')
      }
    }
  }
  const setInitialValues = (
    id,
    dbTitle,
    dbDescription,
    dbStatus,
    dbFeatures,
    dbPackagePrice,
    packageFor,
    packageCount,
    item
  ) => {
    let featureArray = []
    let listingNumber = null
    setEditOpenModel(true)
    setSelectedId(id)
    setTitle(dbTitle)
    setDescription(dbDescription)
    setStatus(dbStatus)
    setPackageType(packageFor)
    if (item?.features?.length > 0) {
      item?.features?.map((item, index) => {
        if (item?.id != 2) {
          featureArray.push({id: item?.id, name: item?.title})
        }

        if (item?.id == 2) {
          setNumberOfListing(item?.pivot?.value)
        }
      })
    }

    setFeatures(featureArray)
    console.log(item)

    dbPackagePrice.map((item, index) => {
      if (index == 0) {
        setSixMonthValue(item.price)
        setSixMonthStatus(item.status)
      } else if (index == 1) {
        setYearValue(item.price)
        setOneYearStatus(item.status)
      }
    })
  }

  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllPackages(page)
  }
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      addPackage()
    }
  }
  const onKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      editPackage()
    }
  }
  const dateFormateHandler = (createdAt) => {
    let today = new Date(createdAt)
    let date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
    }).format(today)
    return date
  }
  const handleClick = () => {
    if (menuStatus == 'close') {
      setStyle('sideMenu')
      setMenuStatus('open')
    }
  }
  const UpperCaseTypeFunction = (name) => {
    return name.toUpperCase()
  }
  return (
    <>
      {/* Header Start */}
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
                    <h3>Manage Packages</h3>
                  </div>
                </div>

                <div
                  className='d-flex justify-content-end align-items-center'
                  data-kt-user-table-toolbar='base'
                >
                  <img
                    src={addPackageIcon}
                    title='Add package'
                    className='cursor-pointer  w-40px h-40px'
                    alt='addPackageIcon'
                    onClick={() => {
                      setOpenModel(true)
                      clear()
                    }}
                  />
                </div>
              </div>

              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    allPackages?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>Package Title</th>
                            <th className='text-center min-w-100px'>Status</th>
                            <th className='text-center min-w-100px'>Type</th>
                            <th className='text-center min-w-100px'>Date</th>
                            <th className='text-end me-9 min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allPackages?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px mb-1 ms-2 '>
                                {item?.title?.substring(0, 30) ?? 'NaN'}
                                {item?.title >= 30 && '...'}
                              </td>

                              <td className='text-center min-w-100px'>
                                <div>
                                  {item.status === 'active' ? (
                                    <span className='badge badge-success'>Active</span>
                                  ) : item.status === 'inactive' ? (
                                    <span className='badge badge-danger me-1'>Inactive</span>
                                  ) : (
                                    'No Status'
                                  )}
                                </div>
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.package_for != '' &&
                                item?.package_for != undefined &&
                                item?.package_for != null
                                  ? UpperCaseTypeFunction(item?.package_for)
                                  : 'NO TYPE'}
                                {/* {item?.package_for} */}
                              </td>
                              <td className='text-center min-w-100px'>
                                {dateFormateHandler(item?.created_at) ?? 'NO Date'}
                              </td>
                              <td className='text-end min-w-100px'>
                                <BsFillEyeFill
                                  size={22}
                                  title='View'
                                  className='text-primary cursor-pointer me-2'
                                  onClick={() => myFunction(item)}
                                />
                                <MdModeEdit
                                  size={23}
                                  title='Edit'
                                  color='#009ef7'
                                  className='cursor-pointer me-2'
                                  onClick={() => {
                                    setInitialValues(
                                      item.id,
                                      item.title,
                                      item?.description,
                                      item?.status,
                                      item?.features,
                                      item?.package_prices,
                                      item?.package_for,
                                      item?.packageCount,
                                      item
                                    )
                                  }}
                                />
                                <MdDelete
                                  size={26}
                                  color='gray'
                                  title='Delete'
                                  className='cursor-pointer'
                                  onClick={() => removePackage(item.id, item?.packageCount)}
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
                          <h1>PACKAGES NOT FOUND</h1>
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
              <ModalHeader toggle={() => setOpenModel(!openModel)} onClick={() => clear()}>
                <h5 className='modal-title'>Add Package</h5>
              </ModalHeader>

              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-12 '>
                    <label className='required form-label'>Package Title</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'title')}
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

                  <div className='mb-3 col-12 '>
                    <label className='required form-label'>Package Description</label>
                    <textarea
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'description')}
                      placeholder='Enter Description'
                      required
                    />
                    {descriptionError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Description is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-12 '>
                    <label className='required form-label mb-2'>Package for</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'packageType')}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                    >
                      <option selected hidden>
                        Select Package For
                      </option>
                      <option value='seller'>Seller</option>
                      <option value='buyer'>Buyer</option>
                      <option value='broker'>Broker</option>
                    </select>

                    {packageTypeError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Select package type </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-12 '>
                    <label className='required form-label mb-2'>Package Status</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'status')}
                      onKeyPress={(e) => onKeyPressAdd(e)}
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
                        <div className='fw-lighter'>Select package status </div>
                      </div>
                    )}
                  </div>
                  {packageType == 'buyer' || packageType == 'broker' ? (
                    <div className='mb-3 col-12 '>
                      <label className='form-label mb-2 required'>Features</label>
                      <Multiselect
                        options={featuresTitle}
                        selectedValues={features}
                        onSelect={(e) => featuresChange(e)}
                        onRemove={(e) => featuresChange(e)}
                        displayValue='name'
                        placeholder={`${features == '' ? 'Select Features' : ''} `}
                        showArrow={false}
                        singleSelect={false}
                        closeIcon={false}
                        showCheckbox={true}
                        style={{
                          searchBox: {
                            fontSize: 14,

                            backgroundColor: '#f5f8fa',
                          },
                          option: {
                            color: 'black',
                          },
                        }}
                      />
                      {featuresError && (
                        <div className='d-flex myError'>
                          <br />
                          <div className='fw-lighter'>Select Features</div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                {packageType == 'broker' && (
                  <div className='row mb-3'>
                    <div className='col-12 '>
                      <label
                        htmlFor='exampleFormControlInput1 '
                        className='form-label mb-2 required'
                      >
                        Number of Listings
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid '
                        onChange={(e) => {
                          setNumberOfListing(e.target.value)

                          setNumberOfListingError(false)
                        }}
                        value={numberOfListing}
                        placeholder='Number of Listings'
                      />
                      {numberOfListingError && (
                        <div className='d-flex myError'>
                          <br />
                          <div className='fw-lighter'>Number of listing is required</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className='row mt-4'>
                  <div className='col-4'>
                    <label className='form-label'>Package Duration</label>
                  </div>
                  <div className='col-4'>
                    <label className=' form-label'>Package Amount</label>
                  </div>
                  <div className='col-4'>
                    <label className=' d-flex justify-content-center form-label'>
                      Inactive/Active
                    </label>
                  </div>
                </div>

                <div className='row mb-2'>
                  <div className='col-4  d-flex align-items-center'>
                    <label className='form-check-label fw-bold' htmlFor='flexCheckDefault'>
                      6 Months
                    </label>
                  </div>
                  <div className='col-4'>
                    <input
                      type='number'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, '6monthDuration')}
                      value={sixMonthValue}
                      placeholder='6 Months'
                    />
                  </div>
                  <div className='col-4 d-flex align-items-center justify-content-center'>
                    {' '}
                    <div className='form-check form-switch '>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckDefault'
                        onChange={(e) => handleStatusChange(e.target.checked, 'sixMonthStatus')}
                      />
                    </div>
                  </div>
                </div>

                <div className='row  mb-2'>
                  <div className='col-4  d-flex align-items-center'>
                    <label className='form-check-label fw-bold' htmlFor='flexCheckDefault'>
                      1 Year
                    </label>
                  </div>
                  <div className='col-4'>
                    <input
                      type='number'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'yearDuration')}
                      value={yearValue}
                      placeholder='1 Year'
                    />
                  </div>
                  <div className='col-4 d-flex align-items-center justify-content-center'>
                    <div className='form-check form-switch '>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckDefault'
                        onChange={(e) => handleStatusChange(e.target.checked, 'oneYearStatus')}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setOpenModel(!openModel)
                    clear()
                    // setThrowEmailError(false)
                  }}
                >
                  Discard
                </button>

                <button type='button' className='btn btn-primary' onClick={addPackage}>
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

            {/*edit Model Start */}
            <Modal size='lg' isOpen={editOpenModel} centered={true} toggle={null}>
              <ModalHeader
                toggle={() => {
                  setEditOpenModel(!editOpenModel)
                  clear()
                }}
              >
                <h5 className='modal-title'>Edit Package</h5>
              </ModalHeader>
              <ModalBody>
                <div className='row '>
                  <div className='mb-3 col-12 '>
                    <label className='required form-label'>Package Title</label>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'title')}
                      value={title}
                      onKeyPress={(e) => onKeyPressEdit(e)}
                      // style={{
                      //   marginTop: '3px',
                      // }}
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

                  <div className='mb-3 col-12 '>
                    <label className='required form-label'>Package Description</label>
                    <textarea
                      type='text'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'description')}
                      value={description}
                      placeholder='Enter Description'
                      required
                    />
                    {descriptionError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Description is required </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-12 '>
                    <label className='required form-label mb-2'>Package For</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'packageType')}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      // defaultValue={status}
                      value={packageType}
                    >
                      <option selected hidden>
                        Select Package For
                      </option>
                      <option value='seller'>Seller</option>
                      <option value='buyer'>Buyer</option>
                      <option value='broker'>Broker</option>
                    </select>

                    {packageTypeError && (
                      <div className='d-flex myError'>
                        <br />
                        <div className='fw-lighter'>Select Package type </div>
                      </div>
                    )}
                  </div>
                  <div className='mb-3 col-12 '>
                    <label className='required form-label mb-2'>Package Status</label>
                    <select
                      className='form-select  form-select-solid '
                      aria-label='Default select example'
                      onChange={(e) => handleChange(e, 'status')}
                      onKeyPress={(e) => onKeyPressEdit(e)}
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
                        <div className='fw-lighter'>Status is required </div>
                      </div>
                    )}
                  </div>
                  {packageType == 'buyer' || packageType == 'broker' ? (
                    <div className='mb-3 col-12 '>
                      <label className='form-label mb-2 required'>Features</label>
                      <Multiselect
                        options={featuresTitle}
                        selectedValues={features}
                        onSelect={(e) => featuresChange(e)}
                        onRemove={(e) => featuresChange(e)}
                        displayValue='name'
                        placeholder={`${features == '' ? 'Select Features' : ''} `}
                        showArrow={false}
                        singleSelect={false}
                        closeIcon={false}
                        showCheckbox={true}
                        style={{
                          searchBox: {
                            fontSize: 14,

                            backgroundColor: '#f5f8fa',
                          },
                          option: {
                            color: 'black',
                          },
                        }}
                      />

                      {featuresError && (
                        <div className='d-flex myError'>
                          <br />
                          <div className='fw-lighter'>Select Features </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                {packageType == 'broker' && (
                  <div className='row mb-3'>
                    <div className='col-12 '>
                      <label
                        htmlFor='exampleFormControlInput1 '
                        className='form-label mb-2 required'
                      >
                        Number of Listings
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid '
                        onChange={(e) => {
                          setNumberOfListing(e.target.value)
                          setNumberOfListingError(false)
                        }}
                        // disabled={is6MonthInput ? true : false}
                        value={numberOfListing}
                        placeholder='Number of Listings'
                      />
                      {numberOfListingError && (
                        <div className='d-flex myError'>
                          <br />
                          <div className='fw-lighter'>Number of listing is required</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className='row mt-4'>
                  <div className='col-4'>
                    <label className='form-label'>Package Duration</label>
                  </div>
                  <div className='col-4'>
                    <label className=' form-label'>Package Amount</label>
                  </div>
                  <div className='col-4'>
                    <label className=' d-flex justify-content-center form-label'>
                      Inactive/Active
                    </label>
                  </div>
                </div>

                <div className='row mb-2'>
                  <div className='col-4  d-flex align-items-center'>
                    <label className='form-check-label fw-bold' htmlFor='flexCheckDefault'>
                      6 Months
                    </label>
                  </div>
                  <div className='col-4'>
                    <input
                      type='number'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, '6monthDuration')}
                      value={sixMonthValue}
                      placeholder='6 Months'
                    />
                  </div>
                  <div className='col-4 d-flex align-items-center justify-content-center'>
                    {' '}
                    <div className='form-check form-switch '>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckDefault'
                        defaultChecked={sixMonthStatus == 'active' ? true : false}
                        onChange={(e) => handleStatusChange(e.target.checked, 'sixMonthStatus')}
                      />
                    </div>
                  </div>
                </div>

                <div className='row  mb-2'>
                  <div className='col-4  d-flex align-items-center'>
                    <label className='form-check-label fw-bold' htmlFor='flexCheckDefault'>
                      1 Year
                    </label>
                  </div>
                  <div className='col-4'>
                    <input
                      type='number'
                      className='form-control form-control-solid '
                      onChange={(e) => handleChange(e, 'yearDuration')}
                      value={yearValue}
                      placeholder='1 Year'
                    />
                  </div>
                  <div className='col-4 d-flex align-items-center justify-content-center'>
                    <div className='form-check form-switch '>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckDefault'
                        defaultChecked={oneYearStatus == 'active' ? true : false}
                        onChange={(e) => handleStatusChange(e.target.checked, 'oneYearStatus')}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='text-center py-5'>
                <button
                  type='reset'
                  className='btn btn-light me-3'
                  onClick={() => {
                    setEditOpenModel(!editOpenModel)
                    clear()
                  }}
                >
                  Discard
                </button>

                <button type='submit' className='btn btn-primary' onClick={editPackage}>
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
            {/* edit Model End */}
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
          {showData?.package_prices?.length > 0 && (
            <div className='border border-2 px-4 mt-4'>
              <div className='row mb-2 pt-2 '>
                <div className='col-4'>
                  <b className='modal-title'>Package Type</b>
                </div>
                <div className='col-4'>
                  <b className='modal-title'>Package Price</b>
                </div>
                <div className='col-4'>
                  <b className='modal-title'>Package Status</b>
                </div>
              </div>
              {showData?.package_prices?.map((item, index) => (
                <>
                  <div className='row  pt-2  border-1 border-top' key={index}>
                    <div className='col-4'>
                      <p className='mb-1 text-start'>
                        {
                          item?.type

                          // == 'halfYear'
                          //   ? '6 Month'
                          //   : item?.type == 'yearly'
                          //   ? '1 Year'
                          //   : 'No type'
                        }
                      </p>
                    </div>

                    <div className='col-4'>
                      <p className='mb-1 text-start'>{item?.price ?? 'No price'}</p>
                    </div>
                    <div className='col-4'>
                      <p className='mb-1 text-start'>
                        {item?.status == 'active'
                          ? 'Active'
                          : item?.status == 'inactive'
                          ? 'Inactive'
                          : 'No status'}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Title</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.title ?? '---'}</p>
            </div>
          </div>
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Package for</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.package_for ?? '---'}</p>
            </div>
          </div>
          <div className='row'>
            {showData?.features !== null &&
              showData?.features?.length > 0 &&
              showData?.package_for !== 'buyer' &&
              showData?.package_for !== 'seller' && (
                <>
                  <div className='col-4  mt-5'>
                    <h6 className='modal-title'>No. of listings</h6>
                  </div>
                  <div className='col-8 mt-5'>
                    <p className='mb-1 text-start'>
                      {showData?.features?.map((item) =>
                        item?.id == 2 ? item?.pivot?.value : '' ?? '---'
                      )}
                    </p>
                  </div>
                </>
              )}
          </div>
          <div className='row mt-5  border-1 border-bottom'>
            <div className='col-4'>
              <h6 className='modal-title'>Description</h6>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.description ?? '---'}</p>
            </div>
          </div>
          {showData?.features?.length > 0 && showData?.package_for !== 'buyer' && (
            <div className='row mt-5  border-1 border-bottom'>
              <div className='col-4'>
                <h6 className='modal-title'>Features</h6>
              </div>
              <div className='col-8'>
                <ul>
                  {showData?.features?.map(
                    (item, index) =>
                      item?.id != 2 && (
                        <li className='mb-1 text-start ' key={index}>
                          {item?.title ?? '---'}.
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PackageManagement
