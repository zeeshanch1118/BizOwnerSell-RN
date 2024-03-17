import React from 'react'
import finance from '../../assets/media/finance/yoursba-com-logo-original-horizontal.png'
import {FaCheck} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './FinanceCenter.css'
import {useNavigate} from 'react-router-dom'
import FinanceCenterHeader from './FinanceCenterHeader'
const FinanceCenter = () => {
  return (
    <>
      <FinanceCenterHeader />

      <main className='bg-secondary py-6 '>
        <div className='container mt-5 mb-3'>
          <div className='card border border-1'>
            <h1 className='fs-1 card-header align-items-center fw-normal bg-primary  text-white'>
              Leverage an SBA loan to buy an existing business or franchise
            </h1>

            {/* <div className="card-body"> */}
            <div className='row'>
              <div className='col-md-8 col-sm-11 m-5'>
                <h5 className='card-title fs-1 fw-bold text-primary py-2'>
                  SBA Business Loans $350k to $5MM
                </h5>
                <p className='card-text fs-4 lead lh-lg'>
                  The SBA 7(a) lending program can be used to buy an existing business for as little
                  as 10% down. A properly structured SBA loan will also include working capital for
                  growth, inventory, equipment, debt refinance and the commercial real estate.
                </p>
                <div className='row g-2 justify-content-center py-3 pb-5'>
                  <div className='col-md-10'>
                    <div className='row'>
                      <div className='col-6 fs-3'>
                        <p>
                          <FaCheck className='me-2 lead' /> Lowest down payment
                        </p>
                      </div>
                      <div className='col-6 fs-3'>
                        <p>
                          {' '}
                          <FaCheck className='me-2  lead' /> Longest loan term
                        </p>
                      </div>
                      <div className='col-6 fs-3'>
                        <p>
                          {' '}
                          <FaCheck className='me-2 lead' /> Lowest down payment
                        </p>
                      </div>
                      <div className='col-6 fs-3'>
                        <p>
                          <FaCheck className='me-2 lead' /> Widest variety of loan purpose
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='fs-4 lead pb-3'>
                  Get connected with the top SBA business acquisition lenders to get the best loan
                  terms and highest possible loan amount.
                </p>

                <div className=' my-2'>
                  <Link to={'/finance-center/yourssba'} className='btn btn-primary fs-4 '>
                    Learn More about SBA Loans
                  </Link>
                </div>
              </div>

              <div className='col-md-3 border-start '>
                <p className='text-center text-muted lead fs-6'>partner solution provided by:</p>
                <div className='text-end'>
                   <img src={finance} alt='' className='w-100 pt-10 mt-20 ' />
                </div>
               
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </main>
    </>
  )
}

export default FinanceCenter
