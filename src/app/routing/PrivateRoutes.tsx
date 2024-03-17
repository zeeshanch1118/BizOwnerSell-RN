import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import InsightReports from '../../components/insight-reports/InsightReports'
import RecentArticles from '../../components/industry-specific-tips/success-stories/recent-articles/RecentArticles'
import Businesses from '../../admin_components/manage_listings/Businesses'
import Franchises from '../../admin_components/manage_listings/Franchises'
// import SoldListingInner from '../../components/business-brokers/innerScreen/SoldListingInner'

const PrivateRoutes = () => {
  const ManageAgents = lazy(() => import('../../components/sidebar/manage-agents'))
  const SiteMap = lazy(() => import('../../components/site-map/SiteMap'))
  const ContactUs = lazy(() => import('../../components/conditions&privacy/ContactUs'))
  const FeedBack = lazy(() => import('../../components/conditions&privacy/FeedBack'))
  const AboutUs = lazy(() => import('../../components/conditions&privacy/AboutUs'))

  const BrokerMessageCenter = lazy(
    () => import('../../components/sidebar/message-center/BrokerMessageCenter')
  )
  const ManageBroker = lazy(() => import('../../admin_components/manage-brokers/ManageBroker'))
  const MyFranchise = lazy(
    () => import('../../components/buy-a-franchise/innerScreenFranchise/MyFranchise')
  )
  const ManageCoupon = lazy(() => import('../../admin_components/manage-coupon-code/ManageCoupon'))
  const MyBusiness = lazy(
    () => import('../../components/buy-a-business/searchBusinesses/innerScreen/MyBusiness')
  )

  const Invoices = lazy(() => import('../../components/sidebar/invoices/Invoices'))
  const ManageInvoices = lazy(() => import('../../admin_components/manage-invoices/ManageInvoices'))
  const ManageAds = lazy(() => import('../../admin_components/manage_Ads/ManageAds'))
  const FeaturesManagement = lazy(
    () => import('../../admin_components/manage-features/FeaturesManagement')
  )
  const SoldListingInner = lazy(
    () => import('../../components/business-brokers/innerScreen/SoldListingScreen')
  )
  const UnlockSubscription = lazy(
    () => import('../../components/unlock-subscription/UnlockSubscription')
  )
  const ReportedListing = lazy(
    () => import('../../admin_components/repotedListing/ReportedListing')
  )
  const ManageReasons = lazy(() => import('../../admin_components/manage-reasons/ManageReasons.js'))

  const SimilarFranchises = lazy(
    () => import('../../components/buy-a-franchise/similarFranchises/SimilarFranchises')
  )
  const SimilarBusinesses = lazy(
    () =>
      import('../../components/buy-a-business/searchBusinesses/similarBusinesses/SimilarBusinesses')
  )
  const InnerScreenFranchise = lazy(
    () => import('../../components/buy-a-franchise/innerScreenFranchise/InnerScreenFranchise')
  )
  const SearchFranchisesForSale = lazy(
    () => import('../../components/buy-a-franchise/franchises-for-sale/SearchFranchisesForSale')
  )
  const BusinessScreen = lazy(
    () => import('../../components/buy-a-business/searchBusinesses/BusinessScreen')
  )
  const SearchBusinessInnerScreen = lazy(
    () =>
      import(
        '../../components/buy-a-business/searchBusinesses/innerScreen/SearchBusinessInnerScreen'
      )
  )

  const AllBuyerArticles = lazy(
    () => import('../../components/buy-a-business/Components/component/AllBuyerArticles')
  )
  const AllSellerArticles = lazy(
    () => import('../../components/sell-a-business/Partials/AllSellerArticles')
  )
  const IsMyBusinessWorthSelling = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/IsMyBusinessWorthSelling'
      )
  )
  const GetOurNewsLetter = lazy(
    () => import('../../components/buy-a-business/Components/NewsLetter/GetOurNewsLetter')
  )
  const IndustrySpecificTips = lazy(
    () => import('../../components/industry-specific-tips/IndustrySpecificTips')
  )
  const RestaurantUnitSale = lazy(
    () => import('../../components/industry-specific-tips/industries-articles/RestaurantUnitSale')
  )
  const RealStoriesFromRealOwners = lazy(
    () =>
      import('../../components/industry-specific-tips/success-stories/RealStoriesFromRealOwners')
  )
  const CovidResourcesForSmallBusiness = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/covid-resources/CovidResourcesForSmallBusiness'
      )
  )
  const RestaurantAnalysis2021 = lazy(
    () =>
      import('../../components/industry-specific-tips/industries-articles/RestaurantAnalysis2021')
  )
  const RestaurantAnalysis2022 = lazy(
    () =>
      import('../../components/industry-specific-tips/industries-articles/RestaurantAnalysis2022')
  )
  const ClosedRestaurant = lazy(
    () => import('../../components/industry-specific-tips/industries-articles/ClosedRestaurant')
  )
  const SevenKeyAreas = lazy(
    () => import('../../components/industry-specific-tips/industries-articles/SevenKeyAreas')
  )
  const BuyingHotel = lazy(
    () => import('../../components/industry-specific-tips/industries-articles/BuyingHotel')
  )
  const ItsJustNotTheMoney = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/ItsJustNotTheMoney'
      )
  )
  const LeavingCorporateAmerica = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/LeavingCorporateAmerica'
      )
  )
  const AnEntrepreneur = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/AnEntrepreneur'
      )
  )
  const SellingDuringPandemic = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/SellingDuringPandemic'
      )
  )
  const HeKnewHealthCare = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/HeKnewHealthCare'
      )
  )
  const MeetBegal = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/MeetBegal'
      )
  )
  const ImmigrantFranchise = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/ImmigrantFranchise'
      )
  )
  const BringingToSmallBusiness = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/BringingToSmallBusiness'
      )
  )
  const StartupsToShawarma = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/StartupsToShawarma'
      )
  )
  const HomeComing = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/HomeComing'
      )
  )
  const ChannelingFun = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/ChannelingFun'
      )
  )
  const OneCoupleSold = lazy(
    () =>
      import(
        '../../components/industry-specific-tips/success-stories/success-stories-articles/OneCoupleSold'
      )
  )

  const BusinessCategories = lazy(
    () => import('../../admin_components/manage_categories/businesses/BusinessListing')
  )
  const BusinessIndustry = lazy(
    () => import('../../admin_components/manage_categories/businesses/BusinessIndustry')
  )

  const FranchisesCatagory = lazy(
    () => import('../../admin_components/manage_categories/franchises/FranchisesCatagory')
  )
  const DashBoard = lazy(() => import('../../components/my-biz-buy-sell/DashBoard'))

  const ManageLocation = lazy(
    () => import('../../admin_components/manage_locations/ManageLocation')
  )

  const DownLoad = lazy(() => import('../../components/sell-a-business/DownLoad'))
  const DashboardContent = lazy(() => import('../../components/my-biz-buy-sell/ShowDashBoard'))
  const RecognizeSmallBusinessValue = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/RecognizeSmallBusinessValue'
      )
  )
  const BuyingSmallVsBigBusiness = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/IsMyBusinessWorthSelling'
      )
  )
  const DecideBestBusinessToOwn = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/UnderstandYourOptionsSteps/DecideBestBusinessToOwn'
      )
  )
  const FindTheRightBusinessPartial = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/ItemsFragment/FindTheRightBusinessPartial'
      )
  )
  const SpotTheBestBusinessToBuy = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/FindtheRightBusinessSteps/SpotTheBestBusinessToBuy'
      )
  )
  const EvaluatingaBusinessforSale = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/FindtheRightBusinessSteps/EvaluatingaBusinessforSale'
      )
  )
  const ThreeKeyAreasToFocus = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/FindtheRightBusinessSteps/ThreeKeyAreasToFocus'
      )
  )
  const MakeAnOfferPartial = lazy(
    () =>
      import('../../components/buy-a-business/Components/Partials/ItemsFragment/MakeAnOfferPartial')
  )
  const DetermineItsEarning = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/MakeAnOfferSteps/DetermineItsEarning'
      )
  )
  const SixRulesOfThumb = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/MakeAnOfferSteps/SixRulesOfThumb'
      )
  )
  const HowToMakeAnOffer = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/MakeAnOfferSteps/HowToMakeAnOffer'
      )
  )
  const GetFinancingPartial = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/ItemsFragment/GetFinancingPartial'
      )
  )
  const DosAndDontFinancing = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/GetFinancingSteps/DosAndDontFinancing'
      )
  )
  const FinancingForBusiness = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/GetFinancingSteps/FinancingForBusiness'
      )
  )
  const DemystifyingSBA = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/GetFinancingSteps/DemystifyingSBA'
      )
  )
  const CloseTheDealPartial = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/ItemsFragment/CloseTheDealPartial'
      )
  )
  const DueDiligenceCheckList = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/CloseTheDeal/DueDiligenceCheckList'
      )
  )
  const PreparingForDueDiligence = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/CloseTheDeal/PreparingForDueDiligence'
      )
  )
  const ClosingSaleAndSecurityDeal = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/steppersInner/CloseTheDeal/ClosingSaleAndSecurityDeal'
      )
  )
  const OpportunitiesInBuyingAndSelling = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/stepperInner/OpportunitiesInBuyingAndSelling'
      )
  )
  const CaresActSBA = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/stepperInner/CaresActSBA'
      )
  )
  const BoomForBuyers = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/stepperInner/BoomForBuyers'
      )
  )
  const ExperiencedBusiness = lazy(
    () =>
      import('../../components/tool&advice/LearningCenter/ValueABusinessInner/ExperiencedBusiness')
  )
  const MixingApplesAndPine = lazy(
    () =>
      import('../../components/tool&advice/LearningCenter/ValueABusinessInner/MixingApplesAndPine')
  )
  const CovidThrives = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/Steppers/stepperInner/CovidThrives'
      )
  )
  const FindTheRightBusiness = lazy(
    () =>
      import('../../components/buy-a-business/Components/Partials/Steppers/FindTheRightBusiness')
  )
  const UnderStandYourOptions = lazy(
    () =>
      import(
        '../../components/buy-a-business/Components/Partials/ItemsFragment/UnderStandYourOptions'
      )
  )
  const PrepareForExit = lazy(
    () => import('../../components/sell-a-business/Partials/Steppers/FinalizeTheDeal')
  )
  const FinalizeTheDeal = lazy(
    () => import('../../components/sell-a-business/Partials/Steppers/PrepareForExit')
  )
  const PrepareForExitPartial = lazy(
    () => import('../../components/sell-a-business/Partials/ItemsFragment/PrepareForExitPartial')
  )
  const SetanAskingPrice = lazy(
    () => import('../../components/sell-a-business/Partials/Steppers/SetanAskingPrice')
  )
  const AttractBuyers = lazy(
    () => import('../../components/sell-a-business/Partials/Steppers/AttractBuyers')
  )
  const AttractBuyersPartial = lazy(
    () => import('../../components/sell-a-business/Partials/ItemsFragment/AttractBuyersPartial')
  )
  const NegotiatingStrategiesPartial = lazy(
    () =>
      import('../../components/sell-a-business/Partials/ItemsFragment/NegotiatingStrategiesPartial')
  )
  const NegotiatingStrategies = lazy(
    () => import('../../components/sell-a-business/Partials/Steppers/NegotiatingStrategies')
  )
  const SetanAskingPricePartial = lazy(
    () => import('../../components/sell-a-business/Partials/ItemsFragment/SetanAskingPricePartial')
  )
  const FinalizeTheDealPartial = lazy(
    () => import('../../components/sell-a-business/Partials/ItemsFragment/FinalizeTheDealPartial')
  )
  const HowToValueABusiness = lazy(
    () => import('../../components/tool&advice/LearningCenter/HowToValueABusiness')
  )
  const AllArticles = lazy(
    () =>
      import(
        '../../components/tool&advice/LearningCenter/ValueABusinessInner/ShowAllArticles/AllArticles'
      )
  )
  const NoOneWillPayYou = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/NoOneWillPayYou'
      )
  )
  const IncreaseTheValueOfBusiness = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/IncreaseTheValueOfBusiness'
      )
  )
  const DetermineAnAskingPrice = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/DetermineAnAskingPrice'
      )
  )
  const NormalizingAdjustment = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/NormalizingAdjustment'
      )
  )
  const HowDoesOneJudgeOpinion = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/HowDoesOneJudgeOpinion'
      )
  )
  const BusinessNoFuture = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/BusinessNoFuture'
      )
  )
  const BusinessAppraisalProcess = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/BusinessAppraisalProcess'
      )
  )
  const BusinessAppraisalReport = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/BusinessAppraisalReport'
      )
  )
  const ChoosingBusinessAppraisal = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/ChoosingBusinessAppraisal'
      )
  )
  const IncreaseValueAndAttractBuyers = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/IncreaseValueAndAttractBuyers'
      )
  )
  const MakeYourBusinessMoreMarketable = lazy(
    () =>
      import(
        '../../components/sell-a-business/Partials/Steppers/steppersInner/Set-an-asking-price/MakeYourBusinessMoreMarketable'
      )
  )

  //////////Zeshaan Rouiting/////////////
  // const BusinessDetails = lazy(() => import('../../components/buy-a-business/businessDetails/BusinessDetails'))
  const ValRpt = lazy(() => import('../../components/sell-a-business/value-a-business-sub/ValRpt'))
  const TermsOfUse = lazy(() => import('../../components/conditions&privacy/TermsOfUse'))
  const PrivacyNotice = lazy(() => import('../../components/conditions&privacy/PrivacyNotice'))
  const Covid19Resources = lazy(
    () =>
      import('../../components/tool&advice/finance-center-sub/covid-19-resources/Covid19Resources')
  )
  const BuyingABusiness = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/BuyingABusiness')
  )
  const SellingABusiness = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/SellingABusiness')
  )
  const Franchising = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/Franchising')
  )
  const BusinessTrends = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/BusinessTrends')
  )
  const BusinessFinancing = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/BusinessFinancing')
  )
  const BusinessBrokerage = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/BusinessBrokerage')
  )
  const BlogMain = lazy(
    () => import('../../components/tool&advice/business-for-sale-blog/blog-main/BlogMain')
  )
  const YoursSba = lazy(() => import('../../components/tool&advice/finance-center-sub/YoursSba'))
  const BizWorthBusinessValuation = lazy(
    () => import('../../components/sell-a-business/value-a-business-sub/BizWorthBusinessValuation')
  )
  const MyBusinessWorth = lazy(
    () => import('../../components/sell-a-business/value-a-business-sub/MyBusinessWorth')
  )
  const BusinessValuationReport = lazy(
    () => import('../../components/sell-a-business/value-a-business-sub/BusinessValuationReport')
  )
  //////////Zeshaan Rouiting/////////////
  const UserManagement = lazy(() => import('../../admin_components/manage-users/UserManagement'))
  const PackageManagement = lazy(
    () => import('../../admin_components/manage-packages/PackageManagement')
  )
  const MessageCenter = lazy(() => import('../../admin_components/message_center/MessageCenter'))

  const UnderstandYourOptions = lazy(
    () =>
      import('../../components/buy-a-business/Components/Partials/Steppers/UnderstandYourOptions')
  )

  const MakeAnOffer = lazy(
    () => import('../../components/buy-a-business/Components/Partials/Steppers/MakeAnOffer')
  )
  const GetFinancing = lazy(
    () => import('../../components/buy-a-business/Components/Partials/Steppers/GetFinancing')
  )
  const CloseTheDeal = lazy(
    () => import('../../components/buy-a-business/Components/Partials/Steppers/ClosedTheDeal')
  )
  const Upgrade = lazy(() => import('../../components/buy-a-business/Upgrade'))
  const GuideToSelling = lazy(() => import('../../components/sidebar/selling/GuideToSelling'))
  const AddToNewListing = lazy(() => import('../../components/sidebar/selling/AddToNewListing'))
  const MySavedLisings = lazy(() => import('../../components/sidebar/searching/MySavedLisings'))
  const MySavedSearches = lazy(() => import('../../components/sidebar/searching/MySavedSearches'))
  const EdgeProfile = lazy(() => import('../../components/sidebar/bizbuysell-edge/EdgeProfile'))
  const Recommendations = lazy(
    () => import('../../components/sidebar/bizbuysell-edge/Recommendations')
  )
  const MyAccount = lazy(() => import('../../components/sidebar/account/MyAccount'))
  const LocationInsights = lazy(
    () => import('../../components/sidebar/bizbuysell-edge/LocationInsights')
  )
  const BuyerVideoSeries = lazy(
    () => import('../../components/sidebar/bizbuysell-edge/BuyerVideoSeries')
  )
  const GuideToBuying = lazy(() => import('../../components/sidebar/researches/GuideToBuying'))
  const MyValuationReports = lazy(
    () => import('../../components/sidebar/researches/MyValuationReports')
  )
  const GetValuationReports = lazy(
    () => import('../../components/sidebar/researches/GetValuationReports')
  )
  const MyMailBox = lazy(() => import('../../components/sidebar/message-center/MyMailBox'))

  const MyBillingInformation = lazy(
    () => import('../../components/sidebar/account/MyBillingInformation')
  )
  // const DashBoard = lazy(() => import('../../components/my-biz-buy-sell/DashBoard'))
  const MyListings = lazy(() => import('../../components/sidebar/selling/MyListings'))
  // const MySavedSearches = lazy(() => import('../../components/my-biz-buy-sell/MySavedSearches'))
  // const MyMailBox = lazy(() => import('../../components/my-biz-buy-sell/MyMailBox'))
  // const MyAccount = lazy(() => import('../../components/my-biz-buy-sell/MyAccount'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const LandingScreen = lazy(() => import('../../components/Landing-screen/LandingScreen'))
  // const BusinessCategories = lazy(
  //   () => import('../../components/buy-a-business/businessDetails/BusinessCategories')
  // )
  const BizBuySellEdge = lazy(() => import('../../components/buy-a-business/BizBuySellEdge'))
  const HowToBuyABusiness = lazy(() => import('../../components/buy-a-business/HowToBuyABusiness'))
  const FranchiseCategories = lazy(
    () => import('../../components/buy-a-franchise/FranchiseCategories')
  )

  const FindABroker = lazy(() => import('../../components/business-brokers/index/Index'))
  const SearchBroker = lazy(
    () => import('../../components/business-brokers/search-broker/SearchBrokerScreen')
  )
  const SearchBrokerInnerScreen = lazy(
    () => import('../../components/business-brokers/innerScreen/SearchBrokerInnerScreen')
  )
  const SellerInnerScreen = lazy(
    () => import('../../components/seller-profile/innerScreen/SellerInnerScreen')
  )
  const HowToSellABusiness = lazy(
    () => import('../../components/sell-a-business/HowToSellABusiness')
  )
  const SellABusinessOnBizBuySell = lazy(
    () => import('../../components/sell-a-business/SellABusinessOnBizBuySell')
  )
  const SellMultipleBusineses = lazy(
    () => import('../../components/sell-a-business/SellMultipleBusineses')
  )
  const ValueABusiness = lazy(() => import('../../components/sell-a-business/ValueABusiness'))
  const BusinessForSaleBlog = lazy(() => import('../../components/tool&advice/BusinessForSaleBlog'))
  const FinanceCenter = lazy(() => import('../../components/tool&advice/FinanceCenter'))
  const LearningCenter = lazy(
    () => import('../../components/tool&advice/LearningCenter/LearningCenter')
  )

  // const BuyerRouting = lazy(() => import('../../components/buy-a-business/Components/BuyerRouting'))
  // const SellerRouting = lazy(() => import( '../../components/sell-a-business/SellerRouting'))
  // const LearningRouting = lazy(() => import('../../components/tool&advice/LearningCenter/LearningRouting'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        {/* <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}
        <Route
          path='/'
          element={
            <SuspensedView>
              <LandingScreen />
            </SuspensedView>
          }
        />
        <Route
          path='aboutus'
          element={
            <SuspensedView>
              <AboutUs />
            </SuspensedView>
          }
        />
        <Route
          path='business/valuation-subscription/:id'
          element={
            <SuspensedView>
              <UnlockSubscription />
            </SuspensedView>
          }
        />
        <Route
          path='similar-franchises'
          element={
            <SuspensedView>
              <SimilarFranchises />
            </SuspensedView>
          }
        />
        <Route
          path='similar-businesses'
          element={
            <SuspensedView>
              <SimilarBusinesses />
            </SuspensedView>
          }
        />
        <Route
          path='search-businesses-for-sale'
          element={
            <SuspensedView>
              <BusinessScreen />
            </SuspensedView>
          }
        />
        <Route
          path='search-businesses/established-businesses-for-sale'
          element={
            <SuspensedView>
              <BusinessScreen />
            </SuspensedView>
          }
        />
        <Route
          path='search-businesses/assets-for-sale'
          element={
            <SuspensedView>
              <BusinessScreen />
            </SuspensedView>
          }
        />
        <Route
          path='businesses/:title/:id'
          element={
            <SuspensedView>
              <SearchBusinessInnerScreen />
            </SuspensedView>
          }
        />
        <Route
          path='my-business/:title/:id'
          element={
            <SuspensedView>
              <MyBusiness />
            </SuspensedView>
          }
        />
        <Route
          path='my-franchise/:title/:franchiseID'
          element={
            <SuspensedView>
              <MyFranchise />
            </SuspensedView>
          }
        />
        <Route
          path='restaurantandfood'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        ///////////////stepper1 ////////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <UnderstandYourOptions />
            </SuspensedView>
          }
        >
          <Route
            path='understand-your-options'
            element={
              <SuspensedView>
                <UnderStandYourOptions />
              </SuspensedView>
            }
          />
          <Route
            path='buying-a-small-business-vs-a-big-business-why-size-matters'
            element={
              <SuspensedView>
                <BuyingSmallVsBigBusiness />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='before-you-buy-recognizing-small-business-value-drivers'
            element={
              <SuspensedView>
                <RecognizeSmallBusinessValue />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='buying-a-business-how-to-decide-the-best-business-to-own'
            element={
              <SuspensedView>
                <DecideBestBusinessToOwn />
              </SuspensedView>
            }
          />
        </Route>
        ////////////////////////stepper-2 llllllllllll
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <FindTheRightBusiness />
            </SuspensedView>
          }
        >
          <Route
            path='find-the-right-business'
            element={
              <SuspensedView>
                <FindTheRightBusinessPartial />
              </SuspensedView>
            }
          />
          <Route
            path='how-to-spot-best-business-to-buy-preliminary-due-diligence'
            element={
              <SuspensedView>
                <SpotTheBestBusinessToBuy />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='evaluating-a-business-for-sale-what-to-ask-the-owner'
            element={
              <SuspensedView>
                <EvaluatingaBusinessforSale />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='buying-a-small-business-3-key-areas-to-focus-on'
            element={
              <SuspensedView>
                <ThreeKeyAreasToFocus />
              </SuspensedView>
            }
          />
        </Route>
        //////////////////// stepper 3 ////////////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <MakeAnOffer />
            </SuspensedView>
          }
        >
          <Route
            path='make-an-offer'
            element={
              <SuspensedView>
                <MakeAnOfferPartial />
              </SuspensedView>
            }
          />
          <Route
            path='valuing-a-small-business-determining-its-earning-potential'
            element={
              <SuspensedView>
                <DetermineItsEarning />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='6-rules-of-thumb-for-business-valuation'
            element={
              <SuspensedView>
                <SixRulesOfThumb />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='how-to-make-an-offer-when-purchasing-a-business'
            element={
              <SuspensedView>
                <HowToMakeAnOffer />
              </SuspensedView>
            }
          />
        </Route>
        ///////////////stepper 4 ////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <GetFinancing />
            </SuspensedView>
          }
        >
          <Route
            path='get-financing'
            element={
              <SuspensedView>
                <GetFinancingPartial />
              </SuspensedView>
            }
          />
          <Route
            path='the-dos-and-donts-of-seller-financing-a-business-for-sale'
            element={
              <SuspensedView>
                <DosAndDontFinancing />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='what-is-seller-financing-for-business'
            element={
              <SuspensedView>
                <FinancingForBusiness />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='demystifying-sba-loans-for-buying-a-business-or-franchise'
            element={
              <SuspensedView>
                <DemystifyingSBA />
              </SuspensedView>
            }
          />
        </Route>
        ///////////////stepper 5 ////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <CloseTheDeal />
            </SuspensedView>
          }
        >
          <Route
            path='close-the-deal'
            element={
              <SuspensedView>
                <CloseTheDealPartial />
              </SuspensedView>
            }
          />
          <Route
            path='due-diligence-checklist-what-to-verify-before-buying-a-business'
            element={
              <SuspensedView>
                <DueDiligenceCheckList />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='preparing-for-due-diligence-what-sellers-need-to-know-about-business-buyers'
            element={
              <SuspensedView>
                <PreparingForDueDiligence />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='closing-the-sale-and-securing-the-deal'
            element={
              <SuspensedView>
                <ClosingSaleAndSecurityDeal />
              </SuspensedView>
            }
          />
        </Route>
        ///////////////How to buy a business ////////////
        <Route
          path='how-to-buy-a-business/opportunities-in-buying-and-selling-close-businesses'
          element={
            <SuspensedView>
              <OpportunitiesInBuyingAndSelling />
            </SuspensedView>
          }
        />
        <Route
          path='how-to-buy-a-business/cares-act-sba-stimulus-loan-closing-timeline-update'
          element={
            <SuspensedView>
              <CaresActSBA />
            </SuspensedView>
          }
        />{' '}
        <Route
          path='how-to-buy-a-business/is-there-a-boom-for-business-buyers-within-this-gloom'
          element={
            <SuspensedView>
              <BoomForBuyers />
            </SuspensedView>
          }
        />{' '}
        <Route
          path='how-to-buy-a-business/businesses-thriving-during-covid-19-and-positioned-for-growth-as-new-markets-emerge'
          element={
            <SuspensedView>
              <CovidThrives />
            </SuspensedView>
          }
        />
        <Route
          path='learning-center/buyer-articles'
          element={
            <SuspensedView>
              <AllBuyerArticles />
            </SuspensedView>
          }
        />
        ///////////////Seller stepper1 ////////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <PrepareForExit />
            </SuspensedView>
          }
        >
          <Route
            path='prepare-for-your-exit'
            element={
              <SuspensedView>
                <PrepareForExitPartial />
              </SuspensedView>
            }
          />
          <Route
            path='is-my-business-worth-selling'
            element={
              <SuspensedView>
                <IsMyBusinessWorthSelling />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='how-to-create-a-business-exit-strategy-and-avoid-costly-mistakes'
            element={
              <SuspensedView>
                <RecognizeSmallBusinessValue />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='selling-your-business-is-all-about-timing'
            element={
              <SuspensedView>
                <DecideBestBusinessToOwn />
              </SuspensedView>
            }
          />
          <Route
            path='six-rules-of-thumb-for-business-valuation'
            element={
              <SuspensedView>
                <SixRulesOfThumb />
              </SuspensedView>
            }
          />
        </Route>
        ////////////////////////stepper-2 llllllllllll
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <SetanAskingPrice />
            </SuspensedView>
          }
        >
          <Route
            path='set-an-asking-price'
            element={
              <SuspensedView>
                <SetanAskingPricePartial />
              </SuspensedView>
            }
          />
          <Route
            path='no-one-will-pay-you-for-a-business-amounts-to-60-hours-at-16-dollars-an-hour'
            element={
              <SuspensedView>
                <NoOneWillPayYou />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='how-to-increase-the-value-of-your-business'
            element={
              <SuspensedView>
                <IncreaseTheValueOfBusiness />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='how-to-determine-the-asking-price-for-your-business'
            element={
              <SuspensedView>
                <DetermineAnAskingPrice />
              </SuspensedView>
            }
          />
          <Route
            path='normalizing-adjustment-in-rent-for-business-appraisal'
            element={
              <SuspensedView>
                <NormalizingAdjustment />
              </SuspensedView>
            }
          />
          <Route
            path='mixing-apples-and-pineapples-buildup-method-in-business-valuation'
            element={
              <SuspensedView>
                <MixingApplesAndPine />
              </SuspensedView>
            }
          />
          <Route
            path='in-business-valuation-how-does-one-judge-an-opinion'
            element={
              <SuspensedView>
                <HowDoesOneJudgeOpinion />
              </SuspensedView>
            }
          />
          <Route
            path='valuing-a-business-that-has-no-future'
            element={
              <SuspensedView>
                <BusinessNoFuture />
              </SuspensedView>
            }
          />
          <Route
            path='a-detailed-account-of-how-an-appraiser-values-a-business'
            element={
              <SuspensedView>
                <BusinessAppraisalProcess />
              </SuspensedView>
            }
          />
          <Route
            path='how-can-you-tell-if-the-business-appraisal-report-you-receive-is-any-good'
            element={
              <SuspensedView>
                <BusinessAppraisalReport />
              </SuspensedView>
            }
          />
          <Route
            path='how-can-you-tell-if-the-business-appraisal-report-you-receive-is-any-good'
            element={
              <SuspensedView>
                <BusinessAppraisalReport />
              </SuspensedView>
            }
          />
          <Route
            path='choosing-a-business-appraiser'
            element={
              <SuspensedView>
                <ChoosingBusinessAppraisal />
              </SuspensedView>
            }
          />
          <Route
            path='how-to-increase-the-value-of-your-business-and-attract-buyers'
            element={
              <SuspensedView>
                <IncreaseValueAndAttractBuyers />
              </SuspensedView>
            }
          />
          <Route
            path='how-to-make-your-business-more-marketable'
            element={
              <SuspensedView>
                <MakeYourBusinessMoreMarketable />
              </SuspensedView>
            }
          />
        </Route>
        //////////////////// stepper 3 ////////////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <AttractBuyers />
            </SuspensedView>
          }
        >
          <Route
            path='attract-buyers'
            element={
              <SuspensedView>
                <AttractBuyersPartial />
              </SuspensedView>
            }
          />
          <Route
            path='how-to-create-a-successful-business-for-sale-listing-online'
            element={
              <SuspensedView>
                <DetermineItsEarning />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='how-to-select-great-photos-for-your-business-for-sale-listing'
            element={
              <SuspensedView>
                <SixRulesOfThumb />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='keeping-the-sale-of-your-business-confidential'
            element={
              <SuspensedView>
                <HowToMakeAnOffer />
              </SuspensedView>
            }
          />
        </Route>
        ///////////////stepper 4 ////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <NegotiatingStrategies />
            </SuspensedView>
          }
        >
          <Route
            path='negotiating-strategies'
            element={
              <SuspensedView>
                <NegotiatingStrategiesPartial />
              </SuspensedView>
            }
          />
          <Route
            path='sell-what-is-seller-financing-for-business'
            element={
              <SuspensedView>
                <DosAndDontFinancing />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='negotiating-strategies-incentives-to-motivate-buyers-and-close-the-deal'
            element={
              <SuspensedView>
                <FinancingForBusiness />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='sell-the-dos-and-donts-of-seller-financing-a-business-for-sale'
            element={
              <SuspensedView>
                <DemystifyingSBA />
              </SuspensedView>
            }
          />
        </Route>
        ///////////////stepper 5 ////////////
        <Route
          path='stepper'
          element={
            <SuspensedView>
              <FinalizeTheDeal />
            </SuspensedView>
          }
        >
          <Route
            path='finalize-the-deal'
            element={
              <SuspensedView>
                <FinalizeTheDealPartial />
              </SuspensedView>
            }
          />
          <Route
            path='sell-preparing-for-due-diligence-what-sellers-need-to-know-about-business'
            element={
              <SuspensedView>
                <DueDiligenceCheckList />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='preparing-your-purchase-and-sale-agreement'
            element={
              <SuspensedView>
                <PreparingForDueDiligence />
              </SuspensedView>
            }
          />{' '}
          <Route
            path='sell-closing-the-sale-and-securing-the-deal'
            element={
              <SuspensedView>
                <ClosingSaleAndSecurityDeal />
              </SuspensedView>
            }
          />
        </Route>
        ///////////////How to sell a business ////////////
        <Route
          path='how-to-sell-a-business/retaining-key-employees-is-critical-to-selling-your-business'
          element={
            <SuspensedView>
              <OpportunitiesInBuyingAndSelling />
            </SuspensedView>
          }
        />
        <Route
          path='how-to-sell-a-business/cares-act-sba-stimulus-loan-closing-timeline-update'
          element={
            <SuspensedView>
              <CaresActSBA />
            </SuspensedView>
          }
        />{' '}
        <Route
          path='how-to-sell-a-business/is-there-a-boom-for-business-buyers-within-this-gloom'
          element={
            <SuspensedView>
              <BoomForBuyers />
            </SuspensedView>
          }
        />{' '}
        <Route
          path='how-to-sell-a-business/businesses-thriving-during-covid-19-and-positioned-for-growth-as-new-markets-emerge'
          element={
            <SuspensedView>
              <CovidThrives />
            </SuspensedView>
          }
        />
        <Route
          path='learning-center'
          element={
            <SuspensedView>
              <LearningCenter />
            </SuspensedView>
          }
        />
        <Route
          path='/learning-center/is-there-a-boom-for-business-buyers-within-this-gloom'
          element={
            <SuspensedView>
              <BoomForBuyers />
            </SuspensedView>
          }
        />
        <Route
          path='learning-center/seller-articles'
          element={
            <SuspensedView>
              <AllSellerArticles />
            </SuspensedView>
          }
        />
        ///////////// How To VAlue a Business ////////////////////////
        <Route
          path='how-to-value-a-business'
          element={
            <SuspensedView>
              <HowToValueABusiness />
            </SuspensedView>
          }
        />
        <Route
          path='how-to-value-a-business/all-articles'
          element={
            <SuspensedView>
              <AllArticles />
            </SuspensedView>
          }
        />
        <Route
          path='stepper/why-business-brokers-and-owners-utilize-third-party-business-appraisals'
          element={
            <SuspensedView>
              <ExperiencedBusiness />
            </SuspensedView>
          }
        />
        <Route
          path='stepper/6-rules-of-thumb-for-business-valuation'
          element={
            <SuspensedView>
              <SixRulesOfThumb />
            </SuspensedView>
          }
        />
        <Route
          path='stepper/6-rules-of-thumb-for-business-valuation'
          element={
            <SuspensedView>
              <SixRulesOfThumb />
            </SuspensedView>
          }
        />
        <Route
          path='stepper/is-there-a-boom-for-business-buyers-within-this-gloom'
          element={
            <SuspensedView>
              <BoomForBuyers />
            </SuspensedView>
          }
        />
        <Route
          path='stepper/mixing-apples-and-pineapples-buildup-method-in-business-valuation'
          element={
            <SuspensedView>
              <MixingApplesAndPine />
            </SuspensedView>
          }
        />
        //////// News letter Subscription ////////////////
        <Route
          path='subscribe'
          element={
            <SuspensedView>
              <GetOurNewsLetter />
            </SuspensedView>
          }
        />
        /////////////////////////////// Industry Specific Tips ///////////////////////////////
        <Route
          path='learning-center/industries'
          element={
            <SuspensedView>
              <IndustrySpecificTips />
            </SuspensedView>
          }
        />
        //////////////////////// Recent Articles ///////////////////////////////////
        <Route
          path='/learning-center/industries/recent-articles'
          element={
            <SuspensedView>
              <RecentArticles />
            </SuspensedView>
          }
        />
        ////////// Industry Specific Tips Articles /////////////
        <Route
          path='/learning-center/article/restaurant-unit-sales-in-Q1-2022-up-sale-prices-surge'
          element={
            <SuspensedView>
              <RestaurantUnitSale />
            </SuspensedView>
          }
        />
        <Route
          path='/learning-center/article/restaurant-industry-analysis-2022'
          element={
            <SuspensedView>
              <RestaurantAnalysis2022 />
            </SuspensedView>
          }
        />
        <Route
          path='/learning-center/article/restaurant-industry-analysis'
          element={
            <SuspensedView>
              <RestaurantAnalysis2021 />
            </SuspensedView>
          }
        />
        <Route
          path='/covid-19-resources/considerations-for-taking-over-a-closed-restaurant'
          element={
            <SuspensedView>
              <ClosedRestaurant />
            </SuspensedView>
          }
        />
        <Route
          path=' /learning-center/industries/article/7-key-areas-to-evaluate-before-buying-a-restaurant'
          element={
            <SuspensedView>
              <SevenKeyAreas />
            </SuspensedView>
          }
        />
        <Route
          path=' /learning-center/industries/article/three-methods-of-how-to-finance-a-restaurant'
          element={
            <SuspensedView>
              <ThreeKeyAreasToFocus />
            </SuspensedView>
          }
        />
        <Route
          path='/learning-center/industries/article/buying-a-hotel-three-acquisition-tips'
          element={
            <SuspensedView>
              <BuyingHotel />
            </SuspensedView>
          }
        />
        //////////// Success Stories //////////////////
        <Route
          path='/small-business-success-stories'
          element={
            <SuspensedView>
              <RealStoriesFromRealOwners />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/its-not-just-the-money-the-importance-of-winning-a-sellers-trust-buying-a-business'
          element={
            <SuspensedView>
              <ItsJustNotTheMoney />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/an-american-tale-leaving-corporate-america-to-acquire-a-piece-of-main-street'
          element={
            <SuspensedView>
              <LeavingCorporateAmerica />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/entrepreneur-finds-his-pandemic-silver-lining-buying-an-eco-friendly-franchise'
          element={
            <SuspensedView>
              <AnEntrepreneur />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/selling-a-business-during-a-pandemic-when-talented-employees-are-the-perfect-buyers'
          element={
            <SuspensedView>
              <SellingDuringPandemic />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/he-knew-the-healthcare-industry-so-he-bought-a-clinical-research-business'
          element={
            <SuspensedView>
              <HeKnewHealthCare />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/meet-mr-bagel-meister-a-story-of-small-business-resilience-during-covid-19-and-beyond'
          element={
            <SuspensedView>
              <MeetBegal />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/immigrant-to-franchisee-a-story-of-hard-work-and-big-dreams'
          element={
            <SuspensedView>
              <ImmigrantFranchise />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/blackhawk-fiberwerx-an-idea-guy-makes-entrepreneurship-his-reality'
          element={
            <SuspensedView>
              <BringingToSmallBusiness />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/startups-to-shawarma-an-la-techie-finds-success-in-the-mountains-1'
          element={
            <SuspensedView>
              <StartupsToShawarma />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/europa-gifts-homecoming-a-story-of-second-career-entrepreneurship'
          element={
            <SuspensedView>
              <HomeComing />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/nordic-mountain-meet-the-skier-with-a-knack-for-running-snow-parks'
          element={
            <SuspensedView>
              <ChannelingFun />
            </SuspensedView>
          }
        />
        <Route
          path='/success-story/sold-bakery-in-less-than-30-days'
          element={
            <SuspensedView>
              <OneCoupleSold />
            </SuspensedView>
          }
        />
        //////////// Covid-19 //////////////////
        <Route
          path='/covid-19-resources-for-small-business-buyers'
          element={
            <SuspensedView>
              <CovidResourcesForSmallBusiness />
            </SuspensedView>
          }
        />
        ////////////// Insight Reports ///////////////////
        <Route
          path='/insight-report'
          element={
            <SuspensedView>
              <InsightReports />
            </SuspensedView>
          }
        />
        ////////////////////Zeshaan////////// /////////////////////////////////////
        <Route
          path='valrpt'
          element={
            <SuspensedView>
              <ValRpt />
            </SuspensedView>
          }
        />
        <Route
          path='download'
          element={
            <SuspensedView>
              <DownLoad />
            </SuspensedView>
          }
        />
        <Route
          path='feedback'
          element={
            <SuspensedView>
              <FeedBack />
            </SuspensedView>
          }
        />
        <Route
          path='contactus'
          element={
            <SuspensedView>
              <ContactUs />
            </SuspensedView>
          }
        />
        <Route
          path='privacy-notice'
          element={
            <SuspensedView>
              <PrivacyNotice />
            </SuspensedView>
          }
        />
        <Route
          path='bizWorth-business-valuation'
          element={
            <SuspensedView>
              <BizWorthBusinessValuation />
            </SuspensedView>
          }
        />
        <Route
          path='terms-of-use'
          element={
            <SuspensedView>
              <TermsOfUse />
            </SuspensedView>
          }
        />
        <Route
          path='covid-19-resources'
          element={
            <SuspensedView>
              <Covid19Resources />
            </SuspensedView>
          }
        />
        <Route
          path='category/Buying-a-Business'
          element={
            <SuspensedView>
              <BuyingABusiness />
            </SuspensedView>
          }
        />
        <Route
          path='blog'
          element={
            <SuspensedView>
              <BusinessForSaleBlog />
            </SuspensedView>
          }
        >
          <Route
            index
            element={
              <SuspensedView>
                <BlogMain />
              </SuspensedView>
            }
          />
          <Route
            path='category/Business-Brokerage'
            element={
              <SuspensedView>
                <BusinessBrokerage />
              </SuspensedView>
            }
          />
          <Route
            path='category/Business-Financing'
            element={
              <SuspensedView>
                <BusinessFinancing />
              </SuspensedView>
            }
          />
          <Route
            path='category/Business-Trends'
            element={
              <SuspensedView>
                <BusinessTrends />
              </SuspensedView>
            }
          />
          <Route
            path='category/Buying-a-Business'
            element={
              <SuspensedView>
                <BuyingABusiness />
              </SuspensedView>
            }
          />
          <Route
            path='category/Franchising'
            element={
              <SuspensedView>
                <Franchising />
              </SuspensedView>
            }
          />
          <Route
            path='category/Selling-a-Business'
            element={
              <SuspensedView>
                <SellingABusiness />
              </SuspensedView>
            }
          />
        </Route>
        <Route
          path='finance-center/yourssba'
          element={
            <SuspensedView>
              <YoursSba />
            </SuspensedView>
          }
        />
        <Route
          path='what-is-my-business-worth'
          element={
            <SuspensedView>
              <MyBusinessWorth />
            </SuspensedView>
          }
        />
        <Route
          path='business-valuation-report'
          element={
            <SuspensedView>
              <BusinessValuationReport />
            </SuspensedView>
          }
        />
        <Route
          path='upgrade'
          element={
            <SuspensedView>
              <Upgrade />
            </SuspensedView>
          }
        />
        <Route
          path='membership-biz-buy-sell-edge'
          element={
            <SuspensedView>
              <BizBuySellEdge />
            </SuspensedView>
          }
        />
        <Route
          path='how-to-buy-a-business'
          element={
            <SuspensedView>
              <HowToBuyABusiness />
            </SuspensedView>
          }
        />
        {/* Lazy Modules */}
        ////////////
        <Route
          path='search-franchises'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        <Route
          path=':franchiseSlug/:franchiseID'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        <Route
          path='franchise/:title/:franchiseID'
          element={
            <SuspensedView>
              <InnerScreenFranchise />
            </SuspensedView>
          }
        />
        <Route
          path='low-cost-franchise/:franchiseID'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        <Route
          path='food-and-restaurant-franchise/:franchiseID'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        <Route
          path='business-opportunities-franchise/:franchiseID'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        <Route
          path='retail-franchise/:franchiseID'
          element={
            <SuspensedView>
              <FranchiseCategories />
            </SuspensedView>
          }
        />
        <Route
          path='franchise-for-sale'
          element={
            <SuspensedView>
              <SearchFranchisesForSale />
            </SuspensedView>
          }
        />
        /////////////////////
        <Route
          path='site-map'
          element={
            <SuspensedView>
              <SiteMap />
            </SuspensedView>
          }
        />
        <Route
          path='find-broker'
          element={
            <SuspensedView>
              <FindABroker />
            </SuspensedView>
          }
        />
        <Route
          path='search-for-broker'
          element={
            <SuspensedView>
              <SearchBroker />
            </SuspensedView>
          }
        />
        <Route
          path='search-for-broker/:id'
          element={
            <SuspensedView>
              <SearchBrokerInnerScreen />
            </SuspensedView>
          }
        />
        <Route
          path='seller/:id'
          element={
            <SuspensedView>
              <SellerInnerScreen />
            </SuspensedView>
          }
        />
        <Route
          path='sold-listing/:slug/:id'
          element={
            <SuspensedView>
              <SoldListingInner />
            </SuspensedView>
          }
        />
        <Route
          path='how-to-sell-a-business'
          element={
            <SuspensedView>
              <HowToSellABusiness />
            </SuspensedView>
          }
        />
        <Route
          path='sell-a-business'
          element={
            <SuspensedView>
              <SellABusinessOnBizBuySell />
            </SuspensedView>
          }
        />
        <Route
          path='brokers'
          element={
            <SuspensedView>
              <SellMultipleBusineses />
            </SuspensedView>
          }
        />
        <Route
          path='small-business-valuation'
          element={
            <SuspensedView>
              <ValueABusiness />
            </SuspensedView>
          }
        />
        <Route
          path='business-brokers'
          element={
            <SuspensedView>
              <FindABroker />
            </SuspensedView>
          }
        />
        <Route
          path='finance-center'
          element={
            <SuspensedView>
              <FinanceCenter />
            </SuspensedView>
          }
        />
        <Route
          path='learning-center'
          element={
            <SuspensedView>
              <LearningCenter />
            </SuspensedView>
          }
        />
        <Route
          path='blog'
          element={
            <SuspensedView>
              <BusinessForSaleBlog />
            </SuspensedView>
          }
        />
        ///////////////////////
        <Route
          path='/dashboard'
          element={
            <SuspensedView>
              <DashBoard />
            </SuspensedView>
          }
        >
          <Route
            path=''
            element={
              <SuspensedView>
                <DashboardContent />
              </SuspensedView>
            }
          />
          <Route
            path='contact'
            element={
              <SuspensedView>
                <BrokerMessageCenter />
              </SuspensedView>
            }
          />
          <Route
            path='manage-agents'
            element={
              <SuspensedView>
                <ManageAgents />
              </SuspensedView>
            }
          />
          <Route
            path='manage-coupon'
            element={
              <SuspensedView>
                <ManageCoupon />
              </SuspensedView>
            }
          />
          <Route
            path='manage-ads'
            element={
              <SuspensedView>
                <ManageAds />
              </SuspensedView>
            }
          />
          <Route
            path='invoices'
            element={
              <SuspensedView>
                <ManageInvoices />
              </SuspensedView>
            }
          />
          <Route
            path='all-invoices'
            element={
              <SuspensedView>
                <Invoices />
              </SuspensedView>
            }
          />
          <Route
            path='features-management'
            element={
              <SuspensedView>
                <FeaturesManagement />
              </SuspensedView>
            }
          />
          <Route
            path='reported-listing'
            element={
              <SuspensedView>
                <ReportedListing />
              </SuspensedView>
            }
          />
          <Route
            path='manage-reasons'
            element={
              <SuspensedView>
                <ManageReasons />
              </SuspensedView>
            }
          />
          <Route
            path='saved-listings'
            element={
              <SuspensedView>
                <MySavedLisings />
              </SuspensedView>
            }
          />
          {/* <Route
            path='saved-listings'
            element={
              <SuspensedView>
                <MySavedListings />
              </SuspensedView>
            }
          /> */}
          <Route
            path='businesses-catagories'
            element={
              <SuspensedView>
                <BusinessCategories />
              </SuspensedView>
            }
          />
          <Route
            path='industries-catagories'
            element={
              <SuspensedView>
                <BusinessIndustry />
              </SuspensedView>
            }
          />
          <Route
            path='businesses-listings'
            element={
              <SuspensedView>
                <Businesses />
              </SuspensedView>
            }
          />
          <Route
            path='franchises-listings'
            element={
              <SuspensedView>
                <Franchises />
              </SuspensedView>
            }
          />
          {/*
           */}
          <Route
            path='franchises-catagories'
            element={
              <SuspensedView>
                <FranchisesCatagory />
              </SuspensedView>
            }
          />
          <Route
            path='manage-locations'
            element={
              <SuspensedView>
                <ManageLocation />
              </SuspensedView>
            }
          />
          <Route
            path='saved-searches'
            element={
              <SuspensedView>
                <MySavedSearches />
              </SuspensedView>
            }
          />
          <Route
            path='edge-profile'
            element={
              <SuspensedView>
                <EdgeProfile />
              </SuspensedView>
            }
          />
          <Route
            path='recommended-upgrade'
            element={
              <SuspensedView>
                <Recommendations />
              </SuspensedView>
            }
          />
          /////////////
          <Route
            path='my-listings'
            element={
              <SuspensedView>
                <MyListings />
              </SuspensedView>
            }
          />
          <Route
            path='selling-guide'
            element={
              <SuspensedView>
                <GuideToSelling />
              </SuspensedView>
            }
          />
          <Route
            path='add-to-new-listing/:biz_id'
            element={
              <SuspensedView>
                <AddToNewListing />
              </SuspensedView>
            }
          />
          <Route
            path='add-to-new-listing'
            element={
              <SuspensedView>
                <AddToNewListing />
              </SuspensedView>
            }
          />
          {/* <Route
            path='saved-listings'
            element={
              <SuspensedView>
               <MySavedLisings/>
              </SuspensedView>
            }
          /> */}
          {/* <Route
            path='saved-searches'
            element={
              <SuspensedView>
                <MySavedSearches/>
              </SuspensedView>
            }
          /> */}
          <Route
            path='my-account/*'
            element={
              <SuspensedView>
                <MyAccount />
              </SuspensedView>
            }
          />
          <Route
            path='location-insights'
            element={
              <SuspensedView>
                <LocationInsights />
              </SuspensedView>
            }
          />
          <Route
            path='buyer-video-series'
            element={
              <SuspensedView>
                <BuyerVideoSeries />
              </SuspensedView>
            }
          />
          <Route
            path='guide-to-buying'
            element={
              <SuspensedView>
                <GuideToBuying />
              </SuspensedView>
            }
          />
          <Route
            path='my-valuation-reports'
            element={
              <SuspensedView>
                <MyValuationReports />
              </SuspensedView>
            }
          />
          <Route
            path='get-valuation-reports'
            element={
              <SuspensedView>
                <GetValuationReports />
              </SuspensedView>
            }
          />
          <Route
            path='inbox'
            element={
              <SuspensedView>
                <MyMailBox />
              </SuspensedView>
            }
          />
          <Route
            path='billing-information'
            element={
              <SuspensedView>
                <MyBillingInformation />
              </SuspensedView>
            }
          />
          <Route
            path='manage-users'
            element={
              <SuspensedView>
                <UserManagement />
              </SuspensedView>
            }
          />
          <Route
            path='manage-brokers'
            element={
              <SuspensedView>
                <ManageBroker />
              </SuspensedView>
            }
          />
          <Route
            path='package-management'
            element={
              <SuspensedView>
                <PackageManagement />
              </SuspensedView>
            }
          />
          <Route
            path='message-center'
            element={
              <SuspensedView>
                <MessageCenter />
              </SuspensedView>
            }
          />
        </Route>
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        ////////////////////////////
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return (
    <>
      <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
    </>
  )
}

export {PrivateRoutes}
