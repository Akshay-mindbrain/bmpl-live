import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllIncome } from "../../hooks/Income/useAllIncome";

function Allincome() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isError } = useAllIncome(page + 1, rowsPerPage);

  // ✅ Extract correctly from backend response
  const incomeList = data?.data?.data ?? [];
  const totalCount = data?.data?.total ?? 0;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load income data
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        All Income (Date Wise)
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>Sl No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Income (₹)</TableCell>
              <TableCell>TDS (₹)</TableCell>
              <TableCell>Admin Charges (₹)</TableCell>
              <TableCell>Net Income (₹)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {incomeList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No income records found
                </TableCell>
              </TableRow>
            ) : (
              incomeList.map((row: any, index: number) => {
                const totalIncome = Number(row.totalIncome);
                const tds = Number(row.tds);
                const adminCharges = Number(row.adminCharges);
                const netIncome = Number(row.netincome);

                return (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell>
                      {new Date(row.generatedDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{totalIncome.toLocaleString()}</TableCell>
                    <TableCell>{tds.toLocaleString()}</TableCell>
                    <TableCell>{adminCharges.toLocaleString()}</TableCell>

                    <TableCell>
                      <b>{netIncome.toLocaleString()}</b>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(
                            `/date-wise-income/${row.generatedDate}`
                          )
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
}

export default Allincome;