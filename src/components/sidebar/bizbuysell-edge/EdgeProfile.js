import React, {useState} from 'react'

const EdgeProfile = () => {
  const [values, SetValues] = useState({
    primaryBusiness: '',
    otherBusiness: '',
    businessInterest: '',
    business: '',
    state: '',
  })
  const SubmitHandler = () => {
  
  }
  return (
    <div className='dashboard-bg py-0' style={{ backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
      <div className='container p-10'>
        <div className='row bg-white p-5 rounded mx-1'>
          <div className='col-12 mx-2 m-auto'>
            <h2 className='fs-1 fw-light py-5 fs-1'>Edge Member Profile</h2>
            <p className='fs-5 lh-lg pb-3'>
              Edge profile information helps sellers identify you as a priority buyer.Your edge
              profile information will be provided to business
              <br /> sellers you contact.
            </p>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 my-3'>
                <label className='fs-6 fw-bold form-label fs-3 pb-1 my-2'>Primary business interest </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  name='primaryBusiness'
                  value={values.primaryBusiness}
                  onChange={(e) => SetValues({...values, primaryBusiness: e.target.value})}
                >
                  <option>select </option>
                  <option value='One'>One</option>
                  <option value='Two'>Two</option>
                  <option value='Three'>Three</option>
                </select>
              </div>

              <div className='col-lg-6 col-md-6 col-sm-12 my-3'>
                <label className='fs-6 fw-bold form-label fs-3 pb-1 my-2'>Other business interest </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  name='otherBusiness'
                  value={values.otherBusiness}
                  onChange={(e) => SetValues({...values, otherBusiness: e.target.value})}
                >
                  <option>select menu</option>
                  <option value='One'>One</option>
                  <option value='Two'>Two</option>
                  <option value='Three'>Three</option>
                </select>
              </div>

              <div className='col-lg-6 col-md-6 col-sm-12 my-3'>
                <label className='fs-6 fw-bold form-label fs-3 pb-1 my-2'>Other business interest </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  name='businessInterest'
                  value={values.businessInterest}
                  onChange={(e) => SetValues({...values, businessInterest: e.target.value})}
                >
                  <option> select menu</option>
                  <option value='One'>One</option>
                  <option value='Two'>Two</option>
                  <option value='Three'>Three</option>
                </select>
              </div>

              <div className='col-lg-6 col-md-6 col-sm-12 my-3'>
                <label className='fs-6 fw-bold form-label fs-3 pb-1 my-2'>Other business interest </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  name='business'
                  value={values.business}
                  onChange={(e) => SetValues({...values, business: e.target.value})}
                >
                  <option> select options</option>
                  <option value='One'>One</option>
                  <option value='Two'>Two</option>
                  <option value='Three'>Three</option>
                </select>
              </div>

              <div className='col-lg-6 col-md-6 col-sm-12 my-3'>
                <label className='fs-6 fw-bold form-label fs-3 pb-1 my-2'>Business state </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  name='state'
                  value={values.state}
                  onChange={(e) => SetValues({...values, state: e.target.value})}
                >
                  <option>Select a state </option>
                  <option value='One'>One</option>
                  <option value='Two'>Two</option>
                  <option value='Three'>Three</option>
                </select>
              </div>
             
            </div>
            <div className='col-4'>
                <button
                  className='btn btn-primary  text-white rounded mt-5'
                  onClick={SubmitHandler}
                >
                  Submit
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EdgeProfile
