import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Chip,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { SettingsIcon, Trophy } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import { CurrencyRupeeOutlined, PaymentOutlined, Storefront } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";


// Type with optional isNew flag
type MenuItem = {
  type: "item";
  name: string;
  path: string;
  icon: React.ReactNode;
  isNew?: boolean; // ← new field
};

type MenuDropdown = {
  type: "dropdown";
  name: string;
  icon: React.ReactNode;
  basePath: string;
  children: Array<{ name: string; path: string; isNew?: boolean }>; // ← can mark child too
  isNew?: boolean;
};

type MenuConfig = MenuItem | MenuDropdown;

// Updated menu config with isNew flags
const menuConfig: MenuConfig[] = [
  {
    type: "dropdown",
    name: "Master",
    icon: <AdminPanelSettingsIcon />,
    basePath: "/admins",
    children: [{ name: "Admin Management", path: "/admins" }],
  },
  {
    type: "item",
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    type: "item",
    name: "Packages & Plans",
    path: "/packages-plans",
    icon: <LocalActivityIcon />,
  },
  {
    type: "item",
    name: "Users & Agents",
    path: "/users",
    icon: <PeopleIcon />,
  },
  {
    type: "dropdown",
    name: "KYC Management",
    icon: <VerifiedUserIcon />,
    basePath: "/kyc",
    children: [
      {
        name: "Pending",
        path: "/kyc-setting/pending",
      },
      {
        name: "Rejected",
        path: "/kyc-setting/rejected",
      },
      {
        name: "Approved",
        path: "/kyc-setting/approved",
      },
      {
        name: "All",
        path: "/kyc-setting/all",
        isNew: true,
      },
    ],
  },
  {
    type: "item",
    name: "Income",
    path: "/income",
    icon: <CurrencyRupeeOutlined />
  },
  {
    type: "item",
    name: "Payout",
    path: "/payout",
    icon: <PaymentOutlined />
  },
  {
    type: "item",
    name: "Rewards",
    path: "/rewards",
    isNew: true,
    icon: <Trophy />
  },
  {
    type: "dropdown",
    name: "E-Commerce Management",
    icon: <Storefront />,
    basePath: "/e-commerce",
    children: [
      { name: "Category Management", path: "/e-commerce/category", isNew: true },
      { name: "Product Management", path: "/e-commerce/products", isNew: true },
      { name: "Order Management", path: "/e-commerce/orders" },
    ],
  },
  {
    type: "dropdown",
    name: "Settings",
    icon: <SettingsIcon />,
    basePath: "/settings",
    children: [
      { name: "User Config", path: "/settings/user-config" },
      {
        name: "SMTP (Mail Management)",
        path: "/settings/smtp",
        isNew: true, // ← NEW FEATURE
      },
      { name: "Order Place", path: "/settings/order-place", isNew: true }
    ],
  },
];

// ================= COMPONENT =================
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderMenuLabel = (name: string, isNew?: boolean) => {
    if (!isNew) return name;

    return (
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {name}
        <Chip
          label="New"
          size="small"
          color="success"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            fontWeight: 600,
            bgcolor: '#e8f5e9',
            color: '#2e7d32',
            borderRadius: '10px',
          }}
        />
        {/* Alternative: sparkle icon instead of chip */}
        {/* <AutoAwesomeIcon fontSize="small" sx={{ color: '#f57c00' }} /> */}
      </Box>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 70 : 260, // slightly wider to fit "New" badge
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 70 : 260,
          background: "#f8fafc",
          borderRight: "1px solid #e0e7ff",
          boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
        },
      }}
    >
      {/* Header / Logo + Collapse Button */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          borderBottom: "1px solid #e0e7ff",
        }}
      >
        {!isCollapsed && (
          <img
            src="/assets/images/Logo.png"
            alt="Logo"
            style={{ height: 42, objectFit: "contain" }}
          />
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="small"
          sx={{ color: "grey.700" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1, pt: 2 }}>
        {menuConfig.map((menu) => {
          const isActive =
            menu.type === "item"
              ? location.pathname === menu.path
              : location.pathname.startsWith(menu.basePath);

          if (menu.type === "item") {
            return (
              <ListItemButton
                key={menu.name}
                component={Link}
                to={menu.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  background: isActive ? "#e3f2fd" : "transparent",
                  color: isActive ? "primary.main" : "inherit",
                  "&:hover": { background: "#f0f7ff" },
                  justifyContent: isCollapsed ? "center" : "flex-start",
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 2, color: isActive ? "primary.main" : "inherit" }}>
                  {menu.icon}
                </ListItemIcon>

                {!isCollapsed && (
                  <ListItemText
                    primary={renderMenuLabel(menu.name, menu.isNew)}
                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isActive ? 600 : 500 }}
                  />
                )}
              </ListItemButton>
            );
          }

          // Dropdown
          return (
            <Box key={menu.name}>
              <ListItemButton
                onClick={() =>
                  isCollapsed
                    ? navigate(menu.basePath)
                    : toggleMenu(menu.name)
                }
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  background: isActive ? "#e3f2fd" : "transparent",
                  color: isActive ? "primary.main" : "inherit",
                  "&:hover": { background: "#f0f7ff" },
                  justifyContent: isCollapsed ? "center" : "flex-start",
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 2, color: isActive ? "primary.main" : "inherit" }}>
                  {menu.icon}
                </ListItemIcon>

                {!isCollapsed && (
                  <>
                    <ListItemText
                      primary={renderMenuLabel(menu.name, menu.isNew)}
                      primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isActive ? 600 : 500 }}
                      sx={{ flexGrow: 1 }}
                    />
                    {openMenus[menu.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </>
                )}
              </ListItemButton>

              <Collapse in={openMenus[menu.name] && !isCollapsed}>
                <List disablePadding sx={{ pl: 1 }}>
                  {menu.children.map((child) => (
                    <ListItemButton
                      key={child.path}
                      component={Link}
                      to={child.path}
                      sx={{
                        borderRadius: 2,
                        pl: 5,
                        py: 0.8,
                        background:
                          location.pathname === child.path ? "#e3f2fd" : "transparent",
                        "&:hover": { background: "#f0f7ff" },
                      }}
                    >
                      <ListItemText
                        primary={renderMenuLabel(child.name, child.isNew)}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: location.pathname === child.path ? 600 : 500,
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;