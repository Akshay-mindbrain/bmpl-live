import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileBottomNav from "./MobileBottomNav";
import { Outlet, useLocation } from "react-router-dom";

import designConfig from "../../config/designConfig";

const Layout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isCheckout = location.pathname === "/checkout" || location.pathname === "/payment" || location.pathname === "/order-success" || location.pathname === "/orders" || location.pathname.startsWith("/order-tracking/") || location.pathname === "/bv-ledger";

  // These pages have their own headers, so hide the global Topbar to prevent double headers
  // For Checkout/Payment: Hide on Mobile (xs), Show on Desktop (md)
  const hideHeaderAlways = ["/category-products"].includes(location.pathname) || location.pathname.startsWith("/product/");
  const isHome = location.pathname === "/" || location.pathname === "/home" || location.pathname === "/profile";

  // Pages that require full width (0 padding) for sticky headers
  const fullWidthPages = [
    "/category", "/cart", "/payouts", "/orders",
    "/checkout", "/payment", "/order-success",
    "/bank-account", "/kyc-status", "/place-new-member",
    "/invite-earn", "/personal-info", "/faqs", "/contact", "/notifications",
    "/genealogy", "/choose-position", "/bv-ledger", "/my-wallet"
  ];

  const isFullWidthJson = fullWidthPages.includes(location.pathname) || isHome;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: designConfig.colors.background.light, height: "100vh" }}>
      {/* 1. Global Full-Width Header */}
      {!hideHeaderAlways && (
        <Box sx={{ width: "100%", zIndex: 1202 }}>
          {/* @ts-ignore */}
          <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        </Box>
      )}

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* 2. Sidebar - Desktop Collapsible */}
        <Box
          sx={{
            width: { md: isSidebarOpen ? 240 : 0 },
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            display: { xs: 'none', md: 'block' },
            flexShrink: 0
          }}
        >
          <Box sx={{ width: 240 }}>
            <Sidebar />
          </Box>
        </Box>

        {/* 3. Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: '100%',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
          }}
        >
          {/* Scrollable Content */}
          <Box sx={{
            p: (hideHeaderAlways || isFullWidthJson) ? 0 : (isCheckout ? { xs: 0, md: 3 } : 3),
            pb: 10,
            overflowY: "auto",
            flexGrow: 1,
            height: '100%'
          }}>
            <Outlet />
          </Box>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
