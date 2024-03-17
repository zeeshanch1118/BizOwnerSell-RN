import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import dammyImage from '../../../assets/dummy.jpg'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {getFranchiseRecommendation} from '../../services/recommendation'
import Pagination from '../../../common component/Pagination'
const FranchiseRecommendation = () => {
  const [allFranchisesRecommendation, setAllFranchisesRecommendation] = useState([])
  const [loader, setLoader] = useState(false)
  const [lastPage, setLastPage] = useState([])
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  useEffect(() => {
    getFranchiseReco()
  }, [])
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }
  const getFranchiseReco = async (page) => {
    try {
      // setLoadingState(true)
      const result = await getFranchiseRecommendation(accessToken, page)
      if (result.status === true) {
        setAllFranchisesRecommendation(result.samilerFranchise?.data)
        setLastPage(result.samilerFranchise?.last_page)
        setLoader(true)
        // setLastPage(result.business.last_page)

        // setLoadingState(false)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(true)
      // setLoadingState(false)
    }
  }
  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getFranchiseReco(page)
  }
  return (
    <div className='dashboard-bg py-0'>
      {loader ? (
        allFranchisesRecommendation.length > 0 ? (
          <div className='row mb-6'>
            {allFranchisesRecommendation.map((item, index) => (
              <div className=' col-md-4 col-sm-6 col-12 px-0 mt-4 ' key={index}>
                <div className='p-7 bg-white border rounded me-2 '>
                  <Link to={`/franchise/${item.slug}/${item.id}`}>
                    <div style={{height: '14rem', width: '100%'}}>
                      {item?.slider_images[0] ? (
                        <img
                          src={
                            item.slider_images[0]?.full_path +
                            'thumb/' +
                            item.slider_images[0]?.file_name
                          }
                          className='img-fluid rounded'
                          alt='...'
                        />
                      ) : (
                        <img src={dammyImage} className='img-fluid rounded' alt='...' />
                      )}
                    </div>
                    {/* <div className='card-body px-3 py-1 '> */}
                    <h5 className=' py-0 my-2  bizOwner-similarListing-heading text-primary card-dots '>
                      {/* {truncate(item.title, 25)} */}
                      {item.title}
                    </h5>
                    {/* </div> */}
                  </Link>
                  <div>
                    {' '}
                    <p className='mb-0 text-muted card-dots '>
                      Required Cash:{`$${item?.cash_required ?? '0'}`}
                    </p>
                    <p className='mb-0 text-muted card-dots '>
                      Ad Fee: {`$${item?.ad_fund_fee ?? '0'}`}
                    </p>
                    <p className='mb-0 text-muted card-dots '>
                      {item.location?.formatted_address
                        ? item.location?.formatted_address
                        : 'No Location'}
                    </p>
                  </div>
                  <div className='d-flex justify-content-between mt-3'>
                    <Link to={`/franchise/${item.slug}/${item.id}`}>
                      <button className='btn btn-primary mt-2 '>View</button>
                    </Link>
                    {/* <button className='btn btn-light mt-2 '>Remove</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className='d-flex  justify-content-center  align-items-center '
            style={{height: '80vh'}}
          >
            <div>
              <h1>RECORD NOT FOUND</h1>
            </div>
          </div>
        )
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
      {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
    </div>
  )
}

export default FranchiseRecommendation
