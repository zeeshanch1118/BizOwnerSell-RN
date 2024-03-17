import React from 'react'
import { Outlet } from 'react-router-dom'
import { AsideDefault } from '../../_metronic/layout/components/aside/AsideDefault'
import { Content } from '../../_metronic/layout/components/Content'
import { Footer } from '../../_metronic/layout/components/Footer'
import { HeaderWrapper } from '../../_metronic/layout/components/header/HeaderWrapper'

const DashBoard = () => {
  return (
    <div className='page d-flex flex-row flex-column-fluid'>
      <AsideDefault/>
      <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
       {/* <HeaderWrapper/> */}

        <div id='kt_content' className='content d-flex flex-column flex-column-fluid ' style={{ marginTop:-30}}>
         
          <div className='post d-flex flex-column-fluid' id='kt_post'>
            <Content>
              <Outlet/>
            </Content>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default DashBoard