import { Box, Typography, Card, Stack, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartIcon, ArrowUpIcon, ArrowDownIcon } from "../../assets/Icons";
import designConfig, { alpha } from "../../config/designConfig";

const Repurchase = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Balance Card */}
      <Card sx={{
        p: 3,
        background: designConfig.colors.gradients.primary,
        color: designConfig.colors.primary.contrastText,
        borderRadius: designConfig.borderRadius.lg,
        boxShadow: designConfig.shadows.primary,
        position: "relative",
        overflow: "hidden"
      }}>
        <Box sx={{ position: "absolute", top: -15, right: -15, opacity: 0.12, transform: "rotate(5deg)" }}>
          <CartIcon sx={{ fontSize: 100, color: designConfig.colors.primary.contrastText }} />
        </Box>

        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
          <Box sx={{ bgcolor: alpha(designConfig.colors.primary.contrastText, 0.2), p: 1, borderRadius: designConfig.borderRadius.md }}>
            <CartIcon sx={{ color: designConfig.colors.primary.contrastText }} />
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>Shopping Credits</Typography>
        </Stack>

        <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
          ₹500
        </Typography>

        <Button
          onClick={() => navigate('/shop')}
          fullWidth
          sx={{
            bgcolor: designConfig.colors.surfaces.white,
            color: designConfig.colors.primary.main,
            py: 1.5,
            borderRadius: designConfig.borderRadius.md,
            fontWeight: 800,
            textTransform: "none",
            boxShadow: designConfig.shadows.sm,
            "&:hover": { bgcolor: alpha(designConfig.colors.surfaces.white, 0.9) }
          }}
        >
          Go to Shop
        </Button>
      </Card>

      {/* Info Section */}
      <Box sx={{
        mt: 3,
        p: 2.5,
        bgcolor: designConfig.colors.info.background,
        borderRadius: designConfig.borderRadius.lg,
        color: designConfig.colors.info.main,
        border: `1px solid ${alpha(designConfig.colors.info.main, 0.1)}`
      }}>
        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: designConfig.colors.info.main }}>How it works?</Typography>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ display: "flex", alignItems: "flex-start", gap: 1, fontWeight: 600, opacity: 0.8 }}>
            <span>•</span> 10% of every income payout is automatically reserved for shopping.
          </Typography>
          <Typography variant="caption" sx={{ display: "flex", alignItems: "flex-start", gap: 1, fontWeight: 600, opacity: 0.8 }}>
            <span>•</span> Use this balance to pay for products and save your bank money.
          </Typography>
          <Typography variant="caption" sx={{ display: "flex", alignItems: "flex-start", gap: 1, fontWeight: 600, opacity: 0.8 }}>
            <span>•</span> Repurchase balance is valid for life and non-withdrawable.
          </Typography>
        </Stack>
      </Box>

      <Typography variant="subtitle2" fontWeight={800} sx={{ mt: 4, mb: 2, color: designConfig.colors.text.primary, px: 0.5 }}>RECENT ACTIVITY</Typography>

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
                <ArrowUpIcon sx={{ color: designConfig.colors.success.main, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>System Auto-Credit (10%)</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 08, 2025</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.success.main}>+₹280</Typography>
          </Stack>

          {/* Row 2 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.error.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <ArrowDownIcon sx={{ color: designConfig.colors.error.main, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>Spent on #ORD12345</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 05, 2025</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.error.main}>-₹350</Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default Repurchase;
