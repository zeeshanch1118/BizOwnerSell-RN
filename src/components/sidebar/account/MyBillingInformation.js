import React from 'react'
import {BillingInformation} from './components/settings/cards/BillingInformation'
import BizByzBillingInformation from './components/settings/cards/BizByzBillingInformation'
import BizByzBillingSetting from './components/settings/cards/BizByzBillingSetting'
import {Settings} from './components/settings/Settings'

const MyBillingInformation = () => {
  return (
    <div>
      {/* <BillingInformation /> */}
      <BizByzBillingInformation />
      {/* <BizByzBillingSetting /> */}
    </div>
  )
}

export default MyBillingInformation
