import { Box, Typography, Card, Stack, Divider } from "@mui/material";
import { CouponsIcon } from "../../assets/Icons";
import designConfig, { alpha } from "../../config/designConfig";

const Coupons = () => {
  return (
    <Box>
      {/* Balance Section */}
      <Card sx={{
        p: 3,
        background: designConfig.colors.gradients.primary,
        color: designConfig.colors.primary.contrastText,
        borderRadius: designConfig.borderRadius.lg,
        boxShadow: designConfig.shadows.primary,
      }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ bgcolor: alpha(designConfig.colors.primary.contrastText, 0.2), p: 1, borderRadius: designConfig.borderRadius.md }}>
            <CouponsIcon sx={{ color: designConfig.colors.primary.contrastText }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>Available Coupons</Typography>
            <Typography variant="h5" fontWeight={800}>
              5 x ₹100
            </Typography>
          </Box>
        </Stack>

        <Card
          sx={{
            mt: 3,
            bgcolor: designConfig.colors.surfaces.white,
            color: designConfig.colors.primary.main,
            textAlign: "center",
            py: 1.5,
            borderRadius: designConfig.borderRadius.md,
            fontWeight: 700,
            boxShadow: designConfig.shadows.sm
          }}
        >
          Total Value: ₹500
        </Card>
      </Card>

      {/* Info Section */}
      <Box sx={{
        mt: 2,
        p: 2,
        bgcolor: designConfig.colors.info.background,
        borderRadius: designConfig.borderRadius.lg,
        color: designConfig.colors.info.main,
        border: `1px solid ${alpha(designConfig.colors.info.main, 0.1)}`
      }}>
        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
          Coupon Benefits
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
            • Each coupon gives ₹100 instant discount
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
            • Use multiple coupons in a single order
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
            • Received with package purchase
          </Typography>
        </Stack>
      </Box>

      {/* Your Coupons */}
      <Typography variant="subtitle2" fontWeight={800} sx={{ mt: 4, mb: 2, color: designConfig.colors.text.primary, px: 0.5 }}>YOUR COUPONS</Typography>

      <Card sx={{
        borderRadius: designConfig.borderRadius.lg,
        border: `1px solid ${designConfig.colors.background.border}`,
        boxShadow: designConfig.shadows.sm,
        bgcolor: designConfig.colors.surfaces.white,
        overflow: "hidden"
      }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Box key={i} sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={700}>₹100 OFF Coupon</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Valid until Dec 31, 2025
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{
                  bgcolor: alpha(designConfig.colors.success.main, 0.1),
                  color: designConfig.colors.success.main,
                  px: 1,
                  py: 0.5,
                  borderRadius: designConfig.borderRadius.xs,
                  fontWeight: 700
                }}>
                  ACTIVE
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default Coupons;
