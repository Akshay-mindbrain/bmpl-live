import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/Auth/useLogout";

const Topbar = () => {
  const [langMenu, setLangMenu] = useState<null | HTMLElement>(null);
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // rename to avoid conflict
  const { mutate: logoutMutate } = useLogout();

  const handleLogout = () => {
    logoutMutate({}, {
      onSuccess: () => {
        setUserMenu(null);
        navigate("/login"); // redirect after logout
      },
      onError: (error: any) => {
        console.error("Logout error:", error.message);
      },
    });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#333",
        borderBottom: "1px solid #e6e8ec",
        px: 2,
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        {/* SEARCH BAR */}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#f7f8fc",
            borderRadius: 50,
            px: 2,
            py: 0.5,
            width: "350px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <SearchIcon sx={{ color: "#9a9ea5" }} />
          <InputBase placeholder="Search" sx={{ ml: 1, flex: 1 }} />
        </Paper>

        <Box sx={{ flexGrow: 1 }} />

        <Menu
          anchorEl={langMenu}
          open={Boolean(langMenu)}
          onClose={() => setLangMenu(null)}
        >
          <MenuItem onClick={() => setLangMenu(null)}>English</MenuItem>
          <MenuItem onClick={() => setLangMenu(null)}>Hindi</MenuItem>
        </Menu>

        {/* USER PROFILE */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={(e) => setUserMenu(e.currentTarget)}
        >
          <Avatar
            src="https://i.pravatar.cc/50"
            alt="Profile"
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>
              {user?.name || "Admin User"}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#7a7f85" }}>Admin</Typography>
          </Box>
          <KeyboardArrowDownIcon sx={{ ml: 1 }} />
        </Box>

        <Menu
          anchorEl={userMenu}
          open={Boolean(userMenu)}
          onClose={() => setUserMenu(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem component={Link} to="/profile" onClick={() => setUserMenu(null)}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
