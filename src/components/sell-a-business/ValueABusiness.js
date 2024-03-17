import {height} from '@mui/system'
import React from 'react'
import BBSValuationReportLogo from '../../assets/media/small-business-value/BBSValuationReportLogo.png'
import DC_Logo_D_RGB_LG from '../../assets/media/small-business-value/DC_Logo_D_RGB_LG.png'
import './ValueABusiness.css'
import {useNavigate} from 'react-router-dom'
const SmallBusinessValuation = () => {
  const navigate = useNavigate()
  return (
    <div className='container-fluid px-0'>
      {/* Header */}
      <div className='my-4'>
        <h1 className='text-primary text-center fs-1 fw-bold header_h1'>
          Discover What Your Business Is Worth
        </h1>
      </div>
      {/* Main Section begin */}
      <div className='bg-secondary '>
        <div className='row container-fluid justify-content-center text-center py-4 '>
          {/*begin Card 1 */}
          <div
            className=' col-lg-3 col-md-6 g-3 border border-3 p-0 bg-white'
            style={{width: '28rem'}}
          >
            <div className='py-5 ' style={{backgroundColor: '#F3F3F3'}}>
              <img
                src='https://www.bizbuysell.com/xcommon/images/marketing/valuation/BizWorthLogo.svg'
                alt=''
                className=' w-75 px-5'
              />
            </div>
            <div>
              <ul className='list-group row-fluid list-group-flush'>
                <li className='list-group-item'>
                  <p className='fs-1 lead'>Get a Quick Estimate</p>
                  <p className='fs-6'>
                    Calculate sale price using your location, industry and basic financials
                  </p>
                </li>
                <li className='list-group-item fs-6 py-4'>Get your estimate in minutes</li>
                <li className='list-group-item fs-6 py-4'>Learn the high and low range</li>
                <li className='list-group-item fs-6 py-4'>Best of all, it’s free</li>
                <li className='list-group-item fs-6 py-4'></li>
              </ul>
              <button
                className='rounded border-0 w-75 fs-4 py-5'
                onClick={() => {
                  navigate('/bizWorth-business-valuation')
                }}
              >
                Get Started
              </button>
              <p className='card-text py-4'>
                <small>Select if you need a ballpark estimate</small>
              </p>
            </div>
          </div>
          {/*end Card 1 */}
          {/*begin Card 2 */}
          <div
            className=' col-lg-3 bg-white col-md-6 g-3 border border-3 p-0 mx-5 '
            style={{width: '28rem'}}
          >
            <div className='py-5 bg-primary'>
              <img src={BBSValuationReportLogo} className='img-fluid w-50' alt='' />
            </div>
            <div>
              <ul className='list-group row-fluid list-group-flush'>
                <li className='list-group-item'>
                  <p className='fs-1 lead fw-bold text-primary'>Get a Benchmark</p>
                  <p className='fs-6'>
                    Calculate sale price using your location, industry and basic financials
                  </p>
                </li>
                <li className='list-group-item fs-6 py-4'>Get your estimate in minutes</li>
                <li className='list-group-item fs-6 py-4'>Learn the high and low range</li>
                <li className='list-group-item fs-6 py-4'>Best of all, it’s free</li>
                <li className='list-group-item fs-6 py-4'></li>
              </ul>
              <button
                className='rounded border-0 w-75 fs-4 py-5 text-light bg-primary'
                onClick={() => {
                  navigate('/business-valuation-report')
                }}
              >
                Get Started
              </button>
              <p className='card-text py-4'>
                <small>Select if you need a ballpark estimate</small>
              </p>
            </div>
          </div>
          {/*end Card 2 */}
          {/*begin Card 3 */}
          <div
            className=' col-lg-3 bg-white col-md-6 g-3 border border-3 p-0'
            style={{width: '28rem'}}
          >
            <div className='py-5 bg-dark'>
              <img src={DC_Logo_D_RGB_LG} alt='' className=' w-100 px-5' />
            </div>
            <div>
              <ul className='list-group row-fluid list-group-flush'>
                <li className='list-group-item'>
                  <p className='fs-1 lead'>Get the Real Value</p>
                  <p className='fs-6'>
                    Calculate sale price using your location, industry and basic financials
                  </p>
                </li>
                <li className='list-group-item fs-6 py-4'>Get your estimate in minutes</li>
                <li className='list-group-item fs-6 py-4'>Learn the high and low range</li>
                <li className='list-group-item fs-6 py-4'>Best of all, it’s free</li>
                <li className='list-group-item fs-6 py-4'></li>
              </ul>
              <button
                className='rounded border-0 text-light bg-dark w-75 fs-4 py-5'
                onClick={() => {
                  navigate('/what-is-my-business-worth')
                }}
              >
                Get Started
              </button>
              <p className='card-text py-4'>
                <small>Select if you need a ballpark estimate</small>
              </p>
            </div>
          </div>
          {/*end Card 3 */}
        </div>
        <div className='container'>
          <hr />
          <div className='text-center py-3'>
            <p> Have Questions? We can help. </p>
            <p> Call Toll-Free: (888)777-9892 opt. 2 (8-5 PST)</p>
          </div>
        </div>
      </div>
      {/* End Main Section */}
    </div>
  )
}

export default SmallBusinessValuation
