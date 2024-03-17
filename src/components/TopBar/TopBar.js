import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Industry from './Industry'
import ListingTypes from './ListingTypes'
import MoreFilters from './MoreFilters'
import PriceRange from './PriceRange'
import SaveSearches from './SaveSearches'
import SearchBar from './SearchBar'
import ClearIcon from '../../assets/landing-bg/Vector (Stroke).png'

const TopBar = () => {
  
  const ClearStates = () => {
    localStorage.removeItem('listingFilters')
    localStorage.removeItem('industryFilters')
    localStorage.removeItem('searchItems')
   
   
  }

  return (
    <>
      <div className='w-100 d-flex gap-5  justify-content-center'>
        <div className=''>
          <SearchBar />
        </div>
        <div className='d-none d-sm-block '>
          <Industry />
        </div>
        <div className='d-none d-sm-block'>
          <ListingTypes />
        </div>
        <div className='d-none d-md-block'>
          <PriceRange />
        </div>
        <div>
          <MoreFilters />
        </div>
        <div className='d-none d-lg-block'>
          <button
            className='btn btn-primary  px-4'
            type='button'
            onClick={() => ClearStates()}
          >
          <img src={ClearIcon}/>  Clear
          </button>
        </div>
        <div className='d-none d-lg-block'>
          <SaveSearches />
        </div>
       
      </div>
      
    </>
  )
}

export default TopBar
