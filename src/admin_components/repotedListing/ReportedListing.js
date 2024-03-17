import React, {useEffect, useState} from 'react'
import './ReportedListing.css'
import franchiseIcon from '../../assets/icons/Branch-icon-06.svg'
import franchiseIconBlue from '../../assets/icons/Branch-icon-blue.svg'
import {MdOutlineBusinessCenter} from 'react-icons/md'
import ReportedBusinesses from './ReportedBusinesses'
import ReportedFranchises from './ReportedFranchises'
import {KTSVG, KTCardBody, KTCard} from '../../_metronic/helpers'
const ReportedListing = () => {
  const [typeOfListing, setTypeOfListing] = useState('Business')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
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

      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Reported Listings</h3>
                  </div>
                </div>
                <div className='card-toolbar '>
                  <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
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
                      className={` cursor-pointer p-0   ${
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
                          onClick={(e) => setTypeOfListing('franchise')}
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
                  </div>
                </div>
              </div>
              <KTCardBody className='py-4 mb-4'>
                {typeOfListing == 'Business' ? (
                  <>
                    <ReportedBusinesses />
                  </>
                ) : typeOfListing == 'franchise' ? (
                  <ReportedFranchises />
                ) : null}
              </KTCardBody>
            </KTCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportedListing
