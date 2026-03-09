import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

/* ================= TYPES ================= */
type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

/* ================= MOCK DATA ================= */
const initialOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Rahul Sharma",
    amount: 2499,
    status: "Pending",
    date: "22 Feb 2026",
  },
  {
    id: "ORD-1002",
    customer: "Anita Verma",
    amount: 1599,
    status: "Processing",
    date: "23 Feb 2026",
  },
  {
    id: "ORD-1003",
    customer: "Amit Das",
    amount: 3299,
    status: "Delivered",
    date: "20 Feb 2026",
  },
];

/* ================= HELPERS ================= */
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    case "Pending":
      return "warning";
    default:
      return "info";
  }
};

/* ================= COMPONENT ================= */
export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>("Pending");

  /* ================= COUNTS ================= */
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const processingOrders = orders.filter(o => o.status === "Processing").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const cancelledOrders = orders.filter(o => o.status === "Cancelled").length;

  /* ================= ACTIONS ================= */
  const openView = (order: Order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

  const openStatusUpdate = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusOpen(true);
  };

  const saveStatus = () => {
    if (!selectedOrder) return;
    setOrders(prev =>
      prev.map(o =>
        o.id === selectedOrder.id ? { ...o, status: newStatus } : o
      )
    );
    setStatusOpen(false);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId ? { ...o, status: "Cancelled" } : o
      )
    );
  };

  /* ================= UI ================= */
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Order Management
      </Typography>

      {/* ================= SUMMARY CARDS ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(5, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {[
          { label: "Total Orders", value: totalOrders, bg: "#eef2ff", color: "#1e3a8a" },
          { label: "Pending", value: pendingOrders, bg: "#fff7ed", color: "#9a3412" },
          { label: "Processing", value: processingOrders, bg: "#eff6ff", color: "#1d4ed8" },
          { label: "Delivered", value: deliveredOrders, bg: "#ecfdf5", color: "#065f46" },
          { label: "Cancelled", value: cancelledOrders, bg: "#fef2f2", color: "#991b1b" },
        ].map(card => (
          <Card key={card.label} sx={{ bgcolor: card.bg, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight={700} color={card.color}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ================= TABLE ================= */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f9fafb" }}>
                <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>

                {/* ✅ CENTERED HEADER */}
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id} hover sx={{ height: 64 }}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>₹ {order.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      color={getStatusColor(order.status)}
                    />
                  </TableCell>
                  <TableCell>{order.date}</TableCell>

                  {/* ✅ CENTERED BUTTONS */}
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button size="small" variant="outlined" onClick={() => openView(order)}>
                        View
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => openStatusUpdate(order)}
                        disabled={order.status === "Cancelled"}
                      >
                        Update
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        disabled={order.status === "Cancelled"}
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ================= VIEW ORDER ================= */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <Divider />
        <DialogContent>
          {selectedOrder && (
            <Stack spacing={1.2} mt={1}>
              <Typography><b>Order ID:</b> {selectedOrder.id}</Typography>
              <Typography><b>Customer:</b> {selectedOrder.customer}</Typography>
              <Typography><b>Amount:</b> ₹ {selectedOrder.amount}</Typography>
              <Typography><b>Status:</b> {selectedOrder.status}</Typography>
              <Typography><b>Date:</b> {selectedOrder.date}</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= UPDATE STATUS ================= */}
      <Dialog open={statusOpen} onClose={() => setStatusOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Update Order Status</DialogTitle>
        <Divider />
        <DialogContent sx={{ mt: 2 }}>
          <Select
            fullWidth
            value={newStatus}
            onChange={e => setNewStatus(e.target.value as OrderStatus)}
          >
            {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveStatus}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}