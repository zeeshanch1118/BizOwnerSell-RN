import React from 'react'
import paycheck from '../../../../assets/images/the-paycheck-protection-program.jpeg'
import {Link} from 'react-router-dom'
import './Covid19Resources.css'
import Covid19ResourcesAsideBar from './Covid19ResourcesAsideBar'
const Covid19Resources = () => {
  return (
    <>
      <div className='container'>
        <div className='row mt-10'>
          <div className='col-md-8'>
            {/*begin::Card*/}

            <div className='card card-bordered'>
              <div className=' mx-10'>
                <div className='card-header ribbon ribbon-top px-0'>
                  <div className='ribbon-label bg-primary'>13 minute read</div>
                  <div className='card-title'>
                    <h1 className=' mt-10'>
                      A Comprehensive Guide to the Paycheck Protection Program
                    </h1>
                  </div>
                </div>
              </div>
              <div className='card-body  pt-0'>
                <div>
                  <img src={paycheck} alt='' className='w-100' />
                </div>
                <div className='d-flex my-4 p-3 border-bottom'>
                  <h2 className='d-flex align-items-center me-3 heading_h2'>Share this page</h2>
                  <div>
                    <Link to='#' className='btn btn-icon btn-facebook me-5 '>
                      <i className='fab fa-facebook-f fs-4' />
                    </Link>
                    <Link to='#' className='btn btn-icon btn-twitter me-5 '>
                      <i className='fab fa-twitter fs-4' />
                    </Link>
                    <Link to='#' className='btn btn-icon btn-linkedin me-5 '>
                      <i className='fab fa-linkedin fs-4' />
                    </Link>
                  </div>
                </div>
                <div>
                  <h1>Table of Contents</h1>
                  <ul>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQs'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title=' PPPFAQs'
                      >
                        PPP FAQs
                      </a>
                      <ul>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ1'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ1'
                          >
                            How does PPP work?
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ2'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ2'
                          >
                            What are the latest changes to the PPP?
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ3'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ3'
                          >
                            Is the PPP loan still available?
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ4'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ4'
                          >
                            Who qualifies for PPP?
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ5'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ5'
                          >
                            What is the deadline to apply for the PPP loan?
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ6'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ6'
                          >
                            What are the PPP loan forgiveness terms?
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ7'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ7'
                      >
                        How did the Biden Administration alter the PPP plan?
                      </a>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ8'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ8'
                      >
                        How do I apply for the SBA PPP loan?
                      </a>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ9'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ9'
                      >
                        What are the qualifications for a first draw PPP loan?
                      </a>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ10'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ10'
                      >
                        What are the qualifications for a second draw PPP loan?
                      </a>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ11'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ11'
                      >
                        What documents do I need to apply for a PPP loan?
                      </a>
                      <ul>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ12'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ12'
                          >
                            Record keeping and required documents for forgiveness
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ13'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ13'
                          >
                            Payroll documentation required to be eligible for forgiveness
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ14'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ14'
                          >
                            FTE Documentation Showing Average Number of Employees
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ15'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ15'
                          >
                            Documents for mortgage, rent, and other eligible expenses
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ16'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ16'
                      >
                        Documents that must be retained for six years
                      </a>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ17'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ17'
                      >
                        PPP Loans for Partnerships and Self-Employment
                      </a>
                      <ul>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ18'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ18'
                          >
                            PPP forgiveness for sole proprietors
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ19'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ19'
                          >
                            PPP forgiveness for self-employed individuals
                          </a>
                        </li>
                        <li className='li_font_size'>
                          <a
                            className='anchor_tag'
                            href='#PPPFAQ20'
                            data-bs-toggle='tooltip'
                            data-bs-placement='bottom'
                            title='PPPFAQ20'
                          >
                            PPP forgiveness for partnerships
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ21'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ21'
                      >
                        What to do if you are denied approval
                      </a>
                    </li>
                    <li className='li_font_size'>
                      <a
                        className='anchor_tag'
                        href='#PPPFAQ22'
                        data-bs-toggle='tooltip'
                        data-bs-placement='bottom'
                        title='PPPFAQ22'
                      >
                        How will PPP loan forgiveness affect my taxes?
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className='paragraph'>
                    On March 27, 2020, the U.S Federal Government signed the CARES Act into law.
                    This contained, among other things, a new stimulus package for small businesses.
                    President Biden announced changes to the Paycheck Protection Program,
                    established by the CARES Act, on February 21, 2021, including extending the
                    deadline to apply.
                  </p>
                  <h2 id='PPPFAQs' className='heading_h2'>
                    PPP FAQs
                  </h2>
                  <p className='paragraph'>
                    Here’s a comprehensive guide to understanding the Paycheck Protection Program,
                    the application, and the loan forgiveness process.
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ1'>
                    How Does PPP Work?
                  </h3>
                  <p className='paragraph'>
                    The Paycheck Protection Program first rolled out on March 27th, 2020 as part of
                    the Coronavirus Aid, Relief, and Economic Security Act, commonly known as the
                    CARES Act. The $349 billion loan program was developed to aid businesses
                    impacted by COVID-19, enabling them to retain workers and cover operating costs.
                    Loans are 100% federal-guaranteed and will be forgiven under certain conditions.
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ1'>
                    How Does PPP Work?
                  </h3>
                  <p className='paragraph'>
                    <a className='anchor_tag' href='#PPPFAQ22'>
                      The Paycheck Protection Program first rolled out on March 27th, 2020 as part
                      of the Coronavirus Aid, Relief, and Economic Security Act, commonly known as
                      the
                    </a>
                    <a className='anchor_tag' href='#PPPFAQS'>
                      &nbsp; CARES Act
                    </a>
                    . The $349 billion loan program was developed to aid businesses impacted by
                    COVID-19, enabling them to retain workers and cover operating costs. Loans are
                    100% federal-guaranteed and will be forgiven under certain conditions.
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ2'>
                    What are the latest changes to the PPP?
                  </h3>
                  <p className='paragraph'>
                    Since it was introduced, the PPP program has been amended several times to offer
                    more relaxed guidelines and new provisions. Here’s a brief timeline of how it’s
                    evolved so far:
                    <ul>
                      <li className='li_font_size'>
                        April 25, 2020 - expanded with an additional $310 billion in funding and
                        modified to allow business owners more flexibility.
                      </li>
                      <li className='li_font_size'>
                        June 5, 2020 - amended, loosening many of the restrictive guidelines around
                        loan forgiveness, plus allowing for payroll tax deferments.
                      </li>
                      <li className='li_font_size'>
                        July 4, 2020 – amended, extending the deadline for loan applications from
                        the original date of June 30, 2020 to August 8, 2020.
                      </li>
                      <li className='li_font_size'>
                        December 27, 2020 - reopened and modified, allowing for new PPP loans, as
                        well as Second Draw PPP loans for eligible businesses. The deadline to apply
                        is March 31, 2021.
                      </li>
                      <li className='li_font_size'>
                        February 22, 2021 - amended to provide access to businesses that previously
                        struggled to obtain PPP loans, deliver funding more efficiently, as well as
                        prevent fraud and abuse.
                      </li>
                      <li className='li_font_size'>
                        March 11, 2021 - increased funding by $7.25 billion and allowed more
                        non-profits to be eligible.
                      </li>
                      <li className='li_font_size'>
                        March 30, 2021 - extended PPP to May 31, 2021, plus an additional 30-day
                        period for the SBA to process pending applications.
                      </li>
                    </ul>
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ3'>
                    What are the latest changes to the PPP?
                  </h3>

                  <p className='paragraph'>
                    Yes, the Paycheck Protection Program is still available. New legislation has
                    been introduced extending the PPP deadline until May 31, 2021.
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ4'>
                    Who qualifies for PPP?
                  </h3>
                  <p className='paragraph'>
                    <ul>
                      <li className='li_font_size'>
                        Businesses with fewer than 500 employees, including non-profits, veterans'
                        organizations, tribal concerns, sole proprietorships, self-employed, and
                        independent contractors.
                      </li>
                      <li className='li_font_size'>
                        Restaurants, hotels, franchises, and other accommodation and food service
                        businesses that have 500 or fewer employees in each location.
                      </li>
                      <li className='li_font_size'>
                        Businesses must have been in operation on February 15, 2020 and must not be
                        closed permanently.
                      </li>
                    </ul>
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ5'>
                    What is the deadline for the PPP loan?
                  </h3>
                  <p className='paragraph'>
                    The deadline for the PPP loan is May 31, 2021 according to new legislation.
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ6'>
                    What are the PPP loan forgiveness terms?
                  </h3>

                  <p className='paragraph'>
                    <ul>
                      <li className='li_font_size'>
                        The covered period for PPP loans is the 8-to-24-week period following
                        disbursement from the lender.
                      </li>
                      <li className='li_font_size'>
                        In order for First Draw PPP loans or Second Draw PPP loans to qualify for
                        forgiveness the borrower must meet the following requirements during the
                        8-to-24-week covered period:
                        <ol>
                          <li className='li_font_size'>
                            Maintain employee and compensation levels.
                          </li>
                          <li className='li_font_size'>
                            Use the loan proceeds for covering payroll costs and other eligible
                            expenses; and
                          </li>
                          <li className='li_font_size'>
                            Spend at least 60% of the proceeds on payroll.
                          </li>
                        </ol>
                      </li>
                      <li className='li_font_size'>
                        For any amounts not forgiven, the maximum term is 10 years, with a maximum
                        interest rate of 4%.
                      </li>
                      <b>Are loans 100% guaranteed by the Federal Government?</b>
                      <p className='paragraph'>
                        No collateral or personal guarantee shall be required for the covered loan.
                      </p>
                      <p className='paragraph'>
                        Lenders will not be determining eligibility based on repayment ability, but
                        rather whether the business was operational on February 15, 2020 and has
                        paid employees and payroll taxes.
                      </p>
                    </ul>
                  </p>
                  <h3 className='heading_h3' id='PPPFAQ7'>
                    How did the Biden Administration alter the PPP plan?
                  </h3>
                  <p className='paragraph'>
                    On February 22, 2021, President Biden made changes to provide access to small
                    businesses that previously struggled to obtain PPP loans. To advance equity
                    goals, deliver funding more efficiently, as well as prevent fraud and abuse, the
                    following reforms were announced:
                  </p>
                  <p className='paragraph'>
                    <ul>
                      <li className='li_font_size'>
                        Beginning February 24th, the SBA established a 14-day, exclusive
                        applications period for businesses and nonprofits with fewer than 20
                        employees.
                      </li>
                      <li className='li_font_size'>
                        Beginning February 24th, the SBA established a 14-day, exclusive
                        applications period for businesses and nonprofits with fewer than 20
                        employees.
                      </li>
                      <li className='li_font_size'>
                        Beginning February 24th, the SBA established a 14-day, exclusive
                        applications period for businesses and nonprofits with fewer than 20
                        employees.
                      </li>
                      <li className='li_font_size'>
                        Beginning February 24th, the SBA established a 14-day, exclusive
                        applications period for businesses and nonprofits with fewer than 20
                        employees.
                      </li>
                    </ul>
                  </p>
                  <div className='d-flex my-4 p-3 border-3 border-bottom border-top'>
                    <h2 className='d-flex align-items-center me-3 heading_h2'>Share this page</h2>
                    <div>
                      <Link to='#' className='btn btn-icon btn-facebook me-5 '>
                        <i className='fab fa-facebook-f fs-4' />
                      </Link>
                      <Link to='#' className='btn btn-icon btn-twitter me-5 '>
                        <i className='fab fa-twitter fs-4' />
                      </Link>
                      <Link to='#' className='btn btn-icon btn-linkedin me-5 '>
                        <i className='fab fa-linkedin fs-4' />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/*end::Card*/}
            </div>
          </div>
          <div className='col-md-4'>
            <Covid19ResourcesAsideBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Covid19Resources
