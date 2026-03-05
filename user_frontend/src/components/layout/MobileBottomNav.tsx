import { Paper, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import designConfig, { alpha } from '../../config/designConfig';

import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";

const navItems = [
    { name: "Home", path: "/home", icon: <HomeIcon /> },
    { name: "Category", path: "/category", icon: <GridViewIcon /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
    { name: "Orders", path: "/orders", icon: <ReceiptIcon /> },
    { name: "Profile", path: "/profile", icon: <PersonIcon /> },
];

const MobileBottomNav = () => {
    const location = useLocation();
    const isCart = location.pathname === "/cart";

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0, // Flatten bottom nav for a more professional look
                background: designConfig.colors.gradients.primary,
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 24px", // Remove vertical padding, rely on height and flex
                zIndex: 1300,
                boxShadow: isCart ? "none" : designConfig.shadows.primary,
                height: "80px", // Fixed height for stacking calculation
                borderTop: isCart ? "none" : `1px solid ${alpha(designConfig.colors.primary.light, 0.2)}`,
            }}
            elevation={0}
        >
            {navItems.map((item) => {
                const active = location.pathname === item.path;

                return (
                    <Box
                        key={item.name}
                        component={Link}
                        to={item.path}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            backgroundColor: active ? designConfig.colors.surfaces.white : "transparent",
                            color: active ? designConfig.colors.primary.main : alpha(designConfig.colors.primary.contrastText, 0.7),
                            padding: active ? "8px 16px" : "8px",
                            borderRadius: designConfig.borderRadius.sm,
                            transition: designConfig.transitions.default,
                            gap: active ? 1 : 0,
                        }}
                    >
                        {/* Clone icon to adjust size if needed */}
                        {item.icon}

                        {active && (
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.name}
                            </Typography>
                        )}
                    </Box>
                );
            })}
        </Paper>
    );
};

export default MobileBottomNav;
