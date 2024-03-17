/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import accountIcon from '../../../../assets/aside-icons/accountIcon.svg'
import messageIcon from '../../../../assets/aside-icons/messageIcon.svg'
import Accounticon from '../../../../assets/aside-icons/Accounticons.svg'
import recommendationIcon from '../../../../assets/aside-icons/recommendationIcon.svg'
import searchingIcon from '../../../../assets/aside-icons/searchingIcon.svg'
import sellingIcon from '../../../../assets/aside-icons/sellingIcon.svg'
import dashBoardIcon from '../../../../assets/aside-icons/dashBoardIcon.svg'
import manageListingIcon from '../../../../assets/aside-icons/manageListingIcon.svg'
import packagesIcon from '../../../../assets/aside-icons/packagesIcon.svg'
import locationIcon from '../../../../assets/aside-icons/manageLocation.svg'
import reportedListingIcon from '../../../../assets/aside-icons/reportedListingIcon.svg'
import reasonsIcon from '../../../../assets/aside-icons/reasonsIcon.svg'
import manageInvoicesIcon from '../../../../assets/aside-icons/manageInvoicesIcon.svg'
import manageUsersIcon from '../../../../assets/aside-icons/manageUsersIcon.svg'
import manageBrokersIcon from '../../../../assets/aside-icons/manageBrokersIcon.svg'
import couponIcon from '../../../../assets/aside-icons/couponIcon.svg'
import adsIcon from '../../../../assets/aside-icons/addsIcon.svg'
import activeBusiness from '../../../../assets/activeBusinessIcon.svg'
import activeFranchise from '../../../../assets/activeFranchiseIcon.svg'
export function AsideMenuMain() {
  const intl = useIntl()
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {role} = transformedData
  //
  return (
    <div className='gy-5 row gx-0'>
      {role === 'user' || role === 'broker' ? (
        <>
          <AsideMenuItem
            to='/dashboard/'
            icon={dashBoardIcon}
            title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
            fontIcon='bi-app-indicator'
          />

          <AsideMenuItemWithSub to='#' title='Selling' fontIcon='bi-sticky' icon={sellingIcon}>
            <AsideMenuItem to='/dashboard/my-listings' title='My Listings' hasBullet={true} />
            {/* <AsideMenuItem to='/dashboard/selling-guide' title='Guide to Selling' hasBullet={true} /> */}
            <AsideMenuItem
              to='/dashboard/add-to-new-listing'
              title='Add a New Listing'
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to='/error'
            title='Saved Items'
            fontIcon='bi-sticky'
            icon={searchingIcon}
          >
            <AsideMenuItem
              to='/dashboard/saved-listings'
              title='My Saved Listings'
              hasBullet={true}
            />
            <AsideMenuItem
              to='/dashboard/saved-searches'
              title='My Saved Searches'
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItem
            to='/dashboard/recommended-upgrade'
            title='Recommendations'
            icon={recommendationIcon}
          />

          {/* {role === 'user' && (
            <AsideMenuItem
              to='/dashboard/inbox'
              title='My Mailbox'
              hasBullet={false}
              icon={messageIcon}
            />
          )} */}
          {role === 'broker' || role === 'user' ? (
            <>
              <AsideMenuItemWithSub
                to='/error'
                title='Message Center'
                fontIcon='bi-sticky'
                icon={messageIcon}
              >
                <AsideMenuItem to='/dashboard/inbox' title='My Mailbox' hasBullet={true} />
                <AsideMenuItem to='/dashboard/contact' title='My Contacts' hasBullet={true} />
                {/* <AsideMenuItem to='/dashboard/export-leads' title='Export Leads' hasBullet={true} /> */}
              </AsideMenuItemWithSub>
            </>
          ) : null}
          {role === 'broker' && (
            <AsideMenuItem
              to='/dashboard/manage-agents'
              icon={manageUsersIcon}
              title='Manage Agents'
              fontIcon='bi-app-indicator'
            />
          )}
          <AsideMenuItem
            to='/dashboard/my-account'
            title='My Account'
            hasBullet={false}
            icon={Accounticon}
          />
          {/* <AsideMenuItemWithSub to='/error' title='Account' fontIcon='bi-sticky' icon={accountIcon}>
            <AsideMenuItem
              to='/dashboard/billing-information'
              title='My Billing Information'
              hasBullet={true}
            />
          </AsideMenuItemWithSub> */}
          <AsideMenuItem
            to='/dashboard/all-invoices'
            icon={manageInvoicesIcon}
            title='Invoices'
            fontIcon='bi-app-indicator'
          />
        </>
      ) : role === 'admin' ? (
        <>
          <AsideMenuItem
            to='/dashboard/manage-users'
            icon={manageUsersIcon}
            title='Manage Users'
            fontIcon='bi-app-indicator'
          />

          {/* <AsideMenuItem
            to='/dashboard/manage-brokers'
            icon={manageBrokersIcon}
            title='Manage Brokers'
            fontIcon='bi-app-indicator'
          /> */}
          <AsideMenuItem
            to='/dashboard/package-management'
            icon={packagesIcon}
            title='Manage Packages'
            fontIcon='bi-app-indicator'
          />
          {/* <AsideMenuItem
            to='/dashboard/features-management'
            icon='/media/icons/duotune/art/art002.svg'
            title='Features Management'
            fontIcon='bi-app-indicator'
          /> */}
          {/* <AsideMenuItem
            to='/dashboard/message-center'
            icon='/media/icons/duotune/art/art002.svg'
            title='Message Center'
            fontIcon='bi-app-indicator'
          /> */}
          {/* <AsideMenuItem
            to='/dashboard/transection-record'
            icon='/media/icons/duotune/art/art002.svg'
            title='Transections Record'
            fontIcon='bi-app-indicator'
          /> */}
          {/* <AsideMenuItem
              to='/dashboard/manage-industries'
              icon='/media/icons/duotune/art/art002.svg'
              title='Manage Industries'
              fontIcon='bi-app-indicator'
            /> */}
          {/* <AsideMenuItem
              to='/dashboard/payment_method'
              icon='/media/icons/duotune/art/art002.svg'
              title='Manage Payment Methods'
              fontIcon='bi-app-indicator'
            /> */}
          <AsideMenuItem
            to='/dashboard/manage-locations'
            icon={locationIcon}
            title='Manage Locations'
            fontIcon='bi-app-indicator'
          />
          <AsideMenuItem
            to='/dashboard/reported-listing'
            icon={reportedListingIcon}
            title='Reported Listings'
            fontIcon='bi-app-indicator'
          />
          <AsideMenuItem
            to='/dashboard/manage-reasons'
            icon={reasonsIcon}
            title='Manage Reasons'
            fontIcon='bi-app-indicator'
          />
          <AsideMenuItemWithSub
            to='#'
            title='Manage Categories'
            fontIcon='bi-sticky'
            icon={manageListingIcon}
          >
            <AsideMenuItemWithSub
              to='#'
              title='Businesses'
              fontIcon='bi-sticky'
              icon={activeBusiness}
            >
              <AsideMenuItem
                to='/dashboard/businesses-catagories'
                title='Business Listings'
                hasBullet={false}
              />
              <AsideMenuItem
                to='/dashboard/industries-catagories'
                title='Business Industries'
                hasBullet={false}
              />
              {/* <AsideMenuItem to='/dashboard/real-estate-listing' title='Real Estate Listings' hasBullet={true} /> */}
            </AsideMenuItemWithSub>
            <AsideMenuItemWithSub
              to='#'
              title='Franchises'
              fontIcon='bi-sticky'
              icon={activeFranchise}
            >
              <AsideMenuItem
                to='/dashboard/franchises-catagories'
                title='Franchises Catagories'
                hasBullet={false}
              />
            </AsideMenuItemWithSub>
          </AsideMenuItemWithSub>

          <AsideMenuItemWithSub
            to='#'
            title='Manage Listings'
            fontIcon='bi-sticky'
            icon={manageListingIcon}
          >
            <AsideMenuItem
              to='/dashboard/businesses-listings'
              title='Businesses'
              hasBullet={false}
              icon={activeBusiness}
            />
            <AsideMenuItem
              to='/dashboard/franchises-listings'
              title='Franchises'
              hasBullet={false}
              icon={activeFranchise}
            />
          </AsideMenuItemWithSub>

          <AsideMenuItem
            to='/dashboard/invoices'
            icon={manageInvoicesIcon}
            title='Invoices'
            fontIcon='bi-app-indicator'
          />
          <AsideMenuItem
            to='/dashboard/manage-ads'
            icon={adsIcon}
            title='Manage Ads'
            fontIcon='bi-app-indicator'
          />
          <AsideMenuItem
            to='/dashboard/manage-coupon'
            icon={couponIcon}
            title='Manage Coupon'
            fontIcon='bi-app-indicator'
          />
        </>
      ) : role === 'agent' ? (
        <>
          <AsideMenuItem
            to='/dashboard/'
            icon={dashBoardIcon}
            title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
            fontIcon='bi-app-indicator'
          />

          <AsideMenuItemWithSub to='#' title='Selling' fontIcon='bi-sticky' icon={sellingIcon}>
            <AsideMenuItem to='/dashboard/my-listings' title='My Listings' hasBullet={true} />
            {/* <AsideMenuItem to='/dashboard/selling-guide' title='Guide to Selling' hasBullet={true} /> */}
            <AsideMenuItem
              to='/dashboard/add-to-new-listing'
              title='Add a New Listing'
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </>
      ) : null}
    </div>
  )
}
