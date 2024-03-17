import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import dammyImage from '../../../assets/dummy.jpg'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {getFranchiseFavoriteListing} from '../../services/get-favorite-listing'
import {addFavorite} from '../../services/common-services'
import Pagination from '../../../common component/Pagination'
const MySavedFranchises = () => {
  const [allFavFranchises, setAllFavFranchises] = useState([])
  const [loader, setLoader] = useState(false)
  const [lastPage, setLastPage] = useState([])
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  useEffect(() => {
    getAllFavFranchise(1)
  }, [])
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }
  const getAllFavFranchise = async (page) => {
    try {
      // setLoadingState(true)
      const result = await getFranchiseFavoriteListing(accessToken, page)
      if (result.status === true) {
        setAllFavFranchises(result.franchise.data)
        setLoader(true)
        setLastPage(result.franchise.last_page)

        // setLoadingState(false)
      } else {
        setLoader(false)
      }
    } catch (err) {
      setLoader(false)
      // setLoadingState(false)
    }
  }
  const removeFavorite = async (id) => {
    try {
      const result = await Swal.fire({
        text: 'Are you sure you want to un-save this listing',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        reverseButtons: true,
        confirmButtonText: 'Yes',
      })
      if (result.isConfirmed) {
        const reasonResult = await addFavorite(accessToken, 'franchise', id, 'unfavorite')
        // console.log('deleteUser', userResult)
        if (reasonResult.status === true) {
          let removeFavArray = [...allFavFranchises]

          removeFavArray.map((item, index) => {
            if (item.id === id) {
              removeFavArray.splice(index, 1)
            }
          })

          setAllFavFranchises(removeFavArray)
        }
      } else if (result.isDismissed) {
        // console.log('isDenied')
      }
    } catch (err) {
      console.log('deleteUser err', err)
    }
  }

  let pageCount = lastPage
  const paginate = (data) => {
    let current = data.selected + 1
    setLoader(false)

    getAllFavFranchise(current)
    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: 'smooth',
    })
    // window.scrollTo(0, 1000)
  }
  return (
    <div className='dashboard-bg py-0'>
      {loader ? (
        allFavFranchises.length > 0 ? (
          <div className='row'>
            {allFavFranchises.map((item, index) => (
              <div className=' col-md-4 col-sm-6 col-12 px-0 mt-4 ' key={index}>
                <div className='p-7 bg-white border rounded me-2 '>
                  <Link to={`/franchise/${item.slug}/${item.id}`}>
                    <div style={{height: '14rem', width: '100%'}}>
                      {item?.slider_images[0] ? (
                        <img
                          src={
                            item.slider_images[0]?.full_path +
                            'medium/' +
                            item.slider_images[0]?.file_name
                          }
                          className='img-fluid rounded'
                          style={{height: '14rem', width: '100%'}}
                          alt='...'
                        />
                      ) : (
                        <img
                          src={dammyImage}
                          className='img-fluid rounded'
                          style={{height: '14rem', width: '100%'}}
                          alt='...'
                        />
                      )}
                    </div>
                    <div className='card-body px-0 py-1 '>
                      <h5 className=' py-0 my-2  bizOwner-similarListing-heading text-primary card-dots '>
                        {/* {truncate(item.title, 25)} */}
                        {item.title}
                      </h5>
                    </div>
                  </Link>
                  <div>
                    {' '}
                    <p className='mb-0 text-muted card-dots'>
                      Required Cash:{`$${item?.cash_required ?? '0'}`}
                    </p>
                    <p className='mb-0 text-muted card-dots'>
                      Ad Fee: {`$${item?.ad_fund_fee ?? '0'}`}
                    </p>
                    <p className='mb-0 text-muted card-dots'>
                      {' '}
                      {item.location?.formatted_address
                        ? item.location?.formatted_address
                        : 'No Location'}
                    </p>
                  </div>
                  <div className='d-flex justify-content-between mt-3'>
                    <Link to={`/franchise/${item.slug}/${item.id}`}>
                      <button className='btn btn-primary mt-2 '>View</button>
                    </Link>
                    <button className='btn btn-light mt-2 ' onClick={() => removeFavorite(item.id)}>
                      Remove
                    </button>
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
      {lastPage > 1 && (
        <div className='mt-5'>
          <Pagination pageCount={pageCount} paginate={paginate} />
        </div>
      )}
    </div>
  )
}

export default MySavedFranchises
