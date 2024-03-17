import React, {useEffect, useState} from 'react'

import {FaPhoneSquareAlt} from 'react-icons/fa'
import {Tab, Tabs} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
//
import SoldListing from './SoldListing'
import ForSaleListings from './ForSaleListings'
import backIcon from '../../../assets/icons/backIcon.svg'
import twitter from '../../../assets/icons/social-share-icons/White-twitter.svg'
import facebookIcon from '../../../assets/icons/social-share-icons/White-fb.svg'
import emailIcon from '../../../assets/icons/social-share-icons/White-email.svg'
import linkedinIcon from '../../../assets/icons/social-share-icons/White-link-din.svg'
import {GrFacebookOption} from 'react-icons/gr'
import dummyImg from '../../../assets/dummy.jpg'

import shareIcon from '../../../../src/assets/broker-icons/share-broker.svg'
import './Detail.css'
import {modalText} from '../../alert-text'
import Swal from 'sweetalert2'
const Detail = (props) => {
  const [isOpenMembershipe, setIsOpenMembershipe] = useState(false)
  const [isOpenCertification, setIsOpenCertification] = useState(false)
  const [membershipeImg, setMembershipeImg] = useState('')
  const [certificationImg, setCertificationImg] = useState('')
  const [membershipeDescriptin, setMembershipeDescriptin] = useState('')
  const [certificationDescriptin, setCertificationDescriptin] = useState('')

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
        title: item.title,
        location: item.location,
        favorite: item.favorite,
        price: item.total_investment,
        cashFlow: item.cash_required,
        description: item.short_description,
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
            {/* <div className='pt-10'>ddddd</div> */}
            {/* <div className='col-12 d-flex-justify-content-end '>
              <img
                src={shareIcon}
                alt=''
                type='button'
                className='cursor-pointer broker-share-icon'
                onClick={() => setShow(true)}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </div> */}

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
                {props?.data[0]?.first_name ?? ''}
                <span className='ms-1'>{props?.data[0]?.last_name ?? ''}</span>
              </h4>
              <p className='fs-5 mb-2'>
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
              <p className='fs-4 mb-2 biz-broker-description biz-owner-paragraph-broker'>
                {props?.data[0]?.broker_detail?.about_personal ?? 'NaN'}
                {/* Licensed Business Broker Since 2008 | Certified Business Coach | Certified Franchise
                Consultant */}
              </p>
              <div className='row'>
                <div className='d-flex justify-content-between gap-4  flex-wrap'>
                  {props?.data[0]?.membershipe_description.length > 0 ? (
                    <div className='text-center'>
                      <p className='fs-4 mb-0 biz-broker-Membership text-primary'>Memberships</p>
                      {props?.data[0]?.membershipe_description?.length > 0
                        ? props?.data[0]?.membershipe_description?.map((item, index) => (
                            <>
                              <img
                                src={item?.image?.full_path + 'thumb/' + item?.image?.file_name}
                                className='biz-broker-Membership-img ms-2 cursor-pointer border border-primary border-1 '
                                alt=''
                                key={index}
                                onClick={() => {
                                  setIsOpenMembershipe(true)
                                  setMembershipeImg(item?.image?.full_path + item?.image?.file_name)
                                  setMembershipeDescriptin(item?.description)
                                }}
                              />
                            </>
                          ))
                        : null}
                    </div>
                  ) : null}
                  {props?.data[0]?.certification_description?.length > 0 ? (
                    <div className='text-center'>
                      <p className='fs-4 mb-0 biz-broker-Membership text-primary'>Certifications</p>
                      {props?.data[0]?.certification_description?.length > 0
                        ? props?.data[0]?.certification_description?.map((item, index) => (
                            <img
                              src={item?.image?.full_path + 'thumb/' + item?.image?.file_name}
                              className='biz-broker-Membership-img ms-2 cursor-pointer border border-primary border-1 '
                              alt=''
                              onClick={() => {
                                setIsOpenCertification(true)
                                setCertificationImg(item?.image?.full_path + item?.image?.file_name)
                                setCertificationDescriptin(item?.description)
                              }}
                            />
                          ))
                        : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey='home' id='fill-tab-example' className='mt-3 fs-3' fill>
          <Tab eventKey='home' title='About'>
            <div className='row mt-10 biz-owner-business-description-broker mb-md-5 py-7'>
              <div className='card px-5 px-md-8'>
                <div className='py-3 px-0'>
                  <div className='row'>
                    <>
                      {props?.data[0]?.company_name != '' &&
                      props?.data[0]?.company_name != null &&
                      props?.data[0]?.company_name != undefined ? (
                        <>
                          <div className='col-12 my-3'>
                            <h3 className=' biz-owner-detail-para-heading-broker'> Company</h3>
                          </div>
                          {props?.data[0]?.company_name != '' &&
                          props?.data[0]?.company_name != undefined &&
                          props?.data[0]?.company_name != null ? (
                            <>
                              <div className='col-md-4 my-3'>
                                <h3 className=' biz-owner-detail-para-heading-broker'> Name</h3>
                              </div>
                              <div className='col-md-8 my-2 biz-owner-paragraph-broker'>
                                {props?.data[0]?.company_name ?? ''}
                              </div>
                            </>
                          ) : null}
                          {/* Paul Proano Properties */}
                          {props?.data[0]?.broker_detail?.link != '' &&
                          props?.data[0]?.broker_detail?.link != null &&
                          props?.data[0]?.broker_detail?.link != undefined ? (
                            <>
                              <div className='col-md-4 my-3'>
                                <h3 className=' biz-owner-detail-para-heading-broker'> Link</h3>
                              </div>
                              <div className='col-md-8 my-3'>
                                <a
                                  href={props?.data[0]?.broker_detail?.link}
                                  target='_blank'
                                  className='col-md-6 '
                                >
                                  {props?.data[0]?.broker_detail?.link ?? ''}
                                </a>
                              </div>
                            </>
                          ) : null}

                          {props?.data[0]?.broker_images?.length > 0 ? (
                            <>
                              <div className='col-sm-3  my-3 biz-owner-detail-para-heading-broker '>
                                {/* carousel         */}
                                {props?.data[0]?.broker_images?.length > 0 ? (
                                  <div
                                    id='carouselExampleCaptions'
                                    className='carousel slide position-relative'
                                    data-bs-ride='carousel'
                                  >
                                    <div className='carousel-inner '>
                                      {props?.data[0]?.broker_images?.length > 0 ? (
                                        props?.data[0]?.broker_images?.map((item, ind) => (
                                          <div
                                            className={`carousel-item ${ind == 0 ? 'active' : ''} `}
                                            key={ind}
                                          >
                                            <img
                                              src={item?.full_path + 'thumb/' + item?.file_name}
                                              className='d-block w-100'
                                              alt='...'
                                              height={'130px'}
                                            />
                                          </div>
                                        ))
                                      ) : (
                                        <>
                                          <div className='carousel-item active'>
                                            <img
                                              src='https://media.istockphoto.com/photos/colleagues-discussing-over-digital-tablet-picture-id498323251?k=20&m=498323251&s=612x612&w=0&h=sdJebPUxqVOAPUxmG0inV3RJqy4tbmzg6yiIotNaNxY'
                                              id='broker-company-img'
                                              className='d-block w-100 biz-owner-detail-carousel-img'
                                              alt='...'
                                            />
                                          </div>

                                          <div className='carousel-item '>
                                            <img
                                              id='broker-company-img'
                                              src='https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                                              className='d-block w-100 biz-owner-detail-carousel-img'
                                              alt='...'
                                            />
                                          </div>
                                        </>
                                      )}

                                      {/* <div className='carousel-item active'>
                  <img
                    src={detail}
                    className='d-block w-100 biz-owner-detail-carousel-img'
                    alt='...'
                  />
                </div>
                <div className='carousel-item'>
                  <img
                    src='https://images.bizbuysell.com/shared/listings/198/1981969/4e0fcf0f-05dd-412a-a72b-e7ebf0e37479-W768.jpg'
                    className='d-block w-100 biz-owner-detail-carousel-img'
                    alt='...'
                  />
                </div>
                <div className='carousel-item'>
                  <img
                    src='https://images.bizbuysell.com/shared/listings/195/1951559/2d34d055-d2bf-4ade-b700-428ba96501f0-W768.jpg'
                    className='d-block w-100 biz-owner-detail-carousel-img'
                    alt='...'
                  />
                </div> */}
                                    </div>
                                    {props?.data[0]?.broker_images?.length > 1 ? (
                                      <>
                                        <button
                                          className='carousel-control-prev biz-owner-carousel-btn-images my-auto'
                                          type='button'
                                          data-bs-target='#carouselExampleCaptions'
                                          data-bs-slide='prev'
                                        >
                                          <span
                                            id='detail-page-carousel-btn'
                                            className='carousel-control-prev-icon biz-owner-detail-carousel-left-btn'
                                            aria-hidden='true'
                                          />
                                          <span className='visually-hidden'>Previous</span>
                                        </button>
                                        <button
                                          className='carousel-control-next biz-owner-carousel-btn-images broker-image-next-btn my-auto'
                                          type='button'
                                          data-bs-target='#carouselExampleCaptions'
                                          data-bs-slide='next'
                                        >
                                          <span
                                            id='detail-page-carousel-btn'
                                            className='carousel-control-next-icon '
                                            aria-hidden='true'
                                          />
                                          <span className='visually-hidden'>Next</span>
                                        </button>
                                      </>
                                    ) : null}
                                  </div>
                                ) : null}

                                {/* <div className='pt-10'>ddddd</div> */}
                              </div>
                              <div className='col-1 d-none d-md-inline'></div>
                            </>
                          ) : (
                            <div className='col-4'></div>
                          )}
                          {props?.data[0]?.broker_detail?.about_company != '' &&
                          props?.data[0]?.broker_detail?.about_company != undefined &&
                          props?.data[0]?.broker_detail?.about_company != null ? (
                            <div className='col-sm-8  '>
                              {props?.data[0]?.broker_detail?.about_company != '' &&
                              props?.data[0]?.broker_detail?.about_company != undefined &&
                              props?.data[0]?.broker_detail?.about_company != null ? (
                                <div className='my-3 biz-owner-paragraph-broker'>
                                  {props?.data[0]?.broker_detail?.about_company ?? ''}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </>
                      ) : null}

                      {props?.data[0]?.broker_detail?.service_offered != '' &&
                      props?.data[0]?.broker_detail?.service_offered != undefined &&
                      props?.data[0]?.broker_detail?.service_offered != null ? (
                        <>
                          <div className='col-md-4  my-3 biz-owner-detail-para-heading-broker '>
                            Services Offered
                          </div>
                          <div className='col-md-8  my-3 biz-owner-paragraph-broker'>
                            {props?.data[0]?.broker_detail?.service_offered ?? ''}
                          </div>
                        </>
                      ) : null}
                      {props?.data[0]?.broker_detail?.about_personal != '' &&
                      props?.data[0]?.broker_detail?.about_personal != undefined &&
                      props?.data[0]?.broker_detail?.about_personal != null ? (
                        <>
                          <div className='col-md-4  my-3 biz-owner-detail-para-heading-broker '>
                            About
                          </div>
                          <div className='col-md-8  my-3 biz-owner-paragraph-broker'>
                            {props?.data[0]?.broker_detail?.about_personal ?? ''}
                          </div>
                        </>
                      ) : null}

                      {props?.data[0]?.locations?.length > 0 ? (
                        <>
                          <div className='col-md-4  my-3  biz-owner-detail-para-heading-broker '>
                            countries Served
                          </div>
                          <div className='col-md-8 biz-owner-paragraph-broker d-flex flex-wrap mt-4'>
                            {props?.data[0]?.locations?.length > 0 ? (
                              props?.data[0]?.locations?.map((item, index) => (
                                <p
                                  className='mb-2 fs-6  me-4 px-2 py-1  bg-secondary'
                                  style={{borderRadius: '3px'}}
                                  key={index}
                                >
                                  {item?.country}
                                </p>
                              ))
                            ) : (
                              <p className='mb-2 fs-6 d-md-inline'>USA</p>
                            )}
                          </div>
                        </>
                      ) : null}
                      {props?.data[0]?.broker_references?.length > 0 ? (
                        <>
                          <div className='col-md-4  my-3 biz-owner-detail-para-heading-broker'>
                            Broker Links
                          </div>

                          <div className='col-md-8 mt-4'>
                            {props?.data[0]?.broker_references?.length > 0
                              ? props?.data[0]?.broker_references?.map((item, index) => (
                                  <p
                                    key={index}
                                    className=' me-md-4 mb-1 border border-bottom-2 border-top-0 border-left-0 border-right-0'
                                  >
                                    <a
                                      href={item?.reference_link}
                                      target='_blank'
                                      className=' d-md-inline fs-6'
                                    >
                                      {item?.reference_link}
                                    </a>
                                  </p>
                                ))
                              : null}
                          </div>
                        </>
                      ) : null}
                      {props?.data[0]?.licenses?.length > 0 ? (
                        <div className='row'>
                          <div className='col-md-4  my-3 biz-owner-detail-para-heading-broker'>
                            License In
                          </div>

                          <div className='col-md-8 mt-md-5 biz-owner-paragraph-broker'>
                            <div className='row'>
                              {props?.data[0]?.licenses?.length > 0
                                ? props?.data[0]?.licenses?.map((item, index) => (
                                    <>
                                      <div className='col-sm-6 ' key={index}>
                                        <div className='mb-2  biz-owner-paragraph-broker fs-5 fw-normal'>
                                          {item?.country}
                                        </div>
                                      </div>
                                      <div className='col-sm-6 '>
                                        <div className='mb-2  biz-owner-paragraph-broker  fs-5 fw-normal'>
                                          {item?.licence_id}
                                        </div>
                                      </div>
                                    </>
                                  ))
                                : null}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
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

      <Modal show={isShareModelShow} onHide={closeModal} centered={true}>
        <Modal.Header closeButton className='p-4'>
          <Modal.Title style={{fontSize: '20px'}}>Share Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2 d-flex justify-content-center'>
            <span
              className='social-media-icons cursor-pointer px-3 facebook-share-back-ground '
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Facebook'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <FacebookShareButton
                url={`https://bizownersell.jgago.com/search-for-broker/${props?.data[0]?.id}`}
              >
                {/* <GrFacebookOption size={50} color='#1D56D3' /> */}
                <img src={facebookIcon} alt='' width={50} />
              </FacebookShareButton>
            </span>
            <span
              className='social-media-icons cursor-pointer px-3 email-share-back-ground'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Email'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <EmailShareButton
                className='pe-0'
                subject={`${props?.data[0]?.first_name} ${props?.data[0]?.last_name}`}
                body={props?.data[0]?.broker_detail?.about_personal}
                url={`https://bizownersell.jgago.com/search-for-broker/${props?.data[0]?.id}`}
              >
                <img src={emailIcon} alt='' width={50} />
              </EmailShareButton>
            </span>
            <span
              className='social-media-icons cursor-pointer px-3 twitter-share-back-ground'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Twitter'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <TwitterShareButton
                url={`https://bizownersell.jgago.com/search-for-broker/${props?.data[0]?.id}`}
              >
                <img src={twitter} alt='' width={55} />
              </TwitterShareButton>
            </span>
            <span
              className='cursor-pointer px-3 linkdin-share-back-ground'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              title='Linkedin'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <LinkedinShareButton
                url={`https://bizownersell.jgago.com/search-for-broker/${props?.data[0]?.id}`}
              >
                <img src={linkedinIcon} alt='' width={50} />
              </LinkedinShareButton>
            </span>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isOpenMembershipe}
        onHide={() => setIsOpenMembershipe(!isOpenMembershipe)}
        centered={true}
      >
        <Modal.Header closeButton className='p-4'>
          <Modal.Title style={{fontSize: '20px'}}>Membership Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2 '>
            <div className='mb-4  '>
              <img src={membershipeImg} width='100%' />
            </div>

            <div>
              <h6>Description</h6>
              <p>{membershipeDescriptin}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isOpenCertification}
        onHide={() => setIsOpenCertification(!isOpenCertification)}
        centered={true}
      >
        <Modal.Header closeButton className='p-4'>
          <Modal.Title style={{fontSize: '20px'}}>Certification Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2  '>
            <div className='mb-4  '>
              <img src={certificationImg} width='100%' />
            </div>
            <div>
              <h6>Description</h6>
              <p>{certificationDescriptin}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Detail
