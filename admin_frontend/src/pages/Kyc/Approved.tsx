import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
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
import { useApprovedKyc } from "../../hooks/Kyc/useApprovedKyc";

type KycStatus = "PENDING" | "APPROVED" | "REJECTED";

interface ApprovedKyc {
  id: number;
  userId: number;
  aadharNo: string;
  aadharImgUrl: string;
  panNo: string;
  panImageUrl: string;
  status: KycStatus;
}

const Approved = () => {
  const [page, setPage] = useState(0); // MUI page (0-based)
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Backend expects 1-based page
  const { data, isLoading } = useApprovedKyc(page + 1, rowsPerPage);

  const approvedUsers: ApprovedKyc[] = data?.data ?? [];
  const total = data?.total ?? 0;

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Approved KYC Users ({total})
      </Typography>

      <Paper sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ecfdf5" }}>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Aadhaar No</b></TableCell>
                <TableCell><b>Aadhaar</b></TableCell>
                <TableCell><b>PAN No</b></TableCell>
                <TableCell><b>PAN</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : approvedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Approved Users
                  </TableCell>
                </TableRow>
              ) : (
                approvedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.userId}</TableCell>

                    <TableCell>{user.aadharNo}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => window.open(user.aadharImgUrl, "_blank")}
                      >
                        View
                      </Button>
                    </TableCell>

                    <TableCell>{user.panNo}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => window.open(user.panImageUrl, "_blank")}
                      >
                        View
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography color="success.main" fontWeight={600}>
                          Approved
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ✅ PAGINATION */}
        <TablePagination
          component="div"
          count={total}        // ✅ total = 8
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default Approved;