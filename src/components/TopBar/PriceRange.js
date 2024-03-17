import React, {useState} from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Select from 'react-select'
import './multiselect.css'

function PriceRange() {
  // const [selectedOption, setSelectedOption] = useState(null)
  const minRange = [
    // {value: 'Any Min'},
    50000, 100000, 150000, 200000, 300000, 500000, 750000, 1000000, 2000000, 3000000,
  ]
  const maxRange = [
    750000, 120000, 250000, 300000, 3500000, 400000, 450000, 5000000, 1000000, 2000000,
  ]
  const showDropDown = () => {}
  const styles = {
    fontSize: 140,
    color: 'blue',
    with: 230,
  }
  const [min, setMin] = useState(minRange)
  const [max, setMax] = useState(maxRange)
  const [minPriceRange, setMinPriceRange] = useState()
  const [maxPriceRange, setMaxPriceRange] = useState()
  const MinPricesOnChangeHandler = (e) => {
    const minInputRange = e.target.value.replace(/\D/g, '')
    setMinPriceRange(minInputRange)
  }
  const MaxPricesOnChangeHandler = (e) => {
    const maxInputRange = e.target.value.replace(/\D/g, '')

    setMaxPriceRange(maxInputRange)
  }
  const MaxClickHandler = (e) => {
    setMaxPriceRange(e.target.value)

    // if(maxSelect){
    //   setMax(maxSelect)
    // }
    // else{
    //   setMax(max)
    // }
  }
  const MinClickHandler = (e) => {
    let mary = []
    setMinPriceRange(e.target.value)

    max.map((val) => {
      mary.push(Number(minPriceRange.slice(1)) * 2)
      // let i = Number(minPriceRange.substring(1)) * price

      // i = 0
      // return price * total
    })
    setMax(mary)
    console.log(mary)

    // setMax(newData)
    // let newData = max.find((p) => p.price > e.target.value)
    // console.log(newData)
  }
  return (
    <>
      <div>
        <div>
          <button
          style={{color:"#808080"}}
            className='btn btn-white'
            type='button'
            onClick={() => showDropDown()}
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_price'
          >
            Price Range<MdOutlineKeyboardArrowDown className='ms-10 fs-2 text-primary'/>
          </button>
        </div>
        {/* Price Modal  */}

        <div className='modal fade ' tabIndex={-1} id='kt_modal_price'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header p-3'>
                <h5 className='modal-title fs-4 fw-normal ps-4'>Prices Range</h5>

                <div
                  className='btn btn-icon btn-sm text-dark ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <span className='fs-2 text-dark'>🗙</span>
                </div>
              </div>
              <div className='modal-body pb-0'>
                <div className='row'>
                  <div className='container d-flex justify-content-center pb-10'>
                    <div className='col-5 '>
                      <input
                        type='text'
                        placeholder='Min'
                        className='p-3 ms-auto'
                        onChange={(e) => MinPricesOnChangeHandler(e)}
                        value={minPriceRange}
                      />
                      {min.map((minOptions, i) => {
                        return (
                          <option
                            key={i}
                            style={{cursor: 'pointer'}}
                            className='ms-2 mt-3 text-primary fs-4 fw-light lh-lg'
                            onClick={(e) => MinClickHandler(e)}
                          >
                            ${minOptions}
                          </option>
                        )
                      })}
                    </div>
                    <span className='mt-4 mx-3 fs-4 text-black-50'>to</span>
                    <div className='col-5 '>
                      <input
                        type='text'
                        className='p-3 ms-5'
                        onChange={(e) => MaxPricesOnChangeHandler(e)}
                        placeholder='Max'
                        value={maxPriceRange}
                      />
                      {/* <option value='Any Max' className='ms-8 mt-3 text-primary' onClick={(e)=>MaxClickHandler(e)}> */}
                      {max.map((maxOptions, i) => {
                        return (
                          <option
                            key={i}
                            style={{cursor: 'pointer'}}
                            className='ms-7 mt-3 text-primary fs-4 fw-light lh-lg'
                            onClick={(e) => MaxClickHandler(e)}
                          >
                            ${maxOptions}
                          </option>
                        )
                      })}
                      {/* </option> */}
                    </div>
                  </div>
                </div>
                <div className='modal-footer d-flex justify-content-between p-3'>
                  <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                    Close
                  </button>

                  <button type='button' className='btn btn-primary ms-auto' data-bs-dismiss='modal'>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PriceRange
