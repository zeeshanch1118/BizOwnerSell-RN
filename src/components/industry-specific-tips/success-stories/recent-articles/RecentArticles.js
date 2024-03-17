import React from 'react'
import './RecentArticles.css';
import { Link } from 'react-router-dom';

const RecentArticles = () => {
    return (
        <>
            <div className='bizOwner-bg-color py-2'>
                <div className='container text-start pt-4'>
                    <h3 className='text-white bizOwner-lead-heading'>Learning Center</h3>
                    <h2 className=' bizOwner-top-headings pb-3'>Recent Articles</h2>
                </div>
            </div>

            <div className='container pt-8'>
                <div className='row gy-2 gx-5 parent-row '>
                  

                    <div className='col-lg-8 col-md-12'>
                        <div className='card mb-3'>
                            <Link
                                to='/learning-center/article/restaurant-industry-analysis-2022'
                                className='text-decoration-none'
                            >
                                <div className='row g-0'>
                                    <div className='col-lg-5 col-sm-12 col-md-5 rest-2022-img minute-parent'>
                                        {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                        <p className='card-text text-start'>
                                            <small className='text-muted minute-bg2 fs-6'>6 minute read</small>
                                        </p>
                                    </div>
                                    <div className='col-lg-7 col-md-7 col-sm-12'>
                                        <div className='card-body border'>
                                            <h5 className='bizOwner-headings text-start'>
                                                Restaurant Industry Analysis for 2022
                                            </h5>
                                            <p className='card-text text-start text-black bizOwner-parag'>
                                                There may be a big incentive supporting text below as a natural lead-in to
                                                additional content. This content is a little bit longer.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                  

                    {/* <div className='col-lg-4 col-md-6 tools-column'>
                        <div className='row g-4 '>

                            <div className='col-12 text-end border pb-4'>
                                <div className='row g-0 align-items-center'>
                                    <h3 className='text-start fs-1 fw-normal my-4'>
                                        Get our detailed guide to
                                        <br /> Buying a Business
                                    </h3>

                                    <div className='col-6 book-img'></div>
                                    <div className='col-6 text-start'>
                                        <p className='fs-6'>
                                            Price : $ <span className='text-decoration-line-through'>19.95</span>{' '}
                                            <span className='free-text fw-bold'> FREE!</span>
                                        </p>
                                        <button className='border-0 btn-primary p-3 fs-3 rounded text-white'>
                                            Download Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default RecentArticles