import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Pagination,
  PaginationItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useDebounce } from "../../hooks/Common/useDebounce";
import { useGetUser } from "../../hooks/User/useGetUser";
import { useUpdateUserStatus } from "../../hooks/User/useUpdateUserStatus";

import type { User } from "../../types/user";
import type { Agent } from "./types";

interface Props {
  onViewDetails: (agent: Agent) => void;
}

const BLUE = "#26619A";

const AgentListPage: React.FC<Props> = ({ onViewDetails }) => {
  const [page, setPage] = useState(1);

  // 🔹 Search states
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Debounced search (API trigger)
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [orderBy, setOrderBy] = useState<keyof User>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 🔹 Fetch users
  const { data, isLoading } = useGetUser({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const users = data?.users ?? [];
  const pagination = data?.pagination ?? { totalPages: 1 };

  // 🔹 Status update
  const { mutate: updateUserStatus, isPending: isStatusUpdating } =
    useUpdateUserStatus();

  // 🔹 Search button click
  const handleSearch = () => {
    setPage(1);
    setSearchQuery(searchInput);
  };

  const handleSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    updateUserStatus({ id: user.id, status: newStatus });
  };

  return (
    <Box>
      {/* 🔍 SEARCH BAR */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.8 }}>
              Search
            </Typography>
            <TextField
              placeholder="Search by name, email, mobile or ID..."
              fullWidth
              size="small"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Box>

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              px: 4,
              background: BLUE,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { background: "#1e4978" },
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {/* 📋 TABLE */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: BLUE }}>
              <TableCell sx={{ color: "white" }}>Sl No</TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={orderBy === "memberId"}
                  direction={orderBy === "memberId" ? order : "asc"}
                  onClick={() => handleSort("memberId")}
                  sx={{ color: "white !important" }}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>User</TableCell>
              <TableCell sx={{ color: "white" }}>KYC</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Join Date</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading users...
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              users.map((user, index) => (
                <TableRow key={user.id} hover>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{user.memberId ?? "—"}</TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: BLUE }}>
                        {user.firstName?.[0] ?? "?"}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="caption">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{user.kycStatus ?? "—"}</TableCell>

                  <TableCell>
                    <Switch
                      size="small"
                      checked={user.status === "ACTIVE"}
                      onChange={() => handleToggleStatus(user)}
                      disabled={isStatusUpdating}
                    />
                    {user.status}
                  </TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        onViewDetails({
                          id:user.id,
                          code: user.memberId,
                          name: `${user.firstName} ${user.lastName}`,
                          phone: user.mobile,
                          joiningDate: user.createdAt,
                        } as Agent)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 🔢 PAGINATION */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <Pagination
            count={pagination.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            size="small"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{
                  previous: () => <span>&lt; Prev</span>,
                  next: () => <span>Next &gt;</span>,
                }}
              />
            )}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AgentListPage;
