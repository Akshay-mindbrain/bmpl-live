import { Box } from "@mui/material";
import { useState } from "react";

import AgentDetailsPage from "../components/users/AgentDetailsPage";
import AgentListPage from "../components/users/AgentListPage";


import DialogPopup from "../components/common/DialogPopup";
import type { Agent } from "../components/users/types";

type PopupPage =
  | "none"
  | "overview"
  // | "kyc"
  // | "team"
  // | "earnings"
  // | "history"
  // | "upgrade"
  // | "upgradeSummary"
  // | "verification";

const UsersPage = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [popupPage, setPopupPage] = useState<PopupPage>("none");
  const [, setSelectedUpgrade] = useState("");

  /* ===================== OPEN / CLOSE ===================== */
  const openOverview = (agent: Agent) => {
    setSelectedAgent(agent);
    setPopupPage("overview");
  };

  const closeAll = () => {
    setPopupPage("none");
    setSelectedAgent(null);
    setSelectedUpgrade("");
  };

  /* ===================== TAB HANDLER ===================== */

  return (
    <Box sx={{ p: 3 }}>
      {/* ================= AGENT LIST ================= */}
      {popupPage === "none" && <AgentListPage onViewDetails={openOverview} />}

      {/* ================= OVERVIEW ================= */}
      <DialogPopup
        open={popupPage === "overview"}
        onClose={closeAll}
        BackdropProps={{
          sx: { backgroundColor: "transparent", backdropFilter: "none" },
        }}
      >
        {selectedAgent && (
          <AgentDetailsPage
            agent={selectedAgent}
            onClose={closeAll}
            // onKYCView={() => setPopupPage("kyc")}
            // onTeamView={() => setPopupPage("team")}
            // onEarningsView={() => setPopupPage("earnings")}
            // onHistoryView={() => setPopupPage("history")}
            // onUpgrade={() => setPopupPage("upgrade")}
          />
        )}
      </DialogPopup>

      {/* ================= KYC ================= */}
      {/* <DialogPopup open={popupPage === "kyc"} onClose={closeAll}>
        {selectedAgent && (
          <KYCViewPage
            agent={selectedAgent}
            onBack={() => setPopupPage("overview")}
            onTeamView={() => setPopupPage("team")}
            onEarningsView={() => setPopupPage("earnings")}
            onHistoryView={() => setPopupPage("history")}
            onVerificationView={() => setPopupPage("verification")}
          />
        )}
      </DialogPopup> */}

      {/* ================= TEAM ================= */}
      {/* <DialogPopup open={popupPage === "team"} onClose={closeAll}>
        {selectedAgent && (
          <TeamViewPage
            agent={selectedAgent}
            onBack={() => setPopupPage("overview")}
            onTabChange={handleTabChange}
          />
        )}
      </DialogPopup> */}

      {/* ================= EARNINGS ================= */}
      {/* <DialogPopup open={popupPage === "earnings"} onClose={closeAll}>
        {selectedAgent && (
          <EarningPage
            agent={selectedAgent}
            onClose={() => setPopupPage("overview")}
            onTabChange={handleTabChange}
          />
        )}
      </DialogPopup> */}

      {/* ================= HISTORY ================= */}
      {/* <DialogPopup open={popupPage === "history"} onClose={closeAll}>
        {selectedAgent && (
          <HistoryPage
            agent={selectedAgent}
            onBack={() => setPopupPage("overview")}
            onTabChange={handleTabChange}
          />
        )}
      </DialogPopup> */}



      {/* ================= UPGRADE ================= */}
      {/* <DialogPopup open={popupPage === "upgrade"} onClose={closeAll}>
        {selectedAgent && (
          <UpgradePackagePage
            agent={selectedAgent}
            onCancel={() => setPopupPage("overview")}
            onConfirm={(pkg) => {
              setSelectedUpgrade(pkg);
              setPopupPage("upgradeSummary");
            }}
          />
        )}
      </DialogPopup> */}

      {/* ================= UPGRADE SUMMARY ================= */}
      {/* <DialogPopup open={popupPage === "upgradeSummary"} onClose={closeAll}>
        <UpgradeSummaryPage
          packageName={selectedUpgrade}
          selectedPkg={selectedUpgrade}
          onCancel={closeAll}
          onConfirm={() => setPopupPage("overview")}
        />
      </DialogPopup> */}

      {/* ================= VERIFICATION ================= */}
      {/* <DialogPopup
        open={popupPage === "verification"}
        onClose={closeAll}
        maxWidth="sm"
        fullWidth={false}
      >
        {selectedAgent && (
          <VerificationPage
            agent={selectedAgent}
            onClose={closeAll}
            onBack={() => setPopupPage("kyc")}
            onNavigate={(page) => setPopupPage(page)}
          />
        )}
      </DialogPopup> */}
    </Box>
  );
};

export default UsersPage;
