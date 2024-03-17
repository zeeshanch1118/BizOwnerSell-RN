import React, {Component} from 'react'
import Slider from 'react-slick'

export default class Resizable extends Component {
  state = {
    display: true,
    width: 900,
  }
  render() {
    // const settings = {
    //   // dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    // }
    return (
      <div>
        {/* <div className='container-fluid  '>
        <div
          style={{
            width: this.state.width + 'px',
            display: this.state.display ? 'block' : 'none',
          }}
        >
          <div className='container '>
            <Slider
              {...settings}
              style={{
                margin: '50px',
                // backgroundColor: 'red',
                width: '1300px',
                paddingLeft: '140px',
              }}
            >
              <div className='bg-light rounded-pill'>
                <div className='p-10'>
                  <span className=''>
                    <i>
                      "I put my business on BizOwnerSell and had 7 appointments the first week and
                      entered into contract by week three. I had amazing results from the site and
                      it saved me thousands."
                    </i>
                  </span>
                  <h2 className='text-start'>Jolly Boy</h2>
                  <p className='text-start'> Boy</p>
                </div>
              </div>
              <div className='bg-light rounded-pill'>
                <div className='p-10'>
                  <span>
                    <i>
                      "I put my business on BizOwnerSell and had 7 appointments the first week and
                      entered into contract by week three. I had amazing results from the site and
                      it saved me thousands."
                    </i>
                  </span>
                  <h2 className='text-start'>Jolly Boy</h2>
                  <p className='text-start'> Boy</p>
                </div>
              </div>
              <div className='bg-light rounded-pill'>
                <div className='p-10'>
                  <span>
                    <i>
                      "I put my business on BizOwnerSell and had 7 appointments the first week and
                      entered into contract by week three. I had amazing results from the site and
                      it saved me thousands."
                    </i>
                  </span>
                  <h2 className='text-start'>Jolly Boy</h2>
                  <p className='text-start'> Boy</p>
                </div>
              </div>
              <div className='bg-light rounded-pill'>
                <div className='p-10'>
                  <span>
                    <i>
                      "I put my business on BizOwnerSell and had 7 appointments the first week and
                      entered into contract by week three. I had amazing results from the site and
                      it saved me thousands."
                    </i>
                  </span>
                  <h2 className='text-start'>Jolly Boy</h2>
                  <p className='text-start'> Boy</p>
                </div>
              </div>
              <div className='bg-light rounded-pill'>
                <div className='p-10'>
                  <span>
                    <i>
                      "I put my business on BizOwnerSell and had 7 appointments the first week and
                      entered into contract by week three. I had amazing results from the site and
                      it saved me thousands."
                    </i>
                  </span>
                  <h2 className='text-start'>Jolly Boy</h2>
                  <p className='text-start'> Boy</p>
                </div>
              </div>
              <div className='bg-light rounded-pill'>
                <div className='p-10'>
                  <span>
                    <i>
                      "I put my business on BizOwnerSell and had 7 appointments the first week and
                      entered into contract by week three. I had amazing results from the site and
                      it saved me thousands."
                    </i>
                  </span>
                  <h2 className='text-start'>Jolly Boy</h2>
                  <p className='text-start'> Boy</p>
                </div>
              </div>
            </Slider>
          </div>
        </div> */}
      </div>
    )
  }
}
