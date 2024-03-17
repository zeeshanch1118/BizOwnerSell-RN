/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useAuth} from '../../../../app/modules/auth'
import {useLayout} from '../../core'
import {Header} from './Header'
import {DefaultTitle} from './page-title/DefaultTitle'
import {Topbar} from './Topbar'
import mainLogoImage from '../../../../../src/assets/images/mainLogoImage.svg'

import {useSelector} from 'react-redux'
export function HeaderWrapper() {
  const {currentUser} = useAuth()
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config
  const userData = localStorage.getItem('userData')
  const [transformedData, setTransformedData] = useState()
  const [hearder, setHeader] = useState(true)

  let data = useSelector((state) => {
    return state
  })
  useEffect(() => {
    const userData = localStorage.getItem('userData')
    const trasData = JSON?.parse(JSON.stringify(userData) || '')
    setTransformedData(trasData)

    if (hearder == true) {
      setHeader(false)
    } else {
      setHeader(true)
    }
  }, [data])

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch ')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}

        {transformedData
          ? aside.display && (
              <div
                className='d-flex align-items-center d-lg-none ms-n3 me-1'
                title='Show aside menu'
              >
                <div
                  className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
                  id='kt_aside_mobile_toggle'
                >
                  <KTSVG
                    path='/media/icons/duotune/abstract/abs015.svg'
                    className='svg-icon-2x mt-1'
                  />
                </div>
              </div>
            )
          : null}

        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <img alt='Logo' src={mainLogoImage} width='100%' height={30} />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <img alt='Logo' src={mainLogoImage} width={100} height={30} />
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}
          {transformedData ? (
            <div className='d-flex align-items-stretch flex-shrink-0'>
              <Topbar />
            </div>
          ) : (
            config.header.left === 'menu' && (
              <div
                className='d-flex align-items-center d-lg-none ms-2 me-n3'
                title='Show header menu'
              >
                <div
                  className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
                  id='kt_header_menu_mobile_toggle'
                >
                  <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
                </div>
              </div>
            )
          )}
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
