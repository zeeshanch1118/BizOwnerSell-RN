import React from 'react'
import { useRoutes } from "react-router-dom";
import BoomForBuyers from '../../buy-a-business/Components/Partials/Steppers/stepperInner/BoomForBuyers';
import HowToValueABusiness from './HowToValueABusiness';
import LearningCenter from './LearningCenter';

const LearningRouting = () => {
const route = useRoutes([
{
path: '/learning-center', element:<LearningCenter/>,
},
{
    path:'/learning-center/is-there-a-boom-for-business-buyers-within-this-gloom',
    element:<BoomForBuyers/>
},
{
    // path:'/how-to-buy-a-business', element:<HowToBuyABusiness/>
},
{
    // path:'/how-to-sell-a-business', element:<HowToSellABusiness/>
},
{
    path:'/how-to-value-a-business', element:<HowToValueABusiness/>
},
])
  return (
    <div>
      {route}
    </div>
  )
}

export default LearningRouting
