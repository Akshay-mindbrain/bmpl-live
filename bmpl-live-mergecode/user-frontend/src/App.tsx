// src/App.tsx
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import designConfig from "./config/designConfig";
import Login from "./modules/auth/Login";
import Signup from "./modules/auth/Signup";
import BankDetails from "./modules/onboarding/BankDetails";
import BasicInfo from "./modules/onboarding/BasicInfo";
import ChoosePackage from "./modules/onboarding/ChoosePackage";
import RegistrationSuccess from "./modules/onboarding/RegistrationSuccess";
import TermsConditions from "./modules/onboarding/TermsConditions";
import Welcome from "./modules/onboarding/Welcome";

//notification sonner
import { Toaster } from "sonner";

// Protected Layout - User Pages
import Cart from "./modules/cart/Cart";
import Checkout from "./modules/cart/Checkout";
import OrderSuccess from "./modules/cart/OrderSuccess";
import Payment from "./modules/cart/Payment";
import Home from "./modules/home/Home";
import { Kyc } from "./modules/kyc/Kyc";
import LandingPage from "./modules/landing/LandingPage";
import ChoosePosition from "./modules/network/ChoosePosition";
import Genealogy from "./modules/network/Genealogy";
import InvitesReferrals from "./modules/network/InvitesReferrals";
import PlaceNewMember from "./modules/network/PlaceNewMember";
import Notifications from "./modules/notifications/Notifications";
import KycVerification from "./modules/onboarding/KycVerification";
import Order from "./modules/order/Order";
import OrderTracking from "./modules/order/OrderTracking";
import Plan from "./modules/plan/plan";
import Profile from "./modules/profile/Profile";
import Category from "./modules/shop/Category";
import CategoryProducts from "./modules/shop/CategoryProducts";
import ProductDetails from "./modules/shop/ProductDetails";
import Contact from "./modules/support/Contact";
import Faqs from "./modules/support/Faqs";
import AddressSelection from "./modules/user/AddressSelection";
import KycStatusPage from "./modules/user/KycStatus";
import PersonalInfoPage from "./modules/user/PersonalInformation";
import BankAccountPage from "./modules/wallet/BankAccountDetails";
import BvLedger from "./modules/wallet/BvLedger";
import Coins from "./modules/wallet/Coins";
import Coupons from "./modules/wallet/Coupons";
import Dashboard from "./modules/wallet/Dashboard";
import Earning from "./modules/wallet/EarningTab";
import Payouts from "./modules/wallet/Payouts";
import Repurchase from "./modules/wallet/Repurchase";

const theme = createTheme({
  palette: {
    primary: {
      main: designConfig.colors.primary.main,
      light: designConfig.colors.primary.light,
      dark: designConfig.colors.primary.dark,
      contrastText: designConfig.colors.primary.contrastText,
    },
    secondary: {
      main: designConfig.colors.secondary.main,
      light: designConfig.colors.secondary.light,
      dark: designConfig.colors.secondary.dark,
      contrastText: designConfig.colors.secondary.contrastText,
    },
    background: {
      default: designConfig.colors.background.default,
      paper: designConfig.colors.background.paper,
    },
    text: {
      primary: designConfig.colors.text.primary,
      secondary: designConfig.colors.text.secondary,
    },
  },
  typography: {
    fontFamily: designConfig.typography.fontFamily.primary,
    h1: { fontFamily: designConfig.typography.fontFamily.heading },
    h2: { fontFamily: designConfig.typography.fontFamily.heading },
    h3: { fontFamily: designConfig.typography.fontFamily.heading },
    h4: { fontFamily: designConfig.typography.fontFamily.heading },
    h5: { fontFamily: designConfig.typography.fontFamily.heading },
    h6: { fontFamily: designConfig.typography.fontFamily.heading },
    body1: { fontFamily: designConfig.typography.fontFamily.primary },
    body2: { fontFamily: designConfig.typography.fontFamily.primary },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
});


const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Onboarding / Registration Flow (No Layout) */}
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/onboarding/basic-info" element={<BasicInfo />} />
            <Route path="/onboarding/kyc" element={<KycVerification />} />
            <Route path="/onboarding/bank" element={<BankDetails />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/choose-package" element={<ChoosePackage />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />

            {/* Protected Layout - User Pages */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/kyc" element={<Kyc />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-wallet" element={<Dashboard />} />
              <Route path="/my-wallet/coins" element={<Coins />} />
              <Route path="/my-wallet/coupons" element={<Coupons />} />
              <Route path="/my-wallet/earnings" element={<Earning />} />
              <Route path="/my-wallet/repurchase" element={<Repurchase />} />
              <Route path="/genealogy" element={<Genealogy />} />
              <Route path="/place-new-member" element={<PlaceNewMember />} />
              <Route path="/invite-earn" element={<InvitesReferrals />} />
              <Route path="/personal-info" element={<PersonalInfoPage />} />
              <Route path="/kyc-status" element={<KycStatusPage />} />
              <Route path="/bank-account" element={<BankAccountPage />} />
              <Route path="/payouts" element={<Payouts />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/choose-position" element={<ChoosePosition />} />

              {/* Shopping Flow */}
              <Route path="/category-products" element={<CategoryProducts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/address-selection" element={<AddressSelection />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/order-tracking/:id" element={<OrderTracking />} />
              <Route path="/bv-ledger" element={<BvLedger />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
