import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import designConfig from "../../config/designConfig";
import PageHeader from "../../components/common/PageHeader";

const faqs = [
  {
    question: "How do I make a purchase?",
    answer:
      "When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options (if applicable), and then tap the 'Add to Cart' button. Follow the on-screen instructions to complete the purchase, including providing shipping details and payment information.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit cards, debit cards, UPI, net banking, and selected digital wallets.",
  },
  {
    question: "How do I track my orders?",
    answer:
      "You can track your orders from the 'My Orders' section in your account.",
  },
  {
    question: "Can I cancel or return an order?",
    answer:
      "Yes, orders can be cancelled or returned based on our return policy.",
  },
  {
    question: "How can I contact customer support for assistance?",
    answer:
      "You can contact our customer support through the Help & Support section or via email.",
  },
];

export default function FAQs() {
  const [expanded, setExpanded] = useState<number | false>(0);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: designConfig.colors.background.light }}>
      {/* Header */}
      <PageHeader title="FAQs" />

      <Box sx={{ p: 3 }}>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search for questions..."
          variant="outlined"
          sx={{ mb: 2, bgcolor: "white", borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* FAQ List */}
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={() =>
              setExpanded(expanded === index ? false : index)
            }
            sx={{
              mb: 1.5,
              borderRadius: 2,
              boxShadow: "none",
              border: "1px solid #e0e0e0",
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: expanded === index ? designConfig.colors.primary.main : designConfig.colors.text.primary,
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
