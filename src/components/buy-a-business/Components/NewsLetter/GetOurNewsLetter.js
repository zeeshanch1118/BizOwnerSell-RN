import React from 'react'

const GetOurNewsLetter = () => {
  return (
    <div>
      <div className='container mt-5'>
        <h1 className='mb-5'>Subscribe to BizOwnerSell Newsletters</h1>
        <div className='form-group mb-5 w-50'>
          <label for='exampleInputEmail1' className='fs-5'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
        </div>
        <div className='row g-4 justify-content-between'>
          <div className='col-6'>
            <div className=' border'>
              <h3 className='bg-primary py-3 text-white ps-3'>BizOwnerSell Email Newsletters</h3>

              <table className='table m-4'>
                <tbody className=''>
                  <tr>
                    <div className='form-check '>
                      <div className='form-check d-flex justify-content-between mx-5 align-items-center text-start'>
                        <div>
                          <td>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value=''
                              id='flexCheckChecked'
                            />
                          </td>
                          <td>
                            Buyer Newsletter <span className='text-primary'>(view sample)</span>
                          </td>
                        </div>

                        <div></div>

                        <td>Monthly</td>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div className='form-check'>
                      <div className='form-check d-flex justify-content-between mx-5 align-items-center'>
                        <div>
                          <td>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value=''
                              id='flexCheckChecked'
                            />
                          </td>
                          <td>
                            Broker Newsletter <span className='text-primary'>(view sample)</span>
                          </td>
                        </div>

                        <td className=''>Monthly</td>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div className='form-check d-flex justify-content-between mx-5 align-items-center'>
                      <div className='ms-9'>
                        <td>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value=''
                            id='flexCheckChecked'
                          />
                        </td>
                        <td>
                          Franchise Newsletter <span className='text-primary'>(view sample)</span>
                        </td>
                      </div>

                      <td className=''>Monthly</td>
                    </div>
                  </tr>
                  <tr>
                    <div className='form-check'>
                      <div className='form-check d-flex justify-content-between mx-5 align-items-center'>
                        <div>
                          <td>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value=''
                              id='flexCheckChecked'
                            />
                          </td>
                          <td>
                            Seller Newsletter <span className='text-primary'>(view sample)</span>
                          </td>
                        </div>

                        <td className=''>Monthly</td>
                      </div>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>{' '}
          </div>
          <div className='col-4'>
            <div className='border p-3 bg-light'>
              <h5 className='fs-5'>Have Questions? We can help.</h5>
              <p className='fs-6'>Call Toll-Free: (888) 777-9892 (8-5 Pacific)</p>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <button className='btn-primary text-white border-0 p-3'>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default GetOurNewsLetter
