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
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

/* ================= TYPES ================= */
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: StockStatus;
}

/* ================= MOCK DATA ================= */
const initialInventory: InventoryItem[] = [
  {
    id: "PRD-101",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    quantity: 120,
    status: "In Stock",
  },
  {
    id: "PRD-102",
    name: "Laptop Backpack",
    category: "Accessories",
    price: 1499,
    quantity: 18,
    status: "Low Stock",
  },
  {
    id: "PRD-103",
    name: "Bluetooth Headphones",
    category: "Electronics",
    price: 2999,
    quantity: 0,
    status: "Out of Stock",
  },
];

/* ================= HELPERS ================= */
const getStockColor = (status: StockStatus) => {
  switch (status) {
    case "In Stock":
      return "success";
    case "Low Stock":
      return "warning";
    default:
      return "error";
  }
};

/* ================= COMPONENT ================= */
function InventoryManagement() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [newQty, setNewQty] = useState(0);

  /* ================= ACTIONS ================= */
  const openView = (item: InventoryItem) => {
    setSelectedItem(item);
    setViewOpen(true);
  };

  const openUpdate = (item: InventoryItem) => {
    setSelectedItem(item);
    setNewQty(item.quantity);
    setUpdateOpen(true);
  };

  const updateStock = () => {
    if (!selectedItem) return;

    const status: StockStatus =
      newQty === 0 ? "Out of Stock" : newQty < 20 ? "Low Stock" : "In Stock";

    setItems(prev =>
      prev.map(i =>
        i.id === selectedItem.id
          ? { ...i, quantity: newQty, status }
          : i
      )
    );
    setUpdateOpen(false);
  };

  /* ================= UI ================= */
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Inventory Management
      </Typography>

      {/* ================= SUMMARY CARDS ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {[
          { label: "Total Products", value: items.length, color: "#1e3a8a", bg: "#eef2ff" },
          { label: "In Stock", value: items.filter(i => i.status === "In Stock").length, color: "#065f46", bg: "#ecfdf5" },
          { label: "Low Stock", value: items.filter(i => i.status === "Low Stock").length, color: "#9a3412", bg: "#fff7ed" },
          { label: "Out of Stock", value: items.filter(i => i.status === "Out of Stock").length, color: "#991b1b", bg: "#fef2f2" },
        ].map((card, idx) => (
          <Card key={idx} sx={{ bgcolor: card.bg, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2">{card.label}</Typography>
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
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                <TableCell>Product ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map(item => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹ {item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.status}
                      color={getStockColor(item.status)}
                    />
                  </TableCell>

                  {/* ✅ CENTERED ACTIONS */}
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 80, textTransform: "none", borderRadius: 2 }}
                        onClick={() => openView(item)}
                      >
                        View
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        sx={{ minWidth: 90, textTransform: "none", borderRadius: 2 }}
                        onClick={() => openUpdate(item)}
                      >
                        Update
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ================= VIEW ITEM ================= */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} fullWidth>
        <DialogTitle>Product Details</DialogTitle>
        <Divider />
        <DialogContent>
          {selectedItem && (
            <Stack spacing={1.2} mt={1}>
              <Typography><b>ID:</b> {selectedItem.id}</Typography>
              <Typography><b>Name:</b> {selectedItem.name}</Typography>
              <Typography><b>Category:</b> {selectedItem.category}</Typography>
              <Typography><b>Price:</b> ₹ {selectedItem.price}</Typography>
              <Typography><b>Quantity:</b> {selectedItem.quantity}</Typography>
              <Typography><b>Status:</b> {selectedItem.status}</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= UPDATE STOCK ================= */}
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Update Stock</DialogTitle>
        <Divider />
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={newQty}
            onChange={e => setNewQty(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={updateStock}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default InventoryManagement;