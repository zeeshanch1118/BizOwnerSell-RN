/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, useEffect, useState} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import {PublicRoutes} from './PublicRoutes'
import {useSelector} from 'react-redux'
import {Registration} from '../modules/auth/components/Registration'
import {AgentRegistration} from '../modules/auth/components/AgentRegistration'

const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  const [transformedData, setTransformedData] = useState()
  const [transAgentData, setTransAgentData] = useState(null)

  let data = useSelector((state) => {
    return state
  })
  useEffect(() => {
    const userData = localStorage.getItem('userData')
    const trasData = JSON?.parse(JSON.stringify(userData) || '')
    setTransformedData(trasData)
  }, [])
  // const { accessToken, userName, role } = transformedData;
  return (
    // <BrowserRouter basename={PUBLIC_URL}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {/* <Route path='/auth/registration/:token'></Route> */}

          <Route path='registration/:token' element={<AgentRegistration />} />

          {/* <Route path='*' element={<Navigate to='/auth' />} /> */}
          {transformedData ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              {/* <Route index element={<Navigate to='/dashboard' />} /> */}
            </>
          ) : (
            <>
              <Route path='/*' element={<PublicRoutes />} />
              {/* <Route index element={<Navigate to='/home' />} /> */}
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
