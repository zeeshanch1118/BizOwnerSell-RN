import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {Navigate, useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {useDispatch} from 'react-redux'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  const addNewListing = true
  const addListingHandler = async () => {
    const editBtn = localStorage.getItem('editBtn')
    localStorage.removeItem('businessID')
    localStorage.removeItem('franchiseID')
    localStorage.removeItem('stepSkipAble')
    localStorage.removeItem('listingStatus')

    if (editBtn) {
      dispatch({
        type: 'INDUSTRY',
        payload: {
          save: !addNewListing,
        },
      })
      localStorage.removeItem('editBtn')
    }
  }
  return (
    <div className='menu-item'>
      <Link
        className={clsx('menu-link without-sub', {active: isActive})}
        to={to}
        onClick={() => (to == '/dashboard/add-to-new-listing' ? addListingHandler() : null)}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
