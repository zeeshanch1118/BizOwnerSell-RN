import React, { useEffect } from "react";
import { Content } from "../_metronic/layout/components/Content";
import  Footer  from "../components/Landing-screen/Footer";
import { HeaderWrapper } from '../_metronic/layout/components/header/HeaderWrapper'
import {Outlet} from 'react-router-dom'
import { Toolbar } from "../_metronic/layout/components/toolbar/Toolbar";
const PublicLayout = () => {

    // useEffect(() => {
    //     document.location.reload()
    // }, [])

    return (
        <div className='page d-flex flex-row flex-column-fluid'>
            {/* <AsideDefault /> */}
           
            <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
              
                <HeaderWrapper />
                <div className='post d-flex flex-column-fluid' id='kt_post'>
                        <Content>
                            <Outlet />
                        </Content>
                    </div>
                <Footer />
            </div>
        </div>
      
    )
            }

export default PublicLayout