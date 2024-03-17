import React, {useEffect, useState} from 'react'
import franchiseIcon from '../../../assets/icons/Branch-icon-06.svg'
import franchiseIconBlue from '../../../assets/icons/Branch-icon-blue.svg'
import {MdOutlineBusinessCenter} from 'react-icons/md'
import MySavedBusinesses from './MySavedBusinesses'
import MySavedFranchises from './MySavedFranchises'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
const MySavedLisings = () => {
  const [typeOfListing, setTypeOfListing] = useState('Business')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const WhichTypeOfListingChange = async (e) => {
    if (e.target.name == 'franchise') {
      setTypeOfListing('franchise')
    } else if (e.target.name == 'business') {
      setTypeOfListing('Business')
    }
  }

  return (
    <>
      {/* Header Start */}

      <div
        className='dashboard-bg py-0 '
        id='bgBlur'
        style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}
      >
        <div className='container p-0 p-md-10'>
          <div className='row p-5 bg-white' style={{minHeight: '90vh', borderRadius: '9px'}}>
            <div className='col-12 p-5  bg-white  rounded'>
              <div className='d-flex flex-md-row flex-column justify-content-between flex-wrap mx-1'>
                <div className=' d-flex align-items-center'>
                  <h3 className=' d-inline  mb-0 align-items-center'>Saved Listings</h3>
                </div>

                <div className='d-flex align-items-center flex-wrap'>
                  <div>
                    <a
                      className={`  cursor-pointer px-0 me-2 ${
                        typeOfListing == 'Business' ? 'text-primary' : 'text-dark'
                      }  btn-lg `}
                      // className='btn btn-light-primary btn-lg '
                      role='button'
                      data-kt-docs-advanced-forms='interactive'
                      name='business'
                      onClick={(e) => WhichTypeOfListingChange(e)}
                    >
                      <MdOutlineBusinessCenter
                        size={30}
                        className='cursor-pointer pe-2'
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
                      className={` cursor-pointer px-0  ${
                        typeOfListing == 'Business' ? 'text-dark' : 'text-primary'
                      }  btn-lg `}
                      data-kt-docs-advanced-forms='interactive'
                      role='button'
                      name='franchise'
                      onClick={(e) => WhichTypeOfListingChange(e)}
                    >
                      {/* <MdOutlineBusinessCenter
                              size={30}
                              id='franchise'
                              className='cursor-pointer pe-2'
                              onClick={(e) => setTypeOfListing('franchise')}
                            /> */}
                      {typeOfListing == 'Business' ? (
                        <img
                          src={franchiseIcon}
                          alt=''
                          className='pe-1'
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
                          className='pe-1'
                          style={{width: '30px'}}
                          onClick={(e) => {
                            setTypeOfListing('franchise')
                            WhichTypeOfListingChange(e)
                          }}
                        />
                      )}
                      Franchise
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {typeOfListing == 'Business' ? (
              <MySavedBusinesses />
            ) : typeOfListing == 'franchise' ? (
              <MySavedFranchises />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default MySavedLisings
