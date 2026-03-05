import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShareIcon from "@mui/icons-material/Share";

import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import designConfig, { alpha } from "../../config/designConfig";
import { useLogout } from "../../hooks/auth/useLogout";
import { useUserProfile } from "../../hooks/profile/useProfile";

const Topbar = ({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) => {

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useLogout();

  /* -------------------- USER PROFILE -------------------- */

  const { data, isLoading } = useUserProfile();
  const user = data?.data;

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;

  /* -------------------- HANDLERS -------------------- */

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await new Promise<void>((resolve, reject) => {
        logout(undefined, {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        });
      });

      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();

      setUserMenu(null);
      navigate("/login", { replace: true });

    } catch (error: any) {
      alert(error.message || "Logout failed");
    } finally {
      setLogoutLoading(false);
    }
  };

  /* -------------------- MOBILE MENU -------------------- */

  const mobileMenuItems = [
    {
      name: "My Wallets",
      path: "/my-wallet",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      name: "Genealogy",
      path: "/genealogy",
      icon: <AccountTreeIcon />,
    },
    {
      name: "Place New Member",
      path: "/place-new-member",
      icon: <PersonAddIcon />,
    },
    {
      name: "Invite & Earn",
      path: "/invite-earn",
      icon: <ShareIcon />,
    },
  ];

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }} onClick={handleDrawerToggle}>
      <Box px={2} pb={2} display="flex" justifyContent="center">
        <img src="/assets/images/Logo.png" alt="Logo" style={{ height: 40 }} />
      </Box>

      <List>
        {mobileMenuItems.map((item) => {

          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                mx: 1,
                mt: 1,
                borderRadius: designConfig.borderRadius.md,
                background: active
                  ? designConfig.colors.gradients.primary
                  : "transparent",
                color: active
                  ? designConfig.colors.primary.contrastText
                  : designConfig.colors.text.primary,
                boxShadow: active ? designConfig.shadows.primary : "none",
                transition: designConfig.transitions.default,
              }}
            >
              <ListItemIcon
                sx={{
                  color: active
                    ? "inherit"
                    : designConfig.colors.primary.main,
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.name} />

            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  /* -------------------- UI -------------------- */

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.5)",
          boxShadow: `0 4px 12px ${alpha(
            designConfig.colors.primary.main,
            0.15
          )}, 0 12px 40px ${alpha(
            designConfig.colors.primary.main,
            0.25
          )}`,
          color: designConfig.colors.text.primary,
          px: { xs: 1, md: 2 },
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>

          {/* LEFT SIDE */}
          <Box display="flex" alignItems="center" gap={2}>

            <IconButton
              onClick={onToggleSidebar}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                color: designConfig.colors.primary.main,
              }}
            >
              <MenuIcon />
            </IconButton>

            <img
              src="/assets/images/Logo.png"
              alt="Logo"
              style={{ height: 40 }}
            />

            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* USER INFO */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={(e) => setUserMenu(e.currentTarget)}
          >

            <Avatar src="https://i.pravatar.cc/50" />

            <Box ml={1} display={{ xs: "none", sm: "block" }}>

              <Typography fontWeight={600}>
                {isLoading ? "Loading..." : fullName}
              </Typography>

              <Typography fontSize={12} color="text.secondary">
                {user?.memberId ?? "Customer"}
              </Typography>

            </Box>

            <KeyboardArrowDownIcon sx={{ ml: 1 }} />

          </Box>

          {/* USER MENU */}

          <Menu
            anchorEl={userMenu}
            open={Boolean(userMenu)}
            onClose={() => setUserMenu(null)}
          >

            <MenuItem component={Link} to="/profile">
              My Profile
            </MenuItem>

            <MenuItem component={Link} to="/settings">
              Settings
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </MenuItem>

          </Menu>

        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>

    </>
  );
};

export default Topbar;