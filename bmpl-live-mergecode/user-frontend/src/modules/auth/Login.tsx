import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import designConfig from "../../config/designConfig";
import { useLogin } from "../../hooks/auth/useLogin";
import { AuthLayout } from "./components/AuthLayout";

const Login = () => {
    const navigate = useNavigate();
    const { mutate: login, isPending } = useLogin();

    // 🔹 State
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const [errors, setErrors] = useState<{
        mobile?: string;
        password?: string;
    }>({});

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // 🔹 Validation
    const validate = () => {
        const newErrors: typeof errors = {};

        if (!mobile) newErrors.mobile = "Mobile number is required";
        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 🔹 Submit
    const handleLogin = () => {
        if (!validate()) return;

        setGeneralError("");

        login(
            { mobile, password },
            {
                onSuccess: () => {
                    toast.success("Login Successfull")
                        navigate("/home");
                },
                onError: () => {
                    toast.error("Invalid credentials")
                },
            }
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <AuthLayout title="Sign In" subtitle="Please enter your details to sign in">
            {/* Mobile Number */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="body2"
                    sx={{ color: designConfig.colors.text.primary, mb: 1, fontWeight: 500 }}
                >
                    Mobile Number
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => {
                        setMobile(e.target.value.replace(/[^0-9]/g, ""));
                        setErrors({ ...errors, mobile: "" });
                        setGeneralError("");
                    }}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            "& fieldset": { borderColor: designConfig.colors.background.border },
                            "&:hover fieldset": { borderColor: designConfig.colors.primary.light },
                            "&.Mui-focused fieldset": { borderColor: designConfig.colors.primary.main },
                        },
                    }}
                />
            </Box>

            {/* Password */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="body2"
                    sx={{ color: designConfig.colors.text.primary, mb: 1, fontWeight: 500 }}
                >
                    Password
                </Typography>
                <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                        setGeneralError("");
                    }}
                    onKeyDown={handleKeyPress}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            "& fieldset": { borderColor: designConfig.colors.background.border },
                            "&:hover fieldset": { borderColor: designConfig.colors.primary.light },
                            "&.Mui-focused fieldset": { borderColor: designConfig.colors.primary.main },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                    sx={{ color: "#757575" }}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Error */}
            {generalError && (
                <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
                    {generalError}
                </Typography>
            )}

            {/* Login Button */}
            <Button
                fullWidth
                variant="contained"
                disabled={isPending}
                onClick={handleLogin}
                sx={{
                    background:
                        (designConfig.colors as any).gradients?.primary ||
                        designConfig.colors.primary.main,
                    color: "#ffffff",
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    boxShadow: designConfig.shadows.primary,
                    "&:hover": {
                        background:
                            (designConfig.colors as any).gradients?.primary ||
                            designConfig.colors.primary.main,
                        opacity: 0.9,
                    },
                }}
            >
                {isPending ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            {/* New User */}
            <Typography
                variant="body2"
                sx={{
                    mt: 2,
                    textAlign: "center",
                    color: designConfig.colors.text.primary,
                }}
            >
                New user?{" "}
                <span
                    style={{
                        color: designConfig.colors.primary.main,
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/signup")}
                >
                    Create Account
                </span>
            </Typography>
        </AuthLayout>
    );
};

export default Login;