import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useState } from "react";

/* ================= TYPES ================= */

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  dp: number;
  mrp: number;
  stock: number;
  bv: number;
  status: "Active" | "Inactive";
  description: string;
  images: string[];
}

/* ================= COMPONENT ================= */

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const [form, setForm] = useState<any>({
    name: "",
    sku: "",
    category: "",
    dp: "",
    mrp: "",
    stock: "",
    bv: "",
    description: "",
    status: "Active",
    images: [],
  });

  /* ================= IMAGE UPLOAD ================= */

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setForm((prev: any) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  /* ================= SAVE PRODUCT ================= */

  const saveProduct = () => {
    const newProduct: Product = {
      id: editingId ?? Date.now(),
      name: form.name,
      sku: form.sku,
      category: form.category,
      dp: Number(form.dp),
      mrp: Number(form.mrp),
      stock: Number(form.stock),
      bv: Number(form.bv),
      status: form.status,
      description: form.description,
      images: form.images,
    };

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? newProduct : p))
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }

    resetForm();
  };

  /* ================= EDIT ================= */

  const editProduct = (p: Product) => {
    setEditingId(p.id);
    setForm({ ...p });
    setOpenForm(true);
  };

  /* ================= VIEW ================= */

  const viewProduct = (p: Product) => {
    setSelectedProduct(p);
    setImageIndex(0);
    setOpenView(true);
  };

  /* ================= DELETE ================= */

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setForm({
      name: "",
      sku: "",
      category: "",
      dp: "",
      mrp: "",
      stock: "",
      bv: "",
      description: "",
      status: "Active",
      images: [],
    });

    setEditingId(null);
    setOpenForm(false);
  };

  /* ================= UI ================= */

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Product Management
      </Typography>

      {/* ================= TABLE ================= */}

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>

          {/* HEADER */}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Products</Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenForm(true)}
            >
              Add Product
            </Button>
          </Stack>

          {/* TABLE */}

          <Table>

            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>DP</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>MRP</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>BV</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} hover>

                  {/* PRODUCT */}

                  <TableCell>
                    <Stack alignItems="center" spacing={1}>
                      <Avatar
                        src={p.images[0]}
                        variant="rounded"
                        sx={{ width: 48, height: 48 }}
                      />
                      <Typography fontSize={13} fontWeight={500}>
                        {p.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{p.sku}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>₹ {p.dp}</TableCell>
                  <TableCell>₹ {p.mrp}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>{p.bv}%</TableCell>

                  <TableCell>
                    <Chip
                      label={p.status}
                      color={p.status === "Active" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">

                    <IconButton onClick={() => viewProduct(p)}>
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton onClick={() => editProduct(p)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteProduct(p.id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>

        </CardContent>
      </Card>

      {/* ================= ADD / EDIT PRODUCT ================= */}

      <Dialog open={openForm} onClose={resetForm} maxWidth="md" fullWidth>

        <DialogTitle>
          {editingId ? "Edit Product" : "Add New Product"}
        </DialogTitle>

        <DialogContent>

          <Stack spacing={2} mt={2}>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Product Name"
                fullWidth
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <TextField
                label="Category"
                fullWidth
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="SKU"
                fullWidth
                value={form.sku}
                onChange={(e) =>
                  setForm({ ...form, sku: e.target.value })
                }
              />

              <TextField
                label="BV (%)"
                type="number"
                fullWidth
                value={form.bv}
                onChange={(e) =>
                  setForm({ ...form, bv: e.target.value })
                }
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="DP"
                type="number"
                fullWidth
                value={form.dp}
                onChange={(e) =>
                  setForm({ ...form, dp: e.target.value })
                }
              />

              <TextField
                label="MRP"
                type="number"
                fullWidth
                value={form.mrp}
                onChange={(e) =>
                  setForm({ ...form, mrp: e.target.value })
                }
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Stock"
                type="number"
                fullWidth
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />

              <TextField
                select
                label="Status"
                fullWidth
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Stack>

            <TextField
              multiline
              rows={3}
              label="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* IMAGE UPLOAD */}

            <Button component="label" variant="outlined">
              Upload Images
              <input hidden type="file" multiple onChange={handleImages} />
            </Button>

            {/* IMAGE PREVIEW */}

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {form.images.map((img: string, index: number) => (
                <Avatar
                  key={index}
                  src={img}
                  variant="rounded"
                  sx={{ width: 60, height: 60 }}
                />
              ))}
            </Stack>

          </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button variant="contained" onClick={saveProduct}>
            Save
          </Button>
        </DialogActions>

      </Dialog>

      {/* ================= VIEW PRODUCT ================= */}

      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>Product Details</DialogTitle>

        <DialogContent>

          {selectedProduct && (

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "300px 1fr",
                },
                gap: 3,
                mt: 2,
              }}
            >

              {/* IMAGE SLIDER */}

              <Box>

                <Avatar
                  src={selectedProduct.images[imageIndex]}
                  variant="rounded"
                  sx={{
                    width: "100%",
                    height: 250,
                    mb: 2,
                  }}
                />

                <Stack direction="row" spacing={1} flexWrap="wrap">

                  {selectedProduct.images.map((img, i) => (
                    <Avatar
                      key={i}
                      src={img}
                      variant="rounded"
                      sx={{
                        width: 50,
                        height: 50,
                        cursor: "pointer",
                        border:
                          imageIndex === i
                            ? "2px solid #1976d2"
                            : "none",
                      }}
                      onClick={() => setImageIndex(i)}
                    />
                  ))}

                </Stack>

              </Box>

              {/* DETAILS */}

              <Stack spacing={1.5}>

                <Typography variant="h6">
                  {selectedProduct.name}
                </Typography>

                <Typography>
                  <b>SKU:</b> {selectedProduct.sku}
                </Typography>

                <Typography>
                  <b>Category:</b> {selectedProduct.category}
                </Typography>

                <Typography>
                  <b>DP:</b> ₹ {selectedProduct.dp}
                </Typography>

                <Typography>
                  <b>MRP:</b> ₹ {selectedProduct.mrp}
                </Typography>

                <Typography>
                  <b>Stock:</b> {selectedProduct.stock}
                </Typography>

                <Typography>
                  <b>BV:</b> {selectedProduct.bv}%
                </Typography>

                <Typography>
                  <b>Status:</b> {selectedProduct.status}
                </Typography>

                <Typography mt={2}>
                  <b>Description</b>
                </Typography>

                <Typography color="text.secondary">
                  {selectedProduct.description}
                </Typography>

              </Stack>

            </Box>

          )}

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>

      </Dialog>

    </Box>
  );
}