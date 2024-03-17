import React, {useEffect, useState} from 'react'
import Multiselect from 'multiselect-react-dropdown'
import './multiselect.css'
import {baseURL} from '../services/BaseURL'
import axios from 'axios'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

const Industry = (props) => {
  const businessIndustries = async (name, slug) => {
    try {
      const response = await fetch(
        `${baseURL}/public/bussiness-industries`,

        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name,
            slug: slug,
          }),
        }
      )
      const result = await response.json()
      console.log('result ', result)
      return result
    } catch (e) {
      throw e
    }
  }

  const industryData = [
    {name: ' Restaurants & Food', id: ' Restaurants & Food'},
    {name: ' Service Businesses', id: ' Service Businesses'},
    {name: '  Automotive & Boat', id: '  Automotive & Boat'},

    {name: '  Building & Construction', id: '  Building & Construction'},
    {name: ' Retail', id: ' Retail'},
    {name: '  Health Care & Fitness', id: '  Health Care & Fitness'},
    {name: ' Service Businesses', id: ' Service Businesses'},
  ]

  // const [items, setItems] = useState([])

  const [industry, setIndustry] = useState(null)

  const industryChange = async (e) => {
    await setIndustry(e)

    // console.log(industry.length)
  }
  // const ApiCall = async() =>{
  //   try{
  //     const Industries = await fetch("https://bizbuysell.jgago.com/api/v1/bussiness-industries")
  //     console.log("Industries ", Industries.status);
  //   }
  //   catch(err){
  //     console.log("Not Found", err)

  //   }
  // }
  const SaveIndustryData = async () => {
    localStorage.setItem('industryFilters', JSON.stringify(industry))
  }

  const items = JSON?.parse(localStorage.getItem('industryFilters'))
  useEffect(() => {
    if (items) {
      setIndustry(items)
    }
  }, [])

  return (
    <>
      <div>
        {/* <button onClick={()=>businessIndustries()}>API</button> */}
        <div>
          <button
            style={{color: '#808080'}}
            className='btn btn-white fs-4'
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_industry'
          >
            Industries <MdOutlineKeyboardArrowDown className='ms-10 fs-2 text-primary' />
            {industry ? (
              <span>{industry.length > 0 ? <span>({industry.length})</span> : null}</span>
            ) : null}
          </button>
        </div>

        <div className='modal fade ' tabIndex={-1} id='kt_modal_industry'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header p-3'>
                <h5 className='modal-title ps-4'> Industries</h5>

                <div
                  className='btn btn-icon btn-sm text-dark ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <span className='fs-2'>🗙</span>
                </div>
              </div>
              <div className='modal-body pb-0'>
                <Multiselect
                  options={industryData}
                  selectedValues={industry}
                  onSelect={() => industryChange()}
                  onRemove={() => industryChange()}
                  displayValue='name'
                  placeholder='Enter an Industry '
                  showArrow={false}
                  singleSelect={false}
                  closeIcon={false}
                  showCheckbox={true}
                  style={{
                    searchBox: {
                      fontSize: 12,

                      backgroundColor: '#e7f3fc',
                    },
                    option: {
                      color: 'black',
                    },
                  }}
                />
                <div className='modal-footer d-flex justify-content-between p-3'>
                  <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => SaveIndustryData()}
                    data-bs-dismiss='modal'
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Industry
