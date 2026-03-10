import React from "react";
import { Box } from "@mui/material";
import Packages from "../components/packages/Packages";

const PackagesPage: React.FC = () => {
  return (
    <Box
      sx={{
        p: 3,
        maxWidth: "100vw",
        margin: "0 auto",
      }}
    >
      {/* Packages Section */}
      <Box
        sx={{
          backgroundColor: "white",
          p: 2,
          borderRadius: "14px",
          border: "1px solid #E5E7EB",
        }}
      >
        <Packages />
      </Box>
    </Box>
  );
};

export default PackagesPage;
