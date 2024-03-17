import React, {useState, useEffect} from 'react'
import {getBizOwnerAdds} from '../../services/advertisement/Add'
import add from '../../../assets/icons/sideAdd.svg'
import MainScreenLoader from '../../../../src/assets/Loader/MainScreenLoader.gif'

const Add = (props) => {
  const [sideBarAdd, setSideBarAdd] = useState('')
  useEffect(() => {
    getAdds()
  }, [])
  const getAdds = async (accessToken) => {
    const result = await getBizOwnerAdds()

    if (result.status == true) {
      result?.advertise?.data?.map((item) => {
        if (item?.location == 'sidebar') {
          setSideBarAdd(item?.advertise)
        }
      })
    }
  }
  return (
    <>
      <div className={`${props.my} add-container px-0`} style={{width: '95%', marginLeft: 'auto'}}>
        {
          sideBarAdd != '' && sideBarAdd != undefined ? (
            <img
              src={sideBarAdd}
              alt=''
              className='img-fluid w-100 ms-auto '
              style={{height: 'auto'}}
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
