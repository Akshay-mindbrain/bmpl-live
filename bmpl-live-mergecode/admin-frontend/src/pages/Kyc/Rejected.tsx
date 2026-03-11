import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Import your hook
import { useRejectedKyc } from "../../hooks/Kyc/useRejectedKyc";

type KycStatus = "PENDING" | "APPROVED" | "REJECT" | "REJECTED";

interface RejectedKyc {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  memberId: string;
  aadharNo: string;
  aadharImgUrl: string;
  panNo: string;
  panImageUrl: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branchName: string;
  bankProofImgUrl: string;
  status: KycStatus;
  rejectReason: string | null;
}

export default function Rejected() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch Rejected KYC from API
  const { data, isLoading } = useRejectedKyc(page + 1, rowsPerPage);

  const rejectedKycs: RejectedKyc[] = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Rejected KYC Requests ({total})
      </Typography>

      <Paper sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fef2f2" }}>
                <TableCell><b>User</b></TableCell>
                <TableCell><b>Aadhaar No</b></TableCell>
                <TableCell><b>Aadhaar Copy</b></TableCell>
                <TableCell><b>PAN No</b></TableCell>
                <TableCell><b>PAN Copy</b></TableCell>
                <TableCell><b>Rejected Reason</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : rejectedKycs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Rejected Records
                  </TableCell>
                </TableRow>
              ) : (
                rejectedKycs.map((kyc) => (
                  <TableRow key={kyc.id} hover>
                    {/* USER */}
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: "#fee2e2" }}>
                          <PersonIcon sx={{ color: "#991b1b" }} />
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600}>
                            {kyc.userName || `User ${kyc.userId}`}
                          </Typography>
                          <Typography variant="body2">
                            {kyc.userEmail || "No email"}
                          </Typography>
                          <Typography variant="caption">
                            ID: {kyc.memberId || kyc.userId}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* AADHAAR */}
                    <TableCell>{kyc.aadharNo}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => window.open(kyc.aadharImgUrl, "_blank")}
                      >
                        View
                      </Button>
                    </TableCell>

                    {/* PAN */}
                    <TableCell>{kyc.panNo}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => window.open(kyc.panImageUrl, "_blank")}
                      >
                        View
                      </Button>
                    </TableCell>

                    {/* REJECT REASON */}
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CancelIcon color="error" fontSize="small" />
                        <Typography color="error.main" fontWeight={500}>
                          {kyc.rejectReason || "No reason provided"}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
}
