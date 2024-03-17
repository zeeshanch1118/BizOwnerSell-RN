import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../src/app/modules/auth'
import SaveSearchesIcon from '../../assets/landing-bg/saveSearches.png'

const SaveSearches = () => {
  // const {currentUser} = useAuth()
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(JSON.stringify(userData) || '')

  const [searchName, setSearchName] = useState('')
  const [daily, setDaily] = useState('')
  const [weekly, setWeekly] = useState('')
  const [monthly, setMonthly] = useState('')

  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'search-name':
        await setSearchName(e.target.value)

        break

      case 'daily':
        await setDaily(e.target.name)
        break
      case 'weekly':
        await setWeekly(e.target.name)
        break

      case 'monthly':
        await setMonthly(e.target.name)
        break
    }
  }

  const submit = () => {
    console.log(searchName, daily, weekly, monthly)
  }

  return (
    <>
      <div>
        {transformedData ? (
          <>
            <div>
              <button type='button' className='btn rounded-0 rounded-left  btn-light text-primary '>
                Saved
              </button>
              <button
                type='button'
                className='btn btn-light rounded-0 text-primary dropdown-toggle dropdown-toggle-split'
                id='dropdownMenuReference'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                data-bs-reference='parent'
              ></button>
              <ul className='dropdown-menu' aria-labelledby='dropdownMenuReference p-4'>
                <li>
                  <Link className='dropdown-item' to='/search-businesses-for-sale'>
                    Arizona Businesses For Sale
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className='dropdown d-none d-md-block'>
              <button
                type='button'
                className='btn btn-primary px-3 rounded-pill'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_Save_Search'
              >
                <img src={SaveSearchesIcon} /> Save Searches
              </button>
              <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                <li className='d-none d-lg-block'>
                  <button className='btn btn-primary'>My Save Searches</button>
                </li>
              </ul>
            </div>
          </>
        )}

        <div className='modal fade' tabIndex={-1} id='kt_modal_Save_Search'>
          <div className='modal-dialog '>
            <div className='modal-content'>
              <div className='modal-header py-4'>
                <h5 className='modal-title'>Save this Search</h5>
                {/*begin::Close*/}
                <div
                  className='btn btn-icon btn-sm text-dark ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <span className='fs-2'>🗙</span>
                </div>
                {/*end::Close*/}
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      name='search-name'
                      id='floatingInputValue'
                      placeholder='save search'
                      value={searchName}
                      onChange={(e) => inputChange(e)}
                    />
                    <label htmlFor='floatingInputValue'>Name of your Search</label>
                  </div>
                </div>

                <div className='d-flex flex-column mt-10 '>
                  {/*begin::Label*/}
                  <label className='d-flex align-items-center fs-6 fw-bold mb-4'>
                    <span className='required'>Email notification preferences</span>
                    <i
                      className='fas fa-exclamation-circle ms-2 fs-7'
                      data-bs-toggle='tooltip'
                      title='Select an option.'
                    />
                  </label>
                  {/*end::Label*/}
                  {/*begin::Buttons*/}
                  <div className='d-flex flex-stack gap-5 mb-3'>
                    <button
                      type='button'
                      className='btn btn-light-primary w-100'
                      data-kt-docs-advanced-forms='interactive'
                      name='daily'
                      onClick={(e) => inputChange(e)}
                    >
                      Daily
                    </button>
                    <button
                      type='button'
                      className='btn btn-light-primary w-100'
                      data-kt-docs-advanced-forms='interactive'
                      name='weekly'
                      onClick={(e) => inputChange(e)}
                    >
                      Weekly
                    </button>
                    <button
                      type='button'
                      className='btn btn-light-primary w-100'
                      data-kt-docs-advanced-forms='interactive'
                      name='monthly'
                      onClick={(e) => inputChange(e)}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className='form-check form-switch my-5'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='flexSwitchCheckChecked'
                    defaultChecked
                  />
                  <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
                    {' '}
                    Instant alerts{' '}
                  </label>
                </div>
                <div className='form-check form-switch my-5'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='flexSwitchCheckChecked'
                    defaultChecked
                  />
                  <label className='form-check-label fs-8' htmlFor='flexSwitchCheckChecked'>
                    Allow sellers with businesses matching your criteria to contact you directly,
                    your email address will not be revealed
                  </label>
                </div>
              </div>

              <div className='modal-footer py-4 d-flex justify-content-between'>
                <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                  No Thanks
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => submit()}
                  data-bs-dismiss='modal'
                >
                  Save Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SaveSearches
