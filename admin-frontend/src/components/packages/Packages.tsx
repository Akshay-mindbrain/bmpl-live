import { useEffect, useState } from "react";

/* ───── MUI IMPORTS (CORRECT) ───── */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/* ───── ICONS ───── */
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

/* ───── API HOOKS ───── */
import { useCreatePlan } from "../../hooks/Plan/useCreatePlan";
import { useDeletePlan } from "../../hooks/Plan/useDeletePlan";
import { usePlans } from "../../hooks/Plan/usePlans";
import { useUpdatePlan } from "../../hooks/Plan/useUpdatePlan";

import { toast } from "sonner";
import type { Plan } from "../../types/plans";

/* ───────────────── MODAL ───────────────── */

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
}

function PackageModal({ open, onClose, selectedPlan }: PackageModalProps) {
  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();

  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bv, setBv] = useState("");
  const [dpAmount, setDpAmount] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const resetForm = () => {
    setPlanName("");
    setDescription("");
    setPrice("");
    setBv("");
    setDpAmount("");
    setFeatureInput("");
    setFeatures([]);
  };

  useEffect(() => {
    if (!selectedPlan) {
      resetForm();
      return;
    }

    setPlanName(selectedPlan.planName ?? "");
    setDescription(selectedPlan.Description ?? "");
    setPrice(String(selectedPlan.price ?? ""));
    setBv(String(selectedPlan.BV ?? ""));
    setDpAmount(String(selectedPlan.dp_amount ?? ""));

    const feat = selectedPlan.features ?? [];
    setFeatures(
      Array.isArray(feat)
        ? feat
          .map((f: any) =>
            typeof f === "string" ? f : f?.title
          )
          .filter(Boolean)
        : []
    );
  }, [selectedPlan]);

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures((prev) => [...prev, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!planName.trim()) {
      toast.error("Package name is required");
      return;
    }

    const payload = {
      planName: planName.trim(),
      Description: description.trim(),
      price: Number(price) || 0,
      BV: Number(bv) || 0,
      dp_amount: Number(dpAmount) || 0,
      features: features.map((title) => ({ title })),
    };

    try {
      if (selectedPlan) {
        await updateMutation.mutateAsync({
          id: selectedPlan.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      resetForm();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Operation failed")
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle fontWeight={700} color="#26619A">
        {selectedPlan ? "Edit Package" : "Create Package"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Package Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
            fullWidth
          />

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Price ₹"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />

            <TextField
              label="BV"
              type="number"
              value={bv}
              onChange={(e) => setBv(e.target.value)}
              fullWidth
            />

            <TextField
              label="DP Amount ₹"
              type="number"
              value={dpAmount}
              onChange={(e) => setDpAmount(e.target.value)}
              fullWidth
            />
          </Stack>

          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Add Feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFeature()}
              fullWidth
            />
            <Button variant="contained" onClick={addFeature}>
              Add
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {features.map((f, i) => (
              <Chip
                key={i}
                label={f}
                onDelete={() => removeFeature(i)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ───────────────── MAIN PAGE ───────────────── */

export default function AgentPackages() {
  const { data, isLoading } = usePlans();
  const deleteMutation = useDeletePlan();

  const [openModal, setOpenModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Plan | null>(null);

  const plans: Plan[] = Array.isArray(data)
    ? data
    : data?.plans ?? data?.plan ?? [];

  const handleDelete = (id: string) => {
    toast("Are you sure you want to delete this plan?", {
      action: {
        label: "Delete",
        onClick: () => {
          toast.promise(deleteMutation.mutateAsync(id), {
            loading: "Deleting plan...",
            success: "Plan deleted successfully",
            error: "Failed to delete plan",
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Cancelled"),
      },
    });
  };

  return (
    <Box p={1} maxWidth="1500px" mx="auto">
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight={700} color="#26619A">
          Agent Packages
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedPackage(null);
            setOpenModal(true);
          }}
        >
          Add Package
        </Button>
      </Stack>

      {isLoading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {plans.map((pkg) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pkg.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "0.3s",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(38,97,154,0.3)",
                  },
                }}
              >
                {/* HEADER */}
                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg, #26619A, #1e4f7e)",
                    color: "white",
                    p: 2.5,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                >
                  <Typography fontWeight={700} noWrap>
                    {pkg.planName}
                  </Typography>

                  <Typography variant="h4" fontWeight={800}>
                    ₹{Number(pkg.price).toLocaleString()}
                  </Typography>

                  <Typography sx={{ opacity: 0.9 }}>
                    {pkg.BV} BV
                  </Typography>
                </Box>

                {/* FEATURES */}
                <CardContent sx={{ flex: 1 }}>
                  <Stack spacing={1}>
                    {(pkg.features ?? []).map((f: any, i: number) => (
                      <Stack direction="row" spacing={1} key={i}>
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: "#26619A" }}
                        />
                        <Typography variant="body2">
                          {typeof f === "string" ? f : f?.title}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>

                {/* ACTIONS */}
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setOpenModal(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(pkg.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <PackageModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedPlan={selectedPackage}
      />
    </Box>
  );
}
