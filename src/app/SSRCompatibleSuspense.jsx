import React, {Suspense} from 'react'
import useMounted from './useMounted'

export default function SSRCompatibleSuspense(props) {
  const isMounted = useMounted()

  if (isMounted) {
    return <Suspense {...props} />
  }
  return <>{props.fallback}</>
}
