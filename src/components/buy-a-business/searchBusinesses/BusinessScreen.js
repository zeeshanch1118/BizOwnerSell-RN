import React, {useEffect} from 'react'
import Index from './Index'

const BusinessScreen = () => {
  let filterData = []
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const getFilterData = async (filterResultData) => {
    getData(filterResultData)
  }
  const getData = async (filterResultData) => {
    return filterResultData
  }
  return (
    <>
      <div className='container-fluid ' style={{overflowX: 'hidden'}}>
        <div className='row '>
          <div className='col-12 px-0'>
            <Index filterResultData={getData(filterData)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessScreen
