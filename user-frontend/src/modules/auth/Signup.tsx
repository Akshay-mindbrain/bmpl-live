import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import designConfig from "../../config/designConfig";
import { AuthLayout } from "./components/AuthLayout";
import { useCreateUser } from "../../hooks/auth/useCreateUser";
import { toast } from "sonner";

/* 🔹 Input Border Styling */
const inputStyle = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: designConfig.colors.background.border },
        "&:hover fieldset": { borderColor: designConfig.colors.primary.light },
        "&.Mui-focused fieldset": {
            borderColor: designConfig.colors.primary.main,
        },
    },
};

const Signup = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { mutate: createUser, isPending } = useCreateUser();

    /* 🔒 Hidden fields (auto-filled from params if available) */
    const sponsorIdParam = searchParams.get("sponsorId");
    const legParam = searchParams.get("leg");

    const sponsorId = sponsorIdParam ? Number(sponsorIdParam) : undefined;
    const legPosition: "LEFT" | "RIGHT" | undefined =
        legParam === "LEFT" || legParam === "RIGHT" ? legParam : undefined;

    /* 🔹 Visible form fields */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<{
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        password?: string;
    }>({});

    /* 🔹 Validators */
    const isValidName = (value: string) => /^[A-Za-z]+$/.test(value);
    const isValidPhone = (value: string) => /^[0-9]{10}$/.test(value);
    const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!firstName.trim())
            newErrors.firstName = "First name is required";
        else if (!isValidName(firstName))
            newErrors.firstName = "Only alphabets allowed";

        if (!lastName.trim())
            newErrors.lastName = "Last name is required";
        else if (!isValidName(lastName))
            newErrors.lastName = "Only alphabets allowed";

        if (!email.trim())
            newErrors.email = "Email is required";
        else if (!isValidEmail(email))
            newErrors.email = "Enter a valid email";

        if (!phone)
            newErrors.phone = "Phone number is required";
        else if (!isValidPhone(phone))
            newErrors.phone = "Enter a valid 10-digit phone number";

        if (!password)
            newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = () => {
        if (!validate()) return;

        createUser(
            {
                firstName,
                lastName,
                email,
                mobile: phone,
                password,
                sponsorId,
                legPosition,
            },
            {
                onSuccess: () => {
                    toast.success("Signup successful");
                    navigate("/login");
                },
                onError: (err: any) => {
                    alert(err.message || "Email already exists");
                },
            }
        );
    };
    return (
        <AuthLayout title="Sign Up" subtitle="Create your account to get started">
            {/* Name */}
            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        First Name
                    </Typography>
                    <TextField
                        fullWidth
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value.replace(/[^A-Za-z]/g, ""))
                        }
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        sx={inputStyle}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Last Name
                    </Typography>
                    <TextField
                        fullWidth
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value.replace(/[^A-Za-z]/g, ""))
                        }
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        sx={inputStyle}
                    />
                </Box>
            </Box>

            {/* Email */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Email
                </Typography>
                <TextField
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={inputStyle}
                />
            </Box>

            {/* Phone */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Phone Number
                </Typography>
                <TextField
                    fullWidth
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    inputProps={{ maxLength: 10 }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={inputStyle}
                />
            </Box>

            {/* Password */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Password
                </Typography>
                <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={inputStyle}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Submit */}
            <Button
                fullWidth
                variant="contained"
                disabled={isPending}
                onClick={handleSignup}
            >
                {isPending ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
        </AuthLayout>
    );
};

export default Signup;