import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";

// Import your existing hooks
import { usePendingKyc } from "../../hooks/Kyc/usePendingKyc";
import { useUpdateKycStatus } from "../../hooks/Kyc/useUpdateKycStatus";
import { toast } from "sonner";


export default function Pending() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  // FETCH PENDING KYC
  const { data, isLoading } = usePendingKyc(page + 1, rowsPerPage);
  const pendingKycs = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;

  // MUTATION FOR APPROVE / REJECT
  const updateKycStatusMutation = useUpdateKycStatus();

  const handleApprove = (id: number) => {
    updateKycStatusMutation.mutate(
      { id, action: "APPROVE" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["pendingKyc", page + 1, rowsPerPage] });
          toast.success("KYC approved");
        },
      }
    );
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim() || !selectedId) return;

    updateKycStatusMutation.mutate(
      { id: selectedId, action: "REJECT", remark: rejectReason },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["pendingKyc", page + 1, rowsPerPage] });
          toast.success("KYC rejected");
        },
      }
    );

    setRejectOpen(false);
    setRejectReason("");
    setSelectedId(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Pending KYC Requests ({total})
      </Typography>

      <Paper sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                <TableCell><b>Action</b></TableCell>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Aadhaar No</b></TableCell>
                <TableCell><b>Aadhaar Copy</b></TableCell>
                <TableCell><b>PAN No</b></TableCell>
                <TableCell><b>PAN Copy</b></TableCell>
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
              ) : pendingKycs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Pending Requests
                  </TableCell>
                </TableRow>
              ) : (
                pendingKycs.map((kyc:any) => (
                  <TableRow key={kyc.id} hover>
                    {/* ACTION */}
                    <TableCell>
                      <Stack direction="column" spacing={1}>
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleApprove(kyc.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          startIcon={<CancelIcon />}
                          onClick={() => {
                            setSelectedId(kyc.id);
                            setRejectOpen(true);
                          }}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>

                    {/* USER ID */}
                    <TableCell>{kyc.userId}</TableCell>

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

                    {/* BANK */}
                    <TableCell>
                      <Stack>
                        <Typography fontWeight={600}>{kyc.bankName}</Typography>
                        <Typography variant="caption">{kyc.accountNo}</Typography>
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
      </Paper>

      {/* REJECT DIALOG */}
      <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} fullWidth>
        <DialogTitle>Reject Reason</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for rejection"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            disabled={!rejectReason.trim()}
            onClick={handleRejectConfirm}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
