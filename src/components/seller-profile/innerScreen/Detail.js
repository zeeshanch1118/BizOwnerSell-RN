import React, {useEffect, useState} from 'react'

import {FaPhoneSquareAlt} from 'react-icons/fa'
import {Tab, Tabs} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Modal} from 'react-bootstrap'

import backIcon from '../../../assets/icons/backIcon.svg'
import twitter from '../../../assets/icons/social-share-icons/White-twitter.svg'
import facebookIcon from '../../../assets/icons/social-share-icons/White-fb.svg'
import emailIcon from '../../../assets/icons/social-share-icons/White-email.svg'
import linkedinIcon from '../../../assets/icons/social-share-icons/White-link-din.svg'
import {GrFacebookOption} from 'react-icons/gr'
import dummyImg from '../../../assets/dummy.jpg'
import locationIcon from '../../../assets/icons/location.svg'

import shareIcon from '../../../../src/assets/broker-icons/share-broker.svg'
import '../../business-brokers/innerScreen/Detail.css'
import {modalText} from '../../alert-text'
import Swal from 'sweetalert2'
import ForSaleListings from '../../business-brokers/innerScreen/ForSaleListings'
import SoldListing from '../../business-brokers/innerScreen/SoldListing'
import {KTSVG} from '../../../_metronic/helpers'
const Detail = (props) => {
  const [isShareModelShow, setShow] = useState(false)
  const [forBusinessData, setForBusinessData] = useState([])
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  let businessData = []

  useEffect(() => {
    props?.saleBusiness[0]?.salebusiness?.map((item, index) => {
      businessData.push({
        id: item.id,
        title: item.title,
        location: item.location,
        favorite: item.favorite,
        price: item.asking_price,
        cashFlow: item.cash_flow,
        description: item.description,
        img: item.slider_images,
        slug: item.slug,
        location_visibitiy: item.location_visibitiy,
        imgId: 'bizOwner' + item.id + 'imgId',
        type: item.listing_category,
        listingType: item,
      })
    })
    props?.saleBusiness[0]?.saleFranchise?.map((item, index) => {
      businessData.push({
        id: item.id,
        title: item?.title,
        location: item.location,
        favorite: item.favorite,
        price: item.total_investment,
        cashFlow: item.cash_required,
        description: item?.short_description,
        img: item.slider_images,
        slug: item.slug,
        location_visibitiy: item.location_visibitiy,
        imgId: 'bizOwner' + item.id + 'imgId',
        type: item.listing_category,
        listingType: item,
      })
    })
    setForBusinessData(businessData)

    // {
    //   document
    //     .querySelector('meta[property="og:title"]')
    //     .setAttribute('content', props?.data[0]?.first_name + ' ' + props?.data[0]?.last_name ?? '')
    // }
    // {
    //   document
    //     .querySelector('meta[property="og:description"]')
    //     .setAttribute(
    //       'content',
    //       props?.data[0]?.broker_detail?.about_personal?.replace(/(<([^>]+)>)/gi, '')
    //     )
    // }
    // {
    //   document
    //     .querySelector('meta[property="og:image"]')
    //     .setAttribute(
    //       'content',
    //       props?.data[0]?.profile_image?.full_path +
    //         'thumb/' +
    //         props?.data[0]?.profile_image?.file_name
    //     )
    // }

    // {
    //   document.querySelector('meta[property="og:image"]').setAttribute(
    //     'content'
    //     props?.data[0]?.profile_image?.full_path + 'thumb/' + props?.data[0]?.profile_image?.file_name
    //   )
    // }
  }, [props])
  const navigate = useNavigate()

  const closeModal = () => {
    setShow(false)
  }
  function agentAlertHandler() {
    Swal.fire({
      text: modalText,

      icon: 'warning',
      // timer: 2000,
      confirmButtonColor: '#009ef7',

      confirmButtonText: 'Ok',
    })
  }
  return (
    <>
      <>
        <button
          className='biz-owner-business-detail-back-button mt-4 mb-2 px-0'
          onClick={() => navigate(-1)}
        >
          <span className='text-primary '>
            <img src={backIcon} alt='' />
          </span>
        </button>
        <div className='row biz-owner-detail-carousel-container-broker'>
          <div className=' p-md-6 pt-0 mt-3  row position-relative'>
            <div className='col-md-3'>
              {props?.data[0]?.profile_image?.full_path ? (
                <img
                  src={
                    props?.data[0]?.profile_image?.full_path +
                    'thumb/' +
                    props?.data[0]?.profile_image?.file_name
                  }
                  alt=''
                  style={{backgroundColor: '#f5f8fa'}}
                  className='img-fluid'
                />
              ) : (
                <img
                  src={dummyImg}
                  alt=''
                  style={{height: '14rem', backgroundColor: '#f5f8fa'}}
                  className='img-fluid'
                />
              )}
            </div>
            <div className='col-md-9 mt-5 mt-md-0 '>
              <h4 className=' broker-name'>
                {/* {props?.data[0]?.first_name ?? ''} */}
                <span className='ms-1'>{props?.data[0]?.username ?? ''}</span>
              </h4>
              <p className='fs-5  mt-2'>
                {!showPhoneNumber ? (
                  <span
                    className='mx-1 cursor-pointer text-primary'
                    onClick={() =>
                      role == 'agent' ? agentAlertHandler() : setShowPhoneNumber(true)
                    }
                  >
                    <span className='me-1 mb-1'>
                      <FaPhoneSquareAlt size={18} className='broker-phone-icon' />
                    </span>
                    {props?.data[0]?.phone !== '' && props?.data[0]?.phone !== null
                      ? props?.data[0]?.phone.replace(/.(?=.{3})/g, '*')
                      : null}
                  </span>
                ) : (
                  <a href={`tel:${props?.data[0]?.phone ?? 'NaN'}`} className='d-inline  '>
                    <span className='me-1 mb-1 text-primary'>
                      <FaPhoneSquareAlt size={18} className='broker-phone-icon' />
                    </span>
                    {props?.data[0]?.phone ?? ''}
                  </a>
                )}
                {/*  */}
                {/* {props?.data[0]?.phone ? (
                  <a
                    href={`tel:${props?.data[0]?.phone}`}
                    className='biz_owner_sell_font_size broker-phone'
                  >
                    <span className='me-1 mb-1'>
                      <FaPhoneSquareAlt size={18} className='broker-phone-icon' />
                    </span>
                    {props?.data[0]?.phone}
                  </a>
                ) : (
                  ''
                )} */}
              </p>
              <p className='fs-4 mb-2 biz-broker-description biz-owner-paragraph-broker mt-2'>
                <img className='mb-1 ms-1 me-3' src={locationIcon} alt='' width={13} />

                {props?.data[0]?.location?.formatted_address !== null &&
                props?.data[0]?.location?.formatted_address !== undefined &&
                props?.data[0]?.location?.formatted_address !== 'null' ? (
                  <>
                    {' '}
                    <span> {props?.data[0]?.location?.formatted_address ?? ''}</span>
                  </>
                ) : (
                  <>
                    {' '}
                    <span className='pe-1'>{props?.data[0]?.location?.address ?? ''},</span>
                    <span className='pe-1'> {props?.data[0]?.location?.city ?? ''},</span>
                    <span className='pe-1'> {props?.data[0]?.location?.country ?? ''}</span>
                  </>
                )}
              </p>
              <p className='fs-4 mb-2 biz-broker-description biz-owner-paragraph-broker mt-2'>
                <span className=''>
                  <KTSVG
                    path='/media/icons/duotune/communication/com011.svg'
                    className='svg-icon-4 me-3 text-primary ms-1'
                  />
                  <a
                    href={`mailto:${props?.data[0]?.email ?? ''}`}
                    className='biz-broker-description biz-owner-paragraph-broker text-hover-primary'
                  >
                    {props?.data[0]?.email ?? ''}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>

        {forBusinessData?.length < 1 && props?.soldBusiness[0]?.length < 1 ? null : (
          <>
            <Tabs defaultActiveKey='profile' id='fill-tab-example' className='mt-3 fs-3' fill>
              {forBusinessData?.length > 0 ? (
                <Tab eventKey='profile' title='For Sale'>
                  <div className='mt-10'>
                    {forBusinessData?.map((post, index) => (
                      <>
                        <div className=' my-5 ' key={index}>
                          <div className='' key={index + 1}>
                            <div className=' ' key={index + 3}>
                              <ForSaleListings
                                id={post.id}
                                title={post.title}
                                location={post.location}
                                dec={post.description}
                                price={post.price}
                                cashFlow={post.cashFlow}
                                img={post.img}
                                slug={post.slug}
                                favorite={post.favorite}
                                imgId={post.imgId}
                                type={post.type}
                                fullIndex={post}
                                locationVisibility={post.location_visibitiy}
                                listingType={post?.listingType}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </Tab>
              ) : null}
              {props?.soldBusiness[0]?.length > 0 ? (
                <Tab eventKey='longer-tab' title='Sold'>
                  <div className='mt-8'>
                    <SoldListing sold={props?.soldBusiness} soldFranchise={props?.soldFranchise} />
                  </div>
                </Tab>
              ) : null}
            </Tabs>
          </>
        )}
      </>
    </>
  )
}

export default Detail
