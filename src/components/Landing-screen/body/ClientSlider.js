import React, {Component} from 'react'
import Slider from 'react-slick'
import pImage1 from '../../../assets/profile/Bob-House.jpg'
import pImage2 from '../../../assets/profile/bfs.jpg'
import Comma from '../../../assets/landing-bg/comma.png'
import Comma2 from '../../../assets/landing-bg/comma2.png'
import Comma3 from '../../../assets/landing-bg/comma3.png'
import './ClientSlider.css'
export default class ClientSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className='Client mt-10' id='client'>
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          <div className='px-3 text-center py-5'>
            <div className='card text-center w-100 card-border-shadow'>
              <div className='card-imgs m-auto mt-12'>
                <img src={Comma} className='card-img-top' alt='...' />
              </div>

              <div className='card-body'>
                <div>
                  <p className='card-text-size'>
                    {' '}
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                    of a document or a typeface without relying on meaningful content. Lorem ipsum
                  </p>
                </div>
                <div
                  className='mx-auto mt-5   w-25 '
                  style={{borderBottom: '1px solid #808080'}}
                ></div>
                <div className='mt-5 m-auto'>
                  <img src={pImage1} className='img-border img-fluid m-auto' />
                </div>
                <h3 className='mt-4 name-size'>John Luce</h3>
              </div>
            </div>
          </div>

          <div className='px-3 text-center py-5'>
            <div className='card text-center w-100 card-border-shadow'>
              <div className='card-imgs m-auto mt-12'>
                <img src={Comma2} className='card-img-top' alt='...' />
              </div>

              <div className='card-body'>
                <div>
                  <p className='card-text-size'>
                    {' '}
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                    of a document or a typeface without relying on meaningful content. Lorem ipsum
                  </p>
                </div>
                <div
                  className='mx-auto mt-5  w-25 '
                  style={{borderBottom: '1px solid #808080'}}
                ></div>
                <div className='mt-5 '>
                  <img src={pImage2} className='img-border img-fluid m-auto' />
                </div>
                <h3 className='mt-4 name-size'>Sara</h3>
              </div>
            </div>
          </div>

          <div className='px-3 text-center py-5'>
            <div className='card text-center w-100 card-border-shadow'>
              <div className='card-imgs m-auto mt-12'>
                <img src={Comma3} className='card-img-top' alt='...' />
              </div>

              <div className='card-body'>
                <div>
                  <p className='card-text-size'>
                    {' '}
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                    of a document or a typeface without relying on meaningful content. Lorem ipsum
                  </p>
                </div>
                <div
                  className='mx-auto mt-5  w-25 '
                  style={{borderBottom: '1px solid #808080'}}
                ></div>
                <div className='mt-5'>
                  <img src={pImage1} className='img-border img-fluid m-auto' />
                </div>
                <h3 className='mt-4 name-size'>David</h3>
              </div>
            </div>
          </div>

          <div className='px-3 text-center py-5'>
            <div className='card text-center w-100 card-border-shadow'>
              <div className='card-imgs m-auto mt-12'>
                <img src={Comma} className='card-img-top' alt='...' />
              </div>

              <div className='card-body'>
                <div>
                  <p className='card-text-size'>
                    {' '}
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                    of a document or a typeface without relying on meaningful content. Lorem ipsum
                  </p>
                </div>
                <div
                  className='mx-auto mt-5  w-25 '
                  style={{borderBottom: '1px solid #808080'}}
                ></div>
                <div className='mt-5'>
                  <img src={pImage2} className='img-border img-fluid m-auto' />
                </div>
                <h3 className='mt-4 name-size'>John Luce</h3>
              </div>
            </div>
          </div>

          <div className='px-3 text-center py-5'>
            <div className='card text-center w-100 card-border-shadow'>
              <div className='card-imgs m-auto mt-12'>
                <img src={Comma3} className='card-img-top' alt='...' />
              </div>

              <div className='card-body'>
                <div>
                  <p className='card-text-size'>
                    {' '}
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                    of a document or a typeface without relying on meaningful content. Lorem ipsum
                  </p>
                </div>
                <div
                  className='mx-auto mt-5  w-25 '
                  style={{borderBottom: '1px solid #808080'}}
                ></div>
                <div className='mt-5'>
                  <img src={pImage1} className='img-border img-fluid m-auto' />
                </div>
                <h3 className='mt-4 name-size'>David</h3>
              </div>
            </div>
          </div>

          <div className='px-3 text-center py-5'>
            <div className='card text-center w-100 card-border-shadow'>
              <div className='card-imgs m-auto mt-12'>
                <img src={Comma3} className='card-img-top' alt='...' />
              </div>

              <div className='card-body'>
                <div>
                  <p className='card-text-size'>
                    {' '}
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                    of a document or a typeface without relying on meaningful content. Lorem ipsum
                  </p>
                </div>
                <div
                  className='mx-auto mt-5  w-25 '
                  style={{borderBottom: '1px solid #808080'}}
                ></div>
                <div className='mt-5'>
                  <img src={pImage2} className='img-border img-fluid m-auto' />
                </div>
                <h3 className='mt-4 name-size'>David</h3>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}
