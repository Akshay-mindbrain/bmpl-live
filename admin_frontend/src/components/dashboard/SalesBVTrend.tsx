import {
  ChartContainer,
  ChartsSurface,
  LinePlot,
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ChartsAxisHighlight,
  ChartsGrid,
} from "@mui/x-charts";
import { Paper, Typography, Box } from "@mui/material";

const salesData = [300, 280, 220, 350, 420, 380, 250];
const bvData = [270, 330, 200, 220, 300, 310, 220];
const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SalesBVTrend() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Sales & BV Trend (7 Days)
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ff8f1f",
              }}
            />
            <Typography variant="body2" fontSize={12}>
              BV Points
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#6cc04a",
              }}
            />
            <Typography variant="body2" fontSize={12}>
              Sale
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          "& svg g[clip-path]": {
            "& > circle": {
              display: "block !important",
            },
            // Style the green Sales line marker (first series)
            "& .MuiLineElement-root[data-series-id='0']": {
              "& circle": {
                r: 8,
                fill: "#6cc04a",
                stroke: "#fff",
                strokeWidth: 3,
                filter: "drop-shadow(0 0 4px rgba(108, 192, 74, 0.5))",
              },
            },
          },
          // Style the axis highlight to be light blue and dashed
          "& .MuiChartsAxisHighlight-root": {
            "& line": {
              stroke: "#87CEEB !important",
              strokeWidth: "2 !important",
              strokeDasharray: "5 5 !important",
            },
          },
        }}
      >
        <ChartContainer
          width={650}
          height={320}
          series={[
            {
              type: "line",
              data: salesData,
              label: "Sales",
              color: "#6cc04a",
              curve: "natural",
              showMark: true,
            },
            {
              type: "line",
              data: bvData,
              label: "BV Points",
              color: "#ff8f1f",
              curve: "natural",
              showMark: false,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
            },
          ]}
          yAxis={[
            {
              min: 100,
              max: 450,
            },
          ]}
          margin={{ top: 20, right: 30, bottom: 40, left: 50 }}
        >
          <Box
            sx={{
              "& .MuiChartsLegend-series": {
                "& .MuiChartsLegend-line": {
                  display: "none",
                },
                "& .MuiChartsLegend-mark": {
                  display: "block",
                  borderRadius: "50%",
                  width: 12,
                  height: 12,
                },
              },
            }}
          >
            <ChartsLegend
              position={{ vertical: "top", horizontal: "right" }}
              direction="row"
            />
          </Box>

          <ChartsTooltip />

          <ChartsSurface width={650} height={320}>
            <ChartsGrid horizontal />

            <ChartsXAxis />
            <ChartsYAxis />

            <LinePlot strokeWidth={4} />

            <ChartsAxisHighlight x="line" />
          </ChartsSurface>
        </ChartContainer>
      </Box>
    </Paper>
  );
}
