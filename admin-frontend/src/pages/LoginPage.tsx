// src/pages/LoginPage.tsx
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/BMPL 1.png";
import { useLogin } from "../hooks/Auth/useAuth";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { mutateAsync } = useLogin(); // no isLoading needed

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      toast.error("All Fields Required");
      return;
    }

    try {
      await mutateAsync({ username, password });

      // Navigate to dashboard directly
      navigate("/dashboard");
      toast.success("Login Successfull");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
      toast.error("Login error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#ffffff",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: 450,
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #26619A",
        }}
      >
        <form onSubmit={handleLogin}>
          {/* Logo */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2.5 }}>
            <img src={logo} alt="BMPL Logo" style={{ width: "187px" }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{ color: "#26619A", fontWeight: 600, mb: 0, textAlign: "center" }}
          >
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ color: "#757575", mb: 3, textAlign: "center" }}>
            Please enter your details to sign in
          </Typography>

          {/* Error */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Username Field */}
          <TextField
            fullWidth
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 3 }}
            required
          />

          {/* Password Field */}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#26619A",
              color: "#ffffff",
              py: 1.5,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              "&:hover": { bgcolor: "#1e4d7a" },
            }}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
