import AddIcon from "@mui/icons-material/Add"; // ← added for + icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useCreateAdmin } from "../hooks/Admin/useCreateAdmin";
import { useDeleteAdmin } from "../hooks/Admin/useDeleteAdmin";
import { useGetAdmin } from "../hooks/Admin/useGetAdmin";
import { useUpdateAdmin } from "../hooks/Admin/useUpdateAdmin";

import { toast } from "sonner";
import AdminRegisterModal from "../components/admin/AdminRegisterModal";
import type { Admin, AdminFormInput } from "../types/admin";

// Helper to display status nicely
const getStatusLabel = (status: string): "Active" | "Disabled" => {
  return status === "1" ? "Active" : "Disabled";
};

const AdminPage = () => {
  const { data, isLoading, error, isSuccess } = useGetAdmin();

  const createAdmin = useCreateAdmin();
  const updateAdmin = useUpdateAdmin();
  const deleteAdmin = useDeleteAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);

  const admins: Admin[] = data?.Admin
    ? Array.isArray(data.Admin)
      ? data.Admin
      : [data.Admin]
    : [];


  const handleOpenAdd = () => {
    setSelectedAdmin(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleAdminSaved = async (formData: AdminFormInput) => {
    try {
      if (selectedAdmin) {
        // Update
        await updateAdmin.mutateAsync({
          id: selectedAdmin.id,
          payload: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            username: formData.username,
            adminType: formData.adminType,
            status: formData.status,
          },
        });
        toast.success("Updated Successfully");
      } else {
        // Create
        await createAdmin.mutateAsync({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          username: formData.username,
          password: formData.password,
          adminType: formData.adminType,
          status: formData.status || "1",
        });
        toast.success("Admin created");
      }
      handleCloseModal();
    } catch (err: any) {
      // alert("Failed to save admin: " + (err?.message || "Unknown error"));
      toast.error("Failed to save admin: " + (err?.message || "Unknown error"));
    }
  };

  const handleDeleteClick = (admin: Admin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;
    try {
      await deleteAdmin.mutateAsync(adminToDelete.id);
      // alert("Admin deleted successfully"); // can be replaced with toast later
      toast.success("Admin deleted successfully");
    } catch (err: any) {
      // alert("Delete failed: " + (err?.message || "Unknown error"));
      toast.error("Delete failed: " + (err?.message || "Unknown error"));
    } finally {
      setDeleteDialogOpen(false);
      setAdminToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        {toast.error("Failed to load admins")}
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with + icon before button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Admin Accounts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all admin users
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpenAdd}
          startIcon={<AddIcon />}  // ← + icon added here
          sx={{ backgroundColor: "#26619A" }}
        >
          Add New Admin
        </Button>
      </Box>

      <Paper
        sx={{
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: "1px solid #eceff1",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#fafafa",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            All Administrators
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: {admins.length}
          </Typography>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f7fa" }}>
              <TableCell>Admin</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        bgcolor: "#e3f2fd",
                        color: "#1565c0",
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {(admin.firstName?.[0] || "") + (admin.lastName?.[0] || "")}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {admin.firstName} {admin.lastName || ""}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {admin.username}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>{admin.mobile}</TableCell>
                <TableCell>{admin.email || "—"}</TableCell>
                <TableCell>{admin.adminType}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(admin.status)}
                    size="small"
                    color={getStatusLabel(admin.status) === "Active" ? "success" : "default"}
                  />
                </TableCell>
                <TableCell>
                  {new Date(admin.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenEdit(admin)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(admin)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {admins.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography variant="body1" color="text.secondary">
                    {isSuccess && admins.length === 0
                      ? "No admin accounts found"
                      : "Loading admins..."}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <AdminRegisterModal
        open={isModalOpen}
        onClose={handleCloseModal}
        admin={selectedAdmin}
        onSave={handleAdminSaved}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete admin{" "}
            <strong>
              {adminToDelete?.firstName} {adminToDelete?.lastName}
            </strong>{" "}
            ({adminToDelete?.username || adminToDelete?.mobile || "—"})?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            autoFocus
            disabled={deleteAdmin.isPending}
          >
            {deleteAdmin.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;