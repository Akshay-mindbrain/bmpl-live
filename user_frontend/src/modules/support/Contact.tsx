import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

export default function Contact() {
  const contacts = [
    { label: "Customer Service", icon: <HeadsetMicIcon /> },
    { label: "Whatsapp", icon: <WhatsAppIcon /> },
    { label: "Website", icon: <LanguageIcon /> },
    { label: "Facebook", icon: <FacebookIcon /> },
    { label: "Twitter", icon: <TwitterIcon /> },
    { label: "Instagram", icon: <InstagramIcon /> },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.background.light }}>
      {/* Header */}
      <PageHeader title="Contact" />

      <Box sx={{ p: 3 }}>

        {/* Contact List */}
        <List>
          {contacts.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                mb: 1.5,
                bgcolor: "white",
                borderRadius: 3,
                border: `1px solid ${designConfig.colors.background.border}`,
                boxShadow: designConfig.shadows.sm,
                '&:hover': { bgcolor: designConfig.colors.background.light }
              }}
            >
              <ListItemIcon sx={{ color: designConfig.colors.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontWeight={600} color={designConfig.colors.text.primary}>{item.label}</Typography>}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
