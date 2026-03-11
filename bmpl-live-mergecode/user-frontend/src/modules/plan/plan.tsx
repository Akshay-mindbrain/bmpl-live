import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { usePlan } from "../../hooks/plan/useGetAllplans";
import { usePurchasePlan } from "../../hooks/plan/usePurchasePlan";
import { usePurchasesByUser } from "../../hooks/plan/usePurchasesByUser";

import type { Plan } from "../../hooks/plan/useGetAllplans";
import { toast } from "sonner";

/* ===================== TYPES ===================== */
type PurchaseType = "FIRST_PURCHASE" | "REPURCHASE" | "SHARE_PURCHASE";

export default function PlanPage() {
  /* ===================== QUERIES ===================== */
  const { data: plans = [], isLoading, isError, error } = usePlan();
  const { mutate, isPending } = usePurchasePlan();
  const { data: purchaseData } = usePurchasesByUser();

  const hasPurchasedBefore = (purchaseData?.purchases?.length ?? 0) > 0;

  /* ===================== STATE ===================== */
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [paymentType, setPaymentType] = useState("");
  const [purchaseType, setPurchaseType] = useState<PurchaseType | "">("");
  const [proofUrl, setProofUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ===================== HANDLERS ===================== */
  const handleOpen = (plan: Plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
    setPaymentType("");
    setPurchaseType("");
    setProofUrl("");
  };

  const handleProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "frontendfileupload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhuddbzui/image/upload",
        { method: "POST", body: data }
      );
      const result = await res.json();
      setProofUrl(result.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedPlan) return;

    let selectedPurchaseType: PurchaseType = "FIRST_PURCHASE";
    if (hasPurchasedBefore) {
      if (!purchaseType) return;
      selectedPurchaseType = purchaseType;
    }

    mutate(
      {
        BV: selectedPlan.BV,
        dp_amount: selectedPlan.dp_amount,
        plan_amount: selectedPlan.price,
        payment_mode: paymentType,
        payment_proof_uri: proofUrl,
        is_income_generated: "NO",
        purchase_type: selectedPurchaseType,
        plan_id: String(selectedPlan.id),
      },
      {
        onSuccess: () => {
          toast.success("Plan Purchased Successfully");
          handleClose();
        },
      }
    );
  };

  /* ===================== UI STATES ===================== */
  if (isLoading) {
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={5}>
        {(error as Error).message}
      </Typography>
    );
  }

  /* ===================== RENDER ===================== */
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: "#f4f6f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={800} mb={4}>
        🚀 Plans
      </Typography>

      {/* FLEX CONTAINER INSTEAD OF GRID */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          alignItems: "stretch", // Makes all cards in a row the same height
        }}
      >
        {plans.map((plan) => (
          <Card
            key={plan.id}
            sx={{
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              // Fixed widths for responsiveness without Grid
              width: {
                xs: "100%", // Mobile
                sm: "calc(50% - 12px)", // 2 cards (accounting for gap)
                md: "calc(33.333% - 20px)", // 3 cards
              },
              boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            }}
          >
            {/* CARD HEADER */}
            <Box
              sx={{
                p: 3,
                background: "linear-gradient(135deg,#1e3c72,#2a5298)",
                color: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight={600}>{plan.planName}</Typography>
              <Typography variant="h4" fontWeight={800}>₹{plan.price}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>BV: {plan.BV}</Typography>
            </Box>

            {/* CARD BODY */}
            <CardContent
              sx={{
                flexGrow: 1, // Fills available space
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                color="text.secondary"
                sx={{
                  mb: 2,
                  // LINE CLAMP LOGIC: Wraps and breaks at 3 lines
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "4.5em", // Optional: maintains spacing even if text is short
                }}
              >
                {plan.Description}
              </Typography>

              {/* STICKY BOTTOM SECTION */}
              <Box sx={{ mt: "auto" }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1">
                  <strong>DP:</strong> ₹{plan.dp_amount}
                </Typography>

                <Stack direction="row" spacing={1} mt={1.5} alignItems="center">
                  <CheckCircleIcon
                    sx={{
                      fontSize: 20,
                      color: plan.status === "ACTIVE" ? "#2e7d32" : "#d32f2f",
                    }}
                  />
                  <Typography variant="body2" fontWeight={700}>
                    {plan.status}
                  </Typography>
                </Stack>

                <Button
                  fullWidth
                  sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
                  variant="contained"
                  onClick={() => handleOpen(plan)}
                >
                  View / Buy
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>{selectedPlan?.planName}</DialogTitle>

        <DialogContent dividers>
          {selectedPlan && (
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="primary">
                    ₹{selectedPlan.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Total Plan Price</Typography>
                </Box>
                <Chip label={selectedPlan.status} color="success" variant="filled" />
              </Box>

              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography variant="body2" color="text.secondary">BV Points</Typography>
                  <Typography fontWeight={600}>{selectedPlan.BV}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">DP Amount</Typography>
                  <Typography fontWeight={600}>₹{selectedPlan.dp_amount}</Typography>
                </Box>
              </Stack>

              <Divider />

              {hasPurchasedBefore && (
                <FormControl fullWidth>
                  <InputLabel>Purchase Type</InputLabel>
                  <Select
                    value={purchaseType}
                    label="Purchase Type"
                    onChange={(e) => setPurchaseType(e.target.value as PurchaseType)}
                  >
                    <MenuItem value="REPURCHASE">Re Purchase</MenuItem>
                    <MenuItem value="SHARE_PURCHASE">Share Purchase</MenuItem>
                  </Select>
                </FormControl>
              )}

              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentType}
                  label="Payment Method"
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value="UPI">UPI Transfer</MenuItem>
                  <MenuItem value="Bank">Bank Account</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 2, textAlign: "center" }}>
                <Typography variant="subtitle2" mb={1} fontWeight={700}>
                  Scan QR to Pay
                </Typography>

                <Box
                  component="img"
                  src="https://static.vecteezy.com/system/resources/previews/017/441/744/original/qr-code-icon-qr-code-sample-for-smartphone-scanning-isolated-illustration-vector.jpg"
                  alt="Payment QR"
                  sx={{
                    width: 180,
                    height: 180,
                    mx: "auto",
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Button component="label" variant="outlined" fullWidth sx={{ py: 1.5, borderStyle: 'dashed' }}>
                {uploading ? "Processing Image..." : proofUrl ? "Change Proof" : "Upload Payment Receipt"}
                <input hidden type="file" onChange={handleProofUpload} />
              </Button>

              {proofUrl && (
                <Box sx={{ position: 'relative' }}>
                  <Typography variant="caption" display="block" mb={0.5} color="success.main">✔ Uploaded Successfully</Typography>
                  <Box
                    component="img"
                    src={proofUrl}
                    sx={{ width: "100%", height: 150, objectFit: 'cover', borderRadius: 2 }}
                  />
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            size="large"
            disabled={!paymentType || !proofUrl || isPending || (hasPurchasedBefore && !purchaseType)}
            sx={{ px: 4 }}
          >
            {isPending ? "Submitting..." : "Confirm Purchase"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
