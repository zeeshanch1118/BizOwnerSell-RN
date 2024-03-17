import React from 'react'
import {IoIosArrowForward} from 'react-icons/io'
import {Link} from 'react-router-dom'

const FinanceCenterHeader = (props) => {
  return (
    <header>
      <div className='container-fluid  bg-primary px-0'>
        <div className='container'>
          <div className='py-4 px-1 bg-primary'>
            <Link to='/finance-center'>
              {props.name ? (
                <h5
                  className='text-white fw-normal header_hover m-0 pt-3'
                  style={{fontSize: '1.5rem',backgroundColor:"#00A3EF"}}
                >
                  Finance Center
                  <IoIosArrowForward />
                </h5>
              ) : (
                <h6 className='text-white fw-normal m-0 pt-3 py-2' style={{fontSize: '2.7rem'}}>
                  Finance Center
                </h6>
              )}
            </Link>

            <h1 className=' text-light fs-1 pt-1 fw-bold'>{props.name}</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default FinanceCenterHeader
