import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Navigate, Routes} from 'react-router-dom'
import {useAuth} from './core/Auth'

export function Logout() {
  let dispatch = useDispatch()

  let btnId = true

  const clearData = localStorage.clear();
  useEffect(() => {
    dispatch({
      type: 'SUBMITTED',
      payload: {
        btnId,
      },
    })
  }, [clearData])

  return (
    <Routes>
      <Navigate to='/' />
    </Routes>
  )
}
