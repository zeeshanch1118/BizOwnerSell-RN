/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {profileListings} from '../../../services/profile-services'
import {Card5} from '../Card5'
import MainScreenLoader from '../../../../assets/Loader/MainScreenLoader.gif'

export function Listing() {
  const [totalListing, setTotalListing] = useState('')
  const [totalFranchise, setTotalFranchise] = useState('')
  const [totalAsset, setTotalAsset] = useState('')
  const [activeListing, setActiveListing] = useState('')
  const [activeFranchise, setActiveFranchise] = useState('')
  const [activeAssets, setActiveAssets] = useState('')
  const [expiredListing, setExpiredListing] = useState('')
  const [expiredFranchise, setExpiredFranchise] = useState('')
  const [expiredAssets, setExpiredAssets] = useState('')
  const [blockListing, setBlockListing] = useState('')
  const [blockAssets, setBlockAssets] = useState('')
  const [blockFranchise, setBlockFranchise] = useState('')
  const [deleteFranchise, setDeleteFranchise] = useState('')
  const [deleteListing, setDeleteListing] = useState('')
  const [deleteAsset, setDeleteAsset] = useState('')
  const userData = localStorage.getItem('userData')
  const [loader, setLoader] = useState(false)

  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  useEffect(() => {
    getProfileListingTypes()
  }, [])

  const getProfileListingTypes = async () => {
    const response = await profileListings(accessToken)
    // if (response.status == true) {
    setLoader(true)
    setActiveListing(response?.active_businesses)
    setActiveFranchise(response?.active_franchises)
    setActiveAssets(response?.active_assets)
    setExpiredListing(response?.expired_business)
    setExpiredFranchise(response?.expired_franchise)
    setExpiredAssets(response?.expired_assets)
    setBlockListing(response?.block_businesses)
    setBlockAssets(response?.block_assets)
    setBlockFranchise(response?.block_franchises)
    setDeleteFranchise(response?.delete_franchise)
    setDeleteListing(response?.delete_businesses)
    setDeleteAsset(response?.delete_assets)
    setTotalListing(response?.total_businesses)
    setTotalFranchise(response?.total_franchises)
    setTotalAsset(response?.total_assets)
    // }
  }
  return (
    <>
      {loader ? (
        <div className='container px-5'>
          <div className='row'>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                description={totalListing}
                // status='down'
                // statusValue={40.5}
                // statusDesc='more impressions'
                // progress={0.5}
                // progressType='MRR'
                title='Total Businesses'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                title='Total Franchises'
                description={totalFranchise}
                // status='up'
                // statusValue={17.62}
                // statusDesc='Followers growth'
                // progress={5}
                // progressType='New trials'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                title='Total Assets'
                description={totalAsset}
                // status='down'
                // statusValue={10.45}
                // statusDesc='Less comments than usual'
                // progress={40}
                // progressType='Impressions'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/pinterest-p.svg'
                title='Active Listings'
                description={activeListing}
                // status='up'
                // statusValue={26.1}
                // statusDesc='More posts'
                // progress={10}
                // progressType='Spend'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/github.svg'
                title='Active Franchises'
                description={activeFranchise}
                // status='down'
                // statusValue={32.8}
                // statusDesc='Less contributions'
                // progress={40}
                // progressType='Dispute'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/youtube-play.svg'
                title='Active Assets'
                description={activeAssets}
                // status='up'
                // statusValue={29.45}
                // statusDesc='Subscribers growth'
                // progress={40}
                // progressType='Subscribers'
              />
            </div>
            {/* <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/telegram.svg'
                title='Expired Listings'
                description={expiredListing}
                // status='up'
                // statusValue={11.4}
                // statusDesc='more clicks'
                // progress={40}
                // progressType='Profit'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Expired Franchises'
                description={expiredFranchise}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Expired Assets'
                description={expiredAssets}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Block Listings '
                description={blockListing}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Block Franchises '
                description={blockFranchise}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Block Assets '
                description={blockAssets}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Deleted Listings '
                description={deleteListing}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Deleted Franchises '
                description={deleteFranchise}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div>
            <div className='col-sm-6 col-xl-4 mt-5'>
              <Card5
                // image='/media/svg/brand-logos/reddit.svg'
                title='Deleted Assets '
                description={deleteAsset}
                // status='up'
                // statusValue={46.7}
                // statusDesc='more adds'
                // progress={0.0}
                // progressType='Retention'
              />
            </div> */}
          </div>
          {/* <div className='row g-6 g-xl-9 '>
        </div> */}
        </div>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '50vh', width: '140%'}}
        >
          <div>
              <img src={MainScreenLoader} alt="BizOwnerSell" width="80" height="80" />
          </div>
        </div>
      )}
    </>
  )
}
