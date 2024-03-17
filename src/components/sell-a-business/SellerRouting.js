import React from "react";

// import HowToBuyABusiness from "./component/HowToBuyABusiness";
import UnderstandYourOptions from "./Partials/Steppers/PrepareForExit";
import { useRoutes } from "react-router-dom";
import FindTheRightBusiness from "./Partials/Steppers/SetanAskingPrice";
import MakeAnOffer from "./Partials/Steppers/AttractBuyers";
import GetFinancing from "./Partials/Steppers/NegotiatingStrategies";
import ClosedTheDeal from "./Partials/Steppers/FinalizeTheDeal";
// import PageNavigator from "../Buttons/PageNavigator";
import OpportunitiesInBuyingAndSelling from "./Partials/Steppers/stepperInner/OpportunitiesInBuyingAndSelling";
                                         
import CaresActSBA from "./Partials/Steppers/stepperInner/CaresActSBA";
import BoomForBuyers from "./Partials/Steppers/stepperInner/BoomForBuyers";
import CovidThrives from "./Partials/Steppers/stepperInner/CovidThrives";
import UnderStandYourOptions from "./Partials/ItemsFragment/PrepareForExitPartial";
import FindTheRightBusinessPartial from "./Partials/ItemsFragment/SetanAskingPricePartial";
import MakeAnOfferPartial from "./Partials/ItemsFragment/AttractBuyersPartial";
import GetFinancingPartial from "./Partials/ItemsFragment/NegotiatingStrategiesPartial";
import CloseTheDealPartial from "./Partials/ItemsFragment/FinalizeTheDealPartial";
import BuyingSmallVsBigBusiness from "./Partials/Steppers/steppersInner/prepare-for-your-exit/WhySizeMatter";
import RecognizeSmallBusinessValue from "./Partials/Steppers/steppersInner/prepare-for-your-exit/RecognizeSmallBusinessValue";
import DecideBestBusinessToOwn from "./Partials/Steppers/steppersInner/prepare-for-your-exit/DecideBestBusinessToOwn";
import SpotTheBestBusinessToBuy from "./Partials/Steppers/steppersInner/Set-an-asking-price/NoOneWillPayYou";
import EvaluatingaBusinessforSale from "./Partials/Steppers/steppersInner/Set-an-asking-price/IncreaseTheValueOfBusiness";
import ThreeKeyAreasToFocus from "./Partials/Steppers/steppersInner/Set-an-asking-price/DetermineAnAskingPrice";
import DetermineItsEarning from "./Partials/Steppers/steppersInner/attract-buyers/DetermineItsEarning";
import SixRulesOfThumb from "./Partials/Steppers/steppersInner/attract-buyers/SixRulesOfThumb";
import HowToMakeAnOffer from "./Partials/Steppers/steppersInner/attract-buyers/HowToMakeAnOffer";
import FinancingForBusiness from "./Partials/Steppers/steppersInner/negotiating-strategies/FinancingForBusiness";
import DosAndDontFinancing from "./Partials/Steppers/steppersInner/negotiating-strategies/DosAndDontFinancing";
import DemystifyingSBA from "./Partials/Steppers/steppersInner/negotiating-strategies/DemystifyingSBA";
import DueDiligenceCheckList from "./Partials/Steppers/steppersInner/finalize-the-deal/DueDiligenceCheckList";
import PreparingForDueDiligence from "./Partials/Steppers/steppersInner/finalize-the-deal/PreparingForDueDiligence";
import ClosingSaleAndSecurityDeal from "./Partials/Steppers/steppersInner/finalize-the-deal/ClosingSaleAndSecurityDeal";
import HowToSellABusiness from "./HowToSellABusiness";

const SellerRouting = () => {
  const route = useRoutes([
    // {
    //   path: "/",
    //   element: <PageNavigator />,
    // },
    {
      path: "/how-to-sell-a-business",
      element: <HowToSellABusiness />,
     
    },

    {
      path: "/stepper",
      element: <UnderstandYourOptions />,
      children: [
        {
          path: "prepare-for-your-exit",
          element: <UnderStandYourOptions />,
        },
        {
          path: "is-my-business-worth-selling",
          element: <BuyingSmallVsBigBusiness />,
        },
        {
          path: "how-to-create-a-business-exit-strategy-and-avoid-costly-mistakes",
          element: <RecognizeSmallBusinessValue />,
        },
        {
          path: "selling-your-business-is-all-about-timing",
          element: <DecideBestBusinessToOwn />,
        },
        {
          path: "six-rules-of-thumb-for-business-valuation",
          element: <SixRulesOfThumb />,
        },
       
      ],
    },
    {
      path: "/stepper",
      element: <FindTheRightBusiness />,
      children: [
        {
          path: "set-an-asking-price",
          element: <FindTheRightBusinessPartial />,
        },
        {
          path: "no-one-will-pay-you-for-a-business-amounts",
          element: <SpotTheBestBusinessToBuy />,
        },
        {
          path: "how-to-increase-the-value-of-your-business",
          element: <EvaluatingaBusinessforSale />,
        },
        {
          path: "how-to-determine-the-asking-price-for-your-business",
          element: <ThreeKeyAreasToFocus />,
        },
      ],
    },
    {
      path: "/stepper",
      element: <MakeAnOffer />,
      children: [
        {
          path: "attract-buyers",
          element: <MakeAnOfferPartial />,
        },
        {
          path: "how-to-create-a-successful-business-for-sale-listing-online",
          element: <DetermineItsEarning />,
        },
        {
          path: "how-to-select-great-photos-for-your-business-for-sale-listing",
          element: <SixRulesOfThumb />,
        },
        {
          path: "keeping-the-sale-of-your-business-confidential",
          element: <HowToMakeAnOffer/>,
        },
      ],
    },
    {
      path: "/stepper",
      element: <GetFinancing />,
      children: [
        {
          path: "negotiating-strategies",
          element: <GetFinancingPartial />,
        },
        {
          path: "sell-what-is-seller-financing-for-business",
          element: <DosAndDontFinancing/>
        },
        {
          path: "negotiating-strategies-incentives-to-motivate-buyers-and-close-the-deal",
          element: <FinancingForBusiness />,
        },
        {
          path: "sell-the-dos-and-donts-of-seller-financing-a-business-for-sale",
          element: <DemystifyingSBA />,
        },
      ],
    },
    {
      path: "/stepper",
      element: <ClosedTheDeal />,
      children: [
        {
          path: "finalize-the-deal",
          element: <CloseTheDealPartial />,
        },
        {
          path: "sell-preparing-for-due-diligence-what-sellers-need-to-know-about-business",
          element: <DueDiligenceCheckList />,
        },
        {
          path: "preparing-your-purchase-and-sale-agreement",
          element: <PreparingForDueDiligence />,
        },
        {
          path: "sell-closing-the-sale-and-securing-the-deal",
          element: <ClosingSaleAndSecurityDeal />,
        },
      ],
    },
    {
      path: "how-to-sell-a-business/retaining-key-employees-is-critical-to-selling-your-business",
      element: <OpportunitiesInBuyingAndSelling />,
    },
    
    {
      path: "how-to-sell-a-business/cares-act-sba-stimulus-loan-closing-timeline-update",
      element: <CaresActSBA />,
    },
    {
      path: "how-to-sell-a-business/is-there-a-boom-for-business-buyers-within-this-gloom",
      element: <BoomForBuyers />,
    },
    {
      path: "how-to-sell-a-business/businesses-thriving-during-covid-19-and-positioned-for-growth-as-new-markets-emerge",
      element: <CovidThrives />,
    },
   
  ]);
  return <div>{route}</div>;
};

export default SellerRouting;
