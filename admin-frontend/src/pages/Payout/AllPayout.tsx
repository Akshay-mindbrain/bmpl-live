import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { useGeneratePayout } from "../../hooks/payout/useGeneratePayout";
import { usePayout } from "../../hooks/payout/usePayout";

function AllPayout() {
  const navigate = useNavigate();

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // local ui state
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // hooks
  const generatePayout = useGeneratePayout();
  const payoutQuery = usePayout(page, limit);

  // backend response
  const payouts = payoutQuery.data?.data?.data || [];
  const totalPages = payoutQuery.data?.data?.totalpage || 1;

  // manage loading
  useEffect(() => {
    if (payoutQuery.data || payoutQuery.error) {
      setLoading(false);
    }
  }, [payoutQuery.data, payoutQuery.error]);

  // generate payout
  const handleGeneratePayout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await generatePayout.mutateAsync();
      setSuccess(res.message || "Payout generated successfully");
      await payoutQuery.refetch();
    } catch (err: any) {
      setError(err.message || "Payout generation failed");
    } finally {
      setLoading(false);
    }
  };

  // download excel
  const handleDownloadExcel = () => {
    const excelData = payouts.map((row: any, index: number) => ({
      "Sl No": index + 1,
      "Payout Date": new Date(row.payoutDate).toLocaleDateString(),
      "Payout Cycle": row.payoutCycle,
      "Total Amount": row.totalAmount,
      TDS: row.tds,
      "Admin Charges": row.adminCharges,
      "Net Amount": row.netAmount,
      Status: row.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payouts");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    saveAs(
      new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `payout_${Date.now()}.xlsx`
    );
  };

  return (
    <Box p={4}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          All Payouts
        </Typography>

        <Button
          variant="contained"
          onClick={handleGeneratePayout}
          disabled={loading}
        >
          Generate Payout
        </Button>
      </Stack>

      {/* LOADING */}
      {loading && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Processing payout...</Typography>
        </Paper>
      )}

      {/* EMPTY STATE */}
      {!loading && payouts.length === 0 && (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            border: "2px dashed #1976d2",
            background: "#f5faff",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            No Payout Generated
          </Typography>
          <Typography mt={1} mb={3} color="text.secondary">
            Click on <b>Generate Payout</b> to generate payout.
          </Typography>
          <Button variant="contained" onClick={handleGeneratePayout}>
            Generate Payout
          </Button>
        </Paper>
      )}

      {/* TABLE */}
      {!loading && payouts.length > 0 && (
        <>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl No</TableCell>
                    <TableCell>Payout Date</TableCell>
                    <TableCell>Cycle</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>TDS</TableCell>
                    <TableCell>Admin Charges</TableCell>
                    <TableCell>Net Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {payouts.map((row: any, index: number) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {new Date(row.payoutDate).toLocaleString()}
                      </TableCell>
                      <TableCell>{row.payoutCycle}</TableCell>
                      <TableCell>₹{row.totalAmount}</TableCell>
                      <TableCell>₹{row.tds}</TableCell>
                      <TableCell>₹{row.adminCharges}</TableCell>
                      <TableCell>₹{row.netAmount}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={
                            row.status === "ACTIVE"
                              ? "success"
                              : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            onClick={() =>
                              navigate(
                                `/admin/payout/history/${row.payoutDate}`
                              )
                            }
                          >
                            View
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownloadExcel}
                          >
                            Download
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Stack alignItems="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}

      {/* SUCCESS */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      {/* ERROR */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}

export default AllPayout;