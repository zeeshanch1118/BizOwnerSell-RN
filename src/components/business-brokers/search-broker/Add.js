import React from 'react'
import MainScreenLoader from '../../../../src/assets/Loader/MainScreenLoader.gif'

import add from '../../../assets/icons/sideAdd.svg'
const Add = (props) => {
  return (
    <>
      <div className={`${props.my} add-container px-0`} style={{width: '95%', marginLeft: 'auto'}}>
        {
          props?.sideBarAdd != '' && props?.sideBarAdd != undefined ? (
            <img
              src={props?.sideBarAdd}
              alt=''
              className='img-fluid w-100 ms-auto '
              style={{height: '100%'}}
            />
          ) : (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{height: '90vh', width: '100%'}}
            >
              <div>
                <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
              </div>
            </div>
          )
          // <img src={add} alt='' className='img-fluid w-100 ms-auto ' />
        }
      </div>
    </>
  )
}

export default Add
