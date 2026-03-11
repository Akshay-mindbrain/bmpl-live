import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

interface OrderData {
  orderId: string;
  customer: string;
  amount: string;
  bv: string;
  status: "Completed" | "Shipped" | "Processing" | "Returned";
}

const orders: OrderData[] = [
  {
    orderId: "ORD-1234",
    customer: "Rajesh Kumar",
    amount: "₹2,499",
    bv: "100 ",
    status: "Completed",
  },
  {
    orderId: "ORD-1234",
    customer: "Priya Patel",
    amount: "₹1,850",
    bv: "120 ",
    status: "Shipped",
  },
  {
    orderId: "ORD-1234",
    customer: "Amit Kumar",
    amount: "₹1,599",
    bv: "80 ",
    status: "Processing",
  },
  {
    orderId: "ORD-1234",
    customer: "Sanjay Mehta",
    amount: "₹2,499",
    bv: "200 ",
    status: "Returned",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return { color: "#ffffff", backgroundColor: "#4caf50" };
    case "Shipped":
      return { color: "#ffffff", backgroundColor: "#ff9800" };
    case "Processing":
      return { color: "#ffffff", backgroundColor: "#2196f3" };
    case "Returned":
      return { color: "#ffffff", backgroundColor: "#f44336" };
    default:
      return { color: "#ffffff", backgroundColor: "#757575" };
  }
};

export default function RecentOrders() {
  return (
    <Paper sx={{ p: 3, height: "100%", width: "100%" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Recent Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>BV</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {order.orderId}
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.bv}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      ...getStatusColor(order.status),
                      fontWeight: 500,
                      borderRadius: "8px",
                      width: 110,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 1.5,
                      py: 0.5,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
