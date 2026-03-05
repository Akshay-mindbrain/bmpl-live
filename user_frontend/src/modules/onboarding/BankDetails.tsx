
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../../components/common/FormInput";
// import { bankDetailsSchema } from "../../utils/validationSchemas";
import designConfig from '../../config/designConfig';


const BankDetails = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
    } = useForm({
        // resolver: yupResolver(bankDetailsSchema), // Disabled for testing
        mode: "onChange",
        defaultValues: {
            accountHolderName: "",
            accountNumber: "",
            ifscCode: "",
            bankName: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Bank Details Submitted:", data);
        navigate("/terms-conditions");
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                py: 4,
                bgcolor: designConfig.colors.background.light,
            }}
        >
            <Box sx={{ mt: 2 }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: designConfig.colors.primary.main, mb: 4 }}
                >
                    Bank Details
                </Typography>

                <Box component="form">
                    <FormInput
                        name="accountHolderName"
                        control={control}
                        label="Account holder name"
                        placeholder="As per bank account"
                    />

                    <FormInput
                        name="accountNumber"
                        control={control}
                        label="Account Number"
                        placeholder="Enter account number"
                        type="number" // Suggest numeric keyboard
                        sx={{
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                display: "none",
                            },
                        }}
                    />

                    <FormInput
                        name="ifscCode"
                        control={control}
                        label="IFSC Code"
                        placeholder="SBIN0001234"
                    // Auto-uppercase could be handled here or in val schema
                    />

                    <FormInput
                        name="bankName"
                        control={control}
                        label="Bank Name"
                        placeholder="State bank of india"
                    />
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
                Submit for verification
            </Button>
        </Container>
    );
};

export default BankDetails;
