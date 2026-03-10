
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BadgeIcon from "@mui/icons-material/Badge";

import FormInput from "../../components/common/FormInput"; // reusable component
// import { basicInfoSchema } from "../../utils/validationSchemas"; // centralized schema
import designConfig from '../../config/designConfig';


const BasicInfo = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
    } = useForm({
        // resolver: yupResolver(basicInfoSchema), // Disabled for testing
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            sponsorId: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Basic Info Submitted:", data);
        // Ideally, dispatch to Redux or save to context here
        navigate("/onboarding/kyc");
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh", // Use minHeight to ensure full screen
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                py: 4,
                bgcolor: designConfig.colors.background.light,
            }}
        >
            <Box sx={{ mt: 2 }}>
                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: designConfig.colors.primary.main, mb: 4 }}
                >
                    Basic Information
                </Typography>

                {/* Form Fields */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        name="fullName"
                        control={control}
                        label="Full Name"
                        placeholder="Write your full name"
                        icon={<PersonIcon />}
                    />

                    <FormInput
                        name="email"
                        control={control}
                        label="Email Id"
                        placeholder="Write your email"
                        icon={<EmailIcon />}
                    />

                    <FormInput
                        name="phoneNumber"
                        control={control}
                        label="Phone Number"
                        placeholder="Write your phone number"
                        icon={<LocalPhoneIcon />}
                        type="tel"
                        slotProps={{
                            htmlInput: { inputMode: "numeric" }
                        }}
                    />

                    <FormInput
                        name="sponsorId"
                        control={control}
                        label="Sponsor/Referral ID"
                        placeholder="Write your sponsor ID"
                        icon={<BadgeIcon />}
                    />
                </Box>
            </Box>

            {/* Button */}
            <Button
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
                sx={{
                    bgcolor: designConfig.colors.primary.main,
                    color: "white",
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                    "&:hover": {
                        bgcolor: designConfig.colors.primary.dark,
                    },
                    "&.Mui-disabled": {
                        bgcolor: "#e0e0e0",
                        color: "#9e9e9e"
                    },
                    mb: 2,
                }}
            >
                Continue
            </Button>
        </Container>
    );
};

export default BasicInfo;
