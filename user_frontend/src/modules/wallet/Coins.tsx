import { Box, Typography, Card, Stack, Divider } from "@mui/material";
import { CoinIcon } from "../../assets/Icons";
import designConfig, { alpha } from "../../config/designConfig";

const Coins = () => {
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
        <Stack direction="row" alignItems="center" spacing={2} >
          <Box sx={{ bgcolor: alpha(designConfig.colors.primary.contrastText, 0.2), p: 1, borderRadius: designConfig.borderRadius.md }}>
            <CoinIcon sx={{ color: designConfig.colors.primary.contrastText }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>Available Coins</Typography>
            <Typography variant="h5" fontWeight={800}>
              150 Coins
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
          Next Credit: Nov 1, 2025 - 50 Coins
        </Card>
      </Card>

      {/* About Section */}
      <Box sx={{
        mt: 2,
        p: 2,
        bgcolor: designConfig.colors.info.background,
        borderRadius: designConfig.borderRadius.lg,
        color: designConfig.colors.info.main,
        border: `1px solid ${alpha(designConfig.colors.info.main, 0.1)}`
      }}>
        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
          About Coins
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
            • Get 50 coins every month with your package
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
            • Use coins during checkout for instant discounts
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
            • 1 Coin = ₹1 discount on purchases
          </Typography>
        </Stack>
      </Box>

      {/* Recent Transactions */}
      <Typography variant="subtitle2" fontWeight={800} sx={{ mt: 4, mb: 2, color: designConfig.colors.text.primary, px: 0.5 }}>RECENT ACTIVITY</Typography>

      <Card sx={{
        borderRadius: designConfig.borderRadius.lg,
        border: `1px solid ${designConfig.colors.background.border}`,
        boxShadow: designConfig.shadows.sm,
        bgcolor: designConfig.colors.surfaces.white,
        overflow: "hidden"
      }}>
        <Stack divider={<Divider />}>
          {/* Item 1 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <CoinIcon sx={{ color: designConfig.colors.success.main, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>Monthly Package Coins</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 08, 2025</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.success.main}>+50</Typography>
          </Stack>

          {/* Item 2 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.error.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <CoinIcon sx={{ color: designConfig.colors.error.main, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>Used in Order #ORD87654</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 05, 2025</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.error.main}>-25</Typography>
          </Stack>

          {/* Item 3 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.success.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <CoinIcon sx={{ color: designConfig.colors.success.main, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>Monthly Package Coins</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 05, 2025</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.success.main}>+50</Typography>
          </Stack>

          {/* Item 4 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ bgcolor: designConfig.colors.error.background, p: 1, borderRadius: designConfig.borderRadius.sm }}>
                <CoinIcon sx={{ color: designConfig.colors.error.main, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>Used in Order #ORD87654</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Oct 05, 2025</Typography>
              </Box>
            </Stack>
            <Typography fontWeight={800} color={designConfig.colors.error.main}>-25</Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default Coins;
