import { Box, Typography, TextField, Card, Button } from "@mui/material";
import { AccountVerifyIcon, BankAccountDetails } from "../../assets/Icons";
import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

export default function BankAccountPage() {
  return (
    <Box sx={{ bgcolor: designConfig.colors.background.light, minHeight: "100vh" }}>

      {/* Header */}
      <PageHeader title="Bank Account Details" />

      <Box sx={{ p: 3 }}>
        {/* SUCCESS MESSAGE BOX */}
        <Box
          sx={{
            bgcolor: designConfig.colors.success.background,
            border: `1px solid ${designConfig.colors.success.light}44`,
            p: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            mb: 3,
          }}
        >
          <AccountVerifyIcon />
          <Typography sx={{ fontSize: 14, color: designConfig.colors.success.main, fontWeight: 500 }}>
            Your bank account has been verified and is active for transactions.
          </Typography>
        </Box>

        {/* INPUT FIELD LABELS + INPUTS */}
        <Field label="Account holder name" value="Rajesh Kumar" />
        <Field label="Account Number" value="1234567890123456" />
        <Field label="Confirm Account Number" value="1234567890123456" />
        <Field label="IFSC Code" value="SBIN0001234" />
        <Field label="Bank Name" value="State Bank of India" />
        <Field label="Branch Name" value="Mumbai Central" />

        {/* BANK SUMMARY CARD */}
        <Card
          sx={{
            bgcolor: designConfig.colors.background.paper,
            borderRadius: 3,
            p: 2.5,
            mt: 3,
            mb: 3,
            border: `1px solid ${designConfig.colors.primary.light}40`,
            boxShadow: designConfig.shadows.sm
          }}
        >
          {/* Icon + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: `${designConfig.colors.primary.main}20`,
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: designConfig.colors.primary.main
              }}
            >
              <BankAccountDetails />
            </Box>

            <Typography sx={{ fontSize: 16, fontWeight: 700, color: designConfig.colors.text.primary }}>
              Bank Account Summary
            </Typography>
          </Box>

          {/* Info Rows */}
          <InfoRow label="Account Holder:" value="Rajesh Kumar" />
          <InfoRow label="Account Number:" value="1234 5678 9012 3456" />
          <InfoRow label="IFSC Code:" value="SBIN0001234" />
          <InfoRow label="Branch:" value="Mumbai Central" />
        </Card>

        {/* UPDATE BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: designConfig.colors.primary.main,
            color: "white",
            textTransform: "none",
            fontSize: 16,
            fontWeight: 700,
            py: 1.3,
            borderRadius: "12px",
            boxShadow: designConfig.shadows.primary,
            "&:hover": { bgcolor: designConfig.colors.primary.dark },
          }}
        >
          Update Details
        </Button>
      </Box>
    </Box>
  );
}

/* Reusable Input Field Component */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ fontSize: 14, mb: 0.5, fontWeight: 500, color: designConfig.colors.text.secondary }}>{label}</Typography>
      <TextField
        fullWidth
        value={value}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            background: "white",
            "& fieldset": {
              borderColor: designConfig.colors.background.border,
            },
          },
        }}
      />
    </Box>
  );
}

/* Reusable Info Row Component */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        my: 0.7,
      }}
    >
      <Typography sx={{ color: designConfig.colors.text.secondary, fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ fontWeight: 600, color: designConfig.colors.text.primary, fontSize: 13 }}>{value}</Typography>
    </Box>
  );
}
