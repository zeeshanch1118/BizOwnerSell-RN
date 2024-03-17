import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useDispatch} from 'react-redux'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
}

const MenuItem: React.FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
}) => {
  let updateTopbar = 'topbar'
  let dispatch = useDispatch()
  function setEstablishedbusinessID() {
   
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')

    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: [1],
      })
    )

    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     updateTopbar,
    //   },
    // })
  }

  function setAssetSaleID() {
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')

    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: [2],
      })
    )

    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     updateTopbar,
    //   },
    // })
  }
  function setSearchBusinessID() {
    localStorage.removeItem('industriesID')
    localStorage.removeItem('listingsID')
    localStorage.removeItem('listingName')
    localStorage.removeItem('industriesName')
    localStorage.removeItem('minPrice')
    localStorage.removeItem('maxPrice')
    localStorage.removeItem('years')
    localStorage.removeItem('grossMinPrice')
    localStorage.removeItem('cashMinPrice')
    localStorage.removeItem('grossMaxPrice')
    localStorage.removeItem('cashMaxPrice')
    localStorage.removeItem('addDates')
    localStorage.removeItem('tag')
    localStorage.removeItem('locationFilter')
    localStorage.removeItem('cityID')
    localStorage.removeItem('countryID')
    localStorage.removeItem('stateID')
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     updateTopbar,
    //   },
    // })
  }
  function clearStorageID() {
    localStorage.removeItem('franchiseLocationFilter')
    localStorage.removeItem('f_minPrice')
    localStorage.removeItem('f_maxPrice')
    localStorage.removeItem('franchiseListingName')
    localStorage.removeItem('franchiseCountryID')
    localStorage.removeItem('franchisesID')
    localStorage.removeItem('franchiseStateID')
    localStorage.removeItem('franchiseCityID')
    // dispatch({
    //   type: 'INDUSTRY',
    //   payload: {
    //     updateTopbar,
    //   },
    // })
  }

  const {pathname} = useLocation()

  return (
    <div className='menu-item me-lg-1'>
      <Link
        className={clsx('menu-link py-3', {
          active: checkIsActive(pathname, to),
        })}
        to={to}
        onClick={() =>
          to == '/search-businesses/established-businesses-for-sale'
            ? setEstablishedbusinessID()
            : to == '/search-businesses/assets-for-sale'
            ? setAssetSaleID()
            : to == '/search-businesses-for-sale'
            ? setSearchBusinessID()
            : to == '/low-cost-franchise/1'
            ? clearStorageID()
            : to == '/food-and-restaurant-franchise/2'
            ? clearStorageID()
            : to == '/business-opportunities-franchise/3'
            ? clearStorageID()
            : to == '/retail-franchise/4'
            ? clearStorageID()
            : ''
        }
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
      </Link>
    </div>
  )
}

export {MenuItem}
