import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { Download } from "@mui/icons-material";

interface PayoutData {
  payoutId: string;
  period: string;
  totalAmount: string;
  agents: number;
  status: string;
}

const payoutData: PayoutData[] = [
  {
    payoutId: "#PO-1023",
    period: "1 Nov - 7 Nov",
    totalAmount: "₹1,24,580",
    agents: 248,
    status: "Completed",
  },
  {
    payoutId: "#PO-1023",
    period: "1 Nov - 7 Nov",
    totalAmount: "₹1,24,580",
    agents: 248,
    status: "Completed",
  },
  {
    payoutId: "#PO-1023",
    period: "1 Nov - 7 Nov",
    totalAmount: "₹1,24,580",
    agents: 248,
    status: "Completed",
  },
  {
    payoutId: "#PO-1023",
    period: "1 Nov - 7 Nov",
    totalAmount: "₹1,24,580",
    agents: 248,
    status: "Completed",
  },
];

export default function PayoutStatus() {
  const handleDownloadStatement = (payoutId: string) => {
    console.log(`Downloading statement for ${payoutId}`);
    // Add your download logic here
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Payout Status
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Payout ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Period</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Agents</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payoutData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.payoutId}</TableCell>
                <TableCell>{row.period}</TableCell>
                <TableCell>{row.totalAmount}</TableCell>
                <TableCell>{row.agents}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#70BF45",
                      fontWeight: 500,
                      borderRadius: "6px",
                      fontFamily: "sans-serif",
                      minWidth: "80px",
                      height: "28px",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Download />}
                    onClick={() => handleDownloadStatement(row.payoutId)}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Statement
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
