import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
} from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

const notifications = {
  today: [
    {
      title: "Order Placed",
      description: "Your order #1234 has been placed successfully.",
    },
    {
      title: "Order Shipped",
      description: "Your order #1234 has been shipped. Track it here.",
    },
    {
      title: "Offer/Promotion",
      description: "🎉 Get 20% off on your next purchase! Limited time offer.",
    },
  ],
  yesterday: [
    {
      title: "Price Drop",
      description: "Good news! The shoes you liked are now ₹500 cheaper.",
    },
    {
      title: "Order Cancelled",
      description: "Your order #1234 has been cancelled. Refund will be processed soon.",
    },
  ],
};

export default function Notifications() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.background.light }}>
      {/* Header */}
      <PageHeader title="Notifications" />

      <Box sx={{ p: 3 }}>

        {/* Today */}
        <Typography sx={{ color: designConfig.colors.primary.main, fontWeight: 700, mb: 1, fontSize: "0.8rem", letterSpacing: "1px" }}>
          TODAY
        </Typography>
        <List disablePadding>
          {notifications.today.map((item, index) => (
            <React.Fragment key={index}>
              <Card sx={{ mb: 1.5, borderRadius: 3, border: `1px solid ${designConfig.colors.background.border}`, boxShadow: designConfig.shadows.sm, bgcolor: "white" }}>
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemIcon sx={{ mt: 0.5, minWidth: 44 }}>
                    <Box sx={{ bgcolor: designConfig.colors.primary.light + "11", p: 1, borderRadius: 2 }}>
                      <LocalOfferOutlinedIcon sx={{ color: designConfig.colors.primary.main }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight={700} color={designConfig.colors.text.primary}>{item.title}</Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {item.description}
                      </Typography>
                    }
                  />
                </ListItem>
              </Card>
            </React.Fragment>
          ))}
        </List>

        {/* Yesterday */}
        <Typography sx={{ color: designConfig.colors.text.secondary, fontWeight: 700, mt: 3, mb: 1, fontSize: "0.8rem", letterSpacing: "1px" }}>
          YESTERDAY
        </Typography>
        <List disablePadding>
          {notifications.yesterday.map((item, index) => (
            <React.Fragment key={index}>
              <Card sx={{ mb: 1.5, borderRadius: 3, border: `1px solid ${designConfig.colors.background.border}`, boxShadow: designConfig.shadows.sm, bgcolor: "white" }}>
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemIcon sx={{ mt: 0.5, minWidth: 44 }}>
                    <Box sx={{ bgcolor: designConfig.colors.primary.light + "11", p: 1, borderRadius: 2 }}>
                      <LocalOfferOutlinedIcon sx={{ color: designConfig.colors.primary.main }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight={700} color={designConfig.colors.text.primary}>{item.title}</Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {item.description}
                      </Typography>
                    }
                  />
                </ListItem>
              </Card>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}
