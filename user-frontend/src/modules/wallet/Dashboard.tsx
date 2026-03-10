import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";
import { useWallet } from "../../hooks/wallet/getWallet";
 
const MyWallets = () => {
  const { data: wallet, isLoading, isError } = useWallet();
 
  if (isLoading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
 
  if (isError)
    return (
      <Box p={5}>
        <Alert severity="error">Failed to fetch wallet</Alert>
      </Box>
    );
 
  if (!wallet)
    return (
      <Box p={5}>
        <Typography>No Wallet Found</Typography>
      </Box>
    );
 
  const availableSuperCoins =
    wallet.super_coins - wallet.used_super_coins;
 
  const dpPercentage =
    (wallet.balance_dp_amount / wallet.total_dp_amount) * 100;
 
  return (
    <Box p={4} sx={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        💰 My Wallet
      </Typography>
 
      {/* 🔥 Main Balance Card */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "#fff",
          p: 3,
        }}
      >
        <Typography variant="subtitle1">
          Available DP Balance
        </Typography>
        <Typography variant="h3" fontWeight={700} mt={1}>
          ₹ {wallet.balance_dp_amount}
        </Typography>
 
        <Box mt={3}>
          <Typography variant="caption">
            Balance Usage
          </Typography>
          <LinearProgress
            variant="determinate"
            value={dpPercentage}
            sx={{
              mt: 1,
              height: 8,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#00e676",
              },
            }}
          />
        </Box>
      </Card>
 
      {/* 💎 Stylish Stats Grid */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Total Income", value: wallet.total_income },
          { label: "Total Withdraw", value: wallet.total_withdraw },
          { label: "Super Coins", value: availableSuperCoins },
          { label: "Matched BV", value: wallet.matched_bv },
        ].map((item, index) => (
          <Grid size={{ xs: 12, md: 3 }} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mt={1}
                >
                  {item.label.includes("Income") ||
                  item.label.includes("Withdraw")
                    ? `₹ ${item.value}`
                    : item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
 
      {/* ⚡ BV Split Section */}
      <Card sx={{ borderRadius: 4, p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Business Volume Overview
        </Typography>
 
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2">
                Left BV
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {wallet.total_left_bv}
              </Typography>
              <Typography variant="caption">
                Carryforward: {wallet.left_carryforward_bv}
              </Typography>
            </Box>
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2">
                Right BV
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {wallet.total_right_bv}
              </Typography>
              <Typography variant="caption">
                Carryforward: {wallet.right_carryforward_bv}
              </Typography>
            </Box>
          </Grid>
        </Grid>
 
        <Divider sx={{ my: 3 }} />
 
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">
            Status:
          </Typography>
          <Chip
            label={wallet.status}
            color={
              wallet.status === "ACTIVE" ? "success" : "error"
            }
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Card>
    </Box>
  );
};
 
export default MyWallets;
