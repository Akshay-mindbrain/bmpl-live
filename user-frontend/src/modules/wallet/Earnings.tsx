import {
  Box, Typography, Card, Stack, Button, Dialog, DialogContent,
  TextField, Divider
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useState } from "react";
import { WalletIcon, ArrowUpIcon, ArrowDownIcon } from "../../assets/Icons";
import designConfig, { alpha } from "../../config/designConfig";

const Earnings = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <Box>
      {/* Balance Section */}
      <Card sx={{
        p: 3,
        background: designConfig.colors.gradients.primary,
        color: designConfig.colors.primary.contrastText,
        borderRadius: designConfig.borderRadius.lg,
        boxShadow: designConfig.shadows.primary,
        position: "relative",
        overflow: "hidden"
      }}>
        <Box sx={{ position: "absolute", top: -20, right: -20, opacity: 0.1, transform: "rotate(15deg)" }}>
          <WalletIcon size={120} color="white" />
        </Box>

        <Stack direction="row" alignItems="center" spacing={2} mb={0.5}>
          <Box sx={{ bgcolor: alpha(designConfig.colors.primary.contrastText, 0.2), p: 1, borderRadius: designConfig.borderRadius.md }}>
            <AccountBalanceWalletIcon sx={{ color: designConfig.colors.primary.contrastText }} />
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>Available Withdrawal Balance</Typography>
        </Stack>

        <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
          ₹10,100
        </Typography>

        <Button
          onClick={() => setOpen(true)}
          fullWidth
          sx={{
            bgcolor: designConfig.colors.surfaces.white,
            color: designConfig.colors.primary.main,
            py: 1.5,
            borderRadius: designConfig.borderRadius.md,
            fontWeight: 800,
            textTransform: "none",
            boxShadow: designConfig.shadows.sm,
            "&:hover": {
              bgcolor: alpha(designConfig.colors.surfaces.white, 0.9),
              transform: "translateY(-2px)"
            },
            transition: designConfig.transitions.default
          }}
        >
          Withdraw to Bank Account
        </Button>
      </Card>

      {/* Next payout info */}
      <Box
        sx={{
          bgcolor: designConfig.colors.info.background,
          p: 2,
          mt: 3,
          borderRadius: designConfig.borderRadius.lg,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          border: `1px solid ${alpha(designConfig.colors.info.main, 0.1)}`
        }}
      >
        <Typography variant="caption" sx={{ color: designConfig.colors.info.main, fontWeight: 700, lineHeight: 1.3 }}>
          Note: Withdrawals are processed weekly every Friday. Next processing date: Friday, Oct 11
        </Typography>
      </Box>

      <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 4, mb: 2, color: designConfig.colors.text.primary }}>
        Recent Transactions
      </Typography>

      <Card sx={{
        borderRadius: designConfig.borderRadius.lg,
        border: `1px solid ${designConfig.colors.background.border}`,
        boxShadow: designConfig.shadows.sm,
        bgcolor: designConfig.colors.surfaces.white,
        overflow: "hidden"
      }}>
        <Stack divider={<Divider />}>
          {/* Row 1 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <ArrowUpIcon color={designConfig.colors.success.main} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700} color={designConfig.colors.text.primary}>Weekly Payout Dispersed</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 08, 2025 • Week 40</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.success.main}>+₹2,805</Typography>
          </Stack>

          {/* Row 2 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.error.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <ArrowDownIcon color={designConfig.colors.error.main} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700} color={designConfig.colors.text.primary}>Withdrawal Request</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 05, 2025 • UTR: 812234</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.error.main}>-₹3,000</Typography>
          </Stack>
        </Stack>
      </Card>


      {/* ------------------------WITHDRAW MODAL------------------------- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: designConfig.borderRadius.lg,
            p: 2,
            textAlign: "center",
            bgcolor: designConfig.colors.surfaces.white
          }
        }}
      >
        <DialogContent>
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: designConfig.colors.background.light,
              borderRadius: designConfig.borderRadius.lg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              border: `1px solid ${designConfig.colors.background.border}`
            }}
          >
            <AccountBalanceWalletIcon sx={{ fontSize: 32, color: designConfig.colors.primary.main }} />
          </Box>
          <Typography variant="h6" fontWeight={800} gutterBottom color={designConfig.colors.text.primary}>
            Withdraw Funds
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4} fontWeight={500}>
            The amount will be transferred to your registered bank account.
          </Typography>

          <Box textAlign="left" mb={2}>
            <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: "block", color: designConfig.colors.text.secondary }}>ENTER AMOUNT (₹)</Typography>
            <TextField
              fullWidth
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: designConfig.borderRadius.md,
                  bgcolor: designConfig.colors.background.light,
                  fontWeight: 700,
                  '& fieldset': { borderColor: designConfig.colors.background.border }
                }
              }}
            />
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Typography variant="caption" color="text.secondary">Min: ₹500</Typography>
              <Typography variant="caption" color="text.secondary">Max: ₹12,450</Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              fullWidth
              onClick={() => setOpen(false)}
              sx={{
                color: designConfig.colors.text.secondary,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: designConfig.borderRadius.md,
                py: 1.5
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: designConfig.colors.primary.main,
                color: designConfig.colors.primary.contrastText,
                borderRadius: designConfig.borderRadius.md,
                fontWeight: 800,
                textTransform: 'none',
                py: 1.5,
                boxShadow: designConfig.shadows.primary,
                "&:hover": { bgcolor: designConfig.colors.primary.dark }
              }}
            >
              Withdraw Now
            </Button>
          </Stack>

        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default Earnings;
