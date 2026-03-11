import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { usePayoutHistory } from "../../hooks/payout/usePayoutHistory";

function PayoutHistoryByDate() {
  const { date } = useParams(); // payoutDate from route
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  // 🔹 fetch ALL payout history (paginated)
  const { data, isLoading } = usePayoutHistory(page, limit);

  // 🔹 backend response shape
  const historyData = data?.data?.data || [];
  const totalPages = data?.data?.totalpage || 1;

  // 🔹 filter by selected date
  const filteredPayouts = useMemo(() => {
    if (!date) return [];

    const selectedDate = new Date(date).toDateString();

    return historyData.filter((item: any) => {
      return (
        new Date(item.payoutDate).toDateString() === selectedDate
      );
    });
  }, [historyData, date]);

  return (
    <Box p={4}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Typography variant="h6" fontWeight={600}>
          Payout History –{" "}
          {date ? new Date(date).toLocaleDateString() : ""}
        </Typography>
      </Stack>

      {/* LOADING */}
      {isLoading && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Loading payout history...</Typography>
        </Paper>
      )}

      {/* EMPTY STATE */}
      {!isLoading && filteredPayouts.length === 0 && (
        <Paper sx={{ p: 6 }}>
          <Typography>
            No payouts found for this date.
          </Typography>
        </Paper>
      )}

      {/* TABLE */}
      {!isLoading && filteredPayouts.length > 0 && (
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
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPayouts.map((row: any, index: number) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}

export default PayoutHistoryByDate;