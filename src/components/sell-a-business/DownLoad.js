import {fontSize} from '@mui/system'
import React from 'react'
import './DownLoad.css'
export default function DownLoad() {
  return (
    <div className='BizByzBody'>
      <div className='container d-flex'>
        <div
          className='col-3  text-center'
          style={{
            margin: '9px',
          }}
        >
          <div>
            <img
              className='shadow-lg  bg-body rounded'
              style={{width: '80%', marginBottom: '9px', padding: '5px'}}
              src='https://images.bizbuysell.com/sell/images/logos/logo_sybg.jpg'
              alt=''
            />
          </div>
          <div>
            <div>
              <a
                href=''
                data-bs-toggle='modal'
                className='text-start text-decoration-underline'
                data-bs-target='#kt_modal_1'
              >
                View Table of Contents
              </a>

              <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
                <div className='modal-dialog'>
                  <div style={{width: '700px'}} className='modal-content '>
                    <div className='modal-body '>
                      <div className='d-flex justify-content-end'>
                        <div>
                          <a href='' data-bs-dismiss='modal'>
                            <b>
                              <i>X</i>
                            </b>
                          </a>
                        </div>
                      </div>
                      <h1 className='text-start'>Full Chapter Index:</h1>
                      <div className='d-flex text-start justify-content-between'>
                        <div
                          className='col-6 '
                          style={{
                            padding: '0px 12px',
                          }}
                        >
                          <h5>Deciding to Sell</h5>
                          <p>
                            Can Your Business Be Sold? What's Driving Your Decision? How to
                            Prioritize Your Motivations Path to a Successful Business Sale Business
                            Sale Goals and Objectives
                          </p>
                          <h5>Preparing Your Business for Sale</h5>
                          <p>
                            Can Your Business Be Sold? What's Driving Your Decision? How to
                            Prioritize Your Motivations Path to a Successful Business Sale Business
                            Sale Goals and Objectives
                          </p>
                          <h5>Marketing Your Business for Sale</h5>
                          <p>
                            Can Your Business Be Sold? What's Driving Your Decision? How to
                            Prioritize Your Motivations Path to a Successful Business Sale Business
                            Sale Goals and Objectives
                          </p>
                        </div>
                        <div
                          className='col-6 '
                          style={{
                            padding: '0px 19px',
                          }}
                        >
                          <h5>Deciding to Sell</h5>
                          <p>
                            Can Your Business Be Sold? What's Driving Your Decision? How to
                            Prioritize Your Motivations Path to a Successful Business Sale Business
                            Sale Goals and Objectives
                          </p>
                          <h5>Preparing Your Business for Sale</h5>
                          <p>
                            Can Your Business Be Sold? What's Driving Your Decision? How to
                            Prioritize Your Motivations Path to a Successful Business Sale Business
                            Sale Goals and Objectives
                          </p>
                        </div>
                      </div>
                      <div className='modal-footer'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              border: '2px solid #045c85',
              backgroundColor: '#c1e7f9',
              marginTop: '10px',
              marginLeft: '9px',
              padding: '9px',
            }}
            className='col-11'
          >
            <h2>Have questions? Talk to an expert.</h2>
            <p>Find a professional business broker to help you sell your business.</p>
            <button
              className='button-z'
              style={{
                padding: '4px 9px',
              }}
            >
              Find a Broker
            </button>
          </div>
        </div>
        <div
          className='col-8 '
          style={{
            margin: '9px',
          }}
        >
          <h1>
            Guide to Selling Your Small Business
            <small className='fs-6'> (PDF version)</small>
          </h1>
          <p>
            Author: <b> Barbara Findlay Schenck </b>
          </p>
          <div
            className='col-5 '
            style={{
              boxSizing: 'border-box',
              border: '1px solid #b3c0db',
              backgroundColor: '#deecf3',
              marginTop: '20px',
              marginBottom: '12px',
            }}
          >
            <div className=''>
              <p
                className=''
                style={{
                  marginTop: '12px',

                  paddingLeft: '9px',
                }}
              >
                Price: <b className='text-decoration-line-through'> $19.95</b>
                <span
                  className='text-danger'
                  style={{
                    paddingRight: '20px',
                  }}
                >
                  <b> FREE! </b>
                </span>
                <span
                  className=' text-success'
                  style={{
                    marginLeft: '5px',
                  }}
                >
                  <b> Available Now </b>
                </span>
              </p>
              <div>
                <div className='col-12'>
                  <button
                    className='button-z'
                    style={{
                      padding: '9px 88px',
                      marginLeft: '9px',
                      marginBottom: '4px',
                    }}
                  >
                    <b> Download PDF ▶</b>
                  </button>
                </div>
                <div
                  className=''
                  style={{
                    paddingLeft: '9px',

                    marginBottom: '11px',
                  }}
                >
                  <small>
                    <i> registration required</i>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1>Book Description</h1>
            <p
              className=''
              style={{
                fontSize: 'medium',
              }}
            >
              Produced by BizOwnerSell, the Internet's Largest Business for Sale Marketplace, and
              written in conjunction with Small Business Strategist, Barbara Findlay Schenck, author
              of best-selling business books including Selling Your Business For Dummies, this guide
              provides a comprehensive overview of the small business sales process including
              actionable advice and step-by-step instructions to help maximize selling success.
            </p>
            <p
              className=''
              style={{
                fontSize: 'medium',
              }}
            >
              This 150-page digital book provides:
            </p>
            <ul
              className=''
              style={{
                fontSize: 'medium',
              }}
            >
              <li>An overview of the small business sale process</li>
              <li>Steps to follow as you prepare your business for sale</li>
              <li>Advice on assembling a sale team and maintaining confidentiality</li>
              <li>Benefits of using a business broker</li>
              <li>Tips on how to effectively market your business for sale</li>
              <li>Advice regarding buyer-seller negotiations</li>
              <li>Advice on financing and tax implications</li>
            </ul>
          </div>

          <div
            className=' col-11 border border-2 border-secondary'
            style={{
              padding: '9px',
              backgroundColor: 'white',
            }}
          >
            <h1>Reader Review:</h1>
            <p>
              <i
                className=''
                style={{
                  fontSize: 'medium',
                }}
              >
                "I am grateful to BizOwnerSell for providing this kind of information on their site --
                a small business owner like myself really needed this objective, unbiased,
                unemotional 'primer'."
              </i>
              <p
                className=''
                style={{
                  fontSize: 'medium',
                }}
              >
                — Patricia F. Hoffman, Health Club Owner
              </p>
            </p>
          </div>
          <div
            className=''
            style={{
              marginTop: '9px',
            }}
          >
            <h1>About the Author</h1>
            <div className='d-flex'>
              <div className='col-2'>
                <img
                  style={{width: '90%', height: '70%'}}
                  src='https://images.bizbuysell.com/fsbo/images/bfs.jpg'
                  alt=''
                />
              </div>
              <div className='col-10'>
                <p
                  className='col-10 lh-lg'
                  style={{
                    fontSize: 'medium',
                  }}
                >
                  Barbara Findlay Schenck is the author of a number of top-selling business books
                  and the advisor to businesses on marketing and growth issues. She has written
                  online marketing and sales lessons for the Microsoft Small Business Relationship
                  program and served as a marketing specialist for Business Breakthrough, a program
                  presented by MSN and Visa. Barbara is the marketing columnist for the MSN small
                  business channel at Business On Main.
                </p>
              </div>
            </div>
          </div>
          <div className=''>
            <h1>About BizOwnerSell</h1>
            <p
              className='col-10'
              style={{
                lineHeight: 'largge',
                fontSize: 'medium',
              }}
            >
              BizOwnerSell is the Internet's largest and most heavily trafficked business for sale
              marketplace, with more business for sale listings, more unique users, and more search
              activity than any other service. BizOwnerSell currently has an inventory of
              approximately 45,000 businesses for sale and more than 1.4 million monthly visits.
              BizOwnerSell also has one of the largest databases of sale comparables for recently sold
              businesses and one of the industry's leading franchise directories.
            </p>
          </div>
          <div
            className='col-5'
            style={{
              boxSizing: 'border-box',
              border: '1px solid #b3c0db',
              backgroundColor: '#deecf3',
              marginTop: '20px',
              marginBottom: '12px',
            }}
          >
            <div className=''>
              <p
                className=''
                style={{
                  marginTop: '20px',
                  paddingLeft: '9px',
                }}
              >
                Price: <b className='text-decoration-line-through'> $19.95</b>
                <span
                  className='text-danger '
                  style={{
                    paddingRight: '20px',
                  }}
                >
                  <b> FREE! </b>
                </span>
                <span
                  className=' text-success'
                  style={{
                    marginLeft: '5px',
                  }}
                >
                  <b> Available Now </b>
                </span>
              </p>
              <div>
                <div className='col-12'>
                  <button
                    className='button-z'
                    style={{
                      marginLeft: '9px',
                      marginBottom: '4px',
                      padding: '9px 88px',
                    }}
                  >
                    <b> Download PDF ▶</b>
                  </button>
                </div>
                <div
                  className=''
                  style={{
                    marginBottom: '4px',
                    paddingLeft: '9px ',
                  }}
                >
                  <small>
                    <i> registration required</i>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
