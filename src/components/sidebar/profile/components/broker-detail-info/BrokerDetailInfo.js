import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import Select from 'react-select'

import {
  brokerDetailInformation,
  updateBrokerDetailInfo,
  addMemberShipDB,
  addCertificationShipDB,
  getMembers,
  getCertification,
  deleteMember,
  deleteCertification,
} from '../../../../services/profile-services'
import Swal from 'sweetalert2'
import MainScreenLoader from '../../../../../assets/Loader/MainScreenLoader.gif'
import Multiselect from 'multiselect-react-dropdown'
import {getCountries} from '../../../../services/get-fields-data'
import {MdAddCircle, MdDelete} from 'react-icons/md'
import './detailinfo.css'
import './tags.css'
import deleteIcon from '../../../../../assets/icons/delete-icon.svg'
import dummyImg from '../../../../../assets/dummy.jpg'

// import {brokerDetails} from '../../../../../../../components/services/broker-services'
import ButtonLoader from '../../../../../assets/Loader/ButtonLoader.gif'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
const BrokerDetailInfo = () => {
  const [allDetails, setAllDetails] = useState([])
  const [licenseCountries, setLicenseCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [websiteLinksValue, setWebsiteLinksValue] = useState('')
  const [refLinks, setRefLinks] = useState([])
  const [licensedArray, setLicensedArray] = useState([])
  const [transworldArray, setTransworldArray] = useState([])
  const [addCertificationArray, setAddCertificationArray] = useState([])
  const [affiliatedLinksArray, setAffiliatedLinksArray] = useState([])
  const [tags, setTags] = useState([])
  const [locationValue, setLocationValue] = useState([])
  const [addMembershipArray, setAddMembershipArray] = useState([])

  // Inputs of value
  const [aboutLinks, setAboutLinks] = useState('')
  const [aboutCompany, setAboutCompany] = useState('')
  const [aboutPersonal, setAboutPersonal] = useState('')
  const [affiliations, setAffiliations] = useState('')
  const [servicesOffered, setServicesOffered] = useState('')
  const [websiteLinks, setWebsiteLinks] = useState('')
  const [affiliatedLinks, setAffiliatedLinks] = useState('')
  const [licensedID, setLicensedID] = useState('')
  const [licensed, setLicensed] = useState('')
  const [aboutText, setAboutText] = useState('')
  const [transworldLink, setTransworldLink] = useState('')
  const [logoThrowValue, setLogoThrowValue] = useState('')
  const [logoThrowDescriptionValue, setLogoThrowDescriptionValue] = useState('')
  const [membershipDescriptionValue, setMembershipDescriptionValue] = useState('')
  const [membershipProfileValue, setMembershipProfileValue] = useState('')
  const [showProfileImage, setShowProfileImage] = useState()
  const [showMembershipImage, setShowMembershipImage] = useState()
  const [membershipDescription, setMembershipDescription] = useState('')
  const [memberShipProfile, setMemberShipProfile] = useState('')
  const [certificationLogo, setCertificationLogo] = useState('')
  const [certificationDescription, setCertificationDescription] = useState('')
  const [refLinksValidationValue, setRefLinksValidationValue] = useState('')
  const [refLinksValue, setRefLinksValue] = useState('')
  const [affiliatedLinkValue, setAffiliatedLinkValue] = useState('')
  const [aboutTextValue, setAboutTextValue] = useState('')
  const [transworldLinkValue, setTransworldLinkValue] = useState('')
  // validation states

  const [CertificationLoader, setCertificationLoader] = useState(false)
  const [countriesValidation, setCountriesValidation] = useState(false)
  const [aboutTextValidation, setAboutTextValidation] = useState(false)
  const [transworldLinkValidation, setTransworldLinkValidation] = useState(false)
  const [aboutLinksValidation, setAboutLinksValidation] = useState(false)
  const [websiteLinksValidation, setWebsiteLinksValidation] = useState(false)
  const [affiliationsValidation, setAffiliationsValidation] = useState(false)
  const [servicesOfferedValidation, setServicesOfferedValidation] = useState(false)
  const [aboutCompanyValidation, setAboutCompanyValidation] = useState(false)
  const [aboutPersonalValidation, setAboutPersonalValidation] = useState(false)
  const [licensedIDValidation, setLicensedIDValidation] = useState(false)
  const [licensedValidation, setLicensedValidation] = useState(false)
  const [loader, setLoader] = useState(false)
  const [logoThrowError, setLogoThrowError] = useState(false)
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [memberShipLoader, setMemberShipLoader] = useState(false)
  const [logoThrowDescriptionError, setLogoThrowDescriptionError] = useState(false)
  const [membershipDescriptionError, setMembershipDescriptionError] = useState(false)
  const [membershipError, setMembershipError] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [refLinksValidation, setRefLinksValidation] = useState(false)

  const [affiliatedLinksValidation, setAffiliatedLinksValidation] = useState(false)

  const tokenData = localStorage.getItem('userData')
  const transformTokenData = tokenData ? JSON.parse(tokenData) : ''
  const {accessToken} = transformTokenData
  var regex = new RegExp(/^(https):\/\/[^ "]+$/)
  // var regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
  useEffect(() => {
    getBrokerDetailInformation()
    getAllMembers()
    getAllCertification()
    getAllCountries()
  }, [])
  const getBrokerDetailInformation = async () => {
    const response = await brokerDetailInformation(accessToken)
    if (response.status == true) {
      setLoader(true)
      setAllDetails(response?.users)
    }
  }
  // /////////////////////////
  const onInputChange = async (event) => {
    switch (event.target.name) {
      case 'logo':
        await setCertificationLogo(event.target.files[0])
        setLogoThrowError(false)
        if (event.target.files.length !== 0) {
          setShowProfileImage(URL.createObjectURL(event.target.files[0]))
        } else if (event.target.files.length === 0) {
          setShowProfileImage('')
        }

        break

      case 'membership':
        await setMemberShipProfile(event.target.files[0])
        setMembershipError(false)
        if (event.target.files.length !== 0) {
          setShowMembershipImage(URL.createObjectURL(event.target.files[0]))
        } else if (event.target.files.length === 0) {
          setShowMembershipImage('')
        }

        break
      case 'aboutCompany':
        await setAboutCompany(event.target.value)
        setAboutCompanyValidation(false)
        break
      case 'membershipDescription':
        await setMembershipDescription(event.target.value)
        setMembershipDescriptionError(false)
        break
      case 'Affiliations':
        await setAffiliations(event.target.value)
        setAffiliationsValidation(false)
        break
      case 'aboutPersonal':
        await setAboutPersonal(event.target.value)
        setAboutPersonalValidation(false)
        break
      case 'servicesOffered':
        await setServicesOffered(event.target.value)
        setServicesOfferedValidation(false)
        break
      case 'aboutLinks':
        await setAboutLinks(event.target.value)
        setAboutLinksValidation(false)
        break
      case 'websiteLinks':
        setWebsiteLinks(event.target.value)
        setWebsiteLinksValidation(false)
        // if (event.target.value == '') {
        //   setWebsiteLinksValue('Enter website link')
        // } else if (regex.test(event.target.value) == true) {
        //   setWebsiteLinksValidation(false)
        // } else {
        //   setWebsiteLinksValidation(true)
        //   setWebsiteLinksValue('Enter valid URL (https://)')
        // }

        break
      case 'refLinksValue':
        setRefLinksValue(event.target.value)
        setRefLinksValidation(false)
        // if (event.target.value == '') {
        //   setRefLinksValidationValue('Enter reference link ')
        // } else if (regex.test(event.target.value) == true) {
        //   setRefLinksValidation(false)
        // } else {
        //   setRefLinksValidation(true)
        //   setRefLinksValidationValue('Enter valid URL (https://)')
        // }

        break
      case 'affiliatedLinks':
        setAffiliatedLinks(event.target.value)
        setAffiliatedLinksValidation(false)
        // if (event.target.value == '') {
        //   setAffiliatedLinksValidation(true)
        //   setAffiliatedLinkValue('Enter affiliate URL')
        // } else if (regex.test(event.target.value) == true) {
        //   setAffiliatedLinksValidation(false)
        // } else {
        //   setAffiliatedLinkValue('Enter valid URL (https://)')
        // }

        break

      case 'licensedID':
        await setLicensedID(event.target.value)
        setLicensedIDValidation(false)
        break
      case 'licensed':
        await setLicensed(event.target.value)
        setLicensedValidation(false)
        break
      case 'aboutText':
        await setAboutText(event.target.value)
        setAboutTextValidation(false)
        // if (event.target.value == '') {
        //   setAboutTextValue('Enter about')
        // } else {
        //   setAboutTextValidation(false)
        // }
        break
      case 'transworldLink':
        await setTransworldLink(event.target.value)

        setTransworldLinkValidation(false)
        // if (regex.test(event.target.value) == true) {
        // } else {
        //   setTransworldLinkValidation(true)
        //   setTransworldLinkValue('Enter valid URL (https://)')
        // }
        break
      case 'certificationDescription':
        await setCertificationDescription(event.target.value)
        setLogoThrowDescriptionError(false)

        break
    }
  }
  //////////////////////////////
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
  const updateBrokerDetailInformation = async (e) => {
    e.preventDefault()

    // ref link
    // ref link
    if (refLinksValue !== '' && refLinksValue.startsWith('https://')) {
      refLinks.push({
        refLinksValue: refLinksValue,
      })
      setRefLinks([...refLinks])
      setRefLinksValue('')
    } else if (refLinksValue !== '' && !refLinksValue.startsWith('https://')) {
      refLinks.push({
        refLinksValue: 'https://' + refLinksValue,
      })
      setRefLinks([...refLinks])
      setRefLinksValue('')
    }

    // afflink
    if (affiliatedLinks !== '' && affiliatedLinks.startsWith('https://')) {
      affiliatedLinksArray.push({
        affiliatedLinks: affiliatedLinks,
      })
      setAffiliatedLinksArray([...affiliatedLinksArray])
      setAffiliatedLinks('')
    } else if (affiliatedLinks !== '' && !affiliatedLinks.startsWith('https://')) {
      affiliatedLinksArray.push({
        affiliatedLinks: 'https://' + affiliatedLinks,
      })
      setAffiliatedLinksArray([...affiliatedLinksArray])
      setAffiliatedLinks('')
    }
    // licensed
    if (licensedID && licensed !== '' && licensedID && licensed !== undefined) {
      licensedArray.push({
        licence_id: licensedID,
        country: licensed.label,
      })
      setLicensedArray([...licensedArray])
      setLicensedID('')
      setLicensed('')
    }
    //
    // transwerd
    if (transworldLink !== '' && aboutText !== '' && transworldLink.startsWith('https://')) {
      transworldArray.push({
        about: aboutText,
        link: transworldLink,
      })
      setTransworldArray([...transworldArray])
      setAboutText('')
      setTransworldLink('')
    } else if (
      transworldLink !== '' &&
      aboutText !== '' &&
      !transworldLink.startsWith('https://')
    ) {
      transworldArray.push({
        about: aboutText,
        link: 'https://' + transworldLink,
      })
      setTransworldArray([...transworldArray])
      setAboutText('')
      setTransworldLink('')
    }
    if (aboutCompany == '' || aboutCompany == undefined) {
      setAboutCompanyValidation(true)

      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (affiliations == '' || affiliations == undefined) {
      setAffiliationsValidation(true)
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (servicesOffered == '' || servicesOffered == undefined) {
      setServicesOfferedValidation(true)

      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (aboutPersonal == '' || aboutPersonal == undefined) {
      setAboutPersonalValidation(true)
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (aboutLinks == '' || aboutLinks == undefined) {
      setAboutLinksValidation(true)
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }

    if (websiteLinks == '' || websiteLinks == undefined) {
      setWebsiteLinksValidation(true)
      setWebsiteLinksValue('Enter website link')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else if (regex.test(websiteLinks) == true) {
      setWebsiteLinksValidation(false)
    } else {
      setWebsiteLinksValidation(true)
      setWebsiteLinksValue('Enter valid URL (https://)')
    }

    if (locationValue.length < 1 || locationValue == null) {
      setCountriesValidation(true)
    }
    // if (licensedArray.length < 1 || licensedArray == null) {
    //   setLicensedIDValidation(true)
    //   setLicensedValidation(true)
    // }
    if (affiliatedLinksArray.length < 1 || affiliatedLinksArray == null) {
      setAffiliatedLinksValidation(true)
      setAffiliatedLinkValue('Enter affiliated link')
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (transworldArray.length < 1) {
      if (aboutText == '' || aboutText == undefined) {
        setAboutTextValue('Enter about')
        setAboutTextValidation(true)
      }
      if (transworldLink == '' || transworldLink == undefined) {
        setTransworldLinkValue('Enter transworld URL')
        setTransworldLinkValidation(true)
      }
    }
    if (licensedArray?.length < 1) {
      if (licensed == '' || licensed == undefined) {
        setLicensedValidation(true)
      }
      if (licensedID == '' || licensedID == undefined) {
        setLicensedIDValidation(true)
      }
    }

    if (
      websiteLinksValidation !== true &&
      affiliationsValidation !== true &&
      servicesOfferedValidation !== true &&
      aboutCompanyValidation !== true &&
      aboutPersonalValidation !== true &&
      aboutCompany !== '' &&
      aboutCompany !== undefined &&
      locationValue !== '' &&
      locationValue !== undefined &&
      affiliations != '' &&
      affiliations != undefined &&
      servicesOffered != '' &&
      servicesOffered != undefined &&
      aboutPersonal != '' &&
      aboutPersonal != undefined &&
      // aboutLinks != '' &&
      affiliatedLinksArray.length > 0 &&
      licensedArray.length > 0 &&
      transworldArray.length > 0 &&
      // aboutLinks != undefined &&
      websiteLinks !== '' &&
      websiteLinks !== undefined
      // websiteLinksValidation !== true &&
      // countriesValidation !== true
    ) {
      try {
        const countries = locationValue.map((item) => item.name)

        const ref = refLinks.map((item) => item.refLinksValue)
        const affiliate = affiliatedLinksArray.map((item) => item.affiliatedLinks)
        setIsContinueBtn(true)

        const result = await updateBrokerDetailInfo(
          accessToken,
          websiteLinks,
          countries,
          aboutCompany,
          aboutPersonal,
          servicesOffered,
          affiliations,
          tags,
          ref,
          affiliate,
          licensedArray,
          transworldArray
        )

        if (result.status == true) {
          setOpenEditModel(false)
          Toast.fire({
            icon: 'success',
            title: 'Information successfully updated',
          })
          Toast.fire({
            icon: 'success',
            title: 'Information successfully updated',
          })
          getBrokerDetailInformation()
          setIsContinueBtn(false)
          // clear()
        } else {
          setIsContinueBtn(false)
          Toast.fire({
            icon: 'error',
            title: 'Please try again',
          })
        }
      } catch (error) {
        setIsContinueBtn(false)
      }
    }
  }

  const getAllCountries = async () => {
    let mapCountries = []
    let lCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result.countries.map((item, index) => mapCountries.push({id: item.id, name: item.name}))
        result?.countries?.map((item, index) =>
          lCountries.push({value: item.name, label: item.name})
        )
        filterCountries = mapCountries.filter((x) => {
          return x.id !== 39 && x.id !== 233
        })
        filterCountries.unshift({id: 233, name: 'United States'}, {id: 39, name: 'Canada'})
        setAllCountries(filterCountries)
        setLicenseCountries(lCountries)
      }
    } catch (err) {
      console.log('getCountries err', err)
    }
  }
  const getAllMembers = async (page) => {
    try {
      const result = await getMembers(accessToken, page)

      if (result.status === true) {
        setAddMembershipArray(result.membership)
      }
    } catch (err) {
      console.log('getMembers err', err)
    }
  }

  const getAllCertification = async (page) => {
    try {
      const result = await getCertification(accessToken, page)

      if (result.status === true) {
        setAddCertificationArray(result.certification)
      }
    } catch (err) {
      console.log('getCertification err', err)
    }
  }
  const removeMember = async (id) => {
    try {
      const result = await deleteMember(accessToken, id)
      if (result.status === true) {
        let memberArray = [...addMembershipArray]
        memberArray.map((item, index) => {
          if (item.id === id) {
            memberArray.splice(index, 1)
          }
        })
        setAddMembershipArray(memberArray)
      }
    } catch (err) {
      // Toast.fire({
      //   icon: 'error',
      //   title: 'Please try again',
      // })
    }
  }
  const removeCertification = async (id) => {
    try {
      const result = await deleteCertification(accessToken, id)
      if (result.status === true) {
        let certArray = [...addCertificationArray]
        certArray.map((item, index) => {
          if (item.id === id) {
            certArray.splice(index, 1)
          }
        })
        setAddCertificationArray(certArray)
      }
    } catch (err) {
      // Toast.fire({
      //   icon: 'error',
      //   title: 'Please try again',
      // })
    }
  }

  const locationChange = async (e) => {
    await setLocationValue(e)

    if (e == '') {
      setCountriesValidation(true)
    } else {
      setCountriesValidation(false)
    }
  }

  const addInput = async (e) => {
    if (refLinksValue !== '' && refLinksValue.startsWith('https://')) {
      const ref = {
        refLinksValue: refLinksValue,
      }
      setRefLinks([...refLinks, ref])
      setRefLinksValue('')
    } else if (refLinksValue !== '' && !refLinksValue.startsWith('https://')) {
      const ref = {
        refLinksValue: 'https://' + refLinksValue,
      }
      setRefLinks([...refLinks, ref])
      setRefLinksValue('')
    }

    if (refLinksValue == '') {
      setRefLinksValidationValue('Enter reference URL')
      setRefLinksValidation(true)
    }
  }

  const addAffiliated = async (e) => {
    if (affiliatedLinks !== '' && affiliatedLinks.startsWith('https://')) {
      const affiliated = {
        affiliatedLinks: affiliatedLinks,
      }
      setAffiliatedLinksArray([...affiliatedLinksArray, affiliated])
      setAffiliatedLinks('')
    } else if (affiliatedLinks !== '' && !affiliatedLinks.startsWith('https://')) {
      const affiliated = {
        affiliatedLinks: 'https://' + affiliatedLinks,
      }
      setAffiliatedLinksArray([...affiliatedLinksArray, affiliated])
      setAffiliatedLinks('')
    }

    if (affiliatedLinks == '') {
      setAffiliatedLinkValue('Enter Affiliated URL')
      setAffiliatedLinksValidation(true)
    }
  }

  const addLicensed = async (e) => {
    const lisence = {
      licence_id: licensedID,
      country: licensed.label,
    }
    if (licensedID && licensed !== '') {
      setLicensedArray([...licensedArray, lisence])
      setLicensedID('')
      setLicensed('')
    }
    if (licensedID == '' || licensedID == undefined) {
      setLicensedIDValidation(true)
    }
    if (licensed == '' || licensed == undefined || licensed?.length < 1) {
      setLicensedValidation(true)
    }
  }

  const addTransworld = async (e) => {
    if (aboutText == '' || aboutText == undefined) {
      setAboutTextValue('Enter about')
      setAboutTextValidation(true)
    }
    if (transworldLink == '' || transworldLink == undefined) {
      setTransworldLinkValue('Enter transworld URL')
      setTransworldLinkValidation(true)
    }
    // else if (transworldLink == '' || transworldLink == undefined) {
    //   setTransworldLinkValue('Enter transworld URL')
    // } else if (regex.test(transworldLink) == true && aboutText !== '') {
    //   setTransworldLinkValidation(false)
    //   setTransworldArray([...transworldArray, transworld])
    //   setAboutText('')
    //   setTransworldLink('')
    // } else {
    //   setTransworldLinkValidation(true)
    //   setTransworldLinkValue('Enter valid URL (https://)')
    // }

    if (transworldLink !== '' && aboutText !== '' && transworldLink.startsWith('https://')) {
      const transworld = {
        about: aboutText,
        link: transworldLink,
      }
      setTransworldArray([...transworldArray, transworld])
      setAboutText('')
      setTransworldLink('')
    } else if (
      transworldLink !== '' &&
      aboutText !== '' &&
      !transworldLink.startsWith('https://')
    ) {
      const transworld = {
        about: aboutText,
        link: 'https://' + transworldLink,
      }
      setTransworldArray([...transworldArray, transworld])
      setAboutText('')
      setTransworldLink('')
    }
  }
  const addCertification = async (e) => {
    console.log('certificationDescription', certificationDescription)
    if (certificationLogo == '') {
      setLogoThrowError(true)
      setLogoThrowValue('Upload image')
    } else if (
      certificationDescription == '' ||
      certificationDescription == null ||
      certificationDescription == undefined
    ) {
      setLogoThrowDescriptionError(true)
      setLogoThrowDescriptionValue('Description is required')
    } else if (
      certificationLogo &&
      certificationDescription !== '' &&
      certificationDescription !== null &&
      certificationDescription !== undefined
    ) {
      setCertificationLoader(true)
      const result = await addCertificationShipDB(
        accessToken,
        certificationLogo,
        certificationDescription
      )

      if (result.status == true) {
        // setIsContinueBtn(false)
        setCertificationLoader(false)
        let cerArray = [...addCertificationArray]
        cerArray.push(result.data)

        setAddCertificationArray(cerArray)

        // setOpenEditModel(false)
      } else {
        setCertificationLoader(false)
      }
      setLogoThrowError(false)

      setCertificationLogo('')
      setShowProfileImage('')
      setCertificationDescription('')
    }
  }
  const addMembership = async (e) => {
    if (memberShipProfile == '') {
      setMembershipError(true)

      setMembershipProfileValue('Upload image')
    } else if (membershipDescription == '') {
      setMembershipDescriptionValue('Description is required')
      setMembershipDescriptionError(true)
    } else if (memberShipProfile && membershipDescription !== '') {
      setMemberShipLoader(true)
      const result = await addMemberShipDB(accessToken, memberShipProfile, membershipDescription)

      if (result.status == true) {
        // setIsContinueBtn(false)
        setMemberShipLoader(false)
        let memberArray = [...addMembershipArray]
        memberArray.push(result.data)

        setAddMembershipArray(memberArray)

        // setOpenEditModel(false)
      } else {
        setMemberShipLoader(false)
      }
      setLogoThrowError(false)
      setMembershipDescriptionError(false)

      setShowMembershipImage('')
      setMembershipDescription('')
      setMemberShipProfile('')
    }
  }
  const addTag = (e) => {
    let tagArray = []
    if (e.key === 'Enter') {
      e.preventDefault()

      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value])

        e.target.value = ''
      }
    }
    // setTagsValidation(false)
  }
  //////////////////////Remove////////////////////////////
  const removeRow = async (index) => {
    setRefLinks(refLinks.filter((item, i) => index !== i))
    // setYearValidation(false)
  }
  const removeLicensed = async (index) => {
    setLicensedArray(licensedArray.filter((item, i) => index !== i))
    // setYearValidation(false)
  }
  const removeAffiliated = async (index) => {
    setAffiliatedLinksArray(affiliatedLinksArray.filter((item, i) => index !== i))
    // setYearValidation(false)
  }
  const removeTransworld = async (index) => {
    setTransworldArray(transworldArray.filter((item, i) => index !== i))
    // setYearValidation(false)
  }
  const removeTag = (removedTag, index) => {
    const newTags = tags.filter((tag, ind) => ind !== index)
    setTags(newTags)
  }
  // const clear = () => {
  //   setWebsiteLinks('')
  //   setAboutPersonal('')
  //   setServicesOffered('')
  //   setAffiliations('')
  //   // setTags([])
  // }
  const setValueFromDb = () => {
    setAboutCompany(allDetails?.broker_detail?.about_company)
    setAboutPersonal(allDetails?.broker_detail?.about_personal)
    setAffiliations(allDetails?.broker_detail?.affiliations)
    setServicesOffered(allDetails?.broker_detail?.service_offered)
    setWebsiteLinks(allDetails?.broker_detail?.link)
    setShowProfileImage()
    setCertificationDescription()
    setLocationValue(
      allDetails?.locations.map((item) => ({
        label: item?.country,
        name: item?.country,
      }))
    )
    setRefLinks(allDetails?.broker_references.map((item) => ({refLinksValue: item.reference_link})))
    setLicensedArray(
      allDetails?.licenses.map((item) => ({
        licence_id: item.licence_id,
        country: item.country,
      }))
    )

    setTransworldArray(
      allDetails?.transworld_businesses.map((item) => ({
        about: item.about,
        link: item.link,
      }))
    )

    setAffiliatedLinksArray(
      allDetails?.broker_affiliates.map((item) => ({
        affiliatedLinks: item.affiliate_link,
      }))
    )

    setTags(allDetails?.tags.map((item) => item.name))
  }
  const licenseLocationChange = async (e) => {
    console.log(e)
    await setLicensed(e)
    setLicensedValidation(false)
  }
  const reset = () => {
    setOpenEditModel(true)
    setWebsiteLinksValidation(false)
    setValueFromDb()
    setIsContinueBtn(false)
  }
  const websiteLinkHttpsValidation = (e) => {
    if (websiteLinks !== '' && websiteLinks !== undefined && !websiteLinks.startsWith('https://')) {
      const webLink = 'https://' + websiteLinks
      setWebsiteLinks(webLink)
    }
  }
  return (
    <>
      {loader ? (
        <div className='mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='d-flex justify-content-end cursor-pointer'>
            <button
              className='btn btn-primary mt-5 mt-md-0 align-self-center'
              onClick={() => reset()}
            >
              Edit
            </button>
          </div>
          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className=' col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Website Links (Company)
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                  <a
                    href={allDetails?.broker_detail?.link}
                    target='_blank'
                    className='text-wrap text-break'
                  >
                    {allDetails?.broker_detail?.link}
                  </a>
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                About Company
              </label>

              <div className='col-sm-6 col-md-8'>
                <span className='fw-normal fs-6 text-dark profile-overview-biz-owner text-wrap text-break'>
                  {allDetails?.broker_detail?.about_company}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                About Personal
              </label>

              <div className='col-sm-6 col-md-8 '>
                <span className='fw-normal fs-6 text-dark profile-overview-biz-owner text-wrap text-break'>
                  {allDetails?.broker_detail?.about_personal}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                Services Offered
              </label>

              <div className='col-sm-6 col-md-8 '>
                <span className='fw-normal fs-6 text-dark profile-overview-biz-owner text-wrap text-break'>
                  {allDetails?.broker_detail?.service_offered}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner '>
                Affiliations
              </label>

              <div className='col-sm-6 col-md-8 '>
                <span className='fw-normal fs-6 text-dark profile-overview-biz-owner text-wrap text-break'>
                  {allDetails?.broker_detail?.affiliations}
                </span>
              </div>
            </div>
            {allDetails?.tags?.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                  Tags
                </label>

                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-normal fs-6 text-dark profile-overview-biz-owner text-wrap text-break'>
                    {allDetails?.tags?.map((item, index) => (
                      <span className='badge p-2 me-2 mb-2 badge-secondary' key={index}>
                        {item.name}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div className='row mb-7'>
              <label className='col-sm-6 col-md-4 fw-bolder  profile-overview-biz-owner'>
                Countries Served
              </label>

              <div className='col-sm-6 col-md-8 d-flex align-items-center'>
                <span className='fw-normal fs-6 me-2 profile-overview-biz-owner d-flex flex-wrap'>
                  {allDetails?.locations?.map((item, index) => (
                    <div
                      className='mb-2 fs-6  me-4 px-2 py-1  bg-secondary'
                      style={{borderRadius: '3px'}}
                      key={index}
                    >
                      {item.country}
                    </div>
                  ))}
                </span>
              </div>
            </div>
            {allDetails?.broker_references?.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                  Reference Link
                </label>

                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                    {allDetails?.broker_references?.map((item, index) => (
                      <div>
                        <a
                          href={item.reference_link}
                          target='_blank'
                          className='text-wrap text-break'
                          key={index}
                        >
                          {item.reference_link}
                        </a>
                      </div>
                    ))}
                  </span>
                </div>
              </div>
            )}
            {allDetails?.broker_affiliates?.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                  Affiliated Broker Links
                </label>

                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                    {allDetails?.broker_affiliates?.map((item, index) => (
                      <div key={index}>
                        {' '}
                        <a
                          href={item.affiliate_link}
                          target='_blank'
                          className='text-wrap text-break'
                        >
                          {item.affiliate_link}
                        </a>
                      </div>
                    ))}
                  </span>
                </div>
              </div>
            )}
            {allDetails?.licenses?.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4 d-none d-md-block fw-bolder  profile-overview-biz-owner'>
                  License
                </label>
                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                    <div className='row'>
                      <div className='col-md-6 col-12'>
                        <label className=' fw-bold  profile-overview-biz-owner'> ID</label>
                        {allDetails?.licenses?.map((item, index) => (
                          <div className='text-wrap text-break' key={index}>
                            {item.licence_id}
                          </div>
                        ))}
                      </div>
                      <div className='col-md-6 col-12'>
                        <label className=' fw-bold  profile-overview-biz-owner'>Country</label>
                        {allDetails?.licenses?.map((item, index) => (
                          <div className='text-wrap text-break' key={index}>
                            {item.country}
                          </div>
                        ))}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            )}
            {allDetails?.transworld_businesses?.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4 d-none d-md-block fw-bolder  profile-overview-biz-owner'>
                  Transworld Broker
                </label>
                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-bolder fs-6 text-dark profile-overview-biz-owner'>
                    <div className='row'>
                      <div className='col-md-6 col-12'>
                        <label className=' fw-bold  profile-overview-biz-owner'>About</label>
                        {allDetails?.transworld_businesses?.map((item, index) => (
                          <div className='text-wrap fw-normal text-break' key={index}>
                            {item.about}
                          </div>
                        ))}
                      </div>
                      <div className='col-md-6 col-12'>
                        <label className=' fw-bold  profile-overview-biz-owner'>Links</label>
                        {allDetails?.transworld_businesses?.map((item, index) => (
                          <div key={index}>
                            {' '}
                            <a
                              href={item.link}
                              target='_blank'
                              className='text-wrap fw-normal text-break'
                            >
                              {item.link}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            )}
            {addMembershipArray.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                  Membership
                </label>
                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                    {' '}
                    {addMembershipArray
                      ? addMembershipArray.map((input, index) => (
                          <>
                            <div className='col-12 ' key={index}>
                              <div className='row mt-2'>
                                <div className='col-md-2 col-12'>
                                  <div className='image-input-wrapper w-50px h-50px'>
                                    <img
                                      title={input?.description}
                                      src={
                                        input?.image?.full_path + 'thumb/' + input?.image?.file_name
                                      }
                                      className='img-fluid w-100 h-100'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='col-md-10 col-12'>
                                  <label htmlFor='' className='text-wrap text-break'>
                                    {input?.description}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
                  </span>
                </div>
              </div>
            )}
            {addCertificationArray.length > 0 && (
              <div className='row mb-7'>
                <label className='col-sm-6 col-md-4  fw-bolder  profile-overview-biz-owner'>
                  Certification
                </label>
                <div className='col-sm-6 col-md-8 '>
                  <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                    {' '}
                    {addCertificationArray
                      ? addCertificationArray.map((input, index) => (
                          <>
                            <div className='col-12 ' key={index}>
                              <div className='row mt-2'>
                                <div className='col-md-2 col-12'>
                                  <div className='image-input-wrapper w-50px h-50px'>
                                    <img
                                      title={input?.description}
                                      src={
                                        input?.image?.full_path + 'thumb/' + input?.image?.file_name
                                      }
                                      className='img-fluid w-100 h-100'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='col-md-10 col-12'>
                                  <label htmlFor='' className='text-wrap text-break'>
                                    {input?.description}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
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
      {/*edit Model Start */}
      <Modal size='xl' isOpen={openEditModel} centered={true}>
        <ModalHeader toggle={() => setOpenEditModel(!openEditModel)}>
          <h5 className='modal-title'> Edit Detail Information</h5>
        </ModalHeader>

        <ModalBody>
          <div className='container mx-auto pb-20 px-md-10'>
            <div className='row'>
              {/* aboutCompany  */}
              <div className='col-lg-6 mt-5'>
                <label className='form-label required'>Website Links (Company)</label>
                <input
                  name='websiteLinks'
                  className='form-control form-control-lg form-control-solid'
                  type='url'
                  placeholder='https://'
                  required
                  value={websiteLinks}
                  onChange={(e) => onInputChange(e)}
                  onBlur={(e) => websiteLinkHttpsValidation(e)}
                />
                {websiteLinksValidation ? (
                  <div className='biz_owner_input_validation'>{websiteLinksValue}</div>
                ) : null}
              </div>
              <div className='col-lg-6 mt-5'>
                <label
                  htmlFor=''
                  className='d-flex align-items-center required  fw-bold form-label'
                >
                  Countries Served
                </label>
                <Multiselect
                  options={allCountries}
                  selectedValues={locationValue}
                  onSelect={locationChange} // Options to display in the dropdown
                  onRemove={locationChange} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                  placeholder='Countries served'
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

                {countriesValidation ? (
                  <div className='biz_owner_input_validation'>Select country</div>
                ) : null}
              </div>
              <div className='col-lg-6 mt-5'>
                <label className='form-label required '>About Company</label>
                <textarea
                  type='text'
                  placeholder='About company'
                  className='form-control form-control-lg form-control-solid'
                  name='aboutCompany'
                  // cols='30'
                  // rows='10'
                  value={aboutCompany}
                  onChange={(e) => onInputChange(e)}
                  required
                />

                {aboutCompanyValidation ? (
                  <div className='biz_owner_input_validation'>Enter about company</div>
                ) : null}
              </div>

              <div className='col-lg-6 mt-5'>
                <label className='form-label required '>About (Personal etc)</label>
                <textarea
                  type='text'
                  placeholder='About personal'
                  className='form-control form-control-lg form-control-solid'
                  name='aboutPersonal'
                  // cols='30'
                  // rows='10'
                  value={aboutPersonal}
                  onChange={(e) => onInputChange(e)}
                  required
                />

                {aboutPersonalValidation ? (
                  <div className='biz_owner_input_validation'>Enter About Personal</div>
                ) : null}
              </div>
              <div className='col-lg-6 mt-5'>
                <label className='form-label required '>Services Offered</label>
                <textarea
                  type='text'
                  placeholder='About services offered'
                  className='form-control form-control-lg form-control-solid'
                  name='servicesOffered'
                  value={servicesOffered}
                  onChange={(e) => onInputChange(e)}
                  required
                />

                {servicesOfferedValidation ? (
                  <div className='biz_owner_input_validation'>Enter Services Offered</div>
                ) : null}
              </div>
              <div className='col-lg-6 mt-5'>
                <label className='form-label required '>Affiliations</label>
                <textarea
                  type='text'
                  placeholder='Affiliations'
                  className='form-control form-control-lg form-control-solid'
                  name='Affiliations'
                  // cols='30'
                  // rows='10'

                  value={affiliations}
                  onChange={(e) => onInputChange(e)}
                  required
                />

                {affiliationsValidation ? (
                  <div className='biz_owner_input_validation'>Enter Affiliations</div>
                ) : null}
              </div>
            </div>
            <div className='row'>
              <div className=' mt-7 col-12 '>
                <label className='d-flex align-items-center  fw-bold form-label mb-2'>
                  <span className=''>Enter Tags</span>
                </label>

                <div>
                  <div className='tag-container'>
                    {/* {apiTags?.map((item, i) => (
                <div key={i} className='tag'>
                  {item.name} <span onClick={() => removeApiTag(item.id, i)}>X</span>
                </div>
              ))} */}

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

                          {/* <span onClick={() => removeTag(tag, index)}>X</span> */}
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
            </div>
            <div className='row'>
              <div className='col-12  col-lg-6 mt-5'>
                <label className='d-flex align-items-center  fw-bold form-label'>
                  <span> Other Reference Link</span>
                </label>
                <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
                  <div className='col-lg-11 col-md-10 col-11'>
                    <input
                      type='text'
                      className='form-control form-control-solid '
                      name='refLinksValue'
                      value={refLinksValue}
                      onChange={(e) => onInputChange(e)}
                      placeholder='https://'
                    />
                    {refLinksValidation ? (
                      <div className='biz_owner_input_validation'>{refLinksValidationValue}</div>
                    ) : null}
                    {refLinks
                      ? refLinks.map((input, index) => (
                          <div className='col-12 d-flex align-items-center mt-2 ' key={index}>
                            <div>
                              <MdDelete
                                size={20}
                                className='text-danger  cursor-pointer me-2 '
                                onClick={() => removeRow(index)}
                              />
                            </div>
                            <div>
                              <a
                                href={input.refLinksValue}
                                target='_blank'
                                className='text-wrap text-break'
                              >
                                {input.refLinksValue}
                              </a>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  <div className='col-lg-1 col-md-2 col-1'>
                    <MdAddCircle
                      size={30}
                      color='#009ef7'
                      className='cursor-pointer mt-1'
                      onClick={(e) => addInput(e)}
                    />
                  </div>
                </div>
              </div>
              <div className='col-12  col-lg-6 mt-5'>
                <label className='d-flex align-items-center  fw-bold form-label required'>
                  Add Affiliated Broker Links
                </label>
                <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
                  <div className='col-lg-11 col-md-10 col-11'>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      name='affiliatedLinks'
                      value={affiliatedLinks}
                      onChange={(e) => onInputChange(e)}
                      placeholder='https://'
                    />
                    {affiliatedLinksValidation ? (
                      <div className='biz_owner_input_validation'>{affiliatedLinkValue}</div>
                    ) : null}
                    {affiliatedLinksArray
                      ? affiliatedLinksArray.map((input, index) => (
                          <div className='col-12 d-flex align-items-center mt-2' key={index}>
                            <div>
                              <MdDelete
                                size={20}
                                className='text-danger  cursor-pointer me-2 '
                                onClick={() => removeAffiliated(index)}
                              />
                            </div>
                            <div>
                              <a
                                href={input.affiliatedLinks}
                                target='_blank'
                                className='text-wrap text-break'
                              >
                                {input.affiliatedLinks}
                              </a>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  <div className='col-lg-1 col-md-2 col-1'>
                    <MdAddCircle
                      size={30}
                      color='#009ef7'
                      className='cursor-pointer mt-1'
                      onClick={(e) => addAffiliated(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='  col-12 col-lg-6 mt-5'>
                <label className='d-flex align-items-center  fw-bold form-label required'>
                  Add License
                </label>
                <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
                  <div className=' col-lg-11 col-md-10 col-11'>
                    <div className='row'>
                      <div className='col-6'>
                        <input
                          type='number'
                          className='form-control form-control-solid'
                          name='licensedID'
                          value={licensedID}
                          onChange={(e) => onInputChange(e)}
                          placeholder='license ID'
                          // onChange={(e) => setPrice(e.target.value)}
                          // disabled='disabled'
                        />
                        {licensedIDValidation ? (
                          <div className='biz_owner_input_validation'>Add License id</div>
                        ) : null}
                      </div>
                      <div className='col-6'>
                        {/* <input
                          type='text'
                          className='form-control form-control-solid '
                          name='licensed'
                          value={licensed}
                          onChange={(e) => onInputChange(e)}
                          placeholder='Which country'
                          // onChange={(e) => setPrice(e.target.value)}
                          // disabled='disabled'
                        /> */}
                        <Select
                          options={licenseCountries}
                          value={licensed}
                          onChange={licenseLocationChange}
                          // onRemove={licenseLocationChange}
                          displayValue='name'
                          placeholder='Enter which country'
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
                        {licensedValidation ? (
                          <div className='biz_owner_input_validation'>Add License</div>
                        ) : null}
                      </div>
                      {/* {licensedValidation ? (
                  <div className='biz_owner_input_validation'>Enter licensed link</div>
                ) : null} */}
                    </div>

                    {licensedArray
                      ? licensedArray.map((input, index) => (
                          <>
                            <div className='col-12 mt-2' key={index}>
                              <div className='row'>
                                <div className='col-6 d-flex'>
                                  <div>
                                    <MdDelete
                                      size={20}
                                      className='text-danger  cursor-pointer me-2'
                                      onClick={() => removeLicensed(index)}
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor='' className='text-wrap text-break'>
                                      {input.licence_id}
                                    </label>
                                  </div>
                                </div>
                                <div className='col-6'>
                                  <label htmlFor='' className='text-wrap text-break'>
                                    {input.country}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                  <div className='col-lg-1 col-md-2 col-1'>
                    <MdAddCircle
                      size={30}
                      color='#009ef7'
                      className='cursor-pointer mt-1'
                      onClick={(e) => addLicensed(e)}
                    />
                  </div>
                </div>
                {/* )} */}
              </div>
              {/* tranword */}
              <div className='  col-12 col-lg-6 mt-5'>
                <label className='d-flex align-items-center  fw-bold form-label required'>
                  Transworld Business Broker, LLC
                </label>
                <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
                  <div className='col-lg-11 col-md-10 col-11'>
                    <div className='row'>
                      <div className='col-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          name='aboutText'
                          value={aboutText}
                          onChange={(e) => onInputChange(e)}
                          placeholder='About text'
                          // onChange={(e) => setPrice(e.target.value)}
                          // disabled='disabled'
                        />
                        {aboutTextValidation ? (
                          <div className='biz_owner_input_validation'>{aboutTextValue}</div>
                        ) : null}
                      </div>
                      <div className='col-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid '
                          name='transworldLink'
                          value={transworldLink}
                          onChange={(e) => onInputChange(e)}
                          placeholder='https://'
                          // onChange={(e) => setPrice(e.target.value)}
                          // disabled='disabled'
                        />
                        {transworldLinkValidation ? (
                          <div className='biz_owner_input_validation'>{transworldLinkValue}</div>
                        ) : null}
                      </div>
                    </div>
                    {transworldArray
                      ? transworldArray.map((input, index) => (
                          <>
                            <div className='col-12 ' key={index}>
                              <div className='row mt-2'>
                                <div className='col-6 d-flex'>
                                  <div>
                                    <MdDelete
                                      size={20}
                                      className='text-danger cursor-pointer me-2'
                                      onClick={() => removeTransworld(index)}
                                    />
                                  </div>
                                  {/* <a href={input.about} className='me-4'>
                              {input.about}
                            </a> */}
                                  <div>
                                    <label htmlFor='' className='text-wrap text-break'>
                                      {input.about}
                                    </label>
                                  </div>
                                </div>
                                <div className='col-6'>
                                  <a
                                    href={input.link}
                                    target='_blank'
                                    className='text-wrap text-break'
                                  >
                                    {input.link}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                  <div className='col-lg-1 col-md-2 col-1'>
                    {/* {yearValidation == false&& ( */}

                    <MdAddCircle
                      size={30}
                      color='#009ef7'
                      className='cursor-pointer mt-1'
                      onClick={(e) => addTransworld(e)}
                    />
                  </div>
                </div>
                {/* )} */}
              </div>
              {/* add citification */}
              <div className='  col-12 col-lg-6 mt-5'>
                <label className='d-flex align-items-center  fw-bold form-label'>
                  Add Certification
                </label>
                <div className='row  mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
                  <div className='col-lg-11 col-md-10 col-11'>
                    <div className='d-flex'>
                      {/* <div className='row justify-content-center'>
              <div className='mb-3 col-md-2 col-6'> */}
                      <div className='image-input image-input-outline' data-kt-image-input='true'>
                        <div className='image-input-wrapper w-50px h-50px'>
                          {showProfileImage !== '' &&
                          showProfileImage !== undefined &&
                          showProfileImage !== null ? (
                            <img src={showProfileImage} className='img-fluid w-100 h-100' alt='' />
                          ) : (
                            <img src={dummyImg} className='img-fluid w-100 h-100' alt='' />
                          )}
                        </div>

                        <label
                          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                          data-kt-image-input-action='change'
                          data-bs-toggle='tooltip'
                          title='Change avatar'
                        >
                          <i className='bi bi-pencil-fill fs-7' />

                          <input
                            type='file'
                            name='logo'
                            accept='.jpg, .jpeg, .png, .svg, .gif, .webp, .mp4, .mepg4, .avi, webp, .wmv, .mkv, .webm, .flv'
                            onChange={(e) => onInputChange(e)}
                          />
                          <input type='hidden' name='avatar_remove' />
                        </label>
                      </div>
                      <input
                        type='text'
                        className='form-control form-control-solid '
                        name='certificationDescription'
                        value={certificationDescription}
                        onChange={(e) => onInputChange(e)}
                        placeholder='Description'
                        // onChange={(e) => setPrice(e.target.value)}
                        // disabled='disabled'
                      />
                    </div>

                    {logoThrowError && (
                      <div className='biz_owner_input_validation'>{logoThrowValue}</div>
                    )}
                    {logoThrowDescriptionError && (
                      <div className='biz_owner_input_validation'>{logoThrowDescriptionValue}</div>
                    )}
                    {addCertificationArray
                      ? addCertificationArray.map((input, index) => (
                          <>
                            <div className='col-12 ' key={index}>
                              <div className='row mt-2'>
                                <div className='col-md-2 col-12  '>
                                  <div className='d-flex'>
                                    <div>
                                      <MdDelete
                                        size={20}
                                        className='text-danger cursor-pointer '
                                        onClick={() => removeCertification(input.id)}
                                      />
                                    </div>
                                    <div>
                                      <div className='image-input-wrapper w-50px h-50px'>
                                        <img
                                          src={
                                            input?.image?.full_path +
                                            'thumb/' +
                                            input?.image?.file_name
                                          }
                                          className='img-fluid w-100 h-100'
                                          alt=''
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-10 col-12'>
                                  <label htmlFor='' className='text-wrap text-break'>
                                    {input?.description}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                  <div className='col-lg-1 col-md-2 col-1'>
                    {/* {yearValidation == false&& ( */}
                    {CertificationLoader ? (
                      <div class='spinner-border text-primary' role='status'>
                        <span class='sr-only'>Loading...</span>
                      </div>
                    ) : (
                      <MdAddCircle
                        size={30}
                        color='#009ef7'
                        className='cursor-pointer mt-1'
                        onClick={(e) => addCertification(e)}
                      />
                    )}
                  </div>
                </div>
                {/* )} */}
              </div>
              {/* add membership */}
              <div className='  col-12 col-lg-6 mt-5'>
                <label className='d-flex align-items-center  fw-bold form-label'>
                  Add Membership
                </label>
                <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
                  <div className='col-lg-11 col-md-10 col-11'>
                    <div className='d-flex'>
                      {/* <div className='row justify-content-center'>
              <div className='mb-3 col-md-2 col-6'> */}
                      <div className='image-input image-input-outline' data-kt-image-input='true'>
                        <div className='image-input-wrapper w-50px h-50px'>
                          {showMembershipImage !== '' &&
                          showMembershipImage !== undefined &&
                          showMembershipImage !== null ? (
                            <img
                              src={showMembershipImage}
                              className='img-fluid w-100 h-100'
                              alt=''
                            />
                          ) : (
                            <img src={dummyImg} className='img-fluid w-100 h-100' alt='' />
                          )}
                        </div>

                        <label
                          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                          data-kt-image-input-action='change'
                          data-bs-toggle='tooltip'
                          title='Change avatar'
                        >
                          <i className='bi bi-pencil-fill fs-7' />

                          <input
                            type='file'
                            name='membership'
                            accept='.jpg, .jpeg, .png, .svg, .gif, .webp, .mp4, .mepg4, .avi, .wmv, .mkv, webp, .webm, .flv'
                            onChange={(e) => onInputChange(e)}
                          />
                          <input type='hidden' name='avatar_remove' />
                        </label>
                      </div>
                      {/* {logoNotFound && <div className='biz_owner_input_validation me-9'>{logoError}</div>} */}

                      {/* <div>
                  <label htmlFor='FormControlInput2' className='required form-label mt-3'>
                    Profile
                  </label>
                </div> */}
                      {/* </div>
            </div> */}
                      <input
                        type='text'
                        className='form-control form-control-solid '
                        name='membershipDescription'
                        value={membershipDescription}
                        onChange={(e) => onInputChange(e)}
                        placeholder='Description'
                        // onChange={(e) => setPrice(e.target.value)}
                        // disabled='disabled'
                      />
                    </div>
                    {membershipError && (
                      <div className='biz_owner_input_validation'>{membershipProfileValue}</div>
                    )}
                    {membershipDescriptionError && (
                      <div className='biz_owner_input_validation'>{membershipDescriptionValue}</div>
                    )}
                    {addMembershipArray
                      ? addMembershipArray.map((input, index) => (
                          <>
                            <div className='col-12 ' key={index}>
                              <div className='row mt-2'>
                                <div className='col-md-2 col-12'>
                                  <div className='d-flex'>
                                    <div>
                                      <MdDelete
                                        size={20}
                                        className='text-danger cursor-pointer '
                                        onClick={() => removeMember(input.id)}
                                      />
                                    </div>

                                    <div className='image-input-wrapper w-50px h-50px'>
                                      <img
                                        src={
                                          input?.image?.full_path +
                                          'thumb/' +
                                          input?.image?.file_name
                                        }
                                        className='img-fluid w-100 h-100'
                                        alt=''
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-10 col-12'>
                                  <label htmlFor='' className='text-wrap text-break'>
                                    {input?.description}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                  <div className='col-lg-1 col-md-2 col-1'>
                    {memberShipLoader ? (
                      <div class='spinner-border text-primary' role='status'>
                        <span class='sr-only'>Loading...</span>
                      </div>
                    ) : (
                      <MdAddCircle
                        size={30}
                        color='#009ef7'
                        className='cursor-pointer mt-1'
                        onClick={(e) => addMembership(e)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className='text-center py-5'>
          <button
            type='reset'
            className='btn btn-light me-3'
            onClick={() => {
              setOpenEditModel(!openEditModel)
              // setThrowEmailError(false)
            }}
          >
            Discard
          </button>

          <div className=' d-flex justify-content-end  position-relative '>
            {isContinueBtn == true ? (
              <span className='btn btn-primary'>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </span>
            ) : (
              <button
                className='btn btn-primary '
                onClick={(e) => updateBrokerDetailInformation(e)}
              >
                Update
              </button>
            )}
          </div>
        </ModalFooter>
      </Modal>
      {/* edit Model End */}
    </>
  )
}
export default BrokerDetailInfo
