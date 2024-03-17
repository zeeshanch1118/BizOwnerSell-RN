import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link, useLocation} from 'react-router-dom'
import Business from './Listings'
import Listings from './Business'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
import {AiOutlinePlus} from 'react-icons/ai'
import franchiseIcon from '../../../assets/icons/Branch-icon-06.svg'
import franchiseIconBlue from '../../../assets/icons/Branch-icon-blue.svg'
import {MdOutlineBusinessCenter} from 'react-icons/md'

const AddListing = () => {
  const [typeOfListing, setTypeOfListing] = useState('Business')
  let listingBtnType = localStorage.getItem('listingBtn')
  useEffect(() => {
    if (listingBtnType) {
      setTypeOfListing(listingBtnType)
    }
  }, [])
  localStorage.setItem('listingBtn', typeOfListing)

  const WhichTypeOfListingChange = async (e) => {
    if (e.target.name == 'franchise') {
      setTypeOfListing('franchise')

      localStorage.setItem('listingBtn', typeOfListing)
    } else if (e.target.name == 'business') {
      setTypeOfListing('Business')
      localStorage.setItem('listingBtn', typeOfListing)
    }
  }

  const [activeStep, setActiveStep] = useState(0)

  function getStepContent(step) {
    switch (step) {
      case 0:
        if (typeOfListing == 'Business') {
          return (
            <>
              {/* <Business nextStep={nextStep} /> */}
              <Listings nextStep={nextStep} />
            </>
          )
        }
      case 1:
        return (
          <>
            {/* <Listings nextStep={nextStep} /> */}
            <Business nextStep={nextStep} />
          </>
        )
    }
  }

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const {pathname} = useLocation()
  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              {activeStep == 0 ? (
                <>
                  {/* bizOwner-inner-heading */}
                  <div className='card-header border-1 border-bottom pt-6'>
                    <div className='card-title mb-0'>
                      <div className='d-flex align-items-center position-relative my-1'>
                        <h2>Listings</h2>
                      </div>
                    </div>
                    <div className='card-toolbar '>
                      <div
                        className='d-flex justify-content-end align-items-center  me-2'
                        data-kt-user-table-toolbar='base'
                      >
                        <a
                          className={`  cursor-pointer  px-2   ${
                            typeOfListing == 'Business' ? 'text-primary' : 'text-dark'
                          }  btn-lg `}
                          role='button'
                          data-kt-docs-advanced-forms='interactive'
                          name='business'
                          onClick={(e) => WhichTypeOfListingChange(e)}
                        >
                          <MdOutlineBusinessCenter
                            size={32}
                            className='cursor-pointer pe-2 pb-1'
                            role='button'
                            name='business'
                            data-kt-docs-advanced-forms='interactive'
                            onClick={(e) => {
                              setTypeOfListing('Business')

                              WhichTypeOfListingChange(e)
                            }}
                          />
                          Business
                        </a>
                        <a
                          className={` cursor-pointer px-2   ${
                            typeOfListing == 'Business' ? 'text-dark' : 'text-primary'
                          }  btn-lg `}
                          data-kt-docs-advanced-forms='interactive'
                          role='button'
                          name='franchise'
                          onClick={(e) => WhichTypeOfListingChange(e)}
                        >
                          {typeOfListing == 'Business' ? (
                            <img
                              src={franchiseIcon}
                              alt=''
                              className='pe-1 pb-1'
                              style={{width: '30px'}}
                              onClick={(e) => {
                                setTypeOfListing('franchise')
                                WhichTypeOfListingChange(e)
                              }}
                            />
                          ) : (
                            <img
                              src={franchiseIconBlue}
                              alt=''
                              className='pe-1 pb-1'
                              style={{width: '30px'}}
                              onClick={(e) => {
                                setTypeOfListing('franchise')
                                WhichTypeOfListingChange(e)
                              }}
                            />
                          )}
                          Franchise
                        </a>
                        <Link
                          to='/dashboard/add-to-new-listing'
                          className='btn  btn-primary p-3 m-0'
                          onClick={() => (
                            localStorage.removeItem('businessID'),
                            localStorage.removeItem('franchiseID'),
                            localStorage.removeItem('listingStatus')
                          )}
                        >
                          <AiOutlinePlus size={15} color='white' className='cursor-pointer ' />
                          <span className='d-none d-md-inline'>Add New Listing</span>
                        </Link>
                      </div>
                    </div>
                    {/* <div className='d-md-flex align-items-center'>
                        <a
                          className={`  cursor-pointer p-0 me-5 ${
                            typeOfListing == 'Business' ? 'text-primary' : 'text-dark'
                          }  btn-lg `}
                          role='button'
                          data-kt-docs-advanced-forms='interactive'
                          name='business'
                          onClick={(e) => WhichTypeOfListingChange(e)}
                        >
                          <MdOutlineBusinessCenter
                            size={32}
                            className='cursor-pointer pe-2 pb-1'
                            role='button'
                            name='business'
                            data-kt-docs-advanced-forms='interactive'
                            onClick={(e) => setTypeOfListing('Business')}
                          />
                          Business
                        </a>
                        <a
                          className={` cursor-pointer p-0 me-2  ${
                            typeOfListing == 'Business' ? 'text-dark' : 'text-primary'
                          }  btn-lg `}
                          data-kt-docs-advanced-forms='interactive'
                          role='button'
                          name='franchise'
                          onClick={(e) => WhichTypeOfListingChange(e)}
                        >
                          {typeOfListing == 'Business' ? (
                            <img
                              src={franchiseIcon}
                              alt=''
                              className='pe-1 pb-1'
                              style={{width: '30px'}}
                            />
                          ) : (
                            <img
                              src={franchiseIconBlue}
                              alt=''
                              className='pe-1 pb-1'
                              style={{width: '30px'}}
                              onClick={(e) => setTypeOfListing('franchise')}
                            />
                          )}
                          Franchise
                        </a>
                      </div> */}
                  </div>
                </>
              ) : null}

              <KTCardBody className='py-4 mb-4'>{getStepContent(activeStep)}</KTCardBody>

              {/* <Business /> */}
            </KTCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddListing
