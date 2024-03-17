import React from 'react'
import ReactPaginate from 'react-paginate'
import './style.css'
const Pagination = ({pageCount, paginate}) => {
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='shadow-sm customize-pagination py-2 px-5 d-inline-block '>
          <ReactPaginate
            previousLabel={'<  Prev'}
            nextLabel={'Next  >'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={paginate}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </>
  )
}

export default Pagination
