import React, {useState, useEffect} from 'react'
import Multiselect from 'multiselect-react-dropdown'
import Select from 'react-select'
import {getCountries} from '../../../../../../../components/services/get-fields-data'
import {MdAddCircle, MdDelete} from 'react-icons/md'
import './detailinfo.css'
import './tags.css'

import {brokerDetails} from '../../../../../../../components/services/broker-services/Index'
import ButtonLoader from '../../../../../../../assets/Loader/ButtonLoader.gif'
import {useLocation} from 'react-router-dom'
import deleteIcon from '../../../../../../../assets/icons/delete-icon.svg'

const DetailInformation = (props) => {
  const [allCountries, setAllCountries] = useState([])
  const [licenseCountries, setLicenseCountries] = useState([])
  const [refLinks, setRefLinks] = useState([])
  const [licensedArray, setLicensedArray] = useState([])
  const [transworldArray, setTransworldArray] = useState([])
  const [affiliatedLinksArray, setAffiliatedLinksArray] = useState([])
  const [tags, setTags] = useState([])
  const [locationValue, setLocationValue] = useState([])
  // Inputs of value
  const [aboutTextValue, setAboutTextValue] = useState('')
  const [transworldLinkValue, setTransworldLinkValue] = useState('')
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
  const [websiteLinksValue, setWebsiteLinksValue] = useState('')
  const [refLinksValidationValue, setRefLinksValidationValue] = useState('')
  const [affiliatedLinkValue, setAffiliatedLinkValue] = useState('')
  // validation states
  const [btnLoader, setBtnLoader] = useState(false)
  const [transworldLinkValidation, setTransworldLinkValidation] = useState(false)
  const [aboutTextValidation, setAboutTextValidation] = useState(false)

  const [countriesValidation, setCountriesValidation] = useState(false)
  const [refLinksValidation, setRefLinksValidation] = useState(false)
  const [aboutLinksValidation, setAboutLinksValidation] = useState(false)
  const [websiteLinksValidation, setWebsiteLinksValidation] = useState(false)
  const [affiliationsValidation, setAffiliationsValidation] = useState(false)
  const [servicesOfferedValidation, setServicesOfferedValidation] = useState(false)
  const [aboutCompanyValidation, setAboutCompanyValidation] = useState(false)
  const [aboutPersonalValidation, setAboutPersonalValidation] = useState(false)
  const [licensedIDValidation, setLicensedIDValidation] = useState(false)
  const [licensedValidation, setLicensedValidation] = useState(false)
  // const [refLinksValidation, setRefLinksValidation] = useState(false)
  const [refLinksValue, setRefLinksValue] = useState('')
  const [affiliatedLinksValidation, setAffiliatedLinksValidation] = useState('')
  var regex = new RegExp(/^(https):\/\/[^ "]+$/)
  // const getBusinessID = localStorage.getItem('businessID')
  // const transformedBusinessID = JSON?.parse(getBusinessID)
  // const {businessID} = transformedBusinessID ?? ''
  ////////////////////
  const location = useLocation()
  let token
  if (location?.state) {
    const data = localStorage.getItem('BrokerAuth')
    const {accessToken} = JSON.parse(data || '')
    token = accessToken
  } else {
    token = localStorage.getItem('brokerID')
  }
  useEffect(() => {
    getAllCountries()
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }, [])
  const locationChange = async (e) => {
    await setLocationValue(e)
    if (e == '') {
      setCountriesValidation(true)
    } else {
      setCountriesValidation(false)
    }
  }
  const licenseLocationChange = async (e) => {
    console.log(e)
    await setLicensed(e)
    setLicensedValidation(false)
  }
  const getAllCountries = async () => {
    let mapCountries = []
    let lCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result?.countries?.map((item, index) => mapCountries.push({id: item.id, name: item.name}))
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
  const onInputChange = async (event) => {
    setBtnLoader(false)
    switch (event.target.name) {
      case 'aboutCompany':
        await setAboutCompany(event.target.value)
        setAboutCompanyValidation(false)
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
        await setWebsiteLinks(event.target.value)
        setWebsiteLinksValidation(false)

        // if (event.target.value == '') {
        //   setWebsiteLinksValue('Enter website link')
        //   setWebsiteLinksValidation(true)
        // }
        // else if (regex.test(event.target.value) == true) {
        // } else {
        //   setWebsiteLinksValidation(true)
        //   setWebsiteLinksValue('Enter valid URL (https://)')
        // }
        break
      case 'refLinksValue':
        setRefLinksValue(event.target.value)
        setRefLinksValidation(false)

        break
      case 'affiliatedLinks':
        setAffiliatedLinks(event.target.value)
        setAffiliatedLinksValidation(false)

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

        break
      case 'transworldLink':
        await setTransworldLink(event.target.value)
        setTransworldLinkValidation(false)

        break
    }
  }
  const propDetailInformation = async (e) => {
    e.preventDefault()

    // if (refLinksValue == '') {
    //   setRefLinksValidationValue('Enter reference URL')
    // } else if (regex.test(refLinksValue) == true) {
    //   setRefLinksValidation(false)
    //   setRefLinks([...refLinks, ref])
    //   setRefLinksValue('')
    // } else {
    //   setRefLinksValidation(true)
    //   setRefLinksValidationValue('Enter valid URL (https://)')
    // }
    // webLink

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
      // const affiliated = {
      //   affiliatedLinks: 'https://' + affiliatedLinks,
      // }

      affiliatedLinksArray.push({
        affiliatedLinks: 'https://' + affiliatedLinks,
      })
      setAffiliatedLinksArray([...affiliatedLinksArray])
      setAffiliatedLinks('')
      console.log('object', affiliatedLinksArray)
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
      if (licensed == '' || licensed == undefined || licensed?.length < 1) {
        setLicensedValidation(true)
      }
      if (licensedID == '' || licensedID == undefined) {
        setLicensedIDValidation(true)
      }
    }

    if (aboutPersonal == '' || aboutPersonal == undefined) {
      setAboutPersonalValidation(true)
      window.scrollTo(0, 300)
    }
    if (aboutCompany == '' || aboutCompany == undefined) {
      setAboutCompanyValidation(true)
      window.scrollTo(0, 300)
    }
    if (affiliations == '' || affiliations == undefined) {
      setAffiliationsValidation(true)
      window.scrollTo(0, 300)
    }
    if (affiliatedLinksArray == '' || affiliatedLinksArray.length < 1) {
      if (affiliatedLinks == '' || affiliatedLinks == undefined) {
        setAffiliatedLinksValidation(true)
        window.scrollTo(0, 300)
      }
    }
    if (servicesOffered == '' || servicesOffered == undefined) {
      setServicesOfferedValidation(true)
      window.scrollTo(0, 300)
    }

    if (aboutLinks == '' || aboutLinks == undefined) {
      setAboutLinksValidation(true)
      window.scrollTo(0, 300)
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
    if (
      websiteLinksValidation !== true &&
      affiliationsValidation !== true &&
      servicesOfferedValidation !== true &&
      aboutCompanyValidation !== true &&
      aboutPersonalValidation !== true &&
      affiliatedLinksValidation !== true &&
      transworldArray?.length > 0 &&
      licensedArray?.length > 0 &&
      locationValue?.length > 0
      // licensedIDValidation == false &&
      // licensedValidation == false &&
      // aboutTextValidation == false &&
      // transworldLinkValidation == false
      // aboutText !== '' &&
      // aboutText !== undefined &&
      // transworldLink !== '' &&
      // transworldLink !== undefined
    ) {
      const countries = locationValue.map((item) => item.name)
      const ref = refLinks.map((item) => item.refLinksValue)
      const affiliate = affiliatedLinksArray.map((item) => item.affiliatedLinks)

      // setLocationValue(() => locationValue.map((item) => item.name))
      // setRefLinks(() => refLinks.map((item) => item.refLinksValue))

      // setAffiliatedLinksArray(() => affiliatedLinksArray.map((item) => item.affiliatedLinks))
      try {
        setBtnLoader(true)

        setLocationValue(countries)

        const result = await brokerDetails(
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
          transworldArray,
          token
        )
        if (result.status == true) {
          setBtnLoader(false)
          props.detailInformationStep4()
        } else {
          setBtnLoader(false)
        }
      } catch (error) {
        setBtnLoader(false)
      }
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
      // setTransworldArray([...affiliatedLinksArray, transworld])
      // setAboutText('')
      // setTransworldLink('')
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
  }
  const addTag = (e) => {
    if (e.key === 'Enter' || e.key == ',') {
      e.preventDefault()

      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value])

        e.target.value = ''
      }
    }
    // setTagsValidation(false)
  }

  // ///////////////////////////////////////////////////
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
  const websiteLinkHttpsValidation = (e) => {
    if (websiteLinks !== '' && websiteLinks !== undefined && !websiteLinks.startsWith('https://')) {
      const webLink = 'https://' + websiteLinks
      setWebsiteLinks(webLink)
    }
  }
  return (
    <div className='container mx-auto pb-20 px-md-10'>
      <div className='row'>
        {/* aboutCompany  */}
        <div className='col-md-6 mt-5'>
          <label className='form-label required'>Website Links (Company)</label>
          <input
            name='websiteLinks'
            className='form-control form-control-lg form-control-solid'
            type='text'
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
        <div className='col-md-6 mt-5'>
          <label htmlFor='' className='d-flex align-items-center required  fw-bold form-label'>
            Countries Served
          </label>
          <Multiselect
            options={allCountries}
            selectedValues={locationValue}
            onSelect={locationChange}
            onRemove={locationChange}
            displayValue='name'
            placeholder='Enter countries served'
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
        <div className='col-md-6 mt-5'>
          <label className='form-label required '>About Company</label>
          <textarea
            type='text'
            placeholder='Enter about company'
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

        <div className='col-md-6 mt-5'>
          <label className='form-label required '>About (Personal etc)</label>
          <textarea
            type='text'
            placeholder='Enter about personal'
            className='form-control form-control-lg form-control-solid'
            name='aboutPersonal'
            // cols='30'
            // rows='10'
            value={aboutPersonal}
            onChange={(e) => onInputChange(e)}
            required
          />

          {aboutPersonalValidation ? (
            <div className='biz_owner_input_validation'>Enter about personal</div>
          ) : null}
        </div>
        <div className='col-md-6 mt-5'>
          <label className='form-label required '>Services Offered</label>
          <textarea
            type='text'
            placeholder='Enter services offered'
            className='form-control form-control-lg form-control-solid'
            name='servicesOffered'
            // cols='30'
            // rows='10'
            value={servicesOffered}
            onChange={(e) => onInputChange(e)}
            required
          />

          {servicesOfferedValidation ? (
            <div className='biz_owner_input_validation'>Enter services Offered</div>
          ) : null}
        </div>
        <div className='col-md-6 mt-5'>
          <label className='form-label required '>Affiliations</label>
          <textarea
            type='text'
            placeholder='Enter affiliations'
            className='form-control form-control-lg form-control-solid'
            name='Affiliations'
            // cols='30'
            // rows='10'
            value={affiliations}
            onChange={(e) => onInputChange(e)}
            required
          />

          {affiliationsValidation ? (
            <div className='biz_owner_input_validation'>Enter affiliations</div>
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className=' mt-7 col-12 '>
          <label className='d-flex align-items-center  fw-bold form-label mb-2'>
            <span className=''>Enter tags</span>
          </label>

          <div>
            <div className='tag-container'>
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
        </div>
      </div>
      <div className='row'>
        <div className='col-12  col-md-6 mt-5'>
          <label className='d-flex align-items-center  fw-bold form-label'>
            <span> Other Reference Link</span>
          </label>
          <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
            <div className='col-lg-11 col-md-10 col-11'>
              <input
                type='url'
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
        <div className='col-12  col-md-6 mt-5'>
          <label className='d-flex align-items-center  fw-bold form-label required'>
            Add Affiliated Broker Links
          </label>
          <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
            <div className='col-lg-11 col-md-10 col-11'>
              <input
                type='url'
                className='form-control form-control-solid'
                name='affiliatedLinks'
                value={affiliatedLinks}
                onChange={(e) => onInputChange(e)}
                placeholder='https://'
              />
              {affiliatedLinksValidation ? (
                <div className='biz_owner_input_validation'> Enter affiliated broker link</div>
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
        <div className='  col-12 col-md-6 mt-5'>
          <label className='d-flex align-items-center  fw-bold form-label required'>
            Add License
          </label>
          <div className='row  mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
            <div className=' col-lg-11 col-md-10 col-11'>
              <div className='row'>
                <div className='col-6'>
                  <input
                    type='number'
                    className='form-control form-control-solid  me-2'
                    name='licensedID'
                    value={licensedID}
                    onChange={(e) => onInputChange(e)}
                    placeholder='Enter license Id'
                    // onChange={(e) => setPrice(e.target.value)}
                    // disabled='disabled'
                  />
                  {licensedIDValidation ? (
                    <div className='biz_owner_input_validation'>Enter license id</div>
                  ) : null}
                </div>
                <div className='col-6'>
                  {/* <input
                    type='text'
                    className='form-control form-control-solid '
                    name='licensed'
                    value={licensed}
                    onChange={(e) => onInputChange(e)}
                    placeholder='Enter which country'
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
                    <div className='biz_owner_input_validation'>Enter license</div>
                  ) : null}
                </div>
              </div>
              {licensedArray
                ? licensedArray.map((input, index) => (
                    <>
                      <div className='col-12 mt-2' key={index}>
                        <div className='row'>
                          {index == 0 && (
                            <>
                              <div className='col-6'>
                                <label htmlFor='' className='text-wrap text-break fw-bolder '>
                                  License Id
                                </label>
                              </div>
                              <div className='col-6'>
                                <label htmlFor='' className='text-wrap text-break fw-bolder '>
                                  Country
                                </label>
                              </div>
                            </>
                          )}
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
                                {input?.licence_id}
                              </label>
                            </div>
                          </div>

                          <div className='col-6'>
                            <label htmlFor='' className='text-wrap text-break'>
                              {input?.country}
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
        </div>
        <div className='  col-12 col-md-6 mt-5'>
          <label className='d-flex align-items-center  fw-bold form-label required'>
            Transworld Business Broker, LLC
          </label>
          <div className='row mx-0 py-2' style={{backgroundColor: '#fafafa'}}>
            <div className='col-lg-11 col-md-10 col-11'>
              <div className='row'>
                <div className='col-6'>
                  <input
                    type='text'
                    className='form-control form-control-solid me-2'
                    name='aboutText'
                    value={aboutText}
                    onChange={(e) => onInputChange(e)}
                    placeholder='Enter text'
                  />
                  {aboutTextValidation ? (
                    <div className='biz_owner_input_validation'>{aboutTextValue}</div>
                  ) : null}
                </div>
                <div className='col-6'>
                  <input
                    type='url'
                    className='form-control form-control-solid '
                    name='transworldLink'
                    value={transworldLink}
                    onChange={(e) => onInputChange(e)}
                    placeholder='https://'
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
                          {index == 0 && (
                            <>
                              <div className='col-6'>
                                <label htmlFor='' className='text-wrap text-break fw-bolder '>
                                  About
                                </label>
                              </div>
                              <div className='col-6'>
                                <label htmlFor='' className='text-wrap text-break fw-bolder '>
                                  Links
                                </label>
                              </div>
                            </>
                          )}
                          <div className='d-flex col-6'>
                            <div>
                              <MdDelete
                                size={20}
                                className='text-danger cursor-pointer '
                                onClick={() => removeTransworld(index)}
                              />
                            </div>
                            <div>
                              <label htmlFor='' className='text-wrap text-break'>
                                {input.about}
                              </label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <a href={input.link} target='_blank' className='text-wrap text-break'>
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
              <MdAddCircle
                size={30}
                color='#009ef7'
                className='cursor-pointer mt-1'
                onClick={(e) => addTransworld(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className=' d-flex justify-content-end mt-10  '>
          {btnLoader ? (
            <span className='btn btn-primary'>
              <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
            </span>
          ) : (
            <span className='btn btn-primary ' onClick={(e) => propDetailInformation(e)}>
              Continue
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailInformation
