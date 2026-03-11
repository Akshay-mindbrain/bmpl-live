import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { usePendingKyc } from "../../hooks/Kyc/usePendingKyc";
import { useUpdateKycStatus } from "../../hooks/Kyc/useUpdateKycStatus";

export default function PendingKYCApprovals() {
  const { data, isLoading, isError } = usePendingKyc(1, 20);
  const { mutate, isPending } = useUpdateKycStatus();

  const handleApprove = (id: number) => {
    mutate({
      id,
      action: "APPROVE",
    });
  };

  const handleReject = (id: number) => {
    mutate({
      id,
      action: "REJECT",
      remark: "Rejected by admin",
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography color="error">Failed to load KYC</Typography>;
  }

  const kycData = data?.data || [];

  return (
    <Paper sx={{ p: 3, width: "100%" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Pending KYC Approvals
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Aadhar No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>PAN No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Bank</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {kycData.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.aadharNo}</TableCell>
                <TableCell>{row.panNo}</TableCell>
                <TableCell>{row.bankName}</TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isPending}
                      onClick={() => handleApprove(row.id)}
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
                      disabled={isPending}
                      onClick={() => handleReject(row.id)}
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

            {kycData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No pending KYC found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}