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
  Box,
} from "@mui/material";

interface KYCData {
  name: string;
  package: string;
  submitted: string;
}

const kycData: KYCData[] = [
  { name: "Ramesh Gupta", package: "Silver", submitted: "2024-10-20" },
  { name: "Priya Patel", package: "IBO", submitted: "2024-10-27" },
  { name: "Amit Kumar", package: "Gold", submitted: "2024-10-26" },
  { name: "Sanjay Mehta", package: "Silver", submitted: "2024-10-28" },
];

export default function PendingKYCApprovals() {
  const handleApprove = (name: string) => {
    console.log(`Approving KYC for ${name}`);
    // Add your approve logic here
  };

  const handleReject = (name: string) => {
    console.log(`Rejecting KYC for ${name}`);
    // Add your reject logic here
  };

  return (
    <Paper sx={{ p: 3, height: "100%", width: "100%" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Pending KYC Approvals
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Package</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kycData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.package}</TableCell>
                <TableCell>{row.submitted}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleApprove(row.name)}
                      sx={{
                        backgroundColor: "#4caf50",
                        "&:hover": { backgroundColor: "#45a049" },
                        minWidth: 90,
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleReject(row.name)}
                      sx={{
                        backgroundColor: "#f44336",
                        "&:hover": { backgroundColor: "#da190b" },
                        minWidth: 90,
                      }}
                    >
                      Reject
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
