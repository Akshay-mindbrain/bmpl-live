
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../../components/common/FormInput";
import FileUpload from "../../components/common/FileUpload";
import { kycSchema } from "../../utils/validationSchemas";
import designConfig from '../../config/designConfig';
import PageHeader from "../../components/common/PageHeader";


const KycVerification = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        // watch,
    } = useForm({
        resolver: yupResolver(kycSchema), // Enabled validation
        mode: "onChange",
        defaultValues: {
            panNumber: "",
            aadhaarNumber: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("KYC Submitted:", data);
        navigate("/onboarding/bank");
    };

    return (
        <Box sx={{ bgcolor: designConfig.colors.background.light, minHeight: "100vh" }}>
            <PageHeader title="KYC Verification" />

            <Container
                maxWidth="sm"
                sx={{
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    py: 3,
                }}
            >
                <Box sx={{ mt: 2 }}>

                    <Box component="form">
                        {/* Inputs */}
                        <FormInput
                            name="panNumber"
                            control={control}
                            label="PAN Number"
                            placeholder="ABCDE1234F"
                        />

                        <FormInput
                            name="aadhaarNumber"
                            control={control}
                            label="Aadhaar Number"
                            placeholder="1234 5678 9012"
                            type="number" // Restrict to numbers visually
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                            }} // Hide spinner
                        />

                        {/* Uploads - Not tightly bound to Yup schema validation in this basic setup, but handled visually */}
                        <Box sx={{ mt: 2 }}>
                            {/* We can track file presence in RHF state if strict validation is needed for files too */}
                            <FileUpload label="PAN Card" id="pan-card-upload" />
                            <FileUpload label="Aadhaar (Front & Back)" id="aadhaar-upload" />
                            <FileUpload label="Selfie" id="selfie-upload" />
                        </Box>
                    </Box>
                </Box>

                <Button
                    onClick={handleSubmit(onSubmit)}
                    fullWidth
                    variant="contained"
                    // disabled={!isValid} // Disabled for testing
                    sx={{
                        bgcolor: designConfig.colors.primary.main,
                        color: "white",
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(123, 176, 59, 0.4)",
                        "&:hover": {
                            bgcolor: designConfig.colors.primary.dark,
                        },
                        "&.Mui-disabled": {
                            bgcolor: "#e0e0e0",
                            color: "#9e9e9e"
                        },
                        mb: 2,
                        mt: 4
                    }}
                >
                    Continue
                </Button>
            </Container>
        </Box>
    );
};

export default KycVerification;
