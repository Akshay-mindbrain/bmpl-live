import { Paper, Typography, Box, LinearProgress } from "@mui/material";

interface PackageData {
  name: string;
  current: number;
  total: number;
  color: string;
}

const packages: PackageData[] = [
  { name: "IBO Package", current: 12, total: 45, color: "#2196f3" },
  { name: "Silver Package", current: 28, total: 120, color: "#4caf50" },
  { name: "Gold Package", current: 15, total: 80, color: "#ff9800" },
  { name: "Star Package", current: 8, total: 25, color: "#f44336" },
];

export default function AtCapAgents() {
  return (
    <Paper sx={{ p: 3, height: "100%", width: "100%" }}>
      <Typography variant="h6" fontWeight={600} mb={3}>
        At-Cap Agents
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {packages.map((pkg) => {
          const percentage = (pkg.current / pkg.total) * 100;
          return (
            <Box key={pkg.name}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pkg.current}/{pkg.total}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: pkg.color,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
