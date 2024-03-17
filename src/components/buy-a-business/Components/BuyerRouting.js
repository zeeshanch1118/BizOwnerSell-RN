import React from "react";
import { useRoutes } from "react-router-dom";
 
import HowToBuyABusiness from "../Components/component/HowToBuyABusiness";
import UnderstandYourOptions from "../Components/Partials/Steppers/UnderstandYourOptions";
import FindTheRightBusiness from "../Components/Partials/Steppers/FindTheRightBusiness";
import MakeAnOffer from "../Components/Partials/Steppers/MakeAnOffer";
import GetFinancing from "../Components/Partials/Steppers/GetFinancing";
import ClosedTheDeal from "../Components/Partials/Steppers/ClosedTheDeal";

import OpportunitiesInBuyingAndSelling from "../Components/Partials/Steppers/stepperInner/OpportunitiesInBuyingAndSelling";
import CaresActSBA from "../Components/Partials/Steppers/stepperInner/CaresActSBA";
import BoomForBuyers from "../Components/Partials/Steppers/stepperInner/BoomForBuyers";
import CovidThrives from "../Components/Partials/Steppers/stepperInner/CovidThrives";
import UnderStandYourOptions from "../Components/Partials/ItemsFragment/UnderStandYourOptions";
import FindTheRightBusinessPartial from "../Components/Partials/ItemsFragment/FindTheRightBusinessPartial";
import MakeAnOfferPartial from "../Components/Partials/ItemsFragment/MakeAnOfferPartial";
import GetFinancingPartial from "../Components/Partials/ItemsFragment/GetFinancingPartial";
import CloseTheDealPartial from "../Components/Partials/ItemsFragment/CloseTheDealPartial";
import BuyingSmallVsBigBusiness from "./Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/IsMyBusinessWorthSelling";
import RecognizeSmallBusinessValue from "../Components/Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/RecognizeSmallBusinessValue";
import DecideBestBusinessToOwn from "../Components/Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/DecideBestBusinessToOwn";
import SpotTheBestBusinessToBuy from "../Components/Partials/Steppers/steppersInner/FindtheRightBusinessSteps/SpotTheBestBusinessToBuy";
import EvaluatingaBusinessforSale from "../Components/Partials/Steppers/steppersInner/FindtheRightBusinessSteps/EvaluatingaBusinessforSale";
import ThreeKeyAreasToFocus from "../Components/Partials/Steppers/steppersInner/FindtheRightBusinessSteps/ThreeKeyAreasToFocus";
import DetermineItsEarning from "../Components/Partials/Steppers/steppersInner/MakeAnOfferSteps/DetermineItsEarning";
import SixRulesOfThumb from "../Components/Partials/Steppers/steppersInner/MakeAnOfferSteps/SixRulesOfThumb";
import HowToMakeAnOffer from "../Components/Partials/Steppers/steppersInner/MakeAnOfferSteps/HowToMakeAnOffer";
import FinancingForBusiness from "../Components/Partials/Steppers/steppersInner/GetFinancingSteps/FinancingForBusiness";
import DosAndDontFinancing from "../Components/Partials/Steppers/steppersInner/GetFinancingSteps/DosAndDontFinancing";
import DemystifyingSBA from "../Components/Partials/Steppers/steppersInner/GetFinancingSteps/DemystifyingSBA";
import DueDiligenceCheckList from "../Components/Partials/Steppers/steppersInner/CloseTheDeal/DueDiligenceCheckList";
import PreparingForDueDiligence from "../Components/Partials/Steppers/steppersInner/CloseTheDeal/PreparingForDueDiligence";
import ClosingSaleAndSecurityDeal from "../Components/Partials/Steppers/steppersInner/CloseTheDeal/ClosingSaleAndSecurityDeal";


const BuyerRouting = () => {
  const route = useRoutes([
   
    // {
    //   path: "/how-to-buy-a-business",
    //   element: <HowToBuyABusiness />,
    // },

    {
      path: "stepper",
      element: <UnderstandYourOptions />,
      children: [
        {
          path: "understand-your-options",
          element: <UnderStandYourOptions />,
        },
        {
          path: "buying-a-small-business-vs-a-big-business-why-size-matters",
          element: <BuyingSmallVsBigBusiness />,
        },
        {
          path: "before-you-buy-recognizing-small-business-value-drivers",
          element: <RecognizeSmallBusinessValue />,
        },
        {
          path: "buying-a-business-how-to-decide-the-best-business-to-own",
          element: <DecideBestBusinessToOwn />,
        },
      ],
    },
    {
      path: "/stepper",
      element: <FindTheRightBusiness />,
      children: [
        {
          path: "find-the-right-business",
          element: <FindTheRightBusinessPartial />,
        },
        {
          path: "how-to-spot-best-business-to-buy-preliminary-due-diligence",
          element: <SpotTheBestBusinessToBuy />,
        },
        {
          path: "evaluating-a-business-for-sale-what-to-ask-the-owner",
          element: <EvaluatingaBusinessforSale />,
        },
        {
          path: "buying-a-small-business-3-key-areas-to-focus-on",
          element: <ThreeKeyAreasToFocus />,
        },
      ],
    },
    {
      path: "/stepper",
      element: <MakeAnOffer />,
      children: [
        {
          path: "make-an-offer",
          element: <MakeAnOfferPartial />,
        },
        {
          path: "valuing-a-small-business-determining-its-earning-potential",
          element: <DetermineItsEarning />,
        },
        {
          path: "6-rules-of-thumb-for-business-valuation",
          element: <SixRulesOfThumb />,
        },
        {
          path: "how-to-make-an-offer-when-purchasing-a-business",
          element: <HowToMakeAnOffer/>,
        },
      ],
    },
    {
      path: "/stepper",
      element: <GetFinancing />,
      children: [
        {
          path: "get-financing",
          element: <GetFinancingPartial />,
        },
        {
          path: "the-dos-and-donts-of-seller-financing-a-business-for-sale",
          element: <DosAndDontFinancing/>
        },
        {
          path: "what-is-seller-financing-for-business",
          element: <FinancingForBusiness />,
        },
        {
          path: "demystifying-sba-loans-for-buying-a-business-or-franchise",
          element: <DemystifyingSBA />,
        },
      ],
    },
    {
      path: "/stepper",
      element: <ClosedTheDeal />,
      children: [
        {
          path: "close-the-deal",
          element: <CloseTheDealPartial />,
        },
        {
          path: "due-diligence-checklist-what-to-verify-before-buying-a-business",
          element: <DueDiligenceCheckList />,
        },
        {
          path: "preparing-for-due-diligence-what-sellers-need-to-know-about-business-buyers",
          element: <PreparingForDueDiligence />,
        },
        {
          path: "closing-the-sale-and-securing-the-deal",
          element: <ClosingSaleAndSecurityDeal />,
        },
      ],
    },
    {
      path: "how-to-buy-a-business/opportunities-in-buying-and-selling-close-businesses",
      element: <OpportunitiesInBuyingAndSelling />,
    },
    {
      path: "how-to-buy-a-business/cares-act-sba-stimulus-loan-closing-timeline-update",
      element: <CaresActSBA />,
    },
    {
      path: "how-to-buy-a-business/is-there-a-boom-for-business-buyers-within-this-gloom",
      element: <BoomForBuyers />,
    },
    {
      path: "how-to-buy-a-business/businesses-thriving-during-covid-19-and-positioned-for-growth-as-new-markets-emerge",
      element: <CovidThrives />,
    },
   
  ]);
  return(
  <>
  <div>{route}</div>
  </>
  )
};

export default BuyerRouting;
