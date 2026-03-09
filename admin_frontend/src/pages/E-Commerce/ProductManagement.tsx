import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
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
import React, { useState } from "react";

/* ================= TYPES ================= */

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface ProductForm {
  name: string;
  price: string;
  category: string;
  imageFile: File | null;
  imagePreview: string;
}

/* ================= COMPONENT ================= */

const ProductManagement: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([
    "Electronics",
    "Clothing",
  ]);
  const [products, setProducts] = useState<Product[]>([]);

  const [categoryName, setCategoryName] = useState("");
  const [product, setProduct] = useState<ProductForm>({
    name: "",
    price: "",
    category: "",
    imageFile: null,
    imagePreview: "",
  });

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);

  /* ================= CATEGORY ================= */

  const addCategory = () => {
    if (!categoryName.trim()) return;
    if (categories.includes(categoryName.trim())) return;

    setCategories((prev) => [...prev, categoryName.trim()]);
    setCategoryName("");
    setOpenCategoryDialog(false);
  };

  const deleteCategory = (cat: string) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
    setProducts((prev) => prev.filter((p) => p.category !== cat));
  };

  /* ================= PRODUCT ================= */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProduct((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const addProduct = () => {
    if (!product.name || !product.price || !product.category) return;

    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: product.imagePreview,
      },
    ]);

    setProduct({
      name: "",
      price: "",
      category: "",
      imageFile: null,
      imagePreview: "",
    });

    setOpenProductDialog(false);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* ================= UI ================= */

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Product Management
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Manage categories and products
      </Typography>

      {/* ACTION BUTTONS */}
      <Stack direction="row" spacing={2} mb={4}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCategoryDialog(true)}
        >
          Add Category
        </Button>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpenProductDialog(true)}
        >
          Add Product
        </Button>
      </Stack>

      {/* CATEGORY MANAGEMENT */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Categories
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {categories.map((cat) => (
              <Stack
                key={cat}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography fontWeight={500}>{cat}</Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteCategory(cat)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* PRODUCT MANAGEMENT */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Products
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={p.image}
                      sx={{ width: 48, height: 48 }}
                    >
                      <ImageIcon />
                    </Avatar>
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>₹ {p.price}</TableCell>
                  <TableCell align="right">
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

      {/* ADD CATEGORY MODAL */}
      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" mb={2}>
            Categories help organize products
          </Typography>
          <TextField
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={addCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ADD PRODUCT MODAL */}
      <Dialog
        open={openProductDialog}
        onClose={() => setOpenProductDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" mb={2}>
            Upload image and product details
          </Typography>

          <Stack spacing={2}>
            {/* IMAGE UPLOAD */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                variant="rounded"
                src={product.imagePreview}
                sx={{ width: 80, height: 80 }}
              >
                <ImageIcon />
              </Avatar>

              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Stack>

            <TextField
              label="Product Name"
              fullWidth
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />

            <TextField
              select
              label="Category"
              fullWidth
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={addProduct}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;