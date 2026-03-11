import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  status: "Active" | "Pending";
}

interface CategoryForm {
  name: string;
  description: string;
  status: "Active" | "Pending";
  imageFile: File | null;
  imagePreview: string;
}

/* ================= COMPONENT ================= */

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [category, setCategory] = useState<CategoryForm>({
    name: "",
    description: "",
    status: "Active",
    imageFile: null,
    imagePreview: "",
  });

  /* ================= IMAGE ================= */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCategory((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  /* ================= ADD CATEGORY ================= */

  const addCategory = () => {
    if (!category.name) return;

    const newCategory: Category = {
      id: Date.now(),
      name: category.name,
      description: category.description,
      image: category.imagePreview,
      status: category.status,
    };

    setCategories((prev) => [...prev, newCategory]);

    resetForm();
  };

  /* ================= UPDATE CATEGORY ================= */

  const updateCategory = () => {
    if (editingId === null) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingId
          ? {
            ...c,
            name: category.name,
            description: category.description,
            image: category.imagePreview,
            status: category.status,
          }
          : c
      )
    );

    resetForm();
  };

  /* ================= DELETE ================= */

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  /* ================= EDIT ================= */

  const editCategory = (cat: Category) => {
    setEditingId(cat.id);

    setCategory({
      name: cat.name,
      description: cat.description,
      status: cat.status,
      imageFile: null,
      imagePreview: cat.image || "",
    });

    setOpenDialog(true);
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setCategory({
      name: "",
      description: "",
      status: "Active",
      imageFile: null,
      imagePreview: "",
    });

    setEditingId(null);
    setOpenDialog(false);
  };

  /* ================= UI ================= */

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Category Management
      </Typography>

      <Card>
        <CardContent>

          {/* ADD BUTTON */}

          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Categories</Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Category
            </Button>
          </Stack>

          {/* TABLE */}

          <Table>

            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {categories.map((cat) => (
                <TableRow key={cat.id} hover>

                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={cat.image}
                      sx={{ width: 48, height: 48 }}
                    >
                      <ImageIcon />
                    </Avatar>
                  </TableCell>

                  <TableCell>{cat.name}</TableCell>

                  <TableCell>{cat.description}</TableCell>

                  <TableCell>{cat.status}</TableCell>

                  <TableCell align="right">

                    <IconButton onClick={() => editCategory(cat)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteCategory(cat.id)}
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

      {/* ================= MODAL ================= */}

      <Dialog open={openDialog} onClose={resetForm} fullWidth maxWidth="sm">

        <DialogTitle>
          {editingId ? "Edit Category" : "Add Category"}
        </DialogTitle>

        <DialogContent>

          <Stack spacing={2} mt={1}>

            {/* IMAGE */}

            <Stack direction="row" spacing={2} alignItems="center">

              <Avatar
                variant="rounded"
                src={category.imagePreview}
                sx={{ width: 80, height: 80 }}
              >
                <ImageIcon />
              </Avatar>

              <Button variant="outlined" component="label">
                Upload Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

            </Stack>

            {/* NAME */}

            <TextField
              label="Category Name"
              fullWidth
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />

            {/* DESCRIPTION */}

            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />

            {/* STATUS */}

            <TextField
              select
              label="Status"
              fullWidth
              value={category.status}
              onChange={(e) =>
                setCategory({
                  ...category,
                  status: e.target.value as "Active" | "Pending",
                })
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button onClick={resetForm}>Cancel</Button>

          <Button
            variant="contained"
            onClick={editingId ? updateCategory : addCategory}
          >
            {editingId ? "Update" : "Add"}
          </Button>

        </DialogActions>

      </Dialog>
    </Box>
  );
};

export default CategoryManagement;