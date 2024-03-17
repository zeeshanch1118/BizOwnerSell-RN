import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import Overview from './components/Overview'
// import {Projects} from './components/Projects'
import {Listing} from './components/Listing'
// import {Documents} from './components/Documents'
// import {Connections} from './components/Connections'
import {ProfileHeader} from './ProfileHeader'
import {Settings} from './components/settings/Settings'
import BizByzBillingSetting from '../account/components/settings/cards/BizByzBillingSetting'
import BrokerDetailInfo from './components/broker-detail-info/BrokerDetailInfo'
import CompanyImages from './components/company-images/CompanyImages'
import ProfileSubscription from './components/profile-subscription/ProfileSubscription'
import Package from './components/update-subscription/Package'
import Payment from './components/update-subscription/Payment'
const tokenData = localStorage.getItem('userData')
const transtokenData = tokenData ? JSON.parse(tokenData) : ''
const {accessToken} = transtokenData
const {role} = transtokenData ?? ''
const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/dashboard/my-account/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
function getprofiledata() {}

const ProfilePage = () =>
  role == 'user' || role == 'agent' ? (
    <Routes>
      <Route
        element={
          <>
            <ProfileHeader />

            <Outlet />
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
              <Overview />
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Settings</PageTitle>
              <BizByzBillingSetting />
            </>
          }
        />
        <Route
          path='listings'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Listings</PageTitle>
              <Listing />
            </>
          }
        />
        {/* <Route
        path='documents'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Business</PageTitle>
            <Documents />
          </>
        }
      /> */}
        {/* <Route
        path='connections'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
            <Connections />
          </>
        }
      /> */}
        <Route index element={<Navigate to='/dashboard/my-account/overview' />} />
      </Route>
    </Routes>
  ) : role == 'broker' ? (
    <Routes>
      <Route
        element={
          <>
            <ProfileHeader />

            <Outlet />
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Basic Information</PageTitle>
              <Overview />
            </>
          }
        />
        <Route
          path='profile-subscription'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Subscription</PageTitle>
              <ProfileSubscription />
            </>
          }
        />
        <Route
          path='package'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Subscription</PageTitle>
              <Package />
            </>
          }
        />
        <Route
          path='payment'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Subscription</PageTitle>
              <Payment />
            </>
          }
        />
        <Route
          path='broker-detail-information'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Detail Information</PageTitle>
              <BrokerDetailInfo />
            </>
          }
        />
        <Route
          path='company-images'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Company Images</PageTitle>
              <CompanyImages />
            </>
          }
        />
        {/* <Route
    path='documents'
    element={
      <>
        <PageTitle breadcrumbs={profileBreadCrumbs}>Business</PageTitle>
        <Documents />
      </>
    }
  /> */}
        {/* <Route
    path='connections'
    element={
      <>
        <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
        <Connections />
      </>
    }
  /> */}
        <Route index element={<Navigate to='/dashboard/my-account/overview' />} />
      </Route>
    </Routes>
  ) : null

export default ProfilePage
