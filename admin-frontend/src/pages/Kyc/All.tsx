import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Chip,
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
import { useAllKyc } from "../../hooks/Kyc/useAllKyc";

type KycStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Kyc {
  id: number;
  userId: number;
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
}

const getStatusChip = (status: KycStatus) => {
  switch (status) {
    case "APPROVED":
      return <Chip label="Approved" color="success" size="small" />;
    case "REJECTED":
      return <Chip label="Rejected" color="error" size="small" />;
    default:
      return <Chip label="Pending" color="warning" size="small" />;
  }
};

function All() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch KYC data from backend
  const { data, isLoading } = useAllKyc(page + 1, rowsPerPage);

  const kycs: Kyc[] = data?.data ?? [];
  // FIX: total count fallback
  const total = data?.total ?? kycs.length;

  return (
    <Box p={4}>
      {/* HEADER */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        All KYC ({total})
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
              <TableCell><b>User ID</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Aadhaar No</b></TableCell>
              <TableCell><b>Aadhaar</b></TableCell>
              <TableCell><b>PAN No</b></TableCell>
              <TableCell><b>PAN</b></TableCell>
              <TableCell><b>Bank</b></TableCell>
              <TableCell><b>Bank Proof</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : kycs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No KYC Found
                </TableCell>
              </TableRow>
            ) : (
              kycs.map((kyc) => (
                <TableRow key={kyc.id} hover>
                  {/* USER ID */}
                  <TableCell>{kyc.userId}</TableCell>

                  {/* STATUS */}
                  <TableCell>{getStatusChip(kyc.status)}</TableCell>

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

                  {/* BANK DETAILS */}
                  <TableCell>
                    <Stack>
                      <Typography fontWeight={600}>
                        {kyc.bankName}
                      </Typography>
                      <Typography variant="caption">
                        {kyc.accountNo}
                      </Typography>
                      <Typography variant="caption">
                        {kyc.ifscCode} · {kyc.branchName}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => window.open(kyc.bankProofImgUrl, "_blank")}
                    >
                      View
                    </Button>
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
    </Box>
  );
}

export default All;
