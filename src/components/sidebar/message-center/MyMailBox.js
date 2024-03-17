import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
// import {ChatInner, DrawerMessenger} from '../../_metronic/partials'
import {RiDeleteBack2Line} from 'react-icons/ri'
import './MyMail.css'
import {padding} from '@mui/system'
import {AiOutlinePlus} from 'react-icons/ai'

import franchiseIcon from '../../../assets/icons/Branch-icon-06.svg'
import franchiseIconBlue from '../../../assets/icons/Branch-icon-blue.svg'
import {MdOutlineBusinessCenter} from 'react-icons/md'
import BusinessMessageCenter from './BusinessMessageCenter'
import FranchiseMessageCenter from './FranchiseMessageCenter'
import BrokerMessageCenter from './BrokerMessageCenter'
const MyMailBox = () => {
  const [typeOfListing, setTypeOfListing] = useState('Business')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {role} = transformedData
  const WhichTypeOfListingChange = async (e) => {
    if (e.target.name == 'franchise') {
      setTypeOfListing('franchise')
    } else if (e.target.name == 'business') {
      setTypeOfListing('Business')
    }
  }
  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row rounded'>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>My Mailbox</h3>
                  </div>
                  {/* <div className='d-flex align-items-center position-relative my-1'>
                    <h3 className=' d-inline bizOwner-inner-heading mb-0 align-items-center'>
                      Location Management
                    </h3>
                  </div> */}
                </div>
                <div className='card-toolbar '>
                  <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
                    <a
                      className={`  cursor-pointer px-2 ${
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
                        className='cursor-pointer pe-2 d-md-inline'
                        role='button'
                        name='business'
                        data-kt-docs-advanced-forms='interactive'
                        onClick={(e) => setTypeOfListing('Business')}
                      />
                      Business
                    </a>
                  </div>
                  <div>
                    <a
                      className={` cursor-pointer  px-2 ${
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
                          className='pe-1  d-md-inline'
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
              <KTCardBody className='py-4 mb-4'>
                {typeOfListing == 'Business' ? (
                  <BusinessMessageCenter />
                ) : typeOfListing == 'franchise' ? (
                  <FranchiseMessageCenter />
                ) : null}
              </KTCardBody>
            </KTCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyMailBox
